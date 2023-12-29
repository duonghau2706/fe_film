const URL = {
  HOME: '/home',
  LOGIN: '/login',
  ACCOUNT: '/account',
  REGISTER: '/register',
  SIGNUP: '/signup',
  CHANGE_PLAN: '/change-plan',
  PLANFORM: '/signup/planform',
  PAYMENT: '/signup/payment',
  CREDIT_OPTIONS: '/signup/creditoption',
  RECHARGE: '/recharge',
  SETUP_RECHARGE: '/signup/setup-recharge',
  SETUP_PAYMENT: '/signup/setup-payment',
  SERIES_MOVIE: '/series-movie',
  SINGLE_MOVIE: 'single-movie',
  DETAIL_MOVIE: '/detail-movie',
  MANAGE: '/manage',
  WATCH: '/watch',
  USER_LIST_MOVIE: '/user-list-movie',
  MOVIE: '/movie',
  USER: '/user',
  ADMIN: '/admin',
  DASH_BOARD: '/dash-board',
  MANAGE_USER: '/manage-user',
  MANAGE_MOVIE: '/manage-movie',
  MANAGE_ADMIN: '/manage-admin',

  FORGOT_PASSWORD: '/forgotPassword',
  RESET_PASSWORD: 'resetPassword',
  lOGIN_MS_TEAMS: '/login-ms-teams',
}

const QUERY_KEY = {
  LOGIN: 'login',
  INSERT_TRANSACTION_HISTORIES: 'insert_transaction_histories',
  GET_TRANSACTION_HISTORIES_USER: 'get_transaction_histories',
  GET_INFOR_MOVIE_BY_MOVIE_ID: 'get_infor_movie_by_movie_id',
  GET_LIST_INFOR_MOVIE_BY_LIST_MOVIE_ID:
    'get_list_infor_movie_by_list_movie_id',
  GET_PROFILE_USER: 'get_profile_user',
  GET_ALL_MOVIE: 'get_all_movie',
  GET_ALL_USER: 'get_all_user',
  GET_ALL_ADMIN: 'get_all_admin',
  GET_ALL_DB: 'get_all_db',
  GET_ALL_SINGLE_MOVIE: 'get_all_single_movie',
  GET_ALL_SERIES_MOVIE: 'get_all_series_movie',
  GET_ALL_SINGLE_MOVIE_TRENDING: 'get_all_single_movie_trending',
  GET_LIST_EPISODE: 'get_list_episode',
  GET_CONTENT_BY_ID: 'get_content_by_id',
  GET_CASE_STATUS_USER: 'get_case_status_user',
  GET_REVENUE_BY_MEMBER: 'get_revenue_by_member',
  GET_ALL_USER_DB: 'get_all_user_db',
  UPDATE_STATUS_MEMBER: 'UPDATE_STATUS_MEMBER',
}

