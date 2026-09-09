import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageHeader from '../../components/layout/PageHeader';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

const breadcrumbs = [{ label: 'Ecommerce', path: '/ecommerce/products' }, { label: 'Categories' }];

const icons = ['🛋️', '🪑', '🪵', '🗄️', '🛏️', '🍽️'];

export default function CategoriesPage() {
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const entry = map.get(p.category) || { name: p.category, count: 0, revenue: 0 };
      entry.count += 1;
      entry.revenue += p.amount;
      map.set(p.category, entry);
    });
    return [...map.values()].sort((a, b) => b.revenue - a.revenue);
  }, []);

  return (
    <>
      <PageHeader title="Categories" breadcrumbs={breadcrumbs} />
      <Grid container spacing={2.5}>
        {categories.map((cat, i) => (
          <Grid key={cat.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ fontSize: '1.75rem', mb: 1 }}>{icons[i % icons.length]}</Box>
                <Typography variant="subtitle1">{cat.name}</Typography>
                <Typography variant="caption" color="text.secondary">{cat.count} products</Typography>
                <Typography variant="h5" sx={{ mt: 1.5 }}>{formatCurrency(cat.revenue, { compact: true })}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
