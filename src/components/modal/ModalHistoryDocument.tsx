/* eslint-disable no-unused-vars */
import SalekitApi from '@/adapter/salekit'
import { QUERY_KEY } from '@/utils/constants'
import { Button, Modal } from 'antd'
import { useQuery } from 'react-query'
import { TableHistoryDocument } from '../table'
import iconClose from '@/assets/image/iconClose.svg'
import styles from '@/common.module.scss'

const ModalHistoryDocument = ({
  isOpen,
  setIsOpen,
  originId,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  originId: any
}) => {
  const { data: dataHistory } = useQuery({
    queryKey: [QUERY_KEY.GET_HISTORY_DOCUMENT, isOpen, originId],
    queryFn: () =>
      SalekitApi.getHistoryDocument({ original_document_id: originId }).then(
        (res: any) => {
          return res?.data
        }
      ),
    enabled: isOpen,
  })
  const cancel = () => {
    setIsOpen(false)
  }
  return (
    <Modal
      onCancel={cancel}
      className={`${styles.paddingModal}`}
      open={isOpen}
      closable={false}
      centered
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Lịch sử thay đổi</h3>
          <span className="ml-auto cursor-pointer" onClick={cancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={false}
      width={1100}
    >
      <div className="px-4">
        <TableHistoryDocument
          originId={originId}
          dataHistory={dataHistory}
        ></TableHistoryDocument>
      </div>
      <div className="flex justify-center items-center mt-4 p-6">
        <Button
          className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-semibold"
          onClick={cancel}
        >
          Đóng
        </Button>
      </div>
    </Modal>
  )
}

export default ModalHistoryDocument
