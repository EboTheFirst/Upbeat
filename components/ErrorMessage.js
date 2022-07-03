import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import AppText from "./AppText";

export default function ErrorMessage({ children }) {
  const { appTheme, setAppTheme } = useContext(AppContext);
  return (
    <AppText
      style={{
        fontSize: 12,
        color: mode[appTheme].danger,
        fontWeight: "bold",
      }}
    >
      {children}
    </AppText>
  );
}
