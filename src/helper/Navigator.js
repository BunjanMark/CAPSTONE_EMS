// import { View, Text, ActivityIndicator } from "react-native";
// import React, { useContext, useEffect } from "react";
// import { LogBox } from "react-native";
// import { AuthContext } from "../services/authContext";

// // stacks
// import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Register from "../screens/authentication/Register";
// import Login from "../screens/authentication/Login";
// import AccountRecovery from "../screens/authentication/AccountRecovery";
// import Landing from "../screens/authentication/Landing";

// import GuestLanding from "../screens/authentication/GuestLanding";

// // Admin Stack here
// import Index from "../screens/admin/Index";

// // Customer Stack here
// import TabNav from "../screens/customerScreens/TabNav";
// import InboxView from "../screens/customerScreens/message/InboxView";
// import ConvoView from "../screens/customerScreens/message/ConvoView";
// import Notification from "../screens/customerScreens/notification/Notifications";
// import SelectContactView from "../screens/customerScreens/message/SelectContactView";
// import ProfileSwitcher from "../screens/customerScreens/screens/ProfileSwitcher";
// import EventDetails from "../screens/customerScreens/otherScreens/EventDetails";
// import CreateAnotherAccount from "../screens/customerScreens/otherScreens/CreateAnotherAccount";
// import ProfileOrganizer from "../screens/customerScreens/otherScreens/ProfileOrganizer";
// import Package from "../screens/customerScreens/otherScreens/Package";
// import CustomizePackage from "../screens/customerScreens/otherScreens/CustomizePackage";

// // import Feedback from "../screens/customerScreens/otherScreens/Feedback";

// // Service Provider Stack here
// import ServiceProviderIndex from "../screens/serviceProvidersScreen/ServiceProviderIndex";

// // Guest Stack here

// // Profile switcher screen
// import { ProfileContext } from "../services/profileContext";
// import Venue from "../screens/customerScreens/otherScreens/Venue";
// const Stack = createNativeStackNavigator();

// const AuthenticationStack = () => {
//   LogBox.ignoreAllLogs();
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <ActivityIndicator />;
//   }
//   if (loading) {
//     return <ActivityIndicator />; // A screen or component to show while loading
//   }
//   return (
//     <Stack.Navigator
//       initialRouteName={
//         user
//           ? user.role_id === 2
//             ? "CustomCustomerStack"
//             : "OrganizerStack"
//           : "Landing"
//       }
//     >
//       <Stack.Screen
//         name="Landing"
//         component={Landing}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Register"
//         component={Register}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="AccountRecovery"
//         component={AccountRecovery}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CustomCustomerStack"
//         component={CustomCustomerStack}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="AdminStack"
//         component={AdminStack}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// // AdminStack
// function AdminStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="AdminStack"
//         component={Index}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// // ServiceProvider StacK

// function ServiceProviderStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="ServiceProviderIndex"
//         component={ServiceProviderIndex}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

// // CustomerStack
// function CustomerStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="TabNav"
//         component={TabNav}
//         options={{ headerShown: false }}
//       />

//       {/* Profile Switcher */}

//       <Stack.Screen
//         name="InboxView"
//         component={InboxView}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ConvoView"
//         component={ConvoView}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ProfileSwitcher"
//         component={ProfileSwitcher}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SelectContactView"
//         component={SelectContactView}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen
//         name="Notification"
//         component={Notification}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="EventDetails"
//         component={EventDetails}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CreateAnotherAccount"
//         component={CreateAnotherAccount}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ProfileOrganizer"
//         component={ProfileOrganizer}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Package"
//         component={Package}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CustomizePackage"
//         component={CustomizePackage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Venue"
//         component={Venue}
//         options={{ headerShown: false }}
//       />
//       {/* <Stack.Screen
//           name="Feedback"
//           component={Feedback}
//           options={{ headerShown: false }}
//         /> */}
//     </Stack.Navigator>
//   );
// }

// // function CustomCustomerStack() {
// //   LogBox.ignoreAllLogs();
// //   const { profiles, activeProfile, switchProfile, loading } =
// //     useContext(ProfileContext);

