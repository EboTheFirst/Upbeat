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
import ResultsListItem from "../components/ResultsListItem";
import { routes } from "../constants/routes";

export default function Results({ navigation, route }) {
  const { appTheme } = useContext(AppContext);
  const [criteria, setCriteria] = useState("newest");
  const [results, setReults] = useState([
    {
      id: "01XAD-12425",
      last_used: "25th June, 2022. 17:43 GMT",
      alias: "Ward-15",
      label: "Kofi mitral",
    },
    {
      id: "01XAD-72304",
      last_used: "25th June, 2022. 9:43 GMT",
      alias: "Ward-72",
      label: "Ama, aortic",
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
        <AppText style={{ fontFamily: "DMSans_700Bold" }}>RESULTS</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <View style={[styles.row, { justifyContent: "center" }]}>
          <SearchBar placeholder="Search results by label" />
        </View>
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <AppText style={{ color: mode[appTheme].text, marginRight: 15 }}>
            Sort By :
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
              value="newest"
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                    marginRight: 15,
                  }}
                >
                  newest
                </AppText>
              }
            />
            <RadioButtonItem
              value="oldest"
              label={
                <AppText
                  style={{
                    fontSize: 18,
                    color: mode[appTheme].text,
                  }}
                >
                  oldest
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
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <ResultsListItem
                  resultsInfo={item}
                  onPress={() => {
                    navigation.navigate(routes.RESULTS_DETAILS);
                  }}
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
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
