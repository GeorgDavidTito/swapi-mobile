import { StyleSheet, Dimensions } from 'react-native';
let { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  shipContainer: {
    justifyContent: 'center',
    paddingVertical: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    height: 70,
    width: width - 30,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    margin: 4,
  },
});
