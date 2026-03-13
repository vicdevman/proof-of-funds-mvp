import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import React from "react";
import type { PDFCertificateProps } from "@/types";

// Helper to format address
const formatAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

// Standard colors
const colors = {
  bg: "#ffffff",
  text: "#111827",
  muted: "#6b7280",
  accent: "#3b82f6",
  success: "#10b981",
  blue: "#3b82f6",
  border: "#e5e7eb",
  darkBg: "#0f0f0f",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    padding: 0,
    fontFamily: "Helvetica",
  },
  container: {
    margin: 40,
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  issuedBySection: {
    flex: 1,
  },
  label: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  dateSection: {
    textAlign: "right",
  },
  dateValue: {
    fontSize: 11,
    color: colors.text,
  },
  titleSection: {
    marginBottom: 35,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
    letterSpacing: -0.5,
  },
  verificationSubtitle: {
    fontSize: 10,
    color: colors.muted,
    marginTop: 6,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderBottomStyle: "dashed",
    marginVertical: 25,
  },
  holderSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  holderValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  unverifiedBadge: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderWidth: 1,
    borderColor: "#fcd34d",
    color: "#b45309",
    padding: "3 6",
  },
  walletSection: {
    marginBottom: 25,
  },
  fullAddress: {
    fontSize: 10,
    color: colors.text,
    fontFamily: "Courier",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  tableHeaderLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: colors.muted,
  },
  assetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  assetInfo: {
    flex: 1,
  },
  assetText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.text,
  },
  assetSubtext: {
    fontSize: 10,
    color: colors.muted,
    marginTop: 2,
  },
  assetPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },
  totalSection: {
    borderTopWidth: 1.5,
    borderTopColor: colors.text,
    paddingTop: 15,
    marginBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  totalValueLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
  },
  totalSubtext: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
  },
  verificationBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  verificationsList: {
    flex: 1,
    marginRight: 20,
  },
  verificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkIcon: {
    fontSize: 12,
    color: colors.text,
    marginRight: 6,
  },
  verificationText: {
    fontSize: 10,
    color: colors.text,
  },
  qrSection: {
    alignItems: "center",
  },
  qrContainer: {
    padding: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 6,
  },
  qrLabel: {
    fontSize: 9,
    color: colors.muted,
  },
  metaSection: {
    gap: 10,
    marginBottom: 35,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  metaLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: colors.muted,
    width: 90,
    textAlign: "right",
    marginRight: 15,
    paddingTop: 1,
  },
  metaValue: {
    fontSize: 10,
    color: colors.muted,
    flex: 1,
    fontFamily: "Courier",
  },
  barcodeSection: {
    marginTop: "auto",
    paddingTop: 20,
    alignItems: "center",
  },
  disclaimer: {
    fontSize: 9,
    color: colors.muted,
    lineHeight: 1.5,
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  idStub: {
    fontSize: 8,
    letterSpacing: 3,
    color: colors.muted,
    textTransform: "uppercase",
  },
});

const PDFCertificate: React.FC<PDFCertificateProps> = ({
  walletAddress,
  totalValue,
  balances,
  totalBalances,
  certificateId,
  issueDate,
  verificationDate,
  certificateHash,
  companyName,
  companyUrl,
  supportEmail,
  disclaimer,
  verifications,
  holderName,
  qrCodeDataUrl,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.issuedBySection}>
            <Text style={styles.label}>Issued by</Text>
            <Text style={[styles.companyName, { color: colors.accent }]}>
              {companyName}
            </Text>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.dateValue}>{issueDate}</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.label}>Document Type</Text>
          <Text style={[styles.title, { color: colors.accent }]}>
            Portfolio Certificate
          </Text>
          <Text style={styles.verificationSubtitle}>
            Verified {verificationDate}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Holder */}
        {holderName && (
          <View style={styles.holderSection}>
            <View>
              <Text style={styles.label}>Certificate Holder</Text>
              <Text style={styles.holderValue}>{holderName}</Text>
            </View>
            <View style={styles.unverifiedBadge}>
              <Text>Unverified</Text>
            </View>
          </View>
        )}

        {/* Wallet */}
        <View style={styles.walletSection}>
          <Text style={styles.label}>Wallet Address</Text>
          <Text style={styles.fullAddress}>{walletAddress}</Text>
        </View>

        <View style={styles.divider} />

        {/* Assets Table */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderLabel}>Description</Text>
          <Text style={styles.tableHeaderLabel}>Subtotal</Text>
        </View>

        <View>
          {balances.map((balance, idx) => (
            <View key={idx} style={styles.assetRow}>
              <View style={styles.assetInfo}>
                <Text style={styles.assetText}>
                  {balance.amount.toLocaleString()} {balance.token}
                </Text>
                <Text style={styles.assetSubtext}>
                  {balance.chain} · {formatAddress(balance.address)}
                </Text>
              </View>
              <Text style={styles.assetPrice}>
                ${balance.value.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View>
            <Text style={styles.totalValueLabel}>Total</Text>
            <Text style={styles.totalSubtext}>
              {balances.length}/{totalBalances || balances.length} assets · USD
            </Text>
          </View>
          <Text style={styles.totalValue}>
            ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Verification + QR */}
        <View style={styles.verificationBlock}>
          <View style={styles.verificationsList}>
            <Text style={styles.label}>Verifications</Text>
            <View style={{ marginTop: 10 }}>
              {verifications.map((v, idx) => (
                <View key={idx} style={styles.verificationItem}>
                  <Text style={styles.checkIcon}>•</Text>
                  <Text style={styles.verificationText}>{v}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.qrSection}>
            <View style={styles.qrContainer}>
              {qrCodeDataUrl && (
                <Image src={qrCodeDataUrl} style={{ width: 72, height: 72 }} />
              )}
            </View>
            <Text style={styles.qrLabel}>Scan to verify</Text>
          </View>
        </View>

        {/* Meta */}
        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Certificate ID</Text>
            <Text style={styles.metaValue}>{certificateId}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Hash</Text>
            <Text style={styles.metaValue}>{certificateHash}</Text>
          </View>
        </View>

        {/* Barcode / Disclaimer */}
        <View style={styles.barcodeSection}>
          <Text style={styles.disclaimer}>
            <Text style={{ fontWeight: "bold" }}>Disclaimer: </Text>
            {disclaimer}
          </Text>
          <Text style={styles.idStub}>{certificateId}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFCertificate;
