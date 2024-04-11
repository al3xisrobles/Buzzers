import EventDiscovery from "./Tabs/Brands/EventDiscovery"
import Menu from "./Menu"
import { DashboardBreadcrumb } from './DashboardBreadcrumb';
import ActiveDeployments from "./Tabs/Brands/ActiveDeployments";

const menuItemData = [
  {
    key: '1',
    breadcrumbItems: ['Dashboard', 'Event Discovery'],
    content: <EventDiscovery/>,
  },
  {
    key: '2',
    breadcrumbItems: ['Dashboard', 'Active Deployments'],
    content: <ActiveDeployments/>,
  },
  {
    key: '3',
    breadcrumbItems: ['Dashboard', 'Deployment History'],
    content: 'Bill is a cat.',
  },
  {
    key: '4',
    breadcrumbItems: ['Dashboard', 'Resources'],
    content: 'Bill is a cat.',
  },
  {
    key: '5',
    breadcrumbItems: ['Dashboard', 'Support'],
    content: 'Bill is a cat.',
  },
  // Add more cases as needed
];

function renderContent(menuItem) {

  const contentData = menuItemData.find(item => item.key === menuItem);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <DashboardBreadcrumb items={contentData.breadcrumbItems}/>
        <Menu/>
      </div>

      {/* Content */}
      {contentData.content}
    </div>
  );
}

export default renderContent;
