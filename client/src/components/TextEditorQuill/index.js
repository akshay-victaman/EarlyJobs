import ReactQuill from 'react-quill';
import React from 'react';
import 'react-quill/dist/quill.snow.css';

const EditorComponent = ({handleEditorChange, content}) => {

  const customStyles = {
    backgroundColor: 'transparent', // Custom background color
    color: '#000000', // Custom text color
    fontFamily: 'Arial, sans-serif', // Custom font family
    fontSize: '14px', // Custom font size
    border: '1px solid #EB6A4D', // Custom border style
    borderRadius: '5px', // Custom border radius
    marginBottom: '16px', // Custom margin bottom
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleEditorChange}
        placeholder='Minimum of 150 words'
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
          ],
        }}
        style={customStyles}
      />
    </div>
  );
};

export default EditorComponent;
