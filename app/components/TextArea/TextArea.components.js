import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class TextArea extends Component {
  render () {
    return (
      <View>
        <Text style={styles.welcome}>
                Please enter note here
        </Text>
        <TextInput
          style={styles.textin}
          // onChangeText={this.state.nans}
          multiline = {true}
          underlineColorAndroid = 'transparent'
          numberOfLines = {4}
          value = ''
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textin: {
    width: 250,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1
  }
});
export default TextArea;