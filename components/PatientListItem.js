import { ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PatientListItem({ patientInfo, onPress, alias, key }) {
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
          <AppText
            style={[
              { fontSize: 12, fontFamily: "DMSans_500Medium", marginBottom: 5 },
            ]}
          >
            NAME{"\n"}
            <AppText style={{ fontSize: 15 }}>{patientInfo.fullname}</AppText>
          </AppText>
          <AppText
            style={[
              { fontSize: 12, fontFamily: "DMSans_500Medium", marginBottom: 5 },
            ]}
          >
            RECORDINGS: 3
          </AppText>
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
            Last used
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
