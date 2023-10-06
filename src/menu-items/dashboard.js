// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Kho',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Nhập kho',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'export',
      title: 'Xuất kho',
      type: 'item',
      url: '/dashboard/export',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'inventory',
      title: 'Nhập xuất tồn kho',
      type: 'item',
      url: '/dashboard/inventory',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
