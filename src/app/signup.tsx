import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (


        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Screen 🔐</Text>

            <CustomInput
                placeholder="Enter your full name"
                value={fullname}
                onChangeText={setFullname}
            />

 

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
            <CustomInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />


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
            
            <View style={styles.LogInContainer}>
                <Text style={styles.textNormal}>Have an account? </Text>
                <Pressable onPress={() => router.push("/login")}>
                    <Text style={styles.LogInText}>Login now!</Text>
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

    LogInContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },
    textNormal: {
        fontSize: 16,
        color: "#333",
    },
    LogInText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb",
    },
});