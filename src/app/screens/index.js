import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ships from './Ships';
import Pilots from './Pilots';

const Drawer = createDrawerNavigator();

const Screens = () => {
  return (
    <Drawer.Navigator initialRouteName="Ships">
      <Drawer.Screen
        name="Ships"
        component={Ships}
        options={{ drawerLabel: 'Listado de naves' }}
      />
      <Drawer.Screen
        name="Pilots"
        component={Pilots}
        options={{ drawerLabel: 'Listado de Pilotos' }}
      />
      <Drawer.Screen
        name="PilotsShip"
        component={Pilots}
        options={{ drawerLabel: 'Piloto/Naves' }}
      />
      <Drawer.Screen
        name="ShipPilots"
        component={Pilots}
        options={{ drawerLabel: 'Nave/Pilotos' }}
      />
    </Drawer.Navigator>
  );
};

export default Screens;
