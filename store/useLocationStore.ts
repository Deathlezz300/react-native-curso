import {
  getCurrentLocation,
  watchCurrentPosition,
} from "@/core/actions/permissions/location/location";
import { LatLng } from "@/infraestructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
  lastKnownLocation: LatLng | null;
  userLocationList: LatLng[];
  watchSubscriptionId: LocationSubscription | null;
  getLocation: () => Promise<LatLng>;
  watchLocation: () => Promise<void>;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchSubscriptionId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();

    set({ lastKnownLocation: location });

    return location;
  },

  watchLocation: async () => {
    const { watchSubscriptionId } = get();

    if (watchSubscriptionId !== null) get().clearWatchLocation();

    const watchSubscription = await watchCurrentPosition((location) =>
      set((state) => ({
        userLocationList: [...state.userLocationList, location],
        lastKnownLocation: location,
      }))
    );

    set({ watchSubscriptionId: watchSubscription });
  },

  clearWatchLocation: () => {
    if (!get().watchSubscriptionId) return;

    get().watchSubscriptionId?.remove();

    set({ watchSubscriptionId: null });
  },
}));
