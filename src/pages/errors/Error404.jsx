import ErrorPageLayout from '../../components/layout/ErrorPageLayout';

export default function Error404() {
  return (
    <ErrorPageLayout
      code="404"
      title="Page not found"
      message="The page you're looking for doesn't exist or may have been moved."
    />
  );
}
