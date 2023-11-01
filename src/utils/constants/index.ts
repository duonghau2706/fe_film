const URL = {
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgotPassword',
  RESET_PASSWORD: 'resetPassword',
  lOGIN_MS_TEAMS: '/login-ms-teams',
}

const QUERY_KEY = {
  LOGIN: 'login',
  GET_CONTENT_BY_ID: 'get_content_by_id',
  GET_CASE_STATUS_USER: 'get_case_status_user',
}

const endpoint = {
  login: 'api/v1/login/auth',
  get_customer: '/api/v1/customer/get-all',
  create_customer: '/api/v1/customer/create',
  update_customer: '/api/v1/customer/update',
  delete_customer: '/api/v1/customer/delete',
  create_by_excel: '/api/v1/customer/create-by-excel',
  assign_customer_by_user: '/api/v1/customer/upadte-customer-by-user',
  update_frequency_by_email: '/api/v1/customer/update-frequency-by-email',
  pregnancy_status_sending: '/api/v1/customer/update-status-sending',
  customer_get_by_id: '/api/v1/customer/get-by-id',
  view_history_by_customer: '/api/v1/customer/view-detail-history',
  update_status_response: '/api/v1/send-mail/update',
  check_name_exist_customer: '/api/v1/customer/check-import-name-customer',
  search_customer_by_elastic_search: '/api/v1/customer/search-elasticsearch',
  search_content: '/api/v1/template/find-all',
  create_content: '/api/v1/template/create',
  update_content: '/api/v1/template/update',
  find_content_by_id: '/api/v1/template/find-by-id',
  delete_content: '/api/v1/template/delete-by-id',
  change_status_content: '/api/v1/template/change-status',
  get_user: '/api/v1/user/get',
  get_user_pagination: '/api/v1/user/get',
  create_user: '',
  update_user: '/api/v1/user/update',
  delete_user: '/api/v1/user/delete',
  record_working_time: '/api/v1/user/record-working-time',
  view_all_effort_of_member: '/api/v1/user/view_all_effort_of_member',
  send_mail: '/api/v1/send-mail//customers',
  update_response: '/api/v1/send-mail/update-response',
  get_email_response: '/api/v1/email/find-by-id',
  get_email_history: '/api/v1/send-mail/get-all',
  get_email_by_id: '/api/v1/send-mail/find-by-id',
  create_customer_resource: '/api/v1/customer-resource/create',
  update_customer_resource: '/api/v1/customer-resource/update',
  delete_customer_resource: '/api/v1/customer-resource/delete-by-id',
  get_all_customer_resource: '/api/v1/customer-resource/find-all',
  get_all_customer_of_resource:
    '/api/v1/customer-resource/get-customer-of-resource',
  get_all_history_send_mail: '/api/v1/customer-resource/get-history-send-mail',
  get_all_inquiry: '/api/v1/inquiry/get-all',
  get_inquiry_by_id: '/api/v1/inquiry/find-by-id',
  get_all_customer_sent:
    '/api/v1/customer-resource/get-customer-of-resource-sent',
  get_contact_infor: '/api/v1/contact-infor/get',
  update_contact_infor: '/api/v1/contact-infor/update',
  find_by_id_contact_infor: '/api/v1/contact-infor/find-by-id',
  view_histories_import_customer:
    '/api/v1/customer-resource/get-history-import-customer',
  view_detail_histories_import_customer:
    '/api/v1/customer-resource/get-detail-history-import-customer',
  get_by_date_case: '/api/v1/dash-board/get-by-date-case',
  get_by_date_response: '/api/v1/dash-board/get-by-date-response',
  get_all_customer_resource_responsed:
    '/api/v1/dash-board/view-all-customer-responsed',
  case_status: '/api/v1/dash-board/get-total',
  case_resource: '/api/v1/dash-board/liststatus',
  case_resource_user: '/api/v1/dash-board/liststatususer',
  case_performance: '/api/v1/dash-board/listuser',
  case_list_user: '/api/v1/dash-board/listuserid',
  case_list_user_id: '/api/v1/dash-board/listuserflow',
  get_quantity_document_by_type: '/api/v1/salekit/get-quantity',
  get_all_document: '/api/v1/salekit/get',
  list_document_resource: '/api/v1/salekit/get-document-resource',
  upload_file_url: '/api/v1/upload-file-share-point',
  create_url_file: '/api/v1/salekit/create',
  get_document_by_id: '/api/v1/salekit/get-by-id',
  document_file_categories: '/api/v1/salekit/get-categoties',
  update_document_by_id: '/api/v1/salekit/update',
  delete_document: '/api/v1/salekit/delete',
  get_history_document: '/api/v1/salekit/get-history',
  download_document: '/api/v1/sharepoint/download-file',
}

