<template>
  <div class="wrapper">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <label for="text">Enter your text:</label>
        <input
          id="text"
          type="text"
          v-model="text"
          v-bind:class="{ invalid: isTextInputValid }"
          @blur="isInputTouched = true"
        />
        <small class="error__block" v-if="isTextInputValid">Add any text</small>
      </fieldset>
      <fieldset>
        <label for="font__size">Enter your font-size:</label>
        <input id="font__size" type="number" v-model="fontSize" />
      </fieldset>
      <fieldset>
        <label for="text__color">Enter text color:</label>
        <input id="text__color" type="color" v-model="textColor" />
      </fieldset>
      <fieldset>
        <label for="background__color">Enter background color:</label>
        <input id="background__color" type="color" v-model="backgroundColor" />
      </fieldset>
      <button type="submit" class="bth bth__text-block" :disabled="canSubmitFrom">
        Create text-block
      </button>
    </form>
    <div class="success__msg" v-if="showSuccessMessage">
      Text block was created
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      fontSize: '16',
      textColor: '#000000',
      backgroundColor: '#ffffff',
      isInputTouched: false,
      showSuccessMessage: false,
    };
  },
  computed: {
    isTextInputValid() {
      return this.isInputTouched && !this.text.trim();
    },
    canSubmitFrom() {
      return !this.text.trim();
    },
  },
  methods: {
    onSubmit() {
      const newTextBlock = {
        id: new Date().getTime(),
        text: this.text,
        fontSize: this.fontSize + 'px',
        color: this.textColor,
        backgroundColor: this.backgroundColor,
      };
      this.$store.commit('addNewTextBlock', newTextBlock);
      this.setDefaultFormState();
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2500);
    },
    setDefaultFormState() {
      this.text = '';
      this.fontSize = 16;
      this.textColor = '#000000';
      this.backgroundColor = '#ffffff';
      this.isInputTouched = false;
    },
  },
};
</script>

<style scoped lang="scss">
form {
  fieldset {
    border-bottom: 1px solid #6f6f70;
    padding-top: 10px;
    padding-bottom: 5px;
    label {
      font-size: 18px;
      margin-right: 5px;
    }
    input {
      box-sizing: border-box;
      margin: 5px 0;
    }
    input#text {
      width: 100%;
    }
    input#text.invalid {
      border: 1px solid red;
    }
    small.error__block {
      display: block;
      color: red;
      padding: 5px;
    }
    button {
      margin-left: 15px;
    }
  }
  .bth__text-block {
    margin-top: 10px;
  }
}
.success__msg {
  position: fixed;
  z-index: 2;
  right: 10px;
  top: 10px;
  padding: 5px 10px;
  color: white;
  background: green;
}
</style>
