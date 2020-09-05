<template>
  <div class="wrapper">
    <label for="text__color">Enter new text-color:</label>
    <input
      id="text__color"
      type="color"
      v-model="currentColor"
      @blur="isInputTouched = true"
      @change="onChangeColor"
    />
    <button
      type="button"
      class="button bth__change-text-color"
      :disabled="hasSomeChanges"
      @click="updateTextColor"
    >
      Save new textColor
    </button>
    <small v-if="isInputTouched && hasSomeChanges">No changes were made</small>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentColor: this.color,
      startColor: this.color,
      isInputTouched: false,
    };
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    hasSomeChanges() {
      return this.currentColor === this.startColor;
    },
  },
  methods: {
    onSubmit() {
      console.log(this.currentFontSize);
    },
    onChangeColor() {
      this.$emit('on-preview-new-text-color', this.currentColor);
    },
    updateTextColor() {
      this.$emit('on-save', { property: 'color', value: this.currentColor });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  label {
    font-weight: bold;
    font-size: 18px;
  }
  input {
    margin: 5px;
  }
  input.invalid {
    border: 1px solid #ec0909;
  }
  button {
    margin-left: 10px;
  }
  small {
    display: block;
    color: red;
  }
}
@media screen and (max-width: 565px) {
  .wrapper button {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
