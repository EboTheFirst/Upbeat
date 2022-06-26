import { StyleSheet } from "react-native";
import { mode } from "./constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  field: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 10,
    minWidth: 200,
    fontFamily: "DMSans_400Regular",
    marginVertical: 10,
  },
  search: {
    paddingHorizontal: 10,
    // borderWidth: 2,
    // borderBottomWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
  searchInput: {
    padding: 10,
    fontSize: 18,
    minWidth: 300,
    fontFamily: "DMSans_400Regular",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontFamily: "DMSans_700Bold",
    fontSize: 30,
  },
  headerItalic: {
    fontFamily: "DMSans_700Bold_Italic",
    fontSize: 30,
  },
  text: {
    fontFamily: "DMSans_400Regular",
    fontSize: 18,
  },
  deviceListItemtext: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
  },
  textMedium: {
    fontFamily: "DMSans_500Medium",
    fontSize: 30,
  },
  textMediumItalic: {
    fontFamily: "DMSans_500Medium_Italic",
    fontSize: 30,
  },
  textItalic: {
    fontFamily: "DMSans_400Regular_Italic",
    fontSize: 30,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
});
