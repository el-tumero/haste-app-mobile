import { createContext , useCallback, useState } from "react"
import { Text, Button, SafeAreaView, TextInput, StyleSheet, View, Pressable } from "react-native"
import { StatusBar } from "expo-status-bar";
import Card from "./Card"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { useFonts,
Raleway_300Light,
Raleway_400Regular,
Raleway_500Medium,
Raleway_600SemiBold,
Raleway_700Bold, } from '@expo-google-fonts/raleway';
// import * as SplashScreen from 'expo-splash-screen'; SPLASH SCREEN
    
export const RegisterContext = createContext();
    
export default function Register() {
        
    const [registerStep, setRegisterStep] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        localization: "",
        birthDate: new Date(),
        sex: "",
        target: "",
        intimacy: "",
        photos: [],
        intersts: [],
        socials: [],
        bio: ""
    })
    let [fontsLoaded] = useFonts({
        Raleway_300Light,
        Raleway_400Regular,
        Raleway_500Medium,
        Raleway_600SemiBold,
        Raleway_700Bold,
      });
      if (!fontsLoaded) {
        return null;
      }
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    
    // HANDLE DATE CONFIRM
    const handleConfirm = (date) => {
        setUserData(prev => ({
            ...prev,
            birthDate: date
        }))
        
        hideDatePicker();
    };
    
    
    const onChangeName = (firstName) => {
        userData.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        console.log(userData.firstName)
    }
    

    const handleGeolocationAccess = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    const handleGeolocationGet = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location)
    }


    const handleNextRegisterStep = () => {
        
        // HANDLE STEP 1 NULL
        if(userData.firstName.length < 1){
            // DODAJ POPUP -> ZA KROTKIE IMIE/ BRAK IMIENIA ??
            console.warn("ZA KROTKIE IMIE -> POPUP + CZERWONY TEXTFIELD")
        }
        setRegisterStep(registerStep => registerStep + 1)
        console.log(userData)
    }


    if(registerStep == 0){
        return(
            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
                <Card title="STEP 1">
                    <TextInput
                    style={styles.textinput}
                    placeholder="Imię: "
                    onChangeText={onChangeName}
                    />

                    <View>
                        <Button title="Wybierz datę urodzenia: " onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <Text style={styles.birthDateString}>
                        {userData.birthDate.toString()}
                    </Text>

                    <Pressable
                    style={styles.nextButton}
                    onPress={handleNextRegisterStep}
                    >
                    <Text style={styles.nextButtonText}>DALEJ</Text>
                    </Pressable>
                </Card>
            </SafeAreaView>
        )
    }
    if(registerStep == 1){
        return(
            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
                    <Card title="STEP 2">
                        <Button
                        title="request location "
                        onPress={handleGeolocationAccess}
                        />
                        <Button
                        title="console location"
                        onPress={handleGeolocationGet}
                        />
                        <Pressable
                        style={styles.nextButton}
                        onPress={handleNextRegisterStep}
                        >
                        <Text style={styles.nextButtonText}>DALEJ</Text>
                        </Pressable>
                    </Card>
            </SafeAreaView>
        )
    } 
    if(registerStep == 2) {
        return(
            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
                    <Card title="STEP 2">


                    </Card>
            </SafeAreaView>
        )
    }
    
}


// CSS
const styles = StyleSheet.create({

    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(210,210,210)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    textinput: {
        width: "100%",
        height: "7%",
        backgroundColor: "rgb(210,210,210)",
    },

    textinputError: {
        width: "100%",
        height: "7%",
        backgroundColor: "rgb(210,210,210)",
        borderWidth: 1,
        borderColor: "red",
    },

    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        fontFamily: 'Raleway_700Bold',
    },

    nextButtonText: {
        color: "white",
    },

    birthDateString: {
        fontSize: 22,
    }
})
