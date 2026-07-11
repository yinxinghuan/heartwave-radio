import type { Broadcast } from '../types';
import V2Artwork, { selectArtWorld } from './V2Artwork';

export default function Artwork({broadcast,compact=false}:{broadcast:Broadcast;compact?:boolean}){
  return <div className={`hw-artwork ${compact?'hw-artwork--compact':''}`}><V2Artwork broadcast={broadcast} world={selectArtWorld(broadcast)}/></div>
}
