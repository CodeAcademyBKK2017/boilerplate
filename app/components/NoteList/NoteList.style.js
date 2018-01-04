import {
  StyleSheet
} from 'react-native';
        
const noteListStyles = StyleSheet.create({
  
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  boxContainer: {
    maxHeight: 200
  },

  noteListTitle: {
    fontWeight: '900',
    paddingBottom: 10,
    paddingTop: 10
  },
  whiteBackground: {
    backgroundColor: 'white'
  },
  greyBackground: {
    backgroundColor: 'lightgray'
  },
  delete: {
    paddingTop: 20,
    textAlign: 'right',
    fontWeight: '900'
  }
});
        
export default noteListStyles;