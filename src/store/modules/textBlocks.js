export default {
  actions: {},
  mutations: {
    addNewTextBlock(state, textBlock) {
      state.textBlocks.push(textBlock);
    },
    setNewProperty(state, { blockId, property, value }) {
      const textBlock = state.textBlocks.find((textBlock) => textBlock.id === blockId);
      textBlock[property] = value;
    },
    connectionSameStrings(state) {
      for (let i = 0; i < state.textBlocks.length; i++) {
        if (
          state.textBlocks[i].fontSize === state.textBlocks[i + 1].fontSize &&
          state.textBlocks[i].color === state.textBlocks[i + 1].color &&
          state.textBlocks[i].backgroundColor === state.textBlocks[i + 1].backgroundColor
        ) {
          const connectedBlock = {
            ...state.textBlocks[i],
            text: state.textBlocks[i].text + state.textBlocks[i++].text,
          };
          state.textBlocks.splice(i - 1, 2, connectedBlock);
        }
      }
    },
    breakString(
      state,
      { blockId, startIndexOfSubString, endIndexOfSubString, currentStyles, selectedTextLength },
    ) {
      const textBlock = state.textBlocks.find((textBlock) => textBlock.id === blockId);
      const positionTextBlock = state.textBlocks.indexOf(textBlock);
      const contentOfTextBlock = textBlock.text;
      const array = [];
      if (startIndexOfSubString === 0 || endIndexOfSubString === 'firstLetter') {
        const selectedBlock = {
          id: new Date().getTime(),
          text: contentOfTextBlock.slice(0, selectedTextLength),
          fontSize: currentStyles.fontSize,
          color: currentStyles.color,
          backgroundColor: currentStyles.backgroundColor,
        };
        const block = {
          id: new Date().getTime() + 1,
          text: contentOfTextBlock.slice(1),
          fontSize: textBlock.fontSize,
          color: textBlock.color,
          backgroundColor: textBlock.backgroundColor,
        };
        array.push(selectedBlock, block);
      } else if (endIndexOfSubString === 'lastLetter') {
        const block = {
          id: new Date().getTime(),
          text: contentOfTextBlock.slice(0, -1),
          fontSize: textBlock.fontSize,
          color: textBlock.color,
          backgroundColor: textBlock.backgroundColor,
        };
        const selectedBlock = {
          id: new Date().getTime() + 1,
          text: contentOfTextBlock.slice(-1),
          fontSize: currentStyles.fontSize,
          color: currentStyles.color,
          backgroundColor: currentStyles.backgroundColor,
        };
        array.push(block, selectedBlock);
      } else {
        const leftBlock = {
          id: new Date().getTime(),
          text: contentOfTextBlock.slice(0, startIndexOfSubString),
          fontSize: textBlock.fontSize,
          color: textBlock.color,
          backgroundColor: textBlock.backgroundColor,
        };
        const selectedBlock = {
          id: new Date().getTime() + 1,
          text: contentOfTextBlock.slice(startIndexOfSubString, endIndexOfSubString + 1),
          fontSize: currentStyles.fontSize,
          color: currentStyles.color,
          backgroundColor: currentStyles.backgroundColor,
        };
        const rightBlock = {
          id: new Date().getTime() + 2,
          text: contentOfTextBlock.slice(endIndexOfSubString + 1),
          fontSize: textBlock.fontSize,
          color: textBlock.color,
          backgroundColor: textBlock.backgroundColor,
        };
        array.push(leftBlock, selectedBlock, rightBlock);
      }
      state.textBlocks.splice(positionTextBlock, 1, ...array);
    },
    deleteText(state, { blockId, startIndexOfSubString, selectedTextLength, deleteFullBlock }) {
      if (deleteFullBlock) {
        state.textBlocks = state.textBlocks.filter((textBlock) => {
          return textBlock.id !== blockId;
        });
      } else {
        const textBlock = state.textBlocks.find((textBlock) => textBlock.id === blockId);
        let content = textBlock.text.split('');
        content.splice(startIndexOfSubString, selectedTextLength);
        textBlock.text = content.join('');
      }
    },
  },
  state: {
    textBlocks: [
      {
        id: 1,
        text: 'My cats and dogs',
        fontSize: '18px',
        color: '#33d833',
        backgroundColor: '#c6548f',
      },
      {
        id: 2,
        text: 'Taras',
        fontSize: '30px',
        color: '#ffffff',
        backgroundColor: '#000000',
      },
      {
        id: 3,
        text: 'Taras',
        fontSize: '30px',
        color: '#ffffff',
        backgroundColor: '#000000',
      },
    ],
  },
  getters: {
    getTextBlocks(state) {
      return state.textBlocks;
    },
    getTextBlocksCount(state) {
      return state.textBlocks.length;
    },
    getTextBlockById: (state) => (id) => {
      return state.textBlocks.find((textBlock) => textBlock.id === id);
    },
    getStartAndEndIndexSubString: (state) => ({ blockId, selectedText }) => {
      const textBlock = state.textBlocks.find((textBlock) => textBlock.id === blockId);
      const contentOfTextBlock = textBlock.text;
      const startIndexOfSubString = contentOfTextBlock.search(selectedText);
      let endIndexOfSubString = null;
      if (startIndexOfSubString === 0 && selectedText.length === 1) {
        endIndexOfSubString = 'firstLetter';
      } else if (
        startIndexOfSubString === contentOfTextBlock.length - 1 &&
        selectedText.length === 1
      ) {
        endIndexOfSubString = 'lastLetter';
      } else {
        endIndexOfSubString = startIndexOfSubString + selectedText.length - 1;
      }
      return {
        startIndexOfSubString,
        endIndexOfSubString,
      };
    },
  },
};
