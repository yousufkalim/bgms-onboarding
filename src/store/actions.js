import { store } from ".";
import Draw from "ol/interaction/Draw";
import { Fill, Icon, Stroke, Style, Text, Circle } from "ol/style";
import { Feature } from "ol";
import { Point } from "ol/geom";

class MapActions {
  // Add drawing interaction to the map
  addInteraction(type) {
    if (store.draw) {
      store.map.removeInteraction(store.draw);
    }
    if (type !== "None") {
      store.draw = new Draw({
        source: store.source,
        type: type, // 'Point', 'LineString', 'Polygon', etc.
        style: this.createStyle(type),
      });
      store.draw.on("drawend", (event) => {
        const newStyle = this.createStyle(type);
        event.feature.setStyle(newStyle);
        store.featuresStack.push({ name: type, feature: event.feature });
      });
      store.map.addInteraction(store.draw);
    }
  }

  // Create a new style for drawing based on style options
  createStyle(type) {
    const fillColor = this.parseFillColor(
      store.styleOptions.fillColor,
      store.styleOptions.fillOpacity
    );

    // Point requires image to be styled
    if (type === "Point") {
      return new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: store.styleOptions.strokeColor,
            width: store.styleOptions.strokeWidth,
          }),
        }),
      });
    } else {
      return new Style({
        stroke: new Stroke({
          color: store.styleOptions.strokeColor,
          width: store.styleOptions.strokeWidth,
        }),
        fill: new Fill({
          color: fillColor,
        }),
      });
    }
  }

  // Update styles of all features in the stack
  updateStyles() {
    store.featuresStack.forEach((stack) => {
      const newStyle = this.createStyle(stack.name);
      return { ...stack, feature: stack.feature.setStyle(newStyle) };
    });
  }

  // Undo the last drawing action
  undoLastDraw() {
    if (store.featuresStack.length > 0) {
      const lastFeature = store.featuresStack.pop();
      store.source.removeFeature(lastFeature.feature);
    }
  }

  // Toggle the edit mode on the map
  toggleEditMode(isEnabled) {
    store.isEditing = isEnabled;

    if (isEnabled) {
      store.drawType = "None";
      store.isAddingMarker = false;
      store.map.removeInteraction(store.draw);
      store.map.addInteraction(store.modify);
      store.map.addInteraction(store.select);
    } else {
      store.map.removeInteraction(store.modify);
      store.map.removeInteraction(store.select);
    }
  }

  // Delete the selected feature from the map
  deleteSelectedFeature() {
    const selectedFeatures = store.select.getFeatures();
    selectedFeatures.forEach((feature) => {
      store.source.removeFeature(feature);
    });
    selectedFeatures.clear();
    store.drawingSelected = false;
  }

  // Parse fill color to rgba format
  parseFillColor(color, opacity) {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Add markers to the map
  addMarker(coordinate) {
    const feature = new Feature({
      type: "marker",
      geometry: new Point(coordinate),
    });
    const markerStyle = this.createMarkerStyle(store.markerCustomizations);
    feature.setStyle(markerStyle);
    store.source.addFeature(feature);
  }

  // Generate marker styles
  createMarkerStyle(customizations) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 1],
        scale: customizations.iconScale,
        src: customizations.iconUrl,
      }),
      text: new Text({
        text: customizations.labelText,
        scale: customizations.labelSize,
        fill: new Fill({
          color: customizations.labelColor,
        }),
      }),
    });
  }

  //   Disable draw mode
  disableDrawMode() {
    store.drawType = "None";
    if (store.draw) {
      store.map.removeInteraction(store.draw);
    }
  }

  //   Disable marker mode
  disableMarkerMode() {
    store.isAddingMarker = false;
  }
}

export default new MapActions();
