import { createContext, useCallback, useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Image,
  Appearance,
  useColorScheme,
} from "react-native";
import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import Card from "../Card";
import ContentCard from "../ContentCard";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import facebook from "../../assets/socials/facebook.png";
import instagram from "../../assets/socials/instagram.png";
import snapchat from "../../assets/socials/snapchat.png";
import telegram from "../../assets/socials/telegram.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

// Context
export const ProfileCreationContext = createContext();

// Navigation
const Stack = createNativeStackNavigator();

// Import styles from ../styles + colors
import { prf_cr_styles } from "../../styles/ProfileCreation_styles";
import { colors } from "../../styles/Colors";
import { ReggaeOne_400Regular } from "@expo-google-fonts/dev";
import { registerErrorHandlers } from "expo-dev-client";
import { registerRootComponent } from "expo";

// ================ //
// Profile Creation //
// ================ //

export default function ProfileCreation() {
  // Evaluate device system theme
  const colorScheme = useColorScheme();

  // ALL USERDATA STATES IN ORDER
  const [firstName, setFirstName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateDay, setBirthDateDay] = useState("");
  const [birthDateMonth, setBirthDateMonth] = useState("");
  const [birthDateYear, setBirthDateYear] = useState("");
  const [location, setLocation] = useState(null);
  const [sex, setSex] = useState("");
  const [target, setTarget] = useState("");
  const [intimacy, setIntimacy] = useState("");
  const [interests, setInterests] = useState([]);
  const [interestsCounter, setInterestsCounter] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [bio, setBio] = useState("");
  const date = new Date();
  const [socials, setSocials] = useState({
    instagram: undefined,
    facebook: undefined,
    snapchat: undefined,
    telegram: undefined,
    whatsapp: undefined,
    signal: undefined,
    discord: undefined,
  });
  // OTHER STATES (MISC)
  const [registerStep, setRegisterStep] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [bioCounter, setBioCounter] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  // USERDATA STATE BIG
  const [userData, setUserData] = useState({
    firstName: "",
    birthDate: new Date(),
    sex: "",
    target: "",
    intimacy: "",
    location: [],
    photos: [],
    interests: [],
    socials: [],
    bio: "",
  });

  // LOADING FONTS
  let [fontsLoaded] = useFonts({
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    console.log("FAILED TO LOAD FONTS (!)");
    return null;
  }
  // Testing userData
  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setImage(result.base64);
    }
  };

  const onChangeName = (name) => {
    setFirstName(name);
  };

  const nameToUppercase = () => {
    setFirstName(firstName.charAt(0).toUpperCase() + firstName.slice(1));
  };

  const handleGeolocationAccess = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };

  const handleGeolocationGet = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      console.log(location);
      setLocation([location.coords.longitude, location.coords.latitude]);
    } catch (error) {
      console.log(error);
    }
  };

  // ProfileStep evaluation processs
  const evaluateStep = (stepIndex) => {
    setUserData({
      firstName,
      birthDate,
      location,
      sex,
      target,
      intimacy,
      interests,
      photos: [image],
      bio,
      socials: JSON.stringify(socials),
    });
    setRegisterStep((registerStep) => registerStep + 1);

    // Check for errors in each step
    switch (stepIndex) {
      case 0:
        console.log(`checking for err's in 0`);
        break;
      case 1:
        console.log(`checking for err's in 1`);
        break;
      default:
        console.log("does this even work? ");
    }
  };

  const handleSexChange = (sex) => {
    setSex(sex);
    console.log(sex);
  };

  const handleTargetChange = (target) => {
    setTarget(target);
    console.log(target);
  };

  const handleIntimacyChange = (intimacy) => {
    setIntimacy(intimacy);
    console.log(intimacy);
  };

  const handleBioChange = (bio) => {
    setBio(bio);
    setBioCounter(bio.length);
  };

  const handleSocialsChange = (platform) => (input) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: input,
    }));
  };

  const handleInterestPick = (interest) => {
    setInterestsCounter((interestsCounter) => interestsCounter + 1);
    console.log(interest);
    setInterests([...interests, interest]);
  };

  const handleBirthDateChange = (dateType) => (input) => {
    if (dateType == "DD") {
      setBirthDateDay(input);
    }
    if (dateType == "MM") {
      setBirthDateMonth(input);
    }
    if (dateType == "YYYY") {
      setBirthDateYear(input);
    }
  };

  const navigateProfileStep = (dir) => {
    if (dir === 6) console.log("profile created ==> move to main.js");
    if (dir === 1) setRegisterStep(registerStep + 1);
    if (dir === 0) setRegisterStep(registerStep - 1);
  };

  const Step_0 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Pressable
          onPress={() => navigateProfileStep(1)}
          style={styles.pressable}
        >
          <Text>NExt</Text>
        </Pressable>
      </SafeAreaView>
    );
  };
  const Step_1 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 1</Text>

        <Pressable
          onPress={() => navigateProfileStep(0)}
          style={styles.pressable}
        >
          <Text>Back</Text>
        </Pressable>
        <Pressable
          onPress={() => navigateProfileStep(1)}
          style={styles.pressable}
        >
          <Text>Next</Text>
        </Pressable>
      </SafeAreaView>
    );
  };

  const Step_2 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 2</Text>

        <Pressable
          onPress={() => navigateProfileStep(0)}
          style={styles.pressable}
        >
          <Text>Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  };

  const renderProfileStep = () => {
    console.log("register step:" + registerStep);
    switch (registerStep) {
      case 0:
        console.log("rendering step 0");
        return <Step_0 />;
      case 1:
        return <Step_1 />;
      case 2:
        return <Step_2 />;
    }
  };

  return <>{renderProfileStep()}</>;
}

const styles = StyleSheet.create(prf_cr_styles);
