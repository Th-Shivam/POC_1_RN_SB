import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (


        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Screen 🔐</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullname}
                onChangeText={setFullname}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {/* <Pressable
                style={styles.button}
                onPress={() => {
                    if (password !== confirmPassword) {
                        Alert.alert("Error", "Passwords do not match");
                        return;
                    }
                    console.log("Full Name:", fullname);
                    console.log("Email:", email);
                    console.log("Password:", password);
                    console.log("Confirm Password:", confirmPassword);
                }}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable> */}


            <CustomButton title="Sign Up" onPress={() => {
                if (password !== confirmPassword) {
                    Alert.alert("Error", "Passwords do not match");
                    return;
                }
                console.log("Full Name:", fullname);
                console.log("Email:", email);
                console.log("Password:", password);
                console.log("Confirm Password:", confirmPassword);
            }} />
            
            <View style={styles.signUpContainer}>
                <Text style={styles.textNormal}>Have an account? </Text>
                <Pressable onPress={() => router.push("/login")}>
                    <Text style={styles.signUpText}>Login now!</Text>
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
    input: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginTop: 15,
        fontSize: 16,
    },
    button: {
        marginTop: 30,
        width: "90%",
        alignItems: "center",
        backgroundColor: "#2563eb",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
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