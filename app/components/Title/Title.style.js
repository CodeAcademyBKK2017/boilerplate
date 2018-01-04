import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    flexDirection: 'column',
    margin: 10
  },
  header: {
    flexDirection: 'row'
  },
  noteLeft: {
    flex: 1,
    justifyContent: 'center'
  },
  noteRight: {
    flex: 0
  },
  note: {
    fontWeight: '600'
  },
  bt: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#eee',
    fontWeight: '600'
  },
  boxArea: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    height: 10
  },
  textArea: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 18,
    fontWeight: '600',
    borderRadius: 3
  }
});