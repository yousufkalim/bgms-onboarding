<template>
  <div class="row mt-1">
    <!-- Style controls, displayed when drawing is active -->
    <div
      class="col-auto d-flex align-items-center"
      v-if="store.drawType !== 'None'"
    >
      <!-- Stroke color picker -->
      <div class="col-auto d-flex align-items-center m-2">
        <label for="strokeColor">Stroke Color:&nbsp;</label>
        <input
          id="strokeColor"
          type="color"
          v-model="store.styleOptions.strokeColor"
        />
      </div>
      <!-- Stroke width range slider -->
      <div class="col-auto d-flex align-items-center m-2">
        <label for="strokeWidth">Stroke Width:&nbsp;</label>
        <input
          type="range"
          id="strokeWidth"
          v-model="store.styleOptions.strokeWidth"
          min="1"
          max="10"
        />
      </div>
      <!-- Fill color picker -->
      <div class="col-auto d-flex align-items-center m-2">
        <label for="fillColor">Fill Color:&nbsp;</label>
        <input
          type="color"
          id="fillColor"
          v-model="store.styleOptions.fillColor"
        />
      </div>
      <!-- Fill opacity range slider -->
      <div class="col-auto d-flex align-items-center m-2">
        <label for="fillOpacity">Fill Opacity:&nbsp;</label>
        <input
          type="range"
          id="fillOpacity"
          v-model="store.styleOptions.fillOpacity"
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>

    <div class="col-auto d-flex align-items-center" v-if="store.isAddingMarker">
      <div class="col-auto d-flex align-items-center m-2">
        <label for="iconUrl">Icon URL:&nbsp;</label>
        <input
          id="iconUrl"
          type="text"
          v-model="store.markerCustomizations.iconUrl"
        />
      </div>
      <div class="col-auto d-flex align-items-center m-2">
        <label for="iconScale">Icon Scale:&nbsp;</label>
        <input
          type="number"
          id="iconScale"
          v-model="store.markerCustomizations.iconScale"
          min="0.1"
          step="0.1"
        />
      </div>
      <div class="col-auto d-flex align-items-center m-2">
        <label for="labelText">Label Text:&nbsp;</label>
        <input
          id="labelText"
          type="text"
          v-model="store.markerCustomizations.labelText"
        />
      </div>
      <div class="col-auto d-flex align-items-center m-2">
        <label for="labelSize">Label Size:&nbsp;</label>
        <input
          type="number"
          id="labelSize"
          v-model="store.markerCustomizations.labelSize"
          min="8"
          step="1"
        />
      </div>
      <div class="col-auto d-flex align-items-center m-2">
        <label for="labelColor">Label Color:&nbsp;</label>
        <input
          id="labelColor"
          type="color"
          v-model="store.markerCustomizations.labelColor"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MapControlsComponent",
  inject: ["store", "actions"],
  data() {
    return { styleOptions: this.store.styleOptions };
  },
  // Watcher for style options
  watch: {
    styleOptions: {
      deep: true,
      handler() {
        this.actions.updateStyles();
      },
    },
  },
};
</script>
