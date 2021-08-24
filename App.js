import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button, Carousel, Constants, Card, Picker} from 'react-native-ui-lib';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Colors, Typography, Spacings} from 'react-native-ui-lib';
import {ThemeManager} from 'react-native-ui-lib';
import _ from 'lodash'
import { render } from 'react-dom';

const Page = ({children, style, ...others}) => {
  return (
    <View {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};


function HomeScreen({ navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      
      <Button
        backgroundColor="#30B650"
        label="Go to GettingStarted Page"
        labelStyle={{fontWeight: '600'}}
        style={{marginBottom: 20}}
        onPress={() => navigation.navigate('GettingStarted')}
        enableShadow
      />
      <Text> </Text>
      <Button
        backgroundColor="#30B650"
        label="Go to AddHabit Page"
        labelStyle={{fontWeight: '600'}}
        style={{marginBottom: 20}}
        onPress={() => navigation.navigate('AddHabit')}
        enableShadow
      />
    </View>
  );
}



function GettingStartedScreen({ navigation}) {
  const onPagePress = (index) => {
    if (this.carousel && this.carousel.current) {
      this.carousel.current.goToPage(index, true);
    }
  };

  const renderGettingStartedCard = (cardNum) => {
    switch (cardNum) {
      case 0:
        return (
          <Card key={0} flex onPress={() => {}} useNative activeOpacity={1} activeScale={0.96} enableShadow>
            <Card.Section
              bg-red30
              padding-35
              flex-0
              content={[
                {text: 'Welcome to', text40: true, white: true},
                {text: 'HabitForce', text20: true, white: true}
              ]}
              contentStyle={{alignItems: 'flex-start'}}
            />
            <Card.Section
              white
              marginT-30
              marginL-35
              marginR-35
              marginB-10
              content={[
                {text: 'We can help you build good habits', text30: true, black: true},
              ]}
              contentStyle={{alignItems: 'flex-start', padding: 0}}
            />
          </Card>
        );
      case 1: 
      return (
        <Card key={1} flex onPress={() => {}} useNative activeOpacity={1} activeScale={0.96} enableShadow>
          <Card.Section
            bg-red30
            padding-35
            flex-0
            content={[
              {text: 'Definition', text50: true, white: true},
              {text: '\'force of habit\'', text30: true, white: true},
            ]}
            contentStyle={{alignItems: 'flex-start'}}
          />
          <Card.Section
            white
            marginT-25
            marginL-35
            marginR-35
            marginB-10
            content={[
              {text: '(phrase)', text50: true, black: true},
              {text: '', text100: true, black: true},
              {text: 'the tendency for something done very frequently to become automatic', text40: true, black: true},
            ]}
            contentStyle={{alignItems: 'flex-start', padding: 0}}
          />
        </Card>);
      case 2: 
      return (
        <Card key={2} flex onPress={() => {navigation.navigate("Home")}} useNative activeOpacity={1} activeScale={0.96} enableShadow>
          <Card.Section
            bg-red30
            padding-30
            flex-0
            content={[
              {text: 'We use regular reminders and rewards to encourage \'habit-building\' behavior', text40: true, white: true},
            ]}
            contentStyle={{alignItems: 'flex-start'}}
          />
          <Card.Section
              white
              marginT-55
              marginL-35
              marginR-35
              marginB-10
            content={[
              {text: 'Tap here to get started', text50: true, black: true},
            ]}
            contentStyle={{alignItems: 'flex-start', padding: 0}}
          />
        </Card>);
        default: 
          return renderGettingStartedCard(0);
      }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Carousel
          key={3}
          autoplay={false}
          pageWidth={Constants.windowWidth - Spacings.s5 * 2}
          itemSpacings={Spacings.s3}
          containerMarginHorizontal={Spacings.s2}
          initialPage={0}
          containerStyle={{height: Constants.windowHeight - Spacings.s10 * 9}}
          pageControlPosition={Carousel.pageControlPositions.OVER}
          pageControlProps={{onPagePress: onPagePress}}
          showCounter={false}
          allowAccessibleLayout
          useTet
        >
          {_.map([...Array(3)], (item, index) => {
            return renderGettingStartedCard(index)})}
        </Carousel>
    </View>
  );
}

function AddHabitScreen({ navigation}) {
  const [language, setLanguage] = useState('English');
  const [reminderFrequency, setReminderFrequency] = useState('daily');
  const [reminderTimes, setReminderTime] = useState([]);

  function handleChange(event) {
    setLanguage(event)

  }
  const longOptions = [
    {label: 'Arabic', value: 'Arabic'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'English', value: 'English'},
    {label: 'Italian', value: 'Italian'},]
  return (
    <View flex  style={{ flex: 10, padding: 5, alignItems: 'center', justifyContent: 'center' }}>
      <Picker
            placeholder="Favorite Language"
            value={language}
            enableModalBlur={false}
            onChange={handleChange}
            topBarProps={{title: 'Languages'}}
            style={{color: Colors.red20}}
            // showSearch
            searchPlaceholder={'Search a language'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
            // onSearchChange={value => console.warn('value', value)}
          >
            {_.map(longOptions, option => (
              <Picker.Item key={option.value} value={option} disabled={option.disabled}/>
            ))}
          </Picker>
          <Picker
            placeholder="Favorite Language"
            value={language}
            enableModalBlur={false}
            onChange={handleChange}
            topBarProps={{title: 'Languages'}}
            style={{color: Colors.red20}}
            // showSearch
            searchPlaceholder={'Search a language'}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
            // onSearchChange={value => console.warn('value', value)}
          >
            {_.map(longOptions, option => (
              <Picker.Item key={option.value} value={option} disabled={option.disabled}/>
            ))}
          </Picker>
    </View>
  )
}

/*  
  Welcome to ForceHabit.
  Def. force of habit
  the tendency for something done very frequently to become automatic.


*/

const Stack = createNativeStackNavigator();

export default function App() {
    return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{animationEnabled: true}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="GettingStarted" component={GettingStartedScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddHabit" component={AddHabitScreen} options={{headerShown: false}} />

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
    borderRadius: 8
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

ThemeManager.setComponentTheme('Button', (props, context) => {

  return {
    // this will apply a different backgroundColor
    // depends if the Button is an outline or not
    backgroundColor: props.outline ? 'black' : 'green',
    textColor : 'black',
  };
});