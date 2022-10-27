import { useState, createContext } from "react";
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
import { main_styles } from "../styles/Main_styles";

export const HomeContext = createContext();

export default function Home() {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style="light" />
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.topBarSettingsCtn}>
          <Image
            source={require("../assets/icons/dark_mode/setting.png")}
            style={styles.topBar_icon}
          />
        </View>
      </View>

      {/* MIDDLE */}
      <View style={styles.content}>
        <Text>CONTENT</Text>
      </View>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <Image
          source={require("../assets/icons/dark_mode/adjust.png")}
          style={styles.bottomBar_icon}
        />
        <Image
          source={require("../assets/icons/dark_mode/user.png")}
          style={styles.bottomBar_icon}
        />
        <Image
          source={require("../assets/icons/dark_mode/setting.png")}
          style={styles.bottomBar_icon}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(main_styles);
