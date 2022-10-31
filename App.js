import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Home, { HomeContext } from "./components/Home";
import { SignUp } from "./components/SignUp";
import SignIn, { SignInContext } from "./components/SignIn";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";
import Welcome, { WelcomeContext } from "./components/Welcome";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync(); // splash for later

export default function App() {
  const [isLogged, setLogged] = useState(false);
  const [jwt, setJwt] = useState("");
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isFirstLaunchIsLoading, setIsFirstLaunchIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  async function checkIfFirstLaunch() {
    try {
      const hasFirstLaunched = await AsyncStorage.getItem("FIRST_LAUNCH");
      if (hasFirstLaunched === null) {
        const hasFirstLaunched = await AsyncStorage.setItem(
          "FIRST_LAUNCH",
          "true"
        );
        return true;
      }
      await AsyncStorage.setItem("FIRST_LAUNCH", "false");
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function FirstLaunch() {
    checkIfFirstLaunch();
    const firstLaunch = await checkIfFirstLaunch();
    setIsFirstLaunch(firstLaunch);
    setIsFirstLaunchIsLoading(false);
    console.log(`first time launching? : ` + firstLaunch);
    console.log(`theme: ` + colorScheme);
  }

  const getDeviceInfo = () => {
    console.log(
      `brand:` + Device.brand,
      `\nmanufacturer:` + Device.manufacturer,
      `\nmodelName:` + Device.modelName,
      `\nmodelId:` + Device.modelId
    );
  };

  useEffect(() => {
    // FirstLaunch();
    // getDeviceInfo();
    // console.log("starting...");
    // console.log(colorScheme);
  }, []);

  // change async to securestorage
  // AsyncStorage.getItem("sessionToken")
  //   .then((value) => {
  //     if (value !== null) setLogged(true);
  //   })
  //   .catch((err) => console.log(err));

  // if (isFirstLaunch == true) {
  //   return (
  //     <RegisterContext.Provider value={setLogged}>
  //       <NavigationContainer>
  //         <Stack.Navigator>
  //           <Stack.Screen
  //             name="Register"
  //             component={RegisterPage}
  //             options={{ headerShown: false }}
  //           />
  //         </Stack.Navigator>
  //       </NavigationContainer>
  //     </RegisterContext.Provider>
  //   );
  // } else {
  return (
    <WelcomeContext.Provider value={setLogged}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WelcomeContext.Provider>
  );
  // }
}
