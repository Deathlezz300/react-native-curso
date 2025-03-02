import CustomMap from "@/presentation/components/maps/CustomMap";
import { useLocationStore } from "@/store/useLocationStore";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MapsScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
     if(!lastKnownLocation) getLocation();
  }, []);

  if (!lastKnownLocation) return <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" />
  </View>;

  return (
    <SafeAreaView className="flex-1">
      <CustomMap
        initialRegion={{
          latitude: lastKnownLocation?.latitude as number,
          longitude: lastKnownLocation?.longitude as number,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsPointsOfInterest={true}
        showsMyLocationButton={true}
      />
    </SafeAreaView>
  );
};

export default MapsScreen;
