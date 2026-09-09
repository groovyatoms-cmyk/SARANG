import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { flattenNavigation } from '../../data/navigation';
import { products } from '../../data/products';
import { orders } from '../../data/orders';
import { customers } from '../../data/customers';
import { users } from '../../data/users';
import { useUiStore } from '../../store/useUiStore';
import { getItem, setItem } from '../../utils/storage';
import EmptyState from '../common/EmptyState';

const navItems = flattenNavigation();

function buildIndex(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  const groups = [
    { title: 'Navigation', results: navItems.filter((i) => i.label.toLowerCase().includes(q)).map((i) => ({ label: i.label, sub: i.group, path: i.path })) },
    { title: 'Products', results: products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5).map((p) => ({ label: p.name, sub: p.vendor, path: `/ecommerce/products/${p.id}` })) },
    { title: 'Orders', results: orders.filter((o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q)).slice(0, 5).map((o) => ({ label: o.id, sub: o.customer, path: `/ecommerce/orders/${o.id}` })) },
    { title: 'Customers', results: customers.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 5).map((c) => ({ label: c.name, sub: c.email, path: `/ecommerce/customers` })) },
    { title: 'Users', results: users.filter((u) => u.name.toLowerCase().includes(q)).slice(0, 5).map((u) => ({ label: u.name, sub: u.role, path: `/users/${u.id}` })) },
  ];

  return groups.filter((g) => g.results.length > 0);
}

function highlight(text, query) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <Box component="mark" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', px: 0.25, borderRadius: 0.5 }}>
        {text.slice(idx, idx + query.length)}
      </Box>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function CommandPalette() {
  const open = useUiStore((s) => s.commandPaletteOpen);
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState(getItem('recentSearches', []));

  const groups = useMemo(() => buildIndex(query), [query]);
  const flatResults = useMemo(() => groups.flatMap((g) => g.results), [groups]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = (result) => {
    const next = [result.label, ...recent.filter((r) => r !== result.label)].slice(0, 5);
    setRecent(next);
    setItem('recentSearches', next);
    setOpen(false);
    navigate(result.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatResults[activeIndex]) {
      handleSelect(flatResults[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 3, overflow: 'hidden' } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
        <SearchOutlined sx={{ color: 'text.secondary', mr: 1.5 }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Search products, orders, customers, pages…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ fontSize: '0.9375rem' }}
        />
        <Chip label="Esc" size="small" variant="outlined" onClick={() => setOpen(false)} />
      </Box>
      <Box sx={{ maxHeight: 420, overflowY: 'auto', py: 1 }}>
        {!query.trim() && recent.length > 0 && (
          <List subheader={<ListSubheader disableSticky>Recent Searches</ListSubheader>}>
            {recent.map((r) => (
              <ListItemButton key={r} onClick={() => setQuery(r)}>
                <ListItemText primary={r} />
              </ListItemButton>
            ))}
          </List>
        )}
        {query.trim() && groups.length === 0 && (
          <EmptyState title="No results found" message={`Nothing matches "${query}"`} />
        )}
        {groups.map((group) => (
          <List key={group.title} subheader={<ListSubheader disableSticky>{group.title}</ListSubheader>}>
            {group.results.map((result) => {
              const idx = flatResults.indexOf(result);
              return (
                <ListItemButton
                  key={`${group.title}-${result.label}-${idx}`}
                  selected={idx === activeIndex}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(result)}
                >
                  <ListItemText
                    primary={<Typography variant="body2" fontWeight={600}>{highlight(result.label, query)}</Typography>}
                    secondary={result.sub}
                  />
                </ListItemButton>
              );
            })}
          </List>
        ))}
      </Box>
    </Dialog>
  );
}
