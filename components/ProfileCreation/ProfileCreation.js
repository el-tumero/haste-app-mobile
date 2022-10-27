import React, { createContext, useCallback, useState, useEffect } from "react";
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
import Home, { HomeContext } from "../Home";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import facebook from "../../assets/socials/facebook.png";
import instagram from "../../assets/socials/instagram.png";
import snapchat from "../../assets/socials/snapchat.png";
import telegram from "../../assets/socials/telegram.png";
import left_arrow from "../../assets/icons/dark_mode/left_arrow.png";
import right_arrow from "../../assets/icons/dark_mode/right_arrow.png";
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
import { global_styles } from "../../styles/global";

export default function ProfileCreation() {
  // Evaluate device system theme
  const colorScheme = useColorScheme();

  // All userData states in order
  const [registerStep, setRegisterStep] = useState(0);

  // const [birthDate, setBirthDate] = useState("");
  // const [birthDateDay, setBirthDateDay] = useState("");
  // const [birthDateMonth, setBirthDateMonth] = useState("");
  // const [birthDateYear, setBirthDateYear] = useState("");
  // const [location, setLocation] = useState(null);
  // const [sex, setSex] = useState("");
  // const [target, setTarget] = useState("");
  // const [intimacy, setIntimacy] = useState("");
  // const [interests, setInterests] = useState([]);
  // const [interestsCounter, setInterestsCounter] = useState(0);
  // const [photos, setPhotos] = useState([]);
  // const [bio, setBio] = useState("");
  // const date = new Date();
  // const [socials, setSocials] = useState({
  //   instagram: undefined,
  //   facebook: undefined,
  //   snapchat: undefined,
  //   telegram: undefined,
  //   whatsapp: undefined,
  //   signal: undefined,
  //   discord: undefined,
  // });
  // OTHER STATES (MISC)

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [image, setImage] = useState(null);
  // const [bioCounter, setBioCounter] = useState(0);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [isPressed, setIsPressed] = useState(false);

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

  // useEffect(() => {
  //   console.log(userData.firstName);
  // }, [userData]);

  // LOADING FONTS
  // let [fontsLoaded] = useFonts({
  //   Raleway_300Light,
  //   Raleway_400Regular,
  //   Raleway_500Medium,
  //   Raleway_600SemiBold,
  //   Raleway_700Bold,
  // });
  // if (!fontsLoaded) {
  //   console.log("FAILED TO LOAD FONTS (!)");
  //   return null;
  // }

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     base64: true,
  //     quality: 1,
  //     aspect: [1, 1],
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.base64);
  //   }
  // };

  // const nameToUppercase = () => {
  //   setFirstName(firstName.charAt(0).toUpperCase() + firstName.slice(1));
  // };

  // const handleGeolocationAccess = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   console.log(status);
  //   if (status !== "granted") {
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }
  // };

  // const handleGeolocationGet = async () => {
  //   try {
  //     let location = await Location.getCurrentPositionAsync({
  //       accuracy: Location.Accuracy.Highest,
  //       maximumAge: 10000,
  //     });
  //     console.log(location);
  //     setLocation([location.coords.longitude, location.coords.latitude]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // ProfileStep evaluation processs
  // const evaluateStep = (stepIndex) => {
  //   setUserData({
  //     firstName,
  //     birthDate,
  //     location,
  //     sex,
  //     target,
  //     intimacy,
  //     interests,
  //     photos: [image],
  //     bio,
  //     socials: JSON.stringify(socials),
  //   });
  //   setRegisterStep((registerStep) => registerStep + 1);

  //   // Check for errors in each step
  //   switch (stepIndex) {
  //     case 0:
  //       console.log(`checking for err's in 0`);
  //       break;
  //     case 1:
  //       console.log(`checking for err's in 1`);
  //       break;
  //     default:
  //       console.log("does this even work? ");
  //   }
  // };

  // const handleSexChange = (sex) => {
  //   setSex(sex);
  //   console.log(sex);
  // };

  // const handleTargetChange = (target) => {
  //   setTarget(target);
  //   console.log(target);
  // };

  // const handleIntimacyChange = (intimacy) => {
  //   setIntimacy(intimacy);
  //   console.log(intimacy);
  // };

  // const handleBioChange = (bio) => {
  //   setBio(bio);
  //   setBioCounter(bio.length);
  // };

  // const handleSocialsChange = (platform) => (input) => {
  //   setSocials((prev) => ({
  //     ...prev,
  //     [platform]: input,
  //   }));
  // };

  // const handleInterestPick = (interest) => {
  //   setInterestsCounter((interestsCounter) => interestsCounter + 1);
  //   console.log(interest);
  //   setInterests([...interests, interest]);
  // };

  // const handleBirthDateChange = (dateType) => (input) => {
  //   if (dateType == "DD") {
  //     setBirthDateDay(input);
  //   }
  //   if (dateType == "MM") {
  //     setBirthDateMonth(input);
  //   }
  //   if (dateType == "YYYY") {
  //     setBirthDateYear(input);
  //   }
  // };

  // (varToUpdate, dataToSubmit)
  const submitProfileStepData = (object, dataSubmitted) => {
    console.log("updating userData...");
    setUserData((prev) => ({
      ...prev,
      firstName: dataSubmitted,
    }));
    console.log(userData);
  };

  const navigateProfileStep = (dir) => {
    if (dir === 1) setRegisterStep(registerStep + 1);
    if (dir === 0) setRegisterStep(registerStep - 1);
  };

  const ProfileCreationBottomBar = ({ prev, next }) => {
    return (
      <View style={styles.bottom_bar_container}>
        {prev ? (
          <Pressable
            style={[
              styles.bottom_bar_pressable,
              styles.bottom_bar_pressable_left,
            ]}
            onPress={() => navigateProfileStep(0)}
          >
            <Image source={left_arrow} style={prf_cr_styles.arrow_icon}></Image>
          </Pressable>
        ) : (
          <></>
        )}
        {next ? (
          <Pressable
            style={[
              styles.bottom_bar_pressable,
              styles.bottom_bar_pressable_right,
            ]}
            onPress={() => navigateProfileStep(1)}
          >
            <Image
              source={right_arrow}
              style={prf_cr_styles.arrow_icon}
            ></Image>
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    );
  };
  // ====== //
  const Step_0 = ({ userData, Submit }) => {
    const [firstName, setFirstName] = useState("");

    const onChangeName = (name) => {
      setFirstName(name);
    };

    const onSubmit = () => {
      console.log(firstName);
      Submit("firstName", firstName);
    };

    return (
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.main_container}>
          <Text style={styles.title}>STEP 0</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textinput_basic}
            placeholder="Twoje imię"
            placeholderTextColor="grey"
            autoCorrect={false}
            autoCapitalize={true}
            onChangeText={onChangeName}
            defaultValue={userData.firstName}
          />

          <Pressable onPress={onSubmit}>
            <Text>SUBMIT</Text>
          </Pressable>
          <ProfileCreationBottomBar next />
        </View>
      </SafeAreaView>
    );
  };
  // ====== //
  const Step_1 = () => {
    const debug = () => {
      console.log(userData);
    };

    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 1</Text>
        <Pressable onPress={debug}>
          <Text>Debug userdata</Text>
        </Pressable>
        <ProfileCreationBottomBar prev next />
      </SafeAreaView>
    );
  };
  // ====== //
  const Step_2 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 2</Text>
        <ProfileCreationBottomBar prev next />
      </SafeAreaView>
    );
  };

  // ====== //
  const Step_3 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 3</Text>
        <ProfileCreationBottomBar prev next />
      </SafeAreaView>
    );
  };

  // ====== //
  const Step_4 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 4</Text>
        <ProfileCreationBottomBar prev next />
      </SafeAreaView>
    );
  };

  // ====== //
  const Step_5 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 5</Text>
        <ProfileCreationBottomBar prev next />
      </SafeAreaView>
    );
  };

  // ====== //
  const Step_6 = () => {
    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 6</Text>
        <ProfileCreationBottomBar prev next />
      </SafeAreaView>
    );
  };

  const renderProfileStep = () => {
    console.log("register step:" + registerStep);
    switch (registerStep) {
      case 0:
        console.log("rendering step 0");
        return <Step_0 userData={userData} Submit={submitProfileStepData} />;
      case 1:
        return <Step_1 userData={userData} />;
      case 2:
        return <Step_2 />;
      case 3:
        return <Step_3 />;
      case 4:
        return <Step_4 />;
      case 5:
        return <Step_5 />;
      case 6:
        return <Step_6 />;
      case 7:
        return <Home />;
    }
  };

  return <>{renderProfileStep()}</>;
}

const styles = StyleSheet.create(prf_cr_styles);
