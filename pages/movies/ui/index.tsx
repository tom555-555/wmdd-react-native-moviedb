import { Button, Label, RadioGroup, RadioGroupItem, Text } from "~/components/ui";
import { ChevronDown, View } from "lucide-react-native";
import React, { useEffect } from "react";
import { ItemList } from "~/widget/list/ui/item-list";
import { API_ROOT, MOVIE_SEARCH_BY_MAP } from "~/shared/utils/constants";
import { fetcher } from "~/shared/utils/fetcher";
import { DrawerContext } from "~/app/context";
import { BottomDrawer } from "~/shared/ui/bottom-drawer";
import { DrawerWithSelectItems } from "~/widget/list/ui/drawer-with-select-items";

type MovieListProps = {
  tabValue: string;
};

export const MovieList = ({ tabValue }: MovieListProps) => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [movieSearchBy, setMovieSearchBy] = React.useState(MOVIE_SEARCH_BY_MAP.now_playing);
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
  const fetchMovies = async (params: { page: number; query?: string } = { page: 1 }): Promise<any> => {
    const url = new URL(API_ROOT + movieSearchBy);
    url.searchParams.set("page", params.page.toString());
    if (params.query) {
      url.searchParams.set("query", params.query);
    }
    const movies = await fetcher(url.toString());
    return movies.results;
  };

  useEffect(() => {
    console.log("currentItem", currentItem);
    if (currentItem) {
      setMovieSearchBy(currentItem);
    }
  }, [currentItem]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      const movies = await fetchMovies();
      setMovies(movies);
    })();
  }, [movieSearchBy, tabValue]);

  return (
    <>
      <Button
        className="w-64 bg-white text-black border border-gray-300 mx-auto"
        onPress={() => {
          openBottomDrawer();
        }}
      >
        <Text className="text-black">{movieSearchBy}</Text>
        <ChevronDown style={{ marginTop: "auto", marginBottom: "auto", position: "absolute", right: 0 }} className="my-auto w-4 h-4 text-black" />
      </Button>
      <ItemList items={movies} type="movie" />
      <DrawerWithSelectItems isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} currentItem={currentItem} handleSelectChange={onDrawerSelectChange} selectItems={Object.keys(MOVIE_SEARCH_BY_MAP).map((key) => ({ key, value: MOVIE_SEARCH_BY_MAP[key as keyof typeof MOVIE_SEARCH_BY_MAP] }))} />
    </>
  );
};
