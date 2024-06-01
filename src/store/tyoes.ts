import { store } from '.';

export type RootState = ReturnType<typeof store.getState>;

export type ActionStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';