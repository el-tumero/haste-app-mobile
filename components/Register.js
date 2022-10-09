import jsotp from "jsotp"; // check if can remove later
import { Base32 } from "jsotp";
import { AES } from "crypto-js";
import { useState, createContext } from "react";
import axios from "axios";
import QRCode from "react-native-qrcode-image";
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
  const [UUID, setUUID] = useState("");

  const handleChangeUsername = (username) => {
    setUsername(username);
  };

  const handleChangePassword = (password) => {
    setPassword(password);
  };

  const handleRegisterSubmit = async () => {
    const secret = Base32.random_gen();
    const uri = `otpauth://totp/HASTE:${username}?secret=${secret}&issuer=HASTE`;
    const encryptedSecret = AES.encrypt(secret, password).toString();
    setQrcode(uri);
    console.log(username, encryptedSecret);

    axios
      .post("https://tumer.pl/user", {
        username,
        secret: encryptedSecret,
      })
      .then((response) => {
        console.log(response.data);

        if (response.status == 200) {
          console.log(response.data);
          console.log("successfully created user!");
          // go to profile creation
        }
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

      <Pressable onPress={() => getValueFor("DEVICE_ID")} style={styles.button}>
        <Text style={styles.text}>getValue</Text>
      </Pressable>

      <View style={styles.qrCtn}>
        <QRCode value={qrcode} size={100} bgColor="#FFFFFF" fgColor="#000000" />
      </View>
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
    paddingVertical: 4,
    backgroundColor: "black",
    marginLeft: "25%",
    marginRight: "25%",
    width: "50%",
    marginTop: "2%",
    marginBottom: "2%",
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
  qrCtn: {
    marginLeft: "25%",
  },
});
