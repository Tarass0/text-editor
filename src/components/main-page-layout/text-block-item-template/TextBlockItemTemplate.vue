<template>
  <span
    :id="textBlock.id"
    class="text-block__item"
    v-bind:style="{
      color: textBlock.color,
      fontSize: textBlock.fontSize,
      backgroundColor: textBlock.backgroundColor,
    }"
    >{{ textBlock.text }}</span
  >
</template>

<script>
export default {
  props: {
    textBlock: Object,
    required: true,
  },
};
</script>

<style scoped lang="scss">
span {
  word-break: break-all;
  margin: 2px;
  border: 1px solid #6f6f70;
}
</style>
