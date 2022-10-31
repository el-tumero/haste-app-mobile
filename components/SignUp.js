import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  Image,
} from "react-native";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import left_arrow from "../assets/icons/dark_mode/left_arrow.png";
import { sign_up_styles } from "../styles/SignUp_styles";
import Welcome from "./Welcome";
import ProfileCreation from "./ProfileCreation";

export const SignUpContext = createContext();
const styles = sign_up_styles;

export const SignUp = () => {
  const [returnToWelcomePage, setReturnToWelcomePage] = useState(false);
  // USER CREDENTIALS
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const returnToWelcome = () => {
    setReturnToWelcomePage(true);
  };

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
  if (!returnToWelcomePage) {
    return (
      <SafeAreaView style={styles.main_container}>
        <View>
          <Pressable onPress={returnToWelcome}>
            <Image source={left_arrow} style={{ width: 40, height: 40 }} />
          </Pressable>
          <Text>Numer telefonu</Text>
          <TextInput
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
            placeholder="- - - _ - - - _ - - -"
            placeholderTextColor="grey"
            autoCorrect={false}
            onChangeText={(input) => setPhoneNumber(input)}
            maxLength={9}
          />
          <Text>Haslo</Text>
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="grey"
            autoCorrect={false}
            onChangeText={(input) => setPassword(input)}
            maxLength={9}
          />
          <Pressable onPress={handleSignUpSubmit}>
            <Text>Załóż konto</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  return <Welcome />;
};
