import CustomButton from "@/components/ui/CustomButton";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
	const { user } = useAuth();

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>Profile</Text>
				<Text style={styles.label}>Name</Text>
				<Text style={styles.value}>{user?.name ?? "Unknown user"}</Text>
				<Text style={styles.label}>Email</Text>
				<Text style={styles.value}>{user?.email ?? "Unknown email"}</Text>
			</View>

			<CustomButton title="Go Back Home" onPress={() => router.replace("/")} />
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
	card: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#e5e7eb",
		borderRadius: 16,
		padding: 20,
		backgroundColor: "#f9fafb",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#6b7280",
		marginTop: 10,
	},
	value: {
		fontSize: 18,
		fontWeight: "600",
		color: "#111827",
		marginTop: 4,
	},
});