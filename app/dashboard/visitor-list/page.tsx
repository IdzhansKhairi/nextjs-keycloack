import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  ic: string;
  visitor_type: string;
  house_unit: string;
  street_name: string;
  block_name: string;
}

export default function VisitorListPage() {

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID Number',
      dataIndex: 'ic',
      key: 'ic',
    },
    {
      title: 'Type',
      dataIndex: 'visitor_type',
      key: 'visitor_type',
    },
    {
      title: 'House Unit',
      dataIndex: 'house_unit',
      key: 'house_unit',
    },
    {
      title: 'Street Name',
      dataIndex: 'street_name',
      key: 'street_name',
    },
    {
      title: 'Block Name',
      dataIndex: 'block_name',
      key: 'block_name',
    }
  ]

  const data: DataType[] = [
    {
      key: '1',
      name: 'Megan Raaj',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '2',
      name: 'Syahid Akbar',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '3',
      name: 'Idzhans Khairi',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '00',
    },
    {
      key: '4',
      name: 'Lenard',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '5',
      name: 'Ariff',
      ic: '01010101010101',
      visitor_type: 'Contractor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '90',
    },
    {
      key: '6',
      name: 'Megan Raaj',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '7',
      name: 'Syahid Akbar',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '8',
      name: 'Idzhans Khairi',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '00',
    },
    {
      key: '9',
      name: 'Lenard',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '10',
      name: 'Ariff',
      ic: '01010101010101',
      visitor_type: 'Contractor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '90',
    },
    {
      key: '11',
      name: 'Megan Raaj',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '12',
      name: 'Syahid Akbar',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '13',
      name: 'Idzhans Khairi',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '00',
    },
    {
      key: '14',
      name: 'Lenard',
      ic: '01010101010101',
      visitor_type: 'Visitor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '-',
    },
    {
      key: '15',
      name: 'Ariff',
      ic: '01010101010101',
      visitor_type: 'Contractor',
      house_unit: 'No 22',
      street_name: 'Jalan UP3/7F',
      block_name: '90',
    },
  ]

  return (
    <div>
      <div className='me-5'>
        <h3 className='text-secondary mb-3'>Visitor List</h3>
        <p>Here is the list of all visitors that coming to Taman Ukay Perdana</p>
      </div>
      
      <div>
        <Table<DataType> columns={columns} dataSource={data} />
      </div>

    </div>
  );
}
