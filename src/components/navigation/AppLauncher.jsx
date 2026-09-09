import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import Icon from '../common/Icon';
import { appLauncherApps } from '../../data/dashboard';

export default function AppLauncher() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Apps">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Apps launcher">
          <GridViewOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1, p: 2, width: 320 } } }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Applications</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {appLauncherApps.map((app) => (
            <ButtonBase
              key={app.id}
              onClick={() => { setAnchorEl(null); navigate(app.path); }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.75,
                py: 1.5,
                borderRadius: 2,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'action.selected',
                  color: 'primary.main',
                }}
              >
                <Icon name={app.icon} fontSize="small" />
              </Box>
              <Typography variant="caption" sx={{ textAlign: 'center', lineHeight: 1.2 }}>{app.label}</Typography>
            </ButtonBase>
          ))}
        </Box>
      </Popover>
    </>
  );
}
