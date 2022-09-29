import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import mongoDate from "../simplifications/mongoDate";

export default function PatientListItem({ patientInfo, onPress, alias, key }) {
  const { appTheme } = useContext(AppContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.card,
          styles.row,
          { backgroundColor: mode[appTheme].backgroundDarker },
          { padding: 20, marginTop: 3, borderRadius: 15 },
        ]}
      >
        {/* ICON */}

        {/* CONTENT */}
        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 20 }}>
          <AppText
            style={[
              { fontSize: 11, fontFamily: "DMSans_500Medium", marginBottom: 5 },
            ]}
          >
            NAME{"\n"}
            <AppText numberOfLines={1} style={{ fontSize: 15 }}>
              {patientInfo.fullname}
            </AppText>
          </AppText>
        </View>

        {/* DATE */}
        <View
          style={{ justifyContent: "space-evenly", alignSelf: "flex-start" }}
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
            {mongoDate.getDate(patientInfo.updatedAt)}
          </AppText>
          <AppText
            style={[
              styles.deviceListItemtext,
              { textAlign: "right", fontSize: 12 },
            ]}
          >
            {mongoDate.getTime(patientInfo.updatedAt)}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
