import React, { Component, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Header,
  ListItem,
  SearchBar,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import * as App from "../../App.js";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "../config/colors";
import {
  navigationFunctions,
  foo,
  profileButton,
  helloWorld,
} from "../config/utilities";
import HelloWorld from "../components/TextArea/TextArea.component";
import TopHeader from "../components/Header/Header.component";
//import MusherList from "../components/MusherList";
//import tempData from "../config/tempData";
import MyHeader from "../components/MyHeader"

// Initialize firebase
import * as firebase from "firebase";
import { firebaseConfig } from "../config/Fire";
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig); // To not re-make the app every time we save
}
const db = firebase.firestore();

function componentDidMount() {
  firebase = new Fire((error) => {
    if (error) {
      return alert("Something went wrong, you poop");
    }
  });
}

// function MyHeader() {
//   const navigation = useNavigation();
//   function handleLogOut() {
//     return navigation.navigate("WelcomeScreen");
//   }
//   function profileButton() {
//     return navigation.navigate("ProfileScreen");
//   }
//   return (
//     <Header
//       placement="right"
//       rightComponent={
//         <TouchableOpacity>
//           <Icon
//             name="user"
//             size={30}
//             color={colors.black}
//             onPress={profileButton}
//           />
//         </TouchableOpacity>
//       }
//       centerComponent={
//         <TouchableOpacity>
//           {" "}
//           <Text onPress={handleLogOut} style={{ color: colors.header }}>
//             Log out
//           </Text>
//         </TouchableOpacity>
//       }
//       containerStyle={{
//         backgroundColor: colors.background,
//         justifyContent: "space-around",
//       }}
//     />
//   );
// }

function Mushers() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [mushers, setMushers] = useState([]); // Initial empty array of users
  const navigation = useNavigation();

  useEffect(() => {
    const db = firebase
      .firestore()
      .collection("Mushers")
      .onSnapshot((querySnapshot) => {
        const mushers = [];

        querySnapshot.forEach((documentSnapshot) => {
          mushers.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setMushers(mushers);
        setLoading(false);
        console.log(mushers);
      });

    // Unsubscribe from events when no longer in use
    return () => db();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItem = ({ item }) => {
    function goToMusher() {
      return navigation.navigate("MusherScreen", {
        musherId: item.key,
        musherName: item.firstname,
        musherSurname: item.surname,
      });
    }

    return (
      <TouchableOpacity
        style={{
          height: 50,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={goToMusher}
      >
        <ListItem bottomDivider style={styles.list}>
          <ListItem.Content>
            <ListItem.Title>
              {item.firstname} {item.surname}
            </ListItem.Title>
          </ListItem.Content>
          <View styles={{ alignSelf: "flex-end" }}>
            <ListItem.Chevron />
          </View>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View styles={{ width: "100%" }}>
      <Text styles={{ width: "100%" }}>
        <FlatList data={mushers} renderItem={renderItem} />
      </Text>
    </View>
  );
}

const dataTemp = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

function MusherOverviewScreen({ navigation }) {
  function dogButton() {
    return navigation.navigate("DogOverviewScreen");
  }
  console.log(foo());

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader />
      <HelloWorld />
     

      <Card
        containerStyle={{
          alignItems: "flex-start",
          alignSelf: "center",
        }}
      >
        <View style={styles.cardTitle}>
          <View style={{ flex: 1 }}>
            <Text> </Text>
            <Card.Title> Mushers overview</Card.Title>
          </View>
          <Card.Divider />
          <TouchableOpacity
            style={{ backgroundColor: colors.primary, flex: 1 }}
          >
            <Text onPress={dogButton}> </Text>
            <Card.Title onPress={dogButton}> Dog overview </Card.Title>
          </TouchableOpacity>
        </View>

        <Card.Divider />
        <Mushers />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHight : 0, //platform specific. Setting padding to 20 if android, otherwise equal 0
    backgroundColor: colors.background,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.8,
    color: colors.secondary,
  },
  headerSquare: {
    fontSize: 24,
    alignSelf: "center",
  },
  fixToText: {
    flexDirection: "row-reverse",
    //justifyContent: "space-between",
    alignItems: "flex-end",
  },
  list: {
    alignSelf: "flex-start",
  },
  squares: {
    width: "80%",
    // height: "50%",
    flex: 1,
    backgroundColor: colors.primary,
  },
  textSquare: {
    color: "#737373",
    alignSelf: "center",
  },
});

export default MusherOverviewScreen;

//This is a test
db.collection("characters").doc("aaab").set({
  employment: "gorilla",
  outfitColor: "brown",
  specialAttack: "fireball",
});
