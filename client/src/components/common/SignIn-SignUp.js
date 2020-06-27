import styled from 'styled-components';

const H2_Styled = styled.h2`
  padding: 16px 16px 16px 16px;
  margin-top: 35%;
  color: #bfbdbc;
  font-size: 2em;
`;

const Paragraph = styled.p`
  padding: 1px 16px 16px 16px;
  color: #bfbdbc;
  line-height: 1.6;
`;

const Title = styled.h1`
  padding: 16px 16px 1px 16px;
  margin-top: 10%;
  font-size: 3em;
  font-weight: bold;
  color: ${props => (props.notFound ? '#F16350' : 'white')};
  font-size: ${props => (props.notFound ? '6em' : '4em')};
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  box-sizing: border-box;
  color: gray;
  border-radius: 4px;
`;

const TextContainer = styled.div`
  padding: 3%;
  width: 100%;
  max-width: 400px;
  float: right;
  text-align: left;
  height: 500px;
  margin-top: -90px;
`;

const FormContainer = styled.div`
  float: left;
  width: 100%;
  max-width: 400px;
`;

export { H2_Styled, Paragraph, Title, Form, TextContainer, FormContainer };
