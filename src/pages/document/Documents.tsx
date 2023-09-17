import FormSearchDocumentByHashtag from '@/components/form/FormSearchDocumentByHashtag'
import FormSearchDocumentByKey from '@/components/form/FormSearchDocumentByKey'
import ListDocument from './ListDocument'

import IconUpload from '@/assets/image/icon_add_doc.svg'
import { Button, Col, Pagination, Row } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import ListQuantityStatistic from './ListQuantityStatistic'
import { QUERY_KEY, URL } from '@/utils/constants'
import { documentAPI } from '@/adapter'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { cleanObj } from '@/utils/helper'

const categories = {
  documentation: 1,
  storageType: 2,
  domain: 3,
}
const Documents = () => {
  const navigate = useNavigate()
  // const params = useParams()
  const [searchParams] = useSearchParams()

  const documentTypeId = searchParams.get('document-type-id')
  const storageTypeId = searchParams.get('storage-type-id')
  const domainId = searchParams.get('domain-id')
  const tag = searchParams.get('tag')

  //Phân trang
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalRecord: 0,
    perPage: 20,
    totalPage: 0,
  })

  const [selected, setSelected] = useState<any>()

  //Tìm theo từ khóa
  const [searchByKey, setSearchByKey] = useState({
    type: 'searchAll',
    input: '',
  })

  const changePageHandler = (page: any) => {
    setPagination({ ...pagination, currentPage: page })
  }

  const showTotal = (total: any, range: any) => {
    return (
      <label>
        {`Hiển thị ${range[0]} ~ ${
          range[1]
        } trên ${total.toLocaleString()} kết quả`}
      </label>
    )
  }

  const showTotalrRecord = (total: any) => {
    // setCountDocumentSearch(total)
    return <label className="text-sm">{`Tìm thấy ${total} kết quả`}</label>
  }

  // eslint-disable-next-line no-unused-vars
  const { data: dataSearch } = useQuery(
    [
      QUERY_KEY.GET_ALL_DOCUMENT,
      documentTypeId,
      storageTypeId,
      domainId,
      searchByKey,
      pagination.currentPage,
      tag,
    ],
    async () => {
      return await documentAPI
        .getListDocuments(
          cleanObj({
            perPage: pagination.perPage,
            currentPage: pagination.currentPage,
            searchAll:
              searchByKey.type === 'searchAll' ? searchByKey.input : undefined,
            fileName:
              searchByKey.type === 'fileName' ? searchByKey.input : undefined,
            technologyUsed:
              searchByKey.type === 'technologyUsed'
                ? searchByKey.input
                : undefined,
            languageDevelopment:
              searchByKey.type == 'languageDevelopment'
                ? searchByKey.input
                : undefined,
            description:
              searchByKey.type === 'description'
                ? searchByKey.input
                : undefined,
            documentTypeId: documentTypeId,
            storageTypeId: storageTypeId,
            domainId: domainId,
            hashtag: tag,
          })
        )
        .then((res: any) => {
          const paginateDocument = res?.data?.paginate
          setPagination({
            currentPage: paginateDocument.page,
            totalRecord: paginateDocument.totalRecord,
            perPage: paginateDocument.size,
            totalPage: paginateDocument.totalPage,
          })
          return res?.data?.salekitDocument
        })
    }
  )

  const { data: statistics = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_QUANTITY_BY_TYPE, searchByKey],
    queryFn: async () => {
      const cleanObject = cleanObj({
        searchAll:
          searchByKey.type === 'searchAll' ? searchByKey.input : undefined,
        fileName:
          searchByKey.type === 'fileName' ? searchByKey.input : undefined,
        technologyUsed:
          searchByKey.type === 'technologyUsed' ? searchByKey.input : undefined,
        languageDevelopment:
          searchByKey.type == 'languageDevelopment'
            ? searchByKey.input
            : undefined,
        description:
          searchByKey.type === 'description' ? searchByKey.input : undefined,
        documentTypeId: documentTypeId,
        storageTypeId: storageTypeId,
        domainId: domainId,
        hashtag: tag,
      })
      return await documentAPI
        .getQuantityByType(cleanObject)
        .then((res: any) => res?.data)
    },
  })

  const searchDocumentByKeyHandler = (value: any) => {
    setSearchByKey({
      type: value.typeSearch,
      input: value.inputSearch ? value.inputSearch : '',
    })
  }

  const updatePaginationByKey = () => {
    setPagination({ ...pagination, currentPage: 1 })
  }

  const updatePaginationByHashtag = () => {
    setPagination({ ...pagination, currentPage: 1 })
  }
  const onChangeFilter = (values: any) => {
    setSelected(values)
  }

  return (
    <div>
      <header className="flex justify-between items-center mx-6 pt-2">
        <h1>Danh sách tài liệu</h1>
        <div className="mt-[-25px] rounded-[5px] bg-orange-secondary flex items-center px-3 py-1 h-[42px] cursor-pointer">
          <Button
            icon={
              <img src={IconUpload} alt="IconUpload" width={15} height={15} />
            }
            className="border-none bg-orange-secondary text-white font-bold text-[14px] pl-2 cursor-pointer"
            onClick={() => navigate(`${URL.UPLOAD_DOCUMENT}`)}
          >
            Upload tài liệu
          </Button>
        </div>
      </header>

      <main className="flex justify-between mx-6 mt-[-15px]">
        <Row className="w-full">
          <Col span={19}>
            <FormSearchDocumentByKey
              onSearch={searchDocumentByKeyHandler}
              updatePaginationByKey={updatePaginationByKey}
            />
            <Pagination
              current={pagination.currentPage}
              pageSize={pagination.perPage}
              showTitle
              total={pagination.totalRecord}
              onChange={changePageHandler}
              showTotal={showTotalrRecord}
              className="flex justify-between mb-2 pr-5 text-[13px]"
            />
            <ListDocument
              pagination={pagination}
              documents={dataSearch || []}
            />
            {dataSearch?.length !== 0 && (
              <Pagination
                current={pagination.currentPage}
                pageSize={pagination.perPage}
                showTitle
                total={pagination.totalRecord}
                onChange={changePageHandler}
                showTotal={showTotal}
                className="flex justify-between mb-3 pr-5 text-[13px]"
              />
            )}
          </Col>

          <Col span={5}>
            <div className="rounded-[10px] bg-[#FFFFFF] text-[#333333] px-4 pt-3 pb-4">
              <h4 className="text-[16px] font-bold">Bộ lọc</h4>
              <Link
                to={'/document'}
                className="cursor-pointer text-black font-bold hover:text-blue text-[14px]"
                onClick={() => setSelected(1)}
              >
                Tất cả
              </Link>
              <div className="mt-2">
                <ListQuantityStatistic
                  typeDocument={categories.documentation}
                  onChangeFilter={onChangeFilter}
                  selected={selected}
                  statistics={statistics}
                />
              </div>
              <div className="mt-5">
                <ListQuantityStatistic
                  typeDocument={categories.storageType}
                  onChangeFilter={onChangeFilter}
                  selected={selected}
                  statistics={statistics}
                />
              </div>
              <div className="mt-5">
                <ListQuantityStatistic
                  typeDocument={categories.domain}
                  onChangeFilter={onChangeFilter}
                  selected={selected}
                  statistics={statistics}
                />
              </div>
            </div>
            <FormSearchDocumentByHashtag
              updatePaginationByHashtag={updatePaginationByHashtag}
            />
          </Col>
        </Row>
      </main>
    </div>
  )
}

export default Documents
