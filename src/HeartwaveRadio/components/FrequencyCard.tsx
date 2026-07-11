import { CHANNELS } from '../data';
import type { Broadcast } from '../types';

const DIAL_MARKS = ['88', '92', '96', '100', '104', '108'];

export default function FrequencyCard({ broadcast, compact=false }: { broadcast: Broadcast; compact?: boolean }) {
  const channel=CHANNELS[broadcast.channel];

  return <article className={`hw-card hw-card--master hw-card--${broadcast.channel} ${compact?'hw-card--compact':''}`} style={{'--channel':channel.color} as React.CSSProperties}>
    <div className="hw-card__paper" aria-hidden />
    <header className="hw-card__top">
      <span>ALTERU · NIGHT SIGNAL</span>
      <span>{broadcast.signature||'HEARTWAVE ARCHIVE'}</span>
    </header>
    <div className="hw-card__hero" aria-hidden>
      <div className="hw-card__disc"><i/><b>{broadcast.frequency}</b><small>MHz</small></div>
      <div className="hw-card__dial">
        <div className="hw-card__scale">{DIAL_MARKS.map(mark=><span key={mark}>{mark}</span>)}</div>
        <div className="hw-card__rail"><i/></div>
        <strong>{broadcast.frequency} <small>FM</small></strong>
      </div>
    </div>
    <section className="hw-card__copy">
      <small>{channel.en} · PRIVATE PRESSING</small>
      <h2>{broadcast.title||channel.name}</h2>
      <p>{broadcast.line||channel.line}</p>
    </section>
    <footer className="hw-card__foot">
      <div className="hw-card__tags">{broadcast.tags.slice(0,compact?2:3).map(tag=><span key={tag}>#{tag}</span>)}</div>
      <div className="hw-card__trail" aria-label="five choice signal path">{broadcast.picks.map((_,index)=><b key={index}><i/></b>)}</div>
    </footer>
  </article>;
}
