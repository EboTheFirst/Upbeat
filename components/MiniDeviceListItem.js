import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MiniDeviceListItem({ deviceInfo, onPress, key }) {
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

        {/* CONTENT */}
        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 20 }}>
          <AppText style={[{ fontSize: 15, marginBottom: 5 }]}>
            {deviceInfo.deviceId}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
