import * as React from "react";
import { View } from "react-native";
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from "~/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { MovieList } from "~/pages/movies/ui";
import { TvShowList } from "~/pages/tv-shows/ui";
import { SearchResults } from "~/pages/search/ui";

export default function TabsScreen() {
  const [tabValue, setTabValue] = React.useState("movies");

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex align-top">
      <View className="flex justify-center align-top p-4 gap-4">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full max-w-[400px] mx-auto flex-col">
          <TabsList className="flex-row w-full h-24">
            <TabsTrigger value="movies" className="flex-1">
              <Text>Movies</Text>
            </TabsTrigger>
            <TabsTrigger value="search-results" className="flex-1">
              <Text>Search Results</Text>
            </TabsTrigger>
            <TabsTrigger value="tv-shows" className="flex-1">
              <Text>TV Shows</Text>
            </TabsTrigger>
          </TabsList>
          {/* Movies */}
          <TabsContent value="movies" className="flex-shrink flex-col gap-4">
            <MovieList tabValue={tabValue} />
          </TabsContent>
          {/* Search Results */}
          <TabsContent value="search-results" className="flex-grow flex-col gap-4">
            <SearchResults />
          </TabsContent>
          {/* TV Shows */}
          <TabsContent value="tv-shows" className="flex-shrink flex-col gap-4">
            <TvShowList tabValue={tabValue} />
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
