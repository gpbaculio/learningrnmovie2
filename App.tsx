import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, FlatList, Image } from "react-native";
import styled from "styled-components/native";

import { Genres, Loading, Rating } from "./components";
import { ITEM_SIZE, SPACING } from "./constants";
import { getMovies, MovieType } from "./api";

function App() {
  const [movies, setMovies] = React.useState<MovieType[] | []>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([...movies]);
    };

    if (!movies.length) {
      fetchData();
    }
  }, [movies]);

  if (!movies.length) {
    return <Loading />;
  }
  return (
    <Container>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => (
          <MovieContainer>
            <PosterImage resizeMode="cover" source={{ uri: item.poster }} />
            <Title numberOfLines={1}>{item.title}</Title>
            <Rating rating={item.rating} />
            <Genres genres={item.genres} />
            <Description numberOfLines={3}>{item.description}</Description>
          </MovieContainer>
        )}
      />
    </Container>
  );
}

export default App;

const PosterImage = styled.Image`
  width: 100%;
  height: ${ITEM_SIZE * 1.2}px;
  border-radius: 24px;
  margin: 0;
  margin-bottom: 10px;
  background-color: red;
`;

const Description = styled.Text`
  font-size: 12px;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const Container = styled.View`
  flex: 1;
`;

const MovieContainer = styled.View`
  width: ${ITEM_SIZE}px;
  margin-horizontal: ${SPACING}px;
  padding: ${SPACING * 2}px;
  align-items: center;
  background-color: #fff;
  border-radius: 34px;
`;
