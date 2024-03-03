import { Process } from '../assets/logic';
export const sortByArrivalTime = (data: Process[]) => {
	return data.sort((a, b) => a.Arrive - b.Arrive);
};
export const sortByBurstTime = (data: Process[]) => {
	return data.sort((a, b) => a.BurstTime - b.BurstTime);
};
export const sortByPriority = (data: Process[]) => {
	return data.sort((a, b) => b.Priority - a.Priority);
};
export const getMinBurstTime = (data: Process[]) => {
	const sortedData = sortByBurstTime(data);
	return sortedData[0].BurstTime;
};
export const getMinArrivalTime = (data: Process[]) => {
	const sortedData = sortByArrivalTime(data);
	return sortedData[0].Arrive;
};
