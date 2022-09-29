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
import mongoDate from "../simplifications/mongoDate";

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
          size={30}
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
                },
              ]}
            >
              LABEL
              {/* {"\n"} */}
              {/* <View
                style={{
                  backgroundColor: mode[appTheme].theme1,
                  width: 40,
                  height: 1,
                }}
              /> */}
              {"\n"}
              <AppText numberOfLines={1} style={{ fontSize: 15 }}>
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
          style={{ justifyContent: "space-between", alignSelf: "flex-start" }}
        >
          <AppText
            style={[
              styles.deviceListItemtext,
              {
                marginBottom: 5,
                fontFamily: "DMSans_700Bold",
                textAlign: "right",
                fontSize: 11,
              },
            ]}
          >
            {mongoDate.getDate(recordingsInfo.createdAt)}
          </AppText>
          <AppText
            style={[
              styles.deviceListItemtext,
              { textAlign: "right", fontSize: 12, marginTop: 15 },
            ]}
          >
            {mongoDate.getTime(recordingsInfo.createdAt)}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
