import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";

export default function Register() {
  const { appTheme } = useContext(AppContext);

  return (
    <View
      style={[styles.container, { backgroundColor: mode[appTheme].background }]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: mode[appTheme].backgroundDarker },
        ]}
      >
        <MaterialCommunityIcons
          name="heart-pulse"
          size={40}
          color={mode[appTheme].theme2}
        />

        <View
          style={[styles.row, { marginBottom: 40, justifyContent: "center" }]}
        >
          <AppText style={[styles.header, { color: mode[appTheme].theme1 }]}>
            SIGN-UP
          </AppText>
        </View>
        <AppTextInput iconName="account" placeholder="first name" />
        <AppTextInput iconName="account" placeholder="last name" />
        <AppTextInput
          iconName="email"
          keyboardType="email-address"
          placeholder="email address"
        />
        <AppTextInput
          iconName="lock"
          secureTextEntry={true}
          placeholder="password"
        />

        <AppTextInput
          iconName="lock"
          secureTextEntry={true}
          placeholder="confirm password"
        />
        <AppButton>Submit</AppButton>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
