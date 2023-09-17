import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone({
  onSetFile,
  titleUpload = '',
  multiple = false,
  className,
  accept,
  icon,
  buttonUpLoad,
}: {
  // eslint-disable-next-line no-unused-vars
  onSetFile: (acceptedFiles: File[]) => void
  titleUpload?: string
  className?: string
  multiple?: boolean
  accept?: any
  icon?: any
  buttonUpLoad?: boolean
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 10) return
    onSetFile(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple,
  })

  return (
    <div
      {...getRootProps()}
      className={
        className
          ? className
          : 'w-[120px] h-[40px] bg-red-primary px-4 rounded-md text-white flex justify-center items-center cursor-pointer'
      }
    >
      {icon}
      {buttonUpLoad ? (
        <div className="w-[108px] h-10 text-sm leading-[40px] text-center bg-blue-secondary text-white rounded-md">
          Chọn file
        </div>
      ) : (
        ''
      )}
      <span>{titleUpload}</span>
      <input {...getInputProps()} />
    </div>
  )
}

export default MyDropzone
