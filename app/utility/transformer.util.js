const deleteItem = (data, deleteDate) => {
  const dataClone = [...data];
  const deletePosition = dataClone.indexOf(deleteDate);
  dataClone.splice(deletePosition, 1);
  return dataClone;
};

export default {deleteItem};