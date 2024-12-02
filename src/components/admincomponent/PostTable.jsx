import { Table, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const PostTable = ({ posts, theme, showPostDetails, deletePost }) => {
    const columnsPosts = [
        {
          title: 'No',
          dataIndex: 'index',
          key: 'index',
          render: (text, record, index) => index + 1,
        },
        {
          title: 'Gambar',
          dataIndex: 'photo',
          key: 'photo',
          render: (text) => <img src={text} alt="No Image" className="w-16 h-16 object-cover" />,
        },
        {
          title: 'Judul',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
          title: 'Deskripsi',
          dataIndex: 'desc',
          key: 'desc',
          width: 400,
          className: 'hidden md:table-cell',
          render: (text) => (
            <div style={{ 
              whiteSpace: 'normal', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              width: '400px', 
              maxWidth: '100%', 
              boxSizing: 'border-box'
            }}>
              {text.length > 300 ? text.substring(0, 300) + '...' : text}
            </div>
          ),
        },
        {
          title: 'Jenis Laporan',
          dataIndex: 'reportType',
          key: 'reportType',
          className: 'hidden md:table-cell',
          sorter: (a, b) => {
            const order = { 'Pencari': 1, 'Penemu': 2 };
            return order[a.reportType] - order[b.reportType];
          },
        },
        {
          title: 'Diposting',
          dataIndex: 'username',
          key: 'username',
          className: 'hidden md:table-cell',
          sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
          title: 'Kontak',
          dataIndex: 'contactNo',
          key: 'contactNo',
          className: 'hidden md:table-cell',
          sorter: (a, b) => a.contactNo.localeCompare(b.contactNo),
        },
        {
          title: 'Aksi',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <div className="flex justify-center space-x-2">
              <Button 
                onClick={() => showPostDetails(record)} 
                icon={<EyeOutlined />} 
                className="flex items-center justify-center"
              >
                View
              </Button>
              <Button 
                onClick={() => deletePost(record._id)} 
                icon={<DeleteOutlined />} 
                danger 
                className="flex items-center justify-center"
                style={{
                  backgroundColor: theme === 'dark' ? '#ff4d4f' : '',
                  borderColor: theme === 'dark' ? '#ff4d4f' : '',
                  color: theme === 'dark' ? 'white' : '',
                }}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ];

  return (
    <Table
      columns={columnsPosts}
      dataSource={posts}
      rowKey="_id"
      pagination={false}
      className={theme === 'dark' ? 'table-dark-mode' : ''}
      scroll={{ x: true }}
      style={{ width: '100%' }}
    />
  );
};

export default PostTable;
