import {
  AdMob, BannerAdSize, RewardAdOptions,
  AdMobRewardItem, RewardAdPluginEvents
} from '@capacitor-community/admob';


interface RewardItem {
  type: string;
  amount: number;
}

export const initializeAdMob = async () => {
  try {
    await AdMob.initialize();
    console.log('AdMob initialized');

    // iOS tracking consent
    const trackingStatus = await AdMob.trackingAuthorizationStatus();
    if (trackingStatus.status === 'notDetermined') {
      await AdMob.requestTrackingAuthorization();
    }

    await AdMob.showBanner({
      adId: 'ca-app-pub-4948879885168622/5285040324',
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: 'BOTTOM_CENTER',
    });

    console.log('Banner should appear now!');
  } catch (err) {
    console.error('AdMob initialization failed:', err);
  }
};

export const showRewardAd = async (
  onReward: (reward: RewardItem) => void
): Promise<void> => {
  try {
    await AdMob.prepareRewardVideoAd({
      adId: 'ca-app-pub-4948879885168622/2155340648',
    });

    const listener = await AdMob.addListener(
      RewardAdPluginEvents.Rewarded,
      (reward: RewardItem) => {
        onReward(reward);
        listener.remove();
      }
    );

    await AdMob.showRewardVideoAd();
  } catch (err) {
    console.error('Reward ad failed:', err);
  }
};