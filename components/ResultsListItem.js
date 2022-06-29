import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { Foundation } from "@expo/vector-icons";

export default function ResultsListItem({ resultsInfo, onPress, key }) {
  const { appTheme } = useContext(AppContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.card,
          styles.row,
          { backgroundColor: mode[appTheme].backgroundDarker },
          { padding: 20, marginTop: 3 },
        ]}
      >
        {/* ICON */}
        <Foundation
          name="results-demographics"
          size={35}
          color={mode[appTheme].text}
        />

        {/* CONTENT */}
        <View style={{ flex: 1, paddingLeft: 40, paddingRight: 20 }}>
          <AppText style={[{ fontSize: 15, marginBottom: 5 }]}>
            Label:{"  "}
            <AppText style={{ fontFamily: "DMSans_500Medium", fontSize: 15 }}>
              {resultsInfo.label}
            </AppText>
          </AppText>
        </View>

        {/* DATE */}
        <View style={{ justifyContent: "space-evenly" }}>
          <AppText style={[styles.deviceListItemtext, { marginBottom: 5 }]}>
            Received
          </AppText>
          <AppText
            style={[
              styles.deviceListItemtext,
              { marginBottom: 5, fontFamily: "DMSans_700Bold" },
            ]}
          >
            June 26
          </AppText>
          <AppText style={[styles.deviceListItemtext]}>3:45 PM</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
