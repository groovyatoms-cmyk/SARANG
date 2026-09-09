import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'HRM' }];

export default function HrmApp() {
  return (
    <ComingSoonApp
      title="HRM"
      iconName="Diversity3Outlined"
      breadcrumbs={breadcrumbs}
      description="Human resource management — employee records, leave tracking, and payroll — is planned for a future release."
    />
  );
}