const endpoint = {
  login: '/api/v1/login/auth',
  update_account_user: '/api/v1/user/update-account',
  get_transaction_histories_user: '/api/v1/user/get-transaction-histories',
  get_user_by_email: '/api/v1/user/get-user-by-email',
  get_list_episode: '//api/v1/movie/list-episode',
  update_rate_movie: '/api/v1/movie/update-rate',
  update_view_movie: '/api/v1/movie/update-view',
  update_movie: '/api/v1/movie/update-movie',
  create_movie: '/api/v1/movie/create',
  delete_movie: '/api/v1/movie/delete',
  create_user: '/api/v1/user/create',
  update_user: '/api/v1/user/update',
  delete_user: '/api/v1/user/delete',
  get_all_db: '/api/v1/dash-board/get-all',
  get_all_user_db: '/api/v1/user/get-reveneu',
  get_list_movie_by_list_movie_id:
    '/api/v1/movie/get-list-movie-by-list-movie-id',
  get_all_movie: '/api/v1/movie/get-all',
  get_all_single_movie: '/api/v1/movie/single-movie',
  get_all_series_movie: '/api/v1/movie/series-movie',
  get_all_single_movie_trending: '/api/v1/movie/single-movie-trending',
  get_infor_movie_by_id: '/api/v1/movie/get-infor',
  add_new_account: '/api/v1/user/create-new-account',
  update_status_member: '/api/v1/user/update-status-member',

  verify_email_registered: '/api/v1/register',
  // get_revenue_by_member: '/api/v1/dash-board/get-revenue',
  get_user: '/api/v1/user/get',
  get_profile_user: '/api/v1/user/get-profile',
  get_user_pagination: '/api/v1/user/get',
  create_transaction_histories: '/api/v1/transaction-histories/create',
  get_report_pdf: '/api/v1/report/pdf',
  render_ejs_revenue: '/api/v1/render-ejs-revenue',
  render_ejs_movie: '/api/v1/render-ejs-movie',

  update_profile_user: '/api/v1/user/update-profile',
  update_list_movie_user: '/api/v1/user/update-list-movie',
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

const OPTIONS_SERVICE = [
  { value: '0', label: 'Di động' },
  { value: '1', label: 'Cơ bản' },
  { value: '2', label: 'Tiêu chuẩn' },
  { value: '3', label: 'Cao cấp' },
]

const SERVICE = [
  {
    index: 0,
    value: {
      name: 'Di động',
      cost: 70000,
      quality: 'Tốt',
      resolution: '480p',
    },
  },
  {
    index: 1,
    value: {
      name: 'Cơ bản',
      cost: 108000,
      quality: 'Tốt',
      resolution: '720p',
    },
  },
  {
    index: 2,
    value: {
      name: 'Tiêu chuẩn',
      cost: 220000,
      quality: 'Tốt hơn',
      resolution: '1080p',
    },
  },
  {
    index: 3,
    value: {
      name: 'Cao cấp',
      cost: 260000,
      quality: 'Tốt nhất',
      resolution: '4K+HDR',
    },
  },
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

const CATEGORY = [
  { name: 'HANH_DONG', value: 'Hành động' },
  { name: 'HINH_SU', value: 'Hình sự' },
  { name: 'VIEN_TUONG', value: 'Viễn tưởng' },
  { name: 'PHIEU_LUU', value: 'Phiêu lưu' },
  { name: 'BI_AN', value: 'Bí ẩn' },
  { name: 'HAI_HUOC', value: 'Hài hước' },
]

const TYPE = [
  'Hành Động',
  'Cổ Trang',
  'Chiến Tranh',
  'Viễn Tưởng',
  'Kinh Dị',
  'Tài Liệu',
  'Bí Ẩn',
  'Tình Cảm',
  'Tâm Lý',
  'Thể Thao',
  'Phiêu Lưu',
  'Âm Nhạc',
  'Hài Hước',
  'Hình Sự',
  'Võ Thuật',
  'Khoa Học',
  'Thần Thoại',
  'Chính Kịch',
]

const OPTIONS_BANKNAME = [
  { label: 'Vietcombank', value: 'Vietcombank' },
  { label: 'Techcombank', value: 'Techcombank' },
  { label: 'TPBank', value: 'TPBank' },
  { label: 'VietinBank', value: 'VietinBank' },
  { label: 'VIB', value: 'VIB' },
  { label: 'HDBank', value: 'HDBank' },
  { label: 'Agribank', value: 'Agribank' },
  { label: 'BIDV', value: 'BIDV' },
  { label: 'MBBank', value: 'MBBank' },
  { label: 'Sacombank', value: 'Sacombank' },
  { label: 'SHB', value: 'SHB' },
  { label: 'VPBank', value: 'VPBank' },
  { label: 'LienVietPostBank', value: 'LienVietPostBank' },
  { label: 'GPBank', value: 'GPBank' },
]

export {
  OPTIONS_BANKNAME,
  OPTIONS_SERVICE,
  CATEGORY,
  TYPE,
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
  SERVICE,
}
