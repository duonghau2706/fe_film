import iconClose from '@/assets/image/iconClose.svg'
import { Button, Modal } from 'antd'
import { TableErrorSendMail } from '../table'
import styles from '@/common.module.scss'

const ModalErrorSendMail = ({
  isOpen,
  setIsOpen,
  footer,
  dataSource,
}: {
  // eslint-disable-next-line no-unused-vars
  isOpen: boolean
  setIsOpen: any
  footer?: any
  dataSource?: any
  // eslint-disable-next-line no-unused-vars
  onFinish?: (value: any) => void
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
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Xem lỗi gửi email</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        footer ? (
          <div className="gap-10 pb-4">
            <Button
              className="text-black bg-white w-[100px] h-[36px] border-black block mx-auto"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </div>
        ) : (
          false
        )
      }
    >
      {dataSource?.length !== 0 ? (
        <div className="p-6">
          <div className="mb-2 text-sm">Chi tiết :</div>
          <TableErrorSendMail dataSource={dataSource} />
        </div>
      ) : (
        ''
      )}
    </Modal>
  )
}

export default ModalErrorSendMail
