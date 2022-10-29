import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  View,
  Modal,
  Image,
} from "react-native";
import { useContext, createContext, useState, useEffect } from "react";
import { global_styles } from "../styles/global";
import { prf_cr_styles } from "../styles/ProfileCreation_styles";
import { SignUp, SignUpContext } from "./SignUp";
import close_icon from "../assets/icons/dark_mode/close_icon.png";
import axios from "axios";

export const WelcomeContext = createContext();

export default function Welcome() {
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
  const [signInPopupVisible, setSignInPopupVisible] = useState(false);

  const handleShowSignIn = () => {};

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
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal
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

  const handleShowSignUp = () => {
    console.log("toggling modal");
    setSignUpPopupVisible(!signUpPopupVisible);
  };

  return (
    <SafeAreaView>
      <View style={styles.main_container}>
        <SignUpModal />
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
          onPress={handleShowSignIn}
        >
          <Text style={[styles.font_md, styles.text_dark_mode]}>Sign In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(prf_cr_styles);
