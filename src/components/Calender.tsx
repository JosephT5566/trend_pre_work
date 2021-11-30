import React, { useState, useEffect, useReducer } from 'react';
import moment, { Moment } from 'moment';

import { styled } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { CircleButton } from 'components/base/Button';
import { CENTURIES_TABLE, MONTH_TABLE } from 'constant/static';

const CalenderContainer = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const NavBar = styled('div')({
	display: 'flex',
});

const DaySelectorContainer = styled('div')({
	display: 'grid',
});

const MonthSelectorContainer = styled('div')({
	display: 'grid',
});

const YearSelectorContainer = styled('div')({
	display: 'grid',
});

enum SelectActionKind {
	YearSelect = 'YearSelect',
	MonthSelect = 'MonthSelect',
	DaySelect = 'DaySelect',
}

interface SelectAction {
	type: SelectActionKind;
}

const selectTypeReducer = (state: SelectActionKind, action: SelectAction) => {
	const { type } = action;
	switch (type) {
		case SelectActionKind.YearSelect:
			return SelectActionKind.YearSelect;
		case SelectActionKind.MonthSelect:
			return SelectActionKind.MonthSelect;
		case SelectActionKind.DaySelect:
			return SelectActionKind.DaySelect;
		default:
			return state;
	}
};

interface CalenderProps {
	date: string | null;
	onSelect: (date: Moment) => void;
}

interface IButton {
	disabled: boolean;
	active: boolean;
}

type IDateButton = IButton & {
	date: Moment;
	isToday: boolean;
};

type IMonthButton = IButton & {
	month: number;
};

type IYearButton = IButton & {
	year: number;
};

