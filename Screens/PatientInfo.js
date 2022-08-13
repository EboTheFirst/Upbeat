import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../components/AppText";
import FormTextInput from "../components/FormTextInput";
import { THEMES } from "../constants/themes";
import AppButton from "../components/AppButton";
import { routes } from "../constants/routes";
import * as Yup from "yup";
import { Formik } from "formik";
import { getByPatient } from "../api/recordings.api";
import AppModal from "../components/AppModal";
import SearchBar from "../components/SearchBar";
import MiniDeviceListItem from "../components/MiniDeviceListItem";
import * as devicesApi from "../api/devices.api";
import * as patientsApi from "../api/patients.api";
import Submit from "../components/Submit";
import Loading from "../components/Loading";
import AppTextInput from "../components/AppTextInput";

export default function PatientInfo({ navigation, route }) {
  const { appTheme, user } = useContext(AppContext);
  const [recordings, setRecordings] = useState();
  const [recNum, setRecNum] = useState();
  const [patient, setPatient] = useState(route.params.patient);
  const [murmurNum, setMurmurNum] = useState();
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState();
  const [modalHidden, setModalHidden] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState(user.connectedDevices);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required().label("Full name"),
    age: Yup.number().min(0).required().label("Age"),
    gender: Yup.string().required().label("Gender"),
    contact: Yup.number().required().label("Contact"),
    residence: Yup.string().required().label("Residence"),
  });

  const searchHandler = (text) => {
    const filt = user.connectedDevices.filter((device) => {
      return device.deviceId.toLowerCase().search(text.toLowerCase()) != -1;
    });

    setFilteredDevices(filt);
  };

  const updateDevice = async (device) => {
    setLoading(true);
    const { status, data } = await devicesApi.update(device);
    if (status == 200) {
      setModalHidden(true);
      setLabel("");
      alert(
        `Successful. Next recording from device ${device.deviceId} will be assigned to ${route.params.patient.fullname}`
      );
    } else {
      alert(`${status}: Error`);
    }
    setLoading(false);
  };

  const updateHandler = async (patient) => {
    setLoading(true);
    const { status, data } = await patientsApi.update({
      ...patient,
      _id: route.params.patient._id,
    });
    if (status == 200) {
      alert(`Updated`);
    } else {
      alert(`${status}: Error`);
    }
    setLoading(false);
  };

  const getRecs = async () => {
    setLoading(true);
    const { status, data } = await getByPatient(route.params.patient._id);
    if (status == 200) {
      console.log(data);
      setRecordings(data);
      setRecNum(data.length);
      let murNum = 0;
      data.forEach((rec) => {
        if (rec.info.prediction) {
          murNum++;
        }
      });
      setMurmurNum(murNum);
    } else {
      alert(`${status}: error`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRecs();
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
              value: route.params.patient.fullname,
              recordings: recordings,
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
                Patient has {recNum || "No"} Recording{recNum != 1 && "s"}
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
                Murmurs found in {murmurNum} Recording{murmurNum != 1 && "s"}
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
        <TouchableOpacity onPress={() => setModalHidden(false)}>
          <LinearGradient
            colors={[mode[appTheme].theme1, "rgba(0,0,0,0.5)"]}
            style={[
              {
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                justifyContent: "center",
              },
            ]}
          >
            <AppText
              style={{
                color: mode[THEMES.DARK].text,
                fontSize: 14,
                fontFamily: "DMSans_500Medium",
              }}
            >
              GET PATIENT RECORDING
            </AppText>
          </LinearGradient>
        </TouchableOpacity>
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
            <Formik
              initialValues={{
                fullname: patient.fullname,
                age: patient.age,
                gender: patient.gender,
                contact: patient.contact,
                residence: patient.residence,
              }}
              validationSchema={validationSchema}
              onSubmit={updateHandler}
            >
              {({ handleReset }) => (
                <>
                  <FormTextInput
                    inputStyle={{ width: 280 }}
                    iconName={"account-outline"}
                    placeholder={"Patient's full name"}
                    name="fullname"
                  />
                  <View style={[styles.row]}>
                    <FormTextInput
                      inputStyle={{ minWidth: 80 }}
                      iconName={"clock-outline"}
                      keyboardType={"numeric"}
                      placeholder={"Age"}
                      name="age"
                    />
                    <FormTextInput
                      style={{ marginLeft: 25 }}
                      inputStyle={{ minWidth: 150 }}
                      iconName={"gender-male-female"}
                      placeholder={"Gender"}
                      name="gender"
                    />
                  </View>
                  <FormTextInput
                    iconName={"contacts-outline"}
                    keyboardType={"numeric"}
                    placeholder={"Contact"}
                    name="contact"
                  />
                  <FormTextInput
                    iconName={"home-outline"}
                    inputStyle={{ width: 280 }}
                    placeholder={"Residence"}
                    name="residence"
                  />
                  <View
                    style={[styles.row, { justifyContent: "space-between" }]}
                  >
                    <AppButton onPress={handleReset}>
                      <MaterialCommunityIcons name="undo" size={20} /> Reset
                    </AppButton>
                    <Submit>Update</Submit>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
      <AppModal hidden={modalHidden}>
        <View style={[styles.row, { justifyContent: "flex-end" }]}>
          <TouchableOpacity
            onPress={() => {
              setModalHidden(true);
            }}
          >
            <FontAwesome name="close" size={20} color={mode[appTheme].text} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "60%" }}>
          <View style={[styles.row, { justifyContent: "center" }]}>
            <SearchBar
              onChangeText={searchHandler}
              style={{ marginHorizontal: 20 }}
              searchInputStyle={{ minWidth: 230 }}
              placeholder="Search for a device"
            />
          </View>
          <AppText style={{ fontSize: 12 }}>
            Select device to get next recording from
          </AppText>
          <View
            style={{
              marginTop: 10,
              maxHeight: "50%",
            }}
          >
            <FlatList
              data={filteredDevices}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <MiniDeviceListItem
                    onPress={() => {
                      label
                        ? Alert.alert(
                            "Confirmation",
                            `Assign next recording from device '${item.deviceId}' to ${route.params.patient.fullname}?`,
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Yes",
                                onPress: () => {
                                  let dev = { ...item };
                                  dev.nextRecordingPatient =
                                    route.params.patient._id;
                                  dev.nextRecordingLabel = label;
                                  dev.userExpoPushToken = user.expoPushToken;
                                  updateDevice(dev);
                                },
                              },
                            ]
                          )
                        : alert("Please enter a LABEL");
                    }}
                    deviceInfo={item}
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
