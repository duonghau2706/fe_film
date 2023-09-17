import iconClose from '@/assets/image/iconClose.svg'
import styles from '@/common.module.scss'
import { Button, Modal } from 'antd'
const ModalGuide = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: any
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
      width={600}
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Hướng dẫn</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={false}
    >
      <div className="p-6">
        <div className="flex justify-start text-[14px]">
          <div>
            <p>Các biến có thể sử dụng trong nội dung của template</p>
            <p>{`{tenkhachhang} : Tên khách hàng`}</p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <Button
            className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-semibold"
            onClick={handleCancel}
          >
            Đóng
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalGuide
