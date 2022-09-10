// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react'
import Login, {LoginContext} from './routes/Login';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home, {HomeContext} from './routes/Home';





const Stack = createNativeStackNavigator()




function App() {

  const [isLogged, setLogged] = useState(false)
  const [jwt, setJwt] = useState("")

  AsyncStorage.getItem("sessionToken")
  .then(value => {
    if(value !== null) setLogged(true)
  })
  .catch(err => console.log(err))

  

  if(isLogged){
    return (
      <HomeContext.Provider value={setLogged}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </HomeContext.Provider>
    );
  }

  return (
    <LoginContext.Provider value={setLogged}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  )
  
}


export default App;
