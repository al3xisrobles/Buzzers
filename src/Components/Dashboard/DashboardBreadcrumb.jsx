import { Breadcrumb } from 'antd';

export const DashboardBreadcrumb = ({ items }) => (
  <div className='w-max'>
    <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
      {items.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)}
    </Breadcrumb>
  </div>
);
