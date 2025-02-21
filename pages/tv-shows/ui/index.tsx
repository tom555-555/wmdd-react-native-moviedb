import { ItemList } from "~/widget/list/ui/item-list";
import { Text, Button } from "~/components/ui";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect } from "react";
import { fetcher } from "~/shared/utils/fetcher";
import { API_ROOT, TV_SHOW_SEARCH_BY_MAP } from "~/shared/utils/constants";
import { DrawerWithSelectItems } from "~/widget/list/ui/drawer-with-select-items";

type TvShowListProps = {
  tabValue: string;
};

export const TvShowList = ({ tabValue }: TvShowListProps) => {
  const [tvShows, setTvShows] = React.useState<TvShow[]>([]);
  const [tvShowSearchBy, setTvShowSearchBy] = React.useState(TV_SHOW_SEARCH_BY_MAP.popular);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<string>("");
  const openBottomDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onDrawerSelectChange = (value: string) => {
    setCurrentItem(value);
    setIsDrawerOpen(false);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const fetchTvShows = async (params: { page: number; query?: string } = { page: 1 }): Promise<any> => {
    const url = new URL(API_ROOT + tvShowSearchBy);
    url.searchParams.set("page", params.page.toString());
    if (params.query) {
      url.searchParams.set("query", params.query);
    }
    const tvShows = await fetcher(url.toString());
    return tvShows.results;
  };

  useEffect(() => {
    if (currentItem) {
      setTvShowSearchBy(currentItem);
    }
  }, [currentItem]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      const tvShows = await fetchTvShows();
      setTvShows(tvShows);
    })();
  }, [tvShowSearchBy, tabValue]);

  return (
    <>
      <Button
        className="flex w-80 bg-white text-black border border-gray-300 mx-auto"
        onPress={() => {
          openBottomDrawer();
        }}
      >
        <Text className="text-black">{tvShowSearchBy}</Text>
        <ChevronDown style={{ marginTop: "auto", marginBottom: "auto", position: "absolute", right: 0 }} className="my-auto w-4 h-4 text-black" />
      </Button>
      <ItemList items={tvShows} type="tv" />
      <DrawerWithSelectItems isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} currentItem={currentItem} handleSelectChange={onDrawerSelectChange} selectItems={Object.keys(TV_SHOW_SEARCH_BY_MAP).map((key) => ({ key, value: TV_SHOW_SEARCH_BY_MAP[key as keyof typeof TV_SHOW_SEARCH_BY_MAP] }))} />
    </>
  );
};
