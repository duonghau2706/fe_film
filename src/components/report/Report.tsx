import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#b2b2b2',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderStyle: 'solid',
    borderColor: '#b2b2b2',
    borderWidth: 1,
    minHeight: 30, // Đặt chiều cao tối thiểu của ô
  },
  headerCell: {
    backgroundColor: '#f1f1f1',
    color: 'darkgrey',
    fontWeight: 'bold',
  },
})

const dataSource = [
  {
    STT: 1,
    userId: 'user02',
    userName: 'Dương Văn Hậu',
    numberOfTrans: '1',
    amountPaid: '360.000₫',
  },
  {
    STT: 2,
    userId: 'user05',
    userName: 'Trần Trung Kiên',
    numberOfTrans: '5',
    amountPaid: '1.354.000₫',
  },
  {
    STT: 3,
    userId: 'user01',
    userName: 'Đào Hải Nam',
    numberOfTrans: '3',
    amountPaid: '725.000₫',
  },
]

const TablePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Payment Requisition Report</Text>
        <View style={styles.table}>
          <View style={{ ...styles.tableRow, ...styles.headerCell }}>
            <View style={styles.tableCell}>ID thành viên</View>
            <View style={styles.tableCell}>Tên thành viên</View>
            <View style={styles.tableCell}>Số lượng giao dịch</View>
            <View style={styles.tableCell}>Số tiền thanh toán</View>
          </View>
          {dataSource.map((rowData, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              <View style={styles.tableCell}>{rowData.userId}</View>
              <View style={styles.tableCell}>{rowData.userName}</View>
              <View style={styles.tableCell}>{rowData.numberOfTrans}</View>
              <View style={styles.tableCell}>{rowData.amountPaid}</View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)

export default TablePDF
