import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
	{
		key: '1',
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.antgroup.com">
				1st menu item
			</a>
		),
	},
	{
		key: '2',
		label: (
			<a target="_blank" rel="noopener noreferrer">
				2nd menu item (disabled)
			</a>
		),
	},
	{
		key: '3',
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.luohanacademy.com">
				3rd menu item (disabled)
			</a>
		),
	},
	{
		key: '4',
		label: 'a danger item',
	},
];

const App: React.FC = () => (
	<Dropdown menu={{ items }}>
		<a onClick={(e) => e.preventDefault()}>
			<Space>
				Hover me
				<DownOutlined />
			</Space>
		</a>
	</Dropdown>
);

export default App;
