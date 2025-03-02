import { LatLng } from "@/infraestructure/interfaces/lat-lng";
import { useLocationStore } from "@/store/useLocationStore";
import React, { useEffect, useRef, useState } from "react";
import MapView, {
  MapViewProps,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import FAB from "../shared/FAB";

interface Props extends MapViewProps {
  showUserLocation?: boolean;
}

const CustomMap = ({ showsUserLocation = true, ...other }: MapViewProps) => {
  const {
    watchLocation,
    clearWatchLocation,
    lastKnownLocation,
    getLocation,
    userLocationList,
  } = useLocationStore();

  const mapRef = useRef<MapView>(null);

  const [isFollowingUser, setIsFollowingUser] = useState(true);

  const [showPolilyne, setShowPolilyne] = useState(true);

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (!lastKnownLocation || !isFollowingUser) return;

    moveCameraToUserLocation(lastKnownLocation);
  }, [lastKnownLocation, isFollowingUser]);

  const moveCameraToUserLocation = async (latLng: LatLng) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) return;

    moveCameraToUserLocation(lastKnownLocation);

    const location = await getLocation();

    moveCameraToUserLocation(location);
  };

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={mapRef}
        onTouchStart={() => setIsFollowingUser(false)}
        showsUserLocation={showsUserLocation}
        {...other}
      >
        {/* <Marker
          coordinate={{
            latitude: lastKnownLocation?.latitude as number,
            longitude: lastKnownLocation?.longitude as number,
          }}
          title="Initial Position"
          description="This is the initial position"
        /> */}
        {showPolilyne && (
          <Polyline
            coordinates={userLocationList}
            strokeColor="black"
            strokeWidth={4}
          />
        )}
      </MapView>
      <FAB
        onPress={() => setShowPolilyne(!showPolilyne)}
        icon={showPolilyne ? "eye-off-outline" : "eye-outline"}
        className="bottom-36 right-2"
      />

      <FAB
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        icon={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        className="bottom-20 right-2"
      />
      <FAB
        onPress={() => moveToCurrentLocation()}
        icon="compass-outline"
        className="bottom-5 right-2"
      />
    </>
  );
};

export default CustomMap;
