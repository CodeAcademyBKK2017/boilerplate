import {
  StyleSheet
} from 'react-native';
      
const footerStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  fontTitle: {
    fontWeight: 'bold'
  },
  chacters: {
    textAlign: 'right'
  }
});
      
export default footerStyles;