import { StyleSheet } from "react-native";

export const global_styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  light_mode: {
    text: "#000000",
    main: "#e8e8e8",
    lighter: "#e6e6e6",
    darker: "#d2d2d2",
  },
  dark_mode: {
    text: "#ffffff",
    text_inactive: "#e6e6e6",
    main: "#14191f",
    lightest: "#19212b",
    lighter: "#151d24",
    darker: "#0f1419",
  },
  accent_color: "#43FFAF",
  accent_color_inactive: "#3ad694",
});
