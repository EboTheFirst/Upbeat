import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "../styles";
import { Feather } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import ImageCard from "../components/ImageCard";
import { routes } from "../constants/routes";

export default function Home({ navigation }) {
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
        <Feather name="bell" size={25} color={mode[appTheme].theme1} />
        <Feather
          name="settings"
          onPress={() => navigation.navigate(routes.SETTINGS)}
          size={25}
          color={mode[appTheme].theme1}
        />
      </View>
      {/* TOP BAR END */}

      <View
        style={{
          height: "100%",
          alignItems: "center",
          backgroundColor: mode[appTheme].background,
        }}
      >
        <ImageCard
          onPress={() => navigation.navigate(routes.DEVICES)}
          source={require("../assets/devices-open.jpg")}
          headerText="DEVICES"
        />
        <ImageCard
          source={require("../assets/cd.jpg")}
          headerText="UPLOAD HEART SOUND"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
