import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
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
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import Home, { HomeContext } from "./Home";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import facebook from "../assets/socials/facebook.png";
import instagram from "../assets/socials/instagram.png";
import snapchat from "../assets/socials/snapchat.png";
import telegram from "../assets/socials/telegram.png";
import left_arrow from "../assets/icons/dark_mode/left_arrow.png";
import right_arrow from "../assets/icons/dark_mode/right_arrow.png";
import {
  NavigationContainer,
  PreventRemoveContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import Slider from "@react-native-community/slider";

// Context
export const ProfileCreationContext = createContext();

// Navigation
const Stack = createNativeStackNavigator();

// Import styles from ../styles + colors
import { prf_cr_styles } from "../styles/ProfileCreation_styles";
import { ReggaeOne_400Regular } from "@expo-google-fonts/dev";
import { registerErrorHandlers } from "expo-dev-client";
import { registerRootComponent } from "expo";
import { global_styles } from "../styles/global";
import { LogData } from "react-native/Libraries/LogBox/LogBox";
import { colors } from "../styles/Colors";
import { validate } from "uuid";

export default function ProfileCreation() {
  // Evaluate device system theme
  const colorScheme = useColorScheme();

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

  const [registerStep, setRegisterStep] = useState(0);

  const [personality, setPersonality] = useState([
    50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  ]);

  const [profileCreationComplete, setProfileCreationComplete] = useState(false);
  // profileData
  const [profileData, setProfileData] = useState({
    firstName: "",
    birthDate: undefined,
    location: [],
    gender: "",
    targetGender: "",
    lookingFor: "",
    photos: ["123"],
    interests: [],
    socialsList: [],
    bio: "",
    personality: [],
  });

  const PersonalitySlider = (props) => {
    const id = props.id;
    const handlePersonalitySliderChange = (value) => {
      setPersonality((prev) => {
        prev[id] = Math.floor(value);
        return prev;
      });
    };

    return (
      <>
        <Text style={[styles.text_basic, styles.font_md]}>{props.title}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          value={personality[id]}
          minimumValue={0}
          maximumValue={100}
          onValueChange={handlePersonalitySliderChange}
          minimumTrackTintColor="#3ad694"
          maximumTrackTintColor="#cccccc"
          thumbTintColor={colors.accent_color}
        />
      </>
    );
  };
  const updateProfileData = (_objToUpdate) => {
    console.log("UPDATING PROFILEDATA");
    console.log(_objToUpdate);
    // Format birthDate for profileData
    for (const [key, value] of Object.entries(_objToUpdate)) {
      console.log("keyvalue:");
      console.log(key, value);
      setProfileData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const navigateProfileStep = (dir, _objToUpdate) => {
    if (dir === 1) {
      setRegisterStep(registerStep + 1);
      updateProfileData(_objToUpdate);
    }
    if (dir === 0) setRegisterStep(registerStep - 1);
  };

  const ProfileCreationBottomBar = ({ prev, next, _objToUpdate }) => {
    return (
      <View style={styles.bottom_bar_container}>
        {prev ? (
          <TouchableOpacity
            style={[
              styles.bottom_bar_pressable,
              styles.bottom_bar_pressable_left,
            ]}
            onPress={() => navigateProfileStep(0, _objToUpdate)}
          >
            <Image source={left_arrow} style={prf_cr_styles.arrow_icon}></Image>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {next ? (
          <TouchableOpacity
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
          </TouchableOpacity>
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
    const [birthDateFinal, setBirthDateFinal] = useState(null);

    const dataToUpdate = {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      birthDate: birthDateFinal,
    };

    const onChangeName = (name) => {
      setChangesMade(true);
      setFirstName(name);
    };

    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("hasteToken");
      console.log(token);
    };

    useEffect(() => {
      checkToken();
    }, []);

    useEffect(() => {
      const birthDateFull = [birthDateDay, birthDateMonth, birthDateYear];
      const birthDateFormat = new Date(
        // YYYY-MM-DD
        birthDateFull[2],
        birthDateFull[1] - 1, // month index fix
        birthDateFull[0]
      );
      setBirthDateFinal(birthDateFormat.toDateString());
    }, [birthDateDay, birthDateMonth, birthDateYear]);

    const handleBirthDateChange = (dateType) => (input) => {
      if (
        birthDateDay.length > 0 &&
        birthDateMonth.length > 0 &&
        birthDateYear.length >= 3
      ) {
        setChangesMade(true);
        // setChanges();
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

    // const setChanges = () => {
    //   setChangesMade(true);
    // };

    return (
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.main_container}>
          <Text style={styles.title}>STEP 0</Text>
          <View style={styles.content}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[
                styles.textinput_basic,
                styles.textinput_long_padding,
                styles.font_md,
              ]}
              placeholder="Twoje imię"
              placeholderTextColor="grey"
              autoCorrect={false}
              autoCapitalize={true}
              onChangeText={onChangeName}
              defaultValue={profileData.firstName}
              maxLength={20}
            />
            <View style={styles.date_input_container}>
              <TextInput
                placeholder="DD"
                underlineColorAndroid="transparent"
                style={[
                  styles.textinput_basic,
                  styles.textinput_date_padding,
                  styles.font_md,
                ]}
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={handleBirthDateChange("DD")}
                defaultValue={
                  profileData.birthDate !== undefined
                    ? profileData.birthDate.substring(0, 2)
                    : ""
                }
                maxLength={2}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="MM"
                underlineColorAndroid="transparent"
                style={[
                  styles.textinput_basic,
                  styles.textinput_date_padding,
                  styles.font_md,
                ]}
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={handleBirthDateChange("MM")}
                defaultValue={
                  profileData.birthDate !== undefined
                    ? profileData.birthDate.substring(3, 5)
                    : ""
                }
                maxLength={2}
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="YYYY"
                underlineColorAndroid="transparent"
                style={[
                  styles.textinput_basic,
                  styles.textinput_date_padding,
                  styles.font_md,
                ]}
                placeholderTextColor="grey"
                autoCorrect={false}
                onChangeText={handleBirthDateChange("YYYY")}
                defaultValue={
                  profileData.birthDate !== undefined
                    ? profileData.birthDate.substring(6, 10)
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
    const [gender, setGender] = useState("");
    const [selectedBtngender, setSelectedBtngender] = useState("");
    const [targetGender, setTargetGender] = useState("");
    const [selectedBtntargetGender, setSelectedBtnGender] = useState("");
    const [lookingFor, setLookingFor] = useState("");
    const [selectedBtnLookingFor, setSelectedBtnLookingFor] = useState("");

    const dataToUpdate = {
      location: location,
      gender: gender,
      targetGender: targetGender,
      lookingFor: lookingFor,
    };

    // Get user's location (will ask for permission first)
    useEffect(() => {
      checkprofileData();

      const askForLocationAccess = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        console.log("GETTING USER's LOCATION");
        handleGeolocationGet();
        logProfileData();
      };

      askForLocationAccess();
    }, []);

    // Check if required data is provided (step 0 needs fix)
    useEffect(() => {
      if (gender !== "" && targetGender !== "" && lookingFor !== "") {
        setChangesMade(true);
      }
    }, [gender, targetGender, lookingFor]);

    const logProfileData = () => {
      console.log(profileData);
    };

    const checkprofileData = () => {
      if (profileData.gender !== "") setSelectedBtngender(profileData.gender);
      if (profileData.targetGender !== "")
        setSelectedBtnGender(profileData.targetGender);
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

    const handleGenderChange = (s) => {
      setGender(s);
      setSelectedBtngender(s);
    };

    const handleTargetGenderChange = (t) => {
      setTargetGender(t);
      setSelectedBtnGender(t);
    };

    const handleLookingForChange = (l) => {
      setLookingFor(l);
      setSelectedBtnLookingFor(l);
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
                  selectedBtngender == "male"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleGenderChange("male")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>
                  Mężczyzną
                </Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtngender == "female"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleGenderChange("female")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Kobietą</Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtngender == "other"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleGenderChange("other")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Inne</Text>
              </Pressable>
            </View>
            <Text style={[styles.text_basic, styles.font_lg]}>
              Interesują mnie
            </Text>
            <View
              style={[styles.flex_horizontal_container, styles.margin_vertical]}
            >
              <Pressable
                style={
                  selectedBtntargetGender == "men"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleTargetGenderChange("men")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>
                  Mężczyźni
                </Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtntargetGender == "women"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleTargetGenderChange("women")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Kobiety</Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtntargetGender == "other"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleTargetGenderChange("other")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Inne</Text>
              </Pressable>
            </View>
            {/* ===== */}
            <Text style={[styles.text_basic, styles.font_lg]}>Szukam</Text>
            <View
              style={[styles.flex_horizontal_container, styles.margin_vertical]}
            >
              <Pressable
                style={
                  selectedBtnLookingFor == "casual"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleLookingForChange("casual")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>Casual</Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtnLookingFor == "longterm"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleLookingForChange("longterm")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>
                  long term
                </Text>
              </Pressable>
              <Pressable
                style={
                  selectedBtnLookingFor == "friends"
                    ? [
                        styles.pressable,
                        styles.pressable_classic,
                        styles.pressable_active,
                      ]
                    : [styles.pressable, styles.pressable_classic]
                }
                onPress={() => handleLookingForChange("friends")}
              >
                <Text style={[styles.text_basic, styles.font_md]}>
                  Just friends
                </Text>
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
    // PHOTOS + INTERESTS

    useEffect(() => {
      console.log(photos);
      console.log(interests);
      if (photos.length >= 0 && interests.length >= 0) {
        console.log("STEP 2 GOOD");
        setChangesMade(true);
      }
    }, [interests, photos]);

    useEffect(() => {
      // checkprofileData();
      logProfileData();
    }, []);

    // useEffect(() => {
    //   console.log(dataToUpdate);
    // }, [dataToUpdate]);

    const [interests, setInterests] = useState([]);
    const [interestsCounter, setInterestsCounter] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [image, setImage] = useState("");
    const [imageURI, setImageURI] = useState(null);
    const [changesMade, setChangesMade] = useState(false);

    const dataToUpdate = {
      photos: photos,
      interests: interests,
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
        setImageURI(result.uri);
        updatePhotosArr(result.base64);
      }
    };

    const updatePhotosArr = (pic) => {
      setPhotos([...photos, pic]);
    };

    const logProfileData = () => {
      console.log(profileData);
    };

    const handleInterestPick = (intr) => {
      console.log(intr);
      // setInterestsCounter((interestsCounter) => interestsCounter + 1);
      setInterests([...interests, intr]);
    };

    return (
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.main_container}>
          <Text style={styles.title}>STEP 2</Text>
          <View style={styles.content}>
            <Pressable
              style={[styles.pressable, styles.margin_vertical]}
              onPress={pickImage}
            >
              <Text
                style={[
                  styles.text_dark_mode,
                  styles.font_md,
                  styles.textinput_date_padding,
                ]}
              >
                pick image
              </Text>
            </Pressable>
            <Image
              source={{ uri: imageURI }}
              style={{
                width: 200,
                height: 200,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: "white",
              }}
            />
            <ScrollView
              contentContainerStyle={[styles.scroll_view_interests_container]}
            >
              <Text
                style={[
                  styles.text_dark_mode,
                  styles.font_md,
                  styles.margin_vertical,
                  styles.margin_horizontal,
                ]}
              >
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("music")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>Music</Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("technology")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>
                    Technology
                  </Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("food")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>Food</Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("videogames")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>
                    Video games
                  </Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("fitness")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>
                    Fitness
                  </Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("travel")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>
                    Travel
                  </Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("photography")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>
                    Photography
                  </Text>
                </Pressable>
                {/* ##### */}
                <Pressable
                  style={[styles.pressable, styles.pressable_interest]}
                  onPress={() => handleInterestPick("reading")}
                >
                  <Text style={[styles.text_basic, styles.font_sm]}>
                    Reading
                  </Text>
                </Pressable>
                {/* ##### */}
              </Text>
            </ScrollView>
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
  const Step_3 = () => {
    useEffect(() => {
      logProfileData();
    }, []);

    // const [socials, setSocials] = useState({
    //   instagram: undefined,
    //   facebook: undefined,
    //   snapchat: undefined,
    //   telegram: undefined,
    //   whatsapp: undefined,
    //   signal: undefined,
    //   discord: undefined,
    // });

    // testing
    const [socials, setSocials] = useState(["asdasdasd", "asdasd"]);

    const dataToUpdate = {
      socialsList: socials,
    };

    const handleSocialInput = (social) => (input) => {
      console.log(social);
      console.log(input);
      setSocials((prev) => ({
        ...prev,
        [social]: input,
      }));
    };

    const logProfileData = () => {
      console.log(profileData);
    };

    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 3</Text>
        <View style={styles.content}>
          <Text style={[styles.text_basic, styles.font_md]}>
            Wpisz swoje socjale
          </Text>
          <Text style={[styles.text_basic, styles.font_sm]}>
            Jesli ktos Ci sie spodoba, bedzięcie mogli przejść na inny
            komunikator
          </Text>
          <ScrollView style={[styles.scroll_view_socials_container]}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[
                styles.textinput_basic,
                styles.textinput_long_padding,
                styles.font_md,
              ]}
              placeholder="Instagram"
              placeholderTextColor="grey"
              autoCorrect={false}
              onChangeText={handleSocialInput("instagram")}
              defaultValue={""}
              maxLength={25}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={[
                styles.textinput_basic,
                styles.textinput_long_padding,
                styles.font_md,
              ]}
              placeholder="Facebook"
              placeholderTextColor="grey"
              autoCorrect={false}
              onChangeText={handleSocialInput("facebook")}
              defaultValue={""}
              maxLength={25}
            />
            <TextInput
              underlineColorAndroid="transparent"
              style={[
                styles.textinput_basic,
                styles.textinput_long_padding,
                styles.font_md,
              ]}
              placeholder="Snapchat"
              placeholderTextColor="grey"
              autoCorrect={false}
              onChangeText={handleSocialInput("snapchat")}
              defaultValue={""}
              maxLength={25}
            />
          </ScrollView>
        </View>
        <ProfileCreationBottomBar prev next _objToUpdate={dataToUpdate} />
      </SafeAreaView>
    );
  };

  // ====== //
  const Step_4 = () => {
    useEffect(() => {
      logProfileData();
    }, []);

    const [bio, setBio] = useState("");

    const dataToUpdate = {
      bio: bio,
    };

    const logProfileData = () => {
      console.log(profileData);
    };

    const handleBioChange = (input) => {
      setBio(input);
    };

    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 4</Text>
        <View style={styles.content}>
          <Text style={[styles.text_basic, styles.font_lg]}>
            Napisz cos o sobie!
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[styles.textinput_bio, styles.font_md]}
            placeholder="Bio"
            placeholderTextColor="grey"
            autoCorrect={false}
            onChangeText={handleBioChange}
            defaultValue={""}
            maxLength={255}
          />
        </View>
        <ProfileCreationBottomBar prev next _objToUpdate={dataToUpdate} />
      </SafeAreaView>
    );
  };

  // ====== //
  const Step_5 = () => {
    // SLIDERY
    useEffect(() => {
      logProfileData();
    }, []);

    const logProfileData = () => {
      console.log(profileData);
    };

    const dataToUpdate = {
      personality: personality,
    };

    return (
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.title}>STEP 6</Text>
        <View style={[styles.content]}>
          <Text style={[styles.text_basic, styles.font_xxl]}>
            PERSONALITY TEST
          </Text>
          <ScrollView style={styles.scroll_view_socials_container}>
            <PersonalitySlider id={0} title="Ambitność" />
            <PersonalitySlider id={1} title="Pewność siebie" />
            <PersonalitySlider id={2} title="Cierpliwość" />
            <PersonalitySlider id={3} title="Życzliwość" />
            <PersonalitySlider id={4} title="Twórczość" />
            <PersonalitySlider id={5} title="Odpowiedzialność" />
            <PersonalitySlider id={6} title="Optymizm" />
            <PersonalitySlider id={7} title="Odwaga" />
            <PersonalitySlider id={8} title="Skromność" />
            <PersonalitySlider id={9} title="Wytrwałość" />
          </ScrollView>
        </View>
        <ProfileCreationBottomBar prev next _objToUpdate={dataToUpdate} />
      </SafeAreaView>
    );
  };

  const CreateProfile = () => {
    useEffect(() => {
      console.log(profileData);
      test();
    }, []);

    const test = async () => {
      try {
        const jwt = await SecureStore.getItemAsync("hasteToken");
        const res = await axios.post(`https://tumer.pl/profile`, profileData, {
          headers: {
            Cookie: jwt,
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    return <></>;
  };

  const renderProfileStep = () => {
    console.log("register step:" + registerStep);
    switch (registerStep) {
      case 0:
        return <Step_0 />;
      case 1:
        return <Step_1 />;
      case 2:
        return <Step_2 />;
      case 3:
        return <Step_3 />;
      case 4:
        return <Step_4 />;
      case 5:
        return <Step_5 />;
      case 6:
        return <CreateProfile />;
      case 7:
        return <Home />;
    }
  };

  return <>{renderProfileStep()}</>;
}

const styles = StyleSheet.create(prf_cr_styles);
