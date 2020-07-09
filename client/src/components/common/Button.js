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
      ${props =>
        props.bttnLight
          ? css`
              /* background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%); */
              background-color: #bfbdbc;
              border-radius: 6px;
              border: 1px solid #383734;
              display: inline-block;
              cursor: pointer;
              color: #666666;
              font-size: 1rem;
              /* padding: 0.25rem 1.3rem; */
              text-decoration: none;
              transition: opacity 0.2s ease-in;
              outline: none;
              :hover {
                background: #f16350;
                border-color: #f16350;
              }
            `
          : css``}
`;

export { Button };
