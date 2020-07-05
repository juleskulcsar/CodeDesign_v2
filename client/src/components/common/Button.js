import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: ${props => (props.deleteAccount ? null : '100%')};
  box-sizing: border-box;
  height: 40px;
  background: transparent;
  cursor: pointer;
  color: gray;
  :focus {
    outline: none !important;
  }
  :hover {
    color: #ad4d2a;
  }
  ${props =>
    props.small
      ? css`
          width: fit-content;
        `
      : css`
          width: 100%;
        `}
  ${props =>
    props.noBorder
      ? css`
          border: 1px solid transparent;
        `
      : css`
          border: 1px solid gray;
        `}
  ${props =>
    props.floatRight
      ? css`
          float: right;
        `
      : null}
`;

export { Button };
