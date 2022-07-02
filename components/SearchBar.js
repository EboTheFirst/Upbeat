import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "../styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function SearchBar({
  placeholder,
  onChangeText,
  searchInputStyle,
  style,
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
    <View
      style={[
        styles.card,
        styles.search,
        styles.row,
        { padding: 0, paddingLeft: 20 },
        style,
      ]}
    >
      <FontAwesome name="search" size={20} color={mode[appTheme].theme1} />
      <TextInput
        style={[
          styles.searchInput,
          { color: mode[appTheme].text },
          searchInputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={mode[appTheme].text}
        onChangeText={onChangeText}
        {...otherProps}
      />
    </View>
  );
}
