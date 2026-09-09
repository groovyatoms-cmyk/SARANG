import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '../common/Stack';
import Button from '@mui/material/Button';
import FilterListOutlined from '@mui/icons-material/FilterListOutlined';

// filters: [{ field, label, options: [string] }]
export default function TableFilters({ filters, values, onChange, onClear }) {
  const hasActive = Object.values(values).some(Boolean);

  return (
    <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" rowGap={1}>
      <FilterListOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
      {filters.map((filter) => (
        <Select
          key={filter.field}
          size="small"
          displayEmpty
          value={values[filter.field] || ''}
          onChange={(e) => onChange(filter.field, e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">{filter.label}</MenuItem>
          {filter.options.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      ))}
      {hasActive && (
        <Button size="small" onClick={onClear}>Clear All</Button>
      )}
    </Stack>
  );
}
