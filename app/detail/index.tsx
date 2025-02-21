import { Stack, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { View, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { API_ENDPOINTS, API_ROOT, IMAGE_ROOT } from "~/shared/utils/constants";
import { fetcher } from "~/shared/utils/fetcher";

export default function DetailScreen() {
  const { id, mediaType } = useLocalSearchParams();
  const [detail, setDetail] = React.useState<Movie | TvShow | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const fetchDetail = async () => {
    const url = `${API_ROOT}${mediaType === "movie" ? API_ENDPOINTS.GET_MOVIE_DETAIL(id as string) : API_ENDPOINTS.GET_TV_SHOW_DETAIL(id as string)}`;
    const response = await fetcher(url);
    setDetail(response);
    setIsLoading(false);
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    fetchDetail();
    console.log(id, mediaType);
  }, [id, mediaType]);

  if (isLoading || !detail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex justify-center align-top max-w-lg mx-auto">
      <View className="flex flex-coljustify-between w-11/12 mx-auto">
        {detail && <Text className="text-xl my-8 font-bold text-center">{"title" in detail ? detail.title : detail.name}</Text>}
        <Stack.Screen
          options={{
            title: "title" in detail ? detail?.title : detail?.name,
          }}
        />
        <Image source={{ uri: `${IMAGE_ROOT}${detail?.poster_path}` }} className="aspect-square w-2/3 mx-auto" />
        <Text className="text-md my-8">{detail?.overview}</Text>
        <Text className="text-md">{`Popularity: ${detail?.popularity} | Release Date: ${"release_date" in detail ? detail?.release_date : detail?.first_air_date}`}</Text>
      </View>
    </View>
  );
}
