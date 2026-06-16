import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { authService } from "@/services/authService";
import { getSignUpValidationError } from "@/utils/validation";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = async () => {
        const validationError = getSignUpValidationError({
            name: fullname,
            email,
            password,
            confirmPassword,
        });

        if (validationError) {
            setErrorMessage(validationError);
            Alert.alert("Error", validationError);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await authService.signUp({
                name: fullname.trim(),
                email: email.trim().toLowerCase(),
                password,
            });

            if (!response.success) {
                throw new Error(response.message || "Signup failed");
            }

            setFullname("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            Alert.alert("Success", response.message, [
                {
                    text: "Continue",
                    onPress: () => router.replace("/login"),
                },
            ]);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to create your account. Please try again.";

            setErrorMessage(message);
            Alert.alert("Sign up failed", message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Screen 🔐</Text>

            <CustomInput
                placeholder="Enter your full name"
                value={fullname}
                onChangeText={setFullname}
                autoCapitalize="words"
                textContentType="name"
                editable={!isSubmitting}
            />

            <CustomInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                editable={!isSubmitting}
            />

            <CustomInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                editable={!isSubmitting}
            />

            <CustomInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                editable={!isSubmitting}
            />

            <CustomButton
                title="Sign Up"
                onPress={handleSignUp}
                loading={isSubmitting}
                disabled={isSubmitting}
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.LogInContainer}>
                <Text style={styles.textNormal}>Have an account? </Text>
                <Pressable disabled={isSubmitting} onPress={() => router.push("/login")}>
                    <Text style={styles.LogInText}>Login now!</Text>
                </Pressable>
            </View>

            <CustomButton
                title="Go Back"
                onPress={() => router.push("/")}
                disabled={isSubmitting}
            />
        </View>
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
    errorText: {
        width: "90%",
        marginTop: 12,
        color: "#dc2626",
        fontSize: 14,
        textAlign: "center",
    },
});