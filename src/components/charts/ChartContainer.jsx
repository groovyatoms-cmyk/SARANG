import Box from '@mui/material/Box';
import { ResponsiveContainer } from 'recharts';
import { SARANG_LAYOUT } from '../../theme/dimensions';

// Standardizes height + responsive wrapping for every chart in SARANG.
export default function ChartContainer({ height = SARANG_LAYOUT.chartHeight, children }) {
  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </Box>
  );
}
