<template>
  <div class="wrapper">
    <div class="buttons">
      <button
        type="button"
        class="bth bth__edit-fontSize"
        v-bind:class="{ active__mode: editingState === 'fontSize' }"
        @click="onBthEditFontSize"
      >
        Edit font size
      </button>
      <button
        type="button"
        class="bth bth__edit-text-color"
        v-bind:class="{ active__mode: editingState === 'textColor' }"
        @click="onBthEditTextColor"
      >
        Edit text color
      </button>
      <button
        type="button"
        class="bth bth__edit-background-color"
        v-bind:class="{ active__mode: editingState === 'backgroundColor' }"
        @click="onBthEditBackgroundColor"
      >
        Edit background color
      </button>
    </div>
    <div class="editing">
      <div class="selected__text">
        <span>Your selected text:</span> <span v-bind:style="styleObject"> {{ selectedText }}</span>
      </div>
      <FontSizeMode
        v-if="editingState === 'fontSize'"
        v-bind:fontSize="currentTextBlockInfo.fontSize"
        v-bind:id="currentTextBlockInfo.id"
        v-bind:isStringHighlightedFull="isStringHighlightedFull"
        v-bind:selectedText="selectedText"
        @on-preview-new-fontSize="setPreviewNewProperty('fontSize', $event)"
        @on-save="saveChanges($event)"
      />
      <TextColorMode
        v-if="editingState === 'textColor'"
        v-bind:color="currentTextBlockInfo.color"
        v-bind:id="currentTextBlockInfo.id"
        @on-preview-new-text-color="setPreviewNewProperty('color', $event)"
        @on-save="saveChanges($event)"
      />
      <BackgroundColorMode
        v-if="editingState === 'backgroundColor'"
        v-bind:backgroundColor="currentTextBlockInfo.backgroundColor"
        v-bind:id="currentTextBlockInfo.id"
        @on-preview-new-background-color="setPreviewNewProperty('backgroundColor', $event)"
        @on-save="saveChanges($event)"
      />
    </div>
    <button type="button" class="bth bth-delete" @click="onDeleteText">
      Delete text
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FontSizeMode from '@/components/main-page-layout/editing-panel-template/editing-modes/EditFontSizeMode.vue';
import TextColorMode from '@/components/main-page-layout/editing-panel-template/editing-modes/EditTextColorMode.vue';
import BackgroundColorMode from '@/components/main-page-layout/editing-panel-template/editing-modes/EditBackgroundColorMode.vue';
export default {
  data() {
    return {
      editingState: 'fontSize',
      styleObject: {
        color: this.currentTextBlockInfo.color,
        fontSize: this.currentTextBlockInfo.fontSize,
        backgroundColor: this.currentTextBlockInfo.backgroundColor,
      },
      isStringHighlightedFull: false,
      canDelete: true,
    };
  },
  props: {
    selectedText: {
      type: String,
      required: true,
    },
    currentTextBlockInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getStartAndEndIndexSubString', 'getTextBlockById']),
  },
  components: {
    FontSizeMode,
    TextColorMode,
    BackgroundColorMode,
  },
  mounted() {
    if (this.currentTextBlockInfo.text === this.selectedText) {
      this.isStringHighlightedFull = true;
    } else {
      this.isStringHighlightedFull = false;
    }
  },
  methods: {
    onBthEditFontSize() {
      if (this.editingState === 'fontSize') return;
      this.editingState = 'fontSize';
    },
    onBthEditTextColor() {
      if (this.editingState === 'textColor') return;
      this.editingState = 'textColor';
    },
    onBthEditBackgroundColor() {
      if (this.editingState === 'backgroundColor') return;
      this.editingState = 'backgroundColor';
    },
    setPreviewNewProperty(property, value) {
      this.styleObject[property] = value;
    },
    saveChanges({ property, value }) {
      this.$emit('on-close-editor');
      if (this.isStringHighlightedFull) {
        this.$store.commit('setNewProperty', {
          blockId: this.currentTextBlockInfo.id,
          property: property,
          value: value,
        });
      } else {
        this.breakString();
      }
    },
    breakString() {
      const indexesSubString = this.getStartAndEndIndexSubString({
        blockId: this.currentTextBlockInfo.id,
        selectedText: this.selectedText,
      });
      this.$store.commit('breakString', {
        blockId: this.currentTextBlockInfo.id,
        startIndexOfSubString: indexesSubString.startIndexOfSubString,
        endIndexOfSubString: indexesSubString.endIndexOfSubString,
        currentStyles: this.styleObject,
        selectedTextLength: this.selectedText.length,
      });
    },
    onDeleteText() {
      const indexesSubString = this.getStartAndEndIndexSubString({
        blockId: this.currentTextBlockInfo.id,
        selectedText: this.selectedText,
      });
      this.$store.commit('deleteText', {
        blockId: this.currentTextBlockInfo.id,
        startIndexOfSubString: indexesSubString.startIndexOfSubString,
        endIndexOfSubString: indexesSubString.endIndexOfSubString,
        deleteFullBlock: this.isStringHighlightedFull,
        selectedTextLength: this.selectedText.length,
      });
      this.$emit('on-close-editor');
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  .buttons {
    margin-top: 15px;
    button {
      margin-left: 10px;
    }
    .active__mode {
      border: 1px solid #055a05;
      background: #055a05;
      color: #ffffff;
    }
  }
  .editing {
    margin-top: 10px;
    .selected__text {
      word-break: break-all;
      span:first-child {
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
  .bth-delete {
    margin-top: 15px;
    background: red;
    border: 1px solid black;
    color: white;
  }
}
@media screen and (max-width: 565px) {
  .wrapper {
    .buttons {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-top: 15px;
      button {
        margin-left: 0;
        margin-top: 5px;
      }
    }
    .editing {
      .selected__text {
        padding: 10px 0;
      }
    }
  }
}
</style>
