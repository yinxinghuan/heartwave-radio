import { CHANNELS } from '../data';
import type { Broadcast } from '../types';

type FieldMode='contour'|'spectrum'|'matrix';
const hash=(value:string)=>[...value].reduce((total,char)=>(total*33+char.charCodeAt(0))>>>0,5381);

export default function FrequencyCard({ broadcast, compact=false, previewMode }: { broadcast: Broadcast; compact?: boolean; previewMode?: FieldMode }) {
  const channel=CHANNELS[broadcast.channel];
  const seed=hash(broadcast.id),mode=previewMode??(['contour','spectrum','matrix'] as FieldMode[])[seed%3];
  const density=seed%2===0?'air':'dense',direction=Math.floor(seed/2)%2===0?'rise':'fall';

  return <article className={`hw-card hw-card--system hw-card--${broadcast.channel} hw-card--field-${mode} hw-card--density-${density} hw-card--direction-${direction} ${compact?'hw-card--compact':''}`} style={{'--channel':channel.color} as React.CSSProperties}>
    <div className="hw-card__paper" aria-hidden />
    <header className="hw-card__top">
      <span>ALTERU · NIGHT SIGNAL</span>
      <span>{broadcast.signature||'HEARTWAVE ARCHIVE'}</span>
    </header>
    <div className="hw-card__field" aria-hidden>
      <div className="hw-card__frequency"><strong>{broadcast.frequency}</strong><span>MHz / FM</span></div>
      <div className="hw-card__contour"><i/><i/><i/></div>
      <div className="hw-card__spectrum">{[2,5,3,7,4,8,5,3,6].map((level,index)=><i key={index} style={{'--band':level} as React.CSSProperties}/>)}</div>
      <div className="hw-card__matrix"><b>RX</b><span>{broadcast.picks.join('').toUpperCase()}</span><span>{broadcast.frequency.replace('.','')}</span><span>{broadcast.signature?.slice(-2)||'00'}</span></div>
      <div className="hw-card__signal">
        {broadcast.picks.map((pick,index)=><i key={`${pick}-${index}`} style={{'--step':index,'--level':broadcast.picks.filter(x=>x===pick).length} as React.CSSProperties}><b/></i>)}
      </div>
      <span className="hw-card__coordinate">RX {broadcast.picks.join('·').toUpperCase()}</span>
    </div>
    <section className="hw-card__copy">
      <small>{channel.en} · PERSONAL TRANSMISSION</small>
      <h2>{broadcast.title||channel.name}</h2>
      <p>{broadcast.line||channel.line}</p>
    </section>
    <footer className="hw-card__foot">
      <div className="hw-card__tags">{broadcast.tags.slice(0,compact?2:3).map(tag=><span key={tag}>#{tag}</span>)}</div>
      <div className="hw-card__trail" aria-label="five choice signal path">{broadcast.picks.map((_,index)=><b key={index}><i/></b>)}</div>
    </footer>
  </article>;
}
