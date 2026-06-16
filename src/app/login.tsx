import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { authService } from "@/services/authService";
import { saveAuthSession } from "@/services/authSession";
import { isEmpty, isValidEmail } from "@/utils/validation";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {

        if (isEmpty(email)) {
            const message = "Email is required";
            setErrorMessage(message);
            Alert.alert("Error", message);
            return;
        }

        if (isEmpty(password)) {
            const message = "Password is required";
            setErrorMessage(message);
            Alert.alert("Error", message);
            return;
        }

        if (!isValidEmail(email)) {
            const message = "Please enter a valid email";
            setErrorMessage(message);
            Alert.alert("Error", message);
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await authService.login({
                email: email.trim().toLowerCase(),
                password,
            });

            if (!response.success) {
                setErrorMessage(response.message);
                Alert.alert("Login failed", response.message);
                return;
            }

            if (
                response.userId === null ||
                response.name === null ||
                response.email === null ||
                !response.token
            ) {
                const message = "Login succeeded, but the server returned incomplete user data.";
                setErrorMessage(message);
                Alert.alert("Login failed", message);
                return;
            }

            await saveAuthSession({
                token: response.token,
                user: {
                    userId: response.userId,
                    name: response.name,
                    email: response.email,
                },
            });

            Alert.alert("Success", response.message, [
                {
                    text: "Continue",
                    onPress: () => router.replace("/profile" as never),
                },
            ]);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to login. Please try again.";

            setErrorMessage(message);
            Alert.alert("Login failed", message);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (


        <View style={styles.container}>
            <Text style={styles.title}>Login Screen 🔐</Text>

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
                textContentType="password"
                editable={!isSubmitting}
            />

            <CustomButton
                title="Login"
                onPress={handleLogin}
                loading={isSubmitting}
                disabled={isSubmitting}
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            <View style={styles.signUpContainer}>
                <Text style={styles.textNormal}>Don't have an account? </Text>
                <Pressable disabled={isSubmitting} onPress={() => router.push("/signup")}>
                    <Text style={styles.signUpText}>Sign up now!</Text>
                </Pressable>
            </View>

            <CustomButton title="Go Back" onPress={() => router.push("/")} disabled={isSubmitting} />
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
    errorText: {
        width: "90%",
        marginTop: 12,
        color: "#dc2626",
        fontSize: 14,
        textAlign: "center",
    },
});