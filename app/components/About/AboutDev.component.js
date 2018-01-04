import AboutDevStyle from './AboutDev.style';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import noop from 'lodash/noop';
// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

export default class AboutDev extends Component {
  render () {
    return (
      <View style={AboutDevStyle.main}>
        <Text>
         About the Creators
        </Text>
      </View>
    );
  }
}

AboutDev.propTypes = {
};
AboutDev.defaultProps = {
};
