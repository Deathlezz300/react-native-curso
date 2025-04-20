import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { CameraType, useCameraPermissions, CameraView } from "expo-camera";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

interface props {}

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");

  const cameraRef = useRef<CameraView>(null);

  if (!permission?.granted) {
    return (
      <ThemedView
        style={{
          flex: 1,
        }}
      >
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 10,
            marginHorizontal: 10,
          }}
        >
          <ThemedText
            type="subtitle"
            style={{ textAlign: "center", marginHorizontal: 10 }}
          >
            Para acceder a esta funcionalidad es necesario permitir el acceso a
            la cámara
          </ThemedText>
          <ThemedButton
            onPress={requestPermission}
            style={{
              marginHorizontal: 10,
              width: "90%",
            }}
          >
            Solicitar permiso
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    );
  }

  const toogleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const onShutterButtonPress = async () => {
    if (!cameraRef?.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    console.log(picture);
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <CameraView
        style={{ flex: 1, justifyContent: "flex-end" }}
        facing={facing}
        ref={cameraRef}
      >
        <BottomOptions
          onShutterButtonPress={onShutterButtonPress}
          toogleFacing={toogleCameraFacing}
        />
      </CameraView>
    </ThemedView>
  );
};

interface BottomOptionsProps {
  toogleFacing: () => void;
  onShutterButtonPress: () => void;
}

const BottomOptions = ({
  toogleFacing,
  onShutterButtonPress,
}: BottomOptionsProps) => {
  const primaryColor = useThemeColor({}, "primary");

  const innerSize = 50;
  const padding = 10;
  const borderWidth = 5;
  const totalSize = innerSize + padding * 2 + borderWidth * 2;
  const halfSize = totalSize / 2;
  const gap = 30;

  return (
    <View
      style={{
        width: "100%",
        height: totalSize,
        marginBottom: 30,
        position: "relative",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: [{ translateX: -halfSize }],
          padding,
          borderWidth,
          borderRadius: totalSize / 2,
          borderStyle: "solid",
          borderColor: primaryColor,
          width: totalSize,
          height: totalSize,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onShutterButtonPress}
      >
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: primaryColor,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toogleFacing}
        style={{
          position: "absolute",
          top: (totalSize - 40) / 2,
          left: "50%",
          transform: [{ translateX: halfSize + gap }],
        }}
      >
        <Ionicons
          name="camera-reverse-outline"
          size={40}
          color={primaryColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
