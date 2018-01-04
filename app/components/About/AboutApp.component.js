import AboutAppStyle from './AboutApp.style';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import noop from 'lodash/noop';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

export default class AboutApp extends Component {
  render () {
    return (
      <View style={AboutAppStyle.main}>
        <Text>
         About the App
        </Text>
      </View>
    );
  }
}

AboutApp.propTypes = {
};
AboutApp.defaultProps = {
};
