import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";
import { THEMES } from "../constants/themes";
import mongoDate from "../simplifications/mongoDate";

export default function DeviceListItem({ deviceInfo, onPress, alias, key }) {
  const { appTheme } = useContext(AppContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.card,
          { backgroundColor: mode[appTheme].backgroundDarker },
          { padding: 20, paddingBottom: 10, marginTop: 3, borderRadius: 15 },
        ]}
      >
        <View style={[styles.row]}>
          {/* ICON */}
          <MaterialCommunityIcons
            name="devices"
            size={35}
            color={mode[appTheme].text}
          />

          {/* CONTENT */}
          <View style={{ flex: 1, paddingLeft: 40, paddingRight: 20 }}>
            <AppText
              style={[
                {
                  fontSize: 12,
                  fontFamily: "DMSans_500Medium",
                  marginBottom: 5,
                },
              ]}
            >
              ID{"\n"}
              <AppText style={{ fontSize: 15 }}>
                {deviceInfo.device.deviceId}
              </AppText>
            </AppText>

            <View
              style={[
                styles.row,
                { justifyContent: "flex-start", marginTop: 10 },
              ]}
            >
              {deviceInfo.unassigned ? (
                <>
                  <AppText style={{ fontSize: 12 }}>
                    {"unassigned recordings:  "}
                  </AppText>
                  <View
                    style={{
                      borderRadius: 20,
                      width: 25,
                      backgroundColor: mode[appTheme].danger,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AppText
                      style={{
                        fontSize: 12,
                        color: mode[THEMES.DARK].text,
                        fontFamily: "DMSans_700Bold",
                      }}
                    >
                      {deviceInfo.unassigned}
                    </AppText>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>

          {/* DATE */}
          <View
            style={{ justifyContent: "space-evenly", alignSelf: "flex-start" }}
          >
            {/* <AppText
              style={[
                styles.deviceListItemtext,
                { marginBottom: 5, fontSize: 11 },
              ]}
            >
              Last used
            </AppText> */}
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
              {mongoDate.getDate(deviceInfo.device.updatedAt)}
            </AppText>
            <AppText
              style={[
                styles.deviceListItemtext,
                { textAlign: "right", marginTop: 15, fontSize: 12 },
              ]}
            >
              {mongoDate.getTime(deviceInfo.device.updatedAt)}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