// //   if (loading) {
// //     return <ActivityIndicator />;
// //   }
// //   if (loading) {
// //     return <ActivityIndicator />; // A screen or component to show while loading
// //   }
// //   return (
// //     <Stack.Navigator
// //       initialRouteName={
// //         profiles.id === 5 ? "ServiceProviderStack" : "CustomerStack" //to be change to default ID
// //       }
// //       // screenOptions={{ headerShown: profiles.id === 3 ? false : true }}
// //     >
// //       <Stack.Screen
// //         name="ServiceProviderStack"
// //         component={ServiceProviderStack}
// //       />
// //       <Stack.Screen name="CustomerStack" component={CustomerStack} />
// //     </Stack.Navigator>
// //   );
// // }
// const CustomCustomerStack = () => {
//   LogBox.ignoreAllLogs();
//   const { profiles, loading } = useContext(ProfileContext);
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (!loading) {
//       if (profiles.id !== 3) {
//         navigation.navigate("ServiceProviderStack");
//         navigation.reset({
//           index: 0,
//           routes: [{ name: "ServiceProviderStack" }],
//         });
//       } else {
//         navigation.navigate("CustomerStack");
//         navigation.reset({
//           index: 0,
//           routes: [{ name: "CustomerStack" }],
//         });
//       }
//     }
//   }, [profiles.id, loading, navigation]);

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <Stack.Navigator
//       initialRouteName={
//         profiles.id === 5 ? "ServiceProviderStack" : "CustomerStack"
//       }
//     >
//       <Stack.Screen
//         name="ServiceProviderStack"
//         component={ServiceProviderStack}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CustomerStack"
//         component={CustomerStack}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
// export default function Navigator() {
//   return <AuthenticationStack />;
// }
// // export default Navigator;






import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { LogBox } from "react-native";
import { AuthContext } from "../services/authContext";

// stacks
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Authentication
import Register from "../screens/authentication/Register";
import Register2 from "../screens/authentication/Register2";
import Login from "../screens/authentication/Login";
import AccountRecovery from "../screens/authentication/AccountRecovery";
import Landing from "../screens/authentication/Landing";

import GuestLanding from "../screens/authentication/GuestLanding";

// Admin Stack here
// import Index from "../screens/admin/Index";

// Customer Stack here
import TabNav from "../screens/customerScreens/TabNav";
import InboxView from "../screens/customerScreens/message/InboxView";
import ConvoView from "../screens/customerScreens/message/ConvoView";
import NotifView from "../screens/customerScreens/notification/NotifView";
import Notification from "../screens/customerScreens/notification/Notifications";
import SelectContactView from "../screens/customerScreens/message/SelectContactView";
import Guest from "../screens/customerScreens/sidebarScreens/Guest"
import EditProfile from "../screens/customerScreens/otherScreens/EditProfile";
import InventoryTracker from "../screens/customerScreens/sidebarScreens/InventoryTracker";
import Schedule from "../screens/customerScreens/sidebarScreens/Schedule";
import Settings from "../screens/customerScreens/sidebarScreens/Settings";
import EventDetails from "../screens/customerScreens/otherScreens/EventDetails";
import CreateAnotherAccount from "../screens/customerScreens/otherScreens/CreateAnotherAccount";
import ProfileOrganizer from "../screens/customerScreens/otherScreens/ProfileOrganizer";
import About from "../screens/customerScreens/sidebarScreens/About";
import Package from "../screens/customerScreens/otherScreens/Package";
import CustomizePackage from "../screens/customerScreens/otherScreens/CustomizePackage";
import Venue from "../screens/customerScreens/otherScreens/Venue";
import BookingContinuation2 from "../screens/customerScreens/otherScreens/BookingContinuation2";
import BookingContinuation3 from "../screens/customerScreens/otherScreens/BookingContinuation3";
import BookingContinuation4 from "../screens/customerScreens/otherScreens/BookingContinuation4";
import Attendee from "../screens/customerScreens/otherScreens/Attendee";
import Feedback from "../screens/customerScreens/otherScreens/Feedback";
import Profile from "../screens/customerScreens/screens/Profile";
import EventPackage from "../screens/customerScreens/otherScreens/EventPackage";

// Guest Stack here

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestLanding"
          component={GuestLanding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register2"
          component={Register2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountRecovery"
          component={AccountRecovery}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Guest"
            component={Guest}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="InventoryTracker"
            component={InventoryTracker}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InboxView"
          component={InboxView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConvoView"
          component={ConvoView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotifView"
          component={NotifView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectContactView"
          component={SelectContactView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAnotherAccount"
          component={CreateAnotherAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileOrganizer"
          component={ProfileOrganizer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Package"
          component={Package}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomizePackage"
          component={CustomizePackage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Venue"
          component={Venue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingContinuation2"
          component={BookingContinuation2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingContinuation3"
          component={BookingContinuation3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingContinuation4"
          component={BookingContinuation4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Attendee"
          component={Attendee}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EventPackage"
          component={EventPackage}
          options={{ headerShown: false }}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
