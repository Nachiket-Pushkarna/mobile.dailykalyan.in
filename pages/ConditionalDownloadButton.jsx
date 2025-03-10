import React, { useEffect, useState } from 'react';

const ConditionalDownloadButton = () => {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    // Check if the app is running in a WebView
    const checkWebView = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return userAgent.includes('wv') || (userAgent.includes('safari') && userAgent.includes('mobile') && userAgent.includes('Android'));
    };

    setIsWebView(checkWebView());
  }, []);

  if (isWebView) {
    return null; // Don't render anything in WebView
  }

  return (
    
    <div id="download-button">
      <a href="https://backend.jodiplay.com/logo/daily_kalyan.apk">
        <div className="d-flex align-items-center justify-content-center gap-2" style={{ flexWrap: 'wrap' }}>
          {/* <img src="/download-now.gif" alt="Download" className='w-60' /> */}
        </div>
      </a>
    </div>
    
  );
};

export default ConditionalDownloadButton;