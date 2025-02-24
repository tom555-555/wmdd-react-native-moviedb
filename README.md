## How to start

1. copy the env file

```
cp .env.example .env
```

2. put TMDB API key value in .env file since the credentials needs to be kept secret.
   In this case, please put the key owned by the marker.

```.env
MOVIE_DB_API_KEY=<put your TMDB API key here>
```

3. install dependencies

```
pnpm i
```

4. start the app using **Expo Go**
   **Make sure your android and iOS simulator is connecting to the internet.**

```
pnpm ios
pnpm android
```

\*\* Please turn off a VPN otherwise your simulator can not reach the resource

## What I used:

- Expo Router for navigation
- NativeWind for styling
- React Native Reusables for UI library
