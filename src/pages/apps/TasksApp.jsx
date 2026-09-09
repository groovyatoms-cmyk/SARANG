import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'Tasks' }];

export default function TasksApp() {
  return (
    <ComingSoonApp
      title="Tasks"
      iconName="TaskAltOutlined"
      breadcrumbs={breadcrumbs}
      description="A dedicated Kanban-style task board is coming soon, with assignees, due dates, and priority tracking."
    />
  );
}
