import { AdMob, BannerAdSize } from '@capacitor-community/admob';

export const initializeAdMob = async () => {
  try {
    await AdMob.initialize();
    console.log('AdMob initialized');

    // iOS tracking consent
    const trackingStatus = await AdMob.trackingAuthorizationStatus();
    if (trackingStatus.status === 'notDetermined') {
      await AdMob.requestTrackingAuthorization();
    }

    // Show test banner
    await AdMob.showBanner({
      adId: 'ca-app-pub-3940256099942544/6300978111', // Google test banner
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: 'BOTTOM_CENTER',
    });

    console.log('Banner should appear now!');
  } catch (err) {
    console.error('AdMob initialization failed:', err);
  }
};
