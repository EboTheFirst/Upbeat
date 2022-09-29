import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useCallback, useEffect, useState } from "react";
import { save, load } from "./appstorage/store";
import { THEMES } from "./constants/themes";
import AppContext from "./contexts/appContext";
import * as SplashScreen from "expo-splash-screen";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Devices from "./Screens/Devices";
import { routes } from "./constants/routes";
import ResultsDetails from "./Screens/ResultsDetails";
import Settings from "./Screens/Settings";
import Patients from "./Screens/Patients";
import PatientInfo from "./Screens/PatientInfo";
import Recordings_Patient from "./Screens/Recordings_Patient";
import Recordings_Device from "./Screens/Recordings_Device";
import jwtDecode from "jwt-decode";
import userStorage from "./appstorage/user";
import { LogBox } from "react-native";
import Upload from "./Screens/Upload";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);

const Stack = createStackNavigator();
export default function App() {
  const [appTheme, setAppTheme] = useState();
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadTheme();
        await loadUser();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const loadUser = async () => {
    const userToken = await userStorage.getUser();
    if (userToken) {
      setUser(jwtDecode(userToken));
    }
  };

  const setUserIndirectly = (token) => {
    setUser(jwtDecode(token));
  };

  const loadTheme = async () => {
    let theme = THEMES.LIGHT;
    let saved_theme = await load("THEME");
    if (saved_theme) {
      theme = saved_theme;
    } else {
      await save("THEME", theme);
    }
    setAppTheme(theme);
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <AppContext.Provider value={{ appTheme, setAppTheme, user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={user ? routes.HOME : routes.REGISTER}
        >
          <Stack.Screen name={routes.REGISTER} component={Register} />
          <Stack.Screen name={routes.LOGIN} component={Login} />
          <Stack.Screen name={routes.HOME} component={Home} />
          <Stack.Screen name={routes.PATIENTS} component={Patients} />
          <Stack.Screen name={routes.PATIENT_INFO} component={PatientInfo} />
          <Stack.Screen name={routes.DEVICES} component={Devices} />
          <Stack.Screen name={routes.UPLOAD} component={Upload} />
          <Stack.Screen
            name={routes.RECORDINGS_PATIENT}
            component={Recordings_Patient}
          />
          <Stack.Screen
            name={routes.RECORDINGS_DEVICE}
            component={Recordings_Device}
          />
          <Stack.Screen
            name={routes.RESULTS_DETAILS}
            component={ResultsDetails}
          />
          <Stack.Screen name={routes.SETTINGS} component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderColor: "#F324",
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
