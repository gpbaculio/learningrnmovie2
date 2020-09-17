import React from "react";
import styled from "styled-components/native";

const Loading = () => (
  <Container>
    <Text>Loading</Text>
  </Container>
);

export default Loading;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 18px
  font-weight:  bold
  text-align: center
`;
