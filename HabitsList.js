import { Alert, FlatList } from "react-native";
import {
  BorderRadiuses,
  Button,
  Colors,
  ListItem,
  Modal,
  Text,
  View,
} from "react-native-ui-lib";
import React, { createContext, useContext, useEffect, useState } from "react";
import { dateToWeekdayName, getEmptyWeekDict, getLastSunday, sampleDataTable } from "./Utils";
import {
  differenceInDays,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  format,
} from "date-fns";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectableChipRow } from "./SelectableChip";
import TextTicker from "react-native-text-ticker";
import { styles } from "./App";

const HabitsListContext = createContext(Array.from({ length: 0 }));
export const useHabitsListContext = () => useContext(HabitsListContext);

export const HabitsListContextProvider = ({ children }) => {
  const [habitsList, setHabitsList] = useState(Array.from({ length: 0 }));
  const [renderAgain, setRenderAgain] = useState(false);

  const addHabitToList = (newHabit) => {
    var newList = habitsList;
    habitsList.push(newHabit);
    setHabitsList(newList);
    setRenderAgain(!renderAgain);
  };
  const removeHabitFromList = (index) => {
    if (index >= 0) {
      var newList = habitsList;
      newList.splice(index, 1);
      setHabitsList(newList);
    }
    setRenderAgain(!renderAgain);
  };
  const updateHabitAtIndex = (index, habit) => {
    var newList = habitsList;
    newList[index] = habit;
    setHabitsList(newList);
  }

  // Effect runs every time habitsList is changed
  useEffect(() => {
    if (habitsList.length !== 0) {
      AsyncStorage.setItem("HABIT_APP::HABITS_LIST", `${habitsList}`);
    }
    console.log("effect1 ", habitsList);
  }, [habitsList]);

  // Effect only runs once on mount/dismount
  useEffect(() => {
    // AsyncStorage.clear()
    AsyncStorage.getItem("HABIT_APP::HABITS_LIST").then((value) => {
      if (value) {
        setHabitsList(Array.from(value));
      }
      console.log("effect2 ", habitsList);
    });
  }, []);

  return (
    <HabitsListContext.Provider
      value={{
        habitsList,
        renderAgain,
        setRenderAgain,
        addHabitToList,
        removeHabitFromList,
        updateHabitAtIndex,
      }}
    >
      {children}
    </HabitsListContext.Provider>
  );
};

