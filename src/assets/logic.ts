/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleDataTableColumn } from 'react-google-charts';
import {
	sortByArrivalTime,
	sortByBurstTime,
	sortByPriority,
} from '../utils/utils';

export interface Process {
	ID: number;
	Process: string;
	BurstTime: number;
	Priority: number;
	Arrive: number;
}
class Queue {
	queue: (string | Date)[];
	constructor(arr: (string | Date)[]) {
		this.queue = arr;
	}
	enqueue(element) {
		// add element
		return this.queue.push(element);
	}
	toArray() {
		return this.queue;
	}
	dequeue() {
		if (this.queue.length > 0) {
			return this.queue.shift(); // remove first element
		}
	}

	peek() {
		return this.queue[this.queue.length - 1];
	}

	size() {
		return this.queue.length;
	}

	isEmpty() {
		return this.queue.length == 0;
	}

	clear() {
		this.queue = [];
	}
}

export const columns: GoogleDataTableColumn[] = [
	{ type: 'string', id: 'Process' },
	{ type: 'string', id: 'Process Name' },
	{ type: 'date', id: 'Start' },
	{ type: 'date', id: 'End' },
];

export const options = {
	timeline: { showRowLabels: false },
	avoidOverlappingGridLines: false,
};

export const FCFS = (data: Process[]) => {
	const result = sortByArrivalTime(data);
	let currentTime = result[0].Arrive;
	const rows: (string | Date)[][] = [];
	for (let i = 0; i < result.length; i++) {
		const row = [
			i.toString(),
			result[i].Process.toString(),
			new Date(0, 0, 0, 0, 0, currentTime),
			new Date(0, 0, 0, 0, 0, currentTime + result[i].BurstTime),
		];
		currentTime += result[i].BurstTime;
		rows.push(row);
	}
	console.log('samplpe rows', rows);
	return [columns, ...rows];
};
export const SJF = (data: Process[]) => {
	const result = sortByBurstTime(data);
	let currentTime = result[0].Arrive;
	const rows: (string | Date)[][] = [];
	for (let i = 0; i < result.length; i++) {
		const row: (string | Date)[] = [
			i.toString(),
			result[i].Process.toString(),
			new Date(0, 0, 0, 0, 0, currentTime),
			new Date(0, 0, 0, 0, 0, currentTime + result[i].BurstTime),
		];
		currentTime += result[i].BurstTime;
		rows.push(row);
	}

	return [columns, ...rows];
};
export const SJFPreemptive = (data: Process[]) => {
	const result = sortByArrivalTime(data);
	let currentTime = result[0].Arrive;
	const rows: (string | Date)[][] = [];
	let i = 0;
	const processQueue = new Queue([]);
	let readyQueue: Process[] = [result[0]];
	let lastIndex = i;
	while (readyQueue.length > 0) {
		if (i + 1 == result.length) {
			readyQueue = sortByBurstTime(readyQueue);
			processQueue.enqueue([
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, currentTime + readyQueue[0].BurstTime),
			]);
			currentTime += readyQueue[0].BurstTime;
			readyQueue.shift();
			//debugger;
		} else if (currentTime + readyQueue[0].BurstTime <= result[i + 1].Arrive) {
			//debugger;
			processQueue.enqueue([
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, currentTime + readyQueue[0].BurstTime),
			]);
			currentTime += readyQueue[0].BurstTime;
			readyQueue.shift();
			//debugger;
			if (readyQueue.length != 1) {
				readyQueue.push(result[i + 1]);
				i++;
			}
			lastIndex = i;
			//debugger;
		} else if (currentTime + readyQueue[0].BurstTime > result[i + 1].Arrive) {
			//debugger;
			readyQueue.push(result[i + 1]);
			const row = [
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, result[i + 1].Arrive),
			];
			processQueue.enqueue(row);
			const remainingProcess: Process = {
				ID: readyQueue[0].ID,
				Process: readyQueue[0].Process,
				BurstTime:
					readyQueue[0].BurstTime - (result[i + 1].Arrive - currentTime),
				Priority: readyQueue[0].Priority,
				Arrive: readyQueue[0].Arrive,
			};
			//debugger;
			currentTime = result[i + 1].Arrive;
			readyQueue.shift();
			readyQueue.push(remainingProcess);
			readyQueue = sortByBurstTime(readyQueue);
			i += 1;
			lastIndex = i;
			//debugger;
		}
	}
	processQueue.queue.forEach((row) => {
		rows.push(row);
	});
	console.log('process', processQueue);
	console.log('row', rows);
	return [columns, ...rows];
};
export const Priority = (data: Process[]) => {
	const result = sortByPriority(data);
	let currentTime = result[0].Arrive;
	let rows: (string | Date)[][] = [];
	for (let i = 0; i < result.length; i++) {
		const row = [
			i.toString(),
			result[i].Process.toString(),
			new Date(0, 0, 0, 0, 0, currentTime),
			new Date(0, 0, 0, 0, 0, currentTime + result[i].BurstTime),
		];
		currentTime += result[i].BurstTime;
		rows.push(row);
	}

	return [columns, ...rows];
};
export const PreemptivePriority = (data: Process[]) => {
	const result = sortByArrivalTime(data);
	let currentTime = result[0].Arrive;
	const rows: (string | Date)[][] = [];
	let i = 0;
	const processQueue = new Queue([]);
	let readyQueue: Process[] = [result[0]];
	let lastIndex = i;
	while (readyQueue.length > 0) {
		if (i + 1 == result.length) {
			readyQueue = sortByPriority(readyQueue);
			processQueue.enqueue([
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, currentTime + readyQueue[0].BurstTime),
			]);
			currentTime += readyQueue[0].BurstTime;
			readyQueue.shift();
			//debugger;
		} else if (readyQueue[0].Priority <= result[i + 1].Priority) {
			//debugger;
			processQueue.enqueue([
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, currentTime + readyQueue[0].BurstTime),
			]);
			currentTime += readyQueue[0].BurstTime;
			readyQueue.shift();
			//debugger;
			if (readyQueue.length != 1) {
				readyQueue.push(result[i + 1]);
				i++;
			}
			lastIndex = i;
			//debugger;
		} else if (readyQueue[0].Priority > result[i + 1].Priority) {
			//debugger;
			readyQueue.push(result[i + 1]);
			const row = [
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, result[i + 1].Arrive),
			];
			processQueue.enqueue(row);
			const remainingProcess: Process = {
				ID: readyQueue[0].ID,
				Process: readyQueue[0].Process,
				BurstTime:
					readyQueue[0].BurstTime - (result[i + 1].Arrive - currentTime),
				Priority: readyQueue[0].Priority,
				Arrive: readyQueue[0].Arrive,
			};
			//debugger;
			currentTime = result[i + 1].Arrive;
			readyQueue.shift();
			readyQueue.push(remainingProcess);
			readyQueue = sortByBurstTime(readyQueue);
			i += 1;
			lastIndex = i;
			//debugger;
		}
	}
	processQueue.queue.forEach((row) => {
		rows.push(row);
	});
	console.log('process', processQueue);
	console.log('row', rows);
	return [columns, ...rows];
};

