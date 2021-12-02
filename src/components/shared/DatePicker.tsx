import React, { useEffect, useState, useRef } from 'react';
import moment, { Moment } from 'moment';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Calendar from './Calendar';
import { NUMBER_REGEX } from 'constant/static';

interface DatePickerProps {
	date: Moment;
	onChange: (date: Moment) => void;
}

export default function DatePicker({ date, onChange }: DatePickerProps) {
	const [value, setValue] = useState(date.format('YYYY-MM-DD'));
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const inputRef = useRef(null);

	const handleOpenPopover = () => {
		setAnchorEl(inputRef.current);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const filteredValue = value.replace(/-/g, '');

		const YEAR_REGEX = /(\d{4})(\d*)/;
		const MONTH_REGEX = /(\d{4}[/\-]\d{2})(\d*)/;

		// console.log(filteredValue);
		if (filteredValue === '' || NUMBER_REGEX.test(filteredValue)) {
			const formattedValue = filteredValue
				.replace(YEAR_REGEX, (_, p1, p2) => (p2.length > 0 ? [p1, p2].join('-') : p1))
				.replace(MONTH_REGEX, (_, p1, p2) => (p2.length > 0 ? [p1, p2].join('-') : p1));
			setValue(formattedValue);
		}
	};

	useEffect(() => {
		const DATE_REGEX = /\d{4}[/\-]\d{2}[/\-]\d{2}/;

		DATE_REGEX.test(value) && moment(value).isValid() && onChange(moment(value));
	}, [value]);

	useEffect(() => {
		// console.log(moment(value).format('YYYY-MM-DD'));
		setValue(date.format('YYYY-MM-DD'));
	}, [date]);

	const open = Boolean(anchorEl);

	return (
		<div>
			<TextField
				ref={inputRef}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<IconButton onClick={handleOpenPopover}>
								<CalendarToday />
							</IconButton>
						</InputAdornment>
					),
				}}
				value={value}
				onChange={handleChange}
				error={!moment(value).isValid()}
			/>
			<Popover
				id={open ? 'datepicker-calendar' : undefined}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Calendar
					date={date}
					onSelect={(date) => {
						onChange(date);
						handleClose();
					}}
				/>
			</Popover>
		</div>
	);
}
