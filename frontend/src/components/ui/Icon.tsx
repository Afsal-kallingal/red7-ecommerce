import React from 'react';
import {
  Menu,
  Search,
  SearchX,
  ShoppingBag,
  User,
  Home,
  LayoutGrid,
  Heart,
  SlidersHorizontal,
  ArrowRight,
  ArrowLeft,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Lock,
  CheckCircle2,
  Check,
  Star,
  Share2,
  Info,
  Zap,
  Ruler,
  Sparkles,
  CreditCard,
  QrCode,
  Copy,
  Phone,
  Mail,
  HelpCircle,
  Tag,
  Shirt,
  ZoomIn,
  Rows3,
  ExternalLink,
  Package,
  Clock,
  AlertCircle,
  MapPin,
  Filter,
  MessageSquare,
  Megaphone,
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  Images,
} from 'lucide-react';

export type IconName =
  | 'menu'
  | 'search'
  | 'shopping_bag'
  | 'bag'
  | 'person'
  | 'account'
  | 'user'
  | 'home'
  | 'grid_view'
  | 'catalog'
  | 'shop'
  | 'view_agenda'
  | 'favorite'
  | 'favorite_border'
  | 'heart'
  | 'tune'
  | 'filters'
  | 'filter'
  | 'arrow_forward'
  | 'arrow_right'
  | 'arrow_back'
  | 'arrow_left'
  | 'close'
  | 'expand_more'
  | 'expand_less'
  | 'expand_right'
  | 'add'
  | 'plus'
  | 'remove'
  | 'minus'
  | 'delete'
  | 'trash'
  | 'local_shipping'
  | 'truck'
  | 'verified'
  | 'shield'
  | 'sync_alt'
  | 'published_with_changes'
  | 'refresh'
  | 'lock'
  | 'check'
  | 'check_circle'
  | 'star'
  | 'share'
  | 'info'
  | 'bolt'
  | 'zap'
  | 'straighten'
  | 'ruler'
  | 'dry_cleaning'
  | 'sparkles'
  | 'credit_card'
  | 'qr_code'
  | 'content_copy'
  | 'copy'
  | 'phone'
  | 'mail'
  | 'help'
  | 'tag'
  | 'apparel'
  | 'zoom_in'
  | 'add_shopping_cart'
  | 'package'
  | 'clock'
  | 'alert'
  | 'map_pin';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName | string;
  size?: number | string;
  className?: string;
  filled?: boolean;
}

export function Icon({ name, size = 20, className = '', filled = false, ...props }: IconProps) {
  const iconProps = {
    size: typeof size === 'number' ? size : parseInt(size as string, 10) || 20,
    className,
    ...props,
  };

  switch (name) {
    case 'menu':
      return <Menu {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'search_off':
      return <SearchX {...iconProps} />;
    case 'shopping_bag':
    case 'bag':
    case 'add_shopping_cart':
      return <ShoppingBag {...iconProps} />;
    case 'person':
    case 'account':
    case 'user':
      return <User {...iconProps} />;
    case 'home':
      return <Home {...iconProps} />;
    case 'grid_view':
    case 'catalog':
    case 'shop':
      return <LayoutGrid {...iconProps} />;
    case 'view_agenda':
      return <Rows3 {...iconProps} />;
    case 'favorite':
      return <Heart {...iconProps} className={`${className} fill-current`} />;
    case 'favorite_border':
    case 'heart':
      return filled ? (
        <Heart {...iconProps} className={`${className} fill-current`} />
      ) : (
        <Heart {...iconProps} />
      );
    case 'tune':
    case 'filters':
    case 'filter':
      return <SlidersHorizontal {...iconProps} />;
    case 'arrow_forward':
    case 'arrow_right':
      return <ArrowRight {...iconProps} />;
    case 'arrow_back':
    case 'arrow_left':
      return <ArrowLeft {...iconProps} />;
    case 'close':
      return <X {...iconProps} />;
    case 'expand_more':
      return <ChevronDown {...iconProps} />;
    case 'expand_less':
      return <ChevronUp {...iconProps} />;
    case 'expand_right':
    case 'chevron_right':
      return <ChevronRight {...iconProps} />;
    case 'admin_panel_settings':
      return <ShieldCheck {...iconProps} />;
    case 'add':
    case 'plus':
      return <Plus {...iconProps} />;
    case 'remove':
    case 'minus':
      return <Minus {...iconProps} />;
    case 'delete':
    case 'trash':
      return <Trash2 {...iconProps} />;
    case 'local_shipping':
    case 'truck':
      return <Truck {...iconProps} />;
    case 'verified':
    case 'shield':
      return <ShieldCheck {...iconProps} />;
    case 'sync_alt':
    case 'published_with_changes':
    case 'refresh':
      return <RefreshCw {...iconProps} />;
    case 'progress_activity':
    case 'spinner':
      return <RefreshCw {...iconProps} className={`${className} animate-spin`} />;
    case 'lock':
      return <Lock {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'check_circle':
      return <CheckCircle2 {...iconProps} />;
    case 'star':
      return <Star {...iconProps} className={`${className} fill-current`} />;
    case 'share':
      return <Share2 {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;
    case 'bolt':
    case 'zap':
      return <Zap {...iconProps} className={`${className} fill-current`} />;
    case 'straighten':
    case 'ruler':
      return <Ruler {...iconProps} />;
    case 'dry_cleaning':
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'credit_card':
      return <CreditCard {...iconProps} />;
    case 'qr_code':
      return <QrCode {...iconProps} />;
    case 'content_copy':
    case 'copy':
      return <Copy {...iconProps} />;
    case 'phone':
      return <Phone {...iconProps} />;
    case 'mail':
      return <Mail {...iconProps} />;
    case 'help':
      return <HelpCircle {...iconProps} />;
    case 'tag':
      return <Tag {...iconProps} />;
    case 'apparel':
      return <Shirt {...iconProps} />;
    case 'zoom_in':
      return <ZoomIn {...iconProps} />;
    case 'dashboard':
      return <LayoutDashboard {...iconProps} />;
    case 'image':
      return <ImageIcon {...iconProps} />;
    case 'view_carousel':
      return <Images {...iconProps} />;
    case 'group':
    case 'customers':
      return <Users {...iconProps} />;
    case 'reviews':
      return <Star {...iconProps} />;
    case 'open_in_new':
      return <ExternalLink {...iconProps} />;
    case 'chat':
      return <MessageSquare {...iconProps} />;
    case 'campaign':
      return <Megaphone {...iconProps} />;
    case 'inventory':
    case 'inventory_2':
      return <Package {...iconProps} />;
    case 'done':
      return <Check {...iconProps} />;
    case 'pin_drop':
      return <MapPin {...iconProps} />;
    case 'confirmation_number':
      return <Tag {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'alert':
      return <AlertCircle {...iconProps} />;
    case 'map_pin':
      return <MapPin {...iconProps} />;
    default:
      return <span className={className}>{name}</span>;
  }
}
