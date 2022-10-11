import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, StyleSheet, Text, View } from "react-native";
import { createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login, { LoginContext } from "../components/Login";
import Register, { RegisterContext } from "../components/Register";

const Tab = createBottomTabNavigator();

export const HomeContext = createContext();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Register") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Login") {
            iconName = focused ? "ios-list" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Register" component={RegisterPage} />
      <Tab.Screen name="Login" component={LoginPage} />
    </Tab.Navigator>
  );
}
// LOGOUT
const handleLogout = (setLogged) => {
  AsyncStorage.removeItem("sessionToken")
    .then(() => {
      setLogged(false);
    })
    .catch((err) => console.log(err));
};

// const handleTest = async (e) => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     console.log(keys);
//     const value = await AsyncStorage.getItem("sessionToken");
//     if (value !== null) {
//       console.log(value);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleAuthTest = async (e) => {
//   const sessionToken = await AsyncStorage.getItem("sessionToken");

//   axios
//     .get("https://tumer.pl/account-test", {
//       headers: {
//         Cookie: sessionToken,
//       },
//     })
//     .then((response) => console.log(response.data))
//     .catch((err) => console.log(err));
// };

function RegisterPage() {
  const setLogged = useContext(RegisterContext);

  return <Register></Register>;
}

function LoginPage() {
  const setLogged = useContext(LoginContext);

  return <Login></Login>;
}
