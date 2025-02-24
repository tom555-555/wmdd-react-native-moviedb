import "~/global.css";

import { Stack } from "expo-router";
import * as React from "react";
import { Platform } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { PortalHost } from "@rn-primitives/portal";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Movies App",
          }}
        />
      </Stack>
      <PortalHost />
    </>
  );
}

const useIsomorphicLayoutEffect = Platform.OS === "web" && typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
