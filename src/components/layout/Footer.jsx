import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '../common/Stack';
import Link from '@mui/material/Link';
import { SARANG_LAYOUT } from '../../theme/dimensions';

const links = [
  { label: 'About', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        minHeight: SARANG_LAYOUT.footerHeight,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: { xs: 2, md: 3 },
        py: 2,
        mt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        2026 © SARANG
      </Typography>
      <Stack direction="row" spacing={2.5}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} variant="caption" color="text.secondary" underline="hover">
            {link.label}
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
