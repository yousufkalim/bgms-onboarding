<template>
  <h3>Open Layers</h3>
  <div id="map" class="map"></div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import "ol/ol.css";

export default {
  name: "OpenLayersComponent",
  components: {},
  props: {},
  mounted() {
    new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
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

<style>
#map {
  height: 80%;
  width: 80%;
  margin: auto;
}
</style>
