import React, { useState } from 'react';
import moment, { Moment } from 'moment';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { CircleButton } from 'components/base/Button';
import { CENTURIES_TABLE, MONTH_TABLE } from 'constant/static';

interface CalenderProps {
	date: string | null;
	onSelect: (date: Moment) => void;
}

interface IDate {
	date: Moment;
	disabled: boolean;
	active: boolean;
	today: boolean;
}

const getWeekday = (date: Moment): number => {
	const year = date.year();
	const month = date.month();
	const day = date.day();

	const initDay = CENTURIES_TABLE.get(Math.floor(year / 100));
	const monthBias = MONTH_TABLE.get(month)?.bias(year);

	if (initDay !== undefined && monthBias !== undefined) {
		const weekday = (initDay + (year % 100) + Math.floor((year % 100) / 4) + monthBias + day) % 7;
		// console.log(date.weekday());
		return weekday;
	}
	return 0;
};

const getNextMonth = (month: number) => {
	return month + 1 > 12 ? 1 : month + 1;
};
const getPrevMonth = (month: number) => {
	return month - 1 < 1 ? 12 : month - 1;
};

const daysOfMonth = new Array(42);

export default function Calender({}: CalenderProps) {
	const [year, setYear] = useState(2021);
	const [month, setMonth] = useState(11);
	const [day, setDay] = useState(3);
	const [today, setToday] = useState();

	const firstDay = moment(`${year}/${month}/1`);
	const weekdayOfFirst = getWeekday(firstDay);
	const daysArray = daysOfMonth.map((_, index) => {
		return index;
	});

	const handleNextDay = () => {
		setDay((prev) => prev + 1);
	};

	const handleNextMonth = () => {
		setMonth((prev) => prev + 1);
	};

	const handleNextYear = () => {
		setYear((prev) => prev + 1);
	};

	const handlePrevDay = () => {
		setDay((prev) => prev - 1);
	};

	const handlePrevMonth = () => {
		setMonth((prev) => prev - 1);
	};

	const handlePrevYear = () => {
		setYear((prev) => prev - 1);
	};

	return (
		<div>
			<IconButton onClick={handlePrevDay}>
				<ArrowBack />
			</IconButton>
			<Button>{year}</Button>
			<IconButton onClick={handleNextDay}>
				<ArrowForward />
			</IconButton>
			<CircleButton variant={'contained'}>{'10'}</CircleButton>
			<div>{getWeekday(moment())}</div>
		</div>
	);
}

const MonthSelector = () => {
	const month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
};

const YearSelector = () => {
	const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
};
