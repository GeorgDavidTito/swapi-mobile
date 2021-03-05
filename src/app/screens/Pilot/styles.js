import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },
  text: {
    fontSize: 16,
    padding: 16,
    color: 'rgb(255,232,31)' 
  },
  linkContainer: {
    alignSelf: 'center',
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    width: '95%',
    alignItems: 'center',
    backgroundColor: 'rgb(255,232,31)',
    borderRadius: 12,
    margin: 4,
  },
  link: {
    fontSize: 20,
    color:'white',
    fontWeight: 'bold'
  },
  scroll: {
    flexGrow: 1,
    padding: 16,
  },
});
