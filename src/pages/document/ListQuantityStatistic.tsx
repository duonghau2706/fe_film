import { Link } from 'react-router-dom'

const categories = {
  documentation: {
    type: 1,
    name: 'Loại tài liệu',
  },
  storageType: {
    type: 2,
    name: 'Loại lưu trữ',
  },
  domain: {
    type: 3,
    name: 'Domain',
  },
}

const ListQuantityStatistic = (props: any) => {
  const { typeDocument, onChangeFilter, selected, statistics } = props

  const listType = statistics?.filter((item: any) => item.type === typeDocument)

  const titleTypeDocument = (typeDocument: any) => {
    switch (typeDocument) {
      case categories.documentation.type: {
        return categories.documentation.name
      }
      case categories.storageType.type: {
        return categories.storageType.name
      }
      case categories.domain.type: {
        return categories.domain.name
      }

      default:
        return ''
    }
  }

  const getLinkType = (typeDocument: any) => {
    switch (typeDocument) {
      case categories.documentation.type: {
        return `document-type-id`
      }
      case categories.storageType.type: {
        return `storage-type-id`
      }
      case categories.domain.type: {
        return `domain-id`
      }
      default:
        return ''
    }
  }

  const handleChangeFilter = (id: string) => {
    onChangeFilter(id)
  }

  return (
    <div>
      <span className="text-[14px] font-bold text-black">
        {titleTypeDocument(typeDocument)}
      </span>
      {listType.length > 0 && (
        <ul className="list-none text-[13px] pl-[20px]">
          {listType.map((item: any, index: any) => (
            <li key={index} className="my-2 cursor-pointer">
              <Link
                to={`?${getLinkType(typeDocument)}=${item.id}`}
                className={`${
                  selected === item.id ? 'text-blue-primary' : 'text-black'
                }  hover:text-blue-primary font-normal`}
                onClick={() => handleChangeFilter(item.id)}
              >
                {item.name} ({item.quantity})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListQuantityStatistic
