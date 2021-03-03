import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

const Pilot = props => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Piloto</Text>
      </SafeAreaView>
    </>
  );
};

export default Pilot;
