<template>
  <!-- Top bar for edit mode toggle and delete feature -->

  <div class="d-flex flex-wrap justify-content-between mb-1">
    <div class="d-flex flex-wrap align-items-center">
      <!-- Geometry type selection and undo button -->
      <div class="mb-2 mb-md-0">
        <!-- Added margin-bottom for small screens -->
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

      <!-- Checkbox to enable edit mode -->
      <div class="form-check mx-2 mb-2 mb-md-0">
        <!-- Added margin-bottom for small screens -->
        <input
          type="checkbox"
          class="form-check-input"
          id="editMode"
          @change="actions.toggleEditMode($event.target.checked)"
        />
        <label for="editMode" class="form-check-label">Edit Mode</label>
      </div>

      <!-- Checkbox to enable marker mode -->
      <div class="form-check mx-2">
        <input
          type="checkbox"
          class="form-check-input"
          id="markerMode"
          @change="store.isAddingMarker = $event.target.checked"
        />
        <label for="markerMode" class="form-check-label">Add Markers</label>
      </div>
    </div>
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
