// // ** Next Imports
// import Head from "next/head";
// import { Router, useRouter } from "next/router";

// // ** Store Imports
// import { Provider } from "react-redux";
// import { store } from "src/redux/store";

// // ** Loader Import
// import NProgress from "nprogress";

// // ** Emotion Imports
// import { CacheProvider } from "@emotion/react";

// // ** Config Imports
// import { defaultACLObj } from "src/configs/acl";
// import "src/configs/i18n";
// import themeConfig from "src/configs/themeConfig";

// // ** Fake-DB Import
// import "src/@fake-db";

// // ** Third Party Import
// import { Toaster } from "react-hot-toast";

// // ** Component Imports
// import AclGuard from "src/@core/components/auth/AclGuard";
// import AuthGuard from "src/@core/components/auth/AuthGuard";
// import GuestGuard from "src/@core/components/auth/GuestGuard";
// import ThemeComponent from "src/@core/theme/ThemeComponent";
// import UserLayout from "src/layouts/UserLayout";

// // ** Spinner Import
// import Spinner from "src/@core/components/spinner";

// // ** Contexts
// import {
//   SettingsConsumer,
//   SettingsProvider,
// } from "src/@core/context/settingsContext";
// import { AuthProvider } from "src/context/AuthContext";

// // ** Styled Components
// import ReactHotToast from "src/@core/styles/libs/react-hot-toast";

// // ** Utils Imports
// import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// // ** Prismjs Styles
// import "prismjs";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-tsx";
// import "prismjs/themes/prism-tomorrow.css";

// // ** React Perfect Scrollbar Style
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "src/iconify-bundle/icons-bundle-react";

// // ** Global css styles
// import "../../styles/globals.css";
// import { useEffect, useState } from "react";
// import { actionAppSetting, actionGetAppSettingData } from "src/store/common";
// import { GlobalProvider } from "src/context/appContext";
// import { usePathname } from "next/navigation"

// const clientSideEmotionCache = createEmotionCache();

// // ** Pace Loader
// if (themeConfig.routingLoader) {
//   Router.events.on("routeChangeStart", () => {
//     NProgress.start();
//   });
//   Router.events.on("routeChangeError", () => {
//     NProgress.done();
//   });
//   Router.events.on("routeChangeComplete", () => {
//     NProgress.done();
//   });
// }

// const Guard = ({ children, authGuard, guestGuard }) => {
//   if (guestGuard) {
//     return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
//   } else if (!guestGuard && !authGuard) {
//     return <>{children}</>;
//   } else {
//     return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
//   }
// };

// // ** Configure JSS & ClassName
// const App = (props) => {
//   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
//   const router = useRouter();

//   const { reference_id, proposal_id, transactionNumber, errorMsg, txnId, status, kyc_id, quoteId, proposalId } = router.query;
//   // Variables
//   const contentHeightFixed = Component.contentHeightFixed ?? false;

//   const getLayout =
//     Component.getLayout ??
//     ((page) => (
//       <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>
//     ));
//   const setConfig = Component.setConfig ?? undefined;
//   const authGuard = Component.authGuard ?? true;
//   const guestGuard = Component.guestGuard ?? false;
//   const aclAbilities = Component.acl ?? defaultACLObj;


//   const pathname = usePathname()

//   useEffect(() => {
//     console.log("godigit testing:", router.query);
//   }, [router])

//   useEffect(() => {
//     console.log("godigit all ids:", router.query);
//   }, [reference_id, proposal_id, transactionNumber, errorMsg])


//   useEffect(() => {
//     store.dispatch(actionAppSetting())
//     store.dispatch(actionGetAppSettingData())
//   }, [])



//   useEffect(() => {
//     if (typeof window !== "undefined" && pathname !== "/404") {
//       localStorage.setItem("NAVIGATION_ROUTE_PJ", pathname)
//     }
//   }, [pathname])


