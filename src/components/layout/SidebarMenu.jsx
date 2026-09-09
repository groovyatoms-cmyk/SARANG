import Box from '@mui/material/Box';
import { navigationSections } from '../../data/navigation';
import SidebarSection from './SidebarSection';

export default function SidebarMenu() {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pb: 2 }}>
      {navigationSections.map((section) => (
        <SidebarSection key={section.id} section={section} />
      ))}
    </Box>
  );
}
