import React, { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography';




export default function MyEditor (props) {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  const [text, setText] = useState();
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])
  useEffect(()=>{
    props.data(text);
  },[text])
  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={(props?.placeholder)?props?.placeholder:""}
      
      onReady={editor => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        setText(data);
      }}
    />
  ) : (
      <Typography sx={{  fontSize:18 }} component="div" gutterBottom color="text.secondary">
        Editor Loading...
      </Typography>
  )
}
