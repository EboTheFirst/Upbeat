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
import DeviceListItem from "../components/DeviceListItem";
import AppButton from "./../components/AppButton";
import AppModal from "../components/AppModal";
import AppTextInput from "../components/AppTextInput";

export default function Devices() {
  const { appTheme } = useContext(AppContext);
  const [criteria, setCriteria] = useState("id");
  const [modalHidden, setModalHidden] = useState(true);
  const [devices, setDevices] = useState([
    {
      id: "01XAD-12425",
      last_used: "25th June, 2022. 17:43 GMT",
      alias: "Ward-15",
    },
    {
      id: "01XAD-72304",
      last_used: "25th June, 2022. 9:43 GMT",
      alias: "Ward-72",
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
        <Feather name="settings" size={25} color={mode[appTheme].theme1} />
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
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <DeviceListItem
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
        <AppTextInput placeholder={"Enter device ID"} />
        <AppTextInput placeholder={"Enter an alias"} />
        <AppButton>Add</AppButton>
      </AppModal>
      <StatusBar style="auto" />
    </View>
  );
}
