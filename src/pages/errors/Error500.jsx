import ErrorPageLayout from '../../components/layout/ErrorPageLayout';

export default function Error500() {
  return (
    <ErrorPageLayout
      code="500"
      title="Something went wrong"
      message="An unexpected server error occurred. Our team has been notified — please try again shortly."
    />
  );
}
