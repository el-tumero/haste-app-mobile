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
  content: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
    width: "90%",
    height: "75%",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.dark_mode.lighter,
    backgroundColor: colors.dark_mode.darker,
    padding: 20,
  },
  textinput_basic: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: "2%",
    marginVertical: "2%",
    color: colors.dark_mode.text_inactive,
    textAlign: "center",
  },
  textinput_long_padding: {
    paddingHorizontal: "15%",
  },
  textinput_date_padding: {
    paddingHorizontal: "2%",
    margin: "2%",
  },
  title: {
    color: colors.dark_mode.text,
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 14,
  },
  text_basic: {
    color: colors.dark_mode.text,
    alignSelf: "center",
    marginVertical: 8,
    lineHeight: 26,
  },
  font_sm: {
    fontSize: 12,
  },
  font_md: {
    fontSize: 16,
  },
  font_lg: {
    fontSize: 20,
  },
  font_xl: {
    fontSize: 24,
  },
  date_input_container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  flex_horizontal_container: {
    display: "flex",
    width: "auto",
    height: "auto",
    flexDirection: "row",
    flexWrap: "nowrap",
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
    paddingTop: 14,
    paddingBottom: 60,
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
    width: "auto",
    height: "auto",
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.dark_mode.text_inactive,
  },
  pressable_active: {
    borderColor: colors.accent_color,
  },
  margin_vertical: {
    marginVertical: 8,
  },
};
