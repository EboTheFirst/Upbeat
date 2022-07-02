import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "../styles";
import { Feather } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import ImageCard from "../components/ImageCard";
import { routes } from "../constants/routes";
import AppText from "../components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import { THEMES } from "../constants/themes";

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
        <View
          style={{
            borderLeftWidth: 3,
            marginHorizontal: 10,
            borderColor: "red",
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.5)"]}
            style={[
              {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                width: 320,
                padding: 15,
                justifyContent: "space-between",
              },
            ]}
          >
            <AppText
              style={{
                fontSize: 14,
                paddingHorizontal: 15,
                color: mode[THEMES.DARK].text,
              }}
            >
              You have some unassigned recordings.{" "}
              {"\nAssign them at 'Devices'"}
            </AppText>
          </LinearGradient>
        </View>
        <ImageCard
          onPress={() => navigation.navigate(routes.DEVICES)}
          source={require("../assets/steth.jpg")}
          headerText="DEVICES"
        />
        <ImageCard
          source={require("../assets/cd.jpg")}
          headerText="UPLOAD HEART SOUND"
        />
        <ImageCard
          onPress={() => navigation.navigate(routes.PATIENTS)}
          source={require("../assets/ward.jpg")}
          headerText="PATIENTS"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
