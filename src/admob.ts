import { AdMob, BannerAdSize } from '@capacitor-community/admob';

export const initializeAdMob = async () => {
  try {
    await AdMob.initialize();

    // Optional: Request tracking consent on iOS
    const trackingStatus = await AdMob.trackingAuthorizationStatus();
    if (trackingStatus.status === 'notDetermined') {
      await AdMob.requestTrackingAuthorization();
    }

    // Show a test banner
    await AdMob.showBanner({
      adId: 'ca-app-pub-7734637054439412~4794897807', // test id
      adSize: BannerAdSize.BANNER,
      position: 'BOTTOM_CENTER',
    });
  } catch (err) {
    console.error('AdMob initialization failed:', err);
  }
};
