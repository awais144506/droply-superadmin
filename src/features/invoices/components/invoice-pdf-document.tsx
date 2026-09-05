import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Create styles specifically for the PDF renderer
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#334155" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40, borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingBottom: 20 },
  logoWrapper: { flexDirection: "column" },
  logoText: { fontSize: 16, fontWeight: "bold", color: "#0f172a", marginBottom: 4 },
  subText: { fontSize: 10, color: "#64748b" },
  title: { fontSize: 28, fontWeight: "bold", color: "#e2e8f0", textTransform: "uppercase", marginBottom: 8, textAlign: "right" },
  billedTo: { marginBottom: 30 },
  billedTitle: { fontSize: 10, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8, fontWeight: "bold" },
  tenantName: { fontSize: 14, fontWeight: "bold", color: "#0f172a" },
  table: { width: "100%", marginBottom: 30 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e2e8f0", backgroundColor: "#f8fafc", padding: 8 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#f1f5f9", padding: 8 },
  colDesc: { flex: 1 },
  colQty: { width: 50, textAlign: "center" },
  colRate: { width: 70, textAlign: "right" },
  colAmt: { width: 80, textAlign: "right", fontWeight: "bold", color: "#0f172a" },
  totals: { alignSelf: "flex-end", width: 200, borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 10 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  finalTotal: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#f1f5f9", fontSize: 14, fontWeight: "bold", color: "#0f172a" },
  footer: { position: "absolute", bottom: 40, left: 40, right: 40, textAlign: "center", borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 20 }
});

export const InvoicePDFDocument = ({ invoice }: { invoice: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>Droply Technologies</Text>
          <Text style={styles.subText}>Main IT Hub, Sahiwal, Punjab</Text>
          <Text style={styles.subText}>billing@droply.com</Text>
        </View>
        <View>
          <Text style={styles.title}>Invoice</Text>
          <Text style={{ textAlign: "right", marginBottom: 2 }}>Invoice No: {invoice.invoiceNo}</Text>
          <Text style={{ textAlign: "right", marginBottom: 2 }}>Date Issued: {invoice.issueDate}</Text>
          <Text style={{ textAlign: "right" }}>Due Date: {invoice.dueDate}</Text>
        </View>
      </View>

      {/* Billed To */}
      <View style={styles.billedTo}>
        <Text style={styles.billedTitle}>Billed To</Text>
        <Text style={styles.tenantName}>{invoice.tenant.name} ({invoice.tenant.branchCode})</Text>
        <Text style={{ marginTop: 4 }}>Attn: {invoice.tenant.owner}</Text>
        <Text>{invoice.tenant.address}</Text>
        <Text>{invoice.tenant.phone}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colRate}>Rate (Rs)</Text>
          <Text style={styles.colAmt}>Amount</Text>
        </View>
        {/* Table Rows */}
        {invoice.items.map((item: any, i: number) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.colDesc}>{item.description}</Text>
            <Text style={styles.colQty}>{item.qty}</Text>
            <Text style={styles.colRate}>{item.rate}</Text>
            <Text style={styles.colAmt}>{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text>Subtotal</Text>
          <Text>Rs {invoice.subtotal}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Tax (0%)</Text>
          <Text>Rs {invoice.tax}</Text>
        </View>
        <View style={styles.finalTotal}>
          <Text>Total Due</Text>
          <Text>Rs {invoice.total}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{ fontWeight: "bold", color: "#0f172a", marginBottom: 4 }}>Thank you for choosing Droply.</Text>
        <Text style={styles.subText}>Please remit payment to Meezan Bank, Acct: 0101-22334455, Title: Droply Tech.</Text>
      </View>
    </Page>
  </Document>
);