import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import QRScanner from "./QRScanner.js";
import HistoryScreen from "./HistoryScreen.js";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="History" />
  </BottomNavigation>
);
function MainTabs({ route }) {
  const [history, setHistory] = useState(route.params?.history || []);

  const resetHistory = () => {
    setHistory([]);
  };

  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} history={history} />}
      </Tab.Screen>

      <Tab.Screen name="History">
        {(props) => (
          <HistoryScreen
            {...props}
            history={history}
            resetHistory={resetHistory}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}
export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
