import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class InputText extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Content
        </Text>
        <TextInput style={styles.inputBox} multiline = {true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center'
  },
  inputBox: {
    width: 250,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default InputText;

