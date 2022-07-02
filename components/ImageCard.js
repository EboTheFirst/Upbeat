import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { THEMES } from "../constants/themes";

export default function ImageCard({ source, onPress, headerText }) {
  const { appTheme } = useContext(AppContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { padding: 1, marginTop: 5 }]}
    >
      <ImageBackground
        source={source}
        resizeMode="cover"
        imageStyle={{ borderRadius: 10 }}
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.8)",
            "rgba(0,0,0,0.5)",
            "transparent",
            "transparent",
          ]}
          style={[{ borderRadius: 10, height: 180, width: 320, padding: 15 }]}
        >
          <AppText
            style={[
              styles.textMedium,
              { fontSize: 20, color: mode[THEMES.DARK].text },
            ]}
          >
            {headerText}
          </AppText>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
