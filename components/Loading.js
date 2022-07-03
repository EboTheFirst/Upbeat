import React from "react";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <LottieView
      source={require("../assets/animations/wave-load-dark.json")}
      autoPlay
      loop
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    />
  );
}
