import React, {StyleSheet} from 'react-native';
  
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ece9e9'
  },
  title: {
    flex: 0,
    flexDirection: 'row',
    margin: 30
  },
  conFlat: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 30,
    marginRight: 30
  },
  flatText: {
    padding: 3
  },
  flatTitle: {
    fontWeight: '700'
  },
  flat: {
    flex: 1,
    flexDirection: 'row'
  }
});