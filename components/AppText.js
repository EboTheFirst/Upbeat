import { Text } from "react-native";
import { styles } from "../styles";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import { mode } from "../constants/colors";
import { useContext } from "react";
import AppContext from "../contexts/appContext";

export default function AppText({
  children,
  style,
  numberOfLines,
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
    <Text
      style={[styles.text, { color: mode[appTheme].text }, style]}
      numberOfLines={numberOfLines}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
