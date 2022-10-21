import { colors } from "./Colors";

export const main_styles = {
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.dark_mode.main,
  },
  dark_mode_text: {
    color: colors.dark_mode.text,
  },
  // TOP BAR
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    alignContent: "flex-end",
    flexWrap: "wrap",
    width: "100%",
    height: "7.5%",
    backgroundColor: colors.dark_mode.main,
  },
  topBarSettingsCtn: {
    flexWrap: "wrap",
    marginLeft: "auto",
    marginBottom: "2%",
    width: 40,
    height: 24,
  },
  topBar_icon: {
    width: 20,
    height: 20,
    tintColor: colors.dark_mode.text,
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  // BOTTOM BAR
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "7.5%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.dark_mode.main,
  },
  bottomBar_icon: {
    width: 24,
    height: 24,
    tintColor: colors.dark_mode.text,
  },
  // MIDDLE CONTENT
  content: {
    width: "100%",
    height: "85%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.dark_mode.lighter,
    borderRadius: 12,
  },
};
