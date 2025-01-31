import { items, Slide } from "@/data";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { FlatList, Image, useWindowDimensions } from "react-native";

const SlidesScreen = () => {
  return (
    <ThemedView>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.title} ${index}`}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
      />
      <ThemedButton
        text="Siguiente"
        className="absolute bottom-10 right-5 w-[150px]"
      />
    </ThemedView>
  );
};
export default SlidesScreen;

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <ThemedView
      className="flex-1 rounded p-10 justify-center bg-red-500"
      style={{
        width,
      }}
    >
      <Image
        source={item.img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: "center",
          alignSelf: "center",
        }}
      />

      <ThemedText
        type="h1"
        className="text-light-primary dark:text-dark-primary"
      >
        {item?.title}
      </ThemedText>
      <ThemedText className="mt-10">{item?.desc}</ThemedText>
    </ThemedView>
  );
};
