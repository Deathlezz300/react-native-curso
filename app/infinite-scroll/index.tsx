import { useThemeColor } from "@/hooks/useThemeColor";
import FadeInImage from "@/presentation/images/FadeInImage";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";

const InfiniteScrollScreen = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const primaryColor = useThemeColor({}, "primary");

  const loadMore = () => {
    const lastNumber = numbers[numbers.length - 1];
    const newNumbers = Array.from({ length: 6 }, (_, i) => i + lastNumber + 1);

    setTimeout(() => {
      setNumbers([...numbers, ...newNumbers]);
    }, 2000);
  };

  return (
    <ThemedView>
      <FlatList
        data={numbers}
        onEndReached={loadMore}
        keyExtractor={(item) => item.toString()}
        onEndReachedThreshold={0.6}
        renderItem={({ item }) => <ListItem number={item} />}
        ListFooterComponent={() => (
          <View style={{ height: 150, justifyContent: "center" }}>
            <ActivityIndicator size={40} color={primaryColor} />
          </View>
        )}
      />
    </ThemedView>
  );
};
export default InfiniteScrollScreen;

interface ListItemProps {
  number: number;
}

const ListItem = ({ number }: ListItemProps) => {
  return (
    <FadeInImage
      uri={`https://picsum.photos/id/${number}/500/400`}
      style={{
        width: "100%",
        height: 400,
      }}
    />
  );
};
