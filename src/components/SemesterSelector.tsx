import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ScreenWidth } from "@rneui/base";

export let selected_year = "";
export let selected_sem = "";

function GeneralDetails(): React.JSX.Element {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSemester] = useState("");
  const currentYear = new Date().getFullYear();
  const ListofYears = [];
  for (let i = currentYear; i >= 2016; i--) {
    ListofYears.push({
      key: `${i}-${(i + 1) % 100}`,
      value: `${i}-${(i + 1) % 100}`
    });
  }

  const ListofSemesters = [
    { key: "All", value: "All" },
    { key: "Monsoon", value: "Monsoon" },
    { key: "Spring", value: "Spring" }
  ];

  ListofYears.unshift({ key: "Select...", value: "Select..." });

  // Update the exported variables whenever acadyear or semester changes
  useEffect(() => {
    selected_sem = selectedSem;
    selected_year = selectedYear;
  }, [selectedYear, selectedSem]);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            color: "black",
            marginLeft: ScreenWidth * 0.03
          }}
        >
          AcadYear :
        </Text>
        <View style={{ marginHorizontal: 20, width: 150 }}>
          <SelectList
            setSelected={(value: string) => {
              setSelectedYear(value);
            }}
            data={ListofYears}
            placeholder="Select..."
            search={false}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginLeft: ScreenWidth * 0.03
        }}
      >
        <Text style={{ marginVertical: 10, fontSize: 18, color: "black" }}>
          Semester :
        </Text>
        <View style={{ marginHorizontal: 20, width: 150 }}>
          <SelectList
            setSelected={(value: string) => {
              setSemester(value);
            }}
            data={ListofSemesters}
            placeholder="Select..."
            search={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default GeneralDetails;
