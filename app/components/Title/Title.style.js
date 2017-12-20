import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    marginTop: 20
    // flex: 2,
    // justifyContent: 'flex-start',
     
  },
  textRow: {
    flexDirection: 'row' 
  },
  titleText: {
    fontWeight: '600'
  },
  titleEn: {
    borderWidth: 1,
    borderColor: '#d2d3d5',
    padding: 3,
    borderRadius: 5,
    backgroundColor: '#ece9e9',
    fontWeight: '600'
  },
  titleLeft: {
    flex: 1
  },
  titleInput: {
    minWidth: '100%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#fff'
  
  }
});