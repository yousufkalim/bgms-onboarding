<template>
  <select
    class="form-select"
    id="type"
    :name="name"
    @change="$emit('change', $event)"
  >
    <option
      v-for="(option, i) in options"
      :value="option"
      :key="i"
      :selected="option === selected"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    classes: {
      type: String,
      default: "form-select",
    },
    name: String,
    selected: String,
    options: Array,
  },
  mounted() {
    console.log(this.selected);
  },
};
</script>
