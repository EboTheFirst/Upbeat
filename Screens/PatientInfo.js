import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext } from "react";
import ImageCard from "../components/ImageCard";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { THEMES } from "../constants/themes";
import AppButton from "../components/AppButton";
import { routes } from "../constants/routes";

export default function PatientInfo({ navigation }) {
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
        <Feather
          name="arrow-left"
          onPress={() => {
            navigation.pop();
          }}
          size={25}
          color={mode[appTheme].theme1}
        />
        <AppText style={{ fontFamily: "DMSans_700Bold" }}>PATIENT INFO</AppText>
      </View>
      {/* TOP BAR END */}

      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: mode[appTheme].background,
        }}
      >
        {/* RECORDINGS BOX */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(routes.RECORDINGS_PATIENT, {
              filter: "patient ",
              value: "Kofi",
            });
          }}
          style={[styles.card, { padding: 1, marginTop: 20 }]}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.5)"]}
            style={[
              {
                borderRadius: 10,
                height: 200,
                width: 340,
                padding: 15,
                justifyContent: "space-between",
              },
            ]}
          >
            {/* HEAD */}
            <View style={[styles.row]}>
              <AppText
                style={[
                  styles.textMedium,
                  { fontSize: 12, color: mode[THEMES.DARK].text },
                ]}
              >
                {"Tap to View Recordings"}
              </AppText>
            </View>
            {/* BODY */}
            <View>
              <AppText
                style={[
                  styles.textMedium,
                  { fontSize: 20, color: mode[THEMES.DARK].text },
                ]}
              >
                {"Patient has 3 Recordings"}
              </AppText>
              <AppText
                style={[
                  styles.textMedium,
                  {
                    fontSize: 16,
                    color: mode[THEMES.DARK].text,
                    marginTop: 2,
                    fontFamily: "DMSans_400Regular",
                  },
                ]}
              >
                {"Murmurs found in 2 Recordings"}
              </AppText>
            </View>
            {/* FOOTER */}
            <View style={[styles.row, { justifyContent: "flex-end" }]}>
              <AppText
                style={[
                  styles.textMedium,
                  {
                    fontSize: 12,
                    color: mode[THEMES.DARK].text,
                  },
                ]}
              >
                {"Last Examination: May 16 2022"}
              </AppText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* AUDIO BOX END */}

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <View
            style={[
              styles.card,
              {
                paddingVertical: 0,
                marginTop: 10,
                flex: 1,
                justifyContent: "space-evenly",
              },
            ]}
          >
            <AppTextInput
              inputStyle={{ width: 260 }}
              iconName={"account-outline"}
              placeholder={"Patient's full name"}
            />
            <View style={[styles.row]}>
              <AppTextInput
                inputStyle={{ minWidth: 80 }}
                iconName={"clock-outline"}
                keyboardType={"numeric"}
                placeholder={"Age"}
              />
              <AppTextInput
                style={{ marginLeft: 25 }}
                inputStyle={{ minWidth: 130 }}
                iconName={"gender-male-female"}
                placeholder={"Gender"}
              />
            </View>
            <AppTextInput
              iconName={"contacts-outline"}
              keyboardType={"numeric"}
              placeholder={"Contact"}
            />
            <AppTextInput
              iconName={"home-outline"}
              inputStyle={{ width: 260 }}
              placeholder={"Residence"}
            />
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <AppButton>
                <MaterialCommunityIcons name="undo" size={20} /> Reset
              </AppButton>
              <AppButton>Update</AppButton>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}