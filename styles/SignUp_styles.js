import { colors } from "./Colors";
const padding_hor = 20;

export const sign_up_styles = {
  main_container: {
    padding: 20,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(230,230,230)",
  },
  return_icon: {
    width: 40,
    height: 40,
    backgroundColor: "green",
  },
  title_container: {
    width: "100%",
    backgroundColor: "blue",
    paddingVertical: 28,
    paddingHorizontal: padding_hor,
  },
  title_text: {
    fontSize: 32,
    fontWeight: "700",
  },
  content_container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "95%",
    backgroundColor: "rgba(100,230,230,0.75)",
  },
  phone_number_textinput_container: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "steelblue",
  },
  phone_number_country_prefix: {
    width: "20%",
    fontWeight: "600",
    padding: 20,
    backgroundColor: "powderblue",
  },
  phone_number_textinput: {
    width: "80%",
    backgroundColor: "skyblue",
  },
  password_textinput_container: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: padding_hor,
    width: "100%",
    height: "8%",
    backgroundColor: "darkblue",
  },
  text_verification_code_notice_container: {
    width: "100%",
    padding: 20,
    // paddingHorizontal: padding_hor,
    backgroundColor: "yellow",
  },
  text_url: {
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  sign_up_submit_btn: {
    paddingVertical: 14,
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  full_button: {
    borderWidth: 2.5,
    borderRadius: 25,
    borderColor: "red",
    alignItems: "center",
    width: "75%",
    height: "auto",
    padding: 10,
  },
};
