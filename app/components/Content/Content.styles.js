import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    paddingBottom: 10
  },
  title: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic'
  },
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c4c4c5',
    borderRadius: 3,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff'
  }
});