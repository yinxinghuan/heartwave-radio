import { useEffect, useState } from 'react';
import { useGameSave } from '@shared/save';
import aigramSrc from './img/aigram.svg';
import { CHANNELS } from './data';
import { t } from './i18n';
import { useHeartwave } from './hooks/useHeartwave';
import { useWall } from './hooks/useWall';
import type { HeartwaveSave } from './types';
import Artwork from './components/Artwork';
import SampleWall from './components/SampleWall';
import V2Lab from './components/V2Lab';
import Wall from './components/Wall';
import { click, publishSound } from './utils/sounds';
import './HeartwaveRadio.less';

const dayKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const BrandMark=()=> <span className="hw-brandmark" aria-hidden><i/><i/><i/><b>A</b></span>;
const SignalIcon=({kind}:{kind:keyof typeof CHANNELS})=> <svg className="hw-signal-icon" viewBox="0 0 48 48" aria-hidden><circle cx="24" cy="24" r="5"/><path d={kind==='warm'?'M8 29c5-15 27-15 32 0M14 34c4-8 16-8 20 0':kind==='wild'?'M8 29 18 13l7 20 7-13 8 9':kind==='quiet'?'M9 25c6-12 24-12 30 0M15 25c4-6 14-6 18 0':'M24 7v10m0 14v10M7 24h10m14 0h10M12 12l7 7m10 10 7 7m0-24-7 7M19 29l-7 7'}/></svg>;

export default function HeartwaveRadio(){
  const save=useGameSave<HeartwaveSave>('heartwave-radio'),wall=useWall();
  const persist=save.persist,refreshWall=wall.refresh;
  const [local,setLocal]=useState<HeartwaveSave>({broadcasts:[]}),[seeded,setSeeded]=useState(false),[screen,setScreen]=useState<'game'|'wall'>('game');
  useEffect(()=>{if(save.loaded&&!seeded){setLocal(save.savedData??{broadcasts:[]});setSeeded(true)}},[save.loaded,save.savedData,seeded]);
  const today=dayKey(),generatedDay=local.lastGeneratedDay??local.lastBroadcastDay;
  const hasGeneratedToday=generatedDay===today;
  const game=useHeartwave(seeded&&!hasGeneratedToday);
  const generatedId=local.lastGeneratedId??(hasGeneratedToday?(local.lastBroadcastId??local.broadcasts[0]?.id):undefined);
  const hasLiveGeneratedWork=Boolean(generatedId&&local.broadcasts.some(x=>x.id===generatedId));
  const currentWasGenerated=generatedId===game.broadcast.id;
  const currentIsLive=currentWasGenerated&&local.broadcasts.some(x=>x.id===game.broadcast.id);
  useEffect(()=>{if(!seeded||!game.isGameOver||hasGeneratedToday||!game.broadcast.id)return;const next:HeartwaveSave={...local,lastGeneratedDay:today,lastGeneratedId:game.broadcast.id,broadcasts:[game.broadcast,...local.broadcasts.filter(x=>x.id!==game.broadcast.id)].slice(0,20)};setLocal(next);persist(next);publishSound();refreshWall()},[seeded,game.isGameOver,game.broadcast,hasGeneratedToday,local,persist,refreshWall,today]);
  const deleteBroadcast=(id:string)=>{const next:HeartwaveSave={...local,broadcasts:local.broadcasts.filter(x=>x.id!==id)};setLocal(next);persist(next);refreshWall()};
  const startOrOpen=()=>{click();if(hasGeneratedToday)setScreen('wall');else game.start()};
  if(new URLSearchParams(window.location.search).has('lab'))return <V2Lab/>;
  if(new URLSearchParams(window.location.search).has('samples'))return <SampleWall/>;
  if(screen==='wall')return <main className="hw"><Wall community={wall.entries} mine={local.broadcasts} loaded={wall.loaded} onDelete={deleteBroadcast} onBack={()=>setScreen('game')}/><img className="hw__watermark" src={aigramSrc} alt="" draggable={false}/></main>;
  return <main className="hw"><div className="hw__orb hw__orb--one"/><div className="hw__orb hw__orb--two"/><div className="hw__grain"/>
    {!game.isPlaying&&!game.isGameOver&&<section className="hw-start"><div className="hw-brandline"><BrandMark/><span>ALTERU SOCIAL SIGNAL</span><b>LIVE 001</b></div><div className="hw-kicker"><i/> {t('live')}</div><div className="hw-vinyl"><div className="hw-vinyl__rings"/><BrandMark/></div><div className="hw-waves">{[1,2,3,4,5].map(n=><i key={n}/>)}</div><h1><span>{t('titleTop')}</span><br/><em>{t('titleBottom')}</em></h1><p>HEARTWAVE RADIO · 88—108 MHz</p><button className="hw-cta" disabled={!seeded||(hasGeneratedToday&&!hasLiveGeneratedWork)} onPointerDown={startOrOpen}><span>{hasGeneratedToday?(hasLiveGeneratedWork?t('generated'):t('generationUsed')):t('start')}</span><small>{hasGeneratedToday?(hasLiveGeneratedWork?t('generatedSub'):t('generationUsedSub')):t('startSub')}</small></button><button className="hw-link" onPointerDown={()=>{click();setScreen('wall')}}>⌁ {t('wall')} <span>→</span></button></section>}
    {game.isPlaying&&<section className="hw-play"><header><div className="hw-progress">{[0,1,2,3,4].map(n=><i className={n<=game.round?'is-on':''} key={n}/>)}</div><div className="hw-meta"><span>{t('round')} {game.round+1}/5</span><b>{game.timeLeft}s</b><span>{t('score')} {game.score}</span></div></header>{game.combo>=2&&<div className="hw-combo">×{game.combo} {t('streak')}</div>}<div className="hw-question"><small>{game.question.eyebrow}</small><h2>{game.question.prompt}</h2><p>{t('choose')}</p></div><div className="hw-options">{game.question.choices.map((choice,i)=><button key={choice.title} onPointerDown={()=>game.choose(choice)} style={{'--choice':CHANNELS[choice.dimension].color} as React.CSSProperties}><kbd>0{i+1}</kbd><b><SignalIcon kind={choice.dimension}/></b><h3>{choice.title}</h3><p>{choice.desc}</p></button>)}</div>{game.lastGain>0&&<div key={`${game.round}-${game.score}`} className="hw-gain">+{game.lastGain}</div>}{game.quote&&<div key={game.quote+game.round} className="hw-quote">“{game.quote}”</div>}</section>}
    {game.isGameOver&&<section className="hw-result"><header className="hw-result__intro"><small>{t('result')}</small></header><Artwork broadcast={game.broadcast}/>{game.broadcast.transmission&&<blockquote className="hw-transmission">“{game.broadcast.transmission}”<small>{game.broadcast.signature}</small></blockquote>}<div className="hw-score"><span>{t('score')} <b>{game.score}</b></span><i/><span>{t('best')} <b>{game.bestScore}</b></span></div><div className={`hw-live-confirmation ${currentIsLive?'is-live':''}`}>{currentIsLive?'✓ '+t('published'):currentWasGenerated?'× '+t('deletedToday'):'◌ '+t('publishing')}</div><p className="hw-daily-note">{t('dailyRitual')}</p><div className="hw-result__row"><button onPointerDown={()=>setScreen('wall')}>{t('viewWall')}</button><button disabled>{t('tomorrow')}</button></div><button className="hw-home" onPointerDown={game.home}>← {t('home')}</button></section>}
    <img className="hw__watermark" src={aigramSrc} alt="" draggable={false}/>
  </main>;
}
