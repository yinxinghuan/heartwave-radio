# Heartwave Radio 项目记录

更新日期：2026-07-12  
当前状态：V2 作品系统已正式上线，核心改造完成

## 项目入口

- 本地目录：`/Users/yin/code/games/heartwave-radio`
- GitHub：`https://github.com/yinxinghuan/heartwave-radio`
- 正式地址：`https://yinxinghuan.github.io/heartwave-radio/`
- V2 设计实验室：`https://yinxinghuan.github.io/heartwave-radio/?lab=1`
- 旧版视觉对照页：`https://yinxinghuan.github.io/heartwave-radio/?samples=1`

## 当前产品

Heartwave Radio 是一款约 60 秒的社交默契游戏。玩家完成 5 轮双选题，系统根据主副频道生成复合人格、频率、午夜广播文案和可公开播出的个人作品。

- 英文为主要界面语言，根据系统自动切换中文。
- 玩家可以无限重新游玩，但每个本地自然日只能公开播出 1 张作品。
- 个人最多保存最近 20 张作品；社区墙展示合并后的最新 24 张。
- 墙卡可以点击打开完整详情。
- 其他用户的头像和姓名可打开 Aigram 主页。
- 本人作品支持两次确认删除；删除不会返还当天播出机会。

## V2 作品系统

旧方案的问题是所有作品共享同一张卡片骨架，DNA 只改变颜色、纹理和局部图形，作品墙远看仍然高度相似。V2 已推倒作品渲染层，保留游戏、存档和社交功能。

正式作品包含四个构图级视觉世界：

1. Signal Portrait：单一信号主体，标题与主体压叠。
2. Transmission Strip：声带横向贯穿整张作品。
3. Message Matrix：标题、频率和讯息成为矩阵单元。
4. Night Collage：便签、票据和广播碎片形成不规则叠层。

每个视觉世界包含 3 种受控内部构图。复合人格语义决定视觉世界，作品 ID 的稳定哈希只决定内部构图，因此同一张作品在结算、墙卡和详情中始终一致。

内容映射规则：

- warm 默认进入 Signal Portrait；warm × wild 进入 Night Collage。
- wild × bright 进入 Transmission Strip；其余 wild 进入 Night Collage。
- quiet × warm 进入 Signal Portrait；其余 quiet 进入 Message Matrix。
- bright × wild 进入 Transmission Strip；其余 bright 进入 Night Collage。
- 旧存档缺少副频道时按主频道稳定回退，不迁移或重写存档。

## 数据与社交约束

- 永久游戏 UUID 不变。
- `useGameSave.savedData` 仅用于首次加载；组件内 `local` 镜像负责后续读写。
- 发布时本地作品立即乐观合并到社区墙，避免云端约 1 秒延迟导致作品暂时消失。
- `useWall.ts` 遍历每位用户存档中的完整 `broadcasts` 数组，不只读取第一条。
- 墙数据按 `broadcast.id` 去重，而不是按用户 ID 去重。
- 每日锁唯一来源为 `lastBroadcastDay`，不读取平台跨日统计。

## 已完成验证

- `npm run build` 通过。
- 24 张 V2 样本分别在 1280 px 桌面和 390 px 手机视口完成渲染。
- 四个视觉世界各 6 张样本，三种内部构图各出现至少 2 次。
- 标题、正文、标签与矩阵内容的边界溢出数量为 0。
- 英文与中文完整流程均通过：开始、5 轮选择、结算、发布、每日锁、进入墙、打开详情。
- 结算与详情的视觉世界一致。
- 本人删除入口存在，第一次点击进入确认状态，第二次删除成功；删除后详情关闭、墙条目移除。
- 线上 bundle 已直接检出 `data-world` 与 `hw-artwork`，确认正式代码发布，而非只依赖工作流状态。

## 关键提交

- `1f05762`：建立四个视觉世界与 24 张 V2 实验样本。
- `8ec110a`：每个世界增加 3 种内部构图，并建立内容映射。
- `494dce5`：V2 正式接入结算页、社区墙和详情页。
- `ba520fa`：同步正式 V2 需求文档。

## 后续建议

当前版本可视为正式完成。后续工作应由真实作品墙数据驱动，不再立即扩模板：

1. 观察四个视觉世界在真实用户作品中的出现比例。
2. 若某类明显过少，优先调整复合人格映射，不用随机权重强行补齐。
3. 检查连续发布形成的作品墙是否仍有局部重复，再精修对应世界内部构图。
4. 只有在真实反馈证明需要时，才为 Signal Portrait 或 Night Collage 接入平台生成的位图素材。
5. 保留 `?lab=1` 作为所有后续视觉改造的回归基准；新视觉先进入实验室，通过样本墙验证后才能进入正式作品。
