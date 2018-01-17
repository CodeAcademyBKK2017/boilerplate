const getSelector = (key) => (storeState) => storeState[key];

export const getNotesSelector = getSelector('notes');

export default getSelector;
