import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormTextInput from "../components/FormTextInput";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useState } from "react";
import { Formik } from "formik";
import Submit from "../components/Submit";
import { login } from "../api/users.api";
import Loading from "./../components/Loading";
import { routes } from "../constants/routes";
import userStorage from "../appstorage/user";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";

export default function Login({ navigation }) {
  const { appTheme, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
  });

  const submitHandler = async (formData) => {
    setLoading(true);
    for (const key in formData) {
      formData[key] = formData[key].trim();
    }
    const { status, data } = await login(formData);
    if (status == 200) {
      alert("Welcome");
      setUser(jwtDecode(data));
      userStorage.storeUser(data);
      navigation.reset({
        index: 0,
        routes: [{ name: routes.HOME }],
      });
    } else if (status == 401) {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: mode[appTheme].background }]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: mode[appTheme].backgroundDarker },
        ]}
      >
        <MaterialCommunityIcons
          name="heart-pulse"
          size={40}
          color={mode[appTheme].theme2}
        />

        <View
          style={[styles.row, { marginBottom: 40, justifyContent: "center" }]}
        >
          <AppText style={[styles.header, { color: mode[appTheme].theme1 }]}>
            LOGIN
          </AppText>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          <>
            <FormTextInput
              name={"email"}
              iconName="email"
              placeholder="email address"
            />
            <FormTextInput
              name={"password"}
              iconName="lock"
              secureTextEntry={true}
              placeholder="password"
            />
            <Submit>Submit</Submit>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.REGISTER)}
            >
              <AppText
                style={{
                  marginTop: 20,
                  color: mode[appTheme].theme1,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                I DON'T HAVE AN ACCOUNT
              </AppText>
            </TouchableOpacity>
          </>
        </Formik>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
