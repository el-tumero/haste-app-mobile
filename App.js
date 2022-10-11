import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Home, { HomeContext } from "./routes/Home";
import RegisterPage, { RegisterContext } from "./components/Register";
import Login, { LoginContext } from "./components/Login";
import ProfileCreation, {
  ProfileCreationContext,
} from "./components/ProfileCreation";
import Main, { MainContext } from "./components/Main";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLogged, setLogged] = useState(false);
  const [jwt, setJwt] = useState("");
  // const [appIsReady, setAppIsReady] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState("firstTime");

  const checkFirstLaunch = async () => {
    try {
      let firstLaunch = await AsyncStorage.getItem("FIRST_LAUNCH");
      if (firstLaunch == "firstTime") {
        setFirstLaunch(true);
        await AsyncStorage.setItem("FIRST_LAUNCH", firstLaunch);
        console.log(`(if == firsttime) - > launch:` + firstLaunch);
      }
      console.log(`got launch: ` + firstLaunch);
      await AsyncStorage.setItem("FIRST_LAUNCH", "notFirstTime");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // async function prepare() {
    //   try {
    //     // Pre-load fonts, make any API calls you need to do here
    //     await Font.loadAsync(Entypo.font);
    //     // Artificially delay for two seconds to simulate a slow loading
    //     // experience. Please remove this if you copy and paste the code!
    //     await new Promise(resolve => setTimeout(resolve, 2000));
    //   } catch (e) {
    //     console.warn(e);
    //   } finally {
    //     // Tell the application to render
    //     setAppIsReady(true);
    //   }
    // }

    // prepare();

    checkFirstLaunch();
    console.log("starting..");
  }, []);

  // AsyncStorage.getItem("sessionToken")
  //   .then((value) => {
  //     if (value !== null) setLogged(true);
  //   })
  //   .catch((err) => console.log(err));

  if (AsyncStorage.getItem("FIRST_LAUNCH") == "firstTime") {
    return (
      <RegisterContext.Provider value={setLogged}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Register"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RegisterContext.Provider>
    );
  }
  // if (firstLaunch == "notFirstTime") {
  return (
    <MainContext.Provider value={setLogged}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MainContext.Provider>
  );
  // }
}
