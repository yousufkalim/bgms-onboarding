<template>
  <div :class="classes">
    <input
      :type="type"
      class="form-control"
      :id="`${name}-${label.replace(' ', '')}`"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('change', { name, value: $event.target.value })"
    />
    <label :for="`${name}-${label.replace(' ', '')}`">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    classes: {
      type: String,
      default: "form-floating mb-3",
    },
    type: {
      type: String,
      default: "text",
    },
    name: String,
    value: String,
    placeholder: String,
    label: String,
  },
};
</script>
