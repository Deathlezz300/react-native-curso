import { PermissionStatus } from "@/infraestructure/interfaces";
import { usePermissionsStore } from "@/store/usePermissions";
import { router } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";

const PermissionCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANDTED) {
      router.replace("/maps");
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace("/permissions");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });

    return () => subscription.remove();
  }, [locationStatus]);

  return <>{children}</>;
};

export default PermissionCheckerProvider;
