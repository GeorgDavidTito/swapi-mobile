import React, { useEffect } from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import { getShips } from '../../../redux/ships/actions';
import { useSelector, useDispatch } from 'react-redux';

const Ships = () => {
  const dispatch = useDispatch();
  const { ships } = useSelector((state) => state?.ships);

  useEffect(() => {
    dispatch(getShips());
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Listado de Naves</Text>
      </SafeAreaView>
    </>
  );
};

export default Ships;
