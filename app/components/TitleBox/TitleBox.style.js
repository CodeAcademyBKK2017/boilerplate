import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  titleStyle: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  TitleStyleColum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  instructions: {
    color: '#333333'
  },
  textInput: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    padding: 10,
    fontWeight: 'bold'
  },
  textTitle: {
    flex: 1,
    justifyContent: 'flex-start',
    fontWeight: 'bold'
  },
  languageTitle: {
    borderColor: 'gray', 
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#EEEEEE',
    padding: 8
  },
  textLanguage: {
    fontWeight: 'bold'
  }
});
