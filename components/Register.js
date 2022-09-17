import { createContext , useCallback, useState, useEffect } from "react"
import { Text, Button, SafeAreaView, TextInput, StyleSheet, View, Pressable, CheckBox } from "react-native"
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
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [shortDate, setShortDate] = useState('');
    const [target, setTarget] = useState('')

    const [userData, setUserData] = useState({
        name: "",
        localization: "",
        birthDate: "",
        gender: "",
        target: "",
        intimacy: "",
        photos: [],
        intersts: [],
        socials: [],
        bio: "",
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
    const handleDateConfirm = (date) => {
        const compactBirthDate = date.toString().substring(4,15)
        setShortDate(compactBirthDate)
        console.log(compactBirthDate)
        setUserData(prev => ({
            ...prev,
            birthDate: compactBirthDate
        }))
        hideDatePicker();
    };
    
    const onChangeName = (name) => {
        userData.name = name.charAt(0).toUpperCase() + name.slice(1)
    }

    const handleGeolocationAccess = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    }

    const handleGeolocationGet = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
            console.log(location)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNextRegisterStep = () => {
            setRegisterStep(registerStep => registerStep + 1)
            console.log(userData)
    }

    const handleChangeGender = (selectedGender) => {
        console.log(selectedGender)
        setUserData(prev => ({
            ...prev,
            gender: selectedGender
        }))
    }

    // STEP 0 --- IMIE + DATA URODZENIA
    if(registerStep == 0){
        return(
            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
                <Card title="Jak Ci na imię?">
                    <TextInput
                    style={styles.textinput}
                    placeholder="    Twoje imię" // lazy
                    placeholderTextColor='grey'
                    onChangeText={onChangeName}
                    />

                    <View>
                        <Pressable
                        style={styles.nextButton}
                        onPress={showDatePicker}
                        >
                        <Text
                        style={styles.nextButtonText}>
                            Wybierz datę urodzenia: 
                            </Text>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <Text
                    style={styles.regText}
                    >
                        Wybrana data: {shortDate}
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

    // STEP 1 --- LOKALIZACJA + PŁEĆ
    if(registerStep == 1){
        return(

            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />

                    <Card title="Halo, gdzie jesteś?">
                        
                        <Pressable
                        style={styles.nextButton}
                        onPress={handleGeolocationAccess}
                        >
                        <Text style={styles.nextButtonText}>
                        Zezwól na lokalizacje
                        </Text>
                        </Pressable>

                        <Pressable
                        style={styles.nextButton}
                        onPress={handleGeolocationGet}
                        >
                        <Text style={styles.nextButtonText}>
                        CLI lokalizacja
                        </Text>
                        </Pressable>

                        <View>
                            <Text style={styles.medText}>Identyfikuje się jako</Text>
                            <Pressable
                            style={styles.nextButtonHalf}
                            onPress={() => handleChangeGender("male")}
                            >
                                <Text style={styles.nextButtonText}>Mężczyzna</Text>
                            </Pressable>

                            <Pressable
                            style={styles.nextButtonHalf}
                            onPress={() => handleChangeGender("female")}
                            >
                            <Text style={styles.nextButtonText}>Kobieta</Text>
                            </Pressable>

                            <Pressable
                            style={styles.nextButtonHalf}
                            onPress={() => handleChangeGender("other")}
                            >
                            <Text style={styles.nextButtonText}>Inne</Text>
                            </Pressable>
                        </View>

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
                    <Card title="Powiedz nam czego szukasz">

                        <Text style={styles.regText}></Text>

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
        marginLeft: "10%",
        marginRight: "10%",
        width: "80%",
        height: "7%",
        backgroundColor: "rgb(210,210,210)",
        marginTop: "8%",
        marginBottom: "8%",
        borderRadius: 6,
    },

    textinputError: {
        marginLeft: "10%",
        marginRight: "10%",
        width: "80%",
        height: "7%",
        backgroundColor: "rgb(210,210,210)",
        borderWidth: 1,
        borderColor: "red",
        marginTop: "8%",
        marginBottom: "8%",
        borderRadius: 6,
    },

    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: 'black',
        marginLeft: "10%",
        marginRight: "10%",
        width: "80%",
        marginTop: "4%",
        marginBottom: "4%",
        borderRadius: 6,
    },

    nextButtonHalf: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: 'black',
        marginLeft: "25%",
        marginRight: "25%",
        width: "50%",
        marginTop: "4%",
        marginBottom: "4%",
        borderRadius: 6,
    },

    nextButtonText: {
        color: "white",
        fontFamily: "Raleway_700Bold",
    },

    smText: {
        color: "white",
        fontFamily: "Raleway_300Light",
        fontSize: 16,
        textAlign: "center",
    },

    regText: {
        color: "white",
        fontFamily: "Raleway_400Regular",
        fontSize: 18,
        textAlign: "center",
    },

    medText: {
        color: "white",
        fontFamily: "Raleway_500Medium",
        fontSize: 20,
        textAlign: "center",
    },

    bigText: {
        color: "white",
        fontFamily: "Raleway_700Bold",
        fontSize: 22,
        textAlign: "center",
    },



})
