import React, { useEffect, useState } from 'react';
import Discovery from '../../../Assets/Dashboard/Sider Icons/discovery.png'
import Deployments from '../../../Assets/Dashboard/Sider Icons/deployments.png'
import History from '../../../Assets/Dashboard/Sider Icons/history.png'
import Resources from '../../../Assets/Dashboard/Sider Icons/resources.png'
import Support from '../../../Assets/Dashboard/Sider Icons/support.png'
import Bookmark from "../../../Assets/Dashboard/bookmark.svg";
import Cart from "../../../Assets/Dashboard/cart.svg";
import User from "../../../Assets/Dashboard/user.svg";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User as LucideUser,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Breadcrumb, Layout, Menu, theme } from 'antd';
import Logo from "../../../Assets/Dashboard/Sider Icons/Logo.svg"
import Event from '../Event'
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Event Discovery', '1', <img className="w-5" src={Discovery} alt="discovery"/>),
  getItem('Active Deployments', '2', <img className="w-5" src={Deployments} alt="deployments"/>),
  getItem('Deployment History', '3', <img className="w-5" src={History} alt="history"/>),
  getItem('Resources', '4', <img className="w-5" src={Resources} alt="resources"/>),
  getItem('Support', '5', <img className="w-5" src={Support} alt="support"/>),
];

function renderContent(menuItem, colorBgContainer, borderRadiusLG) {

  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  switch (menuItem) {
    case '1':
      return (
        <div>
          <div className='flex flex-row justify-between'>
            <div className='w-max'>
              <Breadcrumb
                separator=">"
                style={{
                  margin: '16px 0',
                }}
              >
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Event Discovery</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className='flex flex-row items-center'>

                <Button variant="ghost" className="px-3">
                  <img src={Bookmark} className="h-5" alt="bookmark"/>
                </Button>
                <Button variant="ghost" className="px-3">
                  <img src={Cart} className="h-5 m-0" alt="bookmark"/>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3">
                      <img src={User} className="h-5" alt="bookmark"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                    >
                      <LucideUser className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      checked={showActivityBar}
                      onCheckedChange={setShowActivityBar}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      checked={showPanel}
                      onCheckedChange={setShowPanel}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

            </div>
          </div>
          <div>
            <Event
              title="Backyard Concert"
              org="Tavern Band"
              desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              duration="3-4 hr"
              impressions="400 people"
              match="97%"
            />
            <hr className='border-obsidian opacity-50'/>
          </div>
        </div>
      );
    case '2':
      return (
        <div>
          <Breadcrumb
            separator=">"
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Active Deployments</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </div>
      );
    case '3':
      return (
        <div>
          <Breadcrumb
            separator=">"
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Deployment History</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </div>
      );
    case '4':
      return (
        <div>
          <Breadcrumb
            separator=">"
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Resources</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </div>
      );
    case '5':
      return (
        <div>
          <Breadcrumb
            separator=">"
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Support</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </div>
      );
    default:
      return <div>Select an item from the menu</div>;
  }
}

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    console.log(menuItem);
  }, [menuItem]);

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

            {menuItem === '1' &&
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                {renderContent(menuItem, colorBgContainer, borderRadiusLG)}

              </Content>
            }
            {menuItem === '2' &&
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                {renderContent(menuItem, colorBgContainer, borderRadiusLG)}

              </Content>
            }
            {menuItem === '3' &&
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                {renderContent(menuItem, colorBgContainer, borderRadiusLG)}

              </Content>
            }
            {menuItem === '4' &&
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                {renderContent(menuItem, colorBgContainer, borderRadiusLG)}

              </Content>
            }
            {menuItem === '5' &&
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                {renderContent(menuItem, colorBgContainer, borderRadiusLG)}

              </Content>
            }

          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};
export default Dashboard;
