<template>
  <div class="wrapper">
    <label for="font__size">Enter new font-size(px):</label>
    <input
      id="font__size"
      type="number"
      min="1"
      v-model="currentFontSize"
      v-bind:class="{ invalid: isInputTouched && !haveSomeChanges }"
      @keyup="inputValidation"
    />
    <button
      type="button"
      class="button bth__change-font-size"
      :disabled="!haveSomeChanges || blockBth"
      @click="updateFontSize"
    >
      Save new fontSize
    </button>
    <small v-if="isInputTouched && !haveSomeChanges">{{ infoMessage }}</small>
    <small v-if="blockBth">Choose text which you want to edit again</small>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      currentFontSize: parseInt(this.fontSize),
      startFontSize: parseInt(this.fontSize),
      infoMessage: '',
      isInputTouched: false,
      haveSomeChanges: false,
      blockBth: false,
    };
  },
  props: {
    fontSize: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    isStringHighlightedFull: {
      type: Boolean,
      required: true,
    },
    selectedText: {
      type: String,
      required: true,
    },
  },
  computed: {
    // ...mapGetters(['getStartAndEndIndexSubString', 'getTextBlockById']),
  },
  methods: {
    inputValidation() {
      this.isInputTouched = true;
      if (this.currentFontSize <= 0) {
        this.infoMessage = 'It must be only positive number';
        this.haveSomeChanges = false;
      } else if (+this.currentFontSize === this.startFontSize) {
        this.infoMessage = 'No changes were made';
        this.haveSomeChanges = false;
      } else {
        this.haveSomeChanges = true;
        this.$emit('on-preview-new-fontSize', this.currentFontSize + 'px');
      }
    },
    updateFontSize() {
      this.$emit('on-save', { property: 'fontSize', value: this.currentFontSize + 'px' });
      this.blockBth = true;
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
