import V2Artwork, { type ArtWorld } from './V2Artwork';
import { sampleBroadcasts } from './SampleWall';

const worlds:ArtWorld[]=['portrait','strip','matrix','collage'];
const labels={portrait:'SIGNAL PORTRAIT',strip:'TRANSMISSION STRIP',matrix:'MESSAGE MATRIX',collage:'NIGHT COLLAGE'};
const samples=Array.from({length:24},(_,index)=>({...sampleBroadcasts[index%sampleBroadcasts.length],id:`v2-${index}`,signature:`LAB ${String(index+1).padStart(2,'0')}`}));

export default function V2Lab(){return <main className="v2-lab"><header><small>HEARTWAVE RADIO · V2 ART DIRECTION LAB</small><h1>Four worlds, not four skins.</h1><p>24 samples · 4 worlds · 3 controlled compositions each.</p></header><div className="v2-lab__grid">{samples.map((broadcast,index)=>{const world=worlds[Math.floor(index/6)],variation=index%3;return <section key={broadcast.id}><span>{String(index+1).padStart(2,'0')} / {labels[world]} / V{variation+1}</span><V2Artwork broadcast={broadcast} world={world} variation={variation}/></section>})}</div></main>}
