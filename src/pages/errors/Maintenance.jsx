import BuildOutlined from '@mui/icons-material/BuildOutlined';
import ErrorPageLayout from '../../components/layout/ErrorPageLayout';

export default function Maintenance() {
  return (
    <ErrorPageLayout
      icon={<BuildOutlined sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />}
      title="Scheduled Maintenance"
      message="SARANG is currently undergoing scheduled maintenance. We'll be back online shortly."
    />
  );
}
