<template>
  <div class="row mt-1">
    <!-- Geometry type selection and undo button -->
    <div class="col-auto">
      <span class="input-group">
        <label class="input-group-text" for="type">Geometry type:</label>
        <select
          class="form-select"
          id="type"
          v-model="store.drawType"
          @change="actions.addInteraction($event.target.value)"
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
          @click="actions.undoLastDraw"
        />
      </span>
    </div>

    <!-- Style controls, displayed when drawing is active -->
    <div class="col-auto d-flex align-items-center" v-if="store.draw">
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
