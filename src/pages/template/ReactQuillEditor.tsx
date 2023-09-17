import '@/App.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import EditorToolbar, { formats, modules } from './EditorToolbar'

export const ReactQuillEditor = ({
  onChange,
  value,
  openModalPreview,
}: any) => {
  const handleChange = (value: any) => {
    if (onChange) {
      onChange(value)
    }
  }
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={'Nhập nội dung vào đây...'}
        modules={modules}
        formats={formats}
      />
      <p
        className="text-red-primary underline font-semibold text-base cursor-pointer mb-0"
        onClick={() => openModalPreview()}
      >
        Preview
      </p>
    </div>
  )
}

export default ReactQuillEditor
