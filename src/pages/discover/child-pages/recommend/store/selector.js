import { createSelector } from 'reselect';

const selectRecommendReducer = (state) => state.get("recommend");

export const selectTopBanners = createSelector(
    [selectRecommendReducer],
    (recommend) => recommend.get("topBanners"),
);