import { StyleSheet, Dimensions } from 'react-native';
let { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical:24
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    backgroundColor: 'yellow',
    borderRadius: 12,
  },
  searchContent: {
    fontSize: 20,
  },
  searchInput: {
    height: 40,
    borderRadius: 12,
    color: 'black',
    backgroundColor: 'white',
    width: 280,
  },
  searchInputContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filmContainer: {
    justifyContent: 'center',
    paddingVertical: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    height: 40,
    width: width - 30,
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 16,
  },
  filmContent: {
    fontSize: 24,
    color: 'rgb(255,232,31)',
  },
});
