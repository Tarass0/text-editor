<template>
  <div class="wrapper">
    <label for="text__color">Enter new background-color:</label>
    <input
      id="text__color"
      type="color"
      v-model="currentBackgroundColor"
      @blur="isInputTouched = true"
      @change="onChangeBackgroundColor"
    />
    <button
      type="button"
      class="button bth__change-text-color"
      :disabled="hasSomeChanges"
      @click="updateBackgroundColor"
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
      currentBackgroundColor: this.backgroundColor,
      startBackgroundColor: this.backgroundColor,
      isInputTouched: false,
    };
  },
  props: {
    backgroundColor: {
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
      return this.currentBackgroundColor === this.startBackgroundColor;
    },
  },
  methods: {
    onSubmit() {
      console.log(this.currentFontSize);
    },
    onChangeBackgroundColor() {
      this.$emit('on-preview-new-background-color', this.currentBackgroundColor);
    },

    updateBackgroundColor() {
      this.$emit('on-save', { property: 'backgroundColor', value: this.currentBackgroundColor });
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
