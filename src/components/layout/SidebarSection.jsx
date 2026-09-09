import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import SidebarMenuItem from './SidebarMenuItem';
import { useSidebar } from '../../hooks/useSidebar';

export default function SidebarSection({ section }) {
  const { collapsed } = useSidebar();

  return (
    <List
      component="nav"
      aria-label={section.label}
      subheader={
        !collapsed ? (
          <Typography
            component="div"
            variant="overline"
            sx={{ px: 2, pt: 2, pb: 0.75, color: 'text.disabled', fontSize: '0.6875rem' }}
          >
            {section.label}
          </Typography>
        ) : null
      }
      sx={{ px: 1.25, pt: collapsed ? 1.5 : 0 }}
    >
      {section.items.map((item) => (
        <SidebarMenuItem key={item.id} item={item} />
      ))}
    </List>
  );
}
