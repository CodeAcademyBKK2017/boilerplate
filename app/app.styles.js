import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e9e9ee',
    padding: 10,
    ...Platform.select({
      ios: {
        paddingTop: 30
      },
      android: {
        paddingTop: 10
      }
    })
  },
  title: {
    fontSize: 20,
    width: '100%'
  },
  textInput: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 5,
    height: 100,
    padding: 12
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 10
  }
});