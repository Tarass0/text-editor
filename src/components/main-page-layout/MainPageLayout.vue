<template>
  <div class="wrapper">
    <AddNewTextBlock />
    <div class="text__wrapper" v-if="!!getTextBlocksCount">
      <div class="title">Your text blocks:</div>
      <div class="content" @mouseup="onMouseUp" @mousedown="onMouseDown">
        <TextBlockTemplate
          v-for="textBlock of getTextBlocks"
          :key="textBlock.id"
          v-bind:textBlock="textBlock"
        />
      </div>
    </div>
    <div class="info__message" v-if="!!!getTextBlocksCount">
      You don't have text blocks
    </div>
    <div class="info__message" v-if="showInfoMessage">
      Select text from one text block and do not select text from another
    </div>
    <EditingPanelTemplate
      v-if="showEditingTemplate"
      v-bind:currentTextBlockInfo="textBlockForEditing"
      v-bind:selectedText="selectedText"
      @on-close-editor="showEditingTemplate = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddNewTextBlock from '@/components/main-page-layout/add-new-text-block-template/AddNewTextBlockTemplate.vue';
import TextBlockTemplate from '@/components/main-page-layout/text-block-item-template/TextBlockItemTemplate.vue';
import EditingPanelTemplate from '@/components/main-page-layout/editing-panel-template/EditingPanelTemplate.vue';
export default {
  data() {
    return {
      showEditingTemplate: false,
      showInfoMessage: false,
      textBlockForEditing: {},
      selectedText: '',
    };
  },
  computed: {
    ...mapGetters(['getTextBlocks', 'getTextBlocksCount', 'getTextBlockById']),
  },
  mounted() {
    this.$store.commit('connectionSameStrings');
  },
  components: {
    AddNewTextBlock,
    TextBlockTemplate,
    EditingPanelTemplate,
  },
  methods: {
    onMouseDown() {
      this.showEditingTemplate = false;
    },
    onMouseUp() {
      const selection = window.getSelection();
      if (!!selection.toString().trim()) {
        const id = parseInt(selection.anchorNode.parentNode['id']);
        const textBlock = this.getTextBlockById(id);
        if (textBlock.text.includes(selection.toString())) {
          this.showEditingTemplate = true;
          this.showInfoMessage = false;
          this.selectedText = selection.toString();
          this.textBlockForEditing = textBlock;
        } else {
          this.showInfoMessage = true;
        }
      } else {
        this.showInfoMessage = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  .text__wrapper {
    .title {
      font-size: 22px;
      font-weight: bold;
      margin: 10px 0;
    }
    .content {
      /*display: inline-block;*/
      border: 1px solid #6f6f70;
      padding: 10px;
    }
  }
  .info__message {
    font-size: 18px;
    text-align: center;
    background: #ec2929;
    border: 1px solid #6f6f70;
    padding: 10px;
    margin: 10px 0;
  }
}
</style>
