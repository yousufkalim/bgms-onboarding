<template>
  <button :class="classes" :type="type || ''" @click="handleClick">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    classes: {
      type: String,
      default: "btn btn-primary",
    },
    type: String,
    name: String,
    click: Function,
  },
  methods: {
    handleClick(e) {
      if (this.click) {
        this.click(e);
      }
    },
  },
};
</script>
