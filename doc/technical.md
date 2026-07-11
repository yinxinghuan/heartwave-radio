# Technical

## 1. 技术栈

- React 18 + TypeScript 5 构建界面与游戏状态，Vite 5 负责开发和生产构建，部署基路径固定为 `./`。
- Less 编写响应式 AlterU 实体 FM 视觉，布局使用 `100dvh` 与最大宽度 430 px；品牌系统由油墨粉、薄荷绿、机身紫、标签纸和墨黑组成。英文与 UI 字体使用项目内置 Onest 可变字体，MHz 与目录标签才使用等宽体，避免系统窄体回退造成的粗糙排版。
- Web Audio API 以振荡器合成按钮、选择、连击、完成、超时和发布音效；唱片、声波、光晕与频道卡全部由 CSS 绘制。
- `@shared/runtime` 提供 Aigram 桥接、用户身份、跨用户资料读取和主页跳转；`@shared/save` 提供本地同步写入与云端防抖存档。

## 2. 目录结构

- `src/HeartwaveRadio/HeartwaveRadio.tsx`：三态主界面、平台存档本地镜像、发布和墙页面切换。
- `src/HeartwaveRadio/hooks/useHeartwave.ts`：题目抽取、倒计时、连击、计分、频道推导、最高分和键盘输入。
- `src/HeartwaveRadio/hooks/useWall.ts`：拉取平台最近用户存档，展开每个用户的全部 `broadcasts`，解析用户资料并输出社区条目。
- `src/HeartwaveRadio/components/FrequencyCard.tsx`：结果页、社区墙与详情页共用的响应式频率卡；当前统一输出经过精修的 limited-pressing 母版，用频道变量切换纸张与强调色。随机视觉 DNA 暂停分配，避免在母版尚未验收时用随机组合掩盖构图问题。
- `src/HeartwaveRadio/components/Wall.tsx`：个人条目乐观合并、按条目 ID 去重、最新 24 条展示、墙卡详情弹层、作者主页入口与本人作品两步删除。
- `src/HeartwaveRadio/data.ts`：8 组双选题与 4 个频道的名称、色彩、台词和标签。
- `src/HeartwaveRadio/i18n/index.ts`：中文和英文轻量文案；优先读取 `game_locale` 手动覆盖，未设置时根据 `navigator.language` 自动选择，并同步更新 HTML `lang` 属性。
- `src/HeartwaveRadio/utils/sounds.ts`：Web Audio 合成音效。
- `src/shared/runtime/`、`src/shared/save/`：同步自项目共享目录的平台桥接和存档实现。
- `public/poster.svg`、`meta.json`、`src/game-id.ts`：封面、发布元数据与永久游戏 UUID。

## 3. 核心模块

- 游戏状态采用 `isPlaying` 与 `isGameOver` 两个布尔量表达开始、进行、结束三态；每局随机抽 5 道不重复题目。
- 每次选择按反应速度计算 100–200 分，并以连续相同维度叠加每级 20 分连击奖励；四维累计最高项决定最终频道，分数映射到 88.0–107.9 MHz。
- 60 秒定时器通过 ref 保持当前选择和分数，确保超时结算不会读取旧闭包；最高分写入 `heartwave_radio_best`。
- `useGameSave` 的 `savedData` 只用于首次加载，之后以组件内 `local` 状态作为唯一读写镜像；每次发布保存最近 20 张个人频率卡。
- 结算时 `buildBroadcast()` 一次性生成稳定条目 ID，依据五次选择统计主副频道并映射 12 套复合人格内容；路径哈希决定广播文案和频率，避免重渲染改变作品。社区数据钩子遍历每个用户存档内全部 `broadcasts`，跨用户按 `createdAt` 排序；墙组件将本地个人条目先行合并，按 `broadcast.id` 去重后展示 24 条。
- `HeartwaveSave.lastBroadcastDay` 是每日公开播出的唯一锁定来源；删除只修改同一镜像中的 `broadcasts`，保留 `lastBroadcastDay`，避免删除后绕过每日仪式。
- 墙内作者头像使用 `head_url`，缺失时显示姓名首字母；头像姓名按钮使用 `onClick` 并在 Aigram 内调用 `openAigramProfile`。
- Web Audio 在首次手势后解锁；开场播放短促搜台噪声，每次答案加入对应频道乐句，结算时播放频道主题旋律。全局界面以 `100dvh` 适配屏幕；结果页和墙独立滚动，墙卡使用 `touch-action: pan-y` 保留移动端自然滚动。

## 4. 扩展点

- 新增题目或调整频道文字、标签与主题色：修改 `src/HeartwaveRadio/data.ts`。
- 调整局数、时限、速度分或连击公式：修改 `src/HeartwaveRadio/hooks/useHeartwave.ts` 顶部常量与 `choose()`。
- 修改唱片、磨砂面板、动效、响应式尺寸或频道卡排版：修改 `src/HeartwaveRadio/HeartwaveRadio.less`。
- 增加文案或语言：扩展 `src/HeartwaveRadio/i18n/index.ts` 的字典和 locale 检测。
- 调整个人存档容量或墙展示上限：分别修改 `HeartwaveRadio.tsx` 的 20 条上限与 `components/Wall.tsx` / `hooks/useWall.ts` 的 24 条上限。
- 增加点赞、留言或通知：在墙卡中接入 `useGameEvent`，继续使用条目 ID 作为目标键，通知目标使用墙条目的真实 `userId`。
- 更换发布信息、封面或游戏身份：修改 `meta.json`、`public/poster.svg` 与 `games/games.json`；`src/game-id.ts` 中 UUID 永久保持不变。
