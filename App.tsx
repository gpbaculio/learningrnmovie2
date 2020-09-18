import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

import { BackDrop, Genres, Loading, Rating } from "./components";
import { FAKE_ITEM_SPACE, ITEM_SIZE, SPACING } from "./constants";
import { getMovies, MovieType } from "./api";

export interface FakeSpace {
  key: "left:empty-space" | "right:empty-space";
}

function App() {
  const [movies, setMovies] = useState<(FakeSpace | MovieType)[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([
        { key: "left:empty-space" },
        ...movies,
        { key: "right:empty-space" },
      ]);
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
      <BackDrop {...{ movies: movies as MovieType[], scrollX }} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate={0}
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }: { item: MovieType; index: number }) => {
          if (!item.poster) return <FakeMovieSpace />;
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });
          return (
            <MovieContainer>
              <MovieInfo style={{ transform: [{ translateY }] }}>
                <PosterImage resizeMode="cover" source={{ uri: item.poster }} />
                <Title numberOfLines={1}>{item.title}</Title>
                <Rating rating={item.rating} />
                <Genres genres={item.genres} />
                <Description numberOfLines={3}>{item.description}</Description>
              </MovieInfo>
            </MovieContainer>
          );
        }}
      />
    </Container>
  );
}

export default App;

const FakeMovieSpace = styled.View`
  width: ${FAKE_ITEM_SPACE}px;
`;

const PosterImage = styled.Image`
  width: 100%;
  height: ${ITEM_SIZE * 1.2}px;
  border-radius: 24px;
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
`;
const MovieInfo = styled(Animated.View)`
  margin-horizontal: ${SPACING}px;
  padding: ${SPACING * 2}px;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 34px;
`;
