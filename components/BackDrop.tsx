import React, { FC } from "react";
import { Animated, FlatList } from "react-native";
import styled from "styled-components/native";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect } from "react-native-svg";

import { MovieType } from "../api";
import { BACKDROP_HEIGHT, height, ITEM_SIZE, width } from "../constants";

interface BackDropProps {
  movies: MovieType[];
  scrollX: Animated.Value;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BackDrop: FC<BackDropProps> = ({ movies, scrollX }) => {
  return (
    <Container>
      <FlatList<MovieType>
        data={movies}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          if (!item.backdrop) return null;
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          return (
            <StyledMaskedView
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{ transform: [{ translateX }] }}
                >
                  <Rect x="0" y="0" width={width} height={height} fill="#fff" />
                </AnimatedSvg>
              }
            >
              <StyledImage resizeMode="cover" source={{ uri: item.backdrop }} />
            </StyledMaskedView>
          );
        }}
      />
      <StyledLinearGradient colors={["transparent", "white"]} />
    </Container>
  );
};

export default BackDrop;

const StyledLinearGradient = styled(LinearGradient)`
  position: absolute;
  width: ${width}px;
  height: ${BACKDROP_HEIGHT}px;
  bottom: 0;
`;

const StyledImage = styled.Image`
  width: ${width}px;
  height: ${BACKDROP_HEIGHT}px;
  background-color: green;
`;

const StyledMaskedView = styled(MaskedView)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: green;
`;

const Container = styled.View`
  position: absolute;
  width: ${width}px;
  height: ${BACKDROP_HEIGHT}px;
`;
