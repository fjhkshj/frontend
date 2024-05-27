import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import HIMESSAGE from "./components/HiMessage";
import CourseTable from "./components/CourseTable";
import { userType } from "../../backend_requests/UserDetails";

import * as types from "../../custom-types";
import { entries, ItemList } from "../../constants/DashboardContent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  icon_container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-evenly",
    backgroundColor: "#FAFAFA",
    paddingBottom: 20,
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },

  parent_section: {
    width: 37,
    height: 37,
    marginLeft: 5,
    marginBottom: 0,
  },

  parent_title: {
    fontSize: 24,
    marginLeft: 10,
    color: "#000000", // TODO: use theme wise color
  },

  children_section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 15,
    width: 35,
    height: 35,
    overflow: "hidden",
    marginLeft: 0,
  },
});

function Dashboard({
  _route,
  navigation,
}: types.DashboardScreenProps): React.JSX.Element {
  const renderHeading = (name: string, icon: ImageSourcePropType) => {
    return (
      <SafeAreaView style={styles.heading} key={name}>
        <SafeAreaView>
          <Image
            source={icon}
            resizeMode="contain"
            style={styles.parent_section}
          />
        </SafeAreaView>
        <Text style={styles.parent_title}>{name}</Text>
      </SafeAreaView>
    );
  };

  const renderRow = (
    name: string,
    icon: ImageSourcePropType,
    target: string,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(target)}
        key={target}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={icon}
            resizeMode="contain"
            style={styles.children_section}
          />
          <Text style={{ marginTop: 7, color: "#000000" }}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRows = (itemList: ItemList) => {
    const itemEntries = Object.entries(itemList);
    const chunkedItems = [];

    // Group items by pairs
    for (let i = 0; i < itemEntries.length; i += 2) {
      chunkedItems.push(itemEntries.slice(i, i + 2));
    }

    return chunkedItems.map((chunk, chunkIndex) => (
      <SafeAreaView key={`chunk-${chunkIndex}`} style={styles.icon_container}>
        {chunk.map(
          ([name, { icon, target, access }]) =>
            access.includes(userType) && renderRow(name, icon, target),
        )}
      </SafeAreaView>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HIMESSAGE />
        {Object.entries(entries).map(([heading, { icon, itemList }]) => [
          renderHeading(heading, icon),
          renderRows(itemList),
        ])}
      </ScrollView>
      <CourseTable />
    </SafeAreaView>
  );
}

export default Dashboard;
