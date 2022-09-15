import { createContext , useCallback, useState } from "react"
import { Text, Button, SafeAreaView, TextInput, StyleSheet, View } from "react-native"
import { StatusBar } from "expo-status-bar";
import Card from "./Card"
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const RegisterContext = createContext();

export default function Register(){

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        
        setUserData(prev => ({
            ...prev,
            birthDate: date
        }))

        hideDatePicker();
    };

    const [registerStep, setRegisterStep] = useState(0);
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

    const handleNextRegisterStep = () => {
        setRegisterStep(registerStep => registerStep + 1)
    }

    const handleSubmit = () => {

    }
    
    const onChangeName = () => {

    }

    if(registerStep == 0){
        return(
            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
                <Card title="STEP 1">
                    <TextInput
                    style={styles.textinput}
                    placeholder="FIRST NAME"
                    />

                    <View>
                        <Button title="Show Date Picker" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <Text>
                        {userData.birthDate.toString()}
                    </Text>

                    <Button 
                    title="NEXT STEP"
                    onPress={handleNextRegisterStep}
                    />
                </Card>
            </SafeAreaView>
        )
    } 
    return(
        <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
            </SafeAreaView>
    )
}

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
    }
})
