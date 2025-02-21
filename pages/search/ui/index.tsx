import { ChevronDown } from "lucide-react-native";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Input, Label } from "~/components/ui";
import { fetcher } from "~/shared/utils";
import { API_ENDPOINTS, API_ROOT, SEARCH_BY_MAP } from "~/shared/utils/constants";
import { DrawerWithSelectItems } from "~/widget/list/ui/drawer-with-select-items";
import { ItemList } from "~/widget/list/ui/item-list";

export const SearchResults = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchSearchBy, setSearchSearchBy] = React.useState(API_ENDPOINTS.SEARCH.SEARCH_MULTI);
  const [searchResults, setSearchResults] = React.useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<string>("");

  const openBottomDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onDrawerSelectChange = (value: string) => {
    setCurrentItem(value);
    setIsDrawerOpen(false);
  };

  const fetchSearchResults = async (keyword: string) => {
    const url = new URL(API_ROOT + searchSearchBy);
    url.searchParams.set("query", keyword);
    const data = await fetcher(url.toString());
    console.log(data);
    return data.results;
  };

  const executeSearch = async () => {
    const results = await fetchSearchResults(searchQuery);
    setSearchResults(results);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentItem) {
      setSearchSearchBy(currentItem);
    }
  }, [currentItem]);

  return (
    <View className="flex flex-col gap-4 align-top">
      <View className="flex flex-col gap-4 align-top">
        <Label>
          <Text>Search Movie/TV Show Name</Text>
          <Text className="text-destructive">*</Text>
        </Label>
        <Input value={searchQuery} onChangeText={setSearchQuery} />
        <View className="flex flex-row justify-center items-center gap-2">
          <Button
            className="bg-white text-black border border-gray-300 mx-auto w-1/2"
            onPress={() => {
              openBottomDrawer();
            }}
          >
            <Text className="flex flex-row justify-center items-center gap-2 text-black w-full">{searchSearchBy}</Text>
            <ChevronDown style={{ marginTop: "auto", marginBottom: "auto", position: "absolute", right: 0 }} className="my-auto w-4 h-4 text-black" />
          </Button>
          <Button onPress={executeSearch} className="w-1/2">
            <Text className="text-white">Search</Text>
          </Button>
        </View>
        <View className="flex flex-col gap-4 flex-grow">
          {searchResults.length > 0 && <ItemList items={searchResults} type="multi" />}
          {searchResults.length === 0 && <Text className="text-center">Please initiate a search</Text>}
        </View>
      </View>
      <DrawerWithSelectItems isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} currentItem={currentItem} handleSelectChange={onDrawerSelectChange} selectItems={Object.keys(SEARCH_BY_MAP).map((key) => ({ key, value: SEARCH_BY_MAP[key as keyof typeof SEARCH_BY_MAP] }))} />
    </View>
  );
};
