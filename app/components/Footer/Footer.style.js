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
  },
  noteList: {
    fontWeight: '900',
    paddingBottom: 10,
    paddingTop: 10
  }
});
      
export default footerStyles;