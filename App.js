import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Store from './src/redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppStack from './src/navigations/AppStack';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <GestureHandlerRootView >
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
