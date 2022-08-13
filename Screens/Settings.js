import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "../styles";
import { Feather } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect } from "react";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { THEMES } from "../constants/themes";
import userStorage from "../appstorage/user";
import AppButton from "./../components/AppButton";
import { save } from "../appstorage/store";
import { routes } from "../constants/routes";

export default function Settings({ navigation }) {
  const { appTheme, setAppTheme } = useContext(AppContext);

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
        <Feather
          name="arrow-left"
          onPress={() => {
            navigation.pop();
          }}
          size={25}
          color={mode[appTheme].theme1}
        />
        <AppText style={{ fontFamily: "DMSans_700Bold" }}>SETTINGS</AppText>
      </View>
      {/* TOP BAR END */}

      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: mode[appTheme].background,
        }}
      >
        {/* THEME BOX */}
        <View style={[styles.card, { padding: 15, marginTop: 20, width: 320 }]}>
          <AppText
            style={[
              styles.textMedium,
              { fontSize: 12, color: mode[appTheme].text },
            ]}
          >
            {"THEME"}
          </AppText>
          <RadioButtonGroup
            containerStyle={{
              marginVertical: 5,
            }}
            selected={appTheme}
            onSelected={(value) => {
              setAppTheme(value);
              save("THEME", value);
            }}
            radioBackground={mode[appTheme].theme2}
          >
            <RadioButtonItem
              value={THEMES.LIGHT}
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  {THEMES.LIGHT}
                </AppText>
              }
            />
            <RadioButtonItem
              value={THEMES.DARK}
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  {THEMES.DARK}
                </AppText>
              }
            />
            <RadioButtonItem
              value={THEMES.SEA}
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  {THEMES.SEA}
                </AppText>
              }
            />
            <RadioButtonItem
              value={THEMES.GRAYSCALE}
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  {THEMES.GRAYSCALE}
                </AppText>
              }
            />
            <RadioButtonItem
              value={THEMES.PITCH_BLACK}
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  {THEMES.PITCH_BLACK}
                </AppText>
              }
            />
          </RadioButtonGroup>
        </View>
        {/* THEME BOX END */}

        <View style={[styles.card, { padding: 15, marginTop: 20, width: 320 }]}>
          <AppText
            style={[
              styles.textMedium,
              { fontSize: 12, color: mode[appTheme].text },
            ]}
          >
            {"NOTIFICATIONS"}
          </AppText>
        </View>
        <AppButton
          onPress={() => {
            userStorage.removeUser();
            navigation.reset({
              index: 0,
              routes: [{ name: routes.LOGIN }],
            });
          }}
        >
          Sign out
        </AppButton>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
