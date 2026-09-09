export const currentUser = {
  id: 'USR-001',
  name: 'David Dev',
  role: 'Admin Head',
  email: 'david.dev@sarang.app',
  avatarColor: '#3368A0',
  avatarInitials: 'DD',
};

export const users = [
  { id: 'USR-001', name: 'David Dev', email: 'david.dev@sarang.app', role: 'Admin', status: 'Active', lastActive: '2025-11-12T09:20:00' },
  { id: 'USR-002', name: 'Olivia Green', email: 'olivia.green@sarang.app', role: 'Manager', status: 'Active', lastActive: '2025-11-12T08:05:00' },
  { id: 'USR-003', name: 'James Parker', email: 'james.parker@sarang.app', role: 'Editor', status: 'Active', lastActive: '2025-11-11T17:42:00' },
  { id: 'USR-004', name: 'Sophia Lee', email: 'sophia.lee@sarang.app', role: 'Editor', status: 'Invited', lastActive: null },
  { id: 'USR-005', name: 'Marcus Reed', email: 'marcus.reed@sarang.app', role: 'Viewer', status: 'Suspended', lastActive: '2025-10-30T12:10:00' },
  { id: 'USR-006', name: 'Grace Kim', email: 'grace.kim@sarang.app', role: 'Manager', status: 'Active', lastActive: '2025-11-12T07:15:00' },
];

export const roles = ['Admin', 'Manager', 'Editor', 'Viewer'];

export const permissionsMatrix = {
  Admin: ['view', 'create', 'edit', 'delete', 'export', 'import'],
  Manager: ['view', 'create', 'edit', 'export', 'import'],
  Editor: ['view', 'create', 'edit'],
  Viewer: ['view'],
};
