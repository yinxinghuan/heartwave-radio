declare module '@shared/save' {
  export interface UseGameSave<T>{savedData:T|null|undefined;loaded:boolean;hasSave:boolean;persist:(data:T)=>void;clear:()=>Promise<void>}
  export function useGameSave<T>(gameId:string):UseGameSave<T>;
}
declare module '@shared/runtime' {
  export const isInAigram:boolean;
  export const telegramId:string|null;
  export function openAigramProfile(userId:string):void;
  export function callAigramAPI<T>(path:string,method?:string,body?:unknown):Promise<T>;
  export interface AigramResponse<T>{retcode:number;msg:string;data:T}
}
declare module '@shared/runtime/game-id' { export function getGameUuid():string; }
