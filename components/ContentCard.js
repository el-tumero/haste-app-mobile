import {
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
} from "react-native";
import {
  useFonts,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { colors } from "../styles/Colors";

export default function ContentCard(props) {
  let [fontsLoaded] = useFonts({
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.container_title}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.content}>{props.children}</View>
        <View style={styles.container_footer}>
          <Text style={styles.footer}>{props.footer}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// const colors = StyleSheet.create(colors)
const styles = StyleSheet.create({
  bg: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.dark_mode.lightest,
  },
  // all containers
  container: {
    width: "90%",
    height: "85%",
    paddingTop: 20,
    paddingBottom: 20,
    padding: 20,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: colors.dark_mode.main,
  },
  container_title: {
    display: "flex",
    justifyContent: "center",
    marginTop: 0,
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "15%",
    height: "8%",
    backgroundColor: colors.dark_mode.darker,
    borderRadius: 12,
  },
  container_footer: {
    position: "absolute",
    justifyContent: "center",
    height: "7%",
    width: "14%",
    backgroundColor: colors.dark_mode.darker,
    borderRadius: 12,
    top: "98%",
    left: "48%",
    right: "auto",
  },
  // top text (title)
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    fontFamily: "Raleway_600SemiBold",
  },
  // content inside
  content: {
    fontSize: 14,
    fontFamily: "Raleway_400Regular",
    textAlign: "center",
  },
  // footer (for err etc)
  footer: {
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    color: colors.dark_mode.text,
  },
});
