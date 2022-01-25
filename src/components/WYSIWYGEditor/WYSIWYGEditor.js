import {Editor} from 'react-draft-wysiwyg';
import {useController} from "react-hook-form";
import {EditorState} from "draft-js";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const WYSIWYGEditor = ({editorName, control}) => {
    const {field} = useController({
        name: `descriptions.${editorName}`,
        control,
        rules: {required: true},
        defaultValue: EditorState.createEmpty()
    });

    return (
        <Editor
            editorState={field.value}
            toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'remove', 'history'],
            }}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={field.onChange}
            onBlur={field.onBlur}
            editorStyle={{height: "200px"}}
        />
    );
};

export default WYSIWYGEditor;