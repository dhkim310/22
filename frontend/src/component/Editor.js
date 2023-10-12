import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange = (value) => {
    this.setState({ text: value });
  }

  render() {
    const toolbarOptions = [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image'],
    ];

    const modules = {
      toolbar: {
        container: toolbarOptions,
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    };

    return (
      <div>
        <ReactQuill
          style={{ height: "600px", width: "63%", marginTop:"10px", position: "absolute"}}
          value={this.state.text}
          onChange={this.handleChange}
          modules={modules}
        />
      </div>
    );
  }
}

export default Editor;
