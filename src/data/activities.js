export const activities = [
  {
    id: 'ACT-001',
    title: 'New Orders Synced from Storefront',
    description: '1,250 new customer orders were successfully imported from the online store.',
    user: 'Olivia Green',
    timestamp: '2025-11-12T09:12:00',
    icon: 'SyncOutlined',
    color: 'primary',
  },
  {
    id: 'ACT-002',
    title: 'Payment Gateway Integration Updated',
    description: 'Stripe API upgraded to support faster settlements and improved security tokens.',
    user: 'James Parker',
    timestamp: '2025-11-12T08:04:00',
    icon: 'PaymentOutlined',
    color: 'success',
  },
  {
    id: 'ACT-003',
    title: 'Inventory Levels Auto-Synced',
    description: 'All product quantities were updated based on the latest warehouse data.',
    user: 'Sophia Lee',
    timestamp: '2025-11-11T18:47:00',
    icon: 'Inventory2Outlined',
    color: 'info',
  },
  {
    id: 'ACT-004',
    title: 'New Vendor Accounts Approved',
    description: '3 new vendor accounts passed verification and were added to the marketplace.',
    user: 'David Dev',
    timestamp: '2025-11-11T14:22:00',
    icon: 'StorefrontOutlined',
    color: 'warning',
  },
  {
    id: 'ACT-005',
    title: 'Weekly Sales Report Generated',
    description: 'Automated report for Nov 3 – Nov 9 was compiled and emailed to stakeholders.',
    user: 'Grace Kim',
    timestamp: '2025-11-10T07:30:00',
    icon: 'SummarizeOutlined',
    color: 'secondary',
  },
];

// Audit log entries — foundation for a future audit trail view.
export const auditLog = [
  { id: 'AUD-001', user: 'David Dev', action: 'Updated Product', resource: 'Modern Fabric Sofa Set', timestamp: '2025-11-12T10:05:00', ip: '192.168.1.•••', result: 'Success' },
  { id: 'AUD-002', user: 'Olivia Green', action: 'Exported Orders', resource: 'Orders (CSV)', timestamp: '2025-11-12T09:40:00', ip: '10.0.0.•••', result: 'Success' },
  { id: 'AUD-003', user: 'James Parker', action: 'Deleted User', resource: 'Marcus Reed', timestamp: '2025-11-11T16:12:00', ip: '10.0.0.•••', result: 'Failed' },
];
