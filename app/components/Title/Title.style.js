import {
  StyleSheet
} from 'react-native';
  
const titleStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputBox: {
    minWidth: '100%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: 'white'
  },
  fontTitle: {
    fontWeight: 'bold'
  }
});
  
export default titleStyles;