import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, ScrollView, View } from "react-native";
import { styles } from "../styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useState } from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import SearchBar from "../components/SearchBar";
import AppText from "../components/AppText";
import RecordingListItem from "../components/RecordingListItem";
import { routes } from "../constants/routes";
import AppModal from "../components/AppModal";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import PatientListItem from "../components/PatientListItem";
import MiniPatientListItem from "../components/MiniPatientListItem";

export default function Recordings_Device({ navigation, route }) {
  const { appTheme } = useContext(AppContext);
  const [criteria, setCriteria] = useState("name");
  const [modalHidden, setModalHidden] = useState(true);
  const [recordings, setRecordings] = useState([
    {
      id: "01-7204",
      label: "Ama-Aortic",
    },
    {
      id: "01XAD-12425",
      label: "Kofi-Mitral",
      patientId: "324",
    },
    {
      id: "01XAD-72304",
      label: "Ama-Aortic",
      patientId: "324",
    },
  ]);
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
    {
      id: "sidds",
      name: "Mr. Richie Lincoln",
      last_modified: "25th June, 2022. 9:43 GMT",
    },
    {
      id: "sdds",
      name: "Mr. Richie Lincoln",
      last_modified: "25th June, 2022. 9:43 GMT",
    },
    {
      id: "sis",
      name: "Mr. Richie Lincoln",
      last_modified: "25th June, 2022. 9:43 GMT",
    },
    {
      id: "siijdds",
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
          size={25}
          onPress={() => {
            navigation.pop();
          }}
          color={mode[appTheme].theme1}
        />
        <AppText style={{ fontFamily: "DMSans_700Bold" }}>RECORDINGS</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <View style={[styles.row, { justifyContent: "center" }]}>
          <SearchBar placeholder="Search by patient's name" />
        </View>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <AppText style={{ color: mode[appTheme].text, marginRight: 15 }}>
            Search By
          </AppText>
          <RadioButtonGroup
            containerStyle={{
              flexDirection: "row",
              marginVertical: 5,
            }}
            selected={criteria}
            onSelected={(value) => setCriteria(value)}
            radioBackground={mode[appTheme].theme2}
          >
            <RadioButtonItem
              value="name"
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  Name
                </AppText>
              }
            />
            <RadioButtonItem
              value="label"
              label={
                <AppText style={{ fontSize: 18, color: mode[appTheme].text }}>
                  Label
                </AppText>
              }
            />
          </RadioButtonGroup>
        </View>
        <View
          style={[
            styles.row,
            { justifyContent: "space-around", marginTop: 20 },
          ]}
        >
          <AppText style={[{ fontSize: 14 }]}>
            Showing recordings from {route.params.filter} {route.params.value}
          </AppText>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            maxHeight: "65%",
          }}
        >
          <FlatList
            data={recordings}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <RecordingListItem
                  recordingsInfo={item}
                  onPress={() => {
                    item.patientId
                      ? navigation.navigate(routes.RESULTS_DETAILS)
                      : setModalHidden(false);
                  }}
                />
              );
            }}
            // refreshing={refreshing}
            // onRefresh={retrieveChats}
          />
        </View>
      </View>
      <AppModal hidden={modalHidden}>
        <View style={[styles.row, { justifyContent: "flex-end" }]}>
          <FontAwesome
            onPress={() => {
              setModalHidden(true);
            }}
            name="close"
            size={20}
            color={mode[appTheme].text}
          />
        </View>
        <View style={{ height: "90%", width: "60%" }}>
          <View style={[styles.row, { justifyContent: "center" }]}>
            <SearchBar
              style={{ marginHorizontal: 20 }}
              searchInputStyle={{ minWidth: 230 }}
              placeholder="Search for a patient"
            />
          </View>

          <View
            style={{
              marginTop: 10,
              maxHeight: "55%",
            }}
          >
            <FlatList
              data={patients}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                console.log(item);
                return (
                  <MiniPatientListItem
                    onPress={() => {
                      Alert.alert(
                        "Confirmation",
                        `Assign recording to ${item.name}?`,
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Yes",
                            onPress: () => {
                              console.log("OK Pressed");
                            },
                          },
                        ]
                      );
                    }}
                    patientInfo={item}
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
            <AppTextInput placeholder={"Enter a label"} />
            <AppTextInput placeholder={"Select a patient"} />
            <AppButton>Assign</AppButton>
          </View>
        </View>
      </AppModal>
      <StatusBar style="auto" />
    </View>
  );
}
