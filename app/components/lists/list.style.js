import {
  StyleSheet
} from 'react-native';
  
export default StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    padding: 10,
    flex: 5
  },
  touchStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, .10)',
    padding: 5,
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold'
  },
  textView: {
    flex: 7,
    flexDirection: 'column'
  },
  deleteBTN: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  swipoutStyle: {
    flexDirection: 'column',
    backgroundColor: '#F5FCFF'
  }
});