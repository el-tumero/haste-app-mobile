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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "expo-image-picker";
import facebook from "../../assets/socials/facebook.png";
import instagram from "../../assets/socials/instagram.png";
import snapchat from "../../assets/socials/snapchat.png";
import telegram from "../../assets/socials/telegram.png";
import { theme } from "../Styles";
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

// Import styles from ../styles + colors
import { prf_cr_styles } from "../../styles/ProfileCreation_styles";
import { colors } from "../../styles/Colors";

// App
export default function Register() {
  // Evaluate device system theme
  const colorScheme = useColorScheme();

  // ALL USERDATA STATES IN ORDER
  const [firstName, setFirstName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [location, setLocation] = useState(null);
  const [sex, setSex] = useState("");
  const [target, setTarget] = useState("");
  const [intimacy, setIntimacy] = useState("");
  const [interests, setInterests] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [bio, setBio] = useState("");
  const [socials, setSocials] = useState({
    instagram: undefined,
    facebook: undefined,
    snapchat: undefined,
    telegram: undefined,
    whatsapp: undefined,
    signal: undefined,
    discord: undefined,
  });
  const date = new Date();

  // USERDATA STATE BIG
  const [interestsCounter, setInterestsCounter] = useState(0);
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

  // OTHER STATES (MISC)
  const [registerStep, setRegisterStep] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [bioCounter, setBioCounter] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [birthDateDay, setBirthDateDay] = useState("");
  const [birthDateMonth, setBirthDateMonth] = useState("");
  const [birthDateYear, setBirthDateYear] = useState("");

  useEffect(() => {
    // console.log(userData);
  }, [userData]);

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

  // uloz to chronologicznie potem

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
        console.log("what?");
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

  const submitBirthDate = async () => {
    console.log(birthDateDay);
    console.log(birthDateMonth);
    console.log(birthDateYear);
    // console.log(birthDate.toString());
  };

  const ToggleButton = () => {
    //testing purposes
    setIsPressed(!isPressed);
    // console.log(colorScheme);
    submitBirthDate();
    evaluateStep(0);
  };

  // (0) First Name + BirthDate
  if (registerStep == 0) {
    // Dark Theme
    if (colorScheme === "dark") {
      return (
        <SafeAreaView>
          <StatusBar
            backgroundColor="#43FFAF"
            networkActivityIndicatorVisible={true}
            style="auto"
            translucent={false}
          />

          <ContentCard title="Jak Ci na imię?" footer="1/6">
            <TextInput
              style={[styles.lineTextInput, styles.text_dark_mode]}
              placeholder="Twoje imię"
              placeholderTextColor="grey"
              autoCorrect={false}
              autoCapitalize={true}
              onChangeText={onChangeName}
            />
            <Text
              style={[
                styles.centerText,
                styles.text_dark_mode,
                styles.sampleMarginTop,
              ]}
            >
              Data urodzenia
            </Text>
            <View style={styles.BirthDateContainer}>
              <TextInput
                style={[
                  styles.textInputBirthDateShort,
                  styles.text_dark_mode,
                  styles.bg_dark_mode,
                ]}
                allowFontScaling={true}
                autoCorrect={false}
                autoComplete="off"
                disableFullscreenUI={true}
                keyboardType="number-pad"
                maxLength={2}
                placeholderTextColor={colors.dark_mode.text_inactive}
                placeholder="DD"
                value={birthDateDay}
                onChangeText={handleBirthDateChange("DD")}
              />

              <TextInput
                style={[
                  styles.textInputBirthDateShort,
                  styles.text_dark_mode,
                  styles.bg_dark_mode,
                ]}
                allowFontScaling={true}
                autoCorrect={false}
                autoComplete="off"
                disableFullscreenUI={true}
                keyboardType="number-pad"
                maxLength={2}
                placeholderTextColor={colors.dark_mode.text_inactive}
                placeholder="MM"
                value={birthDateMonth}
                onChangeText={handleBirthDateChange("MM")}
              />

              <TextInput
                style={[
                  styles.textInputBirthDateYear,
                  styles.text_dark_mode,
                  styles.bg_dark_mode,
                ]}
                allowFontScaling={true}
                autoCorrect={false}
                autoComplete="off"
                disableFullscreenUI={true}
                keyboardType="number-pad"
                maxLength={4}
                placeholderTextColor={colors.dark_mode.text_inactive}
                placeholder="YYYY"
                value={birthDateYear}
                onChangeText={handleBirthDateChange("YYYY")}
              />
            </View>
            <Text style={[styles.centerText, styles.text_dark_mode]}>
              Twój wiek będzie publiczny.
            </Text>

            <Pressable onPress={ToggleButton}>
              <Text>Console log date</Text>
            </Pressable>
            {/* missing next button (!)*/}
          </ContentCard>
        </SafeAreaView>
      );
    } else {
      // Light theme
      return (
        <View>
          <Text>Coming soon... light mode for losers.</Text>
        </View>
      );
    }
  }
  // if (registerStep == 1) {
  //   return (
  //     <SafeAreaView style={styles.main}>
  //       <StatusBar style="dark" />

  //       <Card title="Halo, gdzie jesteś?">
  //         <Pressable
  //           style={styles.nextButton}
  //           onPress={handleGeolocationAccess}
  //         >
  //           <Text style={styles.nextButtonText}>Zezwól na lokalizacje</Text>
  //         </Pressable>

  //         <Pressable style={styles.nextButton} onPress={handleGeolocationGet}>
  //           <Text style={styles.nextButtonText}>CLI lokalizacja</Text>
  //         </Pressable>

  //         <View>
  //           <Text style={styles.medText}>Identyfikuje się jako</Text>
  //           <Pressable
  //             style={styles.nextButtonHalf}
  //             onPress={() => handleSexChange("male")}
  //           >
  //             <Text style={styles.nextButtonText}>Mężczyzna</Text>
  //           </Pressable>

  //           <Pressable
  //             style={styles.nextButtonHalf}
  //             onPress={() => handleSexChange("female")}
  //           >
  //             <Text style={styles.nextButtonText}>Kobieta</Text>
  //           </Pressable>

  //           <Pressable
  //             style={styles.nextButtonHalf}
  //             onPress={() => handleSexChange("other")}
  //           >
  //             <Text style={styles.nextButtonText}>Inne</Text>
  //           </Pressable>
  //         </View>

  //         <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
  //           <Text style={styles.nextButtonText}>DALEJ</Text>
  //         </Pressable>
  //       </Card>
  //     </SafeAreaView>
  //   );
  // }

  if (registerStep == 2) {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar style="dark" />
        <Card title="Powiedz nam czego szukasz">
          <Text style={styles.regText}>Szukam:</Text>

          <BouncyCheckbox
            style={{ marginLeft: "10%", marginRight: "10%" }}
            size={25}
            fillColor="#3EB489"
            unfillColor="#FFFFFF"
            text="Kobiety"
            iconStyle={{ borderColor: "#3EB489" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.regText}
            onPress={() => handleTargetChange("female")}
          />

          <BouncyCheckbox
            style={{ marginLeft: "10%", marginRight: "10%" }}
            size={25}
            fillColor="#3EB489"
            unfillColor="#FFFFFF"
            text="Mężczyzny"
            iconStyle={{ borderColor: "#3EB489" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.regText}
            onPress={() => handleTargetChange("male")}
          />

          <BouncyCheckbox
            style={{ marginLeft: "10%", marginRight: "10%" }}
            size={25}
            fillColor="#3EB489"
            unfillColor="#FFFFFF"
            text="Oba"
            iconStyle={{ borderColor: "#3EB489" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.regText}
            onPress={() => handleTargetChange("both")}
          />

          <Text style={styles.regText}>Chcę tu:</Text>

          <BouncyCheckbox
            style={{ marginLeft: "10%", marginRight: "10%" }}
            size={25}
            fillColor="#3EB489"
            unfillColor="#FFFFFF"
            text="Spotykać się i randkować"
            iconStyle={{ borderColor: "#3EB489" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.regText}
            onPress={() => handleIntimacyChange("dating")}
          />

          <BouncyCheckbox
            style={{ marginLeft: "10%", marginRight: "10%" }}
            size={25}
            fillColor="#3EB489"
            unfillColor="#FFFFFF"
            text="Znaleźć długotrwałą relację"
            iconStyle={{ borderColor: "#3EB489" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.regText}
            onPress={() => handleIntimacyChange("longterm")}
          />

          <BouncyCheckbox
            style={{ marginLeft: "10%", marginRight: "10%" }}
            size={25}
            fillColor="#3EB489"
            unfillColor="#FFFFFF"
            text="Znaleźć relację bez zobowiązań"
            iconStyle={{ borderColor: "#3EB489" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={styles.regText}
            onPress={() => handleIntimacyChange("casual")}
          />

          <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
            <Text style={styles.nextButtonText}>DALEJ</Text>
          </Pressable>
        </Card>
      </SafeAreaView>
    );
  }

  if (registerStep == 3) {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar style="dark" />
        <Card title="Jakie są Twoje pasje?">
          <Text style={styles.medText}>Wybierz od 3 do 5</Text>
          <Text style={styles.smText}>{interestsCounter}</Text>

          {/* IMPORTANT - REFACTOR THIS INTO DATA ARR IN ANOTHER FILE LIKE REACT DOCS BETA (STATE TUTORIAL IMGUR)  */}
          <View style={styles.interestCtn}>
            <View style={styles.interestOuterLayout}>
              <Pressable
                style={styles.interestBox}
                onPress={() => handleInterestPick("movies")}
              >
                <Text style={styles.interestText}>Filmy</Text>
              </Pressable>

              <Pressable
                style={styles.interestBox}
                onPress={() => handleInterestPick("books")}
              >
                <Text style={styles.interestText}>Książki</Text>
              </Pressable>

              <Pressable
                style={styles.interestBox}
                onPress={() => handleInterestPick("soccer")}
              >
                <Text style={styles.interestText}>Piłka nożna</Text>
              </Pressable>

              <Pressable
                style={styles.interestBox}
                onPress={() => handleInterestPick("gaming")}
              >
                <Text style={styles.interestText}>Gaming</Text>
              </Pressable>

              <Pressable
                style={styles.interestBox}
                onPress={() => handleInterestPick("guitar")}
              >
                <Text style={styles.interestText}>Granie na gitarze</Text>
              </Pressable>

              <Pressable
                style={styles.interestBox}
                onPress={() => handleInterestPick("horseriding")}
              >
                <Text style={styles.interestText}>Jazda konno</Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
            <Text style={styles.nextButtonText}>DALEJ</Text>
          </Pressable>
        </Card>
      </SafeAreaView>
    );
  }

  if (registerStep == 4) {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar style="dark" />
        <Card title="Pokaż się!">
          <View>
            <Pressable onPress={pickImage} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Wybierz zdjęcia</Text>
            </Pressable>

            <View style={styles.profileImagesCtn}>
              {image && (
                <Image
                  source={{ uri: "data:image/png;base64," + image }}
                  style={styles.profileImage}
                />
              )}
            </View>
          </View>

          <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
            <Text style={styles.nextButtonText}>DALEJ</Text>
          </Pressable>
        </Card>
      </SafeAreaView>
    );
  }

  if (registerStep == 5) {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar style="dark" />

        <Card title="Napisz coś ciekawego o sobie ;)">
          <Text style={styles.regText}>Bio: </Text>
          <TextInput
            style={styles.textinputBio}
            onChangeText={handleBioChange}
          ></TextInput>
          <Text style={styles.smText}>{bioCounter}/400</Text>

          <View style={styles.socialsCtn}>
            <Text style={styles.regText}>
              Podaj swoje sociale żebyś mógł wymienić się z matchem
            </Text>

            <Image source={instagram} style={styles.socialsIcon}></Image>
            <TextInput
              style={styles.textinputSocial}
              onChangeText={handleSocialsChange("instagram")}
              placeholder="instagram:"
            ></TextInput>

            <Image source={facebook} style={styles.socialsIcon}></Image>
            <TextInput
              style={styles.textinputSocial}
              onChangeText={handleSocialsChange("facebook")}
              placeholder="facebook:"
            ></TextInput>
          </View>

          <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
            <Text style={styles.nextButtonText}>DALEJ</Text>
          </Pressable>
        </Card>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create(prf_cr_styles);
