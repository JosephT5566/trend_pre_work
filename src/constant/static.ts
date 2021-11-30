export const CENTURIES_TABLE: Record<number, number> = {
	17: 4,
	18: 2,
	19: 0,
	20: 6,
	21: 4,
};

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

export const MONTH_TABLE: Record<number, IMonthDetail> = {
	0: { bias: (year) => (isLeapYear(year) ? 6 : 0), label: 'Jan', days: () => 31 },
	1: {
		bias: (year) => (isLeapYear(year) ? 2 : 3),
		label: 'Feb',
		days: (year) => (isLeapYear(year) ? 29 : 28),
	},
	2: { bias: () => 3, label: 'Mar', days: () => 31 },
	3: { bias: () => 6, label: 'Apr', days: () => 30 },
	4: { bias: () => 1, label: 'May', days: () => 31 },
	5: { bias: () => 4, label: 'Jun', days: () => 30 },
	6: { bias: () => 6, label: 'Jul', days: () => 31 },
	7: { bias: () => 2, label: 'Aug', days: () => 31 },
	8: { bias: () => 5, label: 'Sep', days: () => 30 },
	9: { bias: () => 0, label: 'Oct', days: () => 31 },
	10: { bias: () => 3, label: 'Nov', days: () => 30 },
	11: { bias: () => 5, label: 'Dec', days: () => 31 },
};
