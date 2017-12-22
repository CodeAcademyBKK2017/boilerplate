import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  noteListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold'
  },
  content: {
    paddingLeft: 10
  },
  delete: {
    color: '#600',
    textAlign: 'right'
  },
  modalTitle: {
    fontWeight: 'bold'
  },
  modalContent: {
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalChildrenWrapper: {
    backgroundColor: '#fff'
  }
});