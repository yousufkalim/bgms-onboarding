<template>
  <!-- Open Layers section -->
  <h3>Open Layers</h3>

  <!-- Main container for map and controls -->
  <div class="w-75 h-75 m-auto d-flex flex-column align-items-start">
    <!-- Top bar for edit mode toggle and delete feature -->
    <div class="w-100 mb-1 d-flex justify-content-between">
      <!-- Checkbox to enable edit mode -->
      <div class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="editMode"
          @change="toggleEditMode($event.target.checked)"
        />
        <label for="editMode" class="form-check-label">Edit Mode</label>
      </div>

      <!-- Delete button, shown only when a drawing is selected -->
      <button
        v-if="drawingSelected"
        class="btn btn-danger"
        @click="deleteSelectedFeature"
      >
        Delete
      </button>
    </div>

    <!-- Map container -->
    <div id="map" class="map w-100 h-100"></div>

    <!-- Bottom bar for drawing controls -->
    <div class="row mt-1">
      <!-- Geometry type selection and undo button -->
      <div class="col-auto">
        <span class="input-group">
          <label class="input-group-text" for="type">Geometry type:</label>
          <select
            class="form-select"
            id="type"
            v-model="drawType"
            @change="addInteraction($event.target.value)"
          >
            <!-- Geometry type options -->
            <option value="None">None</option>
            <option value="Point">Point</option>
            <option value="LineString">Line</option>
            <option value="Polygon">Polygon</option>
            <option value="Circle">Circle</option>
          </select>
          <input
            class="form-control"
            type="button"
            value="Undo"
            id="undo"
            @click="undoLastDraw"
          />
        </span>
      </div>

      <!-- Style controls, displayed when drawing is active -->
      <div class="col-auto d-flex align-items-center" v-if="draw">
        <!-- Stroke color picker -->
        <div class="col-auto d-flex align-items-center m-2">
          <label for="strokeColor">Stroke Color:&nbsp;</label>
          <input
            id="strokeColor"
            type="color"
            v-model="styleOptions.strokeColor"
          />
        </div>
        <!-- Stroke width range slider -->
        <div class="col-auto d-flex align-items-center m-2">
          <label for="strokeWidth">Stroke Width:&nbsp;</label>
          <input
            type="range"
            id="strokeWidth"
            v-model="styleOptions.strokeWidth"
            min="1"
            max="10"
          />
        </div>
        <!-- Fill color picker -->
        <div class="col-auto d-flex align-items-center m-2">
          <label for="fillColor">Fill Color:&nbsp;</label>
          <input type="color" id="fillColor" v-model="styleOptions.fillColor" />
        </div>
        <!-- Fill opacity range slider -->
        <div class="col-auto d-flex align-items-center m-2">
          <label for="fillOpacity">Fill Opacity:&nbsp;</label>
          <input
            type="range"
            id="fillOpacity"
            v-model="styleOptions.fillOpacity"
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM as OSMSource, Vector as VectorSource } from "ol/source";
import Modify from "ol/interaction/Modify";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import Draw from "ol/interaction/Draw";
import "ol/ol.css";
import { Fill, Stroke, Style } from "ol/style";

export default {
  name: "OpenLayersComponent",

  // Component data
  data() {
    return {
      drawType: "None", // Current drawing type
      map: null, // OpenLayers Map instance
      draw: null, // Draw interaction
      source: new VectorSource({ wrapX: false }), // Source for vector layers
      featuresStack: [], // Stack of drawn features
      select: null, // Select interaction
      modify: null, // Modify interaction
      drawingSelected: false, // Flag to check if a drawing is selected
      styleOptions: {
        // Default style options for drawing
        strokeColor: "#3399CC",
        strokeWidth: 1.25,
        fillColor: "#ffffff",
        fillOpacity: 0.4,
      },
    };
  },

  // Component methods
  methods: {
    // Add drawing interaction to the map
    addInteraction(type) {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }
      if (type !== "None") {
        this.draw = new Draw({
          source: this.source,
          type: type, // 'Point', 'LineString', 'Polygon', etc.
          style: this.createStyle(),
        });
        this.draw.on("drawend", (event) => {
          this.featuresStack.push(event.feature);
        });
        this.map.addInteraction(this.draw);
      }
    },

    // Create a new style for drawing based on style options
    createStyle() {
      const fillColor = this.parseFillColor(
        this.styleOptions.fillColor,
        this.styleOptions.fillOpacity
      );

      return new Style({
        stroke: new Stroke({
          color: this.styleOptions.strokeColor,
          width: this.styleOptions.strokeWidth,
        }),
        fill: new Fill({
          color: fillColor,
        }),
      });
    },

    // Update styles of all features in the stack
    updateStyles() {
      const newStyle = this.createStyle();
      this.featuresStack.forEach((feature) => feature.setStyle(newStyle));
    },

    // Undo the last drawing action
    undoLastDraw() {
      if (this.featuresStack.length > 0) {
        const lastFeature = this.featuresStack.pop();
        this.source.removeFeature(lastFeature);
      }
    },

    // Toggle the edit mode on the map
    toggleEditMode(isEnabled) {
      if (isEnabled) {
        this.drawType = "None";
        this.map.removeInteraction(this.draw);
        this.map.addInteraction(this.modify);
        this.map.addInteraction(this.select);
      } else {
        this.map.removeInteraction(this.modify);
        this.map.removeInteraction(this.select);
      }
    },

    // Delete the selected feature from the map
    deleteSelectedFeature() {
      const selectedFeatures = this.select.getFeatures();
      selectedFeatures.forEach((feature) => {
        this.source.removeFeature(feature);
      });
      selectedFeatures.clear();
      this.drawingSelected = false;
    },

    // Parse fill color to rgba format
    parseFillColor(color, opacity) {
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    },
  },

  // Lifecycle hook when component is mounted
  mounted() {
    // Initialize the map and interactions
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSMSource(),
        }),
        new VectorLayer({
          source: this.source,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.select = new Select({ condition: click });
    this.modify = new Modify({ source: this.source });

    this.select.on("select", (e) => {
      this.drawingSelected = e.selected.length > 0;
    });
  },

  // Watcher for style options
  watch: {
    styleOptions: {
      deep: true,
      handler() {
        this.updateStyles();
      },
    },
  },
};
</script>
