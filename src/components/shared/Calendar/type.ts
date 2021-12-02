import { Moment } from 'moment';

export interface IMonthDetail {
	bias: (year: number) => number;
	label: string;
	days: (year: number) => number;
}

interface IButton {
	disabled: boolean;
	active: boolean;
}

export type IDateButton = IButton & {
	date: Moment;
	isToday: boolean;
};

export type IMonthButton = IButton & {
	month: number;
};

export type IYearButton = IButton & {
	year: number;
};
