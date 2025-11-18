import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  location: string;
  shift: string;
  contact: string;
  notes: string;
}

export default function SecurityListPage() {

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location Assigned',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  const securityList: DataType[] = [
    {
      key: 'Bahadur',
      name: 'Bahadur',
      location: 'Post A',
      shift: 'Morning',
      contact: '012-345 6789',
      notes: '-',
    },
    {
      key: 'Bahadur',
      name: 'Bahadur',
      location: 'Post A',
      shift: 'Morning',
      contact: '012-345 6789',
      notes: '-',
    },
    {
      key: 'Bahadur',
      name: 'Bahadur',
      location: 'Post A',
      shift: 'Morning',
      contact: '012-345 6789',
      notes: '-',
    },
    {
      key: 'Bahadur',
      name: 'Bahadur',
      location: 'Post A',
      shift: 'Morning',
      contact: '012-345 6789',
      notes: '-',
    },
    {
      key: 'Bahadur',
      name: 'Bahadur',
      location: 'Post A',
      shift: 'Morning',
      contact: '012-345 6789',
      notes: '-',
    }
  ]

  return (
    <div>
      <div className='me-5'>
        <h3 className='text-secondary mb-3'>Security List</h3>
        <p>Here is the list of security guard that working at Taman Ukay Perdana</p>
      </div>

      <div>
        <Table<DataType> columns={columns} dataSource={securityList}></Table>
      </div>
      
    </div>
  );
}
