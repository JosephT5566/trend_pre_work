import { Moment } from 'moment';

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