const getFolderCustomer = [
  {
    value: 1,
    label: 'All',
  },
  {
    value: 2,
    label: 'Du học',
  },
  {
    value: 3,
    label: 'IT',
  },
  {
    value: 4,
    label: 'Solution',
  },
  {
    value: 5,
    label: 'ELearning',
  },
]

const displayOptions = [
  { value: '10', label: '10' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '500', label: '500' },
  { value: '1000', label: '1000' },
]

const statusTemplate = [
  { value: '1', label: 'Đang hoạt động' },
  { value: '0', label: 'Không hoạt động' },
]

const typeTemplate = [
  { value: '1', label: 'Mail' },
  { value: '2', label: 'Web' },
  { value: '3', label: 'Linkedin' },
]
const getGender = [
  { value: 0, label: 'Nam' },
  { value: 1, label: 'Nữ' },
  { value: 2, label: 'Khác' },
]
const responseEmail = [
  { value: '1', label: 'Metting' },
  { value: '2', label: 'Từ chối' },
  { value: '3', label: 'Hẹn lần sau' },
  { value: '4', label: 'Chào hàng' },
  { value: '5', label: 'Trả lời tự động' },
]

const type = [
  { value: '2', label: 'Tất cả' },
  { value: '0', label: 'Non-IT' },
  { value: '1', label: 'IT' },
  { value: '3', label: 'Khách hàng chưa có Loại' },
]

const sizeCompany = [
  { value: '4', label: 'Tất cả' },
  { value: '0', label: 'Nhỏ' },
  { value: '1', label: 'Trung bình' },
  { value: '2', label: 'To' },
  { value: '3', label: 'Chưa có size công ty' },
]

const statusResponse = [
  { value: '0', label: 'Không phản hồi' },
  { value: '1', label: 'Đã phản hồi' },
]

const typeCustomer = [
  { value: '0', label: 'Tất cả' },
  { value: '1', label: 'Normal' },
  { value: '2', label: 'Black list' },
  { value: '3', label: 'Special' },
  { value: '4', label: 'Chưa phân loại KH' },
]

const frequencyOfCustomer = [
  { value: '1', label: 'Hàng tuần' },
  { value: '2', label: 'Hàng tháng' },
  { value: '3', label: '2 tháng/lần' },
  { value: '4', label: '3 tháng/lần' },
  { value: '5', label: '6 tháng/lần' },
]

const ROLE = [
  { value: 0, label: 'Quản trị viên' },
  { value: 1, label: 'Nhân viên kinh doanh' },
  { value: 2, label: 'Cộng tác viên' },
]

const NOTE = [
  { value: '1', label: 'Lỗi (HP,địa chỉ email)' },
  {
    value: '2',
    label: 'Kotowari (từ chối nhận liên lạc)',
  },
  { value: '3', label: 'Có thể khai thác lại' },
  { value: '4', label: 'Công ty đối thủ' },
  {
    value: '5',
    label: 'Không thuộc đối tượng (size quá nhỏ, công ty trung gian,.v..v)',
  },
  { value: '6', label: 'Others' },
]

const typeOfSend = [
  { value: 1, label: 'Gửi mail' },
  { value: 2, label: 'Gửi Inquiry' },
]

const statusSend = [
  { value: 0, label: 'Đã gửi' },
  { value: 2, label: 'Gửi lỗi' },
]

const statusSending = [
  { value: 0, label: 'Đã gửi' },
  { value: 1, label: 'Chưa gửi' },
  { value: 2, label: 'Gửi lỗi' },
]

const STATUS_FEEDBACK = [
  { value: '0', label: 'Không phản hồi' },
  { value: '1', label: 'Đã phản hồi' },
]

