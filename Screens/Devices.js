import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, View } from "react-native";
import { styles } from "../styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect, useState } from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import SearchBar from "../components/SearchBar";
import AppText from "../components/AppText";
import DeviceListItem from "../components/DeviceListItem";
import AppButton from "./../components/AppButton";
import AppModal from "../components/AppModal";
import FormTextInput from "../components/FormTextInput";
import { routes } from "../constants/routes";
import { addDevice } from "../api/users.api";
import Submit from "../components/Submit";
import * as Yup from "yup";
import { Formik } from "formik";
import userStorage from "../appstorage/user";
import Loading from "../components/Loading";
import jwtDecode from "jwt-decode";
import { getRecs } from "../api/recordings.api";

export default function Devices({ navigation }) {
  const { appTheme, user, setUser } = useContext(AppContext);
  const [criteria, setCriteria] = useState("id");
  const [modalHidden, setModalHidden] = useState(true);
  const [filteredDevices, setFilteredDevices] = useState();
  const [loading, setLoading] = useState(false);

  const [devices, setDevices] = useState();

  const getRecordings = async () => {
    const { status, data } = await getRecs(user.connectedDevices);
    if (status == 200) {
      // let devs = data.map((r) => r.device.deviceId);
      // let dev_ids = data.map((r) => r.device._id);
      // user.connectedDevices.forEach((device) => {

      // });
      // devs = [...new Set(devs)];
      // devs = artificialDeviceObjs(devs, data);
      // console.log(".......\n", devs);
      // setDevices(devs);
      let devs = [];
      user.connectedDevices.forEach((device) => {
        let recordings = data.filter((rec) => device._id == rec.device);
        let unassigned = recordings.filter((rec) => !rec.patient).length;
        devs.push({
          device,
          recordings,
          unassigned,
        });
        setDevices(devs);
      });
    } else {
      alert(`${status}: No recordings from connected devices`);
    }
  };
  useEffect(() => {
    getRecordings();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getRecordings();
    });

    return willFocusSubscription;
  }, [user]);

  const validationSchema = Yup.object().shape({
    deviceId: Yup.string().required().label("Device ID"),
  });

  const addHandler = async (formData) => {
    setLoading(true);
    for (const key in formData) {
      formData[key] = formData[key].trim();
    }
    const { status, data } = await addDevice(user._id, formData.deviceId);
    if (status == 200) {
      setUser(jwtDecode(data));
      userStorage.storeUser(data);
      alert("Device added");
    } else if (status == 404) {
      alert("Invalid device ID");
    } else {
      alert(status);
    }
    setModalHidden(true);
    console.log("End");
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

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
          <SearchBar placeholder="Search for device" />
        </View>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <AppText style={{ color: mode[appTheme].text, marginRight: 15 }}>
            Criteria :
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
              value="id"
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  id
                </AppText>
              }
            />
            <RadioButtonItem
              value="alias"
              label={
                <AppText style={{ fontSize: 18, color: mode[appTheme].text }}>
                  alias
                </AppText>
              }
            />
          </RadioButtonGroup>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            maxHeight: "65%",
          }}
        >
          <FlatList
            data={devices}
            keyExtractor={(item) => item.device.deviceId}
            renderItem={({ item }) => {
              return (
                <DeviceListItem
                  onPress={() => {
                    navigation.navigate(routes.RECORDINGS_DEVICE, {
                      recordings: item.recordings,
                    });
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
            Add a new device
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
        <Formik
          initialValues={{
            deviceId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={addHandler}
        >
          <View style={styles.row}>
            <FormTextInput name="deviceId" placeholder={"Enter device ID"} />
            <Submit style={{ width: 60, marginLeft: 5 }}>Add</Submit>
          </View>
        </Formik>
      </AppModal>

      <StatusBar style="auto" />
    </View>
  );
}
