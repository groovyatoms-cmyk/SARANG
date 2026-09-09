import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import { languages } from '../../data/languages';
import { getItem, setItem } from '../../utils/storage';
import { toast } from '../../store/useToastStore';

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [current, setCurrent] = useState(getItem('language', 'en'));
  const open = Boolean(anchorEl);

  const select = (code, label) => {
    setCurrent(code);
    setItem('language', code);
    setAnchorEl(null);
    toast.info(`Language set to ${label}. Full translations are coming soon.`);
  };

  return (
    <>
      <Tooltip title="Language">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Language">
          <LanguageOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} slotProps={{ paper: { sx: { mt: 1, minWidth: 200 } } }}>
        {languages.map((lang) => (
          <MenuItem key={lang.code} selected={lang.code === current} onClick={() => select(lang.code, lang.label)}>
            <ListItemText>{lang.flag}  {lang.label}</ListItemText>
            {lang.code === current && <CheckOutlined fontSize="small" color="primary" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