//   // // Example: store them inside useEffect
//   // useEffect(() => {
//   //   if (
//   //     typeof window !== 'undefined' &&
//   //     reference_id &&
//   //     proposal_id &&
//   //     transactionNumber
//   //   ) {
//   //     localStorage.setItem('paymentData', JSON.stringify({
//   //       reference_id,
//   //       proposal_id,
//   //       transactionNumber,
//   //     }));
//   //   }
//   // }, [reference_id, proposal_id, transactionNumber]);


//   useEffect(() => {
//     if (
//       typeof window !== 'undefined' &&
//       reference_id &&
//       proposal_id &&
//       (transactionNumber || errorMsg)
//     ) {
//       const existingData = localStorage.getItem('paymentData');

//       // Convert new data to string for comparison
//       const newData = JSON.stringify({
//         reference_id,
//         proposal_id,
//         transactionNumber,
//         errorMsg
//       });

//       // Only store if different
//       if (existingData !== newData) {
//         localStorage.setItem('paymentData', newData);
//       }
//     }
//   }, [reference_id, proposal_id, transactionNumber, errorMsg]);


//   useEffect(() => {
//     if (
//       typeof window !== 'undefined' &&
//       // txnId &&
//       status &&
//       kyc_id &&
//       quoteId &&
//       proposalId
//     ) {
//       const existingData = localStorage.getItem('kycData');

//       // Convert new data to string for comparison
//       const newData = JSON.stringify({
//         txnId,
//         status,
//         kyc_id,
//         quoteId,
//         proposalId
//       });

//       // Only store if different
//       if (existingData !== newData) {
//         localStorage.setItem('kycData', newData);
//       }
//     }
//   }, [txnId, status, kyc_id, quoteId, proposalId]);





//   const getStoredSettings = () => {
//     if (typeof window !== "undefined") {
//       try {
//         const storedSettings = localStorage.getItem("appSetting");
//         return storedSettings ? JSON.parse(storedSettings) : {};
//       } catch (error) {
//         console.error("Failed to parse stored settings:", error);
//         return {};
//       }
//     }
//     return {};
//   };


//   const { favicon_url } = getStoredSettings();


//   return (
//     <GlobalProvider>
//       <Provider store={store}>
//         <CacheProvider value={emotionCache}>
//           <Head>
//             <title>{`${themeConfig.templateName}`}</title>
//             <meta name="description" content={`${themeConfig.templateName}`} />
//             <meta name="keywords" content="" />
//           </Head>
//           {/* Custom Context Add always outside level */}

//           <AuthProvider>
//             <SettingsProvider
//               {...(setConfig ? { pageSettings: setConfig() } : {})}
//             >
//               <SettingsConsumer>
//                 {({ settings }) => {
//                   return (
//                     <ThemeComponent settings={settings}>
//                       {/* <Guard authGuard={authGuard} guestGuard={guestGuard}>
//                       <AclGuard
//                         aclAbilities={aclAbilities}
//                         guestGuard={guestGuard}
//                         authGuard={authGuard}
//                       > */}
//                       {getLayout(<Component {...pageProps} />)}
//                       {/* </AclGuard>
//                     </Guard> */}
//                       <ReactHotToast>
//                         <Toaster
//                           position={settings.toastPosition}
//                           toastOptions={{ className: "react-hot-toast" }}
//                         />
//                       </ReactHotToast>
//                     </ThemeComponent>
//                   );
//                 }}
//               </SettingsConsumer>
//             </SettingsProvider>
//           </AuthProvider>
//         </CacheProvider>
//       </Provider>
//     </GlobalProvider>
//   );
// };

// export default App;



// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Store Imports
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import 'src/configs/i18n'
import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import { store } from 'src/redux/store'
import { useEffect } from 'react'
import { GlobalProvider } from 'src/context/appContext'
import { usePathname } from "next/navigation"

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = props => {
  const pathname = usePathname()

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props


  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj


  useEffect(() => {
    if (typeof window !== "undefined" && pathname !== "/404" && pathname !== '/sso-login' && pathname !== '/hdfc/kyc/callback') {
      localStorage.setItem("NAVIGATION_ROUTE", pathname)
    }
  }, [pathname])

  return (
    // <GlobalProvider>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
    // </GlobalProvider>
  )
}

export default App

