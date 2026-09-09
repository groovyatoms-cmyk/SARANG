export const kpiStats = [
  {
    id: 'orders',
    label: 'Orders',
    value: 9754,
    format: 'number',
    trend: -1.89,
    trendLabel: 'Since last month',
    icon: 'ShoppingBagOutlined',
    color: 'primary',
    path: '/ecommerce/orders',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: 75210,
    format: 'currency-compact',
    trend: -5.23,
    trendLabel: 'Since last month',
    icon: 'PaidOutlined',
    color: 'success',
    path: '/dashboard/finance',
  },
  {
    id: 'growth',
    label: 'Growth',
    value: 25.08,
    format: 'percent',
    trend: 4.87,
    trendLabel: 'Since last month',
    icon: 'TrendingUpOutlined',
    color: 'secondary',
    path: '/dashboard/analytics',
  },
];

export const storePerformance = {
  total: 140,
  status: 'POOR SALES',
  segments: [
    { label: 'Website', value: 52, color: 'primary' },
    { label: 'Mobile App', value: 38, color: 'secondary' },
    { label: 'Marketplace', value: 31, color: 'warning' },
    { label: 'Social', value: 19, color: 'info' },
  ],
};

export const weeklyPerformance = [
  { day: 'Mon', start: 20, end: 62 },
  { day: 'Tue', start: 34, end: 78 },
  { day: 'Wed', start: 15, end: 48 },
  { day: 'Thu', start: 42, end: 90 },
  { day: 'Fri', start: 28, end: 71 },
  { day: 'Sat', start: 50, end: 96 },
  { day: 'Sun', start: 24, end: 55 },
];

const buildSeries = (base, points, volatility) =>
  Array.from({ length: points }, (_, i) => {
    const wobble = Math.sin(i / 2) * volatility + Math.cos(i / 3) * (volatility / 2);
    return Math.max(0, Math.round(base + wobble + i * (base / (points * 6))));
  });

export const salesReportByRange = {
  Today: {
    ordersTotal: 1024,
    revenue: 8975.3,
    orders: 341,
    growthRate: 3.4,
    labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    revenueSeries: buildSeries(900, 8, 260),
    orderSeries: buildSeries(38, 8, 12),
  },
  Monthly: {
    ordersTotal: 25822,
    revenue: 78224.68,
    orders: 8541,
    growthRate: 25.3,
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
    revenueSeries: buildSeries(5200, 12, 1400),
    orderSeries: buildSeries(620, 12, 160),
  },
  Annual: {
    ordersTotal: 184320,
    revenue: 942880.15,
    orders: 61230,
    growthRate: 18.7,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenueSeries: buildSeries(68000, 12, 18000),
    orderSeries: buildSeries(4800, 12, 1100),
  },
};

export const todaysEarnings = 8975.3;

export const propertyStatus = {
  property: 'PS007',
  message: 'Property PS007 is not receiving hits. Either your site is not receiving any sessions.',
};

export const appLauncherApps = [
  { id: 'ecommerce', label: 'Ecommerce', icon: 'ShoppingBagOutlined', path: '/ecommerce/products' },
  { id: 'crm', label: 'CRM', icon: 'HandshakeOutlined', path: '/apps/crm' },
  { id: 'chat', label: 'Chat', icon: 'ChatBubbleOutlineOutlined', path: '/apps/chat' },
  { id: 'calendar', label: 'Calendar', icon: 'CalendarMonthOutlined', path: '/apps/calendar' },
  { id: 'projects', label: 'Projects', icon: 'FolderOpenOutlined', path: '/apps/projects' },
  { id: 'tasks', label: 'Tasks', icon: 'TaskAltOutlined', path: '/apps/tasks' },
  { id: 'invoice', label: 'Invoice', icon: 'ReceiptLongOutlined', path: '/apps/invoice' },
  { id: 'email', label: 'Email', icon: 'MailOutlineOutlined', path: '/apps/email' },
  { id: 'finance', label: 'Finance', icon: 'AccountBalanceOutlined', path: '/apps/finance' },
  { id: 'hrm', label: 'HRM', icon: 'Diversity3Outlined', path: '/apps/hrm' },
];

export const analyticsStats = [
  { id: 'sessions', label: 'Sessions', value: 128430, format: 'number', trend: 6.2, trendLabel: 'Since last month', icon: 'TrendingUpOutlined', color: 'primary', path: '/dashboard/analytics' },
  { id: 'bounce', label: 'Bounce Rate', value: 38.4, format: 'percent', trend: -2.1, trendLabel: 'Since last month', icon: 'TrendingUpOutlined', color: 'warning', path: '/dashboard/analytics' },
  { id: 'conversion', label: 'Conversion Rate', value: 4.72, format: 'percent', trend: 1.3, trendLabel: 'Since last month', icon: 'PaidOutlined', color: 'success', path: '/dashboard/analytics' },
];

