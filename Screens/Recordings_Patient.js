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
import RecordingListItem from "../components/RecordingListItem";
import { routes } from "../constants/routes";

export default function Recordings_Patient({ navigation, route }) {
  const { appTheme } = useContext(AppContext);
  const [criteria, setCriteria] = useState("label");
  const [filteredRecordings, setFilteredRecordings] = useState(
    route.params.recordings
  );

  const searchHandler = (text) => {
    const filt = route.params.recordings.filter((rec) => {
      return rec.label.toLowerCase().search(text.toLowerCase()) != -1;
    });

    setFilteredRecordings(filt);
  };

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
          <SearchBar
            placeholder="Search by label"
            onChangeText={searchHandler}
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
            selected={criteria}
            onSelected={(value) => setCriteria(value)}
            radioBackground={mode[appTheme].theme2}
          >
            <RadioButtonItem
              value="label"
              label={
                <AppText style={{ fontSize: 18, color: mode[appTheme].text }}>
                  label
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
            data={filteredRecordings}
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
                    navigation.navigate(routes.RESULTS_DETAILS, {
                      recording: item,
                    });
                  }}
                />
              );
            }}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
