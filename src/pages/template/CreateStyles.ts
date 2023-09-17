const CreateStyles: any = (editorHtmlValue: any) => {
  const alignCenter = editorHtmlValue?.includes(`class="ql-align-center"`)
  const alignRight = editorHtmlValue?.includes(`class="ql-align-right"`)
  const alignLeft = editorHtmlValue?.includes(`class="ql-align-left"`)
  const indent1 = editorHtmlValue?.includes(`class="ql-indent-1"`)
  const indent2 = editorHtmlValue?.includes(`class="ql-indent-2"`)
  const indent3 = editorHtmlValue?.includes(`class="ql-indent-3"`)
  const indent4 = editorHtmlValue?.includes(`class="ql-indent-4"`)
  const indent5 = editorHtmlValue?.includes(`class="ql-indent-5"`)
  const indent6 = editorHtmlValue?.includes(`class="ql-indent-6"`)
  const indent7 = editorHtmlValue?.includes(`class="ql-indent-7"`)
  const indent8 = editorHtmlValue?.includes(`class="ql-indent-8"`)

  // Tạo một đối tượng HTML từ chuỗi string
  const divElement = document.createElement('div')
  divElement.innerHTML = editorHtmlValue

  // Truy xuất đến phần tử li có class ql-align-center
  const liElement: any = divElement.querySelector('li.ql-align-center')

  // Nếu tìm thấy phần tử li có class ql-align-center, thêm một phần tử div mới bao quanh phần tử li này
  if (liElement && liElement.parentNode.tagName.toLowerCase() === 'ol') {
    // Thêm một phần tử div mới bao quanh phần tử ol
    const olElement = liElement.parentNode
    const divWrapper = document.createElement('div')
    divWrapper.classList.add('ql-ol-center') // Thêm class cho phần tử div
    olElement.parentNode.insertBefore(divWrapper, olElement)
    divWrapper.appendChild(olElement)
  }

  // Nếu tìm thấy phần tử li có class ql-align-center, thêm một phần tử div mới bao quanh phần tử li này
  if (liElement && liElement.parentNode.tagName.toLowerCase() === 'ul') {
    // Thêm một phần tử div mới bao quanh phần tử ol
    const ulElement = liElement.parentNode
    const divWrapper = document.createElement('div')
    divWrapper.classList.add('ql-ul-center') // Thêm class cho phần tử div
    ulElement.parentNode.insertBefore(divWrapper, ulElement)
    divWrapper.appendChild(ulElement)
  }

  // Lấy chuỗi string mới sau khi thêm phần tử div
  const newHtmlString = divElement.innerHTML

  let styledData = `<style> body {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding: 10px;
	  } 
    p {
      margin: 0
    }`

  if (alignCenter) {
    styledData += `.ql-align-center {
        text-align: center;
      }`
  }
  if (alignRight) {
    styledData += `.ql-align-right {
        text-align: right;
      }`
  }
  if (alignLeft) {
    styledData += `.ql-align-left {
        text-align: left;
      }`
  }
  if (indent1) {
    styledData += `.ql-indent-1 {
        margin-left: calc(100% - 95%);
      }`
  }
  if (indent2) {
    styledData += `.ql-indent-2 {
        margin-left: calc(100% - 90%);
      }`
  }
  if (indent3) {
    styledData += `.ql-indent-3{
        margin-left: calc(100% - 85%);
      }`
  }
  if (indent4) {
    styledData += `.ql-indent-4 {
        margin-left: calc(100% - 80%);
      }`
  }
  if (indent5) {
    styledData += `.ql-indent-5 {
        margin-left: calc(100% - 75%);
      }`
  }
  if (indent6) {
    styledData += `.ql-indent-6 {
        margin-left: calc(100% - 70%);
      }`
  }
  if (indent7) {
    styledData += `.ql-indent-7 {
        margin-left: calc(100% - 65%);
      }`
  }
  if (indent8) {
    styledData += `.ql-indent-8 {
        margin-left: calc(100% - 60%);
      }`
  }
  if (newHtmlString) {
    styledData += `.ql-ol-center {
        display: flex;
        justify-content: center;
        align-items: center;
      } .ql-ul-center{
        display: flex;
        justify-content: center;
        align-items: center;
      }`
  }

  styledData += ` </style>`
  return { styledData, newHtmlString }
}

export default CreateStyles
