import { useState } from 'react';
import moment, { Moment } from 'moment';

import Calender from 'components/shared/Calender';

function App() {
	const [date, setDate] = useState<Moment>(moment());

	return (
		<div className="App">
			<header className="App-header"></header>
			<Calender date={date} onSelect={(date) => setDate(date)} />
			<div>{date.format('YYYY-MM-DD')}</div>
		</div>
	);
}

export default App;
