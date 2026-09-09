// Sidebar navigation tree. `badge` is optional; `children` makes an item expandable.
export const navigationSections = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'DashboardOutlined',
        children: [
          { id: 'dashboard-ecommerce', label: 'Ecommerce', path: '/dashboard/ecommerce' },
          { id: 'dashboard-analytics', label: 'Analytics', path: '/dashboard/analytics' },
          { id: 'dashboard-crm', label: 'CRM', path: '/dashboard/crm' },
          { id: 'dashboard-finance', label: 'Finance', path: '/dashboard/finance' },
          { id: 'dashboard-projects', label: 'Projects', path: '/dashboard/projects' },
        ],
      },
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    items: [
      { id: 'apps-ecommerce', label: 'Ecommerce', icon: 'ShoppingBagOutlined', path: '/ecommerce/products' },
      { id: 'apps-chat', label: 'Chat', icon: 'ChatBubbleOutlineOutlined', path: '/apps/chat' },
      { id: 'apps-projects', label: 'Projects', icon: 'FolderOpenOutlined', path: '/apps/projects' },
      { id: 'apps-tasks', label: 'Tasks', icon: 'TaskAltOutlined', path: '/apps/tasks' },
      { id: 'apps-invoice', label: 'Invoice', icon: 'ReceiptLongOutlined', path: '/apps/invoice' },
      { id: 'apps-crm', label: 'CRM', icon: 'HandshakeOutlined', path: '/apps/crm' },
      { id: 'apps-users', label: 'Users', icon: 'GroupOutlined', path: '/users' },
      { id: 'apps-finance', label: 'Finance', icon: 'AccountBalanceOutlined', path: '/apps/finance' },
      { id: 'apps-hrm', label: 'HRM', icon: 'Diversity3Outlined', path: '/apps/hrm' },
      { id: 'apps-email', label: 'Email', icon: 'MailOutlineOutlined', path: '/apps/email', badge: 4 },
      { id: 'apps-support', label: 'Support Center', icon: 'SupportAgentOutlined', path: '/pages/support' },
      { id: 'apps-promo', label: 'Promo', icon: 'LocalOfferOutlined', path: '/apps/promo', badge: 'New' },
    ],
  },
  {
    id: 'custom-pages',
    label: 'Custom Pages',
    items: [
      { id: 'pages', label: 'Pages', icon: 'ArticleOutlined', path: '/pages/profile' },
      { id: 'plugins', label: 'Plugins', icon: 'ExtensionOutlined', path: '/pages/plugins' },
      {
        id: 'authentication',
        label: 'Authentication',
        icon: 'LockOutlined',
        children: [
          { id: 'auth-login', label: 'Login', path: '/auth/login' },
          { id: 'auth-register', label: 'Register', path: '/auth/register' },
          { id: 'auth-forgot', label: 'Forgot Password', path: '/auth/forgot-password' },
          { id: 'auth-lock', label: 'Lock Screen', path: '/auth/lock-screen' },
        ],
      },
      {
        id: 'error-pages',
        label: 'Error Pages',
        icon: 'ReportProblemOutlined',
        children: [
          { id: 'error-403', label: '403', path: '/errors/403' },
          { id: 'error-404', label: '404', path: '/errors/404' },
          { id: 'error-500', label: '500', path: '/errors/500' },
          { id: 'error-maintenance', label: 'Maintenance', path: '/errors/maintenance' },
        ],
      },
    ],
  },
];

export const flattenNavigation = () => {
  const flat = [];
  navigationSections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => flat.push({ ...child, group: section.label, parent: item.label }));
      } else {
        flat.push({ ...item, group: section.label });
      }
    });
  });
  return flat;
};
