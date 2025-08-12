import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const headerShown = { headerShown: false };
  return (
    <Stack.Navigator initialRouteName="BottomTab">
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={headerShown}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
