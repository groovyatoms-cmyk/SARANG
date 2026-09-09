import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import { Link } from 'react-router-dom';
import { SARANG_LAYOUT } from '../../theme/dimensions';
import { useSidebar } from '../../hooks/useSidebar';

export default function SidebarHeader() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <Box
      sx={{
        height: SARANG_LAYOUT.topbarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        px: collapsed ? 0 : 2.5,
        flexShrink: 0,
      }}
    >
      <Box
        component={Link}
        to="/dashboard/ecommerce"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: '10px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#fff',
            background: 'linear-gradient(135deg, #3368A0 0%, #66A3BF 100%)',
          }}
        >
          S
        </Box>
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
            SARANG
          </Typography>
        )}
      </Box>
      {!collapsed && (
        <IconButton
          size="small"
          onClick={toggleCollapsed}
          aria-label="Collapse sidebar"
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
        >
          <ChevronLeftOutlined fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
