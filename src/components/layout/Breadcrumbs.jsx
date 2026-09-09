import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextOutlined from '@mui/icons-material/NavigateNextOutlined';
import { Link as RouterLink } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
  const trail = [{ label: 'SARANG', path: '/dashboard/ecommerce' }, ...items];

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextOutlined sx={{ fontSize: 16, color: 'text.disabled' }} />}
      sx={{ fontSize: '0.8125rem' }}
    >
      {trail.map((item, index) => {
        const isLast = index === trail.length - 1;
        if (isLast || !item.path) {
          return (
            <Typography key={item.label} variant="body2" color={isLast ? 'text.primary' : 'text.secondary'} fontWeight={isLast ? 600 : 400}>
              {item.label}
            </Typography>
          );
        }
        return (
          <Link key={item.label} component={RouterLink} to={item.path} variant="body2" color="text.secondary" underline="hover">
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
