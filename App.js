import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Alert, TextInput } from "react-native";
import {
  Text,
  View,
  Button,
  Carousel,
  PageCarousel,
  Constants,
  Card,
  Picker,
  Chip,
  DateTimePicker,
  TextField,
  TextArea,
  SegmentedControl,
  BorderRadiuses,
} from "react-native-ui-lib";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors, Typography, Spacings } from "react-native-ui-lib";
import { ThemeManager } from "react-native-ui-lib";
import _ from "lodash";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useSpring, Spring, animated } from "react-spring";

const formSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be 2 character(s) long")
    .required("Title is required"),
  description: yup
    .string()
    .min(2, "Description must be 2 character(s) long")
    .required("Description is required"),
});

const formSchema2 = yup.object().shape({
  atLeastOneDaySelected: yup
    .boolean()
    .required("Must pick at least one day"),
  timeSelected: yup
    .time()
    .min(2, "Description must be 2 character(s) long")
    .required("Description is required"),
});

const Page = ({ children, style, ...others }) => {
  return (
    <View {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};

const AnimatedView = animated(View);

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      <Button
        backgroundColor="#30B650"
        label="Go to GettingStarted Page"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("GettingStarted")}
        enableShadow
      />
      <Text> </Text>
      <Button
        backgroundColor="#30B650"
        label="Go to AddHabitOne Page"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("AddHabitOne")}
        enableShadow
      />
    </View>
  );
}

