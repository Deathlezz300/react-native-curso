import React from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../theme/hooks/useThemeColor";

const LogOutIconButton = () => {
  const { logout } = useAuthStore();

  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity onPress={logout}>
      <Ionicons name="log-out" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default LogOutIconButton;
