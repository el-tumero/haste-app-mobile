import { colors } from "./Colors";
import { Platform } from "react-native";
const inacitve_color = "rgb(230,230,230)";
const active_color = "rgb(80, 255, 175)";
const padding_hor = 20;

// -------------------------------------- //
// SIGN UP + SIGN UP VERIFICATION STYLESHEET
// -------------------------------------- //

export const sign_up_styles = {
  main_container: {
    display: "flex",
    width: "100%",
    height: "100%",
    marginTop: Platform.OS === "android" ? 26 : 0,
    // backgroundColor: "rgb(230,230,230)",
  },
  return_icon_pressable: {
    width: 50,
    height: 50,
  },
  return_icon: {
    width: 40,
    height: 40,
    // backgroundColor: "green",
  },
  title_container: {
    width: "100%",
    paddingVertical: 28,
    borderRadius: 42,
    paddingHorizontal: padding_hor,
    marginVertical: 20,
    backgroundColor: "rgba(67,255,175,0.55)",
  },
  title_text: {
    fontSize: 28,
    fontWeight: "700",
  },
  content_container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "95%",
    // backgroundColor: "rgba(100,230,230,0.75)",
  },
  phone_number_textinput_container: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "steelblue",
  },
  phone_number_country_prefix: {
    width: "20%",
    fontWeight: "600",
    paddingLeft: padding_hor,
    fontSize: 20,
    // backgroundColor: "powderblue",
  },
  phone_number_textinput: {
    width: "75%",
    borderBottomWidth: 1.5,
    fontSize: 20,
    // backgroundColor: "skyblue",
  },
  password_textinput_container: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: "5%",
    width: "90%",
    borderBottomWidth: 1.5,
    // backgroundColor: "darkblue",
  },
  password_textinput: {
    width: "90%",
    fontSize: 20,
  },
  text_verification_code_notice_container: {
    width: "100%",
    padding: 20,
    lineHeight: 12,
  },
  text_verification_code_notice: {
    fontSize: 12,
  },
  text_url: {
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  sign_up_submit_container: {
    paddingVertical: 14,
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  sign_up_submit_text: {
    fontSize: 18,
    color: "rgba(0,0,0,0.5)",
  },
  sign_up_submit_text_active: {
    color: "#20a16a",
  },
  full_button: {
    borderRadius: 25,
    backgroundColor: inacitve_color,
    alignItems: "center",
    width: "75%",
    height: "auto",
    padding: 14,
  },
  full_button_active: {
    backgroundColor: "#43FFAF",
  },
  // SIGN UP VERIFICATION
  verification_phone_number_container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "auto",
    // backgroundColor: "grey",
  },
  verification_phone_number_text: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 40,
  },
  resend_code_pressable: {
    borderWidth: 1.5,
    borderRadius: 25,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  verification_code_container: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    backgroundColor: "rgba(200,200,200,0.33)",
  },
  verification_code_textinput: {
    width: "12%",
    textAlign: "center",
    marginHorizontal: 4,
    borderBottomWidth: 1.5,
    fontSize: 32,
    fontWeight: "600",
  },
};
