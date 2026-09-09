import Chip from '@mui/material/Chip';

const colorMap = {
  Completed: 'success',
  'In Stock': 'success',
  Active: 'success',
  Success: 'success',
  Pending: 'warning',
  'Low Stock': 'warning',
  Invited: 'warning',
  Processing: 'info',
  Cancelled: 'error',
  'Out of Stock': 'error',
  Suspended: 'error',
  Failed: 'error',
  Inactive: 'default',
  VIP: 'primary',
  'On Track': 'success',
  'At Risk': 'warning',
  Delayed: 'error',
};

export default function StatusChip({ status, size = 'small' }) {
  const color = colorMap[status] || 'default';
  return (
    <Chip
      label={status}
      size={size}
      color={color === 'default' ? undefined : color}
      variant={color === 'default' ? 'outlined' : 'filled'}
      sx={
        color !== 'default'
          ? (theme) => ({
              bgcolor: `${theme.palette[color].main}1F`,
              color: theme.palette[color].main,
            })
          : undefined
      }
    />
  );
}
