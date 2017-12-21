import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentStyle: {
    flex: 1,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  },
  contentStyleColum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  textInput: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    padding: 10
  },
  textContent: {
    flex: 1,
    justifyContent: 'flex-start',
    fontStyle: 'italic',
    color: '#333333'
  },
  saveTabStyle: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  saveTextStyle: {
    fontWeight: 'bold'
  },
  flexOne: {
    flex: 1
  }
});
