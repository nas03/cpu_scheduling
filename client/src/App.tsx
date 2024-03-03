/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart } from 'react-google-charts';
import { data as dataFile } from './assets/input';
import './index.css';
import { FCFS, Priority, SJF, SJFPreemptive, RoundRobin } from './assets/logic';
import { useEffect, useState } from 'react';
import { options } from './assets/logic';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const App = () => {
	const [data, setData] = useState<any>([]);
	const [mode, setMode] = useState('FCFS');
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<a target="_blank" rel="noopener noreferrer">
					FCFS
				</a>
			),
			onClick: () => setMode('FCFS'),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer">
					SJF
				</a>
			),
			onClick: () => setMode('SJF'),
		},
		{
			key: '3',
			label: (
				<a target="_blank" rel="noopener noreferrer">
					Priority
				</a>
			),
			onClick: () => setMode('Priority'),
		},
		{
			key: '4',
			label: (
				<a target="_blank" rel="noopener noreferrer">
					SJFPreemptive
				</a>
			),
			onClick: () => setMode('SJFPreemptive'),
		},
		{
			key: '5',
			label: (
				<a target="_blank" rel="noopener noreferrer">
					RoundRobin
				</a>
			),
			onClick: () => setMode('RoundRobin'),
		},
	];
	useEffect(() => {
		let res;
		switch (mode) {
			case 'FCFS':
				res = FCFS(dataFile);
				break;
			case 'Priority':
				res = Priority(dataFile);
				break;
			case 'SJFPreemptive':
				res = SJFPreemptive(dataFile);
				break;
			case 'RoundRobin':
				res = RoundRobin(dataFile, 2);
				break;
			default:
				res = SJF(dataFile);
				break;
		}

		setData(res);
	}, [mode]);

	return (
		<>
			<Dropdown menu={{ items: items }}>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						{mode}
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>
			<Chart
				className="ml-auto mr-auto"
				chartType="Timeline"
				data={data}
				width="80%"
				height="400px"
				options={options}
			/>
		</>
	);
};
export default App;
