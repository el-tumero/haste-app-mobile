import { colors } from "./Colors";

export const welcome_styles = {
  main_container: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title_and_logo_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  title: {
    fontWeight: "500",
  },
  logo_png: {
    marginLeft: -30,
    top: -10,
    left: 4,
    width: 80,
    height: 80,
    tintColor: "white",
  },
  full_button: {
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: "#cccccc",
    alignItems: "center",
    width: "75%",
    height: "auto",
    padding: 10,
  },
  text_inside_full_button: {},
};
