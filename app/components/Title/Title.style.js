import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  header: {
    width: '100%',
    paddingBottom: 10,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontWeight: 'bold'
  },
  // languageButton: {
  //   flex: 1
  // },
  textInput: {
    width: '100%',
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  }
});

export default styles;
