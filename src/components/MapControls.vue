<template>
  <div class="row mt-1">
    <!-- Style controls, displayed when drawing is active -->
    <div
      class="col-auto d-flex flex-wrap align-items-center"
      v-if="store.drawType !== 'None'"
    >
      <!-- Stroke color picker -->
      <Input
        type="color"
        name="strokeColor"
        :value="store.styleOptions.strokeColor"
        label="Stroke Color"
        classes="m-2"
        @change="handleShapeStyleChange"
      />
      <!-- Stroke width range slider -->
      <Input
        type="range"
        name="strokeWidth"
        :value="store.styleOptions.strokeWidth"
        label="Stroke Width"
        classes="m-2"
        @change="handleShapeStyleChange"
      />
      <!-- Fill color picker -->
      <Input
        type="color"
        name="fillColor"
        :value="store.styleOptions.fillColor"
        label="Fill Color"
        classes="m-2"
        @change="handleShapeStyleChange"
      />
      <!-- Fill opacity range slider -->
      <Input
        type="range"
        name="fillOpacity"
        :value="store.styleOptions.fillOpacity"
        label="Fill Opacity"
        classes="m-2"
        @change="handleShapeStyleChange"
      />
    </div>

    <!-- Marker controls, displayed when marker is active -->
    <div
      class="col-auto d-flex flex-wrap align-items-center"
      v-if="store.isAddingMarker"
    >
      <Input
        name="iconUrl"
        :value="store.markerCustomizations.iconUrl"
        @change="handleMarkerStyleChange"
        label="Icon URL"
        classes="m-2"
      />

      <Input
        name="labelText"
        :value="store.markerCustomizations.labelText"
        @change="handleMarkerStyleChange"
        label="Label Text"
        classes="m-2"
      />
      <Input
        type="range"
        name="iconScale"
        :value="store.markerCustomizations.iconScale"
        label="Icon Scale"
        classes="m-2"
        @change="handleShapeStyleChange"
      />
      <Input
        type="range"
        name="labelSize"
        :value="store.markerCustomizations.labelSize"
        label="Label Size"
        classes="m-2"
        @change="handleShapeStyleChange"
      />

      <Input
        type="color"
        name="labelColor"
        :value="store.markerCustomizations.labelColor"
        label="Label Color"
        classes="m-2"
        @change="handleShapeStyleChange"
      />
    </div>
  </div>
</template>

<script>
import Input from "@/components/common/Input.vue";

export default {
  name: "MapControlsComponent",
  inject: ["store", "actions"],
  components: { Input },
  data() {
    return { styleOptions: this.store.styleOptions };
  },
  methods: {
    handleShapeStyleChange(e) {
      this.store.styleOptions[e.name] = e.value;
    },
    handleMarkerStyleChange(e) {
      this.store.markerCustomizations[e.name] = e.value;
    },
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
