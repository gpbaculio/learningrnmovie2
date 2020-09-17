import React, { FC } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const r = [...Array(filledStars).fill("star"), ...maxStars];
  return (
    <Container>
      <Text>{rating}</Text>
      {r.map((type, index) => (
        <AntDesign key={index} name={type} size={12} color="tomato" />
      ))}
    </Container>
  );
};

export default Rating;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 4px;
`;

const Text = styled.Text`
  margin-right: 4;
  font-family: Menlo;
  font-size: 14px;
`;
