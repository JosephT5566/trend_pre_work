import React, { useState, useEffect, useReducer } from 'react';
import moment, { Moment } from 'moment';

import { styled } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBackIosNew';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { CircleButton } from 'components/base/Button';

import { IDateButton, IMonthButton, IYearButton } from './type';
import { MONTH_TABLE } from './statics';
import { getWeekday, getNextMonth, getPrevMonth } from './helpers';

const CalenderContainer = styled('div')({
	width: 'fit-content',
	padding: '1em',
	display: 'flex',
	gap: '0.5em',
	flexDirection: 'column',
	alignItems: 'center',
	border: 'solid 1px gray',
});

const NavBar = styled('div')({
	width: '100%',
	display: 'flex',
});

const DaySelectorContainer = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gap: '0.5em',
});

const MonthSelectorContainer = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gap: '0.5em',
});

const YearSelectorContainer = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gap: '0.5em',
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
	date: Moment;
	onSelect: (date: Moment) => void;
}

const daysOfMonth = new Array(42).fill(0);

export default function Calender({ date: selectedDay, onSelect: handleSelect }: CalenderProps) {
	const today = moment();
	const [year, setYear] = useState(today.get('year'));
	const [month, setMonth] = useState(today.get('month'));
	const [step, dispatch] = useReducer(selectTypeReducer, SelectActionKind.DaySelect);

	useEffect(() => {
		// console.log('selectedDay', selectedDay.format('YYYY-MM-DD'));
		const selectedYear = selectedDay.get('year');
		const selectedMonth = selectedDay.get('month');

		setYear(selectedYear);
		setMonth(selectedMonth);
	}, [selectedDay]);

	const handleNextDay = () => {
		handleSelect(moment(selectedDay, 'YYYY-MM-DD').add(1, 'day'));
	};

	const handlePrevDay = () => {
		handleSelect(moment(selectedDay, 'YYYY-MM-DD').subtract(1, 'day'));
	};

	const handleNextMonth = () => {
		setMonth((prev) => (prev + 1 > 11 ? 0 : prev + 1));
	};

	const handlePrevMonth = () => {
		setMonth((prev) => (prev - 1 < 0 ? 11 : prev - 1));
	};

	const handleNextYear = () => {
		setYear((prev) => prev + 1);
	};

	const handlePrevYear = () => {
		setYear((prev) => prev - 1);
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
						onClick={(date) => handleSelect(date)}
						onClickNext={handleNextDay}
						onClickPrev={handlePrevDay}
					/>
				);
			case SelectActionKind.MonthSelect:
				return (
					<MonthSelector
						year={year}
						month={month}
						dispatch={dispatch}
						onClick={(month) => setMonth(month)}
						onClickNext={handleNextMonth}
						onClickPrev={handlePrevMonth}
					/>
				);
			case SelectActionKind.YearSelect:
				return (
					<YearSelector
						year={year}
						dispatch={dispatch}
						onClick={(year) => setYear(year)}
						onClickNext={handleNextYear}
						onClickPrev={handlePrevYear}
					/>
				);
			default:
				break;
		}
	};

	return <CalenderContainer>{selectorFactory()}</CalenderContainer>;
}

