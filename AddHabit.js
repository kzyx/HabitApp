import * as yup from "yup";

import {
  Button,
  Colors,
  DateTimePicker,
  Text,
  TextArea,
  TextField,
  View
} from "react-native-ui-lib";
import { ErrorMessage, Formik } from "formik";
import React, { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";

import { SelectableChipRow } from "./SelectableChip";
import { StyleSheet } from "react-native";
import { useHabitsListContext } from "./HabitsList";

export const AnimatedView = animated(View);

export const habitSchemaOne = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be 2 character(s) long")
    .required("Title is required"),
  description: yup
    .string()
    .min(2, "Description must be 2 character(s) long")
    .required("Description is required"),
});

export const habitSchemaTwo = yup.object().shape({
  atLeastOneDaySelected: yup
    .boolean()
    .oneOf([true], "Must pick at least one day")
    .required("Must pick at least one day"),
  isTimeOfDaySpecified: yup
    .boolean()
    .oneOf([true, 1], "Time of day is required")
    .required("Time of day is required"),
});

const Page = ({ children, style, ...others }) => {
  return (
    <View {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};

export function AddHabitOneScreen({ navigation }) {

  const [readyToExitScreen, setReadyToExitScreen] = useState(false);

  const animationProps = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
    delay: 400,
  });
  const animationPropsTwo = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
    delay: 800,
  });
  const animationPropsThree = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
    delay: 1200,
  });
  const animationPropsFour = useSpring({
    to: { opacity: readyToExitScreen ? 0 : 1, marginTop: readyToExitScreen ? -50 : 0 },
    from: { opacity: 1, marginTop: 0 },
    delay: 800,
  });

  return (
    <View
      style={{
        alignItems: "center",
        ...styles.container,
      }}
    >
      <View
        style={{
          alignItems: "center",
          ...styles.container,
        }}
      >
        <AnimatedView
          style={{
            ...animationPropsFour,
            ...styles.container,
            padding: 40,
            flex: 5,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <AnimatedView
              style={{
                ...animationProps,
                alignItems: "flex-start",
              }}
            >
              <Text text30 styles={{}}>
                Let's form a habit.
              </Text>
            </AnimatedView>
            <View padding-10></View>
            <AnimatedView
              style={{
                ...animationPropsTwo,
                alignItems: "flex-start",
              }}
            >
              <Text text30>
                Help us out by providing details.
              </Text>
            </AnimatedView>
          </View>

          <AnimatedView style={{ ...animationPropsThree }}>
            <Formik
              initialValues={{ title: "", description: "" }}
              onSubmit={(values) => {
                navigation.navigate("AddHabitTwo", {title: values.title, description: values.description});
              }}
              // Alert.alert(JSON.stringify())
              validationSchema={habitSchemaOne}
            >
              {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
                <View>
                  <TextField
                    text40
                    style={{
                      paddingBottom: 1,
                      marginBottom: 1,
                      flex: 0,
                      alignSelf: "flex-start",
                    }}
                    placeholder="Name of Habit"
                    value={values.title}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")} />
                  <View
                    style={{
                      height: 150,
                      borderWidth: 1,
                      marginBottom: 0,
                      padding: 10,
                      borderColor: Colors.dark60,
                    }}
                  >
                    <TextArea
                      text70
                      style={{
                        ...styles.input,
                        paddingTop: 0,
                        alignSelf: "flex-end",
                      }}
                      placeholder="Description. e.g. I want to do at least 30 minutes of yoga in order to..."
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")} />
                  </View>
                  <ErrorMessage name="title">
                    {(msg) => (
                      <Text style={{ color: "red", paddingTop: 10 }}>
                        {msg}
                      </Text>
                    )}
                  </ErrorMessage>
                  <ErrorMessage name="description">
                    {(msg) => (
                      <Text style={{ color: "red", paddingBottom: 5 }}>
                        {msg}
                      </Text>
                    )}
                  </ErrorMessage>
                  <Button
                    backgroundColor="#30B650"
                    label="CONTINUE"
                    labelStyle={{ fontWeight: "900" }}
                    style={{ marginBottom: 20, marginTop: 20 }}
                    onPress={handleSubmit}
                    color="white"
                    title="Continue" />
                </View>
              )}
            </Formik>
          </AnimatedView>
        </AnimatedView>
      </View>
    </View>
  );
}

