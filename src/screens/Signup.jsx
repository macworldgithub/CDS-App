import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";
import { theme } from "../utils/theme";
import { storeUserData } from "../utils/storage";
import { API_BASE_URL } from "../utils/config";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !pin || !street || !city || !state || !zip) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }
    if (pin.length < 4) {
      Alert.alert("Invalid PIN", "PIN must be at least 4 digits.");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name,
        email,
        pin,
        street,
        city,
        state,
        zip,
        biometricEnrolled: true,
      };

      const response = await fetch(`${API_BASE_URL}auth/signup`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || `Signup failed (status ${response.status})`
        );
      }

      await storeUserData(data);

      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <LinearGradient
    colors={theme.gradients.splash}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={tw`flex-1`}
  >
    <KeyboardAwareScrollView
      contentContainerStyle={tw`flex-grow items-center justify-center px-6 py-8`}
      enableOnAndroid={true}
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          tw`bg-white rounded-2xl shadow-lg p-6 w-full`,
          { maxWidth: 320 },
        ]}
      >
        <Text style={tw`text-xl font-bold text-center mb-2`}>Sign Up</Text>
        <Text style={tw`text-gray-500 text-sm text-center mb-4`}>
          Create a new account to access Bele services
        </Text>

        {/* Inputs */}
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="Full Name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="Street Address"
          placeholderTextColor="#9CA3AF"
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="City"
          placeholderTextColor="#9CA3AF"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="State"
          placeholderTextColor="#9CA3AF"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="ZIP Code"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={zip}
          onChangeText={setZip}
        />
        <TextInput
          style={[
            tw`border border-gray-300 rounded-lg px-3 py-2 mb-3`,
            { color: "black" },
          ]}
          placeholder="Enter PIN (at least 4 digits)"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
        />

        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          style={[
            tw`py-3 rounded-lg mb-3 flex-row justify-center items-center`,
            { backgroundColor: theme.colors.primary },
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white text-center font-semibold`}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity
          style={[
            tw`border py-3 rounded-lg`,
            { borderColor: theme.colors.primary },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={[
              tw`text-center font-semibold`,
              { color: theme.colors.primary },
            ]}
          >
            Back to Login
          </Text>
        </TouchableOpacity>

        <Text style={tw`text-gray-400 text-xs text-center mt-4`}>
          Your data is securely stored and protected. Biometric enrollment is
          optional for PIN login.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  </LinearGradient>
);

};

export default SignUp;
