import jsotp from "jsotp";
import { Base32 } from "jsotp";
import { AES } from "crypto-js";
import { useState, createContext } from "react";
import axios from "axios";
import QRCode from "qrcode";
import SvgUri from "react-native-svg-uri";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export const RegisterContext = createContext();

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [qrcode, setQrcode] = useState("");

  const handleChangeUsername = (username) => {
    setUsername(username);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  };

  const handleRegisterSubmit = async () => {
    const secret = Base32.random_gen();
    const uri = `otpauth://totp/HASTE:${username}?secret=${secret}&issuer=HASTE`;

    const qr = await QRCode.toString(uri);
    setQrcode(qr);

    const encryptedSecret = AES.encrypt(secret, password).toString();

    console.log(username, encryptedSecret);

    axios
      .post("https://tumer.pl/user", {
        username,
        secret: encryptedSecret,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style="dark" />
      <TextInput
        style={styles.input}
        onChangeText={handleChangeUsername}
        placeholder="Username"
        autoCapitalize={false}
        autoCorrect={false}
      ></TextInput>

      <TextInput
        style={styles.input}
        onChangeText={handleChangePassword}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize={false}
        autoCorrect={false}
      ></TextInput>

      <Pressable onPress={handleRegisterSubmit} style={styles.button}>
        <Text style={styles.text}>REGISTER</Text>
      </Pressable>

      <SvgUri width="200" height="200" source={{ uri: qrcode }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 5,
    borderRadius: 10, // epic radius
    marginLeft: "25%",
    width: "50%",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "black",
    marginLeft: "25%",
    marginRight: "25%",
    width: "50%",
    marginTop: "3%",
    marginBottom: "3%",
    borderRadius: 6,
  },
  text: {
    color: "white",
  },
  img: {
    width: 200,
    height: 200,
    backgroundColor: "grey",
    marginLeft: "25%",
  },
});
