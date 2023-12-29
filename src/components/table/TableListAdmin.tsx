import { memo } from 'react'
// import { Button, Space, Table } from 'antd'
import IconEdit from '@/assets/image/icon_edit.svg'
import IconView from '@/assets/image/icon_view.svg'
import style from '@/common.module.scss'
import { URL } from '@/utils/constants'
import { renderDateStringYear } from '@/utils/helper'
import { Button, ConfigProvider, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
// import moment from 'moment'
// import IconEdit from '@/assets/image/icon_edit.svg'
// import IconDelete from '@/assets/image/icon_delete.svg'
// import IconDate from '@/assets/image/iconDate.svg'
// import {
//   ModalBase,
//   ModalEditUser,
//   ModalRecordEffortMember,
// } from '@/components/modal'
// import { useMutation, useQueryClient } from 'react-query'
// import { userApi } from '@/adapter'
// import { MESSAGE, QUERY_KEY } from '@/utils/constants'
// import { useParams } from 'react-router-dom'
// import { toast } from 'react-toastify'

const TableListAdmin = ({
  listUser,
  loading,
  currentPage,
  perPage,
  setSelectedRowKeys,
}: any) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      width: 60,
      fixed: true,
      render: (_: any, record: any, row: any) => {
        return (
          <div>
            {(perPage * (currentPage - 1) + (row + 1))?.toLocaleString()}
          </div>
        )
      },
    },
    {
      title: 'ID admin',
      dataIndex: 'id',
      align: 'center',
      width: '170px',
    },

    {
      title: 'Tên admin',
      dataIndex: 'name',
      align: 'center',
      width: '200px',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '230px',
    },

    {
      title: 'Ngày sinh',
      dataIndex: 'born',
      align: 'center',
      width: '130px',
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      align: 'center',
      width: '130px',
    },

    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      align: 'center',
      width: '200px',
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      align: 'center',
      width: '140px',
      render: (row: any, record: any) => (
        <div>{renderDateStringYear(record?.created_at, '-')}</div>
      ),
    },

    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      align: 'center',
      width: '140px',
      render: (row: any, record: any) => (
        <div>{renderDateStringYear(record?.updated_at, '-')}</div>
      ),
    },

    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space className="flex justify-center items-center">
          <Link to={`${URL.ADMIN}/view/${record.id}`}>
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconView} width={30} height={17} />}
            ></Button>
          </Link>
          <Link to={`${URL.ADMIN}/edit/${record.id}`}>
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconEdit} width={22} height={20} />}
            ></Button>
          </Link>
        </Space>
      ),
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  return (
    <div className={style.disableRrowTableCheckbox}>
      <ConfigProvider
        theme={{
          token: {
            // controlOutline: 'rgba(5, 145, 255, 0.1)',
            colorPrimary: '#1677ff',
          },

          components: {
            Table: {
              rowSelectedBg: '#e6f4ff',
              rowSelectedHoverBg: '#bae0ff',
              rowHoverBg: '#e6e6e6',
            },
          },
        }}
      >
        <Table
          className={style.disableRrowTableCheckbox}
          rowSelection={rowSelection}
          columns={columns as any}
          dataSource={listUser}
          scroll={{ x: 1200, y: 430 }}
          pagination={false}
          rowKey="id"
          rowClassName={style.removeRowSelected}
          bordered
          loading={loading}
          // refetch={refetch}
        />
      </ConfigProvider>
      {/* <ModalEditUser
        isModalOpen={isOpenEditModal}
        showModal={showModal}
        data={dataModal}
        onFinish={onUpdateUser}
      />

      <ModalBase
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        onSave={onDelete}
        header="Xác nhận"
        content="Bạn có chắc chắn muốn xóa người dùng này?"
        footer={true}
      />
      <ModalRecordEffortMember
        isOpen={openModalUpdateRecord}
        setIsOpen={setOpenModalUpdateRecord}
        initialValues={initialValues}
        onFinish={onUpdateRecord}
      /> */}
    </div>
  )
}

export default memo(TableListAdmin)
