import { useMemo } from 'react';
import { isInAigram, openAigramProfile, telegramId } from '@shared/runtime';
import { t } from '../i18n';
import type { Broadcast, WallEntry } from '../types';
import FrequencyCard from './FrequencyCard';

export default function Wall({ community, mine, loaded, onBack }: { community: WallEntry[]; mine: Broadcast[]; loaded: boolean; onBack: () => void }) {
  const entries = useMemo(() => {
    const cloudIds = new Set(community.map(e => e.broadcast.id));
    const local: WallEntry[] = mine.filter(x => !cloudIds.has(x.id)).map(x => ({ userId: 'self', userName: t('you'), broadcast: x }));
    return [...local, ...community].sort((a, b) => b.broadcast.createdAt - a.broadcast.createdAt).slice(0, 24);
  }, [community, mine]);
  return <section className="hw-wall"><header><button onPointerDown={onBack}>←</button><div><small>HEARTWAVE ARCHIVE</small><h1>{t('community')}</h1></div><span>{String(entries.length).padStart(2, '0')}</span></header><div className="hw-wall__scroll">{!loaded ? <div className="hw-wall__empty">◌<p>{t('loading')}</p></div> : entries.length === 0 ? <div className="hw-wall__empty">⌁<h2>{t('empty')}</h2><p>{t('emptySub')}</p></div> : entries.map(e => {
    const self = e.userId === 'self' || String(telegramId || '') === e.userId;
    return <article className="hw-wall__item" key={e.broadcast.id}><FrequencyCard compact broadcast={e.broadcast}/><footer>{self ? <span className="hw-author hw-author--self">{t('you')}</span> : <button className="hw-author" disabled={!isInAigram} onClick={ev => { ev.stopPropagation(); if (isInAigram) openAigramProfile(e.userId); }}><span className="hw-author__avatar">{e.userAvatarUrl ? <img src={e.userAvatarUrl} alt="" draggable={false}/> : <b>{(e.userName || '?')[0].toUpperCase()}</b>}</span><span className="hw-author__name">{e.userName || 'Unknown signal'}</span></button>}<time>{new Date(e.broadcast.createdAt).toLocaleDateString()}</time></footer></article>;
  })}</div></section>;
}
