import Button, { ButtonProps } from '@material-ui/core/Button';

export const CircleButton = (props: ButtonProps) => {
	const { children, ...otherProps } = props;

	return (
		<Button sx={{ p: 0, minWidth: '2em', lineHeight: '2em', borderRadius: '1em' }} {...otherProps}>
			{children}
		</Button>
	);
};
