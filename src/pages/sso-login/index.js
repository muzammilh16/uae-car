import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { AuthContext } from 'src/context/AuthContext';
import authConfig from 'src/configs/auth';

const SSOLogin = () => {
  const router = useRouter();
  const { token } = router.query;
  const { setUser, setLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!router.isReady) return; // Wait for router to be ready

    const handleSSOLogin = async () => {
      const token = router.query.token;

      if (token) {
        try {
          window.localStorage.setItem(authConfig.storageTokenKeyName, token);

          const userData = {
            id: 1,
            role: 'admin',
            fullName: 'SSO User',
            username: 'sso_user',
            email: 'sso@example.com',
            is_guest: false
          };

          setUser(userData);
          window.localStorage.setItem('userData', JSON.stringify(userData));
          setLoading(false);

          router.replace('/carInsurance');
        } catch (error) {
          console.error('Invalid token:', error);
          router.replace('/carInsurance');
        }
      } else {
        const guestUserData = {
          id: 0,
          role: 'admin',
          fullName: 'Guest User',
          username: 'guest_user',
          email: 'guest@example.com',
          is_guest: true
        };
        setLoading(false);
        const tempToken = "eyJhbGciOiJIUzI1NisInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2MTYsImlhdCI6MTc0OTAzNDA5NCwiZXhwIjoxNzQ5NDY2MDk0fQ.HR_9V2axp2cSPUx_jUsZ8eVWB5MGbKl0J2zl-PMs1Sg";
        window.localStorage.setItem(authConfig.storageTokenKeyName, tempToken);
        setUser(guestUserData);
        window.localStorage.setItem('userData', JSON.stringify(guestUserData));
        router.replace('/carInsurance');
      }
    };

    handleSSOLogin();
  }, [router.isReady, router.query]);




  return <div>Logging in via SSO...</div>;
};

SSOLogin.getLayout = page => <BlankLayout>{page}</BlankLayout>;
SSOLogin.guestGuard = true;

export default SSOLogin;

