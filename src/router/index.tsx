import ContainerBody from '@/layout/Container'
import {
  ContactInfor,
  Content,
  EditContactInfor,
  EffortOfAllMember,
  EmailManagement,
  FormCustomer,
  Home,
  InquiryManagement,
  ListContents,
  ListCustomer,
  ListCustomerResource,
  ResetPassword,
  User,
  ViewDetailHistoryOfCustomer,
  ViewEmail,
} from '@/pages'
import ImportHistories from '@/pages/customerResource/ImportHistories'
import ListCustomerOfResource from '@/pages/customerResource/ListCustomerOfResource'
import ListCustomerResponsed from '@/pages/dashBoard/Responses/ListCustomerResponsed'
import Documents from '@/pages/document/Documents'
import UploadDocument from '@/pages/document/UploadDocument'
import ViewInquiry from '@/pages/inquiry/ViewInquiry'
import { URL } from '@/utils/constants'
import { Route, Routes } from 'react-router-dom'

const Root = () => {
  return (
    <Routes>
      <Route element={<ContainerBody />}>
        <Route path="" element={<Home />} />
        <Route path={URL.USER} element={<User />} />
        <Route path={`${URL.USER}/:currentPage`} element={<User />} />
        <Route path={URL.CUSTOMER} element={<ListCustomer />} />
        <Route path={URL.FORM_CUSTOMER} element={<FormCustomer />} />
        <Route path={`${URL.FORM_CUSTOMER}/:id`} element={<FormCustomer />} />
        <Route
          path={`${URL.TEMPLATE_MANAGEMENT}/:currentPage`}
          element={<ListContents />}
        />
        <Route path={`${URL.TEMPLATE}/:id`} element={<Content />} />

        <Route
          path={`${URL.EMAIL_MANAGEMENT}/:currentPage`}
          element={<EmailManagement />}
        />
        <Route path={`${URL.EMAIL}/:id`} element={<ViewEmail />} />
        <Route
          path={`${URL.CUSTOMER_RESOURCE}`}
          element={<ListCustomerResource />}
        />
        <Route
          path={`${URL.CUSTOMER_OF_RESOURCE}/:id`}
          element={<ListCustomerOfResource />}
        />
        <Route
          path={`${URL.INQUIRY_MANAGEMENT}/:currentPage`}
          element={<InquiryManagement />}
        />
        <Route path={`${URL.INQUIRY}/:id`} element={<ViewInquiry />} />
        <Route
          path={`${URL.VIEW_HISTORY}/:id`}
          element={<ViewDetailHistoryOfCustomer />}
        />
        <Route path={URL.CONTACT_INFOR} element={<ContactInfor />} />
        <Route
          path={`${URL.CONTACT_INFOR}/:id`}
          element={<EditContactInfor />}
        />
        <Route
          path={URL.VIEW_ALL_EFFORT_MEMBER}
          element={<EffortOfAllMember />}
        />
        <Route
          path={`${URL.VIEW_HISTORIES_IMPORT_CUSTOMER}/:id`}
          element={<ImportHistories />}
        />
        <Route
          path={URL.VIEW_ALL_CUSTOMER_RESPONSED}
          element={<ListCustomerResponsed />}
        />
        <Route path={URL.DOCUMENT} element={<Documents />} />
        <Route
          path={`${URL.UPLOAD_DOCUMENT}/:id`}
          element={<UploadDocument />}
        />
        <Route path={URL.UPLOAD_DOCUMENT} element={<UploadDocument />} />
      </Route>
      <Route path={URL.RESET_PASSWORD} element={<ResetPassword />} />
    </Routes>
  )
}
export default Root