const getWeekday = (date: Moment): number => {
	const year = date.year();
	const month = date.month();
	const day = date.day();

	const initDay = CENTURIES_TABLE[Math.floor(year / 100)];
	const monthBias = MONTH_TABLE[month].bias(year);

	if (initDay !== undefined) {
		const weekday =
			(initDay + (year % 100) + Math.floor((year % 100) / 4) + monthBias + day) % 7;
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
	const [selectedDay, setSelectedDay] = useState(moment());
	const [today] = useState(moment());
	const [step, dispatch] = useReducer(selectTypeReducer, SelectActionKind.DaySelect);

	useEffect(() => {
		console.log('step', step);
	}, [step]);

	useEffect(() => {
		console.log('selectedDay', selectedDay.format('YYYY-MM-DD'));
	}, [selectedDay]);

	const handleNextDay = () => {
		setSelectedDay((prev) => prev.add(1, 'day'));
	};

	const handlePrevDay = () => {
		setSelectedDay(moment());
	};

	const selectorFactory = () => {
		switch (step) {
			case SelectActionKind.DaySelect:
				return (
					<DaySelector
						year={year}
						month={month}
						today={today}
						selectedDay={selectedDay}
						dispatch={dispatch}
						onClick={(date) => setSelectedDay(date)}
					/>
				);
			case SelectActionKind.MonthSelect:
				return (
					<MonthSelector
						year={year}
						month={month}
						dispatch={dispatch}
						onClick={(month) => setMonth(month)}
					/>
				);
			case SelectActionKind.YearSelect:
				return (
					<YearSelector
						year={year}
						dispatch={dispatch}
						onClick={(year) => setYear(year)}
					/>
				);
			default:
				break;
		}
	};

	return (
		<CalenderContainer>
			<div>{step}</div>
			{selectorFactory()}
		</CalenderContainer>
	);
}

const DaySelector = (props: {
	year: number;
	month: number;
	today: Moment;
	selectedDay: Moment;
	dispatch: React.Dispatch<SelectAction>;
	onClick: (month: Moment) => void;
}) => {
	const { year, month, today, selectedDay, dispatch, onClick } = props;
	const [daysArray, setDaysArray] = useState<Array<IDateButton>>([]);

	useEffect(() => {
		console.log('daysArray', daysArray);
	}, [daysArray]);

	useEffect(() => {
		const firstDay = moment(`${year}/${month}/1`);
		const weekdayOfFirst = getWeekday(firstDay);
		setDaysArray(
			daysOfMonth.map((_, index) => {
				const dayIndex = index - weekdayOfFirst;
				const monthDetail = MONTH_TABLE[month];

				let date: Moment;
				let disabled = true;
				let active = false;
				let isToday = false;

				if (dayIndex <= 0) {
					const prevMonth = getPrevMonth(month);
					const prevMonthDetail = MONTH_TABLE[prevMonth];
					const day = prevMonthDetail.days(year) + dayIndex;
					date = moment(`${year}/${prevMonth + 1}/${day}`);
					return {
						date,
						disabled,
						active,
						isToday,
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
						isToday,
					};
				}

				date = moment(`${year}/${month + 1}/${dayIndex}`);
				disabled = false;
				isToday = date.isSame(today.format('YYYY-MM-DD'));
				active = date.isSame(selectedDay.format('YYYY-MM-DD'));

				return {
					date,
					disabled,
					active,
					isToday,
				};
			})
		);
	}, [year, month, selectedDay]);

	return (
		<>
			<NavBar>
				<IconButton>
					<ArrowBack />
				</IconButton>
				<Button
					onClick={() => {
						dispatch({ type: SelectActionKind.MonthSelect });
					}}
				>{`${year} ${MONTH_TABLE[month].label}`}</Button>
				<IconButton>
					<ArrowForward />
				</IconButton>
			</NavBar>
			<div>
				{daysArray.map((day, index) => (
					<CircleButton
						key={index}
						active={day.active}
						today={day.isToday}
						disabled={day.disabled}
						onClick={() => {
							onClick(day.date);
						}}
					>
						{day.date.format('DD')}
					</CircleButton>
				))}
			</div>
		</>
	);
};

const MonthSelector = (props: {
	year: number;
	month: number;
	dispatch: React.Dispatch<SelectAction>;
	onClick: (month: number) => void;
}) => {
	const { year, month, dispatch, onClick } = props;
	const monthes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	const monthesArray: Array<IMonthButton> = monthes.map((value) => {
		return value === month
			? { month: value, active: true, disabled: false }
			: { month: value, active: false, disabled: false };
	});

	return (
		<>
			<NavBar>
				<IconButton>
					<ArrowBack />
				</IconButton>
				<Button
					onClick={() => {
						dispatch({ type: SelectActionKind.YearSelect });
					}}
				>
					{year}
				</Button>
				<IconButton>
					<ArrowForward />
				</IconButton>
			</NavBar>
			<div>
				{monthesArray.map((month, index) => (
					<CircleButton
						key={index}
						active={month.active}
						disabled={month.disabled}
						onClick={() => {
							onClick(month.month);
							dispatch({ type: SelectActionKind.DaySelect });
						}}
					>
						{MONTH_TABLE[month.month].label}
					</CircleButton>
				))}
			</div>
		</>
	);
};

const YearSelector = (props: {
	year: number;
	dispatch: React.Dispatch<SelectAction>;
	onClick: (month: number) => void;
}) => {
	const { year, dispatch, onClick } = props;
	const [yearInit, setYearInit] = useState(Math.floor(year / 10) * 10);
	const [yearsArray, setYearsArray] = useState<Array<IYearButton>>([]);

	useEffect(() => {
		const array = new Array(10).fill(0).map((_, index) => {
			return yearInit + index === year
				? { year: yearInit + index, active: true, disabled: false }
				: { year: yearInit + index, active: false, disabled: false };
		});

		setYearsArray([
			{ year: yearInit - 1, disabled: true, active: false },
			...array,
			{ year: yearInit + 10, disabled: true, active: false },
		]);
	}, [yearInit]);

	return (
		<>
			<NavBar>
				<IconButton>
					<ArrowBack />
				</IconButton>
				<Button
					onClick={() => {
						dispatch({ type: SelectActionKind.MonthSelect });
					}}
				>
					{`${yearInit} - ${yearInit + 9}`}
				</Button>
				<IconButton>
					<ArrowForward />
				</IconButton>
			</NavBar>
			<div>
				{yearsArray.map((year, index) => (
					<CircleButton
						key={index}
						active={year.active}
						disabled={year.disabled}
						onClick={() => {
							onClick(year.year);
							dispatch({ type: SelectActionKind.MonthSelect });
						}}
					>
						{year.year}
					</CircleButton>
				))}
			</div>
		</>
	);
};
