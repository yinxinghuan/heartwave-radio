import { useCallback, useEffect, useRef, useState } from 'react';
import { buildBroadcast, CHANNELS, QUESTIONS } from '../data';
import type { Broadcast, Choice, Dimension, Pick, Question } from '../types';
import { addChannelLayer, finishSound, pickSound, playChannelTheme, resumeAudio, startSound, timeoutSound } from '../utils/sounds';

const ROUND_COUNT=5, DURATION=60;
const shuffle=()=>[...QUESTIONS].sort(()=>Math.random()-.5).slice(0,ROUND_COUNT);

export function useHeartwave(){
 const [isPlaying,setIsPlaying]=useState(false),[isGameOver,setIsGameOver]=useState(false);
 const [questions,setQuestions]=useState<Question[]>(()=>shuffle()),[round,setRound]=useState(0),[picks,setPicks]=useState<Pick[]>([]);
 const [score,setScore]=useState(0),[bestScore,setBestScore]=useState(()=>Number(localStorage.getItem('heartwave_radio_best')||0));
 const [combo,setCombo]=useState(0),[timeLeft,setTimeLeft]=useState(DURATION),[lastGain,setLastGain]=useState(0),[quote,setQuote]=useState('');
 const [broadcast,setBroadcast]=useState<Broadcast>(()=>buildBroadcast([],0,0));
 const roundStart=useRef(0), timer=useRef<number>(), picksRef=useRef<Pick[]>([]), scoreRef=useRef(0);
 const finish=useCallback((finalPicks:Pick[],finalScore:number,timedOut=false)=>{window.clearInterval(timer.current);setIsPlaying(false);setIsGameOver(true);const nextBroadcast=buildBroadcast(finalPicks,finalScore);setBroadcast(nextBroadcast);if(timedOut)timeoutSound();else{finishSound();setTimeout(()=>playChannelTheme(nextBroadcast.channel),420)}const best=Math.max(bestScore,finalScore);setBestScore(best);localStorage.setItem('heartwave_radio_best',String(best));setPicks(finalPicks)},[bestScore]);
 const start=useCallback(()=>{resumeAudio();startSound();const qs=shuffle();setQuestions(qs);setRound(0);setPicks([]);picksRef.current=[];setScore(0);scoreRef.current=0;setCombo(0);setTimeLeft(DURATION);setIsPlaying(true);setIsGameOver(false);roundStart.current=performance.now();window.clearInterval(timer.current);timer.current=window.setInterval(()=>setTimeLeft(v=>{if(v<=1){window.clearInterval(timer.current);setTimeout(()=>finish(picksRef.current,scoreRef.current,true),0);return 0}return v-1}),1000)},[finish]);
 const choose=useCallback((choice:Choice)=>{if(!isPlaying)return;const elapsed=performance.now()-roundStart.current;const prev=picks[picks.length-1]?.choice.dimension;const nextCombo=prev===choice.dimension?combo+1:1;const gain=100+Math.max(0,Math.round((4000-elapsed)/40))+20*(nextCombo-1);const nextPicks=[...picks,{question:questions[round].prompt,choice}];const nextScore=score+gain;picksRef.current=nextPicks;scoreRef.current=nextScore;setPicks(nextPicks);setScore(nextScore);setCombo(nextCombo);setLastGain(gain);setQuote(CHANNELS[choice.dimension].line);pickSound(nextCombo);addChannelLayer(choice.dimension,nextPicks.length);if(round>=ROUND_COUNT-1){setTimeout(()=>finish(nextPicks,nextScore),420)}else{setRound(r=>r+1);roundStart.current=performance.now()}},[isPlaying,picks,combo,questions,round,score,finish]);
 const home=useCallback(()=>{window.clearInterval(timer.current);setIsPlaying(false);setIsGameOver(false)},[]);
 useEffect(()=>()=>window.clearInterval(timer.current),[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(isPlaying&&(e.key==='1'||e.key==='ArrowLeft'))choose(questions[round].choices[0]);if(isPlaying&&(e.key==='2'||e.key==='ArrowRight'))choose(questions[round].choices[1]);if(e.key==='Enter'&&!isPlaying)start()};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[isPlaying,questions,round,choose,start]);
 return{isPlaying,isGameOver,question:questions[round],round,score,bestScore,combo,timeLeft,lastGain,quote,picks,channel:broadcast.channel,broadcast,start,choose,home};
}
