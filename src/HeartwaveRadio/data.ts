import type { Broadcast, Dimension, Pick, Question } from './types';
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

type Composite = { title: string; line: string; transmissions: string[]; tags: string[] };
const composite = (zhTitle:string,enTitle:string,zhLine:string,enLine:string,zhTx:string[],enTx:string[],zhTags:string[],enTags:string[]):Composite => ({title:b(zhTitle,enTitle),line:b(zhLine,enLine),transmissions:en?enTx:zhTx,tags:en?enTags:zhTags});
export const COMPOSITES:Record<string,Composite>={
  'warm-quiet':composite('余温收藏家','Afterglow Collector','你把安静照顾成可以靠近的地方。','You turn quiet into somewhere safe to stay.',['今晚不必回答，留下来就算收到。','有些晚安不是结束，是替你守着灯。','你的沉默正在被一个人认真听见。'],['No answer needed tonight. Staying counts as received.','Some goodnights are not endings. They leave a light on.','Someone is listening carefully to your silence.'],['柔光接收','安静陪伴','慢速靠近'],['soft receiver','quiet company','slow approach']),
  'warm-wild':composite('出走型浪漫','Runaway Romantic','你带着温度出发，也敢把计划留在身后。','You leave with warmth and let the plan fall behind.',['带上想念的人，下一站不必有名字。','今晚的路线只需要一个同谋。','你不是逃离，你只是把心调到更远。'],['Bring the person you miss. The next stop needs no name.','Tonight’s route only needs one accomplice.','You are not escaping. You are tuning your heart farther out.'],['热烈出发','温柔冒险','即兴同谋'],['warm departure','tender risk','spontaneous ally']),
  'warm-bright':composite('人间点灯员','Window Lighter','你习惯先点亮别人，再轻轻坐在光里。','You light the room for others, then sit softly in the glow.',['有人因为你的出现，决定再相信今晚一次。','你的靠近像窗帘缝里漏进来的晨光。','请把这点光留给下一个晚归的人。'],['Someone decided to trust tonight once more because you arrived.','Your presence is morning light slipping through the curtains.','Leave a little light for the next person coming home late.'],['主动温柔','晴朗陪伴','靠近有光'],['active kindness','sunny company','bright arrival']),
  'wild-warm':composite('心跳领航员','Heartline Navigator','你用冲动开路，却总记得谁需要被带上。','Impulse opens the road, but you remember who needs a ride.',['发动之前，给那个名字留一个座位。','你的冒险从来不是一个人的逃跑。','今晚有人愿意跟着你的心跳换台。'],['Save one seat for that name before you start the engine.','Your adventures were never solo escapes.','Someone is willing to change stations with your heartbeat tonight.'],['带人出发','心跳导航','热烈照顾'],['bring them along','heartbeat guide','reckless care']),
  'wild-quiet':composite('夜航观察员','Night Flight Observer','你向远处出发，也把最细小的信号收进耳朵。','You travel far while catching the faintest signals.',['别催促夜晚，它正在给你一条秘密航线。','最远的地方，也可能有人和你保持静默。','你的雷达总在喧闹之后才开始工作。'],['Do not rush the night. It is drawing you a secret route.','Even far away, someone may be sharing your silence.','Your radar starts working after the noise is gone.'],['远方雷达','静默冒险','秘密航线'],['far radar','silent risk','secret route']),
  'wild-bright':composite('闪光制造者','Flashmaker','你把未知当作开关，按下去世界就亮了。','You treat the unknown like a switch that lights the world.',['下一秒没有预告，但会有你制造的光。','今晚适合把不可能先试一次。','有人正在等你按下开始。'],['The next second has no preview, only the light you make.','Tonight is good for trying the impossible once.','Someone is waiting for you to press start.'],['即兴发光','未知启动','惊喜引擎'],['improv light','unknown start','surprise engine']),
  'quiet-warm':composite('深夜留灯人','Late-Night Lamplighter','你听见微弱信号，也愿意为它留一盏灯。','You hear faint signals and leave a lamp on for them.',['这盏灯不催你回来，只告诉你门还开着。','你的安静里有一个位置一直留给别人。','今晚最轻的声音，也会被你接住。'],['This light does not hurry you home. It only says the door is open.','Your quiet has always kept one seat for someone else.','Even the softest voice will be caught by you tonight.'],['微光守候','深夜接住','不催回答'],['light left on','midnight catch','no reply needed']),
  'quiet-wild':composite('暗流漫游者','Undercurrent Drifter','你表面安静，内心却一直在远方试航。','You look still while your inner world keeps sailing.',['没有人看见的地方，你已经出发很多次。','你的安静不是停下，是另一种速度。','今夜的暗流会把同类送到你附近。'],['You have departed many times where no one could see.','Your quiet is not stopping. It is another speed.','Tonight’s undercurrent will carry your kind closer.'],['无声出发','暗流速度','内在远方'],['silent departure','undercurrent speed','inner distance']),
  'quiet-bright':composite('微光捕手','Small-Light Catcher','你不制造喧闹，只把别人忽略的光收好。','You avoid the noise and keep the light others miss.',['今天剩下的那一点好，已经被你看见。','你的眼睛会替微小的快乐作证。','别急，晨光正在用最安静的方式靠近。'],['You noticed the small good thing that survived today.','Your eyes keep evidence of tiny joys.','Morning is approaching in the quietest way.'],['细节发光','安静晴朗','晨光证人'],['detail glow','quiet clarity','morning witness']),
  'bright-warm':composite('晴天拥抱者','Sunlit Embracer','你的明亮不是表演，而是一种主动靠近。','Your brightness is not a performance. It is how you approach.',['今天有人需要的，可能只是你先说一句嗨。','你把热闹变成了不会让人害怕的温度。','请继续做那个先伸手的人。'],['Someone may only need you to say hi first today.','You turn liveliness into a warmth that feels safe.','Keep being the one who reaches out first.'],['先说你好','明亮拥抱','安全热闹'],['say hi first','bright embrace','safe joy']),
  'bright-wild':composite('白昼冒险家','Daylight Adventurer','你相信好奇心值得被立刻执行。','You believe curiosity deserves immediate action.',['别等完美天气，现在就是出发信号。','你的快乐有一双随时准备起跑的鞋。','下一站会因为你先到而亮起来。'],['Do not wait for perfect weather. This is the departure signal.','Your joy keeps its running shoes ready.','The next stop will brighten because you arrived first.'],['晴天出发','好奇执行','快乐先行'],['sunny departure','curiosity in motion','joy goes first']),
  'bright-quiet':composite('晨雾读信人','Dawn Letter Reader','你在明亮里仍然听得见细小而真实的声音。','You can still hear small honest voices inside the light.',['晨光不会打断你，它只是把字照清楚。','今天适合慢一点读懂一个人。','你带来的光，刚好够看见真心。'],['Morning will not interrupt you. It only makes the words clearer.','Today is good for understanding someone slowly.','Your light is just enough to reveal what is sincere.'],['慢读晨光','清醒温柔','真实可见'],['slow morning','clear tenderness','truth visible']),
};

export function buildBroadcast(picks:Pick[],score:number,createdAt=Date.now()):Broadcast{
  const counts=picks.reduce<Record<Dimension,number>>((a,p)=>(a[p.choice.dimension]++,a),{warm:0,wild:0,quiet:0,bright:0});
  const ranked=(Object.entries(counts) as [Dimension,number][]).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
  const primary=ranked[0]?.[0]||'quiet',secondary=ranked.find(([d])=>d!==primary)?.[0]||'warm';
  const path=picks.map(p=>p.choice.dimension[0]).join('');
  const seed=[...`${path}-${score}`].reduce((n,ch)=>(n*33+ch.charCodeAt(0))>>>0,5381);
  const content=COMPOSITES[`${primary}-${secondary}`]||COMPOSITES['quiet-warm'];
  return {id:`hw-${createdAt}-${seed.toString(36)}`,createdAt,channel:primary,secondaryChannel:secondary,frequency:(88+(seed%200)/10).toFixed(1),score,tags:content.tags,picks:picks.map(p=>p.choice.icon),title:content.title,line:content.line,transmission:content.transmissions[seed%content.transmissions.length],signature:`${primary[0].toUpperCase()}${secondary[0].toUpperCase()} · ${path.toUpperCase()}`};
}