function GettingStartedScreen({ navigation }) {
  const onPagePress = (index) => {
    // if (this.carousel && this.carousel.current) {
    //   this.carousel.current.goToPage(index, true);
    // }
  };

  const renderGettingStartedCard = (cardNum) => {
    switch (cardNum) {
      case 0:
        return (
          <Card
            key={0}
            flex
            onPress={() => {}}
            useNative
            activeOpacity={1}
            activeScale={0.96}
            enableShadow
            enableBlur
          >
            <Card.Section
              bg-red30
              padding-35
              flex-0
              content={[
                { text: "Welcome to", text40: true, white: true },
                { text: "HabitForce", text20: true, white: true },
              ]}
              contentStyle={{ alignItems: "flex-start" }}
            />
            <Card.Section
              white
              marginT-30
              marginL-35
              marginR-35
              marginB-10
              content={[
                {
                  text: "We can help you build good habits",
                  text30: true,
                  black: true,
                },
              ]}
              contentStyle={{ alignItems: "flex-start", padding: 0 }}
            />
          </Card>
        );
      case 1:
        return (
          <Card
            key={1}
            flex
            onPress={() => {}}
            useNative
            activeOpacity={1}
            activeScale={0.96}
            enableShadow
          >
            <Card.Section
              bg-red30
              padding-35
              flex-0
              content={[
                { text: "Definition", text50: true, white: true },
                { text: "'force of habit'", text30: true, white: true },
              ]}
              contentStyle={{ alignItems: "flex-start" }}
            />
            <Card.Section
              white
              marginT-25
              marginL-35
              marginR-35
              marginB-10
              content={[
                { text: "(phrase)", text50: true, black: true },
                { text: "", text100: true, black: true },
                {
                  text: "the tendency for something done very frequently to become automatic",
                  text40: true,
                  black: true,
                },
              ]}
              contentStyle={{ alignItems: "flex-start", padding: 0 }}
            />
          </Card>
        );
      case 2:
        return (
          <Card
            key={2}
            flex
            onPress={() => {
              navigation.navigate("Home");
            }}
            useNative
            activeOpacity={1}
            activeScale={0.96}
            enableShadow
          >
            <Card.Section
              bg-red30
              padding-30
              flex-0
              content={[
                {
                  text: "We use regular reminders and rewards to encourage 'habit-building' behavior",
                  text40: true,
                  white: true,
                },
              ]}
              contentStyle={{ alignItems: "flex-start" }}
            />
            <Card.Section
              white
              marginT-55
              marginL-35
              marginR-35
              marginB-10
              content={[
                { text: "Tap here to get started", text50: true, black: true },
              ]}
              contentStyle={{ alignItems: "flex-start", padding: 0 }}
            />
          </Card>
        );
      default:
        return renderGettingStartedCard(0);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Carousel
        key={3}
        autoplay={false}
        pageWidth={Constants.windowWidth - Spacings.s5 * 2}
        itemSpacings={Spacings.s3}
        containerMarginHorizontal={Spacings.s2}
        initialPage={0}
        containerStyle={{ height: Constants.windowHeight - Spacings.s10 * 9 }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
        pageControlProps={{ onPagePress: onPagePress }}
        showCounter={false}
        allowAccessibleLayout
        useTet
      >
        {_.map([...Array(3)], (item, index) => {
          return renderGettingStartedCard(index);
        })}
      </Carousel>
    </View>
  );
}

function AddHabitOneScreen({ navigation }) {
  const [language, setLanguage] = useState("English");
  const [reminderFrequency, setReminderFrequency] = useState("Daily");
  const [reminderTime, setReminderTime] = useState([]);
  const [dailyColor, setDailyColor] = useState(Colors.white);
  const [weeklyColor, setWeeklyColor] = useState(Colors.white);
  const [toggledDays, setToggledDays] = useState({
    Su: false,
    M: false,
    Tu: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
  });
  const [daysColor, setDaysColor] = useState({
    Su: Colors.white,
    M: Colors.white,
    Tu: Colors.white,
    W: Colors.white,
    Th: Colors.white,
    F: Colors.white,
    Sa: Colors.white,
  });

  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage);
  }

  function handleDailyPress() {
    // Case 1: Daily was previously selected. Ensure correct color.
    if (reminderFrequency == "Daily") {
      setDailyColor(Colors.green20);
      setWeeklyColor(Colors.white);
    }
    // Case 2: Weekly was previously selected. Switch to daily.
    else if (reminderFrequency == "Weekly") {
      setReminderFrequency("Daily");
      setDailyColor(Colors.green20);
      setWeeklyColor(Colors.white);
    }
    console.log("handled daily");
  }

  function handleWeeklyPress(event) {
    // Case 1: Weekly was previously selected. Ensure correct color.
    if (reminderFrequency == "Daily") {
      setDailyColor(Colors.white);
      setWeeklyColor(Colors.green20);
    }
    // Case 2: Daily was previously selected. Switch to daily.
    else if (reminderFrequency == "Daily") {
      setReminderFrequency("Weekly");
      setDailyColor(Colors.white);
      setWeeklyColor(Colors.green20);
    }
    console.log("handled weekly");
  }

  const longOptions = [
    { label: "Arabic", value: "Arabic" },
    { label: "Spanish", value: "Spanish" },
    { label: "English", value: "English" },
    { label: "Italian", value: "Italian" },
  ];

  const [addHabitPageNum, setAddHabitPageNum] = useState(0);

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
    to: { opacity: addHabitPageNum == 0 ? 1 : 0, marginTop: 0 },
    from: { opacity: 1, marginTop: -50 },
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
              <Text text40 styles={{}}>
                Let's solidify a habit.
              </Text>
            </AnimatedView>
            <View padding-10></View>
            <AnimatedView
              style={{
                ...animationPropsTwo,
                alignItems: "flex-start",
              }}
            >
              <Text text40 styles={{}}>
                Help us out by giving us some details.
              </Text>
            </AnimatedView>
          </View>

          <AnimatedView style={{...animationPropsThree}}>
          <Formik
            initialValues={{ title: "", description: "" }}
            onSubmit={(values) => {
              navigation.navigate("AddHabitTwo");
            }}
            // Alert.alert(JSON.stringify())
            validationSchema={formSchema}
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
                  onBlur={handleBlur("title")}
                />
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
                    onBlur={handleBlur("description")}
                  />
                </View>
                <ErrorMessage name="title">
                  {(msg) => (
                    <Text style={{ color: "red", paddingTop: 10 }}>{msg}</Text>
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
                  title="Continue"
                />
              </View>
            )}
          </Formik>
          </AnimatedView>
        </AnimatedView>
      </View>
    </View>
  );
}

