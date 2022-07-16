import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "./AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import {
  AntDesign,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function RecordingListItem({ recordingsInfo, onPress, key }) {
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
        <MaterialCommunityIcons
          name="waveform"
          size={35}
          color={mode[appTheme].text}
        />

        {/* CONTENT */}
        <View style={{ flex: 1, paddingLeft: 40, paddingRight: 20 }}>
          {recordingsInfo.patient ? (
            <AppText
              style={[
                {
                  fontFamily: "DMSans_500Medium",
                  fontSize: 12,
                  marginBottom: 5,
                },
              ]}
            >
              LABEL{" \n"}
              <AppText style={{ fontSize: 15 }}>
                {recordingsInfo.label || "No Label"}
              </AppText>
            </AppText>
          ) : (
            <AppText
              style={[
                {
                  fontFamily: "DMSans_500Medium",
                  fontSize: 12,
                  marginBottom: 5,
                  color: mode[appTheme].danger,
                },
              ]}
            >
              UNASSIGNED{" "}
              <AntDesign
                name="warning"
                size={15}
                color={mode[appTheme].danger}
              />{" "}
              {" \n"}
              <AppText style={{ fontSize: 15 }}>Tap to assign</AppText>
            </AppText>
          )}
        </View>

        {/* DATE */}
        <View
          style={{ justifyContent: "space-evenly", alignSelf: "flex-start" }}
        >
          <AppText
            style={[
              styles.deviceListItemtext,
              { marginBottom: 5, fontSize: 12 },
            ]}
          >
            Received
          </AppText>
          <AppText
            style={[
              styles.deviceListItemtext,
              {
                marginBottom: 5,
                fontFamily: "DMSans_700Bold",
                textAlign: "right",
                fontSize: 12,
              },
            ]}
          >
            June 26
          </AppText>
          <AppText
            style={[
              styles.deviceListItemtext,
              { textAlign: "right", marginTop: 15 },
            ]}
          >
            3:45 PM
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
