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
import AppButton from "./../components/AppButton";
import AppModal from "../components/AppModal";
import FormTextInput from "../components/FormTextInput";
import { routes } from "../constants/routes";
import * as Yup from "yup";
import PatientListItem from "../components/PatientListItem";
import { create, get, update } from "../api/patients.api";
import Loading from "../components/Loading";
import Submit from "../components/Submit";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { THEMES } from "../constants/themes";

export default function Patients({ navigation }) {
  const { appTheme } = useContext(AppContext);
  const [modalHidden, setModalHidden] = useState(true);
  const [patients, setPatients] = useState();
  const [filteredPatients, setFilteredPatients] = useState();
  const [filter, setFilter] = useState("name");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [gender, setGender] = useState("Male");

  const loadPatients = async () => {
    setLoading(true);
    const { status, data } = await get();
    if (status == 200) {
      setPatients(data);
      setFilteredPatients(data);
    } else {
      alert("Error getting patients");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPatients();
    const willFocusSubscription = navigation.addListener("focus", () => {
      loadPatients();
    });
    return willFocusSubscription;
  }, []);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required().label("Full name"),
    age: Yup.number().min(0).required().label("Age"),
    contact: Yup.number().required().label("Contact"),
    residence: Yup.string().required().label("Residence"),
  });

  const submitHandler = async (formData) => {
    console.log("PRESSSED");
    setLoading(true);
    for (const key in formData) {
      formData[key] = formData[key].trim();
    }
    const { status, data } = await create({ ...formData, gender: gender });
    if (status == 200) {
      alert("Patient added");
      const newPatients = [...patients, data];
      setPatients(newPatients);
      setFilteredPatients(newPatients);
      setModalHidden(true);
    } else if (status == 401) {
      alert("Error adding patient");
    }
    setLoading(false);
  };

  const searchHandler = (text) => {
    const filt = patients.filter((patient) => {
      return patient.fullname.toLowerCase().search(text.toLowerCase()) != -1;
    });

    setFilteredPatients(filt);
  };

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
          <SearchBar
            // value={searchText}
            onChangeText={searchHandler}
            placeholder="Search for a patient"
          />
        </View>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <AppText style={{ color: mode[appTheme].text, marginRight: 15 }}>
            Filter
          </AppText>
          <RadioButtonGroup
            containerStyle={{
              flexDirection: "row",
              marginVertical: 5,
            }}
            selected={filter}
            onSelected={(value) => setFilter(value)}
            radioBackground={mode[appTheme].theme2}
          >
            <RadioButtonItem
              value="name"
              label={
                <AppText style={{ fontSize: 18, color: mode[appTheme].text }}>
                  name
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
            data={filteredPatients}
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
                <AppText style={{ fontSize: 15 }}>NO PATIENTS</AppText>
              </View>
            )}
            renderItem={({ item }) => {
              return (
                <PatientListItem
                  onPress={() => {
                    navigation.navigate(routes.PATIENT_INFO, { patient: item });
                  }}
                  patientInfo={item}
                />
              );
            }}
            refreshing={refreshing}
            onRefresh={loadPatients}
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
              setModalHidden(true);
            }}
            name="close"
            size={20}
            color={mode[appTheme].text}
          />
        </View>
        <Formik
          initialValues={{
            fullname: "",
            age: "",
            contact: "",
            residence: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
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
              <Picker
                style={{
                  backgroundColor: mode[appTheme].theme1,
                  color: mode[THEMES.DARK].text,
                  marginLeft: 25,
                  width: 150,
                  height: 20,
                }}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
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
            <Submit>Add</Submit>
          </>
        </Formik>
      </AppModal>
      <StatusBar style="auto" />
      {loading && <Loading />}
    </View>
  );
}