const MESSAGE = {
  SUCESS: {
    DOCUMENT: {
      CREATE: 'Thêm mới tài liệu thành công',
      UPDATE: 'Cập nhật tài liệu thành công',
      DELETE: 'Xóa tài liệu thành công',
    },
    CUSTOMER_FOLDER: {
      CREATE: 'Thêm mới thành công',
      UPDATE: 'Cập nhật thành công',
      DELETE: 'Xóa thành công',
      ASSIGN: 'Assign thành công',
    },
    CUSTOMER_FIELD: {
      CREATE: 'Thêm mới thành công',
      UPDATE: 'Cập nhật thành công',
      DELETE: 'Xóa thành công',
      UPDATE_STATUS: 'Cập nhật thành công',
    },
    CUSTOMER: {
      CREATE: 'Thêm mới thành công',
      UPDATE: 'Cập nhật thành công',
      DELETE: 'Xóa thành công',
      UPDATE_STATUS: 'Cập nhật trạng thái thành công',
      UPDATE_STATUS_ACTIVE: 'Active đã hoàn thành',
      UPDATE_STATUS_INACTIVE: 'Inactive đã hoàn thành',
      UPLOAD_IMAGE: 'Up load image successful',
      UPLOAD_FILES: 'Up load files successful',
      CREATE_BY_EXCEL: 'Thêm mới Excel thành công',
      ASSIGN_CUSTOMER: 'Assign khách hàng thành công',
      FREQUENCY_CUSTOMER: 'Cập nhật tần suất gửi mail thành công',
    },
    CUSTOMER_FILE: {
      CREATE: 'Thêm mới thành công',
      UPDATE: 'Cập nhật thành công',
      DELETE: 'Xóa thành công',
      UPDATE_STATUS: 'Cập nhật thành công',
    },
    LOGIN: {
      FORGET_PASSWORD: 'Lấy lại mật khẩu thành công',
      CHANGE_PASSWORD: 'Thay đổi mật khẩu thành công',
    },
    USER: {
      CREATE: 'Thêm mới người dùng thành công',
      UPDATE: 'Cập nhật người dùng thành công',
      UPDATE_STATUS: 'Cập nhật trạng thái thành công',
      DELETE: 'Xóa người dùng thành công',
    },

    CONTENT: {
      CREATE: 'Tạo mới template thành công',
      UPDATE: 'Cập nhật template thành công',
      DELETE: 'Xóa template thành công',
      CHANGE_STATUS: 'Thay đổi trạng thái template thành công',
    },
    SENDMAIL: {
      UPDATE_RESPONSE: 'Cập nhật phản hồi thành công',
    },
    CUSTOMER_RESOURCE: {
      CREATE: 'Thêm mới nguồn khách hàng thành công',
      UPDATE: 'Cập nhật nguồn khách hàng thành công',
      DELETE: 'Xóa nguồn khách hàng thành công',
    },
    CONTACT_INFOR: {
      UPDATE: 'Cập nhật thông tin liên hệ thành công',
    },
  },
  ERROR: {
    CUSTOMER_FOLDER: {
      CREATE: 'Thêm mới thất bại',
      UPDATE: 'Cập nhật thất bại',
      DELETE: 'Xóa thất bại',
      UPDATE_STATUS: 'cập nhật thất bại',
    },
    CUSTOMER_FIELD: {
      CREATE: 'Thêm mới thất bại',
      UPDATE: 'Cập nhật thất bại',
      DELETE: 'Xóa thất bại',
      UPDATE_STATUS: 'cập nhật thất bại',
    },
    CUSTOMER: {
      CREATE: 'Thêm khách hàng thất bại',
      UPDATE: 'Cập nhật khách hàng thất bại',
      DELETE: 'Xóa khách hàng thất bại',
      UPDATE_STATUS: 'Cập nhật trạng thái khách hàng thất bại',
      CREATE_BY_EXCEL: 'Tạo excel thất bại',
      ASSIGN: 'Assign khách hàng thất bại',
      NOT_SELECT: 'Vui lòng chọn khách hàng !',
    },
    LOGIN: {
      CHANGE_PASSWORD: 'Sai mật khẩu hiện tại',
    },
    COMMON: 'Có lỗi xảy ra, hãy thử lại!',
    FILES: 'Kích thước file phải bé hơn 100MB',
    SEND_EMAIL: {
      DO_NOT_SELECT_CUSTOMER: 'Bạn chưa chọn khách hàng cần gửi email',
    },
    SHAREPOINT: {
      DOWNLOAD: 'Tài liệu không tồn tại trên sharepoint',
    },
  },
  USER: {
    HEADER_DELETE: 'Bạn chắc chắn muốn xóa người dùng này?',
    HEADER_ACTIVE: 'Bạn chắc chắn muốn active người dùng này?',
    HEADER_INACTIVE: 'Bạn chắc chắn muốn Inactive người dùng này?',
  },
}

const DATE_DMY = 'DD/MM/YYYY'

export {
  URL,
  QUERY_KEY,
  endpoint,
  getFolderCustomer,
  getGender,
  MESSAGE,
  displayOptions,
  statusTemplate,
  typeTemplate,
  DATE_DMY,
  responseEmail,
  type,
  sizeCompany,
  typeCustomer,
  frequencyOfCustomer,
  statusResponse,
  ROLE,
  NOTE,
  statusSend,
  typeOfSend,
  STATUS_FEEDBACK,
  statusSending,
}
