import { CENTURIES_TABLE, MONTH_TABLE } from './statics';
import { Moment } from 'moment';

export const isLeapYear = (year: number): boolean => {
	if (year % 4 !== 0) {
		return false;
	}
	if (year % 100 === 0) {
		if (year % 400 === 0) {
			return true;
		}
		return false;
	}
	return true;
};

export const getWeekday = (date: Moment): number => {
	const year = date.get('year');
	const month = date.get('month');
	const day = date.get('date');

	const initDay = CENTURIES_TABLE[Math.floor(year / 100)];
	const monthBias = MONTH_TABLE[month].bias(year);

	const weekday = (initDay + (year % 100) + Math.floor((year % 100) / 4) + monthBias + day) % 7;
	return weekday;
};

export const getNextMonth = (month: number) => {
	return month + 1 > 11 ? 0 : month + 1;
};

export const getPrevMonth = (month: number) => {
	return month - 1 < 0 ? 11 : month - 1;
};
