import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  opacity: 0.8;
`;

const Icon = styled.span`
  margin-left: 10px;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

const Link = ({ url, text, icon }) => (
  <a href={url} target="_blank" rel="noreferrer">
    <Container>
      <Icon>
        <FontAwesomeIcon icon={icon} />
        <Text>{text}</Text>
      </Icon>
    </Container>
  </a>
);

export default Link;
