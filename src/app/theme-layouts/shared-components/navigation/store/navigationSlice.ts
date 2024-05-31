import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootStateType } from 'app/store/types';
import { PartialDeep } from 'type-fest';
import { EscFlatNavItemType, EscNavItemType } from '@esc/core/EscNavigation/types/EscNavItemType';
import { selectUserRole, userSliceType } from 'src/app/auth/user/store/userSlice';
import EscNavigationHelper from '@esc/utils/EscNavigationHelper';
import i18next from 'i18next';
import EscNavItemModel from '@esc/core/EscNavigation/models/EscNavItemModel';
import EscUtils from '@esc/utils';
import navigationConfig from 'app/configs/navigationConfig';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';

type AppRootStateType = RootStateType<[navigationSliceType, userSliceType]>;

const navigationAdapter = createEntityAdapter<EscFlatNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	EscNavigationHelper.flattenNavigation(navigationConfig)
);

/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: EscNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = EscNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(EscNavigationHelper.appendNavItem(navigation, EscNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: EscNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = EscNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(EscNavigationHelper.prependNavItem(navigation, EscNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<EscNavItemType>): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = EscNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(EscNavigationHelper.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = EscNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(EscNavigationHelper.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state: AppRootStateType) => state.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action: PayloadAction<EscNavItemType[]>) {
			return navigationAdapter.setAll(state, EscNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigationSimple, userRole) => {
		const navigation = EscNavigationHelper.unflattenNavigation(navigationSimple);

		function setAdditionalData(data: EscNavItemType[]): EscNavItemType[] {
			return data?.map((item) => ({
				
				hasPermission: Boolean(EscUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(navigation);

		return translatedValues;
	}
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => {
	return EscNavigationHelper.flattenNavigation(navigation);
});

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
