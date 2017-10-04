// @flow
import Cache from "beinformed/util/browser/Cache";
import Locales from "beinformed/i18n/Locales";

export type I18nState = {
  locales: typeof Locales,
  locale: string
};

const updateLocale = (state, action) => {
  // clear cache because of cached contributions
  Cache.clear();

  return {
    ...state,
    locale: action.payload
  };
};

// REDUCER
const initialState = {
  locales: Locales,
  locale: "en"
};

/**
 * Form reducer
 */
export default function i18nReducer(
  state: I18nState = initialState,
  action: Action
) {
  switch (action.type) {
    case "UPDATE_LOCALE":
      return updateLocale(state, action);

    default:
      return state;
  }
}
