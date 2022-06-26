import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { styles } from "../styles";

export default function AppModal({ children, style, hidden }) {
  const { appTheme } = useContext(AppContext);
  return (
    <View
      style={[
        {
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.9,
          justifyContent: "center",
          alignItems: "center",
          display: hidden ? "none" : "flex",
        },
      ]}
    >
      <View
        style={[styles.card, { backgroundColor: mode[appTheme].background }]}
      >
        {children}
      </View>
    </View>
  );
}
