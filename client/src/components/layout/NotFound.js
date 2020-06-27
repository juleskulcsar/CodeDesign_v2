import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Paragraph, Title } from '../common/SignIn-SignUp';
import { Input } from '../common/Input';

const Container = styled.div`
  padding: 3%;
  text-align: center;
  margin: auto;
  width: 50%;
`;

const Button = styled.button`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: 20%;
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  color: #bfbdbc;
  cursor: pointer;
`;

function goBack() {
  window.history.back();
}

const NotFound = () => {
  return (
    <>
      <Container>
        <Title notFound>404</Title>
        <Paragraph className='large'>page not found</Paragraph>
        <Button onClick={goBack}>go back</Button>
      </Container>
    </>
  );
};

export default NotFound;
