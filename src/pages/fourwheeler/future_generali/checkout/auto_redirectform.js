// pages/kyc-redirect.js
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function KycRedirect() {
  const router = useRouter();
  const { url, proposalId } = router.query;
  const formRef = useRef(null);

  useEffect(() => {
    if (url && proposalId && formRef.current) {
      // Auto-submit the form once the page loads and has parameters
      setTimeout(() => {
        formRef.current.submit();
      }, 1000);
    }
  }, [url, proposalId]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p><strong>You are being redirected to the KYC portal</strong></p>
      <p style={{ color: 'blue' }}>Please wait...</p>
      <p>(Please do not press 'Refresh' or 'Back' button)</p>

      {url && proposalId && (
        <form
          ref={formRef}
          method="POST"
          action={decodeURIComponent(url)}
        >
          <input
            type="hidden"
            name="Aggregator_KYC_Req_No"
            value={proposalId}
          />
          <input
            type="hidden"
            name="IC_KYC_No"
            value={proposalId}
          />
          <input
            type="hidden"
            name="Aggregator_Return_URL"
            value="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwjUgdPSmov_AhX5bmwGHRmXAdcQPAgI"
          />
        </form>
      )}
    </div>
  );
}