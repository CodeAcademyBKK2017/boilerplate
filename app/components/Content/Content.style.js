import React, {StyleSheet} from 'react-native';
  
export default StyleSheet.create({
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    fontStyle: 'italic'
  },
  textArea: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 5,
    color: '#ababab',
    borderRadius: 3,
    height: 200
  },
  content: {
    flexDirection: 'row',
    margin: 20
  },
  conArea: {
    flex: 0,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    flex: 0,
    flexDirection: 'row',
    margin: 10
  },
  noteLeft: {
    flex: 1
  },
  noteRight: {
    flex: 0
  },
  note: {
    fontWeight: '600'
  }
});