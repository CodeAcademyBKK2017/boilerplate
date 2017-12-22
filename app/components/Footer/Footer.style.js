import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  status: {
    width: '100%',
    paddingVertical: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  saveButtonTouch: {
    backgroundColor: '#eee'
  },
  saveButtonContent: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

export default styles;
