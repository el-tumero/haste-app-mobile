import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Home, { HomeContext } from "./routes/Home";
import RegisterPage, { RegisterContext } from "./components/Register";
import Login, { LoginContext } from "./components/Login";
import ProfileCreation, {
  ProfileCreationContext,
} from "./components/ProfileCreation/ProfileCreation";
import Main, { MainContext } from "./components/Main";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync(); // splash for later

export default function App() {
  const [isLogged, setLogged] = useState(false);
  const [jwt, setJwt] = useState("");
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isFirstLaunchIsLoading, setIsFirstLaunchIsLoading] = useState(true);

  async function checkIfFirstLaunch() {
    try {
      const hasFirstLaunched = await AsyncStorage.getItem("FIRST_LAUNCH");
      if (hasFirstLaunched === null) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async function FirstLaunch() {
    checkIfFirstLaunch();
    const firstLaunch = await checkIfFirstLaunch();
    setIsFirstLaunch(firstLaunch);
    setIsFirstLaunchIsLoading(false);
    console.log(`first time launching? : ` + firstLaunch);
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
    FirstLaunch();
    // getDeviceInfo();

    return () => {
      console.log("starting...");
    };
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
    <MainContext.Provider value={setLogged}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProfileCr"
            component={ProfileCreation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MainContext.Provider>
  );
  // }
}
