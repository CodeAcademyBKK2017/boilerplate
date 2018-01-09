const deleteItem = (data, deleteData) => {
  const dataClone = [...data];
  const deletePosition = dataClone.indexOf(deleteData);
  dataClone.splice(deletePosition, 1);
  return dataClone;
};

export default {deleteItem};