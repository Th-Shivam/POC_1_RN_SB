import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (


        <View style={styles.container}>
            <Text style={styles.title}>Login Screen 🔐</Text>

            <CustomInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />

            <CustomInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <CustomButton title="Login" onPress={() => {
                if (!email || !password) {
                    Alert.alert("Error", "Please fill all fields");
                    return;
                }
                console.log("Email:", email);
                console.log("Password:", password);
            }} />

            <View style={styles.signUpContainer}>
                <Text style={styles.textNormal}>Don't have an account? </Text>
                <Pressable onPress={() => router.push("/signup")}>
                    <Text style={styles.signUpText}>Sign up now!</Text>
                </Pressable>
            </View>

            <CustomButton title="Go Back" onPress={() => router.push("/")} />
        </View >


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    signUpContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },
    textNormal: {
        fontSize: 16,
        color: "#333",
    },
    signUpText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },
});