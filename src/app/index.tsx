import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to POC SpringBoot </Text>
      <Text style={styles.subtitle}>
        Building with React Native + Spring Boot
      </Text>
      <Text style={styles.logo}>🚀</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  logo:{
     fontSize: 60,
     marginBottom: 20,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
  },
  button: {
  marginTop: 30,
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
});