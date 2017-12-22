import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  content: {
    padding: 10,
    fontSize: 15
  },
  header: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    width: '100%'
  },
  box: {
    paddingVertical: 10
  },
  modalContainer: {
    backgroundColor: 'rgba(37, 8, 10, 0.78)'
  },
  modalChildrenWrap: {
    backgroundColor: '#eee',
    alignItems: 'flex-start'
  },
  noteBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  del: {
    color: 'red'
  }
});