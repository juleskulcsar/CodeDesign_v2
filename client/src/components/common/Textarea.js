import styled from 'styled-components';

const Textarea = styled.textarea`
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
  resize: none;
  vertical-align: top;
  overflow-wrap: break-word;
  font-family: 'Raleway', sans-serif;
  :focus {
    outline: none !important;
  }
`;

export { Textarea };
