export const FIELD_W = 390;
export const FIELD_H = 760;
export type Dimension = 'warm' | 'wild' | 'quiet' | 'bright';
export interface Choice { icon: string; title: string; desc: string; dimension: Dimension; }
export interface Question { eyebrow: string; prompt: string; choices: [Choice, Choice]; }
export interface Pick { question: string; choice: Choice; }
export interface Broadcast { id: string; createdAt: number; channel: Dimension; secondaryChannel?: Dimension; frequency: string; score: number; tags: string[]; picks: string[]; title?: string; line?: string; transmission?: string; signature?: string; }
export interface HeartwaveSave { broadcasts: Broadcast[]; lastBroadcastDay?: string; }
export interface WallEntry { userId: string; userName?: string; userAvatarUrl?: string; broadcast: Broadcast; }
