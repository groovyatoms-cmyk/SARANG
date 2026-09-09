import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'Invoice' }];

export default function InvoiceApp() {
  return (
    <ComingSoonApp
      title="Invoice"
      iconName="ReceiptLongOutlined"
      breadcrumbs={breadcrumbs}
      description="Create, send, and track invoices directly from SARANG. This module is currently in development."
    />
  );
}
