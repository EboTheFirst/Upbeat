import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, ScrollView, View } from "react-native";
import { styles } from "../styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect, useState } from "react";
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
import { get } from "../api/patients.api";
import { update } from "../api/recordings.api";
import Loading from "../components/Loading";

export default function Recordings_Device({ navigation, route }) {
  const { appTheme } = useContext(AppContext);
  const [criteria, setCriteria] = useState("name");
  const [modalHidden, setModalHidden] = useState(true);
  const [recordings, setRecordings] = useState(route.params.recordings);
  const [selectedRec, setSelectedRec] = useState();
  const [patients, setPatients] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState();
  const [label, setLabel] = useState();
  const [loading, setLoading] = useState(false);

  const loadPatients = async () => {
    const { status, data } = await get();
    if (status == 200) {
      setPatients(data);
      setFilteredPatients(data);
    } else {
      alert("Error getting patients");
    }
  };

  const updateRec = async (recording) => {
    setLoading(true);
    const { status, data } = await update(recording);
    if (status == 200) {
      let recs = [...recordings];
      let index = recs.indexOf(selectedRec);

      if (~index) {
        recs[index] = data;
        setRecordings(recs);
      }
      setModalHidden(true);

      alert("Done");
    } else {
      alert("Error assigning recording to patient");
    }
    setLoading(false);
  };

  const searchHandler = (text) => {
    const filt = patients.filter((patient) => {
      return patient.fullname.toLowerCase().search(text.toLowerCase()) != -1;
    });

    setFilteredPatients(filt);
  };

  useEffect(() => {
    loadPatients();
  }, []);

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
          {/* <AppText style={[{ fontSize: 14 }]}>
            Showing recordings from {route.params.filter} {route.params.value}
          </AppText> */}
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
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 100,
                }}
              >
                <AppText style={{ fontSize: 15 }}>NO RECORDINGS</AppText>
              </View>
            )}
            renderItem={({ item }) => {
              return (
                <RecordingListItem
                  recordingsInfo={item}
                  onPress={() => {
                    setSelectedRec(item);
                    item.patient
                      ? navigation.navigate(routes.RESULTS_DETAILS)
                      : setModalHidden(false);
                  }}
                />
              );
            }}
            refreshing={refreshing}
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
        <View style={{ height: "70%", width: "60%" }}>
          <View style={[styles.row, { justifyContent: "center" }]}>
            <SearchBar
              onChangeText={searchHandler}
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
              data={filteredPatients}
              keyExtractor={(item) => item._id}
              refreshing={refreshing}
              renderItem={({ item }) => {
                return (
                  <MiniPatientListItem
                    onPress={() => {
                      label
                        ? Alert.alert(
                            "Confirmation",
                            `Label recording as '${label}', and assign to ${item.fullname}?`,
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Yes",
                                onPress: () => {
                                  let rec = selectedRec;
                                  rec.patient = item._id;
                                  rec.label = label.trim();
                                  updateRec(rec);
                                },
                              },
                            ]
                          )
                        : alert("Please enter a LABEL first");
                    }}
                    patientInfo={item}
                  />
                );
              }}
              // refreshing={refreshing}
              // onRefresh={retrieveChats}
            />
          </View>
          <View style={{ alignSelf: "center", marginTop: 20 }}>
            <AppText style={{ fontSize: 14, marginTop: 30 }}>LABEL</AppText>
            <AppTextInput
              value={label}
              onChangeText={(text) => setLabel(text)}
              placeholder={"Enter a label"}
            />
          </View>
        </View>
      </AppModal>
      <StatusBar style="auto" />
      {loading && <Loading />}
    </View>
  );
}
