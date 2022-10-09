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
import { main_styles } from "./Main_styles";

export const MainContext = createContext();

export default function Home() {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar style="dark" />
      {/* top nav bar */}
      <View style={styles.topBar}>
        <Text>TOP</Text>
      </View>

      {/* content */}
      <View style={styles.content}>
        <Text>CONTENT</Text>
      </View>

      {/* bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.dark_mode_text}>BOTTOM</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(main_styles);
