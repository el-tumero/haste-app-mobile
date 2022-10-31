import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import return_icon from "../assets/icons/dark_mode/left_arrow.png";
import { sign_up_styles } from "../styles/SignUp_styles";
import Welcome from "./Welcome";

export const SignUpContext = createContext();
const styles = sign_up_styles;

export const SignUp = () => {
  const [returnToWelcomePage, setReturnToWelcomePage] = useState(false);
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
          <TouchableOpacity activeOpacity={0.6} onPress={returnToWelcome}>
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
                keyboardType="number-pad"
                placeholder="Twój numer"
                placeholderTextColor="rgba(0,0,0,0.4)"
                autoCorrect={false}
                onChangeText={(input) => setPhoneNumber(input)}
                maxLength={9}
              />
            </View>
            <View style={styles.title_container}>
              <Text style={styles.title_text}>Hasło</Text>
            </View>
            <View style={styles.password_textinput_container}>
              <TextInput
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                placeholder="Hasło"
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={(input) => setPassword(input)}
                maxLength={32}
              />
            </View>
            <View style={styles.text_verification_code_notice_container}>
              <Text style={styles.text_verification_code_notice}>
                Po naciśnięciu Kontynuuj, Haste wyśle Ci wiadomość sms z kodem
                weryfikacyjnym. Mogą obowiązywać opłaty za przesyłanie
                wiadomości i danych. Możesz użyć zweryfikowanego numeru telefonu
                do logowania się na innych urządzeniach.{" "}
              </Text>
              <Text
                style={styles.text_url}
                onPress={() => Linking.openURL("https://google.com/")}
              >
                Przeczytaj co dzieje się, gdy zmienisz swój numer telefonu.
              </Text>
            </View>
            <View style={styles.sign_up_submit_container}>
              <Pressable
                style={styles.full_button}
                onPress={handleSignUpSubmit}
              >
                <Text>KONTYNUUJ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return <Welcome />;
};
