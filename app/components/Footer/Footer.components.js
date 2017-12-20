import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Footer extends Component {
  render () {
    return (
      <View style={styles.Foot}>
        <View style={styles.footerRow}>
          
          <Text style={styles.fonts}>Save</Text>
          
          <Text style={styles.footSave}>150 chacters</Text>
          
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footSave: {
    textAlign: 'right'
  },
  fonts: {
    fontWeight: '600'
  },
  Foot: {
    marginTop: 20,
    marginBottom: 20
  }

});
export default Footer;