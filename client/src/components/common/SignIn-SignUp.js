import styled, { css } from 'styled-components';

const H2Styled = styled.h2`
  padding: 16px 16px 16px 16px;
  /* margin-top: 35%; */
  color: #bfbdbc;
  font-size: 2em;

  @media (max-width: 450px) {
    font-size: 1.5em;
  }
`;

const Paragraph = styled.p`
  ${props =>
    props.upload
      ? css`
          margin: 8px;
        `
      : css`
          padding: 1px 16px 16px 16px;
        `}
  color: #bfbdbc;
  line-height: 1.6;

  @media (max-width: 450px) {
    display: ${props => (props.second ? 'none' : null)};
  }
`;

const Title = styled.h1`
  padding: 16px 16px 1px 16px;
  margin-top: 10%;
  /* font-size: 3em; */
  font-weight: bold;
  color: ${props => (props.notFound ? '#F16350' : 'white')};
  font-size: ${props => (props.notFound ? '6em' : '4em')};

  @media (max-width: 450px) {
    font-size: 2em;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  padding: ${props => props.filters ? null : '16px'};
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
  position: relative;
  bottom: 50px;
  /* height: 500px;
  margin-top: -90px; */
`;

const FormContainer = styled.div`
  float: left;
  width: 100%;
  max-width: 400px;
  position: relative;
  top: ${props => (props.createProfilePage ? null : '20%')};
  @media (max-width: 780px) {
    top: -70px;
  }
`;

const Container = styled.div`
  height: 100%;
`;

export {
  H2Styled,
  Paragraph,
  Title,
  Form,
  TextContainer,
  FormContainer,
  Container
};
