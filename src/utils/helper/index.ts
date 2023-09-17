interface ICleanObject {
  label: string
  value: string
}

type CleanObjectArray = ICleanObject[]

const cleanObj = (obj: any) => {
  const newObj = { ...obj }
  for (const propName in newObj) {
    if (
      newObj[propName] === null ||
      newObj[propName] === undefined ||
      newObj[propName] === ''
    ) {
      delete newObj[propName]
    }
  }
  return newObj
}

const handleCurrentPage: any = (paramCurrent: number, paramPerPage: number) => {
  return ((paramCurrent - 1) * paramPerPage + 1)?.toLocaleString()
}

const handleCurrentPageNew = (
  totalRecord: any,
  currentPage: number,
  perPage: number
) => {
  const numberItemPage = perPage + +handleCurrentPage(currentPage, perPage) - 1
  if (totalRecord && numberItemPage < totalRecord) return numberItemPage
  return totalRecord?.toLocaleString()
}

const cleanObject = (listData: CleanObjectArray) => {
  // Xóa các bản ghi có giá trị null và ''
  const filteredData = listData.filter(
    (item: any) =>
      item.label !== null &&
      item.value !== null &&
      item.label !== '' &&
      item.value !== ''
  )

  // Xóa các bản ghi trùng nhau
  const uniqueData = filteredData.filter(
    (item: any, index: any, self: any) =>
      index ===
      self.findIndex(
        (t: any) => t.label === item.label && t.value === item.value
      )
  )
  return uniqueData
}

const renderCompanySize = (value: string) => {
  switch (value) {
    case '0':
      return 'Nhỏ'
    case '1':
      return 'Trung bình'
    case '2':
      return 'To'
    default:
      return
  }
}
const renderFrequencyOfEmail = (value: string) => {
  switch (value) {
    case '1':
      return 'Hàng tuần'
    case '2':
      return 'Hàng tháng'
    case '3':
      return '2 tháng/lần'
    case '4':
      return '3 tháng/lần'
    case '5':
      return '6 tháng/lần'
    default:
      return
  }
}
const renderResonBlackList = (value: string) => {
  switch (value) {
    case '1':
      return 'Lỗi (HP,địa chỉ email)'
    case '2':
      return 'Kotowari (từ chối nhận liên lạc)'
    case '3':
      return 'Có thể khai thác lại'
    case '4':
      return 'Công ty đối thủ'
    case '5':
      return 'Không thuộc đối tượng (size quá nhỏ, công ty trung gian,.v..v)'
    case '6':
      return 'Others'
    default:
      return
  }
}
const renderTypeOfCustomer = (value: string) => {
  switch (value) {
    case '1':
      return 'Normal'
    case '2':
      return 'Black list'
    case '3':
      return 'Special'
    default:
      return
  }
}

export {
  cleanObj,
  handleCurrentPage,
  handleCurrentPageNew,
  cleanObject,
  renderCompanySize,
  renderFrequencyOfEmail,
  renderResonBlackList,
  renderTypeOfCustomer,
}
