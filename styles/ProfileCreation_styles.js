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
  main_container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textinput_basic: {
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
    width: "100%",
    height: "3%",
    marginBottom: "3%",
    backgroundColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
  },
  bottom_bar_pressable: {
    display: "flex",
    width: "20%",
    height: "200%",
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -10 }],
  },
  bottom_bar_pressable_left: {
    marginRight: "auto",
    // alignSelf: "flex-start",
  },
  bottom_bar_pressable_right: {
    marginLeft: "auto",
    // alignSelf: "flex-end",
    // transform: [{ translateY: 10 }, { translateX: 2 }],
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
    alignSelf: "center",
    fontSize: 30,
  },
};
