import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { styles } from "../styles";
import { Feather } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect } from "react";
import ImageCard from "../components/ImageCard";
import { routes } from "../constants/routes";
import AppText from "../components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import { THEMES } from "../constants/themes";
import { update } from "../api/users.api";
import * as Notifications from "expo-notifications";
import jwtDecode from "jwt-decode";
import userStorage from "../appstorage/user";

export default function Home({ navigation }) {
  const { user, setUser, appTheme } = useContext(AppContext);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    let u = { ...user };
    u.expoPushToken = token;
    const { data, status } = await update(u);
    if (status == 200) {
      setUser(jwtDecode(data));
      userStorage.storeUser(data);
    } else {
      alert("Please grant notification permissions");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: mode[appTheme].theme2,
      });
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
