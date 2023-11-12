import React, {Component} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {text: props.content || ''}; // 초기값을 props의 content로 설정
    }

    componentDidUpdate(prevProps) {
        // 에디터가 외부에서 변경된 경우, content 업데이트
        if (prevProps.content !== this.props.content) {
            this.setState({text: this.props.content});
        }
    }

    handleChange = (value) => {
        this.setState({text: value});

        // 외부에서 내용 변경을 알리기 위해 콜백 호출
        this.props.onChange(value);
    }

    render() {
        const toolbarOptions = [
            [{'header': '1'}, {'header': '2'}, {'font': []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{list: 'ordered'}, {list: 'bullet'}],
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
                    style={{height: "600px", width: "63%", marginTop: "10px", position: "absolute"}}
                    value={this.state.text}
                    onChange={this.handleChange}
                    modules={modules}
                />
            </div>
        );
    }
}

export default Editor;