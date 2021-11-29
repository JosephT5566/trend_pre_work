export const CENTURIES_TABLE = new Map<number, number>();
CENTURIES_TABLE.set(17, 4);
CENTURIES_TABLE.set(18, 2);
CENTURIES_TABLE.set(19, 0);
CENTURIES_TABLE.set(20, 6);
CENTURIES_TABLE.set(21, 4);

interface IMonthDetail {
	bias: (year: number) => number;
	label: string;
	days: (year: number) => number;
}

const isLeapYear = (year: number): boolean => {
	if (year % 4 !== 0) {
		return false;
	}
	if (year % 100 === 0) {
		if (year % 400 === 0) {
			return true;
		}
		return false;
	}
	return true;
};

export const MONTH_TABLE = new Map<number, IMonthDetail>();
MONTH_TABLE.set(0, { bias: (year) => (isLeapYear(year) ? 6 : 0), label: 'Jan', days: () => 31 });
MONTH_TABLE.set(1, {
	bias: (year) => (isLeapYear(year) ? 2 : 3),
	label: 'Feb',
	days: (year) => (isLeapYear(year) ? 29 : 28),
});
MONTH_TABLE.set(2, { bias: () => 3, label: 'Mar', days: () => 31 });
MONTH_TABLE.set(3, { bias: () => 6, label: 'Apr', days: () => 30 });
MONTH_TABLE.set(4, { bias: () => 1, label: 'May', days: () => 31 });
MONTH_TABLE.set(5, { bias: () => 4, label: 'Jun', days: () => 30 });
MONTH_TABLE.set(6, { bias: () => 6, label: 'Jul', days: () => 31 });
MONTH_TABLE.set(7, { bias: () => 2, label: 'Aug', days: () => 31 });
MONTH_TABLE.set(8, { bias: () => 5, label: 'Sep', days: () => 30 });
MONTH_TABLE.set(9, { bias: () => 0, label: 'Oct', days: () => 31 });
MONTH_TABLE.set(10, { bias: () => 3, label: 'Nov', days: () => 30 });
MONTH_TABLE.set(11, { bias: () => 6, label: 'Dec', days: () => 31 });
