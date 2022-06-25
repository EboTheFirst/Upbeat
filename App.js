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

const Stack = createStackNavigator();
export default function App() {
  const [appTheme, setAppTheme] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadTheme();
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
    <AppContext.Provider value={{ appTheme, setAppTheme }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
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
