<template>
  <!-- Top bar for edit mode toggle and delete feature -->
  <div class="w-100 mb-1 d-flex justify-content-between">
    <!-- Checkbox to enable edit mode -->
    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="editMode"
        @change="actions.toggleEditMode($event.target.checked)"
      />
      <label for="editMode" class="form-check-label">Edit Mode</label>
    </div>

    <!-- Delete button, shown only when a drawing is selected -->
    <button
      v-if="store.drawingSelected"
      class="btn btn-danger"
      @click="actions.deleteSelectedFeature"
    >
      Delete
    </button>
  </div>

  <!-- Map container -->
  <div id="map" class="map w-100 h-100"></div>
</template>

<script>
export default {
  name: "OpenLayersComponent",
  inject: ["store", "actions"],
};
</script>
