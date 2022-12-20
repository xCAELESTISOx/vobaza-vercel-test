import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import type { RootState } from 'src/store';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
