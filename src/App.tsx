import { useState } from 'react';
import moment, { Moment } from 'moment';

import Calendar from 'components/shared/Calendar';
import DatePicker from 'components/shared/DatePicker';

function App() {
	const [date, setDate] = useState<Moment>(moment());

	return (
		<div className="App">
			<header className="App-header"></header>
			<div>{date.format('YYYY-MM-DD')}</div>
			<Calendar date={date} onSelect={setDate} />
			<DatePicker date={date} onChange={setDate} />
		</div>
	);
}

export default App;
