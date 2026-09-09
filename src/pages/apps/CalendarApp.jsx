import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'Calendar' }];

export default function CalendarApp() {
  return (
    <ComingSoonApp
      title="Calendar"
      iconName="CalendarMonthOutlined"
      breadcrumbs={breadcrumbs}
      description="Schedule meetings, deadlines, and store events in a shared team calendar — coming in a future update."
    />
  );
}
