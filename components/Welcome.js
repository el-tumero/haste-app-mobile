import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useContext, createContext, useState, useEffect } from "react";
import { global_styles } from "../styles/global";

export default function Welcome() {
  return (
    <SafeAreaView style={global_styles.container}>
      <Text> WELCOME</Text>
    </SafeAreaView>
  );
}
