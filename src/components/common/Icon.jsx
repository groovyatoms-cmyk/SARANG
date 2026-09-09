import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FolderOpenOutlined from '@mui/icons-material/FolderOpenOutlined';
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined';
import ReceiptLongOutlined from '@mui/icons-material/ReceiptLongOutlined';
import HandshakeOutlined from '@mui/icons-material/HandshakeOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined';
import Diversity3Outlined from '@mui/icons-material/Diversity3Outlined';
import MailOutlineOutlined from '@mui/icons-material/MailOutlineOutlined';
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined';
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';
import PaidOutlined from '@mui/icons-material/PaidOutlined';
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined';
import SyncOutlined from '@mui/icons-material/SyncOutlined';
import PaymentOutlined from '@mui/icons-material/PaymentOutlined';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined';
import SummarizeOutlined from '@mui/icons-material/SummarizeOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import HelpOutlineOutlined from '@mui/icons-material/HelpOutlineOutlined';

const registry = {
  DashboardOutlined,
  ShoppingBagOutlined,
  ChatBubbleOutlineOutlined,
  FolderOpenOutlined,
  TaskAltOutlined,
  ReceiptLongOutlined,
  HandshakeOutlined,
  GroupOutlined,
  AccountBalanceOutlined,
  Diversity3Outlined,
  MailOutlineOutlined,
  SupportAgentOutlined,
  LocalOfferOutlined,
  ArticleOutlined,
  ExtensionOutlined,
  LockOutlined,
  ReportProblemOutlined,
  PaidOutlined,
  TrendingUpOutlined,
  SyncOutlined,
  PaymentOutlined,
  Inventory2Outlined,
  StorefrontOutlined,
  SummarizeOutlined,
  CalendarMonthOutlined,
};

// Resolves an icon referenced by name from data files (navigation, KPIs, activity feed).
export default function Icon({ name, ...props }) {
  const Component = registry[name] || HelpOutlineOutlined;
  return <Component {...props} />;
}
