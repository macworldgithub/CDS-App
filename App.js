import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import BillQuery from './src/screens/BillQuery';
import UpdateAddress from './src/screens/UpdateAddress';
import CoverageCheck from './src/screens/CoverageCheck';
import PrivacyConsent from './src/screens/PrivacyConsent';
import ChatAI from './src/screens/ChatAI';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Initial Route is Splash */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BillQuery" component={BillQuery} />
        <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
        <Stack.Screen name="CoverageCheck" component={CoverageCheck} />
        <Stack.Screen name="PrivacyConsent" component={PrivacyConsent}/>
        <Stack.Screen name="ChatAI" component={ChatAI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}