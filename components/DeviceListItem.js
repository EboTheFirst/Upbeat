import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DeviceListItem({ deviceInfo, alias, key }) {
  const { appTheme } = useContext(AppContext);

  return (
    <TouchableOpacity>
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
          name="devices"
          size={35}
          color={mode[appTheme].text}
        />

        {/* CONTENT */}
        <View style={{ flex: 1, paddingLeft: 40, paddingRight: 20 }}>
          <AppText style={[{ fontSize: 15, marginBottom: 5 }]}>
            ID:{"  "}
            <AppText style={{ fontFamily: "DMSans_500Medium" }}>
              {deviceInfo.id}
            </AppText>
          </AppText>
          <AppText style={[{ fontSize: 15, marginBottom: 5 }]}>
            Alias:{"  "}
            <AppText style={{ fontFamily: "DMSans_500Medium", fontSize: 16 }}>
              {deviceInfo.alias || "--"}
            </AppText>
          </AppText>
        </View>

        {/* DATE */}
        <View style={{ justifyContent: "space-evenly" }}>
          <AppText style={[styles.deviceListItemtext, { marginBottom: 5 }]}>
            Last used
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