export function HabitsListScreen({ navigation }) {
  var {
    habitsList,
    renderAgain,
    setRenderAgain,
    addHabitToList,
    removeHabitFromList,
    updateHabitAtIndex,
  } = useHabitsListContext();
  const [tappedListItem, setTappedListItem] = useState(-1);

  // Runs once when the screen loads
  // Loop over every habit, determine how many days completed
  for (var index = 0; index < habitsList.length; index++) {
    var { timesDoneThisWeek, completedDays } = habitsList[index];
    for (var j = 0; j < habitsList[index].lastSevenTimesDone.length; j++) {
      var habitDay = habitsList[index].lastSevenTimesDone[j];
      const habitDate = startOfDay(parseISO(habitDay));
      const sunday = getLastSunday();
  
      const diff = differenceInDays(habitDate, sunday);
      const sundayWasBeforeOrEqual =
        isBefore(sunday, habitDate) || isSameDay(sunday, habitDate);
      if (diff < 7 && sundayWasBeforeOrEqual) {
        timesDoneThisWeek += 1;
        completedDays[dateToWeekdayName(habitDate)] = true;
      }
    }
    updateHabitAtIndex(index, {...habitsList[index], timesDoneThisWeek, completedDays})
  }

  function FlatListRow({ row, id }) {
    var countToggledDays = 0;
    for (var day in row.toggledDays) {
      countToggledDays += row.toggledDays[day] ? 1 : 0;
    }

    handleMarkButtonPress = () => {
      const currentDate = new Date();
      const day = dateToWeekdayName(currentDate);
      var {lastSevenTimesDone, allTimesDone, completedDays, timesDoneThisWeek} = habitsList[id]
      if (!completedDays[day]) {
        // Remove oldest/first element in array if it contains >= 7 dates
        if (lastSevenTimesDone.length >= 7) {
          lastSevenTimesDone.shift();
        }

        // Add current date to both arrays
        lastSevenTimesDone.push(currentDate);
        allTimesDone.push(currentDate);

        // Update completedDays, timesDoneThisWeek and re-render FlatList
        completedDays[day] = true;
        timesDoneThisWeek += 1;

      } else {
        // Remove last item from both arrays
        lastSevenTimesDone.splice(-1);
        allTimesDone.splice(-1);

        // Update completedDays, timesDoneThisWeek and re-render FlatList
        completedDays[day] = false;
        timesDoneThisWeek -= 1;
      }
      updateHabitAtIndex(id, {...habitsList[id], lastSevenTimesDone, allTimesDone, completedDays, timesDoneThisWeek})
      setRenderAgain(!renderAgain)
    };

    return (
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={100}
          onPress={() => {
            setTappedListItem(tappedListItem == id ? -1 : id);
          }}
          containerStyle={{ borderRadius: BorderRadiuses.br60 }}
        >
          <ListItem.Part left></ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[styles.border, { paddingRight: 17 }]}
          >
            <ListItem.Part row style={{ marginRight: 5 }}>
              <View
                style={{ justifyContent: "space-between", paddingLeft: 10 }}
              >
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
                    fontWeight: "bold",
                    width: 200,
                  }}
                  animationType={"scroll"}
                >
                  {row.title}
                </TextTicker>
              </View>
              <View
                style={{ justifyContent: "space-between", paddingRight: 5 }}
              >
                <Text
                  dark10
                  text70
                  style={{
                    flex: 1,
                    marginRight: 5,
                    paddingTop: 20,
                    paddingLeft: 25,
                    alignSelf: "flex-end",
                  }}
                  numberOfLines={1}
                >
                  {`${row.timesDoneThisWeek}/${countToggledDays} this week`}
                </Text>
              </View>
            </ListItem.Part>
            <ListItem.Part row>
              <SelectableChipRow
                toggledDays={row.toggledDays}
                completedDays={row.completedDays}
                handleToggleDay={() => void 0}
                fontSize={14}
                size={{ width: 1, height: 25 }}
                chipMarginHorizontal={5}
                rowMarginLeft={10}
                rowMarginTop={5}
              ></SelectableChipRow>
              <Text
                dark10
                text60
                style={{
                  // flex: 1,
                  marginRight: 10,
                  marginLeft: 15,
                  marginBottom: 25,
                  alignSelf: "flex-end",
                }}
                numberOfLines={1}
              >
                {`${format(new Date(row.timeOfDay), "h:mm aaaaa'm'")}`}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
        {tappedListItem == id && (
          <ListItem.Part
            backgroundColor={Colors.white}
            activeBackgroundColor={Colors.dark60}
            activeOpacity={0.3}
            // containerStyle={{ borderRadius: BorderRadiuses.br609}}
            style={{
              // paddingHorizontal: 100
              borderRadius: BorderRadiuses.br60,
              marginTop: 10,
              marginHorizontal: 25,
            }}
          >
            <Text
              text80
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                alignSelf: "center",
              }}
            >
              {row.description}
            </Text>
            <Text
              text70
              style={{
                paddingHorizontal: 30,
                paddingTop: 0,
                paddingBottom: 10,
                alignSelf: "center",
              }}
            >
              Times completed to date: {row.allTimesDone.length}
            </Text>
            <Button
              backgroundColor="#30B650"
              label={
                !row.completedDays[dateToWeekdayName(new Date())]
                  ? "MARK AS COMPLETED TODAY"
                  : "UN-MARK AS COMPLETED TODAY"
              }
              labelStyle={{ fontWeight: "600", fontSize: 14 }}
              style={{ marginBottom: 20 }}
              onPress={handleMarkButtonPress}
              enableShadow
              style={{ marginHorizontal: 20 }}
            />

            <Button
              backgroundColor="red"
              label="DELETE HABIT"
              labelStyle={{ fontWeight: "600" }}
              style={{ marginBottom: 20 }}
              onPress={() => {
                Alert.alert(
                  "Confirm habit deletion?",
                  "Are you sure you want to delete this habit?",
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        removeHabitFromList(id);
                      },
                    },
                    { text: "No", onPress: () => void 0, style: "cancel" },
                  ],
                  { cancelable: false }
                );
              }}
              enableShadow
              style={{ marginVertical: 10, marginHorizontal: 20 }}
            />
          </ListItem.Part>
        )}
      </View>
    );
  }

  keyExtractor = (item, index) => item.index;
  renderItem = ({ item, index }) => <FlatListRow row={item} id={index} />;

  return (
    <View
      style={{
        padding: 1,
        marginTop: 80,
        // paddingBottom: 0,
        // marginBottom: 100,
      }}
    >
      <Button
        backgroundColor="#30B650"
        label="ADD NEW HABIT"
        labelStyle={{ fontWeight: "600" }}
        style={{ marginBottom: 20 }}
        onPress={() => {
          removeHabitFromList(4);
          removeHabitFromList(3);
          removeHabitFromList(2);
          removeHabitFromList(1);
          removeHabitFromList(0);
          addHabitToList({
            title: "Walk Beatrice's dog on weekdays",
            description:
              "I want to walk Beatrice's dog on weekdays. It is a great way for me to stay active and make money!",
            toggledDays: {
              Su: false,
              M: true,
              Tu: true,
              W: true,
              Th: true,
              F: true,
              Sa: false,
            },
            completedDays: getEmptyWeekDict(),
            timesDoneThisWeek: 0,
            lastSevenTimesDone: [],
            allTimesDone: Array.from({length: 10}, () => Date()),
            timeOfDay: Date(),
          });
          addHabitToList({
            title: "Yoga",
            description:
              "I signed up for a yoga class on Tuesdays and Thursdays at the rec center. I want to improve my flexibility and also stay active, and yoga is a great way of doing both!",
            toggledDays: {
              Su: false,
              M: false,
              Tu: true,
              W: false,
              Th: true,
              F: false,
              Sa: false,
            },
            completedDays: getEmptyWeekDict(),
            timesDoneThisWeek: 0,
            lastSevenTimesDone: [],
            allTimesDone: Array.from({length: 7}, () => Date()),
            timeOfDay: Date(),
          });
          addHabitToList({
            title: "Reading",
            description:
              "I am noticing that I am not reading as much as I used to. I want to read for 30 minutes every day, preferably before bedtime. Reading is so important!",
            toggledDays: {
              Su: false,
              M: false,
              Tu: true,
              W: true,
              Th: true,
              F: false,
              Sa: false,
            },
            completedDays: getEmptyWeekDict(),
            timesDoneThisWeek: 0,
            lastSevenTimesDone: [],
            allTimesDone: Array.from({length: 4}, () => Date()),
            timeOfDay: Date(),
          });
          addHabitToList({
            title: "Biking",
            description:
              "I stopped biking for three months after my leg injury, and want to get back to it! I want to bike to work on Mondays. It will help me be active and fit!",
            toggledDays: {
              Su: false,
              M: true,
              Tu: false,
              W: false,
              Th: false,
              F: false,
              Sa: false,
            },
            completedDays: getEmptyWeekDict(),
            timesDoneThisWeek: 0,
            lastSevenTimesDone: [],
            allTimesDone: Array.from({length: 6}, () => Date()),
            timeOfDay: Date(),
          });
          addHabitToList({
            title: "Gratitude journal",
            description:
              "Lately I've found that I'm not appreciating the good things in life as much. I want to write in my gratitude journal every day!",
            toggledDays: {
              Su: true,
              M: true,
              Tu: true,
              W: true,
              Th: true,
              F: true,
              Sa: true,
            },
            completedDays: getEmptyWeekDict(),
            timesDoneThisWeek: 0,
            lastSevenTimesDone: [],
            allTimesDone: Array.from({length: 5}, () => Date()),
            timeOfDay: Date(),
          });
        }}
        enableShadow
        style={{ paddingVertical: 10, marginHorizontal: 20 }}
      />
      <FlatList
        data={habitsList}
        extraData={renderAgain}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text
                text70
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  alignSelf: "center",
                }}
              >
                No habits have been added yet.
              </Text>
            </View>
          );
        }}
        // This is critical to ensuring that last item is not cut off at bottom
        contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 10 }}
      />
    </View>
  );
}
