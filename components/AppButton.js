import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { LinearGradient } from "expo-linear-gradient";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { mode } from "../constants/colors";
import AppText from "./AppText";

export default function AppButton({
  onPress,
  title,
  children,
  style,
  ...otherProps
}) {
  const { appTheme } = useContext(AppContext);
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[mode[appTheme].theme1, mode[appTheme].theme2]}
        style={[styles.row, styles.button, { justifyContent: "center" }, style]}
      >
        <AppText style={[styles.text, { fontSize: 18, color: mode.dark.text }]}>
          {title || children}
        </AppText>
      </LinearGradient>
    </TouchableOpacity>
  );
}
