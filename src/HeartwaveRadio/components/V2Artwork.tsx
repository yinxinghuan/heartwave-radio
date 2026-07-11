import { CHANNELS } from '../data';
import type { Broadcast } from '../types';

export type ArtWorld='portrait'|'strip'|'matrix'|'collage';
const hash=(value:string)=>[...value].reduce((total,char)=>(total*31+char.charCodeAt(0))>>>0,17);

export function selectArtWorld(broadcast:Broadcast):ArtWorld{
  const secondary=broadcast.secondaryChannel;
  if(broadcast.channel==='warm')return secondary==='wild'?'collage':'portrait';
  if(broadcast.channel==='wild')return secondary==='bright'?'strip':'collage';
  if(broadcast.channel==='quiet')return secondary==='warm'?'portrait':'matrix';
  return secondary==='wild'?'strip':'collage';
}

const Path=({broadcast}:{broadcast:Broadcast})=><div className="v2-art__path">{broadcast.picks.map((pick,index)=><i key={`${pick}-${index}`}><b/></i>)}</div>;

export default function V2Artwork({broadcast,world,variation}:{broadcast:Broadcast;world:ArtWorld;variation?:number}){
  const channel=CHANNELS[broadcast.channel],title=broadcast.title||channel.name,line=broadcast.line||channel.line;
  const composition=variation??hash(broadcast.id)%3;
  return <article className={`v2-art v2-art--${world} v2-art--${broadcast.channel} v2-art--v${composition}`} data-world={world}>
    {world==='portrait'&&<><div className="v2-art__portrait"><i/><i/><i/><b>{broadcast.frequency}</b></div><header><span>HEARTWAVE / {broadcast.signature}</span><strong>{title}</strong><p>{line}</p></header><Path broadcast={broadcast}/></>}
    {world==='strip'&&<><header><span>TRANSMISSION {broadcast.signature}</span><b>{broadcast.frequency} MHz</b></header><div className="v2-art__tape">{[3,7,4,9,5,2,8,4,6,3,8,5,2,7,4,9].map((n,i)=><i key={i} style={{'--h':n} as React.CSSProperties}/>)}</div><section><strong>{title}</strong><p>{line}</p></section><Path broadcast={broadcast}/></>}
    {world==='matrix'&&<><div className="v2-art__cells"><b>RX</b><span>{broadcast.frequency}</span><i>{broadcast.picks.join('').toUpperCase()}</i><strong>{title}</strong><p>{line}</p><em>{broadcast.signature}</em></div><Path broadcast={broadcast}/></>}
    {world==='collage'&&<><div className="v2-art__scrap v2-art__scrap--one">{broadcast.frequency}<small>MHz</small></div><div className="v2-art__scrap v2-art__scrap--two">{broadcast.signature}</div><div className="v2-art__scrap v2-art__scrap--three">{broadcast.picks.join(' / ').toUpperCase()}</div><header><span>NIGHT NOTE</span><strong>{title}</strong><p>{line}</p></header><Path broadcast={broadcast}/></>}
    <footer>{broadcast.tags.slice(0,2).map(tag=><span key={tag}>#{tag}</span>)}</footer>
  </article>
}
