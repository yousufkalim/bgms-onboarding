<template>
  <h3>Open Layers</h3>

  <div class="w-75 h-75 m-auto d-flex flex-column align-items-start">
    <div id="map" class="map w-100 h-100"></div>
    <div class="w-100 d-flex">
      <div class="form-floating w-25">
        <select
          id="shape-select"
          class="form-select"
          @change="addInteraction($event.target.value)"
        >
          <option value="None">None</option>
          <option value="Point">Point</option>
          <option value="LineString">Line</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
        </select>
        <label for="shape-select" class="form-label">Draw a shape</label>
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

export default {
  name: "OpenLayersComponent",
  data() {
    return {
      map: null,
      draw: null, // Draw interaction
      source: new VectorSource({ wrapX: false }),
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
        });
        this.map.addInteraction(this.draw);
      }
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
};
</script>
