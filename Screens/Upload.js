import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { styles } from "../styles";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AppText from "../components/AppText";
import AppButton from "./../components/AppButton";
import AppModal from "../components/AppModal";
import { routes } from "../constants/routes";
import { addDevice } from "../api/users.api";
import * as Yup from "yup";
import userStorage from "../appstorage/user";
import Loading from "../components/Loading";
import jwtDecode from "jwt-decode";
import { getRecs, uploadRecording } from "../api/recordings.api";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { THEMES } from "../constants/themes";
import MiniPatientListItem from "../components/MiniPatientListItem";
import { get } from "../api/patients.api";
import AppTextInput from "../components/AppTextInput";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import getPrediction from "../api/getPrediction";

export default function Upload({ navigation, route }) {
  const { appTheme, user, setUser } = useContext(AppContext);
  const [sound, setSound] = useState();
  const [modalHidden, setModalHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [graphData, setGraphData] = useState([0]);
  const [graphLabels, setGraphLabels] = useState([0]);

  const [patients, setPatients] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState();
  const [label, setLabel] = useState();

  const loadPatients = async () => {
    const { status, data } = await get();
    if (status == 200) {
      setPatients(data);
      setFilteredPatients(data);
    } else {
      alert("Error getting patients");
    }
  };

  const getPred = async (uri) => {
    setLoading(true);
    const { status, data } = await getPrediction(uri);
    if (status == 200) {
      alert(`Prediction received: ${data.alt_prediction}\n
      certainty: ${data.certainty.toFixed(2)}`);
      // setGraphData(data.audio_array);
      // setGraphLabels([...Array(data.audio_array).keys()]);
    } else {
      alert(`${status}:Error getting prediction`);
    }
    setLoading(false);
  };

  const uploadRec = async (uri, label, patient) => {
    setLoading(true);
    const { status, data } = await uploadRecording(uri, label, patient);
    if (status == 200) {
      alert("Recording uploaded successfully");
    } else {
      alert(`${status}:Error assigning recording to patient`);
    }
    setLoading(false);
    setModalHidden(true);
    navigation.pop();
  };

  const searchHandler = (text) => {
    const filt = patients.filter((patient) => {
      return patient.fullname.toLowerCase().search(text.toLowerCase()) != -1;
    });

    setFilteredPatients(filt);
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      setAudioLoaded(false);
      if (playbackStatus.error) {
        alert(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      setAudioLoaded(true);
      if (playbackStatus.isPlaying) {
        setPlaying(true);
        setIsFinished(false);
      } else {
        setPlaying(false);
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        setPlaying(false);
        setIsFinished(true);
      }
    }
  };

  const playSound = async () => {
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const pauseSound = async () => {
    console.log("Pausing Sound");
    await sound.pauseAsync();
    const { positionMillis } = await sound.getStatusAsync();
    sound.setPositionAsync(positionMillis);
  };

  const stopSound = async () => {
    console.log("Stopping Sound");
    await sound.stopAsync();
  };

  const replaySound = async () => {
    console.log("Replaying Sound");
    await sound.replayAsync();
  };

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

  useEffect(() => {
    const func = async () => {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({
        uri: route.params.uri,
      });
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSound(sound);
    };
    func();
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LineChart
          data={{
            labels: graphLabels,
            datasets: [
              {
                data: graphData,
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]}
          style={[
            {
              borderRadius: 10,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {!audioLoaded ? (
            <Feather name={"loader"} size={35} color={mode[appTheme].text} />
          ) : (
            <MaterialCommunityIcons
              name={"waveform"}
              size={35}
              color={mode[THEMES.DARK].text}
            />
          )}
          <View style={styles.row}>
            <AppButton style={{ marginRight: 2 }} onPress={replaySound}>
              <MaterialCommunityIcons
                name="restart"
                size={25}
                color={mode[THEMES.DARK].text}
              />
            </AppButton>
            {!isFinished && (
              <AppButton onPress={!playing ? playSound : pauseSound}>
                <MaterialCommunityIcons
                  name={!playing ? "play" : "pause"}
                  size={25}
                  color={mode[THEMES.DARK].text}
                />
              </AppButton>
            )}
            <AppButton style={{ marginLeft: 2 }} onPress={stopSound}>
              <MaterialCommunityIcons
                name="stop"
                size={25}
                color={mode[THEMES.DARK].text}
              />
            </AppButton>
          </View>
          {/* <AppText style={{ fontSize: 12, color: mode[THEMES.DARK].text }}>
              Tap to play
            </AppText> */}
        </LinearGradient>
        <AppText>{route.params.filename}</AppText>
        <AppButton
          onPress={() => {
            getPred(route.params.uri);
          }}
        >
          GET PREDICTION
        </AppButton>
        <AppButton
          onPress={() => {
            setModalHidden(false);
          }}
        >
          ASSIGN TO PATIENT
        </AppButton>
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
                                  uploadRec(route.params.uri, label, item._id);
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
