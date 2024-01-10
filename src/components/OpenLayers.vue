<template>
  <h3>Open Layers</h3>

  <div class="w-75 h-75 m-auto d-flex flex-column align-items-start">
    <div id="map" class="map w-100 h-100"></div>

    <div class="row mt-1">
      <div class="col-auto">
        <span class="input-group">
          <label class="input-group-text" for="type">Geometry type:</label>
          <select
            class="form-select"
            id="type"
            @change="addInteraction($event.target.value)"
          >
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

      <div class="col-auto d-flex align-items-center" v-if="draw">
        <div class="col-auto d-flex align-items-center m-2">
          <label for="strokeColor">Stroke Color:&nbsp;</label>
          <input
            id="strokeColor"
            type="color"
            v-model="styleOptions.strokeColor"
          />
        </div>
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
        <div class="col-auto d-flex align-items-center m-2">
          <label for="fillColor">Fill Color:&nbsp;</label>
          <input type="color" id="fillColor" v-model="styleOptions.fillColor" />
        </div>
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

import Draw from "ol/interaction/Draw";

import "ol/ol.css";
import { Fill, Stroke, Style } from "ol/style";

export default {
  name: "OpenLayersComponent",
  data() {
    return {
      map: null,
      draw: null, // Draw interaction
      source: new VectorSource({ wrapX: false }),
      featuresStack: [],
      styleOptions: {
        strokeColor: "#3399CC",
        strokeWidth: 1.25,
        fillColor: "#ffffff",
        fillOpacity: 0.4,
      },
    };
  },
  methods: {
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

    updateStyles() {
      const newStyle = this.createStyle();
      this.featuresStack.forEach((feature) => feature.setStyle(newStyle));
    },

    undoLastDraw() {
      if (this.featuresStack.length > 0) {
        const lastFeature = this.featuresStack.pop();
        this.source.removeFeature(lastFeature);
      }
    },

    parseFillColor(color, opacity) {
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    },
  },
  mounted() {
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
  },
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
