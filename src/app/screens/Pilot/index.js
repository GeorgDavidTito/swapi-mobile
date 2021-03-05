import React from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';

const Pilot = (props) => {
  const { item } = props.route.params;

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
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.link}>Ver Naves</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Pilot;
