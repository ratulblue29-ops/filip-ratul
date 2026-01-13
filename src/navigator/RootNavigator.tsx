import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/login/LoginScreen';
import SplashScreen from '../screen/splash/SplashScreen';
import BottomTabs from './Buttomtabs';
import MemberShipScreen from '../screen/membership/MemberShipScreen';
import CreditsScreen from '../screen/Credits/credits';
import offerScreen from '../screen/offer/offer';
import languageScreen from '../screen/Language/language';
import engagementScreen from '../screen/Engagement/Engagement';
import NotificationScreen from '../screen/Notification/Notification';
import HelpSupportScreen from '../screen/HelpSupport/HelpSupport';
import TermsConditionsScreen from '../screen/TermsConditions/TermsConditions';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  BottomTabs: undefined;
  membership: undefined;
  Credits: undefined;
  offer: undefined;
  language: undefined;
  engagement: undefined;
  notification: undefined;
  HelpSupport: undefined;
  TermsConditions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="membership" component={MemberShipScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Credits" component={CreditsScreen} />
      <Stack.Screen name="offer" component={offerScreen} />
      <Stack.Screen name="language" component={languageScreen} />
      <Stack.Screen name="engagement" component={engagementScreen} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
