import { AdMob } from '@capacitor-community/admob';

export async function initializeAdMob(): Promise<void> {
  // Initialize AdMob
  await AdMob.initialize();

  // Check iOS tracking permission
  const trackingInfo = await AdMob.trackingAuthorizationStatus();

  if (trackingInfo.status === 'notDetermined') {
    await AdMob.requestTrackingAuthorization();
  }

  // Nothing else to do here anymore – consent form APIs were removed
}
