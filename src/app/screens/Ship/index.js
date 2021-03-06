import React, { useRef } from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { getShipPilots } from '../../../redux/shipPilots/actions';
import { useDispatch } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import ShipPilots from './ShipPilots';

const Ship = (props) => {
  let refRBSheet = useRef();
  const dispatch = useDispatch();

  const { item } = props.route.params;

  const handleGetPilots = () => {
    refRBSheet.current.open();
    dispatch(getShipPilots(item.pilots));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.text}>Nombre: {item.name}</Text>
          <Text style={styles.text}>Modelo: {item.model}</Text>
          <Text style={styles.text}>Clase: {item.starship_class}</Text>
          <Text style={styles.text}>Fabricante: {item.manufacturer}</Text>
          <Text style={styles.text}>
            Calificación de hiperimpulsor: {item.hyperdrive_rating}
          </Text>
          <Text style={styles.text}>
            Capacidad de carga: {item.cargo_capacity}
          </Text>
          <Text style={styles.text}>Longitud: {item.length}</Text>
          <Text style={styles.text}>Tripulacion: {item.crew}</Text>
          {item.pilots.length > 0 && (
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={handleGetPilots}>
              <Text style={styles.link}>Ver Pilotos</Text>
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
            <ShipPilots navigation={props.navigation} refRBSheet={refRBSheet} />
          </RBSheet>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Ship;
