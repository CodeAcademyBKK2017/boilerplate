import React, {StyleSheet} from 'react-native';

// export default StyleSheet.create({}); //<===== what is this?
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
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
  }
});