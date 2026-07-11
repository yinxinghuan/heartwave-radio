import type { Broadcast, Dimension } from '../types';
import FrequencyCard from './FrequencyCard';

const samples: Array<[Dimension,string,string,string,string[],string[]]> = [
  ['warm','Afterglow Keeper','You leave a small light on for the people still finding their way.','91.7',['soft landing','still here','shared warmth'],['warm','quiet','warm','bright','warm']],
  ['wild','Zero-Gravity Messenger','Your signal arrives before anyone knows they were waiting.','99.4',['open channel','first move','electric nerve'],['wild','bright','wild','wild','quiet']],
  ['quiet','The Frequency Between Words','You hear what remains after the room has finished speaking.','103.8',['deep listening','night witness','low tide'],['quiet','quiet','warm','quiet','wild']],
  ['bright','Dawn Letter Reader','Morning does not interrupt you. It makes the words clearer.','93.2',['slow morning','clear tenderness','truth visible'],['bright','quiet','bright','bright','warm']],
  ['warm','Borrowed Constellation','Tonight, someone else’s courage becomes part of your sky.','88.6',['near orbit','gentle proof','held signal'],['warm','wild','quiet','warm','bright']],
  ['wild','Beautiful Interference','You turn crossed signals into a reason to move closer.','106.1',['signal clash','alive now','strange magnet'],['wild','warm','wild','quiet','wild']],
  ['quiet','月背收信人','你听见别人错过的微弱信号。','101.3',['安静共振','夜间观察','低声回应'],['quiet','warm','quiet','quiet','bright']],
  ['bright','闪光制造者','有人正在等你按下开始。','99.4',['即兴发光','未知启动','惊喜引擎'],['bright','wild','bright','wild','bright']],
  ['warm','Late-Night Room for Two','Not every silence needs to be filled to feel shared.','95.5',['close enough','soft static','stay awhile'],['warm','quiet','quiet','warm','warm']],
  ['wild','Receiver Left Unattended','The message got stranger while nobody was watching.','108.0',['odd evidence','loose wire','unknown sender'],['wild','quiet','bright','wild','warm']],
  ['quiet','Small-Light Catcher','You notice the good things that survive without applause.','105.2',['detail glow','quiet clarity','morning witness'],['quiet','bright','quiet','warm','quiet']],
  ['bright','Sunrise Relay Station','You pass the first brave signal to whoever needs it next.','90.8',['new circuit','open window','forward motion'],['bright','warm','bright','quiet','wild']],
];

const broadcasts: Broadcast[]=samples.map(([channel,title,line,frequency,tags,picks],index)=>({id:`sample-${index}`,createdAt:0,channel,frequency,score:900+index*13,tags,picks,title,line,signature:`SAMPLE ${String(index+1).padStart(2,'0')}`}));

export default function SampleWall(){return <main className="hw-samples"><header><small>HEARTWAVE RADIO · SYSTEM TEST</small><h1>Broadcast field studies</h1><p>One framework, twelve content conditions. Visual DNA is not assigned.</p></header><div className="hw-samples__grid">{broadcasts.map((broadcast,index)=><section key={broadcast.id}><span>{String(index+1).padStart(2,'0')}</span><FrequencyCard broadcast={broadcast} compact/></section>)}</div></main>}
