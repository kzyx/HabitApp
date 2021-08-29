import { AddHabitOneScreen, AddHabitTwoScreen } from "./AddHabit";
import { Alert, FlatList, StyleSheet, TextInput } from "react-native";
import {
  BorderRadiuses,
  Button,
  Card,
  Carousel,
  Chip,
  Colors,
  Constants,
  ListItem,
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
import { Spring, animated } from "react-spring";
import { dateToWeekdayName, getLastSunday } from "./Utils";
import { differenceInDays, isBefore, isSameDay, parseISO, startOfDay } from "date-fns";

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SelectableChipRow } from "./SelectableChip";
import { StatusBar } from "expo-status-bar";
import TextTicker from "react-native-text-ticker";
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

function HabitsListScreen({ navigation }) {
  function renderRow(row, id) {
    var countToggledDays = 0;
    for (var day in row.toggledDays) {
      countToggledDays += row.toggledDays[day] ? 1 : 0;
    }

    var timesDoneThisWeek = 0;
    console.log(row.lastSevenTimesDone);
    var completedDays = {
      Su: false,
      M: false,
      Tu: false,
      W: false,
      Th: false,
      F: false,
      Sa: false,
    };
    for (var i = 0; i < row.lastSevenTimesDone.length; i++) {
      var habitDay = row.lastSevenTimesDone[i];
      const habitDate = startOfDay(parseISO(habitDay));
      const sunday = getLastSunday();

      const diff = differenceInDays(habitDate, sunday);
      const sundayWasBeforeOrEqual =
        isBefore(sunday, habitDate) || isSameDay(sunday, habitDate);
      if (diff < 7 && sundayWasBeforeOrEqual) {
        timesDoneThisWeek += 1;
        completedDays[dateToWeekdayName(habitDate)] = true;
      }
      console.log(row.lastSevenTimesDone);
      console.log(habitDate);
      console.log(sunday);
      console.log(getLastSunday());
      console.log(diff, " ", sundayWasBeforeOrEqual);
      console.log(timesDoneThisWeek);
      console.log(" ");
    }

    return (
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={100}
          onPress={() => Alert.alert(`pressed on order #${id + 1}`)}
          containerStyle={{ borderRadius: BorderRadiuses.br60 }}
        >
          <ListItem.Part left>
            {/* <Animatable.Image source={{uri: row.mediaUrl}} style={styles.image} {...imageAnimationProps} /> */}
          </ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[styles.border, { paddingRight: 17 }]}
          >
            <ListItem.Part row style={{marginRight: 5}}>
              <View style={{justifyContent: 'space-between', paddingLeft: 10}}>
                <TextTicker
                  duration={100 * row.title.length}
                  loop
                  bounce
                  repeatSpacer={50}
                  marqueeDelay={2000}
                  // marqueeOnMount={true}
                  style={{
                    // flex: 1,
                    marginRight: 5,
                    paddingTop: 20,
                    paddingLeft: 10,
                    alignSelf: "flex-start",
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: 200
                  }}
                  animationType={'scroll'}
                >
                  {row.title}
                </TextTicker>
              </View>
              <View style={{ justifyContent: "space-between", paddingRight: 5}}>
                <Text
                  dark10
                  text70
                  style={{
                    flex: 1,
                    marginRight: 5,
                    paddingTop: 20,
                    paddingLeft: 20,
                    alignSelf: "flex-end",
                  }}
                  numberOfLines={1}
                >
                  {`${timesDoneThisWeek}/${countToggledDays} this week`}
                </Text>
              </View>
            </ListItem.Part>
            <ListItem.Part>
              <SelectableChipRow
                toggledDays={row.toggledDays}
                completedDays={completedDays}
                handleToggleDay={() => void 0}
                fontSize={14}
                size={{ width: 1, height: 25 }}
                chipMarginHorizontal={5}
                rowMarginLeft={10}
                rowMarginTop={5}
              ></SelectableChipRow>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </View>
    );
  }

  const DATA = [
    {
      title: "Dog walking",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: false,
        M: true,
        Tu: true,
        W: false,
        Th: false,
        F: false,
        Sa: false,
      },
      timeOfDay: 10,
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-28", "2021-08-27"],
      timesDone: ["2021-08-04", "2021-08-22"],
    },
    {
      title: "Cat sitting Mr. Mittens on weekdays",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: true,
        M: false,
        Tu: false,
        W: false,
        Th: false,
        F: false,
        Sa: true,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-28", "2021-08-29"],
      timesDone: ["2021-08-04", "2021-08-23"],
    },
    {
      title: "Crying",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: false,
        M: false,
        Tu: false,
        W: true,
        Th: true,
        F: false,
        Sa: false,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-29", "2021-08-30"],
      timesDone: ["2021-08-04", "2021-08-24"],
    },
    {
      title: "Dog walking22",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: false,
        M: true,
        Tu: true,
        W: false,
        Th: false,
        F: false,
        Sa: false,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-25"],
      timesDone: ["2021-08-04", "2021-08-25"],
    },
    {
      title: "Cat sitting22",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: true,
        M: false,
        Tu: false,
        W: false,
        Th: false,
        F: false,
        Sa: true,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-05"],
      timesDone: ["2021-08-04", "2021-08-05"],
    },
    {
      title: "Jumping on the bed because I'm cool",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: false,
        M: false,
        Tu: false,
        W: true,
        Th: true,
        F: false,
        Sa: false,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-05"],
      timesDone: ["2021-08-04", "2021-08-05"],
    },
    {
      title: "Cat sitting44",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: true,
        M: false,
        Tu: false,
        W: false,
        Th: false,
        F: false,
        Sa: true,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-05"],
      timesDone: ["2021-08-04", "2021-08-05"],
    },
    {
      title: "Crying555555",
      description: "Walk dog on weekdays",
      toggledDays: {
        Su: false,
        M: false,
        Tu: false,
        W: true,
        Th: true,
        F: false,
        Sa: false,
      },
      numberOfTimesDone: 10,
      lastSevenTimesDone: ["2021-08-05"],
      timesDone: ["2021-08-04", "2021-08-05"],
    },
  ];

  return (
    <View style={{ padding: 15, marginTop: 60, paddingBottom: 100, marginBottom: 0 }}>
      {/* <View > */}
      <Button
        backgroundColor="#30B650"
        label="ADD"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => void 0}
        enableShadow
        style={{ paddingVertical: 10, marginHorizontal: 10 }}
      />
      {/* </View> */}
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={(item, index) => item.title}
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
  );
}

export const styles = StyleSheet.create({
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

ThemeManager.setComponentTheme("Button", (props, context) => {
  return {
    // this will apply a different backgroundColor
    // depends if the Button is an outline or not
    backgroundColor: props.outline ? "black" : "green",
    textColor: "black",
    height: 80,
  };
});