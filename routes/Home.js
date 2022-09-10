import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const Tab = createBottomTabNavigator()

export const HomeContext = createContext()

export default function Home() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Actions') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }
  
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
        <Tab.Screen name="Actions" component={Actions} />
        <Tab.Screen name="Messages" component={Messages} />
      </Tab.Navigator>
    );
}

const handleLogout = (setLogged) => {

    AsyncStorage.removeItem("sessionToken")
    .then(() => {
        setLogged(false)
    })
    .catch(err => console.log(err))
}

const handleTest = async e => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        console.log(keys)
        const value = await AsyncStorage.getItem("sessionToken")
        if(value !== null){
            console.log(value)
        }
    } catch (error) {
        console.log(error)
    }
}

const handleAuthTest = async e => {

    const sessionToken = await AsyncStorage.getItem("sessionToken")

    axios.get("https://tumer.pl/account-test", {headers: {
        Cookie: sessionToken
    }})
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
    
}


function Actions() {
    
    const setLogged = useContext(HomeContext)
    
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Actions</Text>
        <Button
         title="Logout"
         onPress={() => handleLogout(setLogged)}
        ></Button>

        <Button
         title="Test Storage"
         color="orange"
         onPress={() => handleTest()}
        ></Button>
        
        <Button
         title="Test Auth"
         color="green"
         onPress={() => handleAuthTest()}
        ></Button>

      </View>
    )
  }
  
function Messages({navigation}) {
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Messages</Text>
    </View>
  )
}