import { CHANNELS } from '../data';
import type { Broadcast } from '../types';

export default function FrequencyCard({ broadcast, compact=false }: { broadcast: Broadcast; compact?: boolean }) {
  const c=CHANNELS[broadcast.channel];
  const seed=[...broadcast.id].reduce((n,ch)=>(n*31+ch.charCodeAt(0))>>>0,2166136261);
  const layout=seed%8, texture=Math.floor(seed/8)%8, stamp=Math.floor(seed/64)%8, rhythm=Math.floor(seed/512)%6;
  return <div className={`hw-card hw-card--${broadcast.channel} hw-card--layout-${layout} hw-card--texture-${texture} hw-card--stamp-${stamp} hw-card--rhythm-${rhythm} ${compact?'hw-card--compact':''}`} data-visual-dna={`${layout}-${texture}-${stamp}-${rhythm}`} style={{'--channel':c.color} as React.CSSProperties}>
    <div className="hw-card__noise"/><div className="hw-card__beam"/>
    <div className="hw-card__motif" aria-hidden>{[0,1,2,3,4,5].map(n=><i key={n}/>)}</div>
    <div className="hw-card__top"><span>{broadcast.signature||'ALTERU · HEARTWAVE'}</span><span>{broadcast.frequency} MHz</span></div>
    <div className="hw-card__disc"><i/><b>{broadcast.frequency}</b></div>
    <div className="hw-card__copy"><small>{c.en}</small><h2>{broadcast.title||c.name}</h2><p>{broadcast.line||c.line}</p></div>
    <div className="hw-card__tags">{broadcast.tags.slice(0,compact?2:3).map(x=><span key={x}>#{x}</span>)}</div>
    <div className="hw-card__trail">{broadcast.picks.map((_,i)=><b key={i}><i/></b>)}</div>
  </div>;
}
