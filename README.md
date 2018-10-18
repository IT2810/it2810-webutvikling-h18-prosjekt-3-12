# it2810-webutvikling-h18-prosjekt-3-gruppe--12
it2810-webutvikling-h18-prosjekt-3-gruppe--12 created by GitHub Classroom

<br>
<img src="http://folk.ntnu.no/simenul/image.jpg" width="600" height="420" >
<br>
Bruk Expo appen og naviger til prosjektet [Expo.io](https://expo.io/@ulvestad/pim). Scann QR-koden for å åpne prosjektet.
<br>
Eventuelt: Clone prosjektet. Kjør `npm start` og bruk Expo app.
<br>

## Requirements to Content and Functionality


#### Description of the product
We have chosen to make a fitness application, where the user can set themselves goals (fitness related or goals in general).

The application consists of two screens: A Stepscreen and a Goalscreen. The user can navigate between these screens with the navigator bar at the bottom of the screen.

###### Stepscreen

The application uses a pedometer module to assess how many steps the user has taken over a given time period.

The screen displays a counter for steps taken during the current session, the past day (24 hours) and the distance travelled, relating to the number of steps taken the past day. At the bottom-right part of the step counters, there is a red reset button for resetting the stored data.

There is a progressbar at the bottom of the screen, where the user can type in a desired goal (a number of steps to reach) and the progressbar will display how close they are to their goal, in relation to the colour of the bar (Green = Completed, Red = Not Completed)

###### Goalscreen

The goals are stored (using AsyncStorage) and managed by the application, in the form of a list displayed on the Goalscreen.

Each goal consist of a name, a timestamp (The date the goal was set) and a description. The description is shown by tapping the goal, allowing for a more detailed picture of what the user wants to achieve.

The user can also mark the goal as completed, making the goal crossed over for the current session, before being removed from the list after the application shuts down (Same behaviour used in Apple Reminders).

There is a green "Add new goal"-button at the bottom of the goal list. Clicking the button will take the user to a new menu, letting the user fill in information for a new goal (Inputfields for name and description, date automatically set).

#### Designchoices:

###### Navigation:

We've chosen to use the *ReactNavigation* library to navigate between the application's different screens. This was used in the basic expo template, which the application originates from. The library was easy to use and gave the desired functionality we were looking for, so there was no need to change.

The library is used for the navigation bar (at the bottom of the application window) and for moving between different screens.

###### Components:

*Goal* has been made to be it's own component, with relevant properties and render method.

Our *ProgressBar* component takes use of the React-Native-Progress/Bar component. The component renders a progress bar with desired functionality, described earlier.

We've chosen to use the react native *FlatList* component to iterate through a list of goals, stored in the GoalScreen screen. The FlatList component renders each goal as a list element, calling on the Goal component's render method, with the data stored locally as props.

The *Modal* component is used to display a goal's description, showing the full description of the goal on top of the enclosing view. This lets the user have detailed description of their goal, without having each list element being terrible big (description taking up much space). This also made integrating "complete a goal"-functionality easy, placing the "complete"-button inside the Modal component.

###### Functionality and Layout:

- We've chosen to split the application into a stepscreen and a goalscreen, as this clearly separates the different types of functionality the application provides, in an (hopefully) intuitive way.
- Once a goal has been marked as completed, it cannot be uncompleted (difficult to misclick because of Modal, the user could easily create a new, similar goal if they want to)

#### Requirements:

 - The application is a prototype, according to the description given in the assignment
 - There is functionality for adding new elements (Goal, similar in many ways to a TODO).
 - State is stored locally with AsyncStorage.
 - The application uses a pedometer, which is something outside basic react native.

## Requirements to Technology

#### React Native

- We've used expo-cli during the development of the application
- The application uses AsyncStorage to store data locally.
-We've used several 3rd party react native components like Modal and React Navigation.

#### Platform

- The application has shows desired behaviour and content in both IOS and Android

#### Git, Coding

- We've used Git actively during the development,  using issues, commits (requirements to use of Git).

## Requirements to Testing

#### Jest

We've used Jest to test our application, focusing on doing snapshot and unit testing of the different parts of the application (Different components, screens, nav bar). We systematically tested each part:

- Snapshot testing (Both deep and shallow)
- Unit testing, testing each function

Tests for each part can be found in the same folder as the part (Tests for components are found in ../Components/tests/.. )

We did however meet some significant problems while doing our testing, specifically regarding the *React Native Navigation* library. The problem is connected to trying to create an instance of one of the screens and the navigation property, usually passed by the MainTabNavigator, not resolving (We looked around a bunch, finding it to be somewhat common issue, not finding a solution for our problem though).

We also encountered a known issue with the pedometer module, https://forums.expo.io/t/pedometer-already-managing-a-googleapiclient-with-id-0-react-native-again/14644.
(Rarely causes problems, but does make the application crash sometimes, often when reloading the application in expo. Relaunching works without any problems) The issue is currently active and have no clear solution.

#### Platform

Under the development of the application we rapidly tested using the expo application, testing the application's content and behaviour on both IOS and Android mobiles. Disregarding the differences between Android and IOS (standards for how basic components look), the content and behaviour of the application is consistent on both platforms.

#### Requirments

- We did use Jest to test our application.
- We did do show and document our unit testing of the application
