import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { mode } from "../constants/colors";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

export default function AppTextInput({
  style,
  inputStyle,
  value,
  secureTextEntry,
  placeholder,
  keyboardType,
  onChangeText,
  iconName,
  ...otherProps
}) {
  const { appTheme } = useContext(AppContext);
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={[styles.row, style]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={mode[appTheme].text}
        />
      )}
      <TextInput
        style={[
          styles.field,
          { color: mode[appTheme].text, borderColor: mode[appTheme].theme1 },
          inputStyle,
        ]}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={mode[appTheme].text}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...otherProps}
      />
    </View>
  );
}
