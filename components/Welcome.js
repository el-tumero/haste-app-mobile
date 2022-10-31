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
  Platform,
  Animated,
  Linking,
} from "react-native";
import { useContext, createContext, useState, useEffect } from "react";
import { global_styles } from "../styles/global";
import { colors } from "../styles/Colors";
import { welcome_styles } from "../styles/Welcome_styles";
import { prf_cr_styles } from "../styles/ProfileCreation_styles";
import { SignUp, SignUpContext, SignUpModal } from "./SignUp";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import ProfileCreation, { ProfileCreationContext } from "./ProfileCreation";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/logos/logo_haste1.png";
import { StatusBar } from "expo-status-bar";

const welcome_s = welcome_styles;
export const WelcomeContext = createContext();

export default function Welcome() {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signUpVerVisible, setSignUpVerVisible] = useState(false);
  const [signInPopupVisible, setSignInPopupVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});
  const [signUpFinished, setSignUpFinished] = useState(false);

  // Links used in privacy note text:
  const terms_URL = "https://tumer.pl/";
  const privacy_policy_URL = "https://tumer.pl/";
  const cookies_policy_URL = "https://tumer.pl/";

  const moveToProfileCreation = () => {
    setSignUpFinished(true);
  };

  const moveToSignUp = () => {
    setSignUpVisible(true);
  };

  const WelcomeScreen = () => {
    return (
      <LinearGradient
        colors={[
          colors.welcome_gradient_top,
          colors.welcome_gradient_middle,
          colors.welcome_gradient_bottom,
        ]}
        start={[0, 0]}
        end={[0.2, 1.3]}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.background}
        />
        <SafeAreaView style={welcome_s.main_container}>
          <View style={welcome_s.title_and_logo_container}>
            <Image style={welcome_s.logo_png} source={Logo} />

            <Text
              style={[
                styles.font_xxxl,
                styles.text_dark_mode,
                styles.welcome_title,
                welcome_s.title,
              ]}
            >
              Haste
            </Text>
          </View>
          <View style={[welcome_s.bottom_container]}>
            <Text
              style={[
                styles.font_xsm,
                styles.text_dark_mode,
                welcome_s.text_privacy_note,
              ]}
            >
              By tapping Sign Up or Sign In, you agree to our{" "}
              <Text
                style={welcome_s.text_url}
                onPress={() => Linking.openURL(terms_URL)}
              >
                Terms
              </Text>
              . Learn how we process your data in our{" "}
              <Text
                style={welcome_s.text_url}
                onPress={() => Linking.openURL(privacy_policy_URL)}
              >
                Privacy Policy
              </Text>{" "}
              and{" "}
              <Text
                style={welcome_s.text_url}
                onPress={() => Linking.openURL(cookies_policy_URL)}
              >
                Cookies Policy
              </Text>
              .
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.margin_vertical, welcome_s.full_button]}
              onPress={moveToSignUp}
            >
              <Text style={[styles.font_md, styles.text_dark_mode]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.margin_vertical, welcome_s.full_button]}
              // onPress={""}
            >
              <Text style={[styles.font_md, styles.text_dark_mode]}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <StatusBar style="light" backgroundColor="black" />
      </LinearGradient>
    );
  };
  if (signUpVisible) return <SignUp />;
  // if (signUpFinished) return <ProfileCreation />;
  return <WelcomeScreen />;
}

const styles = StyleSheet.create(prf_cr_styles);
