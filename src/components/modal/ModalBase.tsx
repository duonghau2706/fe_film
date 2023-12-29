import iconClose from '@/assets/image/iconClose.svg'
import { Button, Modal } from 'antd'
import styles from '@/common.module.scss'
const ModalBase = ({
  isOpen,
  setIsOpen,
  content,
  header,
  onSave,
  footer,
  disabledOnSave = true,
  loading,
}: {
  isOpen: boolean
  setIsOpen: any
  content?: any
  header?: string
  footer?: any
  onSave?: any
  disabledOnSave?: any
  loading?: any
}) => {
  const handleCancel = () => {
    setIsOpen(false)
  }
  const onFinish = () => {
    onSave()
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={footer ? 600 : 800}
      title={
        <div className="flex pt-6 pb-4 px-4 border-b-4 shadow text-black">
          <h3>{header}</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        footer ? (
          disabledOnSave ? (
            <div className="flex justify-center gap-10 pb-4">
              <Button
                className="text-black bg-white w-[100px] h-10 text-[14px] border-black font-medium"
                onClick={handleCancel}
              >
                Hủy bỏ
              </Button>
              <div className={`${styles.removeHoverBtnAntd}`}>
                <Button
                  className="text-white bg-yellow-primary w-[100px] h-10 text-[14px] font-medium"
                  onClick={onFinish}
                  loading={loading}
                >
                  Đồng ý
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-10 pb-4">
              <Button
                className="text-black bg-white w-[100px] h-10 text-sm border-black font-medium"
                onClick={handleCancel}
              >
                Hủy bỏ
              </Button>
            </div>
          )
        ) : (
          false
        )
      }
    >
      <div className="p-6 flex justify-center text-[14px]">{content}</div>
    </Modal>
  )
}

export default ModalBase
