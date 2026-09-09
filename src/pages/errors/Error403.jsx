import ErrorPageLayout from '../../components/layout/ErrorPageLayout';

export default function Error403() {
  return (
    <ErrorPageLayout
      code="403"
      title="Access denied"
      message="You don't have permission to view this page. Contact your administrator if you believe this is a mistake."
    />
  );
}
