import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from 'src/store';

export const useDispatch: () => AppDispatch = useReduxDispatch;
