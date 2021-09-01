import { Chip, Colors, Spacings, View } from "react-native-ui-lib";
import React, { useState } from "react";

export function SelectableChipItem(props) {

    

    var backgroundColor, borderColor, textColor, borderWidth;
    if (props.toggledDays[props.name] && props.completedDays[props.name]) {
        backgroundColor = Colors.green20;
        borderColor = Colors.green20;
        textColor = Colors.white;
    } else if (props.toggledDays[props.name]) {
        backgroundColor = Colors.white;
        borderColor = Colors.green20;
        textColor = Colors.green20;
    } else if (props.completedDays[props.name]) {
        backgroundColor = "#debb00";
        borderColor = "#debb00";
        textColor = Colors.white;
    } else {
        backgroundColor = Colors.white;
        borderColor = Colors.black;
        textColor = Colors.black;
    }

  return (
    <View>
      <Chip
        label={props.name}
        labelStyle={{
          color: textColor,
          fontSize: props.fontSize,
          paddingVertical: 3,
          paddingHorizontal: 0,
          marginHorizontal: props.chipMarginHorizontal,
        }}
        containerStyle={{
          backgroundColor: backgroundColor,
          marginLeft: Spacings.s1,
          borderColor: borderColor,
          borderWidth: 2,
        }}
        onPress={() => {
          console.log(props.name);
          props.handleToggleDay(props.name, props.formikValues);
        }}
        size={props.size}
      />
    </View>
  );
}

export function SelectableChipRow(props) {
  return (
    <View>
      <View
        row
        style={{
          marginBottom: 25,
          marginLeft: props.rowMarginLeft,
          marginTop: props.rowMarginTop,
        }}
      >
        <SelectableChipItem name={"Su"} {...props} />
        <SelectableChipItem name={"M"} {...props} />
        <SelectableChipItem name={"Tu"} {...props} />
        <SelectableChipItem name={"W"} {...props} />
        <SelectableChipItem name={"Th"} {...props} />
        <SelectableChipItem name={"F"} {...props} />
        <SelectableChipItem name={"Sa"} {...props} />
      </View>
    </View>
  );
}
