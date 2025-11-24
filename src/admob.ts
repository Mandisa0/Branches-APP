import { AdMob } from '../node_modules/@capacitor-community/admob/dist/esm/index';

export async function initializeAdMob(): Promise<void> {

  await AdMob.initialize();
  const trackingInfo = await AdMob.trackingAuthorizationStatus();

  if (trackingInfo.status === 'notDetermined') {
    await AdMob.requestTrackingAuthorization();
  }
  
}
