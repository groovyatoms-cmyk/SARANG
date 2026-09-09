import ComingSoonApp from './ComingSoonApp';

const breadcrumbs = [{ label: 'Apps' }, { label: 'Promo' }];

export default function PromoApp() {
  return (
    <ComingSoonApp
      title="Promo"
      iconName="LocalOfferOutlined"
      breadcrumbs={breadcrumbs}
      description="Create discount codes and promotional campaigns for your storefront. This module is currently in development."
    />
  );
}
