export type Locale = 'zh' | 'en';
export function detectLocale(): Locale {
  const override = localStorage.getItem('game_locale');
  return override === 'zh' ? 'zh' : 'en';
}
const copy = {
  zh: { titleTop:'心动', titleBottom:'电台', live:'午夜直播 · 只对同频的人开放', start:'开始调频', startSub:'5 个选择，找到你今晚的频道', wall:'听听大家', round:'信号', choose:'别想太久，第一反应最准', score:'能量', result:'你的今晚频道', publish:'发布到频率墙', published:'已进入频率墙', viewWall:'打开频率墙', again:'再调一次', home:'返回首页', best:'历史最高', you:'你', empty:'今晚还没人开台', emptySub:'成为第一个留下频率的人', back:'返回', community:'社区频率', loading:'正在搜寻附近信号…', lost:'信号丢失', streak:'连续同频' },
  en: { titleTop:'HEART', titleBottom:'WAVE', live:'MIDNIGHT LIVE · FOR KINDRED SIGNALS', start:'TUNE IN', startSub:'5 choices to find tonight’s channel', wall:'LISTEN IN', round:'SIGNAL', choose:'Don’t overthink it. First instinct wins.', score:'ENERGY', result:'YOUR NIGHT CHANNEL', publish:'BROADCAST THIS CARD', published:'ON THE FREQUENCY WALL', viewWall:'OPEN FREQUENCY WALL', again:'TUNE AGAIN', home:'BACK HOME', best:'PERSONAL BEST', you:'YOU', empty:'NO ONE IS LIVE YET', emptySub:'Be the first signal in the night', back:'BACK', community:'COMMUNITY FREQUENCIES', loading:'SCANNING NEARBY SIGNALS…', lost:'SIGNAL LOST', streak:'SAME WAVE' },
};
export function t(key: keyof typeof copy.zh) { return copy[detectLocale()][key]; }
