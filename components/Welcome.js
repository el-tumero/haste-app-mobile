import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import { useContext, createContext, useState, useEffect } from "react";
import { global_styles } from "../styles/global";
import { prf_cr_styles } from "../styles/ProfileCreation_styles";
import { SignUp, SignUpContext } from "./SignUp";
import close_icon from "../assets/icons/dark_mode/close_icon.png";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import ProfileCreation, { ProfileCreationContext } from "./ProfileCreation";

export const WelcomeContext = createContext();

export default function Welcome() {
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
  const [signUpVerVisible, setSignUpVerVisible] = useState(false);
  const [signInPopupVisible, setSignInPopupVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});
  const [signUpFinished, setSignUpFinished] = useState(false);

  const moveToProfileCreation = () => {
    setSignUpFinished(true);
  };

  const SignUpModal = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUpSubmit = async () => {
      try {
        const res = await axios.post("https://tumer.pl/user", {
          phone: phoneNumber,
          password: password,
        });
        console.log(res.data);
        if (res.status === 200) {
          setUserCredentials({
            phone: phoneNumber,
            password: password,
          });
          handleShowSignUpVerification();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal // PHONE NUMBER + PASSWORD MODAL
        animationType="slide"
        transparent={true}
        visible={signUpPopupVisible}
      >
        <View style={styles.modal_container}>
          <Pressable onPress={handleShowSignUp}>
            <Image source={close_icon} style={styles.modal_close_btn} />
          </Pressable>
          <Text style={[styles.text_dark_mode, styles.font_md]}>
            Numer telefonu
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
            style={[styles.textinput_basic, styles.textinput_long_padding]}
            placeholder="- - - _ - - - _ - - -"
            placeholderTextColor="grey"
            autoCorrect={false}
            onChangeText={(input) => setPhoneNumber(input)}
            maxLength={9}
          />
          <Text style={[styles.text_dark_mode, styles.font_md]}>Haslo</Text>
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            style={[styles.textinput_basic, styles.textinput_long_padding]}
            placeholder="password"
            placeholderTextColor="grey"
            autoCorrect={false}
            onChangeText={(input) => setPassword(input)}
            maxLength={9}
          />
          <Pressable
            onPress={handleSignUpSubmit}
            style={[styles.pressable, styles.margin_vertical]}
          >
            <Text style={[styles.text_dark_mode, styles.font_md]}>
              Załóż konto
            </Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

  const SignUpVerificationModal = () => {
    const [verificationCode, setVerificationCode] = useState("");

    useEffect(() => {
      if (verificationCode.length === 4) {
        console.log("submitting");
        verificationSubmit();
      }
    }, [verificationCode]);

    useEffect(() => {
      getVerificationCode();
    }, []);

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

    return (
      <Modal animationType="none" transparent={true} visible={signUpVerVisible}>
        <View style={styles.modal_container}>
          <Text style={[styles.text_dark_mode, styles.font_md]}>
            Podaj kod SMS
          </Text>
          <TextInput
            onChangeText={(code) => setVerificationCode(code)}
            maxLength={4}
            style={styles.textinput_basic}
            placeholder="_ _ _ _"
            keyboardType="numeric"
          ></TextInput>
        </View>
      </Modal>
    );
  };

  const handleShowSignUp = () => {
    console.log("toggling modal");
    setSignUpPopupVisible(!signUpPopupVisible);
  };

  const handleShowSignUpVerification = () => {
    setSignUpPopupVisible(!signUpPopupVisible);
    setSignUpVerVisible(!signUpVerVisible);
  };

  if (signUpFinished) return <ProfileCreation />;
  return (
    <SafeAreaView>
      <View style={styles.main_container}>
        <SignUpModal />
        <SignUpVerificationModal />
        <Text
          style={[
            styles.font_xxxl,
            styles.text_dark_mode,
            styles.welcome_title,
          ]}
        >
          Welcome
        </Text>
        <Pressable
          style={[styles.margin_vertical, styles.pressable]}
          onPress={handleShowSignUp}
        >
          <Text style={[styles.font_md, styles.text_dark_mode]}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={[styles.margin_vertical, styles.pressable]}
          onPress={""}
        >
          <Text style={[styles.font_md, styles.text_dark_mode]}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(prf_cr_styles);
