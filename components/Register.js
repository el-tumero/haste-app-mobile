import { createContext } from "react"
import { Text, Button, SafeAreaView, TextInput, StyleSheet, View } from "react-native"
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Card from "./Card"

export const RegisterContext = createContext();

export default function Register(){

    const [registerStep, setRegisterStep] = useState(0);


    const handleNextRegisterStep = () => {
        setRegisterStep(registerStep => registerStep + 1)
    }


    const handleSubmit = () => {

    }
    
    const onChangeText = () => {

    }

    if(registerStep == 0){
        return(
            <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />
                {/* <Text>STEP 1</Text>
                <TextInput
                style={styles.textinput}
                onChangeText={onChangeText}
                /> */}

                <Button 
                title="NEXT STEP"
                onPress={handleNextRegisterStep}
                />
            </SafeAreaView>
        )
    } 
    return(
        <SafeAreaView style={styles.main}>
                <StatusBar style="auto" />


                <Button 
                title="NEXT STEP"
                onPress={handleNextRegisterStep}
                />
            </SafeAreaView>
    )
    


    // OLD
    // if(registerStep == 0){
    //     return(
    //         <SafeAreaView style={styles.main}>
    //             <StatusBar style="auto" />
    //             <Card
    //             title="REGISTER"
    //             content={"STEP 0"}
    //             >
    //                 <Button title="FSDFDF"></Button>
    //             </Card>
    //             <Button 
    //             title="NEXT STEP"
    //             onPress={handleNextRegisterStep}
    //             />
    //             <Text>{registerStep}</Text>
    //         </SafeAreaView>
    //     )
    // } 
    // return(
    //     <SafeAreaView style={styles.main}>
    //             <StatusBar style="auto" />
    //             <Card
    //             title="REGISTER"
    //             content={"STEP 1"}
    //             />
    //             <Button 
    //             title="NEXT STEP"
    //             onPress={handleNextRegisterStep}
    //             />
    //             <Text>{registerStep}</Text>
    //         </SafeAreaView>
    // )
    
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
        width: "60%",
        height: "5%",
        backgroundColor: "blue",
    }
})