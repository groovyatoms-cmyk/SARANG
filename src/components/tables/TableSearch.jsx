import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

export default function TableSearch({ value, onChange, placeholder = 'Search…' }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      size="small"
      sx={{ minWidth: 240 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
