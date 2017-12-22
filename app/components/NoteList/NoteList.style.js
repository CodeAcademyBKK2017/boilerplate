import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  noteTitle: {
    fontWeight: 'bold'
  },
  dummyContainer: {
    paddingVertical: 10
  },
  itemTouch: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,

    backgroundColor: 'white'
  },
  itemContainer: {
    padding: 10,

    flexDirection: 'row',
    alignItems: 'center'
  },
  noteContainer: {
    flex: 1
  },
  deleteTouch: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 10
  },
  itemContent: {
    fontSize: 12
  },
  deleteTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  }
});

export default styles;
