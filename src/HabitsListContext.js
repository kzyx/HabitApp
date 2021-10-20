// This file contains the HabitsListContext which consists of an array of
// habits stored in this app, and contains functions that allow us to
// add, remove, and replace habits in the array.

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HabitsListContext = createContext(Array.from({ length: 0 }));
export const useHabitsListContext = () => useContext(HabitsListContext);

export const HabitsListContextProvider = ({ children }) => {
  const [habitsList, setHabitsList] = useState(Array.from({ length: 0 }));
  const [renderAgain, setRenderAgain] = useState(false);

  /**
   * Adds the habit to the end of the array
   * @param habit Habit to append to the end of the given array
   */
  const addHabitToList = (newHabit) => {
    let newList = habitsList;
    habitsList.push(newHabit);
    setHabitsList(newList);
    setRenderAgain(!renderAgain);
  };

  /**
   * Removes the habit at the given index in the array
   * @param {int} index Place in array at which the habit is to be removed
   * @throws Will throw an error if given index is out of bounds
   */
  const removeHabitFromList = (index) => {
    if (index >= 0 && index <= habitsList.length - 1) {
      let newList = habitsList;
      newList.splice(index, 1);
      setHabitsList(newList);
    } else {
      throw `Given habit to remove at index ${index} which is out of bounds`;
    }
    setRenderAgain(!renderAgain);
  };

  /**
   * Replaces the habit at the given index in the array
   * @param {int} index Place in array at which the habit is to be replaced
   * @param habit Habit that will replace the old habit
   * @throws Will throw an error if given index is out of bounds
   */
  const replaceHabitAtIndex = (index, habit) => {
    if (index >= 0 && index <= habitsList.length - 1) {
      let newList = habitsList;
      newList[index] = habit;
      setHabitsList(newList);
    } else {
      throw `Given habit to update at index ${index} which is out of bounds`;
    }
  };

  /**
   * Removes all habits in the habit list array
   */
  const removeAllHabits = () => {
    setHabitsList([]);
  };

  // Writes habit list every time it is changed
  useEffect(() => {
    if (habitsList.length !== 0) {
      AsyncStorage.setItem("HABIT_APP::HABITS_LIST", `${habitsList}`);
    }
  }, [habitsList]);

  // Loads habit list, runs on mount/dismount
  useEffect(() => {
    AsyncStorage.clear(); // TODO: Remove this
    AsyncStorage.getItem("HABIT_APP::HABITS_LIST").then((value) => {
      if (value) {
        setHabitsList(Array.from(value));
      }
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
        removeAllHabits,
        replaceHabitAtIndex,
      }}
    >
      {children}
    </HabitsListContext.Provider>
  );
};
