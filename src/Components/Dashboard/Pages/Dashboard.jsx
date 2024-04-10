import { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import renderContent from '../DashboardTabManager';

import {
  Search,
  History,
  Crosshair,
  CircleHelp,
  Users,
} from "lucide-react"

import {
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import Logo from "../../../Assets/Dashboard/Sider Icons/Logo.svg"
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Event Discovery', '1',<Search/>),
  getItem('Active Deployments', '2', <Crosshair/>),
  getItem('Deployment History', '3', <History/>),
  getItem('Resources', '4', <CircleHelp/>),
  getItem('Support', '5', <Users/>),
];

const CustomTrigger = ({ collapsed, onClick }) => {
  const triggerStyle = {
    position: 'absolute',
    top: '50%',
    right: '0px', // Adjust this value to place the trigger on the border
    transform: 'translateY(-50%)',
    width: '32px', // Width of the circle
    height: '32px', // Height of the circle
    borderRadius: '50%',
    backgroundColor: '#20201F',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  return (
    <div style={triggerStyle} onClick={onClick}>
      {collapsed ? <RightOutlined style={{ color: '#fff' }} /> : <LeftOutlined style={{ color: '#fff' }}/>}
    </div>
  );
};

function Dashboard() {
  const [menuItem, setMenuItem] = useState('1');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FCD13B',
            colorBgContainer: '#FBFBFB',
          }
        }}
      >
        <Layout
          style={{
            minHeight: '100vh',
            backgroundColor: '#FCD13B'
          }}
        >
          <Sider
            collapsible
            trigger={null}
            width={220}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className='flex h-full flex-col'>
              <div className={`py-10 px-7 ${!collapsed && 'w-max'}`}>
                <a href='/' className=''>
                  <img src={Logo} className='w-[2rem]' alt="Buzzers"/>
                </a>
              </div>
              <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={(item) => {setMenuItem(item["key"])}}/>
            </div>
          </Sider>
          <Layout
            style={{
              boxShadow: '0px 0px 10px 0px rgba(32, 32, 31, 0.10)',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              backgroundColor: '#FBFBFB',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              paddingTop: '1rem',
              position: 'relative',
            }}
          >
            {/* Custom Trigger */}
            <div className='absolute bottom-0 -translate-x-2 -translate-y-10'>
              <CustomTrigger collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}/>
            </div>

            <div className='px-4'>
              {renderContent(menuItem)}
            </div>

          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
export default Dashboard;
