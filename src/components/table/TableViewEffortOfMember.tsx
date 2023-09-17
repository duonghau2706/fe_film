import React, { useEffect, useMemo, useState } from 'react'
import { Table, Input, Space, Button, Form } from 'antd'
import IconPen from '@/assets/image/iconPen.svg'
import IconCancel from '@/assets/image/iconCancel.svg'
import IconConfirm from '@/assets/image/iconConfirm.svg'
import { useMutation, useQueryClient } from 'react-query'
import { userApi } from '@/adapter'
import { toast } from 'react-toastify'
import { QUERY_KEY } from '@/utils/constants'
import moment from 'moment'

const EditableTable = ({
  dataSource,
  setDataSource,
  initialValueData,
  userIds,
  loading,
  setStatus,
}: any) => {
  const client = useQueryClient()
  const [formTable] = Form.useForm<any>()
  const [editingId, setEditingId] = useState(null)

  const formatNumber = (event: any) => {
    const value = event.target.value
    event.target.value = value.replace(/[^\d\.]/g, '') // remove non-numeric characters
  }

  const columns = useMemo(
    () => [
      {
        title: <></>,
        dataIndex: 'day',
        align: 'center',
        width: '150px',
      },

      {
        title: 'Ngày',
        dataIndex: 'date',
        align: 'center',
        width: '150px',
      },

      {
        title: 'Số giờ làm',
        dataIndex: 'numberWorkHours',
        align: 'center',
        width: '200px',
        render: (text: any, record: any) => {
          if (record.id === editingId) {
            return (
              <Form.Item
                name={`numberWorkHours_${record.id}`}
                // rules={[{ required: true }]}
              >
                <Input allowClear maxLength={4} onInput={formatNumber} />
              </Form.Item>
            )
          }
          return text.toString().replace(/\.?0+$/, '')
        },
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        align: 'center',
        render: (text: any, record: any) => {
          if (record.id === editingId) {
            return (
              <Form.Item name={`note_${record.id}`}>
                <Input.TextArea
                  allowClear
                  autoSize={{ minRows: 2, maxRows: 2 }}
                />
              </Form.Item>
            )
          }

          return <div style={{ textAlign: 'left' }}>{text}</div>
        },
      },
      {
        title: 'Hành động',
        key: 'action',
        width: '200px',
        align: 'center',
        render: (text: any, record: any) => {
          if (record.id === editingId) {
            return (
              <Space className="flex justify-center items-center gap-4">
                <Button
                  className="flex items-center justify-center border-none"
                  icon={<img src={IconCancel} width={25} height={25} />}
                  onClick={() => cancelEditing(record.id)}
                ></Button>
                <Button
                  className="flex items-center justify-center border-none"
                  icon={<img src={IconConfirm} width={25} height={25} />}
                  onClick={() => saveChanges(record)}
                ></Button>
              </Space>
            )
          }
          return (
            <Space className="flex justify-center items-center">
              <Button
                className="flex items-center justify-center border-none"
                icon={<img src={IconPen} width={25} height={25} />}
                onClick={() => startEditing(record)}
              ></Button>
            </Space>
          )
        },
      },
    ],
    [dataSource, editingId]
  )

  const startEditing = (record: any) => {
    setEditingId(record.id)
  }

  const cancelEditing = (id: any) => {
    const data = [...dataSource]
    const newData = data?.map((item: any) => {
      return {
        ...item,
        numberWorkHours:
          item.id === id
            ? initialValueData.find((el: any) => el.id === id)?.numberWorkHours
            : item.numberWorkHours,
        note:
          item.id === id
            ? initialValueData.find((el: any) => el.id === id)?.note
            : item.note,
      }
    })

    setEditingId(null)
    setDataSource(newData)
  }

  const saveChanges = (record: any) => {
    const getDataInput: any = formTable.getFieldsValue([
      `numberWorkHours_${record.id}`,
      `note_${record.id}`,
    ])

    const data: any = {
      ...record,
      numberWorkHours: getDataInput?.[`numberWorkHours_${record.id}`],
      userId: record.userId ? record.userId : userIds,
      workDate: record.workDate
        ? moment(record.workDate).format('DD/MM/YYYY')
        : record.date,
      note: getDataInput?.[`note_${record.id}`],
      name: record.nameUser ? record.nameUser : null,
    }
    const { userId, workDate, note, numberWorkHours, name } = data
    const newData = { userId, workDate, note, numberWorkHours, name }
    if (!numberWorkHours) {
      return toast.error('Vui lòng nhập số giờ làm việc!')
    }
    mutationRecordWorkingTime.mutate(newData)
    setEditingId(null)
    // Save the changes to the server and update the state
  }

  const mutationRecordWorkingTime = useMutation({
    mutationFn: (params: any) => {
      return userApi.recordWorkingTime(params)
    },
    onSuccess: () => {
      toast.success('Ghi nhận thời gian làm việc thành công')
      setStatus()
      client.invalidateQueries([QUERY_KEY.VIEW_EFFORT_ALL_MEMBER])
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
      client.invalidateQueries([QUERY_KEY.VIEW_EFFORT_ALL_MEMBER])
    },
  })

  useEffect(() => {
    if (dataSource && dataSource.length !== 0) {
      dataSource?.forEach((item: any) => {
        formTable.setFieldsValue({
          [`numberWorkHours_${item.id}`]: item?.numberWorkHours
            .toString()
            .replace(/\.?0+$/, ''),
          [`note_${item.id}`]: item?.note,
        })
      })
    }
  }, [dataSource])

  return (
    <Form form={formTable}>
      <Table
        dataSource={dataSource}
        columns={columns as any}
        pagination={false}
        rowKey={'id'}
        scroll={{ x: 1200, y: 480 }}
        loading={loading}
      />
    </Form>
  )
}

export default EditableTable
