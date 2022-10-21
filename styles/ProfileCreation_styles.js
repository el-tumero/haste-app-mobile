import { colors } from "./Colors";

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
  // ========== //
  // Bottom Bar //
  // ========== //
  bottom_bar_container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    width: "100%",
    height: "10%",
    backgroundColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
  },
  bottom_bar_pressable: {
    display: "flex",
    width: "25%",
    height: "100%",
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "black",
  },
  bottom_bar_pressable_left: {
    marginRight: "auto",
    alignSelf: "flex-start",
  },
  bottom_bar_pressable_right: {
    marginLeft: "auto",
    alignSelf: "flex-end",
  },
  // ============== //
  // Profile Step 0 //
  // ============== //
  main_container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  pressable: {
    width: 50,
    height: 30,
    margin: 10,
    borderWidth: 2,
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
  },
};
