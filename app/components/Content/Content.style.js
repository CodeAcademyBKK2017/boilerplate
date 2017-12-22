import {
  StyleSheet
} from 'react-native';
    
const contentStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1
    // minHeight: 400
  },
  inputBox: {
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: 'white',
    flex: 1,
    textAlignVertical: 'top',
    padding: 10
  },
  fontTitle: {
    fontStyle: 'italic'
  }
});
    
export default contentStyles;