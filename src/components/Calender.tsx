import React from 'react';

import { CircleButton } from 'components/base/Button';

export default function Calender() {
	return (
		<>
			<CircleButton variant={'contained'}>{'10'}</CircleButton>
			<CircleButton variant={'contained'}>{'1'}</CircleButton>
			<CircleButton variant={'contained'}>{'31'}</CircleButton>
		</>
	);
}
