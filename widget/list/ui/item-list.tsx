import * as React from "react";
import { View, Image, FlatList, Text } from "react-native";
import { Link } from "expo-router";

type ItemListProps = {
  items: Movie[] | TvShow[];
  type: "movie" | "tv" | "multi";
};

export const ItemList = ({ items, type }: ItemListProps) => {
  return (
    <FlatList
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      data={items as any[]}
      contentContainerStyle={{ gap: 15 }}
      renderItem={({ item }) => (
        <View className="flex flex-row w-full" key={item.id} style={{ gap: 15 }}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} className="relative aspect-square h-40" />
          <View className="flex-1">
            <Text className="text-lg font-bold">{"title" in item ? item.title : item.name}</Text>
            <Text className="text-sm text-gray-500">{"release_date" in item ? item.release_date : item.first_air_date}</Text>
            <Text className="text-sm text-gray-500">Popularity: {item.popularity}</Text>

            {type !== "multi" && (
              <Link className="w-full bg-turquoise rounded-md text-center py-2 text-white" href={`/detail?id=${item.id}&mediaType=${type}`}>
                <Text className="text-white font-bold">View Details</Text>
              </Link>
            )}
            {type === "multi" && (
              <Link className="w-full bg-turquoise rounded-md text-center py-2 text-white" href={`/detail?id=${item.id}&mediaType=${item.media_type}`}>
                <Text className="text-white font-bold">View Details</Text>
              </Link>
            )}
          </View>
        </View>
      )}
    />
  );
};
