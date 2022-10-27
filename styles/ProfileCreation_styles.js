import { colors } from "./Colors";
import { Platform, Dimensions } from "react-native";

export const prf_cr_styles = {
  // ====== //
  // Global //
  // ====== //
  text_dark_mode: {
    color: colors.dark_mode.text,
  },
  text_light_mode: {
    color: colors.light_mode.text,
  },
  bg_dark_mode: {
    backgroundColor: colors.dark_mode.darker,
  },
  bg_light_mode: {
    backgroundColor: colors.light_mode.darker,
  },
  safe_area: {
    backgroundColor: "",
  },
  main_container: {
    paddingTop: Platform.OS === "android" ? 22 : 4,
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.dark_mode.main,
  },
  textinput_basic: {
    width: 100,
    height: 40,
    backgroundColor: "grey",
  },

  // ========== //
  // Bottom Bar //
  // ========== //
  bottom_bar_container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: "auto",
    width: "auto",
    height: "3%",
    paddingBottom: 64,
  },
  bottom_bar_pressable: {
    display: "flex",
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow_icon: {
    width: 48,
    height: 48,
    tintColor: colors.accent_color,
  },
  bottom_bar_pressable_left: {
    marginRight: "auto",
  },
  bottom_bar_pressable_right: {
    marginLeft: "auto",
  },
  // ============== //
  // Profile Step 0 //
  // ============== //
  pressable: {
    width: 50,
    height: 30,
    margin: 10,
    borderWidth: 2,
  },
  title: {
    margin: 10,
    color: colors.dark_mode.text,
    alignSelf: "center",
    fontSize: 30,
  },
};
