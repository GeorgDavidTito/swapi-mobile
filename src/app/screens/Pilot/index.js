import React, { useRef } from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import PilotShips from './PilotShips';
import { useDispatch } from 'react-redux';
import { getPilotShips } from '../../../redux/pilotShips/actions';

const Pilot = (props) => {
  let refRBSheet = useRef();
  const dispatch = useDispatch();

  const { item } = props.route.params;

  const handleGetShips = () => {
    refRBSheet.current.open();
    dispatch(getPilotShips(item.starships));
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.text}>Nombre: {item.name}</Text>
          <Text style={styles.text}>Año de nacimiento: {item.birth_year}</Text>
          <Text style={styles.text}>Genero: {item.gender}</Text>
          <Text style={styles.text}>Color de pelo: {item.hair_color}</Text>
          <Text style={styles.text}>Altura: {item.height}</Text>
          <Text style={styles.text}>Masa: {item.mass}</Text>
          <Text style={styles.text}>Color de piel: {item.skin_color}</Text>
          {item.starships.length > 0 && (
            <TouchableOpacity style={styles.linkContainer}>
              <Text style={styles.link} onPress={handleGetShips}>
                Ver Naves
              </Text>
            </TouchableOpacity>
          )}
          <RBSheet
            ref={refRBSheet}
            openDuration={250}
            height={400}
            duration={250}
            customStyles={{
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#0D0D0D',
              },
            }}>
            <PilotShips navigation={props.navigation} refRBSheet={refRBSheet} />
          </RBSheet>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Pilot;
