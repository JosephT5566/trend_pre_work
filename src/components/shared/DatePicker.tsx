import React from 'react';
import { Moment } from 'moment';

import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Calender from './Calender';

interface DatePickerProps {
	date: Moment;
	onSelect: (date: Moment) => void;
}

export default function DatePicker({ date, onSelect }: DatePickerProps) {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			<IconButton onClick={handleClick}>
				<CalendarToday />
			</IconButton>
			<Popover
				id={open ? 'datepicker-calender' : undefined}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Calender date={date} onSelect={onSelect} />
			</Popover>
		</div>
	);
}