export function AddHabitTwoScreen({ route, navigation }) {
  const {title, description} = route.params
  const [toggledDays, setToggledDays] = useState({
    Su: false,
    M: false,
    Tu: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
  });

  const [timeOfDay, setTimeOfDay] = useState(null)

  function handleToggleDay(name, formikValues) {
    let items = { ...toggledDays };

    if (items[name]) {
      items[name] = false;
      setToggledDays(items);
    } else {
      items[name] = true;
      setToggledDays(items);
    }

    var temp = false;
    for (key in items) {
      if (!items.hasOwnProperty(key)) {
        continue;
    }
      temp |= items[key];
    }
    console.log("temp is ", temp, "\n")
    formikValues.atLeastOneDaySelected = temp;
    
  }

  const [readyToExitScreen, setReadyToExitScreen] = useState(false);
  var { habitsList, addHabitToList, removeHabitFromList } = useHabitsListContext();

  const animationPropsA = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
    delay: 400,
  });
  const animationPropsB = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
    delay: 800,
  });
  const animationPropsC = useSpring({
    to: { opacity: 1, marginTop: 0 },
    from: { opacity: 0, marginTop: -50 },
    delay: 1200,
  });

  const animationPropsD = useSpring({
    to: {
      opacity: 1,
      marginTop: 0,
      paddingTop: 5,
      paddingBottom: 20,
    },
    from: { opacity: 0, marginTop: -50, paddingTop: 0 },
    delay: 1600,
  });

  return (
    <View
      style={{
        alignItems: "center",
        ...styles.container,
        // paddingTop: 100,
        flex: 1,
        marginHorizontal: 20,
      }}
    >
      <AnimatedView
        style={{
          ...styles.container,
          flex: 1,
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            marginBottom: 20,
            marginHorizontal: 20,
          }}
        >
          <AnimatedView
            style={{
              ...animationPropsA,
              padding: 0,
              alignItems: "flex-start",
              flex: 0,
            }}
          >
            <Text text40 styles={{}}>
              Thanks for that info.
            </Text>
          </AnimatedView>
          <AnimatedView
            style={{
              ...animationPropsB,
              paddingTop: 15,
              alignItems: "flex-start",
            }}
          >
            <Text text40 styles={{}}>
              Remember, the more you do it, the more engrained the habit
              becomes.
            </Text>
          </AnimatedView>
          <AnimatedView
            style={{
              ...animationPropsC,
              paddingTop: 15,
              alignItems: "flex-start",
            }}
          >
            <Text text40>
              Which days of the week would you like to be reminded? And what
              time?
            </Text>
          </AnimatedView>
        </View>

        <AnimatedView style={{ ...animationPropsD, paddingHorizontal: 100 }}>
          <Formik
            initialValues={{
              atLeastOneDaySelected: false,
              isTimeOfDaySpecified: false,
            }}
            onSubmit={(values) => {
              console.log(title, description, toggledDays, timeOfDay)
              addHabitToList({
                title: title,
                description: description,
                toggledDays: toggledDays,
                timeOfDay: timeOfDay,
                lastSevenTimesDone: Array.from({length: 0}),
              });
              console.log(" ")
              console.log(habitsList)
              navigation.navigate("HabitsList");
            }}
            // Alert.alert(JSON.stringify())
            validationSchema={habitSchemaTwo}
          >
            {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
              <View>
                <View
                  label="itemsToSelect"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <SelectableChipRow
                    toggledDays={toggledDays}
                    completedDays={toggledDays}
                    handleToggleDay={handleToggleDay}
                    fontSize={16}
                    size={{ width: 5, height: 40 }}
                    chipMarginHorizontal={10}
                    formikValues={values}
                  />
                  <View
                    label="DateTimeView"
                    style={{ marginHorizontal: 10, marginHorizontal: 50 }}
                  >
                    <DateTimePicker
                      mode={"time"}
                      title={"Time"}
                      placeholder={"Select time"}
                      timeFormat={"h:mm A"}
                      style={{ padding: 10 }}
                      value={timeOfDay}
                      onChange={(date) => {
                        setTimeOfDay(date);
                        values.isTimeOfDaySpecified = true;
                      }}
                    />
                  </View>
                </View>
                <ErrorMessage name="atLeastOneDaySelected">
                  {(msg) => (
                    <Text style={{ color: "red", paddingTop: 10 }}>{msg}</Text>
                  )}
                </ErrorMessage>
                <ErrorMessage name="isTimeOfDaySpecified">
                  {(msg) => (
                    <Text style={{ color: "red", paddingBottom: 5 }}>
                      {msg}
                    </Text>
                  )}
                </ErrorMessage>
                <Button
                  backgroundColor="#30B650"
                  label="DONE"
                  labelStyle={{ fontWeight: "900" }}
                  style={{ marginBottom: 20, marginTop: 10 }}
                  onPress={handleSubmit}
                  color="white"
                  title="Done"
                />
              </View>
            )}
          </Formik>
        </AnimatedView>
      </AnimatedView>
    </View>
  );
}




export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // padding: 25,
    // paddingTop: 20,
  },
  page: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgrey",
    height: 40,
    width: "100%",
    // marginVertical: 10,
    // padding: 10
  },
  button: {
    borderWidth: 1,
    height: 80,
    width: 80,
  },
  errorMsg: {
    color: "red",
    marginVertical: 1,
    alignSelf: "flex-start",
  },
});