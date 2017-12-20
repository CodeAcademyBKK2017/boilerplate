import React, {Component} from 'react';
import {

  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View style={styles.conView}>
        <Text style={styles.welcome}>
         Please type your note below
        </Text>
        <TextInput
          style={styles.textin}
          // onChangeText={this.state.nans}
          multiline = {true}
          underlineColorAndroid = 'transparent'
          numberOfLines = {4}   
          placeholder='-Understand how react-native works.'
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  welcome: {
    fontSize: 12,
    // textAlign: 'center',
    margin: 10
   
  },
  conView: {
    flex: 1,
    marginTop: 10
  },
  textin: {
    // width: 300,
    // height: 300,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#fff'

  }
});
export default Content;