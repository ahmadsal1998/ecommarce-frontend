import { Component, ReactNode } from 'react';
import { matchRoutes } from 'react-router-dom';
import EscUtils from '@esc/utils';
import AppContext, { AppContextType } from 'app/AppContext';
import withRouter from '@esc/core/withRouter';
import history from '@history';
import { WithRouterProps } from '@esc/core/withRouter/withRouter';
import { EscRouteItemType } from '@esc/utils/EscUtils';
import {
	getSessionRedirectUrl,
	resetSessionRedirectUrl,
	setSessionRedirectUrl
} from '@esc/core/EscAuthorization/sessionRedirectUrl';
import EscLoading from '@esc/core/EscLoading';


type EscAuthorizationProps = {
	children: ReactNode;
	location: Location;
	userRole: string[] | string;
	loginRedirectUrl?: string;
} & WithRouterProps;

type State = AppContextType & {
	accessGranted: boolean;
};

function isUserGuest(role: string[] | string) {
	return !role || (Array.isArray(role) && role.length === 0);
}

/**
 *EscAuthorization is a higher-order component that wraps its child component which handles the authorization logic of the app.
 * It checks the provided Auth property from EscRouteItemType (auth property) against the current logged-in user role.
 */
class EscAuthorization extends Component<EscAuthorizationProps, State> {
	constructor(props: EscAuthorizationProps, context: AppContextType) {
		super(props);

		const { routes } = context;

		this.state = {
			accessGranted: true,
			routes
		};
	}

	componentDidMount() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps: EscAuthorizationProps, nextState: State) {
		const { accessGranted } = this.state;

		return nextState.accessGranted !== accessGranted;
	}

	componentDidUpdate() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props: EscAuthorizationProps, state: State) {
		const { location, userRole } = props;
		const { pathname } = location;
		const matchedRoutes = matchRoutes(state.routes, pathname);
		const matched = matchedRoutes ? matchedRoutes[0] : false;

		const isGuest = isUserGuest(userRole);

		if (!matched) {
			return { accessGranted: true };
		}

		const { route }: { route: EscRouteItemType } = matched;

		const userHasPermission = EscUtils.hasPermission(route.auth, userRole);

		const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404'];

		if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl(pathname);
		}

		/**
		 * If user is member but don't have permission to view the route
		 * redirected to main route '/'
		 */
		if (!userHasPermission && !isGuest && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl('/');
		}

		return {
			accessGranted: matched ? userHasPermission : true
		};
	}

	redirectRoute() {
		const { userRole, loginRedirectUrl = '/' } = this.props;
		const redirectUrl = getSessionRedirectUrl() || loginRedirectUrl;

		/*
		User is guest
		Redirect to Login Page
		*/
		if (!userRole || userRole.length === 0) {
			setTimeout(() => history.push(`sign-in`), 0);
		} else {
			/*
		  User is member
		  User must be on unAuthorized page or just logged in
		  Redirect to dashboard or loginRedirectUrl
			*/
			console.log(`${redirectUrl}`)
			setTimeout(() => history.push(`${redirectUrl}`), 0);
			resetSessionRedirectUrl();
		}
	}

	render() {
		const { accessGranted } = this.state;
		const { children } = this.props;

		return accessGranted ? children : <EscLoading />;
	}
}

EscAuthorization.contextType = AppContext;

export default withRouter(EscAuthorization);
