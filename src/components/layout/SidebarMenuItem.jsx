import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import KeyboardArrowRightOutlined from '@mui/icons-material/KeyboardArrowRightOutlined';
import FiberManualRecordOutlined from '@mui/icons-material/FiberManualRecordOutlined';
import Icon from '../common/Icon';
import { useSidebar } from '../../hooks/useSidebar';

function NavBadge({ badge }) {
  if (badge === undefined || badge === null) return null;
  return (
    <Chip
      label={badge}
      size="small"
      color={typeof badge === 'string' ? 'secondary' : 'primary'}
      sx={{ height: 18, fontSize: '0.625rem', fontWeight: 700, px: 0.25 }}
    />
  );
}

export default function SidebarMenuItem({ item, depth = 0 }) {
  const location = useLocation();
  const { collapsed, expandedIds, toggleExpanded } = useSidebar();
  const [hoverOpen, setHoverOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expandedIds.includes(item.id);

  const isActive = hasChildren
    ? item.children.some((c) => location.pathname.startsWith(c.path))
    : item.path && location.pathname.startsWith(item.path);

  if (hasChildren) {
    return (
      <>
        <Tooltip title={collapsed ? item.label : ''} placement="right">
          <ListItemButton
            selected={isActive && !isExpanded}
            onClick={() => toggleExpanded(item.id)}
            onMouseEnter={() => collapsed && setHoverOpen(true)}
            onMouseLeave={() => collapsed && setHoverOpen(false)}
            sx={{ py: 0.875, justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            <ListItemIcon>
              <Icon name={item.icon} fontSize="small" />
            </ListItemIcon>
            {!collapsed && (
              <>
                <ListItemText primary={item.label} slotProps={{ primary: { variant: 'body2', fontWeight: 600 } }} />
                <KeyboardArrowRightOutlined
                  fontSize="small"
                  sx={{
                    transition: 'transform 200ms ease',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    opacity: 0.6,
                  }}
                />
              </>
            )}
          </ListItemButton>
        </Tooltip>
        {!collapsed && (
          <Collapse in={isExpanded} timeout={220} unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2.25 }}>
              {item.children.map((child) => (
                <SidebarMenuItem key={child.id} item={child} depth={depth + 1} />
              ))}
            </List>
          </Collapse>
        )}
        {collapsed && hoverOpen && (
          <Box
            onMouseEnter={() => setHoverOpen(true)}
            onMouseLeave={() => setHoverOpen(false)}
            sx={{
              position: 'fixed',
              ml: 1,
              zIndex: (t) => t.zIndex.drawer + 2,
              bgcolor: 'background.elevated',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: 8,
              py: 0.5,
              minWidth: 190,
            }}
          >
            {item.children.map((child) => (
              <ListItemButton key={child.id} component={Link} to={child.path} sx={{ py: 0.75, px: 2 }}>
                <ListItemText primary={child.label} slotProps={{ primary: { variant: 'body2' } }} />
              </ListItemButton>
            ))}
          </Box>
        )}
      </>
    );
  }

  return (
    <Tooltip title={collapsed ? item.label : ''} placement="right">
      <ListItemButton
        component={Link}
        to={item.path}
        selected={isActive}
        sx={{ py: 0.875, justifyContent: collapsed ? 'center' : 'flex-start' }}
      >
        <ListItemIcon>
          {depth > 0 ? (
            <FiberManualRecordOutlined sx={{ fontSize: 8 }} />
          ) : (
            <Icon name={item.icon} fontSize="small" />
          )}
        </ListItemIcon>
        {!collapsed && (
          <ListItemText primary={item.label} slotProps={{ primary: { variant: 'body2', fontWeight: depth > 0 ? 500 : 600 } }} />
        )}
        {!collapsed && <NavBadge badge={item.badge} />}
      </ListItemButton>
    </Tooltip>
  );
}
