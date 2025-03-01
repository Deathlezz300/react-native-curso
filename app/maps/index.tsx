import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapsScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "red",
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Initial Position"
          description="This is the initial position"
        />
      </MapView>
    </SafeAreaView>
  );
};

export default MapsScreen;
