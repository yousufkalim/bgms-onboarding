import { reactive } from "vue";
import actions from "./actions";
import { Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";

const store = reactive({
  drawType: "None", // Current drawing type
  map: null, // OpenLayers Map instance
  draw: null, // Draw interaction
  source: new VectorSource({ wrapX: false }), // Source for vector layers
  featuresStack: [], // Stack of drawn features
  select: null, // Select interaction
  modify: null, // Modify interaction
  drawingSelected: false, // Flag to check if a drawing is selected
  markerStyle: new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: "/marker.png",
    }),
  }),
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
