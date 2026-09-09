import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'Email' }];

export default function EmailApp() {
  return (
    <ComingSoonApp
      title="Email"
      iconName="MailOutlineOutlined"
      breadcrumbs={breadcrumbs}
      description="A built-in inbox for managing customer and team correspondence is planned for a future release."
    />
  );
}
