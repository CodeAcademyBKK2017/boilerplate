import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingBottom: 10
  },
  title: {
    fontSize: 13,
    color: '#444',
    fontStyle: 'italic'
  },
  textInput: {
    flex: 1,

    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,

    borderWidth: 1,
    borderColor: '#c4c4c5',
    borderRadius: 3,
    
    backgroundColor: '#ffffff',
    textAlignVertical: 'top'
  }
});