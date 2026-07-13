export type Locale = 'zh' | 'en';
export function detectLocale(): Locale {
  const override = localStorage.getItem('game_locale');
  if (override === 'zh' || override === 'en') return override;
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}
const copy = {
  zh: { titleTop:'心动', titleBottom:'电台', live:'午夜直播 · 只对同频的人开放', start:'开始调频', startSub:'5 个选择，找到你今晚的频道', wall:'听听大家', round:'信号', choose:'别想太久，第一反应最准', score:'能量', result:'你的今晚频道', publish:'播出今晚的频率', published:'今晚已正式播出', replaceBroadcast:'替换今晚的频率', dailyRitual:'今晚只有一个公开席位；重新调频后可用新作品替换。', viewWall:'打开频率墙', again:'再调一次', home:'返回首页', best:'历史最高', you:'你', empty:'今晚还没人开台', emptySub:'成为第一个留下频率的人', back:'返回', community:'社区频率', loading:'正在搜寻附近信号…', lost:'信号丢失', streak:'连续同频', close:'关闭广播', detail:'完整广播', transmission:'午夜播报', deleteMine:'删除我的广播', deleteConfirm:'再次点击，确认删除', deleteHint:'删除后无法恢复；你仍可用新作品占用今晚的席位。' },
  en: { titleTop:'HEART', titleBottom:'WAVE', live:'MIDNIGHT LIVE · FOR KINDRED SIGNALS', start:'TUNE IN', startSub:'5 choices to find tonight’s channel', wall:'LISTEN IN', round:'SIGNAL', choose:'Don’t overthink it. First instinct wins.', score:'ENERGY', result:'YOUR NIGHT CHANNEL', publish:'AIR TONIGHT’S SIGNAL', published:'TONIGHT’S SIGNAL IS LIVE', replaceBroadcast:'REPLACE TONIGHT’S SIGNAL', dailyRitual:'One public slot tonight. A new result can replace the current signal.', viewWall:'OPEN FREQUENCY WALL', again:'TUNE AGAIN', home:'BACK HOME', best:'PERSONAL BEST', you:'YOU', empty:'NO ONE IS LIVE YET', emptySub:'Be the first signal in the night', back:'BACK', community:'COMMUNITY FREQUENCIES', loading:'SCANNING NEARBY SIGNALS…', lost:'SIGNAL LOST', streak:'SAME WAVE', close:'CLOSE BROADCAST', detail:'FULL BROADCAST', transmission:'MIDNIGHT TRANSMISSION', deleteMine:'DELETE MY BROADCAST', deleteConfirm:'TAP AGAIN TO DELETE', deleteHint:'This cannot be undone. A new result can still take tonight’s slot.' },
};
export function t(key: keyof typeof copy.zh) { return copy[detectLocale()][key]; }
