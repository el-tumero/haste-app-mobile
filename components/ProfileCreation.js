import { createContext, useCallback, useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Image,
} from "react-native";
import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import Card from "./Card";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as ImagePicker from "expo-image-picker";
import facebook from "../assets/socials/facebook.png";
import instagram from "../assets/socials/instagram.png";
import snapchat from "../assets/socials/snapchat.png";
import telegram from "../assets/socials/telegram.png";

import {
  useFonts,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";

export const ProfileCreationContext = createContext();

export default function Register() {
  // USERDATA STATES IN ORDER
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
  const [image, setImage] = useState(null);
  const [bioCounter, setBioCounter] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  // USERDATA STATES
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

  // OTHER
  const [registerStep, setRegisterStep] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  let [fontsLoaded] = useFonts({
    Raleway_300Light,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }

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

  const handleDateConfirm = (date) => {
    const compactBirthDate = date.toString().substring(4, 15);
    setBirthDate(compactBirthDate);
    hideDatePicker();
  };

  const onChangeName = (name) => {
    setFirstName(name);
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

  const handleNextRegisterStep = () => {
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

  if (registerStep == 0) {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar style="dark" />
        <Card title="Jak Ci na imię?">
          <TextInput
            style={styles.textinput}
            placeholder="    Twoje imię"
            placeholderTextColor="grey"
            onChangeText={onChangeName}
          />

          <View>
            <Pressable style={styles.nextButton} onPress={showDatePicker}>
              <Text style={styles.nextButtonText}>Wybierz datę urodzenia:</Text>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <Text style={styles.regText}>Wybrana data: {birthDate}</Text>

          <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
            <Text style={styles.nextButtonText}>DALEJ</Text>
          </Pressable>
        </Card>
      </SafeAreaView>
    );
  }

  if (registerStep == 1) {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar style="dark" />

        <Card title="Halo, gdzie jesteś?">
          <Pressable
            style={styles.nextButton}
            onPress={handleGeolocationAccess}
          >
            <Text style={styles.nextButtonText}>Zezwól na lokalizacje</Text>
          </Pressable>

          <Pressable style={styles.nextButton} onPress={handleGeolocationGet}>
            <Text style={styles.nextButtonText}>CLI lokalizacja</Text>
          </Pressable>

          <View>
            <Text style={styles.medText}>Identyfikuje się jako</Text>
            <Pressable
              style={styles.nextButtonHalf}
              onPress={() => handleSexChange("male")}
            >
              <Text style={styles.nextButtonText}>Mężczyzna</Text>
            </Pressable>

            <Pressable
              style={styles.nextButtonHalf}
              onPress={() => handleSexChange("female")}
            >
              <Text style={styles.nextButtonText}>Kobieta</Text>
            </Pressable>

            <Pressable
              style={styles.nextButtonHalf}
              onPress={() => handleSexChange("other")}
            >
              <Text style={styles.nextButtonText}>Inne</Text>
            </Pressable>
          </View>

          <Pressable style={styles.nextButton} onPress={handleNextRegisterStep}>
            <Text style={styles.nextButtonText}>DALEJ</Text>
          </Pressable>
        </Card>
      </SafeAreaView>
    );
  }

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

// CSS
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(210,210,210)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  textinput: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    height: "7%",
    backgroundColor: "rgb(210,210,210)",
    marginTop: "8%",
    marginBottom: "8%",
    borderRadius: 6,
    textDecorationLine: "none",
  },

  textinputBio: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    height: "22%",
    backgroundColor: "rgb(210,210,210)",
    marginTop: "1%",
    marginBottom: "1%",
    borderRadius: 6,
    textDecorationLine: "none",
  },

  // fix this later
  textinputSocial: {
    marginLeft: "25%",
    marginRight: "10%",
    width: "65%",
    backgroundColor: "rgb(210,210,210)",
    marginTop: "-20%",
    borderRadius: 6,
    textDecorationLine: "none",
  },

  textinputError: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    height: "7%",
    backgroundColor: "rgb(210,210,210)",
    borderWidth: 1,
    borderColor: "red",
    marginTop: "8%",
    marginBottom: "8%",
    borderRadius: 6,
    textDecorationLine: "none",
  },

  checkbox: {
    marginLeft: "10%",
    marginRight: "10%",
  },

  interestCtn: {
    flex: 1,
    justifyContent: "space-around",
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "10%",
    marginBottom: "10%",
  },

  interestOuterLayout: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  interestBox: {
    backgroundColor: "rgb(44,49,56)",
    borderRadius: 6,
    margin: 3,
  },

  interestText: {
    color: "white",
    fontFamily: "Raleway_400Regular",
    fontSize: 13,
    padding: 8,
  },

  nextButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "black",
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    marginTop: "4%",
    marginBottom: "4%",
    borderRadius: 6,
  },

  nextButtonHalf: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "black",
    marginLeft: "25%",
    marginRight: "25%",
    width: "50%",
    marginTop: "4%",
    marginBottom: "4%",
    borderRadius: 6,
  },

  nextButtonText: {
    color: "white",
    fontFamily: "Raleway_700Bold",
  },

  smText: {
    color: "white",
    fontFamily: "Raleway_300Light",
    fontSize: 14,
    textAlign: "center",
    flexWrap: "wrap",
    textDecorationLine: "none",
  },

  regText: {
    color: "white",
    fontFamily: "Raleway_400Regular",
    fontSize: 18,
    textAlign: "center",
    flexWrap: "wrap",
    textDecorationLine: "none",
  },

  medText: {
    color: "white",
    fontFamily: "Raleway_500Medium",
    fontSize: 22,
    textAlign: "center",
    flexWrap: "wrap",
    textDecorationLine: "none",
  },

  bigText: {
    color: "white",
    fontFamily: "Raleway_700Bold",
    fontSize: 26,
    textAlign: "center",
    flexWrap: "wrap",
    textDecorationLine: "none",
  },

  profileImagesCtn: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
    height: "65%",
    backgroundColor: "rgb(42, 48, 54)",
    borderRadius: 6,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 6,
    borderWidth: 4,
    borderColor: "#3EB489",
  },

  socialsCtn: {
    marginTop: "4%",
    marginBottom: "2%",
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%",
  },

  socialsIcon: {
    marginTop: "6%",
    marginBottom: "6%",
    width: 50,
    height: 50,
  },
});
