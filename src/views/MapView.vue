<template>
  <h3>Open Layers</h3>

  <!-- Main container for map and controls -->
  <div class="container-fluid" style="height: 100%">
    <div class="row">
      <div class="col-lg-10 col-md-10 col-sm-12 m-auto" style="height: 70vh">
        <!-- Open Layers Map Features -->
        <MapFeatures />

        <!-- Top bar for edit mode toggle and delete feature -->
        <OpenLayers />

        <!-- Bottom bar for drawing controls -->
        <MapControls />
      </div>
    </div>
  </div>
</template>

<script>
import View from "ol/View";
import Map from "ol/Map";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM as OSMSource } from "ol/source";
import Modify from "ol/interaction/Modify";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import OpenLayers from "@/components/OpenLayers.vue";
import MapControls from "@/components/MapControls.vue";
import MapFeatures from "@/components/MapFeatures.vue";
import "ol/ol.css";

export default {
  name: "MapView",
  inject: ["store", "actions"],
  components: { MapFeatures, OpenLayers, MapControls },

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
        center: fromLonLat([74.326127, 31.484853]),
        zoom: 15,
      }),
    });

    // Initialize select and modify interactions
    this.store.select = new Select({
      condition: click,
    });
    this.store.modify = new Modify({ source: this.store.source });

    // Capture click event and give custom selected style to the markers
    this.store.select.on("select", (e) => {
      e.selected.forEach((feature) => {
        const type = feature.get("type");
        if (type === "marker") {
          feature.setStyle(
            this.actions.createMarkerStyle({
              ...this.store.markerCustomizations,
              iconUrl: "/selected-marker.png",
            })
          );
        }
      });

      // Update the flag
      this.store.drawingSelected = e.selected.length > 0;
    });

    // Listen the click event on map to add markers
    this.store.map.on("singleclick", (event) => {
      if (this.store.isAddingMarker) {
        // isAddingMarker is a flag to toggle marker adding mode
        this.actions.addMarker(event.coordinate);
      }
    });
  },
};
</script>
