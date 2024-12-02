import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Item from "antd/es/list/Item";

const UserTable = ({ users, theme, deleteUser }) => {
    const columnsUsers = [
        {
          title: 'No',
          dataIndex: 'index',
          key: 'index',
          render: (text, record, index) => index + 1,
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
          title: 'Aksi',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <div className="flex justify-center">
              <Button
                onClick={() => deleteUser(record._id)}
                icon={<DeleteOutlined />}
                danger
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
      columns={columnsUsers}
      dataSource={users}
      rowKey="_id"
      pagination={false}
      scroll={{ x: true }}
      style={{ width: '100%' }}
    />
  );
};

export default UserTable;
