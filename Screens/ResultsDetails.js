import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "../styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import { THEMES } from "../constants/themes";
import { LineChart, BarChart } from "react-native-chart-kit";
import AppButton from "../components/AppButton";
import mongoDate from "../simplifications/mongoDate";

export default function ResultsDetails({ navigation, route }) {
  const { appTheme } = useContext(AppContext);
  const [points, setPoints] = useState([0]);
  const [sound, setSound] = useState();
  const [loading, setLoading] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const getDataPoints = () => {
    let datapoints = [];
    let audio_array = route.params.recording.info.audio_array;
    for (
      var i = 0;
      i < route.params.recording.info.audio_array.length;
      i += 50
    ) {
      datapoints.push(audio_array[i]);
    }
    // console.log("====================================");
    // console.log(datapoints.length);
    // console.log("====================================");
    setPoints(datapoints);
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

  useEffect(() => {
    const func = async () => {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({
        uri: route.params.recording.url,
      });
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSound(sound);
    };
    func();
    getDataPoints();
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
        <AppText style={{ fontFamily: "DMSans_700Bold" }}>
          RESULT DETAILS
        </AppText>
      </View>
      {/* TOP BAR END */}

      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: mode[appTheme].background,
        }}
      >
        {/* AUDIO BOX */}
        <View style={[{ padding: 1, marginTop: 20 }]}>
          <LineChart
            bezier
            withHorizontalLabels={false}
            withInnerLines={false}
            withOuterLines={false}
            data={{
              datasets: [
                {
                  data: points,
                  strokeWidth: 2,
                  withDots: false,
                  // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            }}
            width={320}
            height={200}
            chartConfig={{
              backgroundColor: "transparent",
              backgroundGradientFrom: mode[appTheme].theme1,
              backgroundGradientTo: "white",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 10,
              paddingRight: 10,
            }}
          />
        </View>
        {/* AUDIO BOX END */}
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
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <View
            style={[
              styles.card,
              {
                paddingHorizontal: 10,
                paddingVertical: 0,
                marginTop: 10,
                alignSelf: "flex-start",
              },
            ]}
          >
            <AppTextInput
              style={{ height: 60 }}
              iconName={"clipboard-edit-outline"}
              placeholder="Edit Label"
              value={route.params.recording.label}
            />
          </View>
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
            <View>
              <AppText>RESULTS</AppText>
              <View
                style={{
                  backgroundColor: mode[appTheme].theme1,
                  height: 2,
                  width: "100%",
                }}
              />
            </View>
            <AppText>
              Prediction: {route.params.recording.info.alt_prediction}
            </AppText>
            <AppText>
              Certainty:{" "}
              {(route.params.recording.info.certainty * 100).toFixed(2)}%
            </AppText>
            <AppText>
              Received{"\n"}
              {mongoDate.getDate(route.params.recording.createdAt)}
              {"\t\t"}
              {mongoDate.getTime(route.params.recording.createdAt)}
            </AppText>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
