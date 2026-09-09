import Stack from '../common/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { useState } from 'react';
import TableSearch from './TableSearch';
import TableFilters from './TableFilters';

export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  filterValues,
  onFilterChange,
  onClearFilters,
  selectedCount = 0,
  bulkActions = [],
  onExport,
  onImport,
  extraActions,
}) {
  const [exportAnchor, setExportAnchor] = useState(null);

  return (
    <Stack spacing={1.5} sx={{ mb: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={1.5}>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" rowGap={1}>
          <TableSearch value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
          {filters && (
            <TableFilters filters={filters} values={filterValues} onChange={onFilterChange} onClear={onClearFilters} />
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          {extraActions}
          {onImport && (
            <Button size="small" variant="outlined" startIcon={<FileUploadOutlined fontSize="small" />} onClick={onImport}>
              Import
            </Button>
          )}
          {onExport && (
            <>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FileDownloadOutlined fontSize="small" />}
                onClick={(e) => setExportAnchor(e.currentTarget)}
              >
                Export
              </Button>
              <Menu anchorEl={exportAnchor} open={Boolean(exportAnchor)} onClose={() => setExportAnchor(null)}>
                <MenuItem onClick={() => { onExport('csv'); setExportAnchor(null); }}>Export as CSV</MenuItem>
                <MenuItem onClick={() => { onExport('json'); setExportAnchor(null); }}>Export as JSON</MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Stack>

      {selectedCount > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: 'action.selected',
          }}
        >
          <Typography variant="body2" fontWeight={600}>{selectedCount} selected</Typography>
          <Stack direction="row" spacing={1}>
            {bulkActions.map((action) => (
              <Button
                key={action.label}
                size="small"
                color={action.destructive ? 'error' : 'primary'}
                startIcon={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
