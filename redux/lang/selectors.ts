import { RootState } from "../store";

export const selectLocale = (state: RootState) => state.lang.locale;