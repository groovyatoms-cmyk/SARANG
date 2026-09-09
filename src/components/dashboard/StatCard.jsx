import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '../common/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ArrowUpwardOutlined from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlined from '@mui/icons-material/ArrowDownwardOutlined';
import Icon from '../common/Icon';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatNumber, formatPercent } from '../../utils/formatNumber';

function formatValue(stat) {
  if (stat.format === 'currency-compact') return formatCurrency(stat.value, { compact: true });
  if (stat.format === 'percent') return formatPercent(stat.value, { showSign: true });
  return formatNumber(stat.value);
}

export default function StatCard({ stat }) {
  const navigate = useNavigate();
  const isUp = stat.trend >= 0;

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(stat.path)} sx={{ height: '100%' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="overline" color="text.secondary">{stat.label}</Typography>
                <Tooltip title={stat.trendLabel}>
                  <InfoOutlined sx={{ fontSize: 13, color: 'text.disabled' }} />
                </Tooltip>
              </Stack>
              <Typography variant="h3" sx={{ mt: 0.5 }}>{formatValue(stat)}</Typography>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
                {isUp ? (
                  <ArrowUpwardOutlined sx={{ fontSize: 14 }} color="success" />
                ) : (
                  <ArrowDownwardOutlined sx={{ fontSize: 14 }} color="error" />
                )}
                <Typography variant="caption" fontWeight={700} color={isUp ? 'success.main' : 'error.main'}>
                  {formatPercent(Math.abs(stat.trend))}
                </Typography>
                <Typography variant="caption" color="text.secondary">{stat.trendLabel}</Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: (t) => `${t.palette[stat.color].main}1F`,
                color: `${stat.color}.main`,
                flexShrink: 0,
              }}
            >
              <Icon name={stat.icon} fontSize="small" />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
