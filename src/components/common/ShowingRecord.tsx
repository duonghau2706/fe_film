const ShowingRecord = ({
  dataSource,
  currentPage,
  totalRecord,
  perPage,
}: {
  dataSource: any[]
  currentPage: number
  totalRecord: number
  perPage: number
}) => {
  return (
    <span className="text-[14px]">
      Hiển thị {currentPage == 1 ? 1 : (currentPage - 1) * perPage + 1}~
      {currentPage == 1
        ? dataSource?.length
        : perPage * currentPage - perPage + dataSource.length}{' '}
      trên {totalRecord} bản ghi
    </span>
  )
}

export default ShowingRecord
