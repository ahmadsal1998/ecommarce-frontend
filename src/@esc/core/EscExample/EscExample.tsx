import EscHighlight from '@esc/core/EscHighlight';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import clsx from 'clsx';
import { ElementType, ReactNode, useState } from 'react';
import { darken } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DemoFrame from './DemoFrame';
import EscSvgIcon from '../EscSvgIcon';

type EscExampleProps = {
	name?: string;
	raw?: string;
	currentTabIndex?: number;
	component: ElementType;
	iframe?: ReactNode;
	className: string;
};

/**
 * EscExample component gives a visual display as well as code for a component example.
 * It consists of two tabs, a visual tab and code tab.
 */
function EscExample(props: EscExampleProps) {
	const { component: Component, raw, iframe, className, name = '', currentTabIndex = 0 } = props;

	const [currentTab, setCurrentTab] = useState(currentTabIndex);

	function handleChange(event: React.SyntheticEvent, value: number) {
		setCurrentTab(value);
	}

	return (
		<Card className={clsx(className, 'shadow')}>
			<Box
				sx={{
					backgroundColor: (theme) =>
						darken(theme.palette.background.paper, theme.palette.mode === 'light' ? 0.02 : 0.2)
				}}
			>
				<Tabs
					classes={{
						root: 'border-b-1',
						flexContainer: 'justify-end'
					}}
					value={currentTab}
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
				>
					{Component && (
						<Tab
							classes={{ root: 'min-w-64' }}
							icon={<EscSvgIcon>heroicons-outline:eye</EscSvgIcon>}
						/>
					)}
					{raw && (
						<Tab
							classes={{ root: 'min-w-64' }}
							icon={<EscSvgIcon>heroicons-outline:code</EscSvgIcon>}
						/>
					)}
				</Tabs>
			</Box>
			<div className="relative flex max-w-full justify-center">
				<div className={currentTab === 0 ? 'flex max-w-full flex-1' : 'hidden'}>
					{Component &&
						(iframe ? (
							<DemoFrame name={name}>
								<Component />
							</DemoFrame>
						) : (
							<div className="flex max-w-full flex-1 justify-center p-24">
								<Component />
							</div>
						))}
				</div>
				<div className={currentTab === 1 ? 'flex flex-1' : 'hidden'}>
					{raw && (
						<div className="flex flex-1">
							<EscHighlight
								component="pre"
								className="language-javascript w-full"
								sx={{ borderRadius: '0!important' }}
							>
								{raw}
							</EscHighlight>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}

export default EscExample;
