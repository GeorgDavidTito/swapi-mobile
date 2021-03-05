import React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';

const Ship = (props) => {
  const { item } = props.route.params;

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
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.link}>Ver Pilotos</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Ship;
