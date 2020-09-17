import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { getMovies } from "./api";

import { Loading } from "./components";
interface EmptySpace {
  key: "empty-left" | "empty-right";
}
function App() {
  const [movies, setMovies] = React.useState<
    (EmptySpace | ResponseType)[] | []
  >([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }] as (
        | EmptySpace
        | ResponseType
      )[]);
    };

    if (!movies.length) {
      fetchData();
    }
  }, [movies]);

  if (!movies.length) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
