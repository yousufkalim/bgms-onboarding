import { reactive } from "vue";
import actions from "./actions";
import { Vector as VectorSource } from "ol/source";

const store = reactive({
  drawType: "None", // Current drawing type
  map: null, // OpenLayers Map instance
  draw: null, // Draw interaction
  source: new VectorSource({ wrapX: false }), // Source for vector layers
  featuresStack: [], // Stack of drawn features
  select: null, // Select interaction
  modify: null, // Modify interaction
  drawingSelected: false, // Flag to check if a drawing is selected
  markerCustomizations: {
    iconUrl: "/marker.png",
    iconScale: 1,
    labelText: "",
    labelSize: 2,
    labelColor: "#000000",
  },
  isAddingMarker: false, // Flag to check if marker mode is enabled or not
  styleOptions: {
    // Default style options for drawing
    strokeColor: "#3399CC",
    strokeWidth: 1.25,
    fillColor: "#ffffff",
    fillOpacity: 0.4,
  },
});

export { store, actions };