const DaySelector = (props: {
	year: number;
	month: number;
	today: Moment;
	selectedDay: Moment;
	dispatch: React.Dispatch<SelectAction>;
	onClick: (month: Moment) => void;
	onClickNext: () => void;
	onClickPrev: () => void;
}) => {
	const { year, month, today, selectedDay, dispatch, onClick, onClickNext, onClickPrev } = props;
	const [daysArray, setDaysArray] = useState<Array<IDateButton>>([]);
	const week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	// useEffect(() => {
	// 	console.log('daysArray', daysArray);
	// }, [daysArray]);

	useEffect(() => {
		const firstDay = moment(`${year}/${month + 1}/1`, 'YYYY-MM-DD');
		const weekdayOfFirst = getWeekday(firstDay);
		setDaysArray(
			daysOfMonth.map((_, index) => {
				const dayIndex = index + 1 - weekdayOfFirst;
				const monthDetail = MONTH_TABLE[month];

				let date: Moment;
				let disabled = true;
				let active = false;
				let isToday = false;

				if (dayIndex <= 0) {
					const prevMonth = getPrevMonth(month);
					const prevMonthDetail = MONTH_TABLE[prevMonth];
					const day = prevMonthDetail.days(year) + dayIndex;
					date = moment(`${year}/${prevMonth + 1}/${day}`, 'YYYY-MM-DD');
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
					date = moment(`${year}/${nextMonth + 1}/${day}`, 'YYYY-MM-DD');
					return {
						date,
						disabled,
						active,
						isToday,
					};
				}

				date = moment(`${year}/${month + 1}/${dayIndex}`, 'YYYY-MM-DD');
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
	}, [year, month, today, selectedDay]);

	return (
		<>
			<NavBar>
				<IconButton onClick={onClickPrev}>
					<ArrowBack fontSize={'small'} />
				</IconButton>
				<Button
					sx={{
						flexGrow: 1,
						fontWeight: 'bold',
						color: 'black',
						textTransform: 'initial',
					}}
					onClick={() => {
						dispatch({ type: SelectActionKind.MonthSelect });
					}}
				>{`${MONTH_TABLE[month].label} ${year}`}</Button>
				<IconButton onClick={onClickNext}>
					<ArrowForward fontSize={'small'} />
				</IconButton>
			</NavBar>
			<DaySelectorContainer>
				{week.map((weekday, index) => (
					<div style={{ fontWeight: 'bold', textAlign: 'center' }} key={index}>
						{weekday}
					</div>
				))}
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
			</DaySelectorContainer>
		</>
	);
};

const MonthSelector = (props: {
	year: number;
	month: number;
	dispatch: React.Dispatch<SelectAction>;
	onClick: (month: number) => void;
	onClickNext: () => void;
	onClickPrev: () => void;
}) => {
	const { year, month, dispatch, onClick, onClickNext, onClickPrev } = props;
	const monthes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	const monthesArray: Array<IMonthButton> = monthes.map((value) => {
		return value === month
			? { month: value, active: true, disabled: false }
			: { month: value, active: false, disabled: false };
	});

	return (
		<>
			<NavBar>
				<IconButton onClick={onClickPrev}>
					<ArrowBack fontSize={'small'} />
				</IconButton>
				<Button
					sx={{
						flexGrow: 1,
						fontWeight: 'bold',
						color: 'black',
					}}
					onClick={() => {
						dispatch({ type: SelectActionKind.YearSelect });
					}}
				>
					{year}
				</Button>
				<IconButton onClick={onClickNext}>
					<ArrowForward fontSize={'small'} />
				</IconButton>
			</NavBar>
			<MonthSelectorContainer>
				{monthesArray.map((month, index) => (
					<CircleButton
						key={index}
						active={month.active}
						disabled={month.disabled}
						sx={{ p: '0.6em 0.5em' }}
						onClick={() => {
							onClick(month.month);
							dispatch({ type: SelectActionKind.DaySelect });
						}}
					>
						{MONTH_TABLE[month.month].label}
					</CircleButton>
				))}
			</MonthSelectorContainer>
		</>
	);
};

const YearSelector = (props: {
	year: number;
	dispatch: React.Dispatch<SelectAction>;
	onClick: (month: number) => void;
	onClickNext: () => void;
	onClickPrev: () => void;
}) => {
	const { year, dispatch, onClick, onClickNext, onClickPrev } = props;
	const [yearInit, setYearInit] = useState(Math.floor(year / 10) * 10);
	const [yearsArray, setYearsArray] = useState<Array<IYearButton>>([]);

	useEffect(() => {
		setYearInit(Math.floor(year / 10) * 10);
	}, [year]);

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
	}, [yearInit, year]);

	return (
		<>
			<NavBar>
				<IconButton onClick={onClickPrev}>
					<ArrowBack fontSize={'small'} />
				</IconButton>
				<Button
					sx={{
						flexGrow: 1,
						fontWeight: 'bold',
						color: 'black',
					}}
					onClick={() => {
						dispatch({ type: SelectActionKind.MonthSelect });
					}}
				>
					{`${yearInit} - ${yearInit + 9}`}
				</Button>
				<IconButton onClick={onClickNext}>
					<ArrowForward fontSize={'small'} />
				</IconButton>
			</NavBar>
			<YearSelectorContainer>
				{yearsArray.map((year, index) => (
					<CircleButton
						key={index}
						active={year.active}
						disabled={year.disabled}
						sx={{ p: '0.6em 0.5em' }}
						onClick={() => {
							onClick(year.year);
							dispatch({ type: SelectActionKind.MonthSelect });
						}}
					>
						{year.year}
					</CircleButton>
				))}
			</YearSelectorContainer>
		</>
	);
};
