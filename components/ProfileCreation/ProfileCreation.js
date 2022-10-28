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
import { ReggaeOne_400Regular } from "@expo-google-fonts/dev";
import { registerErrorHandlers } from "expo-dev-client";
import { registerRootComponent } from "expo";
import { global_styles } from "../../styles/global";

export default function ProfileCreation() {
  // Evaluate device system theme
  const colorScheme = useColorScheme();

  // All userData states in order
  const [registerStep, setRegisterStep] = useState(0);

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
  // const [isPressed, setIsPressed] = useState(false);

  // USERDATA STATE BIG
  const [userData, setUserData] = useState({
    firstName: "",
    birthDate: undefined,
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

  const updateUserData = (_objToUpdate) => {
    console.log("UPDATING USERDATA");
    console.log(_objToUpdate);
    // Format birthDate for userData
    if (_objToUpdate.birthDate !== undefined) {
      const temp = _objToUpdate.birthDate.join(" ");
      _objToUpdate.birthDate = temp;
      // console.log(_objToUpdate.birthDate);
    }
    for (const [key, value] of Object.entries(_objToUpdate)) {
      console.log("keyvalue:");
      console.log(key, value);
      setUserData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
    console.log(userData);
  };

  const navigateProfileStep = (dir, _objToUpdate) => {
    if (dir === 1) {
      setRegisterStep(registerStep + 1);
      updateUserData(_objToUpdate);
    }
    if (dir === 0) setRegisterStep(registerStep - 1);
  };

  const ProfileCreationBottomBar = ({ prev, next, _objToUpdate }) => {
    return (
      <View style={styles.bottom_bar_container}>
        {prev ? (
          <Pressable
            style={[
              styles.bottom_bar_pressable,
              styles.bottom_bar_pressable_left,
            ]}
            onPress={() => navigateProfileStep(0, _objToUpdate)}
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
            onPress={() => navigateProfileStep(1, _objToUpdate)}
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
  const Step_0 = () => {
    const [changesMade, setChangesMade] = useState(false);
    const [firstName, setFirstName] = useState("");

    const [birthDateDay, setBirthDateDay] = useState("");
    const [birthDateMonth, setBirthDateMonth] = useState("");
    const [birthDateYear, setBirthDateYear] = useState("");

    const dataToUpdate = {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      birthDate: [birthDateDay, birthDateMonth, birthDateYear],
    };

    const onChangeName = (name) => {
      setChanges();
      setFirstName(name);
    };

    const handleBirthDateChange = (dateType) => (input) => {
      if (
        birthDateDay.length > 0 &&
        birthDateMonth.length > 0 &&
        birthDateYear.length >= 3
      ) {
        setChanges();
      }
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

    const setChanges = () => {
      setChangesMade(true);
    };

    return (
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.main_container}>
          <Text style={styles.title}>STEP 0</Text>
          <View style={styles.content}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[styles.textinput_basic, styles.textinput_long_padding]}
              placeholder="Twoje imię"
              placeholderTextColor="grey"
              autoCorrect={false}
              autoCapitalize={true}
              onChangeText={onChangeName}
              defaultValue={userData.firstName}
              maxLength={20}
            />
            <View style={styles.date_input_container}>
              <TextInput
                placeholder="DD"
                underlineColorAndroid="transparent"
                style={[styles.textinput_basic, styles.textinput_date_padding]}
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={handleBirthDateChange("DD")}
                defaultValue={
                  userData.birthDate !== undefined
                    ? userData.birthDate.substring(0, 2)
                    : ""
                }
                maxLength={2}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="MM"
                underlineColorAndroid="transparent"
                style={[styles.textinput_basic, styles.textinput_date_padding]}
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={handleBirthDateChange("MM")}
                defaultValue={
                  userData.birthDate !== undefined
                    ? userData.birthDate.substring(3, 5)
                    : ""
                }
                maxLength={2}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="YYYY"
                underlineColorAndroid="transparent"
                style={[styles.textinput_basic, styles.textinput_date_padding]}
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={handleBirthDateChange("YYYY")}
                defaultValue={
                  userData.birthDate !== undefined
                    ? userData.birthDate.substring(6, 10)
                    : ""
                }
                maxLength={4}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <ProfileCreationBottomBar
            next
            _objToUpdate={changesMade ? dataToUpdate : ""}
          />
        </View>
      </SafeAreaView>
    );
  };
  // ====== //
  const Step_1 = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const [location, setLocation] = useState(null);
    const [sex, setSex] = useState("");
    const [selectedBtnSex, setSelectedBtnSex] = useState("");
    const [target, setTarget] = useState("");
    const [selectedBtnTarget, setSelectedBtnTarget] = useState("");

    const dataToUpdate = {
      location: location,
      sex: sex,
      target: target,
    };

    // Get user's location (will ask for permission first)
    useEffect(() => {
      checkUserData();

      const askForLocationAccess = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        console.log("GETTING USER's LOCATION");
        handleGeolocationGet();
      };

      askForLocationAccess();
    }, []);

    // Check if required data is provided (step 0 needs fix)
    useEffect(() => {
      if (sex !== "" && target !== "") {
        console.log("REQUIRED DATA");
        setChangesMade(true);
      }
    }, [sex, target]);

    const checkUserData = () => {
      if (userData.sex !== "") setSelectedBtnSex(userData.sex);
      if (userData.target !== "") setSelectedBtnTarget(userData.target);
      // console.log(userData);
      // console.log(userData.sex);
      // console.log(userData.target);
    };

    const handleGeolocationGet = async () => {
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });
        // console.log(location);
        setLocation([location.coords.longitude, location.coords.latitude]);
      } catch (error) {
        console.log(error);
      }
    };

    const handleSexChange = (s) => {
      setSex(s);
      setSelectedBtnSex(s);
    };

    const handleTargetChange = (t) => {
      setTarget(t);
      setSelectedBtnTarget(t);
    };

    return (
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.main_container}>
          <Text style={styles.title}>STEP 1</Text>
          <View style={styles.content}>
            <Text style={[styles.text_basic, styles.font_lg]}>Jestem</Text>
            <View
              style={[styles.flex_horizontal_container, styles.margin_vertical]}
            >
              <Pressable
                style={
                  selectedBtnSex == "male"
                    ? [styles.pressable, styles.pressable_active]
                    : styles.pressable
                }
                onPress={() => handleSexChange("male")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>
                  Mężczyzną
                </Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtnSex == "female"
                    ? [styles.pressable, styles.pressable_active]
                    : styles.pressable
                }
                onPress={() => handleSexChange("female")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Kobietą</Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtnSex == "other"
                    ? [styles.pressable, styles.pressable_active]
                    : styles.pressable
                }
                onPress={() => handleSexChange("other")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Inne</Text>
              </Pressable>
            </View>
            {/* ============== */}
            <Text style={[styles.text_basic, styles.font_lg]}>
              Interesują mnie
            </Text>
            <View
              style={[styles.flex_horizontal_container, styles.margin_vertical]}
            >
              <Pressable
                style={
                  selectedBtnTarget == "men"
                    ? [styles.pressable, styles.pressable_active]
                    : styles.pressable
                }
                onPress={() => handleTargetChange("men")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>
                  Mężczyźni
                </Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtnTarget == "women"
                    ? [styles.pressable, styles.pressable_active]
                    : styles.pressable
                }
                onPress={() => handleTargetChange("women")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Kobiety</Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtnTarget == "other"
                    ? [styles.pressable, styles.pressable_active]
                    : styles.pressable
                }
                onPress={() => handleTargetChange("other")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Inne</Text>
              </Pressable>
            </View>
          </View>
          <ProfileCreationBottomBar
            prev
            next
            _objToUpdate={changesMade ? dataToUpdate : ""}
          />
        </View>
      </SafeAreaView>
    );
  };
  // ====== //
  const Step_2 = () => {
    const debug = () => {
      console.log(userData);
    };

    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 2</Text>
        <Pressable onPress={debug}>
          <Text>LOG uD</Text>
        </Pressable>
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
        return <Step_0 userData={userData} />;
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
