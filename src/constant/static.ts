export const CENTURIES_TABLE = new Map<number, number>();
CENTURIES_TABLE.set(17, 4);
CENTURIES_TABLE.set(18, 2);
CENTURIES_TABLE.set(19, 0);
CENTURIES_TABLE.set(20, 6);
CENTURIES_TABLE.set(21, 4);

export const MONTH_TABLE = new Map<number, number>();
MONTH_TABLE.set(0, 0);
MONTH_TABLE.set(1, 3);
MONTH_TABLE.set(2, 3);
MONTH_TABLE.set(3, 6);
MONTH_TABLE.set(4, 1);
MONTH_TABLE.set(5, 4);
MONTH_TABLE.set(6, 6);
MONTH_TABLE.set(7, 2);
MONTH_TABLE.set(8, 5);
MONTH_TABLE.set(9, 0);
MONTH_TABLE.set(10, 3);
MONTH_TABLE.set(11, 6);

interface IMonth {
	value: number;
	label: string;
}

export const MONTHES: Array<IMonth> = [
	{ value: 0, label: 'Jan' },
	{ value: 1, label: 'Feb' },
	{ value: 2, label: 'Mar' },
	{ value: 3, label: 'Apr' },
	{ value: 4, label: 'May' },
	{ value: 5, label: 'Jun' },
	{ value: 6, label: 'Jul' },
	{ value: 7, label: 'Aug' },
	{ value: 8, label: 'Sep' },
	{ value: 9, label: 'Oct' },
	{ value: 10, label: 'Nov' },
	{ value: 11, label: 'Dec' },
];
