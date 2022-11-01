import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import return_icon from "../assets/icons/dark_mode/left_arrow.png";
import { StatusBar } from "expo-status-bar";
import { sign_up_styles } from "../styles/SignUp_styles";
import { SignUp } from "./SignUp";

export const SignUpVerificationContext = createContext();
const styles = sign_up_styles;

// MAIN
export const SignUpVerification = (props) => {
  const [returnToSignUp, setReturnToSignUp] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (verificationCode.length === 4) {
      console.log("submitting");
      verificationSubmit();
    }
  }, [verificationCode]);

  useEffect(() => {
    // return first TextInput WITH AUTOFOCUS
    // if (signUpVerVisible) getVerificationCode();
  }, []);

  const VerificationDigitTextInput = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <TextInput
        autoFocus={props.autoFocus}
        keyboardType={"numeric"}
        maxLength={1}
        style={styles.verification_code_textinput}
      ></TextInput>
    );
  };

  const resendVerificationCode = () => {};

  const verificationSubmit = async () => {
    const res2 = await axios.post(`https://tumer.pl/user/activate`, {
      code: verificationCode,
      phone: userCredentials.phone,
    });
    console.log(res2.data);
    if (res2.status === 200) {
      const res3 = await axios.post(`https://tumer.pl/user/login`, {
        phone: userCredentials.phone,
        password: userCredentials.password,
        uid: "123123",
      });

      const jwt = res3.headers["set-cookie"][0];
      await SecureStore.setItemAsync("hasteToken", jwt);
      moveToProfileCreation();
    }
  };

  const getVerificationCode = async () => {
    const phone = userCredentials.phone;
    const res1 = await axios.get(`https://tumer.pl/user/code?phone=${phone}`);
    const code = res1.data.message;
    console.log(code);
  };

  if (returnToSignUp) return <SignUp />;
  return (
    <SafeAreaView style={styles.main_container}>
      <View style={[styles.main_container, { padding: 20 }]}>
        <TouchableOpacity
          style={styles.return_icon_pressable}
          activeOpacity={0.6}
          onPress={() => setReturnToSignUp(true)}
        >
          <Image source={return_icon} style={styles.return_icon} />
        </TouchableOpacity>
        <View style={styles.content_container}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>Podaj kod SMS</Text>
          </View>
          <View style={styles.verification_phone_number_container}>
            <Text style={styles.verification_phone_number_text}>
              {props.phoneNumber}
            </Text>
            <TouchableOpacity
              style={styles.resend_code_pressable}
              activeOpacity={0.6}
              onPress={resendVerificationCode}
            >
              <Text>WYŚLIJ PONOWNIE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verification_code_container}>
            <VerificationDigitTextInput autoFocus={true} />
            <VerificationDigitTextInput />
            <VerificationDigitTextInput />
            <VerificationDigitTextInput />
          </View>
        </View>
        <StatusBar
          style={Platform.OS === "android" ? "light" : "dark"}
          backgroundColor="black"
        />
      </View>
    </SafeAreaView>
  );
};
