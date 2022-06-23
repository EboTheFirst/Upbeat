import { ImageBackground, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ImageCard({ source, headerText }) {
  const { appTheme } = useContext(AppContext);

  return (
    <View style={[styles.card, { padding: 1, marginTop: 20 }]}>
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
          style={[{ borderRadius: 10, height: 280, width: 320, padding: 15 }]}
        >
          <AppText
            style={[
              styles.textMedium,
              { fontSize: 20, color: mode["dark"].text },
            ]}
          >
            {headerText}
          </AppText>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
