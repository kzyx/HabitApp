
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
  
  // class Habit {
  //   constructor(
  //     title,
  //     description,
  //     toggledDays,
  //     numberOfTimesDone,
  //     timesDone
  //   ) {
  //     this.title = title;
  //     this.description = description;
  //     this.toggledDays = toggledDays;
  //     this.numberOfTimesDone = numberOfTimesDone;
  //     this.timesDone = timesDone;
  //   }
  // }
  









  
//   function handleDailyPress() {
//     // Case 1: Daily was previously selected. Ensure correct color.
//     if (reminderFrequency == "Daily") {
//       setDailyColor(Colors.green20);
//       setWeeklyColor(Colors.white);
//     }

//     // Case 2: Weekly was previously selected. Switch to daily.
//     else if (reminderFrequency == "Weekly") {
//       setReminderFrequency("Daily");
//       setDailyColor(Colors.green20);
//       setWeeklyColor(Colors.white);
//     }
//     console.log("handled daily");
//   }

//   function handleWeeklyPress(event) {
//     // Case 1: Weekly was previously selected. Ensure correct color.
//     if (reminderFrequency == "Daily") {
//       setDailyColor(Colors.white);
//       setWeeklyColor(Colors.green20);
//     }

//     // Case 2: Daily was previously selected. Switch to daily.
//     else if (reminderFrequency == "Daily") {
//       setReminderFrequency("Weekly");
//       setDailyColor(Colors.white);
//       setWeeklyColor(Colors.green20);
//     }
//     console.log("handled weekly");
//   }

//   const longOptions = [
//     { label: "Arabic", value: "Arabic" },
//     { label: "Spanish", value: "Spanish" },
//     { label: "English", value: "English" },
//     { label: "Italian", value: "Italian" },
//   ];
