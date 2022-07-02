import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, View } from "react-native";
import { styles } from "../styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useState } from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import SearchBar from "../components/SearchBar";
import AppText from "../components/AppText";
import AppButton from "./../components/AppButton";
import AppModal from "../components/AppModal";
import AppTextInput from "../components/AppTextInput";
import { routes } from "../constants/routes";
import PatientListItem from "../components/PatientListItem";

export default function Patients({ navigation }) {
  const { appTheme } = useContext(AppContext);
  const [modalHidden, setModalHidden] = useState(true);
  const [patients, setPatients] = useState([
    {
      id: "nndj",
      name: "Ms. Pista Longrose",
      last_modified: "25th June, 2022. 17:43 GMT",
    },
    {
      id: "siddus",
      name: "Mr. Richie Lincoln",
      last_modified: "25th June, 2022. 9:43 GMT",
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: mode[appTheme].background,
      }}
    >
      {/* TOP BAR START */}
      <View
        style={[
          styles.card,
          styles.row,
          {
            backgroundColor: mode[appTheme].backgroundDarker,
            borderRadius: 0,
            height: 80,
            justifyContent: "space-between",
            alignItems: "flex-end",
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
      <View style={{ flex: 1 }}>
        <View style={[styles.row, { justifyContent: "center" }]}>
          <SearchBar placeholder="Search for a patient" />
        </View>

        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            maxHeight: "65%",
          }}
        >
          <FlatList
            data={patients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <PatientListItem
                  onPress={() => {
                    navigation.navigate(routes.PATIENT_INFO);
                  }}
                  deviceInfo={item}
                  // onPress={() =>
                  //   navigation.navigate(routes.MESSAGES, {
                  //     chatID: item._id,
                  //     tutor: item.tutor,
                  //   })
                  // }
                />
              );
            }}
            // refreshing={refreshing}
            // onRefresh={retrieveChats}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <AppButton
            onPress={() => {
              setModalHidden(false);
            }}
            style={{ marginTop: 35 }}
          >
            Add Patient
          </AppButton>
        </View>
      </View>
      <AppModal hidden={modalHidden}>
        <View style={[styles.row, { justifyContent: "flex-end" }]}>
          <FontAwesome
            onPress={() => {
              console.log("Pressed");
              setModalHidden(true);
            }}
            name="close"
            size={20}
            color={mode[appTheme].text}
          />
        </View>
        <AppTextInput
          inputStyle={{ width: 280 }}
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
            inputStyle={{ minWidth: 150 }}
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
          inputStyle={{ width: 280 }}
          placeholder={"Residence"}
        />
        <AppButton>Add</AppButton>
      </AppModal>
      <StatusBar style="auto" />
    </View>
  );
}
