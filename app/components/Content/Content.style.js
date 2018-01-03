import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  title: {
    paddingVertical: 10,
    fontStyle: 'italic'
  },
  titleCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    padding: 10
  },
  textInput: {
    width: '100%',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    textAlignVertical: 'top',
    backgroundColor: 'white'
  }
});

export default styles;
