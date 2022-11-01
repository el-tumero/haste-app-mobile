import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import return_icon from "../assets/icons/dark_mode/left_arrow.png";
import { sign_up_styles } from "../styles/SignUp_styles";
import { StatusBar } from "expo-status-bar";
import { SignUpVerification } from "./SignUpVerification";
import Welcome from "./Welcome";

export const SignUpContext = createContext();
const styles = sign_up_styles;

export const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({});
  // testing purposes
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dataFilled, setDataFilled] = useState(false);
  const [moveToWelcome, setMoveToWelcome] = useState(false);
  const [moveToSignUpVerification, setMoveToSignUpVerification] =
    useState(false);

  const onChangePhoneNumber = (input) => {
    setPhoneNumber(input);
  };

  const onChangePassword = (input) => {
    setPassword(input);
  };

  const validateSignUpData = () => {
    // REGEX TEST PHONE NUMBER
    // AND PASSWORD
  };

  useEffect(() => {
    if (phoneNumber.length === 0 || password.length === 0) setDataFilled(false);
    if (phoneNumber.length > 0 && password.length > 0) setDataFilled(true);
  }, [phoneNumber, password]);

  useEffect(() => {
    setUserCredentials({
      phone: phoneNumber,
      passowrd: password,
    });
  }, []);

  const submitSignUp = async () => {
    // validateSignUpData();
    // testing
    setMoveToSignUpVerification(true);

    // try {
    //   const res = await axios.post("https://tumer.pl/user", {
    //     phone: phoneNumber,
    //     password: password,
    //   });
    //   console.log(res.data);
    //   if (res.status === 200) {
    //     setUserCredentials({
    //       phone: phoneNumber,
    //       password: password,
    //     });
    //     setMoveToSignUpVerification(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  if (moveToWelcome) return <Welcome />;
  if (moveToSignUpVerification)
    return <SignUpVerification phoneNumber={phoneNumber} />;
  return (
    <SafeAreaView style={styles.main_container}>
      <View style={[styles.main_container, { padding: 20 }]}>
        <TouchableOpacity
          style={styles.return_icon_pressable}
          activeOpacity={0.6}
          onPress={() => setMoveToWelcome(true)}
        >
          <Image source={return_icon} style={styles.return_icon} />
        </TouchableOpacity>
        <View style={styles.content_container}>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>Numer telefonu</Text>
          </View>
          <View style={styles.phone_number_textinput_container}>
            <Text style={styles.phone_number_country_prefix}>+48</Text>
            <TextInput
              style={styles.phone_number_textinput}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholder={"Numer telefonu"}
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCorrect={false}
              onChangeText={(num) => setPhoneNumber(num)}
              selectionColor={"rgb(80, 255, 175)"}
              maxLength={9}
            />
          </View>
          <View style={styles.title_container}>
            <Text style={styles.title_text}>Hasło</Text>
          </View>
          <View style={styles.password_textinput_container}>
            <TextInput
              style={styles.password_textinput}
              underlineColorAndroid="transparent"
              keyboardType="default"
              secureTextEntry={true}
              placeholder={"Hasło"}
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCorrect={false}
              onChangeText={(pwd) => setPassword(pwd)}
              selectionColor={"rgb(80, 255, 175)"}
              maxLength={32}
            />
          </View>
          <View style={styles.text_verification_code_notice_container}>
            <Text style={styles.text_verification_code_notice}>
              Po naciśnięciu Kontynuuj, Haste wyśle Ci wiadomość sms z kodem
              weryfikacyjnym. Mogą obowiązywać opłaty za przesyłanie wiadomości
              i danych. Możesz użyć zweryfikowanego numeru telefonu do logowania
              się na innych urządzeniach.{" "}
            </Text>
            <Text
              style={[styles.text_url, styles.text_verification_code_notice]}
              onPress={() => Linking.openURL("https://google.com/")}
            >
              Przeczytaj co dzieje się, gdy zmienisz swój numer telefonu.
            </Text>
          </View>
          <View style={styles.sign_up_submit_container}>
            <Pressable
              style={
                dataFilled
                  ? [styles.full_button, styles.full_button_active]
                  : styles.full_button
              }
              onPress={submitSignUp}
            >
              <Text
                style={
                  dataFilled
                    ? [
                        styles.sign_up_submit_text,
                        styles.sign_up_submit_text_active,
                      ]
                    : styles.sign_up_submit_text
                }
              >
                KONTYNUUJ
              </Text>
            </Pressable>
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
