import DocumentItem from './DocumentItem'

const ListDocument = ({ documents }: any) => {
  return (
    <div className="mr-3">
      {documents?.map((item: any) => {
        const parts = item?.fileName?.split('.')
        // Lấy phần trước và phần sau dấu chấm cuối cùng
        const beforeLastDot = parts.slice(0, -1).join('.') || item?.fileName // Phần trước dấu chấm cuối cùng
        const afterLastDot = parts.slice(-1)[0] // Phần sau dấu chấm cuối cùng
        return (
          <div key={item.id}>
            <DocumentItem
              id={item.id}
              icon={afterLastDot}
              fileType={item.documentTypeName}
              fileName={item.fileName}
              title={beforeLastDot}
              typeSave={item.storageTypeName}
              domain={item.domainName}
              subDomain={item.subDomain}
              techUsed={item.technologyUsed}
              languageDev={item.languageDevelopment}
              description={item.description}
              tags={item.hashtag}
              timeUpdated={item.updatedAt}
              userUpdated={item.updatedBy}
              name={item.name}
              originId={item.originalDocumentId}
              sharepointId={item.sharepointId}
              url={item.url}
              createdAt={item.createdAt}
              createdBy={item.createdBy}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ListDocument
