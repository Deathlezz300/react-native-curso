import {
  View,
  Image,
  StyleProp,
  ImageStyle,
  ActivityIndicator,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { useAnimation } from "@/hooks/useAnimation";

interface props {
  uri: string;
  style: StyleProp<ImageStyle>;
}

const FadeInImage = ({ uri, style }: props) => {
  const [loading, setLoading] = useState(true);

  const { fadeIn, animatedOpacity } = useAnimation();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && (
        <ActivityIndicator
          size={40}
          color="grey"
          style={{ position: "absolute" }}
        />
      )}
      <Animated.Image
        source={{ uri }}
        style={[style, { opacity: animatedOpacity }]}
        onLoadEnd={() => {
          fadeIn();
          setLoading(false);
        }}
        resizeMode={"cover"}
      />
    </View>
  );
};

export default FadeInImage;
