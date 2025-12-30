import { Network } from '@capacitor/network';
import { apiUrl } from '../../config.js/config';

export async function hasNetworkInterface() {
  const status = await Network.getStatus();
  return status.connected;
}

export async function hasInternetAccess(
  timeout = 3000
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

     await fetch(apiUrl + '/get/randomImages', {
                method: "HEAD",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: 'no-store'
            });

    clearTimeout(id);
    return true;
  } catch(e) {
    return false;
  }
}

export async function isOnline(): Promise<boolean> {
  const network = await hasNetworkInterface();
  if (!network) return false;

  return await hasInternetAccess();
}
