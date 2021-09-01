import { AddHabitOneScreen, AddHabitTwoScreen } from "./AddHabit";
import {
  Button,
  Card,
  Carousel,
  Chip,
  Constants,
  Modal,
  PageCarousel,
  Picker,
  SegmentedControl,
  Spacings,
  Text,
  ThemeManager,
  Typography,
  View,
} from "react-native-ui-lib";
import { HabitsListContextProvider, HabitsListScreen } from "./HabitsList";
import React, { createContext, useRef } from "react";
import { Spring, animated } from "react-spring";
import { StyleSheet, TextInput } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { NewHabitContext } from "./AddHabit";
import { StatusBar } from "expo-status-bar";
import _ from "lodash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const AnimatedView = animated(View);

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        backgroundColor="#30B650"
        label="Go to HabitsList Page"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("HabitsList")}
        enableShadow
      />
      <Button
        backgroundColor="#30B650"
        label="Go to GettingStarted Page"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("GettingStarted")}
        enableShadow
      />
      <Button
        backgroundColor="#30B650"
        label="Go to AddHabitOne Page"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("AddHabitOne")}
        enableShadow
      />
      <Button
        backgroundColor="#30B650"
        label="Go to AddHabitTwo Page"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => navigation.navigate("AddHabitTwo")}
        enableShadow
      />
    </View>
  );
}

function GettingStartedScreen({ navigation }) {
  var carousel = useRef(null);

  const onPagePress = (index) => {
    if (this.carousel && this.carousel.current) {
      this.carousel.current.goToPage(index, true);
    }
    console.log(index + 1)
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
        ref={carousel}
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HabitsListContextProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HabitsList"
        screenOptions={{ animationEnabled: true }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HabitsList"
          component={HabitsListScreen}
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
    </HabitsListContextProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

ThemeManager.setComponentTheme("Button", (props, context) => {
  return {
    // this will apply a different backgroundColor
    // depends if the Button is an outline or not
    backgroundColor: props.outline ? "black" : "green",
    textColor: "black",
    height: 80,
  };
});