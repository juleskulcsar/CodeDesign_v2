import styled from 'styled-components';

const Textarea = styled.input`
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 1em;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  background: transparent;
  color: #bfbdbc;
  text-align: left;
  :focus {
    outline: none !important;
  }
`;

export { Textarea };
