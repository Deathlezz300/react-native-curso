import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { CameraType, useCameraPermissions, CameraView } from "expo-camera";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { useCameraStore } from "@/presentation/hooks/useCameraStore";
import * as ImagePicker from "expo-image-picker";

interface props {}

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { addSelectedImage } = useCameraStore();

  const [galleryPermission, requestGalleryPermission] =
    MediaLibrary.usePermissions();

  const primaryColor = useThemeColor({}, "primary");

  const cameraRef = useRef<CameraView>(null);

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } = await requestPermission();

      if (cameraPermissionStatus !== "granted") {
        Alert.alert("Error", "Permiso de cámara denegado");
        return;
      }

      const { status: galleryPermissionStatus } =
        await requestGalleryPermission();

      if (galleryPermissionStatus !== "granted") {
        Alert.alert("Error", "Permiso de galería denegado");
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error al solicitar permisos");
    }
  };

  if (!permission?.granted || !galleryPermission?.granted) {
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
            onPress={onRequestPermissions}
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

    setSelectedImage(picture?.uri || null);
  };

  const handleClose = () => {
    router.dismiss();
  };

  const handleGalleryButtonPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      aspect: [4, 3],
      // allowsEditing:true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (result.canceled) return;

    result.assets.forEach((asset) => {
      addSelectedImage(asset.uri);
    });

    handleClose();
  };

  const onPictureAccepted = async () => {
    if (!selectedImage) return;

    await MediaLibrary.createAssetAsync(selectedImage);

    addSelectedImage(selectedImage);

    setSelectedImage(null);

    handleClose();
  };

  if (selectedImage && typeof selectedImage === "string") {
    return (
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <TopOptions handleClose={() => setSelectedImage(null)} />

        <Image
          source={{ uri: selectedImage }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 8,
              marginRight: 20,
              backgroundColor: primaryColor,
              borderRadius: 100,
              marginBottom: 5,
            }}
            onPress={onPictureAccepted}
          >
            <Ionicons name="checkmark-outline" size={35} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <CameraView
        style={{ flex: 1, justifyContent: "space-between" }}
        facing={facing}
        ref={cameraRef}
      >
        <TopOptions handleClose={handleClose} />
        <BottomOptions
          onShutterButtonPress={onShutterButtonPress}
          toogleFacing={toogleCameraFacing}
          onGalleryButtonPress={handleGalleryButtonPress}
        />
      </CameraView>
    </ThemedView>
  );
};

interface TopOptionsProps {
  handleClose: () => void;
}

const TopOptions = ({ handleClose }: TopOptionsProps) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={handleClose}
        style={{
          padding: 10,
        }}
      >
        <Ionicons name="close-outline" size={40} color={primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

interface BottomOptionsProps {
  toogleFacing: () => void;
  onShutterButtonPress: () => void;
  onGalleryButtonPress: () => void;
}

const BottomOptions = ({
  toogleFacing,
  onShutterButtonPress,
  onGalleryButtonPress,
}: BottomOptionsProps) => {
  const primaryColor = useThemeColor({}, "primary");

  const innerSize = 50;
  const padding = 10;
  const borderWidth = 5;
  const totalSize = innerSize + padding * 2 + borderWidth * 2;

  return (
    <View
      style={{
        width: "100%",
        height: totalSize,
        marginBottom: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 40,
        alignItems: "center",
        paddingHorizontal: 40,
      }}
    >
      <TouchableOpacity
        onPress={onGalleryButtonPress}
        style={{
          alignSelf: "center",
        }}
      >
        <Ionicons name="image-outline" size={40} color={primaryColor} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
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
          alignSelf: "center",
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
