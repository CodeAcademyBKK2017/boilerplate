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
  itemTouch: {
    // backgroundColor: '#eee',
    // paddingVertical: 10,
    // paddingHorizontal: 10
  },
  itemContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  evenContainer: {
    backgroundColor: '#e4e4e4'
  },
  oddContainer: {
    backgroundColor: 'white'
  },
  noteContainer: {
    flex: 1
  },
  deleteTouch: {
    backgroundColor: '#f00',
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
