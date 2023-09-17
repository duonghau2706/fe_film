import iconClose from '@/assets/image/iconClose.svg'
import styles from '@/common.module.scss'
import { Button, Modal } from 'antd'
const ModalPeviewTemplate = ({
  isOpen,
  setIsOpen,
  content,
  styledData,
}: {
  isOpen: boolean
  setIsOpen: any
  content: any
  styledData: any
}) => {
  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={1000}
      title={
        <div className="flex p-4 border-b-4 shadow text-black">
          <h3>Preview - Nội dung mail</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={false}
    >
      <div className="p-4 w-full">
        <div className="flex justify-start text-[16px] w-full max-h-[500px] overflow-auto">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="w-full h-full"
          />
          <style>{styledData}</style>
        </div>

        <div className="flex justify-center items-center mt-10">
          <Button
            className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-medium"
            onClick={handleCancel}
          >
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalPeviewTemplate
