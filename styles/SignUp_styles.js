import { colors } from "./Colors";
const inacitve_color = "rgb(230,230,230)";
const active_color = "rgb(80, 255, 175)";
const padding_hor = 20;

export const sign_up_styles = {
  main_container: {
    padding: 20,
    display: "flex",
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(230,230,230)",
  },
  return_icon: {
    width: 40,
    height: 40,
    // marginBottom: 20,
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
    // backgroundColor: "powderblue",
  },
  phone_number_textinput: {
    width: "75%",
    borderBottomWidth: 1,
    // backgroundColor: "skyblue",
  },
  password_textinput_container: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "5%",
    width: "90%",
    borderBottomWidth: 1,
    // backgroundColor: "darkblue",
  },
  text_verification_code_notice_container: {
    width: "100%",
    padding: 20,
    lineHeight: 12,
    // paddingHorizontal: padding_hor,
    // backgroundColor: "yellow",
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
  full_button: {
    borderRadius: 25,
    backgroundColor: inacitve_color,
    alignItems: "center",
    width: "75%",
    height: "auto",
    padding: 14,
  },
};
