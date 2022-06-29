import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "../styles";
import { Feather } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import ImageCard from "../components/ImageCard";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { THEMES } from "../constants/themes";

export default function ResultsDetails({ navigation }) {
  const { appTheme } = useContext(AppContext);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {/* TOP BAR START */}
      <View
        style={[
          styles.card,
          styles.row,
          {
            borderRadius: 0,
            height: 80,
            justifyContent: "space-between",
            alignItems: "flex-end",
            backgroundColor: mode[appTheme].backgroundDarker,
          },
        ]}
      >
        <Feather
          name="arrow-left"
          onPress={() => {
            navigation.pop();
          }}
          size={25}
          color={mode[appTheme].theme1}
        />
        <AppText style={{ fontFamily: "DMSans_700Bold" }}>
          RESULT DETAILS
        </AppText>
      </View>
      {/* TOP BAR END */}

      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: mode[appTheme].background,
        }}
      >
        {/* AUDIO BOX */}
        <View style={[styles.card, { padding: 1, marginTop: 20 }]}>
          <LinearGradient
            colors={[
              "rgba(0,0,0,0.8)",
              "rgba(0,0,0,0.5)",
              "transparent",
              "transparent",
            ]}
            style={[{ borderRadius: 10, height: 200, width: 320, padding: 15 }]}
          >
            <AppText
              style={[
                styles.textMedium,
                { fontSize: 20, color: mode[THEMES.DARK].text },
              ]}
            >
              {"AUDIO WAVEFORM AND PLAYBACK"}
            </AppText>
          </LinearGradient>
        </View>
        {/* AUDIO BOX END */}

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <View
            style={[
              styles.card,
              {
                paddingHorizontal: 10,
                paddingVertical: 0,
                marginTop: 10,
                alignSelf: "flex-start",
              },
            ]}
          >
            <AppTextInput
              style={{ height: 60 }}
              iconName={"clipboard-edit-outline"}
              placeholder="Edit Label"
            />
          </View>
          <View
            style={[
              styles.card,
              {
                paddingVertical: 0,
                marginTop: 10,
                flex: 1,
                justifyContent: "space-evenly",
              },
            ]}
          >
            <View>
              <AppText>RESULTS</AppText>
              <View
                style={{
                  backgroundColor: mode[appTheme].theme1,
                  height: 2,
                  width: "100%",
                }}
              />
            </View>
            <AppText>Prediction:</AppText>
            <AppText>Certainty:</AppText>
            <AppText>Auscultation Location:</AppText>
            <AppText>Date Received:</AppText>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
