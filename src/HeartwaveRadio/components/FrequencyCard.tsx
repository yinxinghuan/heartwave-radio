import { CHANNELS } from '../data';
import type { Broadcast } from '../types';

export default function FrequencyCard({ broadcast, compact=false }: { broadcast: Broadcast; compact?: boolean }) {
  const c=CHANNELS[broadcast.channel];
  return <div className={`hw-card hw-card--${broadcast.channel} ${compact?'hw-card--compact':''}`} style={{'--channel':c.color} as React.CSSProperties}>
    <div className="hw-card__noise"/><div className="hw-card__beam"/>
    <div className="hw-card__motif" aria-hidden>{[0,1,2,3,4,5].map(n=><i key={n}/>)}</div>
    <div className="hw-card__top"><span>ALTERU · HEARTWAVE</span><span>{broadcast.frequency} MHz</span></div>
    <div className="hw-card__disc"><i/><b>{broadcast.frequency}</b></div>
    <div className="hw-card__copy"><small>{c.en}</small><h2>{c.name}</h2><p>{c.line}</p></div>
    <div className="hw-card__tags">{broadcast.tags.slice(0,compact?2:3).map(x=><span key={x}>#{x}</span>)}</div>
    <div className="hw-card__trail">{broadcast.picks.map((_,i)=><b key={i}><i/></b>)}</div>
  </div>;
}
