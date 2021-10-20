import { Alert, FlatList } from "react-native";
import {
  BorderRadiuses,
  Button,
  Colors,
  ListItem,
  Text,
  View,
} from "react-native-ui-lib";
import React, { useCallback, useState } from "react";
import { dateToWeekdayName, sampleHabitList, getLastSunday } from "./Utils";
import {
  differenceInDays,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  format,
  parse,
} from "date-fns";

import { SelectableChipRow } from "./SelectableChip";
import TextTicker from "react-native-text-ticker";
import { styles } from "../App";

import { useHabitsListContext } from "./HabitsListContext";

export function HabitsListScreen({ navigation }) {
  let {
    habitsList,
    renderAgain,
    setRenderAgain,
    addHabitToList,
    removeHabitFromList,
    removeAllHabits,
    replaceHabitAtIndex,
  } = useHabitsListContext();

  // Runs once when the screen loads
  // Loop over every habit, determine how many days completed
  if (habitsList.length > 0) {
    for (let index = 0; index < habitsList.length; index++) {
      let { timesDoneThisWeek, completedDays } = habitsList[index];
      // console.log(habitsList.length)
      // console.log(habitsList)
      // console.log(habitsList[index])
      // console.log(habitsList[index].lastTenTimesDone);
      for (let j = 0; j < habitsList[index].lastTenTimesDone.length; j++) {
        let habitDay = habitsList[index].lastTenTimesDone[j];
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
      replaceHabitAtIndex(index, {...habitsList[index], timesDoneThisWeek, completedDays})
    }
  }

  function FlatListRow({ row, id }) {
    let countToggledDays = 0;
    for (let day in row.toggledDays) {
      countToggledDays += row.toggledDays[day] ? 1 : 0;
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [rowTimesDoneThisWeek, setRowTimesDoneThisWeek] = useState(row.timesDoneThisWeek);
    const [rowTotalTimesDone, setRowTotalTimesDone] = useState(row.totalTimesDone);


    function handleMarkButtonPress(id) {
      const currentDate = new Date();
      const day = dateToWeekdayName(currentDate);
      let {lastTenTimesDone, totalTimesDone, completedDays, timesDoneThisWeek} = habitsList[id]
      if (!completedDays[day]) {
        // Remove oldest/first element in array if it contains >= 7 dates
        if (lastTenTimesDone.length >= 7) {
          lastTenTimesDone.shift();
        }
  
        // Add current date to both arrays
        lastTenTimesDone.push(currentDate);
  
        // Update completedDays, timesDoneThisWeek and re-render FlatList
        completedDays[day] = true;
        timesDoneThisWeek += 1;
        totalTimesDone += 1;
      } else {
        // Remove last item from both arrays
        lastTenTimesDone.splice(-1);
  
        // Update completedDays, timesDoneThisWeek and re-render FlatList
        completedDays[day] = false;
        timesDoneThisWeek -= 1;
        totalTimesDone -= 1;
      }
      replaceHabitAtIndex(id, {...habitsList[id], lastTenTimesDone, totalTimesDone, completedDays, timesDoneThisWeek})
      setRowTimesDoneThisWeek(timesDoneThisWeek);
      setRowTotalTimesDone(totalTimesDone)
      // setRenderAgain(!renderAgain)
    };

    return (
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <ListItem
          // @ts-expect-error
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={100}
          onPress={() => {
            // setTappedListItem(tappedListItem == id ? -1 : id);
            setDropdownOpen(!dropdownOpen);
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
                  {`${rowTimesDoneThisWeek}/${countToggledDays} this week`}
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
        {dropdownOpen && (
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
              Times completed to date: {rowTotalTimesDone}
            </Text>
            <Button
              backgroundColor="#30B650"
              label={
                !row.completedDays[dateToWeekdayName(new Date())]
                  ? "MARK AS COMPLETED TODAY"
                  : "UN-MARK AS COMPLETED"
              }
              labelStyle={{ fontWeight: "600", fontSize: 14 }}
              style={{ marginBottom: 20 }}
              onPress={() => handleMarkButtonPress(id)}
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
  const MemoizedFlatListRow = useCallback(FlatListRow)
  renderItem = ({ item, index }) => <MemoizedFlatListRow row={item} id={index} />;

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
          removeAllHabits();
          let myHabitList = sampleHabitList;
          for (let i = 0; i < myHabitList.length; i++) {
            addHabitToList(myHabitList[i]);
          }
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
