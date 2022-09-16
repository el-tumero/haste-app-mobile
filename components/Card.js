import { Text, Button, SafeAreaView, TextInput, StyleSheet, View } from "react-native"
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens"
import { useFonts,
Raleway_300Light,
Raleway_400Regular,
Raleway_500Medium,
Raleway_600SemiBold,
Raleway_700Bold, } from '@expo-google-fonts/raleway';



export default function Card(props){
    
    return(
                <View style={styles.card}>
                    <Text
                    style={styles.cardTitle}>
                    {props.title}
                    </Text>

                    {props.children}

                    <View style={styles.content}>
                        
                    </View>
                </View>
    )
}

const styles = StyleSheet.create({
   
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(24,29,34)",
        paddingTop: 60,
        paddingBottom: 60,
        padding: 20,
        textAlign: "center",
    },

    cardTitle: {
        fontSize: 20,
        backgroundColor: "rgb(180,180,180)",
        textAlign: "center",
        color: "white"
    },

    content: {
        fontSize: 14,
        textAlign: "center",
    },

})