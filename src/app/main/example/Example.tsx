import DemoContent from '@esc/core/DemoContent';
import EscPageSimple from '@esc/core/EscPageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';


const Root = styled(EscPageSimple)(({ theme }) => ({
	'& .EscPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .EscPageSimple-content': {},
	'& .EscPageSimple-sidebarHeader': {},
	'& .EscPageSimple-sidebarContent': {}
}));

function Example() {
	const { t } = useTranslation('examplePage');

	return (
		<Root
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					
						<DemoContent />
					
				</div>
			}
		/>
	);
}

export default Example;
