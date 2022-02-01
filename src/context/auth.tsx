import * as React from 'react';

type Action = { type: 'login' } | { type: 'toggleModal' };
type Dispatch = (action: Action) => void;
type State = { user?: object; isModalOpen: boolean };
type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state, action) {
  switch (action.type) {
    case 'login': {
      return { user: state.user + 1 };
    }
    case 'toggleModal': {
      return { isModalOpen: !state.isModalOpen };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
    isModalOpen: false,
  });
  const value: any = { state, dispatch };

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
