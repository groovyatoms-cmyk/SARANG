import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'Chat' }];

export default function ChatApp() {
  return (
    <ComingSoonApp
      title="Chat"
      iconName="ChatBubbleOutlineOutlined"
      breadcrumbs={breadcrumbs}
      description="Real-time team messaging is on its way. You'll be able to chat with your team, share files, and collaborate directly inside SARANG."
    />
  );
}
