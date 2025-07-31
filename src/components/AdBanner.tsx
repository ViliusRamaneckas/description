import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block', width: '100%', maxWidth: 728, height: 90 }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Replace with your AdSense client ID when ready
        data-ad-slot="1234567890"                 // Replace with your AdSense slot ID when ready
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner; 