<template>
  <!-- Top bar for edit mode toggle and delete feature -->
  <div class="d-flex flex-wrap justify-content-between mb-1">
    <div class="d-flex flex-wrap align-items-center">
      <!-- Geometry type selection and undo button -->
      <div class="mb-2 mb-md-0">
        <!-- Added margin-bottom for small screens -->
        <span class="input-group">
          <label class="input-group-text" for="type">Geometry type:</label>

          <Select
            name="drawType"
            :selected="store.drawType"
            :options="['None', 'Point', 'LineString', 'Polygon', 'Circle']"
            @change="
              (e) => {
                store.drawType = e.target.value;
                actions.disableMarkerMode();
                actions.toggleEditMode(false);
                actions.addInteraction(e.target.value);
              }
            "
          />

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
      <Checkbox
        name="editMode"
        label="Edit Mode"
        :checked="store.isEditing"
        @change="actions.toggleEditMode($event.target.checked)"
      />

      <!-- Checkbox to enable marker mode -->
      <Checkbox
        classes="form-check mx-2"
        name="markerMode"
        label="Add Markers"
        :checked="store.isAddingMarker"
        @change="
          (e) => {
            actions.disableDrawMode();
            actions.toggleEditMode(false);
            store.isAddingMarker = e.target.checked;
          }
        "
      />
    </div>

    <!-- Delete button, shown only when a drawing is selected -->
    <Button
      v-if="store.drawingSelected"
      classes="btn btn-danger"
      :click="actions.deleteSelectedFeature"
      name="Delete"
    />
  </div>
</template>

<script>
import Select from "@/components/common/Select.vue";
import Checkbox from "@/components/common/Checkbox.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: "MapFeaturesComponent",
  inject: ["store", "actions"],
  components: { Select, Checkbox, Button },
};
</script>
