import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Layout, Menu, Avatar, Badge, Dropdown } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  ThunderboltOutlined,
  BellOutlined,
  BookOutlined,
  HomeOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { logoutThunk } from '@/features/auth/authSlice';

const { Sider, Header, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/');
  };

  const selectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/catalog')) return '/catalog';
    if (path.startsWith('/dashboard')) return '/dashboard';
    if (path.startsWith('/progress')) return '/progress';
    if (path.startsWith('/profile')) return '/profile';
    if (path.startsWith('/teacher')) return '/teacher';
    if (path.startsWith('/admin')) return '/admin';
    return '/catalog';
  };

  const menuItems = [];



if (user?.role === 'teacher') {
  menuItems.push({ key: '/teacher', icon: <TeamOutlined />, label: 'Ученики' });
}

if (user?.role === 'admin') {
  menuItems.push({ key: '/catalog', icon: <AppstoreOutlined />, label: 'Курсы' });
  menuItems.push({ key: '/dashboard', icon: <HomeOutlined />, label: 'Мой кабинет' });
  menuItems.push({ key: '/progress', icon: <BookOutlined />, label: 'Прогресс' });
  menuItems.push({ key: '/teacher', icon: <TeamOutlined />, label: 'Ученики' });
  menuItems.push({ key: '/admin', icon: <SafetyCertificateOutlined />, label: 'Админ' });
}

if (user?.role === 'parent') {
  menuItems.push({ key: '/parent', icon: <HeartOutlined />, label: 'Кабинет родителя' });
}

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Профиль', onClick: () => navigate('/profile') },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Выйти', onClick: handleLogout },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#FFF9EC', display: 'flex' }}>
      <Sider
        width={260}
        style={{
          background: '#405BBC',
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(64, 91, 188, 0.15)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
          >
            <ThunderboltOutlined style={{ fontSize: 28, color: '#F88545' }} />
            <span style={{
              fontSize: '20px',
              fontFamily: "'Scripter', 'Comfortaa', sans-serif",
              color: '#FFFFFF',
              fontWeight: 400,
            }}>
              THE FIREWALL
            </span>
          </motion.div>
        </div>

        <div style={{ padding: '16px 16px 8px' }}>
          <p style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: "'Comfortaa', sans-serif",
            marginBottom: '8px',
          }}>
            Навигация
          </p>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey()]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{
              background: 'transparent',
              border: 'none',
              fontFamily: "'Comfortaa', sans-serif",
            }}
          />
        </div>

        <div style={{ marginTop: 'auto', padding: '16px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <Avatar icon={<UserOutlined />} style={{ background: '#F88545' }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '13px',
                fontFamily: "'Comfortaa', sans-serif",
                color: '#FFFFFF',
                fontWeight: 600,
              }}>
                {user?.username || 'Ученик'}
              </div>
              <div style={{
                fontSize: '11px',
                fontFamily: "'Comfortaa', sans-serif",
                color: 'rgba(255, 255, 255, 0.7)',
              }}>
                {user?.role === 'student' ? 'Ученик' : user?.role === 'teacher' ? 'Учитель' : 'Админ'}
              </div>
            </div>
          </div>
        </div>
      </Sider>

      <Layout style={{ background: '#FFF9EC' }}>
        <Header style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #F1EDE2',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: 64,
          boxShadow: '0 2px 8px rgba(20, 15, 65, 0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Badge dot color="#F88545">
              <BellOutlined style={{ fontSize: 20, color: '#405BBC', cursor: 'pointer' }} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar
                icon={<UserOutlined />}
                style={{ background: '#405BBC', cursor: 'pointer' }}
              />
            </Dropdown>
          </div>
        </Header>

        <Content style={{ padding: '24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </Content>
      </Layout>
    </Layout>
  );
}