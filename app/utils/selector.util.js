const getSelector = (key) => (store) => (store[key]);

export const selectNotes = getSelector('notes'); 

export default getSelector; 