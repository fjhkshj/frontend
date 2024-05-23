import React, { useState, useEffect, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import NetInfoState from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function Connectionstatus() {
  const navigation = useNavigation();
  const route = useRoute();
  const [_networkState, setNetworkState] = useState(null);
  const prevScreenRef = useRef(null);

  useEffect(() => {
    // console.log('Component rendered');
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetworkState(state);

      // Navigate based on the network state
      // console.log(state.type)
      if (state.type === "none") {
        // Navigate to NoInternet page when there is no internet connection
        navigation.navigate("NoInternet");
      } else if (prevScreenRef.current) {
        // Navigate back to the previous screen when the internet connection is restored
        navigation.navigate(prevScreenRef.current);
      }
    });

    // Unsubscribe from network state updates
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // Store the name of the previous screen in the ref
  useEffect(() => {
    prevScreenRef.current = route.name;
  }, [route.name]);

  return (
    <SafeAreaView>
      {/* You can add any UI components here if needed */}
    </SafeAreaView>
  );
}

export default Connectionstatus;
