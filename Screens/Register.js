import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import FormTextInput from "../components/FormTextInput";
import AppText from "../components/AppText";
import { mode } from "../constants/colors";
import AppContext from "../contexts/appContext";
import { useContext, useState } from "react";
import { Formik } from "formik";
import Submit from "../components/Submit";
import { signup } from "../api/users.api";
import Loading from "./../components/Loading";
import { routes } from "../constants/routes";

export default function Register({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { appTheme } = useContext(AppContext);
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3).required().label("First name"),
    lastname: Yup.string().min(3).required().label("Last name"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const submitHandler = async (formData) => {
    setLoading(true);
    console.log("HERE");
    for (const key in formData) {
      formData[key] = formData[key].trim();
    }
    const { status, data } = await signup(formData);
    if (status == 200) {
      navigation.navigate(routes.LOGIN);
      alert(
        "We have sent you an email. Click the link in the email to verify your account, and then login"
      );
    } else if (status == 400) {
      alert("Email already registered");
    }
    setLoading(false);
  };

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
            SIGN-UP
          </AppText>
        </View>
        <Formik
          initialValues={{
            firstname: "",
            email: "",
            lastname: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          <>
            <FormTextInput
              name={"firstname"}
              iconName="account"
              placeholder="first name"
            />
            <FormTextInput
              name={"lastname"}
              iconName="account"
              placeholder="last name"
            />
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

            <FormTextInput
              name={"confirmPassword"}
              iconName="lock"
              secureTextEntry={true}
              placeholder="confirm password"
            />
            <Submit>Submit</Submit>
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <AppText
                style={{
                  marginTop: 20,
                  color: mode[appTheme].theme1,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                LOG IN INSTEAD
              </AppText>
            </TouchableOpacity>
          </>
        </Formik>
      </View>
      <StatusBar style="auto" />
      {loading && <Loading />}
    </View>
  );
}
