// export const SignUpVerificationModal = () => {
//   const [verificationCode, setVerificationCode] = useState("");

//   useEffect(() => {
//     if (verificationCode.length === 4) {
//       console.log("submitting");
//       verificationSubmit();
//     }
//   }, [verificationCode]);

//   useEffect(() => {
//     // if added
//     if (signUpVerVisible) getVerificationCode();
//   }, []);

//   const verificationSubmit = async () => {
//     const res2 = await axios.post(`https://tumer.pl/user/activate`, {
//       code: verificationCode,
//       phone: userCredentials.phone,
//     });
//     console.log(res2.data);
//     if (res2.status === 200) {
//       const res3 = await axios.post(`https://tumer.pl/user/login`, {
//         phone: userCredentials.phone,
//         password: userCredentials.password,
//         uid: "123123",
//       });

//       const jwt = res3.headers["set-cookie"][0];
//       await SecureStore.setItemAsync("hasteToken", jwt);
//       moveToProfileCreation();
//     }
//   };

//   const getVerificationCode = async () => {
//     const phone = userCredentials.phone;
//     const res1 = await axios.get(`https://tumer.pl/user/code?phone=${phone}`);
//     const code = res1.data.message;
//     console.log(code);
//   };

//   return (
//     <SafeAreaView style={welcome_s.main_container}>
//       <View style={styles.modal_container}>
//         <Text style={[styles.text_dark_mode, styles.font_md]}>
//           Podaj kod SMS
//         </Text>
//         <TextInput
//           onChangeText={(code) => setVerificationCode(code)}
//           maxLength={4}
//           style={styles.textinput_basic}
//           placeholder="_ _ _ _"
//           keyboardType="numeric"
//         ></TextInput>
//       </View>
//     </SafeAreaView>
//   );
// };
