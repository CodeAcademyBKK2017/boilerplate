import React, {StyleSheet} from 'react-native';
  
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece9e9'
  },
  title: {
    flex: 0,
    flexDirection: 'row',
    margin: 30
  },
  conFlat: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30
  },
  flatText: {
    padding: 3,
    fontWeight: '700'
  },
  flatTitle: {
    fontWeight: '700'
  },
  flat: {
    flex: 0,
    backgroundColor: '#eee'
  },
  row: {
    flexDirection: 'row'
  },
  swipe: {
    flex: 1
  }
});