function AddHabitTwoScreen({ navigation }) {
  const [toggledDays, setToggledDays] = useState({
    Su: false,
    M: false,
    Tu: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
  });

  function handleToggleDay(name) {
    let items = { ...toggledDays };

    if (items[name]) {
      items[name] = false;
      setToggledDays(items);
    } else {
      items[name] = true;
      setToggledDays(items);
    }
  }

  function WeekdayChip(props) {
    return (
      <View>
        <Chip
          label={props.name}
          labelStyle={{
            color: toggledDays[props.name] ? Colors.white : Colors.black,
            fontSize: 16,
            paddingVertical: 3,
            paddingHorizontal: 0,
          }}
          containerStyle={{
            backgroundColor: toggledDays[props.name]
              ? Colors.green20
              : Colors.white,
            marginLeft: Spacings.s1,
            borderColor: toggledDays[props.name]
              ? Colors.green20
              : Colors.black,
          }}
          onPress={() => {
            console.log(props.name);
            handleToggleDay(props.name);
          }}
          size={{ width: 5, height: 40 }}
        />
      </View>
    );
  }

  const [addHabitPageNum, setAddHabitPageNum] = useState(0);

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
                ...animationPropsA,
                padding: 0,
                alignItems: "flex-start",
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
              Remember, the more you do it, the more engrained the habit becomes.
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
                Which days of the week would you like to be reminded? And what time?
              </Text>
            </AnimatedView>
          </View>

            <AnimatedView                     style={{ ...animationPropsD }}>
          <Formik
            initialValues={{ title: "", description: "" }}
            onSubmit={(values) => {
              navigation.navigate("Home")
            }}
            // Alert.alert(JSON.stringify())
            validationSchema={formSchema}
          >
            {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
              <View>
                <View
                  label="itemsToSelect"
                  style={{
                    justifyContent: "center",
                  }}
                >
                  
                  <View
                    label="WeekdayChips"
                    row
                    style={{marginBottom:25}}
                  >
                    <WeekdayChip name={"Su"} />
                    <WeekdayChip name={"M"} />
                    <WeekdayChip name={"Tu"} />
                    <WeekdayChip name={"W"} />
                    <WeekdayChip name={"Th"} />
                    <WeekdayChip name={"F"} />
                    <WeekdayChip name={"Sa"} />
                  </View>
                  <View label="DateTimeView" style={{marginHorizontal: 10, marginHorizontal: 50}}>
                    <DateTimePicker
                      mode={"time"}
                      title={"Time"}
                      placeholder={"Select time"}
                      timeFormat={"h:mm A"}
                      style={{ padding: 10 }}
                    />
                  </View>
                </View>

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
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ animationEnabled: true }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GettingStarted"
          component={GettingStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddHabitOne"
          component={AddHabitOneScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddHabitTwo"
          component={AddHabitTwoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

// Colors.loadColors({
//   primaryColor: '#2364AA',
//   secondaryColor: '#81C3D7',
//   textColor: '#221D23',
//   errorColor: '#E63B2E',
//   successColor: '#ADC76F',
//   warnColor: '#FF963C'
// });

// Typography.loadTypographies({
//   heading: {fontSize: 36, fontWeight: '600'},
//   subheading: {fontSize: 28, fontWeight: '500'},
//   body: {fontSize: 18, fontWeight: '400'}
// });

// Spacings.loadSpacings({
//   page: 20,
//   card: 12,
//   gridGutter: 16
// });

ThemeManager.setComponentTheme("Button", (props, context) => {
  return {
    // this will apply a different backgroundColor
    // depends if the Button is an outline or not
    backgroundColor: props.outline ? "black" : "green",
    textColor: "black",
    height: 80,
  };
});

// const renderAddHabitCard = (cardNum) => {
//   switch (cardNum) {
//     case 0:
//       return (
//         <Card
//           key={0}
//           flex
//           onPress={() => {}}
//           useNative
//           activeOpacity={1}
//           activeScale={0.96}
//           enableShadow
//         >
//           <Card.Section
//             bg-blue20
//             padding-35
//             flex-0
//             content={[
//               { text: "Let's set up \na habit", text20: true, white: true },
//               {
//                 text: "What do you want to call it? ",
//                 text60: true,
//                 white: true,
//               },
//             ]}
//             contentStyle={{ alignItems: "flex-start" }}
//           />
//           <View paddingT-30 paddingL-30 paddingR-30>
//             <TextField text30 placeholder="name" />
//           </View>
//           {/* <Card.Section/> */}
//         </Card>
//       );
//     case 1:
//       return (
//         <Card
//           key={1}
//           flex
//           onPress={() => {}}
//           useNative
//           activeOpacity={1}
//           activeScale={0.96}
//           enableShadow
//         >
//           <Card.Section
//             bg-blue20
//             padding-35
//             flex-0
//             content={[
//               {
//                 text: "Give a little more detail. A good goal is S.M.A.R.T.\nSpecific, Measurable, Attainable, Realistic, and Timely.",
//                 text50: true,
//                 white: true,
//               },
//             ]}
//             contentStyle={{ alignItems: "flex-start" }}
//           />
//           <View
//             style={{
//               height: 150,
//               borderWidth: 0,
//               marginBottom: 3,
//               padding: 30,
//               borderColor: Colors.dark60,
//             }}
//           >
//             <TextArea placeholder="Write something.." />
//           </View>
//         </Card>
//       );
//     case 2:
//       return (
//         <Card
//           key={2}
//           flex
//           onPress={() => {
//             navigation.navigate("Home");
//           }}
//           useNative
//           activeOpacity={1}
//           activeScale={0.96}
//           enableShadow
//         >
//           <Card.Section
//             bg-red30
//             padding-30
//             flex-0
//             content={[
//               {
//                 text: "We use regular reminders and rewards to encourage 'habit-building' behavior",
//                 text40: true,
//                 white: true,
//               },
//             ]}
//             contentStyle={{ alignItems: "flex-start" }}
//           />
//           <Card.Section
//             white
//             marginT-55
//             marginL-35
//             marginR-35
//             marginB-10
//             content={[
//               { text: "Tap here to get started", text50: true, black: true },
//             ]}
//             contentStyle={{ alignItems: "flex-start", padding: 0 }}
//           />
//         </Card>
//       );
//     default:
//       return renderGettingStartedCard(0);
//   }
// };

// const onPagePress = (index) => {
//   // if (this.carousel && this.carousel.current) {
//   //   this.carousel.current.goToPage(index, true);
//   // }
// };

{
  /* <SegmentedControl
            containerStyle={{padding: 10}}
            segments={[{label: 'Left'}, {label: 'Right'}]}
            activeColor={Colors.white}
            // borderRadius={BorderRadiuses.br100}
            backgroundColor={Colors.grey50}
            activeBackgroundColor={Colors.green20}
            inactiveColor={Colors.grey10}
            outlineWidth={0}
            outlineColor={Colors.white}
            style={{fontSize: 18, fontWeight: 600}}
          /> */
}


// <View
//                     label="DailyOrWeeklyChips"
//                     row
//                     style={{
//                       flex: 0,
//                       flexDirection: "row",
//                       alignItems: "space-around",
//                       paddingHorizontal: 10,
//                       paddingTop: 10,
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Chip
//                       label={"Daily"}
//                       labelStyle={{
//                         color:
//                           reminderFrequency == "Daily"
//                             ? Colors.white
//                             : Colors.black,
//                         fontSize: 22,
//                         paddingTop: 15,
//                         paddingBottom: 5,
//                         paddingHorizontal: 10,
//                       }}
//                       containerStyle={{
//                         borderColor:
//                           reminderFrequency == "Daily"
//                             ? Colors.green20
//                             : Colors.black,
//                         backgroundColor:
//                           reminderFrequency == "Daily"
//                             ? Colors.green20
//                             : Colors.white,
//                         marginHorizontal: 10,
//                       }}
//                       onPress={() => {
//                         setReminderFrequency("Daily");
//                       }}
//                     />
//                     <Chip
//                       label={"Weekly"}
//                       labelStyle={{
//                         color:
//                           reminderFrequency == "Weekly"
//                             ? Colors.white
//                             : Colors.black,
//                         fontSize: 22,
//                         paddingTop: 15,
//                         paddingBottom: 5,
//                         paddingHorizontal: 10,
//                       }}
//                       containerStyle={{
//                         borderColor:
//                           reminderFrequency == "Weekly"
//                             ? Colors.green20
//                             : Colors.black,
//                         backgroundColor:
//                           reminderFrequency == "Weekly"
//                             ? Colors.green20
//                             : Colors.white,
//                         marginHorizontal: 5,
//                       }}
//                       onPress={() => {
//                         setReminderFrequency("Weekly");
//                       }}
//                     />
//                   </View>
