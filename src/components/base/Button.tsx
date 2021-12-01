import Button, { ButtonProps } from '@material-ui/core/Button';

export const CircleButton = (props: ButtonProps & { active: boolean; today?: boolean }) => {
	const { active, today, sx, children, ...otherProps } = props;

	return (
		<Button
			sx={{
				p: 0,
				minWidth: '2em',
				lineHeight: '2em',
				borderRadius: '1.5em',
				color: today || active ? 'secondary' : 'black',
				...sx,
			}}
			color={'secondary'}
			variant={active ? 'contained' : 'text'}
			{...otherProps}
		>
			{children}
		</Button>
	);
};
