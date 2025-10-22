import { API_BASE_URL } from '../config/api';

/**
 * Keep-alive service to prevent the backend from going to sleep
 * Pings the health endpoint every 10 minutes
 */

let keepAliveInterval: NodeJS.Timeout | null = null;

const pingServer = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000) // 10 second timeout for health checks
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Keep-alive ping successful:', data.timestamp);
    }
  } catch (error) {
    console.warn('Keep-alive ping failed:', error);
    // Fail silently - this is just a keep-alive mechanism
  }
};

/**
 * Start the keep-alive service
 * Pings the server immediately and then every 10 minutes
 */
export const startKeepAlive = () => {
  if (keepAliveInterval) {
    return; // Already running
  }

  // Ping immediately on start
  pingServer();

  // Ping every 10 minutes (600000 ms)
  keepAliveInterval = setInterval(pingServer, 10 * 60 * 1000);
  
  console.log('Keep-alive service started');
};

/**
 * Stop the keep-alive service
 */
export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('Keep-alive service stopped');
  }
};

/**
 * Manually trigger a keep-alive ping
 */
export const pingNow = () => {
  pingServer();
};




