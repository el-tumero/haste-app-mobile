import { colors } from "./Colors";

export const prf_cr_styles = {
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
  // BirthDate stuff
  lineTextInput: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    height: "14%",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "left",
    borderColor: colors.accent_color_inactive,
  },
  BirthDateContainer: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
    marginBottom: "5%",
    height: "18%",
    borderRadius: 10,
  },
  textInputBirthDateYear: {
    width: "24%",
    height: "100%",
    marginLeft: "1.5%",
    marginRight: "1.5%",
    borderRadius: 10,
    textAlign: "center",
  },
  textInputBirthDateShort: {
    width: "12%",
    height: "100%",
    marginLeft: "1.5%",
    marginRight: "1.5%",
    borderRadius: 10,
    textAlign: "center",
  },
  centerText: {
    textAlign: "center",
  },
  // br template
  sampleMarginTop: {
    marginTop: 40,
  },

  classicButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    marginTop: "4%",
    marginBottom: "4%",
    borderRadius: 6,
  },
  classicButton_dark_mode: {
    backgroundColor: colors.accent_color_inactive,
  },
  classicButton_light_mode: {
    backgroundColor: colors.light_mode.darker,
  },
  classicButtonText_dark_mode: {
    color: "white",
  },
};
