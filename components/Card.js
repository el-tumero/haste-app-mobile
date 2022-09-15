import { Text, Button, SafeAreaView, TextInput, StyleSheet, View } from "react-native"

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
        width: "80%",
        height: "70%",
        backgroundColor: "rgb(235,235,235)",
        padding: 30,
    },

    cardTitle: {
        fontSize: 20,
        backgroundColor: "rgb(180,180,180)",
    },

    content: {
        fontSize: 14,
    },

})