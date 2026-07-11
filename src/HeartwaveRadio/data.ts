import type { Dimension, Question } from './types';
import { detectLocale } from './i18n';

const en = detectLocale() === 'en';
const b = (zh: string, english: string) => en ? english : zh;

export const QUESTIONS: Question[] = [
  { eyebrow: '01:13 AM', prompt: b('如果今晚有人敲门，你希望他带来…', 'If someone knocked tonight, you would hope they brought…'), choices: [
    { icon: 'warm', title: b('一杯热的', 'Something warm'), desc: b('不说话也能坐很久', 'We could sit for hours without talking'), dimension: 'warm' },
    { icon: 'wild', title: b('两张车票', 'Two tickets'), desc: b('现在就去没去过的地方', 'Leave now for somewhere new'), dimension: 'wild' },
  ] },
  { eyebrow: b('未读消息 1', '1 UNREAD MESSAGE'), prompt: b('你更想收到哪一句？', 'Which message would you rather receive?'), choices: [
    { icon: 'quiet', title: b('我懂你没说的', 'I heard the unsaid part'), desc: b('安静也算一种回答', 'Silence can be an answer too'), dimension: 'quiet' },
    { icon: 'bright', title: b('下楼，有惊喜', 'Come downstairs'), desc: b('世界突然亮一下', 'There is a surprise waiting'), dimension: 'bright' },
  ] },
  { eyebrow: b('天气：微风', 'WEATHER: LIGHT BREEZE'), prompt: b('两个人散步，最好的背景是…', 'The best backdrop for a walk together is…'), choices: [
    { icon: 'quiet', title: b('空荡的海边', 'An empty shoreline'), desc: b('浪声替我们说话', 'Let the waves do the talking'), dimension: 'quiet' },
    { icon: 'wild', title: b('快关门的街', 'A closing street'), desc: b('一路踩着霓虹回家', 'Follow the neon all the way home'), dimension: 'wild' },
  ] },
  { eyebrow: b('电量 17%', 'BATTERY 17%'), prompt: b('手机只够做最后一件事', 'Your phone has power for one last thing'), choices: [
    { icon: 'warm', title: b('打给想念的人', 'Call the one you miss'), desc: b('哪怕只听一句晚安', 'Just to hear one goodnight'), dimension: 'warm' },
    { icon: 'bright', title: b('拍下这一刻', 'Save this moment'), desc: b('证明今晚真的发生过', 'Proof that tonight really happened'), dimension: 'bright' },
  ] },
  { eyebrow: b('播放列表', 'NOW PLAYING'), prompt: b('你会把哪首歌留到最后？', 'Which song do you save for last?'), choices: [
    { icon: 'warm', title: b('熟悉的旧歌', 'The familiar one'), desc: b('每个停顿都记得', 'You know every pause by heart'), dimension: 'warm' },
    { icon: 'wild', title: b('从没听过的歌', 'The unknown one'), desc: b('让下一秒不被预测', 'Let the next second surprise you'), dimension: 'wild' },
  ] },
  { eyebrow: b('窗外 22°C', 'OUTSIDE 22°C'), prompt: b('理想的周末醒来后…', 'On the ideal weekend morning…'), choices: [
    { icon: 'quiet', title: b('继续赖床', 'Stay under the covers'), desc: b('和世界保持一点距离', 'Keep the world at a gentle distance'), dimension: 'quiet' },
    { icon: 'bright', title: b('立刻出门', 'Head straight outside'), desc: b('先去追今天的光', 'Go find today’s light'), dimension: 'bright' },
  ] },
  { eyebrow: b('距离 0.8 km', 'DISTANCE 0.8 KM'), prompt: b('遇见一个同频的人，你会…', 'When you meet someone on your frequency…'), choices: [
    { icon: 'bright', title: b('先走近一步', 'Take the first step'), desc: b('故事要有人按下开始', 'Someone has to start the story'), dimension: 'bright' },
    { icon: 'quiet', title: b('等一个暗号', 'Wait for a signal'), desc: b('真正的默契不用催', 'Real chemistry does not need rushing'), dimension: 'quiet' },
  ] },
  { eyebrow: b('草稿箱', 'DRAFTS'), prompt: b('最想保留的是哪一种秘密？', 'Which secret would you rather keep?'), choices: [
    { icon: 'warm', title: b('没寄出的信', 'An unsent letter'), desc: b('温柔停在落款以前', 'Tenderness before the signature'), dimension: 'warm' },
    { icon: 'wild', title: b('没实现的计划', 'An unfinished plan'), desc: b('总有一天突然出发', 'One day you will simply leave'), dimension: 'wild' },
  ] },
];

export const CHANNELS: Record<Dimension, { name: string; en: string; line: string; color: string; tags: string[] }> = {
  warm: { name: b('暖夜台', 'Warm Night FM'), en: 'WARM NIGHT FM', line: b('你让沉默也有温度。', 'You make silence feel warm.'), color: '#ff7b9c', tags: [b('温柔接收', 'soft signal'), b('慢热真心', 'slow burn'), b('晚安供应', 'goodnight radio')] },
  wild: { name: b('失重台', 'Zero Gravity FM'), en: 'ZERO GRAVITY FM', line: b('你专门收藏计划之外的事。', 'You collect everything outside the plan.'), color: '#a786ff', tags: [b('即兴出发', 'leave now'), b('危险浪漫', 'reckless romance'), b('拒绝预告', 'no previews')] },
  quiet: { name: b('月背台', 'Far Side FM'), en: 'FAR SIDE FM', line: b('你听见别人错过的微弱信号。', 'You hear the signals everyone else misses.'), color: '#70a8ff', tags: [b('安静共振', 'quiet resonance'), b('深夜观察', 'night observer'), b('留白专家', 'room to breathe')] },
  bright: { name: b('晨光台', 'Daybreak FM'), en: 'DAYBREAK FM', line: b('你总能把下一秒调亮一点。', 'You tune the next moment a little brighter.'), color: '#69f0d0', tags: [b('主动发光', 'self lit'), b('惊喜体质', 'surprise prone'), b('晴朗引力', 'sunny gravity')] },
};