export const analyticsTraffic = [
  { source: 'Organic Search', sessions: 48200, share: 38 },
  { source: 'Direct', sessions: 31500, share: 25 },
  { source: 'Social', sessions: 24700, share: 19 },
  { source: 'Referral', sessions: 14900, share: 12 },
  { source: 'Email', sessions: 9130, share: 6 },
];

export const crmStats = [
  { id: 'leads', label: 'New Leads', value: 842, format: 'number', trend: 12.4, trendLabel: 'Since last month', icon: 'HandshakeOutlined', color: 'primary', path: '/dashboard/crm' },
  { id: 'deals', label: 'Open Deals', value: 156, format: 'number', trend: 3.8, trendLabel: 'Since last month', icon: 'TrendingUpOutlined', color: 'secondary', path: '/dashboard/crm' },
  { id: 'pipeline', label: 'Pipeline Value', value: 482300, format: 'currency-compact', trend: 8.1, trendLabel: 'Since last month', icon: 'PaidOutlined', color: 'success', path: '/dashboard/crm' },
];

export const crmPipeline = [
  { stage: 'Qualified', deals: 42, value: 128400 },
  { stage: 'Proposal', deals: 28, value: 156200 },
  { stage: 'Negotiation', deals: 17, value: 121800 },
  { stage: 'Closed Won', deals: 34, value: 75900 },
];

export const financeStats = [
  { id: 'income', label: 'Total Income', value: 942880, format: 'currency-compact', trend: 9.4, trendLabel: 'Since last month', icon: 'PaidOutlined', color: 'success', path: '/dashboard/finance' },
  { id: 'expenses', label: 'Total Expenses', value: 384210, format: 'currency-compact', trend: 3.2, trendLabel: 'Since last month', icon: 'AccountBalanceOutlined', color: 'error', path: '/dashboard/finance' },
  { id: 'profit', label: 'Net Profit', value: 558670, format: 'currency-compact', trend: 14.8, trendLabel: 'Since last month', icon: 'TrendingUpOutlined', color: 'primary', path: '/dashboard/finance' },
];

export const financeCashflow = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  income: 60000 + Math.round(Math.sin(i / 2) * 12000 + i * 1800),
  expenses: 32000 + Math.round(Math.cos(i / 3) * 6000 + i * 900),
}));

export const projectsStats = [
  { id: 'active', label: 'Active Projects', value: 24, format: 'number', trend: 4.0, trendLabel: 'Since last month', icon: 'FolderOpenOutlined', color: 'primary', path: '/dashboard/projects' },
  { id: 'tasks', label: 'Tasks Completed', value: 1284, format: 'number', trend: 18.6, trendLabel: 'Since last month', icon: 'TaskAltOutlined', color: 'success', path: '/dashboard/projects' },
  { id: 'overdue', label: 'Overdue Tasks', value: 17, format: 'number', trend: -6.4, trendLabel: 'Since last month', icon: 'ReceiptLongOutlined', color: 'error', path: '/dashboard/projects' },
];

export const projectsList = [
  { id: 'PRJ-001', name: 'SARANG Admin Redesign', progress: 82, status: 'On Track', dueDate: '2025-12-05', team: 6 },
  { id: 'PRJ-002', name: 'Mobile App Launch', progress: 45, status: 'At Risk', dueDate: '2025-12-20', team: 4 },
  { id: 'PRJ-003', name: 'Warehouse Integration', progress: 96, status: 'On Track', dueDate: '2025-11-18', team: 3 },
  { id: 'PRJ-004', name: 'Payment Gateway v2', progress: 28, status: 'Delayed', dueDate: '2026-01-10', team: 5 },
];

export const megaMenuColumns = [
  {
    title: 'Applications',
    links: [
      { label: 'Ecommerce', path: '/ecommerce/products' },
      { label: 'CRM', path: '/apps/crm' },
      { label: 'Invoice', path: '/apps/invoice' },
      { label: 'Finance', path: '/apps/finance' },
    ],
  },
  {
    title: 'Management',
    links: [
      { label: 'Users', path: '/users' },
      { label: 'Customers', path: '/ecommerce/customers' },
      { label: 'Inventory', path: '/ecommerce/inventory' },
      { label: 'Categories', path: '/ecommerce/categories' },
    ],
  },
  {
    title: 'Reports',
    links: [
      { label: 'Sales Report', path: '/dashboard/finance' },
      { label: 'Analytics', path: '/dashboard/analytics' },
      { label: 'Growth', path: '/dashboard/analytics' },
    ],
  },
  {
    title: 'Pages',
    links: [
      { label: 'Profile', path: '/pages/profile' },
      { label: 'Settings', path: '/pages/settings' },
      { label: 'Support Center', path: '/pages/support' },
    ],
  },
];
