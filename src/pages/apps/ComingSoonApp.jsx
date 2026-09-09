import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import Icon from '../../components/common/Icon';

export default function ComingSoonApp({ title, iconName, description, breadcrumbs }) {
  return (
    <>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 8, px: 3 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover',
              color: 'primary.main',
              mb: 2.5,
            }}
          >
            <Icon name={iconName} sx={{ fontSize: 32 }} />
          </Box>
          <Chip label="Coming Soon" size="small" color="primary" sx={{ mb: 1.5 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mb: 3 }}>
            {description}
          </Typography>
          <Button variant="outlined" component={Link} to="/dashboard/ecommerce">Back to Dashboard</Button>
        </Box>
      </Card>
    </>
  );
}
