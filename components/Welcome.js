import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Linking,
} from "react-native";
import { createContext, useState, useEffect } from "react";
import { colors } from "../styles/Colors";
import { welcome_styles } from "../styles/Welcome_styles";
import { prf_cr_styles } from "../styles/ProfileCreation_styles";
import { SignUp } from "./SignUp";
import { LinearGradient } from "expo-linear-gradient";
import Haste_Logo from "../assets/logos/haste.png";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

const welcome_s = welcome_styles;
export const WelcomeContext = createContext();

export default function Welcome() {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);
  const [signUpFinished, setSignUpFinished] = useState(false);

  // Links used in privacy note text:
  const terms_URL = "https://tumer.pl/";
  const privacy_policy_URL = "https://tumer.pl/";
  const cookies_policy_URL = "https://tumer.pl/";

  const WelcomeButton = (props) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <TouchableOpacity
        style={
          isPressed
            ? [
                styles.margin_vertical,
                welcome_s.full_button,
                welcome_s.full_button_pressed,
              ]
            : [styles.margin_vertical, welcome_s.full_button]
        }
        onPressIn={() => setIsPressed(true)}
        onPress={props.function}
        onPressOut={() => setIsPressed(false)}
      >
        <Text style={[styles.font_md, styles.text_dark_mode]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  };

  const moveToSignUp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSignUpVisible(true);
  };

  const moveToSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSignInVisible(true);
  };

  const WelcomeScreen = () => {
    return (
      <LinearGradient
        colors={[
          colors.welcome_gradient_top,
          colors.welcome_gradient_middle,
          colors.welcome_gradient_bottom,
        ]}
        start={[1.23, 0.22]}
        end={[-0.55, 0.77]}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.background}
        />
        <SafeAreaView style={welcome_s.main_container}>
          <View style={welcome_s.title_and_logo_container}>
            <Image style={welcome_s.logo_png} source={Haste_Logo} />

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
            <WelcomeButton text={"SIGN UP"} function={moveToSignUp} />
            <WelcomeButton
              text={"SIGN IN"}
              function={() => setSignInVisible(true)}
            />
          </View>
        </SafeAreaView>
        <StatusBar
          style={Platform.OS === "android" ? "light" : "dark"}
          backgroundColor="black"
        />
      </LinearGradient>
    );
  };
  if (signUpVisible) return <SignUp />;
  if (signUpFinished) return <ProfileCreation />;
  return <WelcomeScreen />;
}

const styles = StyleSheet.create(prf_cr_styles);
