import React, { FC } from "react";
import styled from "styled-components/native";

interface GenresProps {
  genres: string[];
}

const Genres: FC<GenresProps> = ({ genres }) => (
  <Container>
    {genres.map((genre, i) => (
      <Genre key={`${i}:${genre}`}>
        <Text>{genre}</Text>
      </Genre>
    ))}
  </Container>
);

export default Genres;

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-vertical: 4px;
`;

const Genre = styled.View`
  padding-horizontal: 6px
  padding-vertical: 2px
  border-width: 1px
  border-radius: 14px
  border-Color: #ccc
  margin-right: 4px
  margin-bottom: 4px
`;

const Text = styled.Text`
  font-size: 9px;
  opacity: 0.4;
`;
