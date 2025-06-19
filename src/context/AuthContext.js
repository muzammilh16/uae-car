// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  // useEffect(() => {
  //   const initAuth = async () => {
  //     const currentPath = router?.asPath?.split('?')[0];

  //     // ✅ If query param present but path is not /hdfc/kyc/callback, replace route with query
  //     const isKycCallback = router.query?.quote_id && currentPath === '/hdfc/kyc/callback';

  //     const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);

  //     if (storedToken) {

  //       const hardcodedUserData = {
  //         id: 0,
  //         role: 'admin',
  //         fullName: 'Guest User',
  //         username: 'guest_user',
  //         email: 'guest@example.com'
  //       };

  //       console.log('*****query*****', router.query);
  //       console.log('*****ASPATH*****', router.asPath);

  //       if (isKycCallback) {
  //         console.log('Redirecting to clean /hdfc/kyc/callback route...');
  //         router.replace({
  //           pathname: '/hdfc/kyc/callback',
  //           query: router.query
  //         });

  //         setUser(hardcodedUserData);
  //         setLoading(false);
  //         return;
  //       }

  //       setUser(hardcodedUserData);
  //       setLoading(false);

  //     } else {
  //       const isRoute = router?.asPath?.startsWith('/sso-login');
  //       window.localStorage.removeItem(authConfig?.storageTokenKeyName);
  //       localStorage.clear();

  //       if (isRoute) {
  //         setUser(null);
  //         setLoading(false);
  //         router.push(router.asPath);
  //       } else {
  //         setUser(null);
  //         setLoading(false);
  //         router.replace('/sso-login');
  //       }
  //     }
  //   };

  //   if (typeof window !== 'undefined' && router.isReady) {
  //     initAuth();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router]);

  // useEffect(() => {
  //   const initAuth = async () => {
  //     const currentPath = router.asPath.split('?')[0];
  //     const isKycCallback = router.query?.quote_id && currentPath === '/hdfc/kyc/callback';
  //     const token = localStorage.getItem(authConfig.storageTokenKeyName);

  //     if (token) {
  //       const guestUser = {
  //         id: 0,
  //         role: 'admin',
  //         fullName: 'Guest User',
  //         username: 'guest_user',
  //         email: 'guest@example.com'
  //       };

  //       if (isKycCallback) {
  //         router.replace({ pathname: '/hdfc/kyc/callback', query: router.query });
  //         console.log('Redirecting to clean /hdfc/kyc/callback route...');
  //       }

  //       setUser(guestUser);
  //       setLoading(false);
  //     } else {
  //       localStorage.removeItem(authConfig.storageTokenKeyName);
  //       localStorage.clear();
  //       setUser(null);
  //       setLoading(false);
  //       const isSSO = router.asPath.startsWith('/sso-login');
  //       router[isSSO ? 'push' : 'replace'](router.asPath || '/sso-login');
  //     }
  //   };

  //   if (typeof window !== 'undefined' && router.isReady) initAuth();
  // }, [router]);


  // useEffect(() => {
  //   const initAuth = async () => {
  //     const currentPath = router.asPath.split('?')[0];
  //     const isKycCallback = router.query?.quote_id && currentPath === '/hdfc/kyc/callback';
  //     const isSSO = currentPath === '/sso-login';
  //     const token = localStorage.getItem(authConfig.storageTokenKeyName);
  //     const storedUser = localStorage.getItem('userData')


  //     if (token && storedUser) {
  //       if (isKycCallback) {
  //         router.replace({ pathname: '/hdfc/kyc/callback', query: router.query });
  //         console.log('Redirecting to clean /hdfc/kyc/callback route...');
  //       }

  //       if (storedUser) {
  //         const parsedUser = JSON.parse(storedUser)
  //         setUser(parsedUser)
  //       }

  //       setLoading(false);
  //     } else {
  //       localStorage.removeItem(authConfig.storageTokenKeyName);
  //       localStorage.clear();
  //       setUser(null);
  //       setLoading(false);
  //       console.log('isSSO',isSSO)
  //       if (isSSO) {
  //         router.replace({ pathname: '/sso-login', query: router.query });
  //       }
  //     }
  //   };

  //   if (typeof window !== 'undefined' && router.isReady) initAuth();
  // }, [router]);

  useEffect(() => {
    const initAuth = async () => {
      const currentPath = router.asPath.split('?')[0];
      const isKycCallback = router.query?.quote_id && currentPath === '/hdfc/kyc/callback';
      const isGoDigitPaymentSuccess = currentPath === '/godigit/payment-status/success';
      const isGoDigitPaymentFailure = currentPath === '/godigit/payment-status/failure';
      const isHDFCPaymentSuccess = currentPath === '/hdfc/payment-status/success';
      const isHDFCPaymentFailure = currentPath === '/hdfc/payment-status/failure';
      const isSSO = currentPath === '/sso-login/';

      const token = localStorage.getItem(authConfig.storageTokenKeyName);

      // Polling function to wait for userData
      const waitForUserData = async () => {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const userData = localStorage.getItem('userData');
            if (userData) {
              clearInterval(interval);
              resolve(userData);
            }
          }, 100);

          // Optional timeout after 2 seconds
          setTimeout(() => {
            clearInterval(interval);
            resolve(null);
          }, 2000);
        });
      };

      const storedUser = await waitForUserData();
      let parsedUser = null;

      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser);
        } catch (e) {
          console.error('Failed to parse userData:', e);
        }
      }

      if (token && parsedUser) {

        if (isKycCallback) {
          router.replace({ pathname: '/hdfc/kyc/callback', query: router.query });
          console.log('Redirecting to clean /hdfc/kyc/callback route...');
        }
        if (isGoDigitPaymentSuccess) {
          router.replace({ pathname: '/godigit/payment-status/success', query: router.query });
          console.log('Redirecting to clean /godigit/payment-status/success callback route...');
        }
        if (isGoDigitPaymentFailure) {
          router.replace({ pathname: '/godigit/payment-status/failure', query: router.query });
          console.log('Redirecting to clean /godigit/payment-status/failure callback route...');
        }
        if (isHDFCPaymentSuccess) {
          router.replace({ pathname: '/hdfc/payment-status/success', query: router.query });
          console.log('Redirecting to clean /hdfc/payment-status/success callback route...');
        }
        if (isHDFCPaymentFailure) {
          router.replace({ pathname: '/hdfc/payment-status/failure', query: router.query });
          console.log('Redirecting to clean /hdfc/payment-status/failure callback route...');
        }

        setUser(parsedUser);
        setLoading(false);
      } else {
        localStorage.removeItem(authConfig.storageTokenKeyName);
        localStorage.clear();
        setUser(null);
        setLoading(false);
        console.log('isSSO', isSSO);
        console.log('currentPath', currentPath);

        if (isSSO) {
          router.replace({ pathname: '/sso-login', query: router.query });
        }
      }

      setLoading(false);
    };

    if (typeof window !== 'undefined' && router.isReady) {
      initAuth();
    }
  }, [router]);

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {

        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/carInsurance')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
