import React from 'react';
import ReactDOM from 'react-dom';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { Textarea } from '../common/Textarea';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

const StyledContentEditable = styled(ContentEditable)`
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
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #1c1b1a;
    background-clip: content-box;
    border: 4px solid transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #682e19;
    border-radius: 30px;
    border: 1px solid rgb(0, 0, 0);
  }
  flex: 1 0 auto;

  min-height: 300px;
  white-space: pre-wrap;
  > * {
    display: block;
  }
`;

function EditButton(props) {
  return (
    <button
      small='true'
      key={props.cmd}
      onClick={e => e.preventDefault()}
      onMouseDown={e => {
        e.preventDefault();
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: ``,
      editable: true
    };
  }
  handleChange = e => {
    this.setState({ html: e.target.value });
    this.props.updateDescription(e.target.value);
    console.log('html: ', this.state.html);
  };

  sanitizeConf = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'h3', 'h4'],
    allowedAttributes: { a: ['href'] }
  };

  sanitize = () => {
    this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
  };

  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  pastePlainText = e => {
    e.preventDefault();

    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };

  render = () => {
    return (
      <div>
        <StyledContentEditable
          onPaste={this.pastePlainText}
          tagName='pre'
          html={this.state.html} // innerHTML of the editable div
          disabled={!this.state.editable} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          onBlur={this.sanitize}
        />
        <EditButton cmd='italic' />
        <EditButton cmd='bold' />
        <EditButton cmd='formatBlock' arg='h2' name='H2' />
        <EditButton cmd='formatBlock' arg='h3' name='H3' />
      </div>
    );
  };
}