export const RoundRobin = (data: Process[], quantum: number) => {
	const result = sortByArrivalTime(data);
	let currentTime = result[0].Arrive;
	const rows: (string | Date)[][] = [];
	const processQueue = new Queue([]);
	let readyQueue: Process[] = result;

	while (readyQueue.length > 0) {
		if (readyQueue[0].BurstTime <= quantum) {
			processQueue.enqueue([
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, currentTime + readyQueue[0].BurstTime),
			]);
			currentTime += readyQueue[0].BurstTime;
			readyQueue.shift();
		} else if (readyQueue[0].BurstTime > quantum) {
			processQueue.enqueue([
				readyQueue[0].ID,
				readyQueue[0].Process,
				new Date(0, 0, 0, 0, 0, currentTime),
				new Date(0, 0, 0, 0, 0, currentTime + quantum),
			]);
			currentTime += quantum;
			const remainingProcess: Process = {
				ID: readyQueue[0].ID,
				Process: readyQueue[0].Process,
				BurstTime: readyQueue[0].BurstTime - quantum,
				Priority: readyQueue[0].Priority,
				Arrive: readyQueue[0].Arrive,
			};
			readyQueue.shift();
			readyQueue.push(remainingProcess);
		}
	}
	processQueue.queue.forEach((row) => {
		rows.push(row);
	});
	console.log('process', processQueue);
	console.log('row', rows);
	return [columns, ...rows];
};
