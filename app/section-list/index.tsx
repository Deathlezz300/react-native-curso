import { houses } from "@/data";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { SectionList } from "react-native";

const SectionListScreen = () => {
  return (
    <ThemedView safe>
      <SectionList
        sections={houses}
        className=""
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ThemedText type="normal">{item}</ThemedText>}
        ListHeaderComponent={() => (
          <ThemedText className="font-bold mb-3" type="h1">
            Personajes
          </ThemedText>
        )}
        renderSectionHeader={({ section }) => (
          <ThemedText className="font-semibold py-2" type="h1">
            {section.title}
          </ThemedText>
        )}
        stickySectionHeadersEnabled
        ListFooterComponent={() => (
          <ThemedText className="font-semibold" type="h1">
            {" "}
            Secciones : {houses.length}{" "}
          </ThemedText>
        )}
      />
    </ThemedView>
  );
};
export default SectionListScreen;
