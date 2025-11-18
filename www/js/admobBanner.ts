import {
  AdMob,
  BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  AdMobBannerSize,
} from '@capacitor-community/admob';

export async function banner(): Promise<void> {
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    // Subscribe Banner Event Listener
  });

  AdMob.addListener(
    BannerAdPluginEvents.SizeChanged,
    (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    },
  );

  const options: BannerAdOptions = {
    adId: 'ca-app-pub-7734637054439412/1438817164',
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    // isTesting: true
    // npa: true
  };
  AdMob.showBanner(options);
}