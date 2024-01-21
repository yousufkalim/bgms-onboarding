<template>
  <div :class="classes">
    <!-- Added margin-bottom for small screens -->
    <input
      type="checkbox"
      class="form-check-input"
      :checked="checked"
      :name="name"
      :id="label.replace(' ', '')"
      @change="$emit('change', $event)"
    />
    <label :for="label.replace(' ', '')" class="form-check-label">{{
      label
    }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckboxComponent",
  props: {
    classes: {
      type: String,
      default: "form-check mx-2 mb-2 mb-md-0",
    },
    name: String,
    checked: Boolean,
    label: String,
  },
};
</script>
