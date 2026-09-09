import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '../common/Stack';
import Link from '@mui/material/Link';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import { megaMenuColumns } from '../../data/dashboard';

export default function MegaMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownOutlined />}
        color="inherit"
        sx={{ display: { xs: 'none', lg: 'inline-flex' }, fontWeight: 600, color: 'text.secondary' }}
      >
        Mega Menu
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 1, p: 3, width: 680 } } }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
          {megaMenuColumns.map((col) => (
            <Box key={col.title}>
              <Typography variant="overline" color="text.disabled">{col.title}</Typography>
              <Stack spacing={1} sx={{ mt: 1 }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    component="button"
                    variant="body2"
                    underline="hover"
                    color="text.primary"
                    onClick={() => { setAnchorEl(null); navigate(link.path); }}
                    sx={{ textAlign: 'left' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
}
