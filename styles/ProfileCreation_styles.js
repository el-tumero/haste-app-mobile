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
