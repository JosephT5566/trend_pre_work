import React, { useState, useEffect } from 'react';
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
	return month + 1 > 11 ? 0 : month + 1;
};
const getPrevMonth = (month: number) => {
	return month - 1 < 0 ? 11 : month - 1;
};

const daysOfMonth = new Array(42).fill(0);

export default function Calender({}: CalenderProps) {
	const [year, setYear] = useState(moment().year());
	const [month, setMonth] = useState(moment().month());
	const [day, setDay] = useState(moment().day());
	const [today, setToday] = useState(moment());
	const [daysArray, setDaysArray] = useState<Array<IDate>>([]);

	// useEffect(() => {
	// 	console.log('today', today.month(), today.format('YYYY-MM-DD'));
	// }, []);

	useEffect(() => {
		const firstDay = moment(`${year}/${month}/1`);
		const weekdayOfFirst = getWeekday(firstDay);
		setDaysArray(
			daysOfMonth.map((_, index) => {
				const dayIndex = index - weekdayOfFirst;
				const monthDetail = MONTH_TABLE.get(month);
				if (!monthDetail) {
					return {} as IDate;
				}

				let date: Moment;
				let disabled = true;
				let active = false;
				let today = false;

				if (dayIndex <= 0) {
					const prevMonth = getPrevMonth(month);
					const prevMonthDetail = MONTH_TABLE.get(prevMonth);
					const day = prevMonthDetail ? prevMonthDetail.days(year) + dayIndex : 0;
					date = moment(`${year}/${prevMonth + 1}/${day}`);
					return {
						date,
						disabled,
						active,
						today,
					};
				}
				if (dayIndex > monthDetail.days(year)) {
					const nextMonth = getNextMonth(month);
					const day = dayIndex - monthDetail.days(year);
					date = moment(`${year}/${nextMonth + 1}/${day}`);
					return {
						date,
						disabled,
						active,
						today,
					};
				}

				date = moment(`${year}/${month + 1}/${dayIndex}`);
				disabled = false;

				return {
					date,
					disabled,
					active,
					today,
				};
			})
		);
	}, [year, month]);

	useEffect(() => {
		console.log('daysArray', daysArray);
	}, [daysArray]);

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
			{/* <div>{getWeekday(moment())}</div> */}
			{daysArray.map((day, index) => (
				<CircleButton key={index} variant={'contained'}>
					{day.date.format('DD')}
				</CircleButton>
			))}
		</div>
	);
}

const MonthSelector = () => {
	const month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
};

const YearSelector = () => {
	const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
};
