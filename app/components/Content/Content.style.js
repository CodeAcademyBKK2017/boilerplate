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
    borderRadius: 3
  },
  content: {
    flexDirection: 'row',
    margin: 20
  },
  conArea: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    margin: 30
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