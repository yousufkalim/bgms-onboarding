<template>
  <!-- Open Layers section -->
  <h3>Open Layers</h3>

  <!-- Main container for map and controls -->
  <div class="w-75 h-75 m-auto d-flex flex-column align-items-start">
    <!-- Top bar for edit mode toggle and delete feature -->
    <OpenLayers />

    <!-- Bottom bar for drawing controls -->
    <MapControls />
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM as OSMSource } from "ol/source";
import Modify from "ol/interaction/Modify";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import "ol/ol.css";
import OpenLayers from "@/components/OpenLayers.vue";
import MapControls from "@/components/MapControls.vue";

export default {
  name: "MapView",
  inject: ["store", "actions"],
  components: { OpenLayers, MapControls },

  // Lifecycle hook when component is mounted
  mounted() {
    // Initialize the map and interactions
    this.store.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSMSource(),
        }),
        new VectorLayer({
          source: this.store.source,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.store.select = new Select({ condition: click });
    this.store.modify = new Modify({ source: this.store.source });

    this.store.select.on("select", (e) => {
      this.store.drawingSelected = e.selected.length > 0;
    });
  },
};
</script>
