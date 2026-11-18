/* =============================================================================
 * 稀土材料科学平台 · 静态 Demo · 全站交互（v3.78）
 * -----------------------------------------------------------------------------
 * v3.78（黄总 2026-11-18 午）：输入框卡片对齐对话流内容宽——宽屏下对话流内容（chat-col）max-width
 *   860，而 composer .chat-col 自带 24px 左右 padding 使 cmdbox 只有 812（窄 48px）。把左右 padding
 *   从 chat-col 挪到 .composer 容器层（与 .chat-flow 的 24px 一致），cmdbox 宽屏达 860 与对话流对齐；
 *   确认卡 .ccard-in 同步 812→860 保持一致；hero 空态 padding 归零不参与。版本号全站统一 v3.78。
 *   （顺手修复：mock-data.js 的 processStages 数组 9 处对象间缺逗号致整页语法错误打不开，已补。）
 *
 * v3.77（黄总 2026-11-18 午）：配方 / 工艺候选卡加「选用」按钮——每张候选可显式选定
 *   （candSelId：UI.candSel 显式选用 > AI 推荐项 pick 兜底），选中卡主色描边
 *   （.cand-item.is-picked）+ 按钮实底「已选用」并禁用，改选点其他卡按钮；
 *   cand-pick 动作 toast 反馈（配方=后续仿真/工艺基于该候选，工艺=执行排产基于该工艺包）；
 *   newChat 复位 UI.candSel。版本号全站统一 v3.77。
 * -----------------------------------------------------------------------------
 * v3.76（黄总 2026-11-18 午）：候选已存在科研对象时不再渲染置灰的「已在科研对象」按钮——
 *   不可点的占位按钮是噪音；此时确认卡只剩 忽略 / 存到当前样品（与工艺卡按钮组形态一致）。
 *   版本号全站统一 v3.76。
 *
 * v3.75（黄总 2026-11-18 午）：确认卡摘要行撤「推荐 / 预测 predicted」标签——推荐倾向与
 *   口径对话区 AI 已表述，卡片只留 id + 关键数字；工艺评分挪到名称后（.cc-score），
 *   meta 行只余热处理窗口。版本号全站统一 v3.75。
 *
 * v3.74（黄总 2026-11-18 午）：演示回答改逐字流式——空点发送的预置演示不再整片糊上：
 *   advanceDemo 先整体发出用户消息（立现），本轮 plan 过程卡保持完成态直显，answer 注入为
 *   未流式（_streamed=false）后由 playStreamQueue 串行逐字播放；startStream 加可选 onDone 回调
 *   支撑多条 answer 排队播放（一轮可含综合解读 + 各仿真补充）。版本号全站统一 v3.74。
 *
 * v3.73（黄总 2026-11-18 午）：配方控件改圆形胶囊（pill：白底描边全圆角、垂直居中于
 *   tab 条，更有控件感）——撤 flask icon；下拉菜单与胶囊齐宽（fs-toggle 定位时
 *   width = 胶囊宽，菜单项去「N 类」后缀保配方名完整不截断）。
 *   版本号全站统一 v3.73。
 * -----------------------------------------------------------------------------
 * v3.72（黄总 2026-11-18 午）：确认卡翻页器移卡片右上角（绝对定位浮于摘要区右上，
 *   摘要区右留 84px 防重叠）；底行只剩 标题（类型待确认）+ 按钮组。版本号全站统一 v3.72。
 *
 * v3.71（黄总 2026-11-18 午）：配方控件展开形态修正——不再在 tab 条下方追加第二行
 *   （.wp-fs-bar/.wp-fs-chip 删），改为控件自身的下拉菜单（.wp-fs-menu，fixed 浮层，
 *   fs-toggle 后 JS 按按钮位置定位到正下方，避开 wp-tabs overflow-x 裁剪）；
 *   切 tab 自动收起。控件与右侧配方 tab 之间去分隔线，配方 tab 激活时控件同步主色
 *   （.wp-fs.is-formula）——营造一体感。版本号全站统一 v3.71。
 * -----------------------------------------------------------------------------
 * v3.70（黄总 2026-11-18 午）：侧边文件树撤下（v3.62~v3.66 的 .wp-tree/.wt-* 整组删除），
 *   改为标签栏里的配方切换控件——放在所有产物 tab 之前（检索结果不算，分割线之后）：
 *   控件显示当前配方（UI.fsSel，缺省最新一组），点击在 tab 条下方展开配方列表
 *   （.wp-fs-bar chips，含每组产物类型数），选中后产物 tab 只显示该配方组下的产物
 *   （leaf 升级为 tns 数组过滤，产物按配方隔离、不混组）。归组规则与 v3.64 一致。
 *   拖拽下限回 360px。版本号全站统一 v3.70。
 * -----------------------------------------------------------------------------
 * v3.69（黄总 2026-11-18 午）：确认卡标题下置——「候选配方/工艺参数包 待确认」并入底部
 *   控件行，取代「确认这组…的去向」引导语；翻页器随标题挪到底行（跟在标题后）；
 *   卡片顶部直接展示候选摘要，不再设卡头行（.cc-head/.cc-title 样式随删）。
 *   版本号全站统一 v3.69。
 *
 * v3.68（黄总 2026-11-18 午）：工作台 tab 条加分组竖线——「检索结果」（会话级）与右侧
 *   产物 tab（配方/工艺/VASP/mumax3，入文件树的那组）之间插 1px 竖分割线（.wp-sep，
 *   第二个 tab 前渲染，空会话仅检索 tab 时不出现）。版本号全站统一 v3.68。
 * v3.67（黄总 2026-11-18 午）：工艺确认卡撤「创建为新对象」——全平台以配方为主 key 组织，
 *   工艺包是配方的下游产物、不能独立成科研对象（同 v3.20 方案档收敛、v3.64 产物树归组原则）；
 *   工艺去向只剩 忽略 / 存到当前样品；配方候选是主 key 对象，保留创建入口；
 *   cc-create 事件侧加防御（非配方直接不响应）。版本号全站统一 v3.67。
 *
 * v3.66（黄总 2026-11-18）：产物文件树列移到工作台最右侧——tab 内容区在左、树列贴右边，
 *   分隔线 border-right → border-left。版本号全站统一 v3.66。
 * v3.65（黄总 2026-11-18）：产物文件树同配方下同类型 tab 叶去重——addLeaf 对已存在的同组同 tab 叶
 *   只更新 tn（指向最新一次运行）不再追加 #2/#3 分叶；多次运行的历史在该 tab 卡内切换，不在树里铺。
 *   一个配方下只有 配方/工艺/VASP/mumax3 各一个叶。版本号全站统一 v3.65。
 *
 * v3.64（黄总 2026-11-18）：工作台产物文件树——左列 160px 以配方为 key 组织会话产物。
 *   归组规则：最近一次配方上下文（配方 ID 即存储 keyid）→ 工艺/仿真挂其下；
 *   无配方回落样品基线版本，再无则「未挂配方」；检索为会话级不入树。
 *   叶子点击切对应类型 tab 并滚动定位具体产物卡（闪框 1.5s）；组可折叠（UI.treeOpen）；
 *   固化会话 plan/answer 共享 task 引用按引用去重；演示轮（advanceDemo）显式 seed 确认卡。
 *   拖拽下限 360→470（树列占 160）。同类型多叶收敛见 v3.63 条。全站版本 v3.64。
 * -----------------------------------------------------------------------------
 * v3.63（黄总 2026-11-18）：AI 常规回答去气泡化——.ans-bubble 撤背景/边框/圆角/阴影/padding，
 *   对话流里 AI 的文字回答平铺为纯文本流，与用户气泡（右对齐有色）和 plan 过程卡（仍带卡片壳）
 *   形成层级区分；内嵌可视化（cmp-block / grain-bar）自带边框背景，不受影响。版本号 v3.63。
 *
 * v3.62（黄总 2026-11-18）：工艺确认卡摘要收敛——11 项参数整串平铺（3 行长串）违背
 *   「快速浏览必要信息 + 确定性选择」定位，收成热处理窗口一行（评分 · 烧结 温度×时间 ·
 *   退火 温度×时间），与对话流 answer 口径一致；完整 11 项在工作台工艺 tab。版本号 v3.62。
 *
 * v3.61（黄总 2026-11-18）：确认卡撤解读 note——定位是「快速浏览必要信息 + 确定性选择」，
 *   解读类文字（形成焓最优/取向最优…）不上卡，由对话区 AI 承载；配方/工艺两分支同撤，
 *   .cc-note 样式随删。mock note 字段保留：cc-create 创建科研对象时写入 design_note。
 *   版本号全站统一 v3.61。
 *
 * v3.60（黄总 2026-11-18）：对话页输入条 .composer 去半透明底色/模糊/顶部分隔线——
 *   透明直落页面底色（v3.59 已删 savebar，save 区域由确认卡独占，无需再动）；
 *   全站版本号统一升 v3.60——前轮改动未升 ?v= 参数，浏览器按同 URL 命中缓存旧样式。
 *
 * v3.59（黄总 2026-11-18 早）：删净老的存样品提示条（「结论与留痕可沉淀到科研对象」
 *   + SMP-xxx + 存到样品按钮）——v3.52 确认卡已接管沉淀引导，saveBarHTML 兜底分支残留未删；
 *   本次删 saveBarHTML 函数、chatPageHTML 回落分支（无确认卡时 save 区域留空）、
 *   save-to-sample 事件 case（唯一触发入口随提示条消失）与 .savebar/.sb-* 全部样式；
 *   grid 布局不动（save 区域由确认卡 .ccard 独占）。版本号全站统一 v3.59。
 *
 * v3.58（黄总 2026-11-18 早）：工艺卡参数分组，不再 11 行平铺——按工艺流程分
 *   配料·混料（3）/ 磁场成型（4）/ 烧结·退火（4）三组，组标题 + 组间淡虚线分隔，
 *   对齐 r33 详情卡信息层级规范；mock steps 平铺结构不动（确认卡摘要仍直接拼）。
 *   版本号全站统一 v3.58。
 *
 * v3.58（黄总 2026-11-18）：确认卡视觉宽度修正——卡片样式（背景/边框/圆角/阴影）从内层横条
 *   移到 .ccard-in 白卡片，外层透明不占满列宽；与输入框同宽同位（实测同 551.5px / 同 x）。
 *   版本号全站统一 v3.58。
 *
 * v3.58（黄总 2026-11-18 早）：原子块文本分两类——样品保留「SMP-xxx · 名称」（ID 驱动上下文），
 *   技能/工具/SCP 仅名称（黄总：技能卡片不需要编号）。
 *
 * v3.58（黄总 2026-11-18 早）：工艺卡撤描述性备注 note——工作区只承载工艺参数，
 *   解读/适配说明归对话区 AI（对齐 v3.12 配方卡「解读 note 不上卡」原则）；
 *   note 数据保留在 mock，对话流确认卡 cc-note 继续用。版本号全站统一 v3.58。
 *
 * v3.55（黄总 2026-11-17 晚）：原子块文本精简为「ID · 名称」紧凑格式（去样品句式填充，正常输入文字保持独立）；
 *   修复 contenteditable 输入框文字被 .hero 的 text-align:center 带居中（显式 text-align:left）。
 *
 * v3.54（黄总 2026-11-17 晚）：输入框从 textarea 升级为 contenteditable 原子块编辑器——
 *   挂载项渲染为 contenteditable=false 的 .mention-block（整体：不可中间插入、Backspace 一删全删），
 *   选中后落入输入框（样品填句式 / 其他插入名称），左下角工具行不再出现挂载 chips（块即上下文）；
 *   块删除时 syncMountsFromBlocks 同步清挂载状态；发送成功即清状态；placeholder 改 :empty::before；
 *   粘贴转纯文本；caret 卡片定位改 Range 包围盒法。
 *
 * v3.53（黄总 2026-11-17 晚）：工作台产物两 tab 收敛——
 *   ① 配方 tab 内不存在对比：撤下「与当前版本对比 / 性能对比」两表，只留三组候选配方卡
 *   （panelFormulaHTML 不再上工作台，函数保留备查）；② 工艺 tab 内不存在图片，只有三组工艺：
 *   撤下温度-时间阶梯曲线（procChartSVG 仍服务对话流确认卡），processPacks 扩为
 *   P-N52-A/B/C 三组并一一适配 F-N52-v4a/b/c，参数体系对齐「2.3 混料智能体」产物口径
 *   （总重/各仓重量/成型尺寸/微升距离/充磁·退磁电流/混料次数/烧结温度·时间/退火温度·时间）；
 *   对话流「2 组工艺包 / 温度曲线 / 配方逐项对比」相关文案同步。版本号全站统一 v3.53。
 *
 * v3.52（黄总 2026-11-17 晚）：存样品提示条升级为确定性确认卡——
 *   配方 / 工艺产出后引导用户确认产物去向；结构化模板：卡头（产物类型 + 左右切换 2-3 个候选）
 *   → 候选摘要 → 右下角按钮组（忽略 / 存到当前样品 / 创建为新对象）；宽度复刻输入框（chat-col 约束）；
 *   候选已存在科研对象时创建按钮前置置灰「已在科研对象」。版本号全站统一 v3.52。
 *
 * v3.52（黄总 2026-11-17 晚）：挂载选中项以文本落进输入框（光标跟在其后可继续打字）——
 *   样品特例自动填充句式「我想围绕「SMP-xxx · 名称」展开讨论，」；技能/工具/SCP 插入名称；
 *   输入触发路径删触发符后同位插入，加号路径在当前光标处插入（未聚焦则追加末尾）。
 *
 * v3.50（黄总 2026-11-17 晚）：辅助文本的 @ / / 徽章改为普通灰色代码块样式（弱视觉、不抢发送按钮），
 *   整段与发送按钮底部对齐。
 *
 * v3.49（黄总 2026-11-17 晚）：输入 @ / / 触发的挂载菜单改为跟随光标的 .attach-caret 卡片
 *   （镜像 div 测光标像素坐标，贴在光标下一行；防溢出右界夹逼），不再占用加号旁菜单位置；
 *   触发符被删或光标前移即关闭；点卡片外任意处（含 textarea 其他位置）关闭。
 *
 * v3.48（黄总 2026-11-17 晚）：辅助文本「@ 指定科研对象 · / 唤起技能」改为不可点击的
 *   样式固定辅导内容，从加号旁移到发送按钮左侧（去掉 button / hover / 点击开菜单逻辑）；
 *   @ / / 输入触发挂载菜单仍生效。
 *
 * v3.47（黄总 2026-11-17 晚）：平台更名「稀土材料科学平台」（原「钕铁硼 AI 科学发现科研平台」，
 *   更通用——领域词「稀土材料科学」替代「钕铁硼+AI」）；全站 title / 侧栏品牌 / README / 注释统一。
 *
 * v3.45（黄总 2026-11-17 晚）：仿真只保留 VASP + mumax3 两路真实计算产物——
 *   原 V-REP / Isaac 是凭空编的「场景校验」意图（T-06/T-07），科研对象里没有对应数据源。
 *   移除 INTENTS sim_vrep/sim_isaac、工作台三 tab 改 VASP/mumax3 两 tab、M.simRuns 删 vrep/isaac
 *   加 VASP（引用 SMP-001 档案同源）、技能工具表与固化会话 A/C、意图评测样例全部同步；
 *   会话 A 的多工具编排由三路改 VASP+mumax3 两路。版本号全站统一 v3.45。
 *
 * v3.52（黄总 2026-11-17 晚）：挂载菜单 hover 可用——鼠标移到一级类别项即展开对应二级；
 *   二级面板从当前类别项的行高位置贴着开始出现（translateY 对齐该项），不再固定顶对齐整张菜单。
 *
 * v3.44（黄总 2026-11-17）：挂载菜单选项改横线分隔的紧凑行（去圆角卡片感、行高更矮），
 *   一级里前三项科学工具（技能/工具/SCP）与「科研对象」之间加分组间隔带。
 *
 * v3.43（黄总 2026-11-17）：挂载菜单改并列两级浮层——一级展开后无标题、每项仅名称（去描述）、
 *   宽度收窄至 148px；点类别额外弹出第二张面板（176px）列该类条目，同样仅名称 + 选中勾，
 *   一级常驻不切换内容。
 *
 * v3.42（黄总 2026-11-17）：输入盒工具行补辅助文本「@ 指定科研对象 · / 唤起技能」——
 *   两个 token 可点直接开对应二级菜单；输入框内键入 @ / / 亦唤起对应菜单，选中后自动清除触发符。
 *
 * v3.41（黄总 2026-11-17）：输入盒左侧两个 select（样品 / 技能）合并为「+」挂载菜单——
 *   一级 = 技能 Skill / 工具 Tool / SCP / 科研对象（顺序对齐插件页 tab + 科研对象），
 *   二级 = 该类下具体条目；选中后以 chip 挂在输入盒、可 x 移除；技能锁定意图、科研对象切上下文、
 *   工具 / SCP 注入任务槽位随留痕可回溯。发送按钮保持原位；菜单局部渲染不打断草稿。版本号 v3.41。
 *
 * v3.40（黄总 2026-11-17）：纯演示的两处便利化——① 预置脚本藏进数据层：新建空对话后输入框为空点
 *   「发送」即逐轮吐出会话 A 的三段 AI 自主编排闭环（demoRounds/advanceDemo，按 CDEMO-A 的 user 消息切轮），
 *   不需演示者手输；用户真实输入即退出演示（demoStep=-1）；② 存样品从工作台底部移到输入框正上方
 *   （saveBarHTML + grid area save），重要沉淀操作不再被工作台淹没。版本号全站统一 v3.45。
 *
 * v3.39（黄总 2026-11-17）：执行时间从卡尾挪到卡头（与版本下拉同行，紧凑 mm-dd hh:mm，完整值入 title），
 *   清掉左侧内容区占用；样品档案仿真卡与工作台仿真卡同步。版本号全站统一 v3.39。
 *
 * v3.37（黄总 2026-11-17）：完整闭环会话 A 从「用户 5 次点菜」重构为「3 句泛化需求 + AI 自主编排」——
 *   ① 首轮一句需求 → AI 自主编排 RAG 检索 + 配方智能体 + DFT，输出解读/配方/建议并主动追问要不要出工艺；
 *   ② 次轮出工艺参数并向用户确认要不要执行；③ 末轮一句「验证一下」→ AI 自主编排 V-REP+mumax3+Isaac
 *   三路仿真并综合解读、主动提示存样品。plan 过程卡新增「工具调用」二级节点（默认展开，显示工具 id 与口径），
 *   多工具编排卡保留过程卡；工作台底部新增默认可见的「存到样品」动作条（写事件流供档案投影）。
 *   版本号全站统一 v3.37。
 *
 * v3.36（黄总 2026-11-17）：仿真卡尾元数据全撤——软件版本/集群/留痕号/TC 号/口径说明句
 *   （"输入为配方成分…不作为真值"，tab 分区已承载口径）全部删除，只留一行「执行时间」；
 *   版本下拉选项改带各版执行时间（mm-dd hh:mm），切版本即看时间。工作台仿真卡同步只留执行时间。
 *   版本号全站统一 v3.36。
 *
 * v3.35（黄总 2026-11-17）：① 版本切换从内容区挪到卡头——撤掉占地方的运行历史块，卡头放一个
 *   select（列出各版本 run_id 尾号+参数标签，选中当前版，幂等合并数收进 title）；
 *   switchSimVersion 统一 click/change 两条触发。② 方案档彻底收敛：删工艺方案（本质是工作台
 *   工艺 tab 下游产物，不是独立科研对象），去 kind 类型维度，只按 phase 阶段（候选/预研）
 *   组织卡片、筛选与详情；转样品溯源不再记 from_kind。版本号全站统一 v3.35。
 *
 * v3.34（黄总 2026-11-17）：仿真数据从"扁平任务"改为事件流投影（回答"对话不受控如何同步确定信息 / 同一对话仿真三次怎么处置"）：
 *   M.simEvents = append-only 事件流（run_id 锚点 / run_key 幂等键 / parent 版本链 / source / status / task 载荷引用样品对象）；
 *   失败不入流（就当没有）。投影 projectSimEvents：同 run_key 幂等合并（记 dupRuns）+ parent 串版本链 + 取最新为 current。
 *   演示：VASP 两条相同事件→"2 次相同运行已合并"；mumax3 两条参数微调（Ku1 4.5→4.7）→版本链、可点历史版切换查看。
 *   卡头加"N 次运行"摘要 + 卡内可折叠运行历史；工作台仿真卡加「归档到样品」→ append 事件进 LS.simEvents，档案实时投影。
 *   原则：确定信息从工具执行边界采集、不经过自然语言；对话与档案是同一事件流的两个视图。
 *
 * v3.33（黄总 2026-11-17）：对话流撤下「我 / AI」角色标签——用户气泡仍右对齐、AI 回答通栏，
 *   靠位置与气泡样式区分；原间隔靠标签高度撑出（.chat-flow 的 gap 只作用于 .chat-col，
 *   不作用于消息），故同步在 .chat-flow .chat-col 补 18px gap，完整保留原布局节奏。
 *   版本号全站统一 v3.33。
 *
 * v3.28（黄总 2026-11-17）：对话流与工作台之间加 6px 可拖拽分隔条——工作台宽度用户自定，
 *   固定极限：工作台 ≥ 360px、对话流 ≥ 520px；拖拽值 localStorage 持久（ndfeb_v3_panelw），
 *   视口变化按新宽度重新夹逼；未拖过时仍等宽（1fr/1fr）。版本号全站统一 v3.28。
 *
 * v3.27（黄总 2026-11-16）：对话流收敛——① 会话只有首轮展示 plan 过程卡与逐步执行，
 *   后续追问直接流式回答（留痕照写、产物 tab 照常更新）；② 对话流移除全部产物跳转卡
 *   （「候选配方组 / 工艺参数包 / 检索命中」等），详情到工作台各 tab / 科研对象查看；
 *   固化三条演示会话同步折叠（首轮保留 plan，其余轮次 task 挂到 answer）。版本号全站统一 v3.27。
 *
 * v3.25（黄总 2026-11-16）：科研对象仿真任务卡新增「结果图表」区——mumax3 退磁曲线落图：
 *   sim 曲线从输出产物 table.txt 内容实时解析（与下载文件同源），叠加实测曲线
 *   （RPT-20261110-01 采样，虚线）；canvas 自适应宽度 + DPR 高清，零线加粗、
 *   Hcj 过零点插值标注（仿真 ≈4.5 T vs 实测 1.42 T）；隐藏 tab 首次跳过、切入重绘。
 *   配套修正 table.txt mock 数据（mz 原来不过零、画不出矫顽力，改为 −4.4 T 附近雪崩反转）。
 *   （与并行会话并发推进，全站版本号最终统一 v3.26。）
 *
 * v3.23（黄总 2026-11-16）：科研对象仿真任务卡去冗余 + 产物文件化——
 *   撤掉逐行「仿真 simulated」徽标与重复来源行（口径由 tab 分区统一承载；TC 号并入任务信息行）；
 *   输出产物从纯文字升级为文件清单（图标 + 文件名 + 大小 + 下载图标，整行点击 Blob 下载，
 *   mock 补产物内容：OUTCAR/CONTCAR/vasprun.xml/table.txt/ovf ×3）；运行命令行撤重复提示。
 *   （与并行会话并发推进，全站版本号最终统一 v3.24。）
 *
 * v3.21（黄总 2026-11-16）：仿真任务卡改左右分栏——左栏结论/输入参数/输出产物/任务信息，
 *   右栏「运行脚本」专区；视口 <1200px 时回落单列上下堆叠。脚本代码体限高提至 380px，
 *   运行命令行允许换行防挤压。版本号全站统一 v3.21。
 *
 * v3.26（黄总 2026-11-16）：工作台 tab 终态——宽度自适应加宽、产物类存在才出现
 *   （检索结果常驻）、不可关闭、不可拖拽（v3.25 的关闭/拖拽能力同日撤回）；
 *   仿真拆 V-REP / Isaac / mumax3 三独立 tab，内容参考科研对象仿真任务卡：
 *   结论 + 输入参数 + 运行脚本专区（hlSimCode 扩 vrep=Lua / isaac=Python），
 *   上下布局；内容源 M.simRuns（mumax3 引科研对象同源）。版本号全站统一 v3.26。
 *
 * v3.20（黄总 2026-11-16）：固化三条演示历史会话（M.demoSessions）——
 *   A「N52 高矫顽力配方全流程」（配方→工艺→V-REP→mumax3→归档，含检索）、
 *   B「Hcj 温度系数与氢破工艺咨询」（纯 RAG）、C「N48 低氧配方仿真预研」
 *   （RAG + 出配方 + Isaac，无实体样品）；loadSessions() 并入侧边栏
 *   （localStorage 同 id 优先，可覆盖演进）；产物 tab 改累积判定——
 *   任一轮产出过配方/工艺即显示，不再只看最后一轮。版本号全站统一 v3.20。
 *
 * v3.19（黄总 2026-11-16）：科研对象「仿真数据」tab 的仿真脚本升级为「运行脚本」
 *   专区——顶栏（文件名 + 引擎 tag + 行数 + 复制脚本按钮，复制走 clipboard API、
 *   file:// 回退 execCommand）/ 行号 + 轻量语法高亮代码体（注释/关键字/数字三色，
 *   限高 320px 滚动）/ 底部集群运行命令行；mumax3 .mx3 与 VASP INCAR 同一模板，
 *   不再折叠于 details。版本号全站统一 v3.19。
 *
 * v3.7（黄总 2026-11-13）：新增一级视图「实验中心」（lab.html）= 高通量
 *   制备产线的数字孪生：产线拓扑（10 工序 × 8 台设备，标在制样品位置）
 *   + 设备台账 + 设备详情（当前在制 / 设备档案）。
 *   只覆盖「制备过程」设备；磁测仪 / 电镜等制备后独立检测环节不进本页
 *   （其数据归宿在科研对象）。数字孪生红线：设备在制状态不单独造数，
 *   从样品 process（state=current/warn 工序）同源反推。
 *   侧边栏固定 tab 变四：科研对象 / 实验中心 / 插件 / 知识库。
 *
 * 传统脚本（非 ES module），依赖 window.MOCK（assets/mock-data.js）。
 * 无 fetch / XHR / 外部请求 / 第三方框架；全部图标为内联 SVG；file:// 双击可运行。
 *
 * v3.5（黄总 2026-11-13）：首页输入区升级为盒式多行输入（盒内工具行 =
 *   样品选择器 / 技能选择器 / 发送按钮，Enter 发送、Shift+Enter 换行；技能默认自动识别，
 *   选定即锁定意图）；空态快捷示例升级为案例卡片（标题 + 简述 + 类别 tag）；
 *   移除全站示例数据口径类说明文字（输入框下方、右栏底部、样品页尾）。
 *
 * v3.12（黄总 2026-11-14）：配方卡降噪——解读 note 撤下（对话流已承载）；评分换成成本
 *   （mock candidates 加 cost）；堆叠条 Fe 余量改实色 slate 蓝灰撑满 100%；性能指标
 *   三等分格 + 竖线分隔、两行高（中文+英文 / 数字+单位）。
 *
 * v3.11（黄总 2026-11-14）：检索条目去卡片化——列表式细分隔线（去边框/背景/圆角）；
 *   撤置信度分数显示（hitItemHTML 不再读 score；mock 字段保留不渲染）。
 *
 * v3.10（黄总 2026-11-13）：「检索结果」条目三行制重构——1行 icon+名称（+口径 chip）、
 *   2行 摘要片段、3行 来源等元信息+相关度（撤下相关度进度条）；命中条可点击跳转
 *   （知识库 → 段落定位 / 档案·报告·电镜 → 科研对象），hover 高亮 + 引导箭头；
 *   追加引用条目同构三行不可点（平台内部登记物）。
 *
 * v3.9（黄总 2026-11-13）：输入盒操作唯一——撤下「清空」按钮，只留「发送」；
 *   会话复位走侧栏「新建对话」；留痕回执卡说明文案同步去「清空」表述。
 * v3.9b（黄总 2026-11-13）：留痕回执卡整体撤下——留痕唯一落点 = 科研对象
 *   证据时间轴，对话流 = 过程卡 → 回答气泡 → 产物卡；完成反馈由 toast 承担。
 *
 * v3.8（黄总 2026-11-13）：工作台「检索」与「依据」合并为「检索结果」——
 *   检索命中即引用出处，同一来源只出现一次；命中带相关度，出处口径 chip 直挂条目。
 *
 * v3.6（黄总 2026-11-13）：对话页布局与留痕落点调整：
 *   - 对话流与工作台等宽（网格 1fr 1fr，原右栏固定 380px）；
 *   - 工作台撤下「留痕」tab，保留 检索 / 配方 / 工艺 / 依据 四 tab；
 *   - 留痕唯一落点 = 所挂科研对象的证据时间轴（v3.9b 起对话内回执卡亦撤下）；
 *
 * v3.4（黄总 2026-11-13，借鉴智链 demo 对话流）：
 *   - 对话流 = 过程卡（正在规划 → 已规划 N 步 → 执行流程 → 已完成；chip 级
 *     工具/检索调用逐个冒出 loading→done，完成步骤折叠为一行摘要；skill 徽标挂卡头）
 *     → 回答气泡（自然语言文本，流式渲染，可内嵌对比条/标尺）→ 产物卡（v3.9b 起无留痕回执卡）。
 *   - 右栏工作台 = 非回答流程的产物与资料（v3.8 起三 tab：检索结果 / 配方组 / 工艺包）；
 *     产物卡点击切对应 tab，执行完成自动切主产物 tab。
 *   - 候选配方升级为组（v4a/v4b/v4c），工艺参数升级为包组（P-N52-A/B）。
 *   - 口径红线不变：measured 为真值唯一来源，simulated 不作真值，predicted 须实测验证。
 *
 * v3.2/v3.3：三栏工作台（右栏常驻），面板 header 移除、tab 化。
 * v3.1：确认卡片移除，plan 自动执行流。
 *
 * v3.0（D-38）全局职责：
 *   - 整页对话是主入口：空态 = 居中大输入框主导（唯一入口 + 4 个快捷示例）；会话态 = 会话流 +
 *     底部输入条；对话不是侧栏、不是底 Dock，而是页面本身。
 *   - 唯一左侧边栏（借鉴智链 demo 组织形式）：品牌 + 新建对话 + 固定 tab（科研对象 /
 *     插件 / 知识库）+ 历史会话 + 账户区沉底（研究员）；无顶栏。对话是基底不占导航位——
 *     「对话主页」tab 已删（黄总裁决：回对话靠品牌 / 新建对话 / 历史会话三条路径）。
 *     LLM 接入不上界面（软件层指定，用户无感）。「当前样品」下拉已删（黄总裁决：
 *     样品上下文由「总览预览页 → 详情页」选择驱动（v3.13 台账侧栏已删），句中显式 SMP-xxx 优先，否则回退默认样品）。
 *   - IntentProvider(text + ctx)：本地规则桩，输出 intent / slots / plan[] /
 *     skill_id / tools[] / needs_confirm；auto_execute 恒 false；零网络请求。
 *   - 科研对象（v3.9）：样品数据（前置输入：配方 + 制备流程）/ 实验数据（后置实测：电镜结构 +
 *     性能 + 本征）/ 仿真数据（VASP + mumax3，simulated 不作真值）/ 留痕时间轴；三口径分列。
 * ========================================================================== */
(function () {
  'use strict';

  var M = window.MOCK;

  var LS = {
    sessions: 'ndfeb_v3_sessions',   /* 会话列表 [{id,title,msgs,ts}] */
    cur: 'ndfeb_v3_cur',             /* 当前会话 id */
    evidence: 'ndfeb_v3_evidence',   /* 运行时 Tool 留痕（叠加在 M.evidence 之上） */
    kbMine: 'ndfeb_v3_kb_mine',      /* 运行时上传的个人文档（叠加在 M.kb.mine 之上） */
    labQueue: 'ndfeb_v3_lab_queue',  /* 实验中心：发起制备任务登记的排队队列（叠加显示） */
    samples: 'ndfeb_v3_samples',     /* 运行时新建的样品（boot 时一次性并入 M.samples） */
    renames: 'ndfeb_v3_renames',     /* 样品重命名表 {sample_id: 新名称}（v3.17） */
    tombs: 'ndfeb_v3_tombs',         /* 被隐藏的内置样品 ID（v3.22 软删除，清浏览器数据可恢复） */
    smpData: 'ndfeb_v3_smp_data',    /* 手动上传的实验数据 {sample_id: {em, performance[], intrinsic[]}}（v3.42，boot 合并进样品） */
    panelW: 'ndfeb_v3_panelw',       /* 工作台宽度（v3.28 拖拽分隔条，px） */
    simEvents: 'ndfeb_v3_sim_events' /* 仿真事件流 append-only（运行时归档的事件，叠加在 M.simEvents 之上） */
  };

  /* ==========================================================================
   * 0. 基础工具
   * ======================================================================== */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function q(k, d) {
    try {
      var v = new URLSearchParams(window.location.search).get(k);
      return (v === null || v === '') ? (d || '') : v;
    } catch (e) { return d || ''; }
  }
  function lsJson(k) {
    try { var v = JSON.parse(window.localStorage.getItem(k) || 'null'); return v; } catch (e) { return null; }
  }
  function lsSet(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 增强态，禁用即退化 */ } }
  function lsGet(k) { try { return window.localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function tag(cls, text) { return '<span class="tag t-' + cls + '">' + esc(text) + '</span>'; }

  /* 内联 SVG 图标（stroke 风格，currentColor） */
  var ICONS = {
    brand: '<circle cx="12" cy="12" r="3.2"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(-30 12 12)"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chat: '<path d="M21 12a8 8 0 0 1-8 8H4l2-3.2A8 8 0 1 1 21 12z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
    send: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
    close: '<path d="M18 6L6 18M6 6l12 12"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    warn: '<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17.5v.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    edit: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h4.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5-9 9"/>',
    loop: '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    beaker: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    upload: '<path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 20h16"/>',
    dl: '<path d="M12 4v12M6 10l6 6 6-6"/><path d="M4 20h16"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    /* 实验中心·环节卡设备小图标（v3.7-r5，与设备图示 SVG 呼应的 16px 版） */
    'eq-scale': '<path d="M12 4v13M9 20h6"/><path d="M5 7h14"/><path d="M7 7l-2 5a2.5 2.5 0 0 0 5 0L8 7zM17 7l-2 5a2.5 2.5 0 0 0 5 0l-2-5z"/>',
    'eq-furnace-v': '<rect x="8" y="3" width="8" height="15" rx="2"/><path d="M10 7q2 2 4 0M10 10.5q2 2 4 0"/><path d="M10 18v3M14 18v3"/>',
    'eq-roller': '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 6V3M18 12h3"/>',
    'eq-tank': '<rect x="3" y="8" width="18" height="9" rx="4.5"/><circle cx="8" cy="12.5" r="2.5"/>',
    'eq-mill': '<path d="M8 21l2-11h4l2 13z"/><circle cx="12" cy="5" r="2"/><path d="M16 9h4"/>',
    'eq-press': '<path d="M5 3v18M19 3v18M5 3h14M5 21h14"/><rect x="9" y="7" width="6" height="4" rx="1"/><path d="M12 11v4"/><rect x="8" y="15" width="8" height="3" rx="1"/>',
    'eq-furnace-h': '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="7" cy="12" r="2.5"/><path d="M12 10h7M12 14h7"/>',
    'eq-furnace-h2': '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="7" cy="12" r="2.5"/><path d="M12 10h7M12 14h7"/><line x1="15.5" y1="7" x2="15.5" y2="17"/>'
  };
  function icon(id, size) {
    var s = size || 14;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor"'
      + ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
      + (ICONS[id] || ICONS.box) + '</svg>';
  }

  function toast(text) {
    var t = $('toast');
    if (!t) { return; }
    t.textContent = text;
    t.className = 'toast show';
    window.clearTimeout(UI.toastTimer);
    UI.toastTimer = window.setTimeout(function () { t.className = 'toast'; }, 2600);
  }

  function legacyCopy(text) {
    /* file:// 下 navigator.clipboard 可能不可用，回退 textarea + execCommand */
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* 忽略，toast 已提示 */ }
    document.body.removeChild(ta);
  }

  /* 文件大小格式化：按 UTF-8 字节数算（产物文件清单用） */
  function fmtSize(text) {
    var b = unescape(encodeURIComponent(text)).length;
    return b < 1024 ? b + ' B' : (b / 1024).toFixed(1) + ' KB';
  }

  function closestEl(el, sel) {
    while (el && el.nodeType === 1) {
      if (el.matches && el.matches(sel)) { return el; }
      el = el.parentElement;
    }
    return null;
  }

  /* ==========================================================================
   * 1. 上下文契约 ctx：样品是唯一沉淀锚点，自动带入，用户不必重复报 ID
   * ======================================================================== */
  function findSample(id) {
    for (var i = 0; i < M.samples.length; i++) { if (M.samples[i].sample_id === id) { return M.samples[i]; } }
    return null;
  }
  /* v3.17 样品显示名 = 重命名表覆盖原名（用户视角标注，不改底层数据） */
  function smpTitle(s) { return (UI.renames && UI.renames[s.sample_id]) || s.title; }
  /* v3.37 防重入：重渲染会移除输入框并触发 blur/change，若不先解除 data-action，
     会二次进入 save → initSample 竞态报 innerHTML 错。调用前先摘掉标记。 */
  function disarmRenameInput(inp) {
    if (inp && inp.setAttribute) { inp.setAttribute('data-action', 'rename-done'); }
  }
  function saveRename(id, val, inp) {
    disarmRenameInput(inp);
    var v = String(val || '').trim();
    if (!UI.renames) { UI.renames = {}; }
    if (v) { UI.renames[id] = v; } else { delete UI.renames[id]; }
    lsSet(LS.renames, UI.renames);
    toast(v ? '已重命名为「' + v + '」' : '已恢复原始名称');
    initSample();
  }
  function currentSample() {
    /* 输入盒样品选择器（UI.sampleSel）优先；其次 ?sample_id=；回退默认样品 */
    var sid = UI.sampleSel || q('sample_id', '') || M.samples[0].sample_id;
    return findSample(sid) || M.samples[0];
  }
  function ctx(page) {
    var smp = currentSample();
    return {
      sample_id: smp.sample_id, form_id: smp.form_id, role: '研究员'
    };
  }
  function url(page, params) {
    var p = {};
    for (var k in (params || {})) { p[k] = params[k]; }
    /* v3.11：显式传 sample_id:'' 表示「无参链接」（样品总览预览页）；
       不传（undefined）才回退自动补当前样品 */
    if (p.sample_id === undefined) { p.sample_id = currentSample().sample_id; }
    var ks = [];
    for (var k2 in p) { if (p[k2] !== '' && p[k2] != null) { ks.push(encodeURIComponent(k2) + '=' + encodeURIComponent(p[k2])); } }
    return page + (ks.length ? '?' + ks.join('&') : '');
  }

  /* ==========================================================================
   * 2. IntentProvider(text + ctx)：本地规则桩；可替换为垂模，接口不变
   * ======================================================================== */
  /* v3.4：plan 升级为对象数组——title 步骤名 / summary 完成摘要 / chips 原子动作（工具·检索调用，
   * 逐个冒出 loading→done）；answer 为回答文本（**加粗** 与 \n 换行，流式渲染）。
   * 对话流 = 过程卡 + 回答气泡 + 产物卡；可视化产物组进右栏工作台。 */
  var INTENTS = [
    { key: 'formula_gen', name: '配方生成与筛选', skill_id: 'SK-01', tools: ['T-01', 'T-02'], needs_confirm: true,
      kw: { '配方': 3, '新配方': 3, '优化': 1, '配比': 2, '成分': 1 },
      plan: [
        { title: '解析目标性能与约束', summary: '已解析：牌号 N52 · 目标 Hcj ≥ 15 kOe', chips: [] },
        { title: '检索知识库与历史样品', summary: '命中 3 条：成分区间 / 重稀土减量化 / SMP-001 实测', chips: [{ label: '知识库检索 · 命中 3 条', icon: 'search' }] },
        { title: '配方优化 ML 模型生成候选', summary: '已生成 3 个候选：F-N52-v4a / v4b / v4c', chips: [{ label: '配方优化 ML 模型 · 输出 3 候选（预测）', icon: 'cpu' }] },
        { title: '第一性原理相稳定性筛选', summary: 'v4a 形成焓 −0.42 eV/atom 最优，Dy 优先占位晶界相', chips: [{ label: 'VASP DFT · 形成焓对比（仿真）', icon: 'flask' }] }
      ],
      answer: '已完成 N52 候选配方筛选。**F-N52-v4a** 综合评分 0.86 居首：Dy 降至 1.6 wt% 并优先占位晶界相，形成焓最优；预测 Hcj **15.3 kOe**（目标 ≥ 15，当前实测 14.2）。\n3 个候选与逐项对比已汇入右侧「配方」；检索命中与引用出处见「检索结果」。以上为预测口径，须小批试制 + 实测验证。' },
    { key: 'process_opt', name: '工艺参数优化', skill_id: 'SK-02', tools: ['T-03'], needs_confirm: true,
      kw: { '工艺参数': 3, '工艺': 2, '烧结': 2, '回火': 2, '参数': 1 },
      plan: [
        { title: '读取样品配方与目标性能', summary: '已读取 F-N52-v3 配方与目标 Hcj ≥ 15 kOe', chips: [] },
        { title: '工艺优化 ML 模型生成工艺包', summary: '已产出 3 组工艺包：P-N52-A / B / C', chips: [{ label: '工艺优化 ML 模型 · 3 组参数包（预测）', icon: 'cpu' }] },
        { title: '标注预测口径与待验证项', summary: 'A 包 Hcj 取向最优；B 包温度窗口更保守；C 包适配 Br 取向', chips: [] }
      ],
      answer: '已产出 **3 组工艺参数包**（混料智能体按配方在工艺配方库中匹配）：**P-N52-A**（烧结 1060℃ × 4h + 520℃ 退火）评分 0.84，推荐；P-N52-B 温度窗口更保守、氧含量容忍度更高；P-N52-C 适配 Br 取向配组。\n总重、各仓重量、混料次数、成型尺寸、微升距离、充磁/退磁电流等明细已汇入右侧「工艺」。预测口径，须小批试制 + 实测验证。' },
    { key: 'perf_analysis', name: '性能检测分析', skill_id: 'SK-03', tools: ['T-04'], needs_confirm: false,
      kw: { '检测': 3, '磁性能': 3, '性能': 2, 'hcj': 2, '偏低': 2, 'br': 1, '数据': 1 },
      plan: [
        { title: '定位样品检测报告', summary: '已定位检测报告 RPT-20261110-01', chips: [{ label: '检测报告定位 · RPT-20261110-01', icon: 'search' }] },
        { title: '结构化性能参数', summary: 'Br 14.2 kGs · Hcj 14.2 kOe · (BH)max 50.1 MGOe（实测）', chips: [{ label: '检测数据结构化 · 3 项指标（实测）', icon: 'file' }] },
        { title: '对照目标判读', summary: 'Hcj 缺口 0.8 kOe，Br / (BH)max 均低于目标', chips: [] }
      ],
      answer: '检测数据已结构化（实测口径）：Br **14.2 kGs**、Hcj **14.2 kOe**、(BH)max **50.1 MGOe**。\nHcj 距目标 15 kOe 缺口 0.8，三项均低于目标值；建议结合电镜结构数据与回火工艺复核，可走仿真校验辅助定位。' },
    { key: 'image_analysis', name: '电镜图像分析', skill_id: 'SK-04', tools: ['T-05'], needs_confirm: false,
      kw: { '电镜': 3, 'sem': 2, 'tem': 2, '晶粒': 2, '晶界': 2, '图像': 2, '照片': 2, '结构': 1 },
      plan: [
        { title: '定位样品电镜图像', summary: '已定位电镜 SEM-20261111-02', chips: [{ label: '电镜图像定位 · SEM-20261111-02', icon: 'search' }] },
        { title: '分析晶粒尺寸 / 晶界相 / 缺陷', summary: '晶粒 5.6 μm · 晶界相连续 · 孔洞 < 0.3%', chips: [{ label: '电镜图像分析 · 结构数据 3 项（实测）', icon: 'image' }] },
        { title: '输出结构化结构数据', summary: '结构数据已挂到科研对象', chips: [] }
      ],
      answer: '电镜分析完成（实测口径）：平均晶粒尺寸 **5.6 μm**，富 Nd 相沿晶界连续分布，孔洞 **< 0.3%**、无异常大晶粒。\n结构与性能表现一致，非 Hcj 缺口主因；建议下一步复核回火工艺。' },
    /* v3.34（黄总 2026-11-17）：仿真只保留 VASP + mumax3 两路真实计算产物——
     * 原 V-REP / Isaac 为凭空编的场景校验（无档案数据源），整条链路移除。 */
    { key: 'sim_vasp', name: 'VASP 第一性原理计算', skill_id: 'SK-05', tools: ['T-02'], needs_confirm: true,
      kw: { 'vasp': 5, '第一性原理': 5, 'dft': 4, '形成焓': 4, '相稳定性': 4 },
      plan: [
        { title: '读取配方成分作为计算输入', summary: '已读取当前配方成分', chips: [] },
        { title: 'VASP 第一性原理计算（只读登记）', summary: '相形成焓 / 元素占位倾向已登记', chips: [{ label: 'VASP DFT · 相稳定性分析', icon: 'flask' }] },
        { title: '输出辅助判断说明', summary: '计算说明已登记留痕', chips: [] }
      ],
      answer: 'VASP 第一性原理计算完成（仿真口径）：主相形成焓与元素占位倾向已登记，可辅助判断配方稳定性。\n仿真仅作辅助判断，不作为真值；数值结论仍以检测实测为准。' },
    { key: 'sim_mumax', name: 'mumax3 微磁学仿真', skill_id: 'SK-08', tools: ['T-09'], needs_confirm: true,
      kw: { 'mumax': 5, '畴结构': 3, '微磁': 3, '矫顽力机制': 3 },
      plan: [
        { title: '组装微磁学仿真场景', summary: '场景已按输入组装', chips: [] },
        { title: 'mumax3 仿真（只读登记）', summary: '畴结构 / 矫顽力机制分析完成', chips: [{ label: 'mumax3 · 畴结构分析（仿真）', icon: 'cpu' }] },
        { title: '输出机制分析说明', summary: '机制分析已登记留痕', chips: [] }
      ],
      answer: 'mumax3 微磁学仿真完成（仿真口径）：畴壁钉扎与反磁化形核机制分析已登记，可用于解释矫顽力来源。\n仿真产物不作为真值；数值结论仍以实测为准。' },
    { key: 'archive', name: '样品归档', skill_id: 'SK-07', tools: ['T-08'], needs_confirm: true,
      kw: { '归档': 3, '沉淀': 2, '闭环': 2 },
      plan: [
        { title: '汇总本次结论与留痕', summary: '结论与留痕已汇总', chips: [] },
        { title: '挂到科研对象', summary: '已挂到 SMP-001 证据时间轴', chips: [{ label: '证据留痕登记 · 挂样品（实测）', icon: 'file' }] },
        { title: '进入数据闭环', summary: '样本回流垂类模型（平台内部机制）', chips: [] }
      ],
      answer: '本次结论与留痕已归档到样品 **SMP-001**，证据时间轴与数据闭环进度已更新；样本将回流垂类模型，无需人工干预。' },
    { key: 'kb_query', name: '知识检索问答', skill_id: 'SK-09', tools: ['T-10'], needs_confirm: false,
      kw: { '温度系数': 5, '标准': 3, '手册': 3, '论文': 3, '文献': 3, '综述': 3, '资料': 2,
        '是多少': 2, '是什么': 2, '规定': 2, '氢破': 2, '引用': 2, '查了': 1, '检索': 2 },
      plan: [
        { title: '解析问题关键词', summary: '关键词已解析', chips: [] },
        { title: 'RAG 检索知识库', summary: '平台数据集 + 我的文档，命中 3 条', chips: [{ label: 'RAG 检索 · 命中 3 条', icon: 'search' }] },
        { title: '整理答案并附原文引用', summary: '答案已附引用，可回溯到段落', chips: [] }
      ],
      answer: '已在知识库检索到相关内容（示例口径）：N52 牌号 Hcj 高温衰减与 Dy 含量、晶界相连续性直接相关。\n命中与引用出处统一见右侧「检索结果」，可回溯到原文段落。' },
    { key: 'sample_query', name: '样品查询', skill_id: null, tools: [], needs_confirm: false,
      kw: { '详情': 2, '档案': 2, '样品': 1 },
      plan: [
        { title: '定位科研对象', summary: '已定位科研对象', chips: [] },
        { title: '导览到详情页', summary: '样品台账与详情已就绪', chips: [] }
      ],
      answer: '样品 **SMP-001**（N52 装炉位置验证样）：当前阶段「检测完成 · 待归档」；配方 F-N52-v3，性能与结构数据均已结构化。\n完整台账、工艺过程与证据时间轴见科研对象页。' }
  ];

  function emptyIntent(text) {
    return { key: 'unknown', name: '未识别', intent: 'unknown', slots: {}, plan: [], skill_id: null,
      tools: [], needs_confirm: false, evidence_refs: [], auto_execute: false, raw: text };
  }

  function IntentProvider(text, c) {
    var raw = String(text || '').trim();
    var low = raw.toLowerCase();
    var best = null, bestScore = 0;
    INTENTS.forEach(function (it) {
      var score = 0;
      for (var k in it.kw) {
        if (low.indexOf(k.toLowerCase()) >= 0) { score += it.kw[k]; }
      }
      if (score > bestScore) { bestScore = score; best = it; }
    });
    if (!best) { return emptyIntent(raw); }
    return buildTask(best, raw, c);
  }

  /* 由意图定义构造任务：槽位解析集中于此（显式 SMP-xxx 优先于上下文样品；目标性能 / 牌号从句子里解析） */
  function buildTask(it, raw, c) {
    var slots = {};
    var mSmp = raw.match(/SMP-\d{3}/i);
    slots.sample_id = mSmp ? mSmp[0].toUpperCase() : c.sample_id;
    var mG = raw.match(/N\d{2}/);
    if (mG) { slots.grade = mG[0]; }
    var mT = raw.match(/Hcj\s*[≥>]\s*\d+/i);
    if (mT) { slots.target = mT[0].replace(/\s+/g, '') + ' kOe'; }
    return {
      key: it.key, name: it.name, intent: it.key, slots: slots,
      plan: it.plan.slice(), skill_id: it.skill_id, tools: it.tools.slice(),
      needs_confirm: it.needs_confirm, evidence_refs: [],
      auto_execute: false, raw: raw, answer: it.answer || ''
    };
  }

  /* 输入盒挂载的技能锁定对应意图；工具 / SCP 作为附加上下文写入槽位（do 什么 + 用什么做） */
  function matchIntent(text) {
    var c = ctx(UI.page);
    var raw = String(text || '').trim();
    var task = null;
    if (UI.skillSel) {
      for (var i = 0; i < INTENTS.length; i++) {
        if (INTENTS[i].skill_id === UI.skillSel) { task = buildTask(INTENTS[i], raw, c); break; }
      }
    }
    if (!task) { task = IntentProvider(raw, c); }
    if (task.slots) {
      if (UI.mountTool) { task.slots.tool_id = UI.mountTool; }
      if (UI.mountScp) { task.slots.scp_id = UI.mountScp; }
    }
    return task;
  }

  /* ==========================================================================
   * 2.5 知识库检索（D-42）：本地关键词桩；平台数据集（locked）+ 我的文档一并入检
   * ======================================================================== */
  /* 我的文档 = 演示初始（M.kb.mine）+ 运行时上传（LS.kbMine）；内置数据集不可动 */
  function kbMineDocs() { return M.kb.mine.concat(lsJson(LS.kbMine) || []); }
  function kbAllDocs() { return M.kb.builtin.docs.concat(kbMineDocs()); }
  function kbDocById(id) {
    var all = kbAllDocs();
    for (var i = 0; i < all.length; i++) { if (all[i].doc_id === id) { return all[i]; } }
    return null;
  }

  /* 关键词抽取：英文/数字/符号词（≥2 字符）+ 中文连续段（2–4 字滑窗），去停用词 */
  function kbTerms(query) {
    var low = String(query || '').toLowerCase();
    var stop = ['的', '是', '吗', '呢', '吧', '啊', '了', '和', '与', '在', '对', '按', '把', '被',
      '什么', '多少', '一下', '这个', '那个', '我们', '你们', '请', '请问', '有没有', '怎么', '怎样', '如何'];
    var terms = [];
    var re = /[a-z][a-z0-9\.\-%]*/g, m;
    while ((m = re.exec(low))) { if (m[0].length >= 2) { terms.push(m[0]); } }
    low.split(/[^一-龥]+/).forEach(function (seg) {
      if (!/^[一-龥]{2,}$/.test(seg)) { return; }
      if (seg.length <= 4) { terms.push(seg); return; }
      for (var L = 4; L >= 2; L--) {
        for (var i = 0; i + L <= seg.length; i++) { terms.push(seg.substr(i, L)); }
      }
    });
    return terms.filter(function (t) { return stop.indexOf(t) < 0; });
  }

  /* 检索：段落含任一关键词即候选，按命中词数排序；同分平台数据集优先；取 top 3 */
  function kbRetrieve(query) {
    var terms = kbTerms(query);
    if (!terms.length) { return []; }
    var hits = [];
    kbAllDocs().forEach(function (d) {
      d.sections.forEach(function (s) {
        var low = s.text.toLowerCase(), score = 0;
        terms.forEach(function (t) { if (low.indexOf(t.toLowerCase()) >= 0) { score++; } });
        if (score > 0) { hits.push({ doc: d, section: s, score: score, builtin: !(/^KB-U/.test(d.doc_id)) }); }
      });
    });
    hits.sort(function (a, b) {
      return (b.score - a.score) || ((b.builtin ? 1 : 0) - (a.builtin ? 1 : 0));
    });
    return hits.slice(0, 3);
  }

  /* 模拟上传池：静态 Demo 无真实文件解析，点击「上传文档」按序补入一条示例 */
  var KB_UPLOAD_POOL = [
    { title: '试验记录-回火温度对比-20261113.docx', type: '试验记录',
      desc: '两级回火温度对 Hcj 均值影响的对比记录', size: '64 KB',
      sections: [{ sid: 'S1', text: '一级回火 500℃ 组 Hcj 均值 14.0 kOe，520℃ 组 14.2 kOe；温度窗口内差异不显著。' }] },
    { title: '会议纪要-氧含量超标处置-20261112.docx', type: '纪要',
      desc: '气流磨氧含量超标批次的处置与在线监测改造决议', size: '32 KB',
      sections: [{ sid: 'S1', text: '气流磨后氧含量 3200 ppm 超阈值 3000 ppm，本批拦截；后续在气流磨出口加装在线监测点。' }] }
  ];

  /* 意图评测回归：同一个 IntentProvider 跑评测集；误执行率必须为 0 */
  function intentEvalReport() {
    var pass = 0, slotOk = 0, misexec = 0;
    var cases = M.intentEval.map(function (c) {
      var r = IntentProvider(c.text, ctx('index'));
      var ok = r.intent === c.expect;
      if (ok) { pass++; }
      var so = c.expect === 'unknown' ? true : !!r.slots.sample_id;
      if (so) { slotOk++; }
      if (r.intent === 'unknown' && r.auto_execute) { misexec++; }
      return { case_id: c.case_id, text: c.text, expect: c.expect, got: r.intent, pass: ok, slotsOk: so };
    });
    var total = cases.length;
    return {
      cases: cases, pass: pass, total: total,
      accuracy: Math.round(pass / total * 100),
      slotRate: Math.round(slotOk / total * 100),
      misexec: misexec, allPass: pass === total && misexec === 0
    };
  }
  function intentEvalPass() { return intentEvalReport().allPass; }

  function skillById(id) {
    for (var i = 0; i < M.skills.length; i++) { if (M.skills[i].skill_id === id) { return M.skills[i]; } }
    return null;
  }
  function toolById(id) {
    for (var i = 0; i < M.tools.length; i++) { if (M.tools[i].tool_id === id) { return M.tools[i]; } }
    return null;
  }

  /* ==========================================================================
   * 3. 会话管理：多会话（新建 / 历史），localStorage 持久
   * ======================================================================== */
  function loadSessions() {
    /* v3.20：固化演示会话并入历史会话（localStorage 运行时优先；同 id 时 LS 版本覆盖 demo 版） */
    var s = lsJson(LS.sessions);
    var runtime = (s && s.length) ? s : [];
    var demo = M.demoSessions || [];
    var seen = {};
    runtime.forEach(function (x) { seen[x.id] = true; });
    return runtime.concat(demo.filter(function (d) { return !seen[d.id]; }));
  }
  function saveSessions(list) { lsSet(LS.sessions, list.slice(0, 20)); }
  function findSession(id) {
    var ss = loadSessions();
    for (var i = 0; i < ss.length; i++) { if (ss[i].id === id) { return ss[i]; } }
    return null;
  }
  function persistChat() {
    if (!UI.msgs.length) { return; }
    var ss = loadSessions();
    var firstUser = null;
    UI.msgs.forEach(function (m) { if (!firstUser && m.role === 'user') { firstUser = m.text; } });
    var title = firstUser ? firstUser.slice(0, 18) : '新会话';
    var found = null;
    ss.forEach(function (s) { if (s.id === UI.sessionId) { found = s; } });
    if (!found) { found = { id: UI.sessionId, title: title, msgs: [], ts: '' }; ss.unshift(found); }
    found.title = title;
    found.msgs = UI.msgs;
    found.ts = stampNow();
    saveSessions(ss);
    lsSet(LS.cur, UI.sessionId);
  }
  function newChat() {
    UI.sessionId = 'C' + Date.now().toString(36);
    UI.msgs = [];
    UI.pendingConfirm = -1;
    UI.panelTab = '';
    UI._draft = '';
    UI.demoStep = 0;   /* v3.38：新对话从演示第 0 步起（空点发送逐轮吐脚本） */
    UI.confirmCard = null;  /* v3.52：新对话无产物，确认卡清空 */
    UI.fsOpen = false; UI.fsSel = '';  /* v3.70：配方切换控件复位（组按会话重建，默认最新一组） */
    UI.candSel = null;  /* v3.74：候选选用复位（回落 AI 推荐项） */
    /* v3.58：新对话清空挂载上下文（块即上下文，空态无块则状态不残留）；
     * 同时清空输入框 DOM——否则 initIndex 会把旧块当草稿恢复回来 */
    UI.sampleSel = ''; UI.skillSel = ''; UI.mountTool = ''; UI.mountScp = '';
    var ti = $('task-input');
    if (ti) { ti.innerHTML = ''; }
    lsSet(LS.cur, UI.sessionId);
  }

  /* ==========================================================================
   * 4. Tool 留痕（v3.1：执行流自动推进完成后调用；每条挂 sample_id + truth_flag）
   * ======================================================================== */
  function stampNow() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function allEvidence() { return M.evidence.concat(UI.evidence); }
  function runToolsForTask(task) {
    var made = [];
    var base = allEvidence().length + 1;
    task.tools.forEach(function (tid, i) {
      var t = toolById(tid);
      if (!t) { return; }
      var ev = {
        ev_id: 'EV-' + (100 + base + i), ts: stampNow(),
        sample_id: task.slots.sample_id || '',
        skill_id: task.skill_id || '', tool_call_id: 'TC-' + (100 + base + i),
        action: t.name + '（只读登记）',
        input: task.raw.slice(0, 40),
        output: t.desc,
        source: t.kind === 'simulation' ? t.name + '（仿真产物）' : (t.output === 'measured' ? '检测 / 表征数据' : t.name + '（model-v0.1 · 示例）'),
        truth_flag: t.output, actor: '研究员'
      };
      UI.evidence.push(ev);
      made.push(ev);
    });
    lsSet(LS.evidence, UI.evidence);
    return made;
  }

  /* ==========================================================================
   * 5. 全局骨架：唯一左侧边栏（无顶栏；样品切换沉到边栏，对话即页面，无 Dock）
   * ======================================================================== */
  function renderChrome(page) {
    var sessions = loadSessions();
    var sHtml = sessions.length
      ? sessions.map(function (s) {
          return '<a href="' + esc(url('index.html', { c: s.id })) + '" class="sess-item'
            + (s.id === UI.sessionId ? ' active' : '') + '" title="' + esc(s.title) + '">'
            + icon('chat', 12) + '<span class="sess-t">' + esc(s.title) + '</span></a>';
        }).join('')
      : '<div class="sess-empty">暂无历史会话</div>';
    var html = '<aside class="sidebar" aria-label="全站唯一主导航">'
      + '<a class="sb-brand" href="' + esc(url('index.html', {})) + '" data-action="go-home">' + icon('brand', 16)
      + '<span>稀土材料科学平台</span></a>'
      + '<button type="button" class="btn sb-new" data-action="new-chat">' + icon('plus', 13) + ' 新建对话</button>'
      + '<nav class="sb-nav" aria-label="一级导航">'
      + '<a href="' + esc(url('sample.html', { sample_id: '' })) + '"' + (page === 'sample' ? ' class="active" aria-current="page"' : '') + '>'
      + icon('flask', 14) + ' 科研对象</a>'
      + '<a href="' + esc(url('lab.html', { task: '' })) + '"' + (page === 'lab' ? ' class="active" aria-current="page"' : '') + '>'
      + icon('beaker', 14) + ' 实验中心</a>'
      + '<a href="' + esc(url('skills.html', {})) + '"' + (page === 'skills' ? ' class="active" aria-current="page"' : '') + '>'
      + icon('cpu', 14) + ' 科学工具</a>'
      + '<a href="' + esc(url('kb.html', {})) + '"' + (page === 'kb' ? ' class="active" aria-current="page"' : '') + '>'
      + icon('book', 14) + ' 知识库</a>'
      + '</nav>'
      + '<div class="sb-sec">历史会话</div>'
      + '<div class="sess-list">' + sHtml + '</div>'
      + '<div class="sb-foot">'
      + '<div class="sb-account">'
      + '<span class="sb-avatar" aria-hidden="true">' + esc(M.account.initial) + '</span>'
      + '<span class="sb-acc-name">' + esc(M.account.name) + '</span>'
      + '</div>'
      + '<div class="sb-ver">静态演示 Demo v3.78</div>'
      + '</div></aside>';
    var chrome = $('app-chrome');
    if (chrome) { chrome.innerHTML = html; }
  }

  /* ==========================================================================
   * 6. 对话主页（整页对话）：空态 = 居中大输入框主导（唯一入口）；会话态 = 会话流 + 底部输入条
   * ======================================================================== */
  /* 输入盒两态复用：is-hero 空态居中放大；is-dock 会话态吸底。
   * v3.45（黄总 2026-11-17）：左侧两个 select 合并为「+」挂载菜单——
   *   一级 = 技能 Skill / 工具 Tool / SCP / 科研对象（顺序对齐插件页 tab + 科研对象），
   *   二级 = 该类下具体条目；选中后以 chip 挂在输入盒，发送时带入对话上下文。
   *   发送按钮保持原位不动。 */
  var ATTACH_CATS = [
    { key: 'skill',  name: '技能 Skill', icon: 'cpu',    desc: 'Agent 编排的可调用能力' },
    { key: 'tool',   name: '工具 Tool',  icon: 'flask',  desc: '只读登记的工程工具' },
    { key: 'scp',    name: 'SCP',        icon: 'layers', desc: '协议 / 服务接入登记' },
    { key: 'sample', name: '科研对象',   icon: 'box',    desc: '样品台账 · 对话沉淀锚点' }
  ];
  function attachCat(key) {
    for (var i = 0; i < ATTACH_CATS.length; i++) { if (ATTACH_CATS[i].key === key) { return ATTACH_CATS[i]; } }
    return null;
  }
  function scpById(id) {
    for (var i = 0; i < M.scps.length; i++) { if (M.scps[i].scp_id === id) { return M.scps[i]; } }
    return null;
  }
  /* v3.52：工具行 chips 已撤下（黄总指令）——挂载上下文由输入框内原子块承载（块即上下文，
   * 块被整块删除时 syncMountsFromBlocks 同步清状态）。 */
  /* 辅助文本：不可点击的样式固定辅导内容，放在发送按钮旁；@ / / 输入触发仍生效（见 onInput） */
  function attachHintsHTML() {
    return '<span class="at-hints" aria-hidden="true">'
      + '<span class="at-hint"><b>@</b> 指定科研对象</span>'
      + '<span class="at-hint-sep">·</span>'
      + '<span class="at-hint"><b>/</b> 唤起技能</span>'
      + '</span>';
  }
  /* 菜单分两张并列浮层：一级 = 四类（仅名称）；二级 = 该类条目（仅名称 + 选中勾），
   * 由 renderAttachMenu 按需增删，一级常驻、二级额外弹出（不是切换内容）。 */
  /* v3.45：一级前三项（技能/工具/SCP = 科学工具）与第四项「科研对象」之间插分组间隔带 */
  function attachPrimaryHTML() {
    var st = UI.attachMenu;
    return '<div class="at-list">' + ATTACH_CATS.map(function (x, i) {
      var item = '<button type="button" class="at-item' + (st.level === 2 && st.cat === x.key ? ' is-on' : '') + '"'
        + ' data-action="attach-cat" data-cat="' + x.key + '" role="menuitem">'
        + '<span class="at-i-ico">' + icon(x.icon, 14) + '</span>'
        + '<span class="at-i-name">' + esc(x.name) + '</span>'
        + '<span class="at-i-go">' + icon('arrow', 13) + '</span></button>';
      return item + (i === 2 ? '<div class="at-gap-line" aria-hidden="true"></div>' : '');
    }).join('') + '</div>';
  }
  function attachSecondaryHTML() {
    var st = UI.attachMenu, rows = [];
    if (st.cat === 'skill') {
      rows = M.skills.map(function (x) { return { id: x.skill_id, name: x.name }; });
    } else if (st.cat === 'tool') {
      rows = M.tools.map(function (x) { return { id: x.tool_id, name: x.name }; });
    } else if (st.cat === 'scp') {
      rows = M.scps.map(function (x) { return { id: x.scp_id, name: x.name }; });
    } else if (st.cat === 'sample') {
      rows = M.samples.map(function (x) { return { id: x.sample_id, name: smpTitle(x) }; });
    }
    var cur = st.cat === 'sample' ? UI.sampleSel : st.cat === 'skill' ? UI.skillSel
      : st.cat === 'tool' ? UI.mountTool : UI.mountScp;
    return '<div class="at-list">' + rows.map(function (r) {
      return '<button type="button" class="at-opt' + (r.id === cur ? ' is-on' : '') + '"'
        + ' data-action="attach-pick" data-cat="' + st.cat + '" data-id="' + esc(r.id) + '" role="menuitem">'
        + '<span class="at-o-name">' + esc(r.name) + '</span>'
        + (r.id === cur ? '<span class="at-o-ok">' + icon('check', 12) + '</span>' : '')
        + '</button>';
    }).join('') + '</div>';
  }
  /* 菜单只做局部 DOM 增删，不重绘 composer —— 执行动画期间也不打断输入草稿。
   * 两种呈现路径（v3.52）：加号点击 → wrap 内一级+二级并列菜单；
   * 输入框键入 @ / /（UI.attachHintAt >= 0）→ 跟随光标的 .attach-caret 卡片（仅二级条目）。
   * v3.52：输入框改 contenteditable，挂载项为 contenteditable=false 原子块（整体、一删全删）；
   * 工具行不再出现挂载 chips，块即上下文。 */
  /* 输入框纯文本（原子块文本并入；nbsp 归一为空格） */
  function inputText(el) {
    return el ? String(el.innerText || '').replace(/ /g, ' ') : '';
  }
  /* 光标在纯文本中的偏移（Range 克隆法） */
  function caretOffset(el) {
    var sel = window.getSelection();
    if (!sel.rangeCount) { return -1; }
    var r = sel.getRangeAt(0);
    if (!el.contains(r.startContainer)) { return -1; }
    var pre = r.cloneRange();
    pre.selectNodeContents(el);
    pre.setEnd(r.startContainer, r.startOffset);
    return pre.toString().length;
  }
  /* 按纯文本偏移定位 text node（TreeWalker 遍历） */
  function locateTextPos(el, offset) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var node, acc = 0;
    while ((node = walker.nextNode())) {
      var len = node.nodeValue.length;
      if (acc + len >= offset) { return { node: node, offset: offset - acc }; }
      acc += len;
    }
    return null;
  }
  /* 光标移到元素内容末尾 */
  function caretToEnd(el) {
    el.focus();
    var r = document.createRange();
    r.selectNodeContents(el); r.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(r);
  }
  /* 在 charPos（纯文本偏移）处插入原子块；trigAt >= 0 时先删该处触发符。
   * 块后补 nbsp 承接光标；块前字符非空白时补空格分隔。 */
  function insertMentionBlock(ti, cat, id, text, trigAt) {
    var block = document.createElement('span');
    block.className = 'mention-block';
    block.contentEditable = 'false';
    block.setAttribute('data-cat', cat);
    block.setAttribute('data-id', id);
    block.textContent = text;
    if (trigAt >= 0) {
      var loc0 = locateTextPos(ti, trigAt);
      if (loc0) { loc0.node.deleteData(loc0.offset, 1); }
    }
    var pos = trigAt >= 0 ? trigAt : caretOffset(ti);
    if (pos < 0) { pos = inputText(ti).length; }
    var loc = locateTextPos(ti, pos);
    if (!loc) {
      ti.appendChild(block);
    } else {
      var needSpace = loc.offset > 0 && !/\s/.test(loc.node.nodeValue.charAt(loc.offset - 1));
      var after = loc.node.splitText(loc.offset);
      var parent = loc.node.parentNode;
      /* 先空格后块，都插到 after 前（refNode 必须是 parent 的子节点） */
      if (needSpace) { parent.insertBefore(document.createTextNode(' '), after); }
      parent.insertBefore(block, after);
    }
    var sp = document.createTextNode(' ');
    block.parentNode.insertBefore(sp, block.nextSibling);
    var r = document.createRange();
    r.setStartAfter(sp); r.collapse(true);
    var sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(r);
    ti.focus();
  }
  /* 输入框里的块被整块删除时，同步清对应挂载状态（块即上下文） */
  function syncMountsFromBlocks(ta) {
    var blocks = ta.querySelectorAll('.mention-block');
    var has = {};
    for (var i = 0; i < blocks.length; i++) { has[blocks[i].getAttribute('data-cat')] = true; }
    if (UI.sampleSel && !has.sample) { UI.sampleSel = ''; }
    if (UI.skillSel && !has.skill) { UI.skillSel = ''; }
    if (UI.mountTool && !has.tool) { UI.mountTool = ''; }
    if (UI.mountScp && !has.scp) { UI.mountScp = ''; }
  }
  function renderAttachMenu() {
    var wrap = document.querySelector('.attach-wrap');
    var host = document.querySelector('.cmdbox');
    var menu = wrap ? wrap.querySelector('.attach-menu') : null;
    var sub = wrap ? wrap.querySelector('.attach-submenu') : null;
    var btn = wrap ? wrap.querySelector('.attach-btn') : null;
    var caret = host ? host.querySelector('.attach-caret') : null;
    if (!UI.attachMenu.open) {
      if (menu) { menu.parentNode.removeChild(menu); }
      if (sub) { sub.parentNode.removeChild(sub); }
      if (caret) { caret.parentNode.removeChild(caret); }
      if (btn) { btn.setAttribute('aria-expanded', 'false'); }
      return;
    }
    /* caret 模式：输入 @ / / 触发，仅二级条目卡片贴在光标旁 */
    if (UI.attachHintAt >= 0) {
      if (menu) { menu.parentNode.removeChild(menu); }
      if (sub) { sub.parentNode.removeChild(sub); }
      if (btn) { btn.setAttribute('aria-expanded', 'false'); }
      if (!caret) {
        caret = document.createElement('div');
        caret.className = 'attach-submenu attach-caret'; caret.setAttribute('role', 'menu');
        host.appendChild(caret);
      }
      caret.innerHTML = attachSecondaryHTML();
      var ta = $('task-input');
      if (ta) {
        /* contenteditable 下直接用 Range 的包围盒拿光标视口坐标 */
        var rect = null;
        var sel = window.getSelection();
        if (sel.rangeCount && ta.contains(sel.anchorNode)) {
          rect = sel.getRangeAt(0).getBoundingClientRect();
        }
        if (rect) {
          var box = host.getBoundingClientRect();
          var top = rect.bottom - box.top + 4;
          var left = rect.left - box.left;
          var mw = caret.offsetWidth || 176;
          var maxLeft = host.clientWidth - mw - 8;
          if (left > maxLeft) { left = maxLeft; }
          if (left < 4) { left = 4; }
          caret.style.top = top + 'px';
          caret.style.left = left + 'px';
          caret.style.bottom = 'auto';
          caret.style.transform = '';
        }
      }
      return;
    }
    /* 加号模式：wrap 内一级 + 二级 */
    if (caret) { caret.parentNode.removeChild(caret); }
    if (!menu) {
      menu = document.createElement('div');
      menu.className = 'attach-menu'; menu.setAttribute('role', 'menu');
      wrap.appendChild(menu);
    }
    menu.innerHTML = attachPrimaryHTML();
    if (UI.attachMenu.level === 2 && UI.attachMenu.cat) {
      if (!sub) {
        sub = document.createElement('div');
        sub.className = 'attach-submenu'; sub.setAttribute('role', 'menu');
        wrap.appendChild(sub);
      }
      sub.innerHTML = attachSecondaryHTML();
      /* v3.45：二级面板从当前类别项的行高位置贴着开始（顶对齐该项，不再固定顶对齐整张菜单） */
      sub.style.transform = '';
      var mrect = menu.getBoundingClientRect();
      var active = menu.querySelector('.at-item[data-cat="' + UI.attachMenu.cat + '"]');
      if (active) {
        var arect = active.getBoundingClientRect();
        var dy = Math.round(arect.top - mrect.top);
        if (dy > 0) { sub.style.transform = 'translateY(' + dy + 'px)'; }
      }
    } else if (sub && sub.parentNode) { sub.parentNode.removeChild(sub); }
    if (btn) { btn.setAttribute('aria-expanded', 'true'); }
  }
  function closeAttachMenu() {
    if (!UI.attachMenu.open) { return; }
    UI.attachMenu.open = false; UI.attachMenu.cat = ''; UI.attachMenu.level = 1;
    UI.attachHintAt = -1;
    renderAttachMenu();
  }
  function composerHTML(mode) {
    /* 菜单 HTML 仅在加号路径内联渲染；caret 路径由 renderAttachMenu 动态创建 */
    var menuHTML = '';
    if (UI.attachMenu.open && UI.attachHintAt < 0) {
      menuHTML = '<div class="attach-menu" role="menu">' + attachPrimaryHTML() + '</div>'
        + (UI.attachMenu.level === 2 && UI.attachMenu.cat
          ? '<div class="attach-submenu" role="menu">' + attachSecondaryHTML() + '</div>' : '');
    }
    return '<div class="composer ' + mode + '"><div class="chat-col">'
      + '<div class="cmdbox">'
      /* v3.52：contenteditable 输入框，挂载项为原子块（contenteditable=false，不可中间插入、一删全删） */
      + '<div id="task-input" class="cmd-input" data-action="task-input" contenteditable="true" spellcheck="false"'
      + ' data-ph="输入一句话，例如：帮我优化一个 N52 配方，目标 Hcj ≥ 15 kOe"'
      + ' role="textbox" aria-multiline="true" aria-label="主对话输入框"></div>'
      + '<div class="cmd-tools">'
      + '<div class="attach-wrap">'
      + '<button type="button" class="attach-btn" data-action="attach-open" aria-label="挂载 Skill / Tool / SCP / 科研对象"'
      + ' aria-expanded="false" title="挂载 Skill / Tool / SCP / 科研对象">' + icon('plus', 16) + '</button>'
      + menuHTML
      + '</div>'
      + '<span class="cmd-spacer"></span>'
      + attachHintsHTML()
      /* v3.9：输入盒操作唯一——只留「发送」；会话复位走侧栏「新建对话」 */
      + '<button type="button" class="btn cmd-send" data-action="task-generate">' + icon('send', 13) + ' 发送</button>'
      + '</div></div></div></div>';
  }

  /* hero 空态：徽标 + 主问句 + 居中大输入盒（唯一入口）+ 案例卡片网格（2×2，
     卡片 = 类别 tag + 标题 + 简述 + 演示问句，整卡点击即发送） */
  function heroHTML() {
    return '<div class="hero">'
      + '<div class="hero-badge">' + icon('flask', 13) + ' AI 辅助科学发现 · 钕铁硼垂类</div>'
      + '<h1 class="hero-title">今天想研究什么材料问题？</h1>'
      + composerHTML('is-hero')
      + '<div class="case-grid">'
      + M.examples.map(function (x) {
        return '<button type="button" class="case-card" data-action="task-example" data-text="' + esc(x.text) + '">'
          + '<span class="case-top"><span class="case-tag">' + esc(x.tag) + '</span>'
          + '<span class="case-go">' + icon('arrow', 14) + '</span></span>'
          + '<span class="case-title">' + esc(x.title) + '</span>'
          + '<span class="case-desc">' + esc(x.desc) + '</span>'
          + '<span class="case-q">「' + esc(x.text) + '」</span>'
          + '</button>';
      }).join('')
      + '</div></div>';
  }

  function slotChipsHTML(task) {
    var chips = [];
    for (var k in task.slots) {
      if (task.slots[k]) { chips.push('<span class="slot-chip">' + esc(k) + ' = ' + esc(task.slots[k]) + '</span>'); }
    }
    return chips.length ? '<div class="slot-chips">' + chips.join('') + '</div>' : '';
  }

  /* 过程卡（v3.4，借鉴智链 demo）：一张卡覆盖「正在规划 → 已规划 N 步 → 执行流程 → 已完成」
   * 全生命周期；执行中 chip 级原子动作（工具/检索调用）逐个冒出 loading→done，
   * 完成的步骤折叠为一行摘要；skill 以徽标挂在卡头。旧 kind 'task' 消息兼容渲染。 */
  function normStep(p) {
    return typeof p === 'string' ? { title: p, summary: '', chips: [] } : p;
  }
  /* v3.37（黄总 2026-11-17）：把每个 plan 步骤的 chips 渲染为「工具调用」二级节点——
   * 默认打开（<details open>），逐条显示实际调用的工具/技能、id 与口径，
   * 体现"AI 自主编排工具/仿真"，而不再是一行摘要。done 态全绿，live 态随 chipDone 逐个冒出。 */
  function subFlagHTML(flag) {
    var map = { '预测': 'predicted', '仿真': 'simulated', '引用': 'reference', '编排': 'orchestrate', '实测': 'measured' };
    var cls = map[flag];
    if (!cls) { return ''; }
    return '<span class="sub-flag sf-' + cls + '">' + esc(flag) + '</span>';
  }
  function subNodesHTML(chips, doneAll, chipDone) {
    if (!chips || !chips.length) { return ''; }
    var rows = chips.map(function (c, ci) {
      var st = doneAll ? 'done' : (ci < chipDone ? 'done' : (ci === chipDone ? 'loading' : 'queued'));
      var lead = st === 'done' ? icon('check', 10)
        : (st === 'loading' ? '<span class="spin" aria-hidden="true"></span>' : icon('box', 10));
      return '<div class="psub-node is-' + st + '">'
        + '<span class="psub-ic">' + lead + '</span>'
        + '<span class="psub-tx">' + esc(c.label) + '</span>'
        + (c.tool ? '<span class="psub-tool mono">' + esc(c.tool) + '</span>' : '')
        + subFlagHTML(c.flag)
        + '</div>';
    }).join('');
    return '<details class="psub" open><summary class="psub-head">'
      + icon('layers', 11) + '<span>工具调用 · ' + chips.length + ' 个节点</span>'
      + '<span class="psub-caret" aria-hidden="true"></span></summary>'
      + '<div class="psub-list">' + rows + '</div></details>';
  }
  function planCardHTML(task, idx) {
    var sk = task.skill_id ? skillById(task.skill_id) : null;
    var hasStates = statesOK(task);
    var phase = task.phase || (task.executed || !hasStates ? 'done' : 'planning');
    var headText = {
      planning: '正在规划',
      planned: '已规划 ' + task.plan.length + ' 个步骤',
      running: '执行流程',
      done: '执行流程已完成'
    }[phase];
    var headIcon = phase === 'done'
      ? '<span class="pc-ok">' + icon('check', 11) + '</span>'
      : '<span class="spin pc-spin" aria-hidden="true"></span>';

    var body = '';
    if (phase === 'planning' || phase === 'planned') {
      /* 规划阶段：plan 节点 chips（planned 态逐个点亮） */
      body = '<div class="pc-nodes">' + task.plan.map(function (p, i) {
        var on = phase === 'planned';
        return '<span class="plan-node' + (on ? ' is-on' : '') + '" style="animation-delay:' + (i * 90) + 'ms">'
          + '<span class="pl-n">' + (i + 1) + '</span>' + esc(normStep(p).title) + '</span>';
      }).join('') + '</div>';
    } else {
      body = '<div class="psteps">' + task.plan.map(function (p, i) {
        p = normStep(p);
        var st = hasStates ? (task.stepStates[i] || 'pending') : 'done';
        if (st === 'done') {
          var chips = p.chips || [];
          return '<div class="pstep is-done"><span class="pstep-dot">' + icon('check', 10) + '</span>'
            + '<div class="pstep-body"><span class="pstep-title">' + esc(p.title) + '</span>'
            + (p.summary ? '<span class="pstep-sum">' + esc(p.summary) + '</span>' : '')
            + subNodesHTML(chips, true, 0)
            + '</div></div>';
        }
        if (st === 'doing') {
          var chips = p.chips || [];
          return '<div class="pstep is-doing"><span class="pstep-dot"><span class="spin" aria-hidden="true"></span></span>'
            + '<div class="pstep-body"><span class="pstep-title">' + esc(p.title) + '</span>'
            + subNodesHTML(chips, false, task.chipDone || 0)
            + '</div></div>';
        }
        return '<div class="pstep is-pending"><span class="pstep-dot">' + (i + 1) + '</span>'
          + '<div class="pstep-body"><span class="pstep-title">' + esc(p.title) + '</span></div></div>';
      }).join('') + '</div>';
    }

    return '<section class="card chat-card proc-card">'
      + '<div class="pc-head">' + headIcon + '<span class="pc-summary">' + esc(headText) + '</span>'
      + (sk ? '<span class="agent-tag">' + icon('cpu', 11) + ' ' + esc(sk.skill_id) + ' ' + esc(sk.name) + '</span>' : '')
      + '</div>'
      + '<div class="pc-body">' + body + slotChipsHTML(task) + '</div>'
      + '</section>';
  }
  function statesOK(task) {
    return task.stepStates && task.stepStates.length === task.plan.length;
  }

  function truthFlagHTML(flag) {
    /* v3.33（黄总）：实测是默认态/基准，不贴标签（分区本身已表明真值口径）；
       标签只标记非真值——predicted / simulated 才显式标注，与实测分列。
       实测标签统一返回空串，一处覆盖所有调用点（数据行/留痕/对比/结果卡/实验中心）。 */
    if (flag === 'measured' || !flag) { return ''; }
    var cls = flag === 'simulated' ? 'tf-simulated' : 'tf-predicted';
    var label = { simulated: '仿真 simulated', predicted: '预测 predicted' }[flag] || flag;
    return '<span class="truth-flag ' + cls + '">' + esc(label) + '</span>';
  }

  /* ---------- 可视化小组件（纯内联 SVG / div，零依赖） ---------- */
  /* 成分堆叠条：非 Fe 元素按 wt% 着色，Fe 余量补灰；legend 在下。compList 参数化以支持候选组 */
  function compBarHTML(compList) {
    var CC = ['#1E40AF', '#3B82F6', '#D97706', '#0F766E', '#B91C1C', '#7C3AED', '#DB2777'];
    var total = 0;
    compList.forEach(function (x) { total += x[1]; });
    var fe = Math.max(0, 100 - total);
    var segs = compList.map(function (x, i) {
      return '<span class="cb-seg" style="width:' + x[1] + '%;background:' + CC[i % CC.length] + '"'
        + ' title="' + esc(x[0]) + ' ' + x[1] + ' wt%"></span>';
    }).join('') + '<span class="cb-seg is-fe" style="width:' + fe.toFixed(2) + '%" title="Fe bal. ≈ ' + fe.toFixed(1) + ' wt%"></span>';
    var legend = compList.map(function (x, i) {
      return '<span class="cb-chip"><i style="background:' + CC[i % CC.length] + '"></i>' + esc(x[0]) + ' <b>' + x[1] + '</b></span>';
    }).join('') + '<span class="cb-chip"><i style="background:#334155"></i>Fe <b>bal.</b></span>';
    return '<div class="comp-bar" role="img" aria-label="配方成分堆叠条">' + segs + '</div>'
      + '<div class="cb-legend">' + legend + '</div>';
  }

  /* 性能实测 vs 目标对比条（检测分析用；各指标独立量程） */
  function perfCmpHTML(smp) {
    var goals = { 'Br': 14.5, 'Hcj': 15, '(BH)max': 52 };
    var maxs = { 'Br': 16, 'Hcj': 20, '(BH)max': 60 };
    var rows = smp.performance.map(function (p) {
      var v = parseFloat(p.value) || 0;
      var g = goals[p.key] || 0;
      var mx = maxs[p.key] || (v * 1.3);
      var ok = v >= g;
      return '<div class="cmp-row"><span class="cmp-k">' + esc(p.key) + '</span>' + truthFlagHTML(p.flag)
        + '<div class="cmp-track"><span class="cmp-fill ' + (ok ? 'is-pass' : 'is-gap') + '" style="width:' + (v / mx * 100).toFixed(1) + '%"></span>'
        + '<span class="cmp-goal" style="left:' + (g / mx * 100).toFixed(1) + '%" title="目标 ' + g + '"></span></div>'
        + '<span class="cmp-v mono">' + esc(p.value) + '</span></div>';
    }).join('');
    return '<div class="cmp-block"><div class="cmp-title">实测 vs 目标（竖线 = 目标值）</div>' + rows + '</div>';
  }

  /* 工艺温度-时间阶梯曲线（工艺优化结果卡用；数值为该 intent 的固定示例口径） */
  function procChartSVG() {
    return '<div class="chartbox proc-chart">'
      + '<svg viewBox="0 0 660 190" role="img" aria-label="工艺温度-时间阶梯曲线（预测口径）">'
      + '<line x1="40" y1="162" x2="632" y2="162" stroke="#DBEAFE" stroke-width="1"/>'
      + '<polyline points="40,162 96,27 284,27 322,97 416,97 435,103 576,103 613,162"'
      + ' fill="none" stroke="#1E40AF" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>'
      + '<circle cx="96" cy="27" r="3" fill="#1E40AF"/><circle cx="284" cy="27" r="3" fill="#1E40AF"/>'
      + '<circle cx="416" cy="97" r="3" fill="#D97706"/><circle cx="576" cy="103" r="3" fill="#D97706"/>'
      + '<text x="190" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#1E40AF">真空烧结 1060℃ × 4h</text>'
      + '<text x="369" y="88" text-anchor="middle" font-size="11" font-weight="700" fill="#D97706">一级回火 520℃ × 2h</text>'
      + '<text x="505" y="94" text-anchor="middle" font-size="11" font-weight="700" fill="#D97706">二级 480℃ × 3h</text>'
      + '<text x="44" y="178" font-size="10" fill="#475569">室温</text>'
      + '<text x="592" y="178" font-size="10" fill="#475569">时间 →</text>'
      + '<text x="14" y="30" font-size="10" fill="#475569" transform="rotate(-90 14 30)">温度</text>'
      + '</svg>'
      + '<div class="chart-legend"><span class="lg"><span class="swatch" style="background:#1E40AF"></span>烧结段</span>'
      + '<span class="lg"><span class="swatch" style="background:#D97706"></span>回火段</span>'
      + '<span class="lg">预测口径 · 须小批试制 + 实测验证</span></div>'
      + '</div>';
  }

  /* 晶粒尺寸标尺（电镜分析结果卡用）：2–10 μm 量程，标记均值 5.6 μm 与常见分布区间 */
  function grainBarHTML() {
    return '<div class="grain-bar">'
      + '<div class="gb-track"><span class="gb-range" style="left:12.5%;width:62.5%"></span>'
      + '<span class="gb-dot" style="left:45%" title="均值 5.6 μm"></span></div>'
      + '<div class="gb-scale"><span>2 μm</span><span class="b">均值 5.6 μm · 分布 3–7 μm</span><span>10 μm</span></div>'
      + '</div>';
  }

  /* ---------- v3.8 右栏工作台：产物三 tab（检索结果 / 配方 / 工艺） ----------
   * 对话流承载 plan/执行/回答；右栏承载非回答流程的产物与资料。
   * v3.8（黄总 2026-11-13）：「检索」与「依据」合并为「检索结果」——检索命中
   * 即引用出处，同一来源只出现一次：命中条覆盖到引用 id 时口径 chip 直挂命中条，
   * 未被覆盖的引用（模型输出 / 仿真登记等）以引用条目追加在后。
   * v3.6（黄总 2026-11-13）：工作台撤下「留痕」tab——留痕唯一落点为科研对象
   * 证据时间轴（sample.html?tab=trace）；v3.9b 起对话内不再保留回执卡。 */
  /* v3.10 检索条目信息结构（黄总 2026-11-13）：三行制——
   *   1行 = 来源类型 icon + 名称（+ 口径 chip 靠右）；2行 = 摘要/片段；3行 = 来源等元信息 + 相关度。
   * 命中条可点击跳转（知识库 → 段落定位；档案/报告/电镜 → 科研对象），hover 高亮 + 箭头引导；
   * 追加引用条目（平台内部登记物，无外部页面）同构三行但不可点。 */
  function hitHref(to) {
    if (!to) { return ''; }
    if (to[0] === 'kb') { return url('kb.html', { doc: to[1], hit: to[2] }); }
    if (to[0] === 'sample') { return url('sample.html', { sample_id: to[1] }); }
    return '';
  }
  function kbDocIco(type) { return type === '专利' ? 'file' : 'book'; }
  function flagIco(flag) { return flag === 'predicted' ? 'cpu' : (flag === 'simulated' ? 'flask' : 'check'); }
  function hitItemHTML(o) {
    /* o: { ico, title, snip, meta, href, cls } — cls 默认 hit-item，追加引用传 ref-item（同构不可点）
     * v3.11（黄总 2026-11-14）：撤置信度分数；条目去卡片化，列表式分隔线（样式见 CSS）
     * v3.31（黄总 2026-11-17）：撤口径标签——检索命中的是专利/文献/段落本身，
     *   一律挂「实测」既冗余又失真；列表只留标题·摘要·出处三行，出处是回溯锚点 */
    var cls = o.cls || 'hit-item';
    var inner = '<div class="hit-l1"><span class="hit-ico">' + icon(o.ico || 'search', 13) + '</span>'
      + '<span class="hit-title">' + esc(o.title) + '</span>'
      + (o.href ? '<span class="hit-go">' + icon('arrow', 13) + '</span>' : '') + '</div>'
      + '<div class="hit-l2">' + esc(o.snip) + '</div>'
      + '<div class="hit-l3"><span>' + o.meta + '</span></div>';
    return o.href
      ? '<a class="' + cls + ' is-link" href="' + esc(o.href) + '" title="打开来源定位原文">' + inner + '</a>'
      : '<div class="' + cls + '">' + inner + '</div>';
  }
  function panelResultsHTML(intent, raw) {
    /* kb_query（D-42）：命中来自知识库实时检索，条目可点击跳 kb 页定位高亮；
     * 命中即引用出处（measured 口径），合一呈现 */
    if (intent === 'kb_query') {
      var kh = kbRetrieve(raw || '');
      if (!kh.length) { return '<div class="wp-empty">知识库（平台数据集 + 我的文档）未检索到相关内容。</div>'; }
      return kh.map(function (h) {
        return hitItemHTML({
          ico: kbDocIco(h.doc.type), title: h.doc.title,
          snip: h.section.text,
          meta: esc('知识库 · ' + h.doc.type + ' · ' + h.doc.doc_id + '·' + h.section.sid),
          href: url('kb.html', { doc: h.doc.doc_id, hit: h.section.sid })
        });
      }).join('');
    }
    var d = M.panelRefs[intent] || M.panelRefs._default;
    var hits = d.hits || [];
    var refs = d.refs || [];
    var covered = {};
    var html = hits.map(function (x) {
      var ref = null;
      refs.forEach(function (r) { if (!ref && x.title.indexOf(r.id) >= 0) { ref = r; } });
      if (ref) { covered[ref.id] = true; }
      return hitItemHTML({
        ico: x.ico, title: x.title,
        snip: x.snippet,
        meta: esc(x.src) + (ref ? ' · 引用 ' + esc(ref.id) : ''),
        href: hitHref(x.to)
      });
    }).join('');
    html += refs.filter(function (r) { return !covered[r.id]; }).map(function (r) {
      return hitItemHTML({
        ico: flagIco(r.flag), title: r.id,
        snip: r.text, meta: esc(r.src), href: '', cls: 'ref-item'
      });
    }).join('');
    if (!html) { return '<div class="wp-empty">本次任务未触发检索。</div>'; }
    return html;
  }

  /* 配方对比表：当前版本（实测）vs 推荐候选（预测），成分 Δ 高亮 + 性能对比。
   * v3.58 起工作台配方 tab 不再引用（黄总：配方 tab 内不存在对比），函数保留备查。 */
  function panelFormulaHTML() {
    var c = M.candidate;
    function fmt(n) { return (Math.round(n * 100) / 100).toString(); }
    var map3 = {}, map4 = {};
    c.base_comps.forEach(function (x) { map3[x[0]] = x[1]; });
    c.comps.forEach(function (x) { map4[x[0]] = x[1]; });
    var els = ['Nd', 'Pr', 'Dy', 'B', 'Co', 'Cu', 'Al', 'Fe'];
    var rows = els.map(function (el) {
      var v3 = el === 'Fe' ? null : map3[el];
      var v4 = el === 'Fe' ? null : map4[el];
      var d = (v3 != null && v4 != null) ? (v4 - v3) : null;
      var dTxt = d == null ? '—' : (d === 0 ? '±0' : (d > 0 ? '+' + fmt(d) : fmt(d)));
      return '<tr' + (d != null && d !== 0 ? ' class="hl"' : '') + '><td class="mono b">' + el + '</td>'
        + '<td class="num mono">' + (v3 == null ? 'bal.' : fmt(v3)) + '</td>'
        + '<td class="num mono">' + (v4 == null ? 'bal.' : fmt(v4)) + '</td>'
        + '<td class="num mono">' + dTxt + '</td></tr>';
    }).join('');
    var perf = [
      ['Hcj (kOe)', c.base_meas.Hcj, c.pred.Hcj],
      ['Br (kGs)', c.base_meas.Br, c.pred.Br],
      ['(BH)max (MGOe)', c.base_meas.BHmax, c.pred.BHmax]
    ].map(function (r) {
      var d = r[2] - r[1];
      return '<tr><td class="mono b">' + esc(r[0]) + '</td><td class="num mono">' + r[1].toFixed(1) + '</td>'
        + '<td class="num mono">' + r[2].toFixed(1) + '</td>'
        + '<td class="num mono">' + (d > 0 ? '+' + d.toFixed(1) : d.toFixed(1)) + '</td></tr>';
    }).join('');
    return '<div class="wp-sub-t">' + icon('beaker', 12) + ' 与当前版本对比（wt%）</div>'
      + '<table class="tbl wp-tbl"><thead><tr><th>元素</th><th class="num">' + esc(c.base) + ' 当前</th>'
      + '<th class="num">' + esc(c.id) + ' 推荐</th><th class="num">Δ</th></tr></thead><tbody>' + rows + '</tbody></table>'
      + '<div class="wp-sub-t">' + icon('check', 12) + ' 性能对比（当前 = 实测 / 推荐 = 预测）</div>'
      + '<table class="tbl wp-tbl"><thead><tr><th>指标</th><th class="num">当前 实测</th><th class="num">推荐 预测</th><th class="num">Δ</th></tr></thead>'
      + '<tbody>' + perf + '</tbody></table>'
      + '<div class="callout is-warn mt10"><div class="co-desc">候选配方为预测口径：须小批试制 + 实测验证后方可作为结论。</div></div>';
  }

  /* 候选配方组卡：每候选 = 版本头（评分/推荐/口径）+ 成分堆叠条 + 预测指标行 + 筛选备注 */
  /* 候选配方卡（v3.12）：卡头 id + 推荐 + 口径 chip + 成本（取代评分）；
   * 堆叠条 Fe 余量用实色撑满 100%；性能指标三等分 + 竖线分隔、两行高（中文+英文 / 数字+单位）；
   * 解读 note 不上卡（对话流已承载） */
  /* v3.74（黄总 2026-11-18）：候选卡加「选用」按钮——默认选中 AI 推荐项（pick），
   * 用户点其他卡按钮改选（UI.candSel 显式覆盖）；选中卡主色描边 + 按钮「已选用」。 */
  function candSelId(kind) {
    var pick = (kind === 'formula' ? M.candidates : M.processPacks).filter(function (x) { return x.pick; })[0];
    return (UI.candSel && UI.candSel[kind]) || (pick && pick.id) || '';
  }
  function candCardHTML(c) {
    var on = c.id === candSelId('formula');
    return '<div class="cand-item' + (c.pick ? ' is-pick' : '') + (on ? ' is-picked' : '') + '">'
      + '<div class="cand-top"><span class="cand-id mono">' + esc(c.id) + '</span>'
      + (c.pick ? tag('pass', '推荐') : '') + truthFlagHTML('predicted')
      + '<span class="cand-score">成本 <b class="mono">' + esc(c.cost) + '</b></span>'
      + '<button type="button" class="cand-pick-btn' + (on ? ' on' : '') + '" data-action="cand-pick"'
      + ' data-kind="formula" data-id="' + esc(c.id) + '"' + (on ? ' disabled' : '') + '>'
      + (on ? '已选用' : '选用') + '</button></div>'
      + compBarHTML(c.comps)
      + '<div class="cand-perf">'
      + [['矫顽力', 'Hcj', c.pred.Hcj, 'kOe'], ['剩磁', 'Br', c.pred.Br, 'kGs'], ['磁能积', '(BH)max', c.pred.BHmax, 'MGOe']]
          .map(function (m) {
            return '<div class="cp-cell"><div class="cp-k">' + esc(m[0]) + ' <span class="mono">' + esc(m[1]) + '</span></div>'
              + '<div class="cp-v mono">' + m[2] + ' <i>' + esc(m[3]) + '</i></div></div>';
          }).join('')
      + '</div></div>';
  }

  /* 工艺包卡：包名 + 评分/口径 + 参数步骤行。
   * v3.58（黄总 2026-11-18 早）：撤描述性备注 note——工作区只承载工艺参数，
   * 解读/适配说明由对话区 AI 承载（对齐 v3.12 配方卡「解读 note 不上卡」原则）；
   * note 数据保留在 mock，对话流确认卡 cc-note 仍在用。
   * v3.58（黄总 2026-11-18 早）：11 项参数不再平铺，按工艺流程分三组——
   * 配料·混料（总重/各仓重量/混料次数）→ 磁场成型（成型尺寸/微升距离/充磁·退磁电流）
   * → 烧结·退火（温度/时间 ×2）；组标题 + 组间淡虚线分隔，对齐 r33 详情卡信息层级规范。
   * 三组工艺参数序一致，分组按序切段，mock steps 平铺结构不动（确认卡摘要仍直接拼 steps）。 */
  var PACK_GROUPS = [['配料 · 混料', 3], ['磁场成型', 4], ['烧结 · 退火', 4]];
  function packCardHTML(p) {
    var i = 0;
    var groups = PACK_GROUPS.map(function (g) {
      var rows = p.steps.slice(i, i + g[1]).map(function (s) {
        return '<div class="pack-step"><span class="ps-k">' + esc(s[0]) + '</span><span class="ps-v mono">' + esc(s[1]) + '</span></div>';
      }).join('');
      i += g[1];
      return '<div class="pack-group"><div class="pack-gt">' + esc(g[0]) + '</div>' + rows + '</div>';
    }).join('');
    return '<div class="cand-item' + (p.pick ? ' is-pick' : '') + (p.id === candSelId('process') ? ' is-picked' : '') + '">'
      + '<div class="cand-top"><span class="cand-id mono">' + esc(p.id) + '</span>'
      + (p.pick ? tag('pass', '推荐') : '') + truthFlagHTML('predicted')
      + '<span class="cand-score">评分 <b class="mono">' + p.score + '</b></span>'
      + '<button type="button" class="cand-pick-btn' + (p.id === candSelId('process') ? ' on' : '') + '" data-action="cand-pick"'
      + ' data-kind="process" data-id="' + esc(p.id) + '"' + (p.id === candSelId('process') ? ' disabled' : '') + '>'
      + (p.id === candSelId('process') ? '已选用' : '选用') + '</button></div>'
      + groups + '</div>';
  }

  function panelHTML() {
    var lastPlan = null, lastResult = null, hasFormula = false, hasProcess = false;
    var simTasks = { sim_vasp: [], sim_mumax: [] };
    /* v3.34：仿真只认 VASP（T-02）+ mumax3（T-09）两路真实计算产物；
     * 多工具编排卡（keepTaskPlan）按实际 tools 分桶，不再只看消息主 intent。 */
    var tool2sim = { 'T-02': 'sim_vasp', 'T-09': 'sim_mumax' };
    /* v3.62（黄总 2026-11-18）：产物文件树——同一会话可能围绕多个配方聊出多轮
     * 仿真 / 工艺，顶部类型 tab（都叫 VASP）分不清挂在哪个配方下。
     * 树以「最近一次配方上下文」为 key（配方 ID 即未来存储的 keyid）归组产物；
     * 无配方时回落样品基线版本，再无则归「未挂配方」。检索结果为会话级，不入树。 */
    var treeGroups = [], curCtx = null, treeSeen = [];
    function ctxFor(t) {
      if (curCtx) { return curCtx; }
      var sid = (t.slots && t.slots.sample_id) || '';
      var s = sid ? findSample(sid) : null;
      if (s && s.formula && s.formula.version) {
        curCtx = { key: sid, label: s.formula.version, title: sid + ' · ' + s.formula.version + '（在用基线）', leaves: [] };
      } else {
        curCtx = { key: '_loose', label: '未挂配方', title: '会话尚未产出配方，产物暂归此处', leaves: [] };
      }
      treeGroups.push(curCtx);
      return curCtx;
    }
    function addLeaf(g, tab, label, tn, title) {
      /* v3.65：一个配方下同类型产物只有一个叶，tn 保持指向最新一次运行。
       * v3.70（黄总 2026-11-18）：文件树撤下、改为标签栏配方切换控件——归组逻辑保留，
       * 叶升级为「组内该类型产物集合」：tns 按序累积（tab 内容过滤用），tn 指最新。 */
      var ex = null;
      for (var i = 0; i < g.leaves.length; i++) { if (g.leaves[i].tab === tab) { ex = g.leaves[i]; break; } }
      if (ex) { if (tn) { ex.tn = tn; if (ex.tns.indexOf(tn) < 0) { ex.tns.push(tn); } } return; }
      g.leaves.push({ tab: tab, label: label, n: 0, tn: tn || '', tns: tn ? [tn] : [], title: title || '' });
    }
    UI.msgs.forEach(function (m, i) {
      if (!m.task) { return; }
      var t = m.task;
      t._tn = 'tn' + i;
      if ((m.kind === 'plan' || m.kind === 'task') && m.task) { lastPlan = m; }
      if (m.kind === 'result' || m.kind === 'answer') { lastResult = m; }
      if (t.intent === 'formula_gen') { hasFormula = true; }
      if (t.intent === 'process_opt') { hasProcess = true; }
      var buckets = [];
      if (simTasks[t.intent]) { buckets.push(t.intent); }
      (t.tools || []).forEach(function (tid) {
        var b = tool2sim[tid];
        if (b && buckets.indexOf(b) < 0) { buckets.push(b); }
      });
      buckets.forEach(function (b) {
        if (!simTasks[b].some(function (x) { return x === t; })) { simTasks[b].push(t); }
      });
      /* 文件树归组：配方产出开新组，其余产物挂最近组。
       * 固化会话的 plan 卡与 answer 卡共享同一 task 对象引用——按引用去重，
       * 同一任务只归组一次，避免「候选配方」叶成对出现。 */
      if (treeSeen.indexOf(t) >= 0) { return; }
      treeSeen.push(t);
      var pick = M.candidates.filter(function (c) { return c.pick; })[0] || M.candidates[0];
      if (t.intent === 'formula_gen') {
        curCtx = treeGroups.filter(function (g) { return g.key === pick.id; })[0];
        if (!curCtx) { curCtx = { key: pick.id, label: pick.id, title: pick.id + ' · 会话产出的候选配方组', leaves: [] }; treeGroups.push(curCtx); }
        addLeaf(curCtx, 'formula', '候选配方', '', '候选配方卡组 ×' + M.candidates.length);
      } else if (t.intent === 'process_opt') {
        addLeaf(ctxFor(t), 'process', '工艺参数包', '', t.raw || t.name);
      } else {
        buckets.forEach(function (b) {
          addLeaf(ctxFor(t), b, b === 'sim_vasp' ? 'VASP' : 'mumax3', t._tn, t.raw || t.name);
        });
      }
    });
    treeGroups = treeGroups.filter(function (g) { return g.leaves.length > 0; });
    /* v3.70：配方切换控件——UI.fsSel 选中组 key，无效时默认最新一组；
     * 产物 tab（配方/工艺/VASP/mumax3）只显示选中组下的产物，检索结果不受影响。 */
    var selGroup = null;
    if (treeGroups.length) {
      selGroup = treeGroups.filter(function (g) { return g.key === UI.fsSel; })[0] || treeGroups[treeGroups.length - 1];
      UI.fsSel = selGroup.key;
    }
    function selLeaf(tab) {
      return selGroup ? selGroup.leaves.filter(function (l) { return l.tab === tab; })[0] : null;
    }
    var refTask = lastResult ? lastResult.task : (lastPlan ? lastPlan.task : null);

    function secSearch() {
      if (!refTask) { return '<div class="wp-empty">任务执行中的检索结果在此呈现。</div>'; }
      return panelResultsHTML(refTask.intent, refTask.raw);
    }
    /* v3.58（黄总 2026-11-17 晚）：配方 tab 只留候选卡组，撤下「与当前版本对比」
     * （panelFormulaHTML 不再上工作台，函数保留备查）；工艺 tab 只留三组工艺卡，
     * 撤下温度-时间阶梯曲线（procChartSVG 仍服务对话流确认卡）。 */
    /* v3.70：产物内容按选中配方过滤——组内无该类型时给空态，绝不拿别的配方的产物冒充 */
    function secFormula() {
      if (!selLeaf('formula')) { return '<div class="wp-empty">' + esc(selGroup ? selGroup.label + ' 下暂无候选配方卡组。' : '会话中产出候选配方组后，在此呈现。') + '</div>'; }
      return M.candidates.map(candCardHTML).join('');
    }
    function secProcess() {
      if (!selLeaf('process')) { return '<div class="wp-empty">' + esc(selGroup ? selGroup.label + ' 下暂无工艺参数包。' : '会话中产出工艺包组后，在此呈现。') + '</div>'; }
      return M.processPacks.map(packCardHTML).join('');
    }
    /* 仿真产物卡（上下布局：结论 + 输入参数 → 运行脚本专区）：
     * 内容源 M.simRuns（VASP / mumax3 均引用科研对象同源数据）；每次计算独立一卡。 */
    function wpSimRunHTML(run, t, engine) {
      /* 归档按钮（v3.27）：把这次仿真作为一条 succeeded 事件 append 进 LS.simEvents，
         档案页从事件流投影出当前视图——演示"对话不受控 → 确定信息同步进档案"。
         仅 mumax3/VASP 对应档案两个槽位，才给归档入口。 */
      var sampleId = (t.slots && t.slots.sample_id) || '';
      var canArchive = (engine === 'mumax3' || engine === 'VASP') && !!sampleId;
      var archKey = '';
      if (canArchive) {
        archKey = 'arc' + (UI._arcSeq = (UI._arcSeq || 0) + 1);
        UI.simArchive = UI.simArchive || {};
        /* run_key 不含 job.id → 同一样品+脚本+引擎重复归档 = 同一次输入，投影时幂等合并 */
        var swv = run.job && run.job.sw ? (run.job.sw.match(/v?\d+\.\d+/) || ['1'])[0].replace(/^v/, '') : '1';
        var rk = sampleId + '|' + engine + '|' + (run.script ? run.script.name : 'run') + '|v' + swv;
        UI.simArchive[archKey] = {
          eid: 'EVS-L' + archKey, run_id: 'RUN-L' + (run.job ? run.job.id : archKey),
          run_key: rk, parent: null, sample_id: sampleId, engine: engine,
          status: 'succeeded', ts: new Date().toISOString().slice(0, 16).replace('T', ' '),
          actor: UI.sessionId || 'SES-LOCAL', source: 'tool',
          tool_version: run.job && run.job.sw ? run.job.sw : 'demo', task: run
        };
      }
      var resRows = (run.results || []).map(function (r) {
        return '<div class="result-row"><span class="rr-k">' + esc(r.key) + '</span>'
          + '<span class="rr-v mono">' + esc(r.value) + '</span></div>';
      }).join('');
      var inRows = (run.inputs || []).map(function (r) {
        return '<div class="result-row"><span class="rr-k">' + esc(r.key) + '</span>'
          + '<span class="rr-v mono">' + esc(r.value) + '</span>'
          + (r.src ? '<span class="rr-meta">' + esc(r.src) + '</span>' : '') + '</div>';
      }).join('');
      var scriptBlock = '';
      if (run.script) {
        UI.simScripts = UI.simScripts || {};
        UI.simScripts[run.script.name] = run.script.text;
        scriptBlock = '<div class="sim-sec">运行脚本</div>'
          + '<div class="ssp">'
          + '<div class="ssp-head"><span class="ssp-file">' + icon('file', 12) + ' ' + esc(run.script.name) + '</span>'
          + (run.script.engine ? tag('info', esc(run.script.engine)) : '')
          + '<span class="ssp-meta">' + run.script.text.split('\n').length + ' 行</span>'
          + '<button type="button" class="ssp-btn" data-action="copy-script" data-key="' + esc(run.script.name) + '">复制脚本</button>'
          + '</div>'
          + '<div class="ssp-body"><pre class="ssp-code">' + hlSimCode(run.script.text, run.script.engine) + '</pre></div>'
          + (run.script.run ? '<div class="ssp-run"><span class="ssp-run-k">提交运行</span><code>$ ' + esc(run.script.run) + '</code></div>' : '')
          + '</div>';
      }
      var wpTime = run.job ? '<span class="sim-time" title="' + esc(run.job.ts) + '">' + esc(run.job.ts.slice(5)) + '</span>' : '';
      return '<section class="card wp-sim"' + (t._tn ? ' data-tn="' + t._tn + '"' : '') + '><div class="card-h"><h2>' + icon('flask', 14) + ' ' + esc(t.name) + '</h2>'
        + tag('muted', '挂 ' + (sampleId || '—')) + wpTime
        + (canArchive ? '<button type="button" class="ssp-btn sim-archive-btn" data-action="sim-archive" data-key="' + archKey + '">归档到样品</button>' : '')
        + '</div>'
        + '<div class="card-b">'
        + (resRows || '')
        + '<div class="sim-sec">输入参数</div>' + (inRows || '')
        + scriptBlock
        + '</div></section>';
    }
    function secSimRun(intent, emptyNote) {
      /* v3.70：只渲染选中配方组内的仿真运行（leaf.tns 按序累积） */
      var leaf = selLeaf(intent);
      if (!selGroup || !leaf || !leaf.tns.length) { return '<div class="wp-empty">' + emptyNote + '</div>'; }
      var map = { sim_vasp: 'VASP', sim_mumax: 'mumax3' };
      var run = M.simRuns[map[intent]];
      return simTasks[intent].filter(function (t) { return leaf.tns.indexOf(t._tn) >= 0; })
        .map(function (t) { return wpSimRunHTML(run, t, map[intent]); }).join('');
    }

    /* v3.26（黄总 2026-11-16）：tab 加宽、不可关闭、不可拖拽——
     * 仅保留「宽度自适应 + 存在才出现」，顺序固定按 ALL 定义。
     * v3.70：产物 tab 的 show 改按选中配方组判定（检索结果恒显，不受切换影响）。 */
    var ALL = [
      { id: 'search', label: '检索结果', body: secSearch, show: true },
      { id: 'formula', label: '配方', body: secFormula, show: !!(selGroup && selLeaf('formula')) },
      { id: 'process', label: '工艺', body: secProcess, show: !!(selGroup && selLeaf('process')) },
      { id: 'sim_vasp', label: 'VASP', body: function () { return secSimRun('sim_vasp', '会话中完成 VASP 第一性原理计算后，在此呈现。'); }, show: !!(selGroup && selLeaf('sim_vasp')) },
      { id: 'sim_mumax', label: 'mumax3', body: function () { return secSimRun('sim_mumax', '会话中完成 mumax3 微磁学仿真后，在此呈现。'); }, show: !!(selGroup && selLeaf('sim_mumax')) }
    ];
    var tabs = ALL.filter(function (t) { return t.show; });
    if (!tabs.length) { tabs = [ALL[0]]; }
    var active = UI.panelTab || 'search';
    if (!tabs.some(function (t) { return t.id === active; })) { active = tabs[0].id; }
    var activeBody = tabs.filter(function (t) { return t.id === active; })[0].body();

    /* v3.70（黄总 2026-11-18）：配方切换控件（撤侧边文件树）——标签栏里、所有产物 tab
     * 之前（检索结果不算）；显示当前配方，点击在 tab 条下方展开会话内的配方列表；
     * 选中后产物 tab 只显示该配方下的产物。无配方归组时控件不出现。 */
    function fsHTML() {
      if (!selGroup) { return ''; }
      /* v3.71（黄总 2026-11-18）：展开改为控件自身的下拉菜单（.wp-fs-menu，fixed 浮层
       * 由 fs-toggle 点击后 JS 定位到按钮正下方——wp-tabs overflow-x 会裁 absolute 子元素，
       * fixed 不受裁剪）；不再在 tab 条下方追加第二行。 */
      var menu = UI.fsOpen
        ? '<div class="wp-fs-menu" role="listbox" aria-label="配方列表">'
          + treeGroups.map(function (g) {
              return '<button type="button" role="option" aria-selected="' + (g.key === selGroup.key) + '"'
                + ' class="wp-fs-item' + (g.key === selGroup.key ? ' on' : '') + '"'
                + ' data-action="fs-pick" data-key="' + esc(g.key) + '" title="' + esc(g.title) + '">'
                + '<span class="wp-fs-it">' + esc(g.label) + '</span>'
                + '</button>';
            }).join('')
          + '</div>'
        : '';
      return '<div class="wp-fs' + (UI.fsOpen ? ' open' : '') + (active === 'formula' ? ' is-formula' : '') + '">'
        + '<button type="button" class="wp-fs-btn" data-action="fs-toggle" title="' + esc(selGroup.title) + '"'
        + ' aria-expanded="' + (UI.fsOpen ? 'true' : 'false') + '">'
        + '<span class="wp-fs-label">' + esc(selGroup.label) + '</span>'
        + '<span class="wp-fs-caret" aria-hidden="true">▾</span></button>'
        + menu
        + '</div>';
    }

    return '<aside class="work-panel" id="work-panel" aria-label="会话产物工作台">'
      + '<div class="wp-tabs" role="tablist">'
      + tabs.map(function (t, idx) {
          /* v3.68：检索结果（会话级）与产物组之间加竖分割线；
             v3.70：分割线后即配方切换控件（所有产物 tab 之前，检索结果不算） */
          return (idx === 1 ? '<span class="wp-sep" aria-hidden="true"></span>' + fsHTML() : '')
            + '<button type="button" role="tab" aria-selected="' + (t.id === active) + '"'
            + ' class="wp-tab' + (t.id === active ? ' active' : '') + '"'
            + ' data-action="panel-tab" data-tab="' + t.id + '">'
            + esc(t.label) + (t.badge ? '<span class="wp-n">' + t.badge + '</span>' : '') + '</button>';
        }).join('')
      + '</div>'
      + '<div class="wp-body" role="tabpanel">' + activeBody + '</div>'
      + '</aside>';
  }

  /* v3.52（黄总 2026-11-17 晚）：确定性确认卡——配方 / 工艺产出后引导用户确认产物去向。
   * 结构化模板：卡头（产物类型 + 左右切换 2-3 个候选）→ 候选摘要 → 右下角按钮组
   * （忽略 / 存到当前样品 / 创建为新对象）；宽度复刻输入框，高度随内容。 */
  function seedConfirmCard() {
    UI.confirmCard = null;
    for (var i = UI.msgs.length - 1; i >= 0; i--) {
      var m = UI.msgs[i];
      if (m.task && (m.task.intent === 'formula_gen' || m.task.intent === 'process_opt')) {
        UI.confirmCard = { kind: m.task.intent === 'formula_gen' ? 'formula' : 'process', idx: 0, done: false };
        return;
      }
    }
  }
  function confirmCardHTML() {
    var cc = UI.confirmCard;
    if (!cc || cc.done) { return ''; }
    var list = cc.kind === 'formula' ? M.candidates : M.processPacks;
    var n = list.length;
    var cur = list[cc.idx % n];
    var isF = cc.kind === 'formula';
    /* v3.61（黄总 2026-11-18）：确认卡撤解读 note——定位是「快速浏览必要信息 + 确定性选择」，
     * 解读类文字（形成焓最优/取向最优…）不上卡，由对话区 AI 承载；配方/工艺两分支同撤。
     * mock note 字段保留：cc-create 创建科研对象时写入 design_note（L3730 附近）。
     * v3.62（黄总 2026-11-18）：工艺分支摘要同步收敛——11 项参数整串平铺违背「快速浏览」，
     * 收成热处理窗口一行（烧结 温度×时间 · 退火 温度×时间），完整 11 项在工作台工艺 tab。 */
    function pickStepV(p, k) { var s = p.steps.filter(function (x) { return x[0] === k; })[0]; return s ? s[1] : ''; }
    /* v3.75（黄总 2026-11-18 午）：摘要行撤「推荐 / 预测 predicted」标签——推荐倾向与口径
     * 对话区 AI 已表述，卡片只留 id + 关键数字；工艺评分挪到名称后（.cc-score），
     * meta 行只余热处理窗口。 */
    var summary = isF
      ? '<div class="cc-id mono b">' + esc(cur.id) + '</div>'
        + '<span class="cc-meta mono">成本 ' + esc(cur.cost) + ' · Hcj ' + cur.pred.Hcj + ' kOe · Br ' + cur.pred.Br + ' kGs · (BH)max ' + cur.pred.BHmax + ' MGOe</span>'
      : '<div class="cc-id mono b">' + esc(cur.id) + '</div>'
        + '<span class="cc-score">评分 <b class="mono">' + cur.score + '</b></span>'
        + '<span class="cc-meta mono">烧结 ' + esc(pickStepV(cur, '烧结温度')) + ' × ' + esc(pickStepV(cur, '烧结时间'))
        + ' · 退火 ' + esc(pickStepV(cur, '退火温度')) + ' × ' + esc(pickStepV(cur, '退火时间')) + '</span>';
    var pager = n > 1
      ? '<div class="cc-pager">'
        + '<button type="button" class="cc-nav" data-action="cc-nav" data-dir="-1" aria-label="上一个候选">‹</button>'
        + '<span class="cc-n mono">' + (cc.idx + 1) + '/' + n + '</span>'
        + '<button type="button" class="cc-nav" data-action="cc-nav" data-dir="1" aria-label="下一个候选">›</button></div>'
      : '';
    /* v3.67（黄总 2026-11-18 午）：工艺包不给出「创建为新对象」——全平台以配方为主 key 组织，
     * 工艺是配方的下游产物、不能独立成科研对象（同 v3.20 方案档收敛、v3.64 产物树归组原则）；
     * 工艺确认卡去向只剩 忽略 / 存到当前样品。配方候选本身是主 key 对象，保留创建入口。
     * v3.76（黄总 2026-11-18 午）：候选已存在科研对象时不再渲染置灰的「已在科研对象」——
     * 不可点的占位按钮是噪音；此时只剩 忽略 / 存到当前样品（与工艺卡按钮组形态一致）。 */
    var exists = !!findSample(cur.id);
    var createBtn = (!isF || exists) ? ''
      : '<button type="button" class="cc-btn primary" data-action="cc-create">' + icon('plus', 12) + ' 创建为新对象</button>';
    /* v3.69（黄总 2026-11-18 午）：标题下置——「候选配方/工艺参数包 待确认」并入底部控件行，
     * 取代「确认这组…的去向」引导语；卡片顶部直接展示候选摘要，不再设卡头行。
     * v3.72（黄总 2026-11-18 午）：翻页器移卡片右上角（绝对定位浮于摘要区右上），
     * 底行只剩 标题 + 按钮组。 */
    return '<div class="ccard" role="region" aria-label="产物确认卡"><div class="ccard-in">'
      + pager
      + '<div class="cc-body">' + summary + '</div>'
      + '<div class="cc-foot"><span class="cc-ask">' + (isF ? '候选配方待确认' : '工艺参数包待确认') + '</span>'
      + '<div class="cc-ops">'
      + '<button type="button" class="cc-btn ghost" data-action="cc-dismiss">忽略</button>'
      + '<button type="button" class="cc-btn" data-action="cc-save-current">存到当前样品</button>'
      + createBtn
      + '</div></div></div></div>';
  }
  /* 结果内容（历史 result 消息兜底渲染用；v3.4 起新消息走 answer + artifact） */
  function resultContent(task) {
    var sid = task.slots.sample_id || M.samples[0].sample_id;
    var smp = findSample(sid) || M.samples[0];
    var out = { sid: sid, rows: [], lead: '', note: '' };
    if (task.intent === 'formula_gen') {
      out.lead = '候选配方已产出：' + (task.slots.grade || smp.grade) + ' 新配比（预测口径），经第一性原理筛选';
      out.rows = [
        { k: '候选配方', v: M.candidate.id + '（next）· 综合评分 ' + M.candidate.score, flag: 'predicted', src: '配方优化 ML 模型' },
        { k: '相稳定性筛选', v: 'Dy 优先占位晶界相，形成焓更优', flag: 'simulated', src: '第一性原理计算' }
      ];
      out.note = '预测与仿真均为参考：须按流程送检测仪器与电镜实测后方可作为结论。';
    } else if (task.intent === 'process_opt') {
      out.lead = '工艺参数组已产出（预测口径）：烧结 1060℃ × 4h · 回火 520℃/480℃ 两级';
      out.viz = procChartSVG();
      out.rows = [
        { k: '真空烧结', v: '1060℃ × 4h', flag: 'predicted', src: '工艺优化 ML 模型' },
        { k: '回火', v: '一级 520℃ × 2h / 二级 480℃ × 3h', flag: 'predicted', src: '工艺优化 ML 模型' }
      ];
      out.note = '工艺参数为模型预测，需小批试制 + 实测验证后才能写入工艺规程。';
    } else if (task.intent === 'perf_analysis') {
      out.lead = smp.performance.length
        ? '检测数据已结构化（实测口径）：Hcj 14.2 kOe，低于目标 15 kOe'
        : '该样品暂无检测数据（实测口径）';
      out.viz = smp.performance.length ? perfCmpHTML(smp) : '';
      out.rows = smp.performance.length ? smp.performance.map(function (p) {
        return { k: p.key, v: p.value, flag: p.flag, src: p.src };
      }) : [{ k: '状态', v: '待送检；可先发工艺优化或仿真校验', flag: 'measured', src: '—' }];
      out.note = smp.performance.length ? '判读：Hcj 缺口 0.8 kOe；建议结合电镜结构数据与回火工艺复核（可走仿真校验辅助）。' : '';
    } else if (task.intent === 'image_analysis') {
      out.lead = smp.structure.length
        ? '电镜图像已分析（实测口径）：晶粒尺寸与晶界相结构化完成'
        : '该样品暂无任何电镜图像（实测口径）';
      out.viz = smp.structure.length ? grainBarHTML() : '';
      out.rows = smp.structure.length ? smp.structure.map(function (p) {
        return { k: p.key, v: p.value, flag: p.flag, src: p.src };
      }) : [{ k: '状态', v: '待送电镜表征', flag: 'measured', src: '—' }];
      out.note = smp.structure.length ? '判读：晶界相连续、孔洞率低，结构与性能表现一致。' : '';
    } else if (task.intent === 'sim_vasp' || task.intent === 'sim_mumax') {
      var tn = task.intent === 'sim_vasp' ? 'VASP 第一性原理' : 'mumax3 微磁学';
      out.lead = tn + ' 计算已登记（仿真口径，不作为真值）';
      out.rows = [
        { k: '计算输入', v: '按当前配方成分（' + (task.raw.length > 24 ? task.raw.slice(0, 24) + '…' : task.raw) + '）', flag: 'simulated', src: tn },
        { k: '计算结论', v: task.intent === 'sim_mumax' ? '畴结构 / 矫顽力机制分析已登记（示例）' : '相形成焓 / 元素占位倾向已登记（示例）', flag: 'simulated', src: tn }
      ];
      out.note = '仿真只用于辅助判断与方向选择；任何数值结论仍以检测 / 电镜实测为准。';
    } else {
      /* sample_query */
      out.lead = '样品 ' + sid + '（' + smp.title + '）档案已定位';
      out.rows = [
        { k: '阶段', v: smp.stage, flag: 'measured', src: '科研对象' },
        { k: '配方版本', v: smp.formula.version, flag: smp.formula.source, src: '科研对象' }
      ];
      out.note = '';
    }
    return out;
  }

  /* 历史 result 消息兜底（v3.4 前旧数据）：简版结论卡；kb_query 保留命中原文渲染 */
  function legacyResultHTML(task) {
    if (task.intent === 'kb_query') {
      var hits = kbRetrieve(task.raw);
      if (!hits.length) {
        return '<section class="card chat-card result-card"><div class="card-h"><h2>' + icon('book', 14)
          + ' 结论 · 知识检索问答</h2>' + tag('amber', '未命中') + '</div>'
          + '<div class="card-b">'
          + '<div class="res-lead">知识库（平台数据集 + 我的文档）中没有检索到相关内容，我不猜测、不编造。</div>'
          + '<div class="res-actions"><a class="btn btn-sm" href="' + esc(url('kb.html', {})) + '">'
          + icon('arrow', 12) + ' 打开知识库</a></div>'
          + '</div></section>';
      }
      var rowsHtml = hits.map(function (h) {
        return '<div class="result-row"><span class="rr-k mono">' + esc(h.doc.doc_id + '·' + h.section.sid) + '</span>'
          + '<span class="rr-v">' + esc(h.section.text) + '</span>' + truthFlagHTML('measured')
          + '<span class="rr-meta">' + esc(h.doc.type + ' · ' + h.doc.title) + '</span></div>';
      }).join('');
      var first = hits[0];
      return '<section class="card chat-card result-card"><div class="card-h"><h2>' + icon('book', 14)
        + ' 结论 · 知识检索问答</h2>' + tag('pass', '命中 ' + hits.length + ' 处') + '</div>'
        + '<div class="card-b">'
        + '<div class="res-lead">已检索平台数据集与我的文档，答案基于以下原文段落（非生成，引用可回溯）：</div>'
        + '<div class="res-rows">' + rowsHtml + '</div>'
        + '<div class="res-actions"><a class="btn btn-sm" href="'
        + esc(url('kb.html', { doc: first.doc.doc_id, hit: first.section.sid })) + '">'
        + icon('arrow', 12) + ' 打开知识库定位原文</a></div>'
        + '</div></section>';
    }
    var c = resultContent(task);
    return '<section class="card chat-card result-card"><div class="card-b">'
      + '<div class="res-lead">' + esc(c.lead) + '</div>'
      + '<div class="res-rows">' + c.rows.map(function (r) {
          return '<div class="result-row"><span class="rr-k">' + esc(r.k) + '</span>'
            + '<span class="rr-v">' + esc(r.v) + '</span>' + truthFlagHTML(r.flag)
            + '<span class="rr-meta">' + esc(r.src) + '</span></div>';
        }).join('') + '</div></div></section>';
  }

  /* v3.9b（黄总 2026-11-13）：留痕回执卡整体撤下——留痕唯一落点 = 科研对象证据时间轴，
   * 对话流不再追加回执卡（完成反馈由 toast 轻提示承担）；历史会话中残留的
   * kind:'trace' 消息不再渲染。 */

  /* 拒答卡：未识别不猜测不编造，给示例句 */
  function refuseHTML() {
    return '<section class="card chat-card"><div class="card-b">'
      + '<div class="callout is-warn"><div class="co-title">没有识别出任务意图</div>'
      + '<div class="co-desc">我不会猜测或编造。可以换一句话，或点下面的示例：</div></div>'
      + '<div class="chat-chips mt10">'
      + M.examples.slice(0, 4).map(function (x) {
        return '<button type="button" class="chat-chip" data-action="task-example" data-text="' + esc(x.text) + '">'
          + esc(x.text) + '</button>';
      }).join('')
      + '</div></div></section>';
  }

  /* 回答气泡（v3.4）：AI 的自然语言回答，流式渲染；完成后再带内嵌小可视化 */
  function answerHTML(msg, idx) {
    var task = msg.task || {};
    var viz = '';
    if (msg._streamed) {
      if (task.intent === 'perf_analysis') {
        var smp = findSample(task.slots && task.slots.sample_id || M.samples[0].sample_id);
        if (smp && smp.performance.length) { viz = perfCmpHTML(smp); }
      } else if (task.intent === 'image_analysis') {
        viz = grainBarHTML();
      }
    }
    return '<div class="ans-bubble" data-answer-mi="' + idx + '">'
      + '<div class="ans-text">' + (msg._streamed ? mdMini(task.answer || '') : '') + '</div>'
      + viz + '</div>';
  }

  /* 产物卡组：点击切右栏对应 tab（配方组 / 工艺包 / 检索），或跳科研对象 */
  function msgHTML(msg, idx) {
    if (msg.role === 'user') {
      return '<div class="chat-msg is-user">'
        + '<div class="chat-bubble-user">' + esc(msg.text) + '</div></div>';
    }
    var body = '';
    /* v3.27：产物跳转卡与历史回执卡一律不渲染（详情去工作台各 tab / 科研对象） */
    if (msg.kind === 'artifact' || msg.kind === 'trace') { return ''; }
    if (msg.kind === 'refuse') { body = refuseHTML(); }
    else if (msg.kind === 'answer') { body = answerHTML(msg, idx); }
    else if (msg.kind === 'result') { body = legacyResultHTML(msg.task); }
    else { body = planCardHTML(msg.task, idx); }  /* 'plan' 与遗留 'task' 统一渲染为过程卡 */
    return '<div class="chat-msg is-ai">' + body + '</div>';
  }

  /* v3.2：空态 = 单栏 hero；有内容 = 三栏工作台（对话流 + 底部输入条 + 右侧常驻面板） */
  function chatPageHTML() {
    if (!UI.msgs.length) {
      return '<div class="chat-page is-empty">' + heroHTML() + '</div>';
    }
    return '<div class="chat-page has-panel">'
      + '<div class="chat-flow" id="task-flow" aria-label="会话流" aria-live="polite"><div class="chat-col">'
      + UI.msgs.map(function (m, i) { return msgHTML(m, i); }).join('')
      + '</div></div>'
      /* v3.52：产物存在时显示结构化确认卡；v3.59：无确认卡时留空（老的存样品提示条已删净） */
      + (UI.confirmCard && !UI.confirmCard.done ? confirmCardHTML() : '')
      + composerHTML('is-dock')
      + '<div class="wp-split" data-action="panel-split" role="separator" aria-orientation="vertical"'
      + ' aria-label="拖拽调整工作台宽度" title="拖拽调整工作台宽度"></div>'
      + panelHTML()
      + '</div>';
  }

  /* v3.28（黄总 2026-11-17）：工作台宽度可拖拽，带固定极限——
   * 工作台 ≥ 360px、对话流 ≥ 520px（分隔条 6px 从内容宽度中扣除）；
   * v3.70：侧边文件树撤下（曾短暂提升到 470px），下限回 360px；
   * 拖过的值写 localStorage，刷新保留；视口变化时按新宽度重新夹逼。 */
  var SPLIT_W = 6, PANEL_MIN = 360, FLOW_MIN = 520;
  function panelBounds(containerW) {
    return { min: PANEL_MIN, max: Math.max(PANEL_MIN, containerW - FLOW_MIN - SPLIT_W) };
  }
  function applyPanelWidth(pg) {
    var page = pg || (function () { var r = $('page-root'); return r && r.querySelector('.chat-page.has-panel'); })();
    if (!page) { return; }
    if (!UI.panelW) { page.style.removeProperty('--panel-w'); return; }
    var b = panelBounds(page.clientWidth);
    UI.panelW = Math.min(b.max, Math.max(b.min, Math.round(UI.panelW)));
    page.style.setProperty('--panel-w', UI.panelW + 'px');
  }
  function onSplitPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) { return; }
    var handle = closestEl(e.target, '[data-action="panel-split"]');
    if (!handle) { return; }
    var first = handle.closest('.chat-page.has-panel');
    if (!first) { return; }
    e.preventDefault();
    var rect = first.getBoundingClientRect();
    var bounds = panelBounds(rect.width);
    handle.classList.add('is-dragging');
    document.body.classList.add('is-resizing-panel');
    function move(ev) {
      /* 执行流动画期间可能整页重绘，每次取当前页面节点，避免拖到已脱离 DOM 的旧节点 */
      var cur = $('page-root').querySelector('.chat-page.has-panel') || first;
      var w = rect.right - ev.clientX - SPLIT_W;
      UI.panelW = Math.min(bounds.max, Math.max(bounds.min, Math.round(w)));
      cur.style.setProperty('--panel-w', UI.panelW + 'px');
    }
    function up() {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
      handle.classList.remove('is-dragging');
      document.body.classList.remove('is-resizing-panel');
      lsSet(LS.panelW, UI.panelW);
      applyPanelWidth();
    }
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
  }

  function initIndex() {
    /* 重绘前保住输入框草稿与焦点：执行动画每步都会整页重绘，不打断用户输入；
     * v3.52：contenteditable 草稿存 innerHTML（含原子块） */
    var old = $('task-input');
    var hadFocus = !!(old && document.activeElement === old);
    if (old && ((old.innerText || '').trim() || old.querySelector('.mention-block'))) { UI._draft = old.innerHTML; }
    $('page-root').innerHTML = chatPageHTML();
    applyPanelWidth();
    var inp = $('task-input');
    if (inp && UI._draft) {
      inp.innerHTML = UI._draft;
      if (hadFocus) { caretToEnd(inp); }
    }
    if (inp && q('focus', '') === '1') { inp.focus(); }
  }

  /* v3.38（黄总 2026-11-17）：空点发送 → 逐轮吐出预置的「AI 自主编排」闭环演示。
   * 脚本取自固化会话 A（CDEMO-A），按 user 消息切轮；预置内容藏在数据层，界面不明文列出。
   * 每点一次「发送」（输入框为空）推进一轮，用户自己输入过则退出演示模式。 */
  function demoRounds() {
    var s = null;
    (M.demoSessions || []).forEach(function (x) { if (x.id === 'CDEMO-A') { s = x; } });
    if (!s) { return []; }
    var rounds = [], cur = null;
    s.msgs.forEach(function (m) {
      if (m.role === 'user') { cur = [m]; rounds.push(cur); }
      else if (cur) { cur.push(m); }
    });
    return rounds;
  }
  /* v3.74（黄总 2026-11-18）：演示也要「先整体发出用户消息 → AI 逐字打出回答」，不再整片糊上。
   * user 整句立现（先渲染一次）；plan 过程卡保持完成态直接显示（结构卡，不打字）；
   * 本轮 answer 注入为未流式（_streamed=false），boot 后由 playStreamQueue 串行逐字播放。 */
  function advanceDemo() {
    var rounds = demoRounds();
    if (!rounds.length) { toast('演示脚本暂不可用'); return; }
    if (UI.demoStep >= rounds.length) { toast('演示已完成 · 可新建对话重播'); return; }
    var round = rounds[UI.demoStep++];
    var userMsg = null, aiMsgs = [];
    round.forEach(function (m) {
      /* 深拷贝，避免演示注入污染固化会话静态数据 */
      var c = JSON.parse(JSON.stringify(m));
      if (c.role === 'user') { userMsg = c; } else { aiMsgs.push(c); }
    });
    if (userMsg) {
      UI.msgs.push(userMsg);
      persistChat();
      UI._scrollEnd = true;
      boot('index');   /* 用户消息先整体出现 */
    }
    window.setTimeout(function () {
      aiMsgs.forEach(function (c) {
        if (c.kind === 'answer') { c._streamed = false; }   /* 待流式：先渲染空壳 */
        UI.msgs.push(c);
      });
      /* 切到本轮主产物 tab，让配方/工艺/仿真结果可见 */
      var mainTask = null;
      aiMsgs.forEach(function (m) { if (m.task && !mainTask) { mainTask = m.task; } });
      if (mainTask) { UI.panelTab = mainTabFor(mainTask.intent); }
      /* v3.62：演示轮注入的配方/工艺产物同样上确认卡——boot 的恢复块只在首启跑一次，
         这里必须显式 seed，否则演示态确定性引导缺失 */
      seedConfirmCard();
      persistChat();
      UI._scrollEnd = true;
      boot('index');
      var idxs = [];
      UI.msgs.forEach(function (m, i) { if (m.kind === 'answer' && !m._streamed) { idxs.push(i); } });
      playStreamQueue(idxs);   /* AI 回答逐字打出 */
      toast('演示 ' + UI.demoStep + '/' + rounds.length + ' · ' + (userMsg ? userMsg.text : ''));
    }, 340);
  }
  function submitTaskText(text) {
    text = String(text || '').trim();
    if (!text) { advanceDemo(); return; }   /* v3.38：空发送 = 推进预置演示（非演示态则无脚本，提示在 advanceDemo 内） */
    UI.demoStep = -1;                        /* v3.38：用户真实输入 → 退出演示模式 */
    var task = matchIntent(text);
    UI.msgs.push({ role: 'user', text: text });
    if (task.intent === 'unknown') {
      UI.msgs.push({ role: 'ai', kind: 'refuse' });
      persistChat();
      UI._scrollEnd = true;
      boot('index');
      toast('未识别该指令：不猜测、不编造，请参考示例');
      return;
    }
    if (!intentEvalPass()) { toast('意图评测未通过：未执行，未写任何留痕'); return; }
    /* v3.27（黄总 2026-11-16）：追问不再重复过程卡与执行流——仅本会话首轮任务有 plan 卡；
     * 追问直接给流式回答（留痕照写）；产物卡同步撤下（详情看右栏工作台各 tab）。 */
    var isFollowUp = UI.msgs.some(function (m) { return m.kind === 'plan' && m.task && m.task.executed; })
      || UI.msgs.some(function (m) { return m.kind === 'answer' && m.task && m.task.executed; });
    task.stepStates = task.plan.map(function () { return 'pending'; });
    task.phase = 'planning';
    task.chipDone = 0;
    task.executed = false;
    if (isFollowUp) {
      task.stepStates = task.plan.map(function () { return 'done'; });
      task.phase = 'done';
      task.executed = true;
      var traces = runToolsForTask(task);
      UI.msgs.push({ role: 'ai', kind: 'answer', task: task, _traces: traces });
      UI._draft = '';
      /* v3.52：发送成功后清空挂载状态（原子块随输入框清空消失，块即上下文、生命周期一致） */
      UI.sampleSel = ''; UI.skillSel = ''; UI.mountTool = ''; UI.mountScp = '';
      persistChat();
      UI._scrollEnd = true;
      boot('index');
      startStream(UI.msgs.length - 1);
      return;
    }
    /* 首轮：plan 进入执行流（规划 → 逐步执行），chip 级动作逐个冒出 */
    UI.msgs.push({ role: 'ai', kind: 'plan', task: task });
    UI._draft = '';
    /* v3.52：同上，发送成功即清挂载状态 */
    UI.sampleSel = ''; UI.skillSel = ''; UI.mountTool = ''; UI.mountScp = '';
    persistChat();
    UI._scrollEnd = true;
    boot('index');
    autoRunPlan(UI.msgs.length - 1);
  }
  function scrollFlowEnd() {
    var tf = $('task-flow');
    if (tf) { window.setTimeout(function () { tf.scrollTop = tf.scrollHeight; }, 40); }
  }

  /* 轻量回答文本渲染：**加粗** 与换行（esc 后替换，零注入面） */
  function mdMini(text) {
    return esc(text).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
  }

  /* 执行完成后右栏自动切到的主产物 tab（v3.27：对话流不再放产物卡，详情在此查看） */
  function mainTabFor(intent) {
    return { formula_gen: 'formula', process_opt: 'process', kb_query: 'search',
      sim_vasp: 'sim_vasp', sim_mumax: 'sim_mumax' }[intent] || 'search';
  }

  /* 自动执行编排（借鉴智链 runAnalysis）：规划 → 步骤执行（chip 逐个冒出）→
   * 回答文本流式（v3.27 起无产物卡、无留痕回执卡）。刷新中断由 settleTailPlan 补完。
   * 追问由 submitTaskText 直接走流式回答，不重复过程卡。 */
  function autoRunPlan(mi) {
    var msg = UI.msgs[mi];
    if (!msg || !msg.task) { return; }
    var task = msg.task;
    window.clearTimeout(UI._planTimer);
    function paint() { persistChat(); UI._scrollEnd = true; boot('index'); }
    paint();
    UI._planTimer = window.setTimeout(function () {
      task.phase = 'planned'; paint();
      UI._planTimer = window.setTimeout(function () { task.phase = 'running'; runStep(0); }, 1000);
    }, 1000);

    function runStep(i) {
      if (i >= task.plan.length) { finishAll(); return; }
      task.stepStates[i] = 'doing';
      task.chipDone = 0;
      paint();
      var chips = normStep(task.plan[i]).chips || [];
      if (!chips.length) {
        UI._planTimer = window.setTimeout(function () {
          task.stepStates[i] = 'done'; task.chipDone = 0; paint(); runStep(i + 1);
        }, 700);
        return;
      }
      tickChip(i, chips);
    }
    function tickChip(i, chips) {
      UI._planTimer = window.setTimeout(function () {
        task.chipDone++;
        paint();
        if (task.chipDone >= chips.length) {
          UI._planTimer = window.setTimeout(function () {
            task.stepStates[i] = 'done'; task.chipDone = 0; paint(); runStep(i + 1);
          }, 380);
        } else {
          tickChip(i, chips);
        }
      }, 600);
    }
    function finishAll() {
      task.phase = 'done';
      task.executed = true;
      var traces = runToolsForTask(task);
      var amsg = { role: 'ai', kind: 'answer', task: task, _traces: traces };
      UI.msgs.push(amsg);
      persistChat();
      UI._scrollEnd = true;
      boot('index');
      startStream(UI.msgs.length - 1);
    }
  }

  /* 回答文本流式：直接操作 DOM（不走整页重绘），完成后追加产物卡（v3.9b 起无回执卡）
   * v3.74：加可选 onDone 回调——演示脚本一轮多条 answer 时串行逐条播放（playStreamQueue）。 */
  function startStream(mi, onDone) {
    var msg = UI.msgs[mi];
    if (!msg || msg.kind !== 'answer') { if (onDone) { onDone(); } return; }
    var plain = (msg.task && msg.task.answer) || '';
    var el = document.querySelector('[data-answer-mi="' + mi + '"] .ans-text');
    if (!el || !plain) { finalizeAnswer(msg); if (onDone) { onDone(); } return; }
    var i = 0;
    window.clearInterval(UI._streamTimer);
    UI._streamTimer = window.setInterval(function () {
      i += 2 + (Math.random() < 0.4 ? 1 : 0);
      el.innerHTML = mdMini(plain.slice(0, i));
      var flow = $('task-flow');
      if (flow) { flow.scrollTop = flow.scrollHeight; }
      if (i >= plain.length) {
        window.clearInterval(UI._streamTimer);
        finalizeAnswer(msg);
        if (onDone) { onDone(); }
      }
    }, 26);
  }
  /* 串行流式播放多条 AI 回答：演示脚本一轮可含多条 answer（综合解读 + 各仿真补充），
     一条打完再打下一条，避免整片糊上。 */
  function playStreamQueue(mis) {
    if (!mis.length) { return; }
    var mi = mis.shift();
    startStream(mi, function () { playStreamQueue(mis); });
  }
  function finalizeAnswer(msg) {
    if (msg._streamed) { return; }
    msg._streamed = true;
    /* v3.27（黄总）：对话流不再追加产物跳转卡——详情看右栏工作台各 tab */
    var traces = msg._traces || [];
    /* v3.9b：不再追加留痕回执卡；留痕已写入科研对象，完成反馈由 toast 承担 */
    UI.panelTab = mainTabFor(msg.task.intent);
    /* v3.52：配方 / 工艺产出后弹出确定性确认卡 */
    if (msg.task && (msg.task.intent === 'formula_gen' || msg.task.intent === 'process_opt')) {
      UI.confirmCard = { kind: msg.task.intent === 'formula_gen' ? 'formula' : 'process', idx: 0, done: false };
    }
    persistChat();
    UI._scrollEnd = true;
    boot('index');
    toast('执行完成：留痕 ' + traces.length + ' 条，全部挂到样品 ' + (msg.task.slots.sample_id || '—'));
  }

  /* 会话恢复补完：刷新中断时把尾部未完成的编排立即补齐（不重跑动画/流式） */
  function settleTailPlan() {
    var last = UI.msgs[UI.msgs.length - 1];
    if (!last) { return; }
    /* 情形一：plan 卡未完成（规划/执行中刷新）→ 补完 plan + 回答（v3.27 起无产物卡） */
    if (last.kind === 'plan' && last.task && !last.task.executed) {
      var t = last.task;
      t.stepStates = t.plan.map(function () { return 'done'; });
      t.phase = 'done';
      t.executed = true;
      var traces = runToolsForTask(t);
      var amsg = { role: 'ai', kind: 'answer', task: t, _traces: traces, _streamed: true };
      UI.msgs.push(amsg);
      UI.panelTab = mainTabFor(t.intent);
      persistChat();
      return;
    }
    /* 情形二：answer 未流完（流式中途刷新）→ 直接补全文本 */
    if (last.kind === 'answer' && !last._streamed) {
      last._streamed = true;
      UI.panelTab = mainTabFor(last.task.intent);
      persistChat();
    }
  }

  /* ==========================================================================
   * 7. 科研对象（sample.html）：以样品为单位的全量详情 + 数据闭环
   * ======================================================================== */
  /* 样品总览卡片 v3.52（黄总）三行结构：
     L1 名称=标题（右侧阶段 tag）；L2 配方（牌号 + 前 4 主成分）；L3 工序十段条 + 进度数；
     底行 = 编号（小号）+ 操作钮（详情/对话/重命名/删除）。
     十段式统一：段条以工序定义表（M.processStages 10 段）为骨架、按工序号取状态，
     缺工序一律 pending 补位——任何样品的段条都恰好十段、位次可对齐；
     段色：done 蓝 / current 亮绿呼吸（黄总：运行中深蓝不如绿色直观）/ warn 琥珀 / pending 灰。 */
  function sampleOverviewHTML() {
    /* v3.45（黄总）：撤「配方方案」档与新建——方案即数据不全的样品，已并入 M.samples。
       科研对象汇总 = 唯一列表；保留搜索 + 阶段筛选。 */
    var SEG_TXT = { done: '已完成', current: '进行中', pending: '待做', warn: '异常' };
    var TOTAL_STAGES = (M.processStages || []).length;
    var cards = M.samples.map(function (s) {
      var done = s.process.filter(function (p) { return p.state === 'done'; }).length;
      var warns = s.process.filter(function (p) { return p.state === 'warn'; }).length;
      /* v3.48d（黄总）：异常不以文字缀在工序数后，改由执行状态呈现——
         有异常工序的样品，阶段标签直接显示琥珀「异常拦截」（与实验中心同词） */
      var stTag = s.stage.indexOf('完成') >= 0 ? 'pass'
        : (s.stage.indexOf('执行中') >= 0 || s.stage.indexOf('进行') >= 0 ? 'run' : 'muted');
      var stTxt = s.stage;
      if (warns > 0) { stTag = 'amber'; stTxt = '异常拦截'; }
      /* 十段骨架：按工序号对齐取状态，缺位补 pending */
      var procByN = {};
      s.process.forEach(function (p) { procByN[p.n] = p; });
      var segs = (M.processStages || []).map(function (stg2) {
        var p = procByN[stg2.n] || { n: stg2.n, state: 'pending' };
        return '<span class="ov-seg is-' + esc(p.state) + '" title="'
          + esc(stg2.n + ' ' + (stg2.name || '') + ' · ' + (SEG_TXT[p.state] || p.state)) + '"></span>';
      }).join('');
      var total = TOTAL_STAGES || s.process.length;
      /* 配方行 v3.48c（黄总）：只展示主要素——NdFeB 基体四元 Nd/Pr/B/Fe，
         Dy/Co/Cu/Al 等掺杂不进卡（详情页有全量）；wt% 统一收尾，含 bal. 不追加单位 */
      var MAIN_EL = ['Nd', 'Pr', 'B', 'Fe'];
      var mains = (s.formula.comps || []).filter(function (c) { return MAIN_EL.indexOf(c[0]) >= 0; });
      var hasBal = mains.some(function (c) { return c[1] === 'bal.'; });
      var compsTxt = mains.map(function (c) { return c[0] + ' ' + c[1]; }).join(' / ')
        + (hasBal ? '' : ' wt%');
      /* v3.48b（黄总）：名称里已含牌号 → 卡片配方行不再重复显示；
         重命名后名称不含牌号时才在配方行补回，信息不丢 */
      var titleTxt = smpTitle(s);
      var showGrade = titleTxt.toUpperCase().indexOf(String(s.grade).toUpperCase()) < 0;
      return '<div class="card ov-card" data-action="smp-open" data-id="' + esc(s.sample_id) + '"'
        + ' data-stage="' + esc(s.stage) + '"'
        + ' data-text="' + esc((s.sample_id + ' ' + titleTxt + ' ' + s.grade + ' ' + s.formula.version).toLowerCase()) + '">'
        + '<div class="ov-top"><span class="ov-title">' + esc(titleTxt) + '</span>' + tag(stTag, stTxt) + '</div>'
        + '<div class="ov-formula">'
        + (showGrade ? '<span class="ov-grade">' + esc(s.grade) + '</span>' : '')
        + '<span class="ov-comps">' + esc(compsTxt) + '</span></div>'
        + '<div class="ov-prog"><div class="ov-bar">' + segs + '</div>'
        + '<span class="ov-pnum mono">' + done + '/' + total + ' 工序</span></div>'
        + '<div class="ov-ops"><span class="ov-id mono">' + esc(s.sample_id) + '</span>'
        + '<span class="ov-btns">'
        + '<button type="button" class="ov-op" data-action="smp-open" data-id="' + esc(s.sample_id) + '" title="查看详情">' + icon('arrow', 13) + '</button>'
        + '<button type="button" class="ov-op" data-action="smp-chat" data-id="' + esc(s.sample_id) + '" title="带此样品发起对话">' + icon('chat', 13) + '</button>'
        + '<button type="button" class="ov-op" data-action="smp-rename" data-id="' + esc(s.sample_id) + '" title="重命名">' + icon('edit', 13) + '</button>'
        + '<button type="button" class="ov-op ov-op-del" data-action="smp-del" data-id="' + esc(s.sample_id) + '"'
        + (s._user ? ' title="删除（留痕一并清除）"' : ' title="隐藏该内置示例（清空浏览器数据可恢复）"') + '>'
        + icon('trash', 13) + '</button>'
        + '</span></div></div>';
    }).join('');
    /* 阶段筛选选项：从现有样品去重生成，跟随数据演进 */
    var stages = [];
    M.samples.forEach(function (s) { if (stages.indexOf(s.stage) < 0) { stages.push(s.stage); } });

    /* v3.45：搜索 + 阶段筛选，与页头同一行；新建已撤 */
    var tools = '<span class="obj-tools">'
      + '<select class="ov-filter" id="ov-filter" data-action="ov-filter" aria-label="按阶段筛选">'
      + '<option value="">全部阶段</option>'
      + stages.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('')
      + '</select>'
      + '<input type="text" class="kb-search" id="ov-search" data-action="ov-search"'
      + ' placeholder="搜索样品 ID / 名称 / 牌号…" aria-label="搜索">'
      + '</span>';
    return '<div class="page-head"><div><h1>科研对象</h1></div>' + tools + '</div>'
      + '<div class="ov-grid">' + cards + '</div>';
  }
  /* 科研对象汇总搜索+筛选：纯 DOM 显隐（卡片 data-stage/data-text） */
  function ovApplyFilter() {
    var term = String(($('ov-search') || {}).value || '').trim().toLowerCase();
    var stage = String(($('ov-filter') || {}).value || '');
    document.querySelectorAll('.ov-grid .ov-card').forEach(function (card) {
      var okStage = !stage || card.getAttribute('data-stage') === stage;
      var okTerm = !term || (card.getAttribute('data-text') || '').indexOf(term) >= 0;
      card.style.display = (okStage && okTerm) ? '' : 'none';
    });
  }
  /* v3.13（黄总）：样品台账侧栏删除——浏览/选择职责已归总览预览页，
     详情页单栏全宽，换样回总览；台账相关 CSS（.sample-side/.sample-list 等）一并清理。 */
  function kvRows(list) {
    if (!list.length) { return '<div class="small muted">暂无记录</div>'; }
    return list.map(function (r) {
      return '<div class="result-row"><span class="rr-k">' + esc(r.key) + '</span>'
        + '<span class="rr-v mono">' + esc(r.value) + '</span>' + truthFlagHTML(r.flag)
        + '<span class="rr-meta">' + esc(r.src) + (r.tool_call_id ? ' · ' + esc(r.tool_call_id) : '') + '</span></div>';
    }).join('');
  }

  /* ==========================================================================
   * 7b. 电镜分析模块（6.4 输出）：左数据 + 右图片；图片可切换叠加层
   *     晶粒几何按种子程序化生成（jittered grid + LCG），统计/直方图/明细全部同源
   * ======================================================================== */
  function lcg(seed) {
    var s = seed >>> 0;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  var EM_W = 520, EM_H = 380, EM_PX = 0.085;   /* 画布 px 与标定 μm/px（与 mock 一致） */
  function emGrains(em) {
    if (em._grains) { return em._grains; }
    var rnd = lcg(em.seed);
    var cols = 8, rows = 6, cw = EM_W / cols, ch = EM_H / rows;
    var g = [];
    for (var r = 0; r < rows && g.length < em.grainN; r++) {
      for (var c = 0; c < cols && g.length < em.grainN; c++) {
        var rad = (Math.min(cw, ch) / 2) * (0.98 + rnd() * 0.30);   /* 紧密相接：半径贴近格子半宽 */
        g.push({
          x: c * cw + cw / 2 + (rnd() - 0.5) * cw * 0.42,
          y: r * ch + ch / 2 + (rnd() - 0.5) * ch * 0.42,
          r: rad, rot: rnd() * Math.PI, sq: 0.82 + rnd() * 0.18,    /* sq = 扁率，各层统一 */
          gray: 100 + Math.floor(rnd() * 68)
        });
      }
    }
    g.forEach(function (p, i) {
      p.id = 'G-' + (i + 1);
      p.dEA = p.r * 2 * EM_PX;                 /* 等效圆面积直径 μm */
      p.area = Math.PI * p.r * p.r * EM_PX * EM_PX;
      p.peri = 2 * Math.PI * p.r * EM_PX;
    });
    em._grains = g;
    return g;
  }
  function emMean(a, f) { var s = 0; for (var i = 0; i < a.length; i++) { s += f(a[i]); } return s / a.length; }
  function emStd(a, m, f) { var s = 0; for (var i = 0; i < a.length; i++) { var d = f(a[i]) - m; s += d * d; } return Math.sqrt(s / a.length); }

  function drawEM(cv, overlay, em) {
    var ctx = cv.getContext('2d');
    var grains = emGrains(em);
    ctx.clearRect(0, 0, EM_W, EM_H);
    ctx.fillStyle = '#43464d'; ctx.fillRect(0, 0, EM_W, EM_H);        /* 基底 = 晶界相暗色 */
    grains.forEach(function (p) {                                     /* 晶粒本体内缩，缝隙即晶界 */
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r - 2.2, (p.r - 2.2) * p.sq, p.rot, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(' + p.gray + ',' + p.gray + ',' + (p.gray + 6) + ')'; ctx.fill();
    });
    var rnd = lcg(em.seed + 7);                /* 噪点纹理 */
    for (var i = 0; i < 2400; i++) {
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,255,255,' + rnd() * 0.07 + ')' : 'rgba(0,0,0,' + rnd() * 0.09 + ')';
      ctx.fillRect(rnd() * EM_W, rnd() * EM_H, 1, 1);
    }
    if (overlay === 'grain') {                 /* 晶粒轮廓：亮描边 */
      grains.forEach(function (p) {
        ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r - 2.2, (p.r - 2.2) * p.sq, p.rot, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56,189,248,.95)'; ctx.lineWidth = 1.2; ctx.stroke();
      });
    } else if (overlay === 'gb') {             /* 晶界轮廓：富 Nd 相高亮（琥珀） */
      grains.forEach(function (p) {
        ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r, p.r * p.sq, p.rot, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(217,119,6,.9)'; ctx.lineWidth = 2.6; ctx.stroke();
      });
    } else if (overlay === 'graph') {          /* 晶粒图网络：节点 + 近邻连边 */
      for (var a = 0; a < grains.length; a++) {
        for (var b = a + 1; b < grains.length; b++) {
          var p = grains[a], q2 = grains[b];
          var d = Math.hypot(p.x - q2.x, p.y - q2.y);
          if (d < (p.r + q2.r) * 1.35) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q2.x, q2.y);
            ctx.strokeStyle = 'rgba(37,99,235,.5)'; ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      grains.forEach(function (p) {
        ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#2563EB'; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
      });
    }
    /* 比例尺 5 μm */
    var bar = 5 / EM_PX;
    ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fillRect(EM_W - bar - 18, EM_H - 26, bar, 4);
    ctx.font = '12px ui-monospace, monospace'; ctx.textAlign = 'right';
    ctx.fillText('5 μm', EM_W - 18, EM_H - 34);
  }

  function drawHist(cv, grains) {
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height, BINS = 9;
    var ds = grains.map(function (p) { return p.dEA; });
    var mn = Math.min.apply(null, ds), mx = Math.max.apply(null, ds), span = (mx - mn) || 1;
    var cnt = []; for (var i = 0; i < BINS; i++) { cnt.push(0); }
    ds.forEach(function (d) { var k = Math.min(BINS - 1, Math.floor((d - mn) / span * BINS)); cnt[k]++; });
    var top = Math.max.apply(null, cnt);
    ctx.clearRect(0, 0, W, H);
    var bw = (W - 30) / BINS;
    for (var b2 = 0; b2 < BINS; b2++) {
      var h = (H - 34) * (cnt[b2] / top);
      ctx.fillStyle = 'rgba(37,99,235,.75)';
      ctx.fillRect(24 + b2 * bw, H - 22 - h, bw - 3, h);
    }
    ctx.fillStyle = '#64748B'; ctx.font = '10px ui-monospace, monospace'; ctx.textAlign = 'center';
    ctx.fillText(mn.toFixed(1), 24, H - 8); ctx.fillText(mx.toFixed(1) + ' μm', W - 14, H - 8);
    ctx.textAlign = 'left'; ctx.fillText('dEA 分布 · n=' + grains.length, 24, 12);
  }

  var EM_OV = [['raw', '原始图像'], ['grain', '晶粒轮廓'], ['gb', '晶界轮廓'], ['graph', '图网络']];
  function emHTML(smp) {
    var em = smp.em;
    if (!em) {
      return '<section class="card mt14"><div class="card-h"><h2>' + icon('image', 14) + ' 电镜分析</h2>'
        + tag('muted', '暂无') + '</div><div class="card-b"><div class="small muted">暂无电镜数据：样品尚未到检测环节，人工测试后可上传登记。</div>'
        + '<div class="mt6"><button type="button" class="btn btn-sm" data-action="smp-upload-open" data-id="' + esc(smp.sample_id) + '">'
        + icon('upload', 13) + ' 上传电镜数据</button></div></div></section>';
    }
    var grains = emGrains(em);
    var mean = emMean(grains, function (p) { return p.dEA; });
    var std = emStd(grains, mean, function (p) { return p.dEA; });
    var detail = grains.slice(0, 5).map(function (p) {
      return '<tr><td class="mono">' + p.id + '</td><td class="mono">(' + (p.x * EM_PX).toFixed(1) + ', ' + (p.y * EM_PX).toFixed(1) + ')</td>'
        + '<td class="mono">' + p.dEA.toFixed(2) + '</td><td class="mono">' + p.area.toFixed(1) + '</td><td class="mono">' + p.peri.toFixed(1) + '</td></tr>';
    }).join('');
    return '<section class="card mt14"><div class="card-h"><h2>' + icon('image', 14) + ' 电镜分析</h2>'
      + '<button type="button" class="ov-op" data-action="smp-upload-open" data-id="' + esc(smp.sample_id) + '"'
      + ' title="重新上传电镜数据（替换现有）">' + icon('upload', 13) + '</button></div><div class="card-b">'
      + '<div class="em-grid">'
      + '<div class="em-data">'
      + '<div class="em-stats">'
      + '<div class="em-stat"><b>' + grains.length + '</b><span>晶粒数量（个）</span></div>'
      + '<div class="em-stat"><b>' + mean.toFixed(1) + ' μm</b><span>平均晶粒尺寸 dEA</span></div>'
      + '<div class="em-stat"><b>' + esc(em.gbFraction) + '</b><span>晶界相体积分数</span></div>'
      + '<div class="em-stat"><b>' + esc(em.mainOri) + '</b><span>主取向角</span></div>'
      + '</div>'
      + '<div class="em-hist"><canvas id="em-hist" width="300" height="120"></canvas></div>'
      + '<div class="em-morph">' + em.morph.map(function (m) { return '<span class="em-chip">' + esc(m[0]) + ' <b>' + esc(m[1]) + '</b></span>'; }).join('')
      + '<span class="em-chip">尺寸离散度 σ <b>' + std.toFixed(2) + ' μm</b></span>'
      + '<span class="em-chip">三角形晶界相 <b>' + esc(em.triGb) + '</b></span></div>'
      + '<table class="tbl em-tbl"><thead><tr><th>晶粒</th><th>质心 (μm)</th><th>dEA (μm)</th><th>面积 (μm²)</th><th>周长 (μm)</th></tr></thead>'
      + '<tbody>' + detail + '</tbody></table>'
      + '<div class="small muted mt6">明细示前 5 个晶粒，完整 ' + grains.length + ' 行可导出 CSV（演示）。结论：' + esc(em.note)
      + '（' + esc(em.src) + (em.tool_call_id ? ' · ' + esc(em.tool_call_id) : '') + '）</div>'
      + '</div>'
      + '<div class="em-side">'
      + '<div class="em-specs">'
      + '<div><span>样品</span><b>' + esc(em.sample_no) + '</b></div>'
      + '<div><span>电镜</span><b>' + esc(em.scope) + '</b></div>'
      + '<div><span>倍率</span><b>' + esc(em.mag) + '</b></div>'
      + '<div><span>像素当量</span><b>' + esc(em.px) + '</b></div>'
      + '<div class="em-specs-full"><span>视场</span><b>' + esc(em.view) + '</b></div>'
      + '</div>'
      + '<div class="em-view">'
      + '<div class="em-tools">' + EM_OV.map(function (o, i) {
        return '<button type="button" class="em-ov' + (i === 0 ? ' active' : '') + '" data-action="em-overlay" data-ov="' + o[0] + '">' + o[1] + '</button>';
      }).join('') + '</div>'
      + '<canvas id="em-canvas" width="' + EM_W + '" height="' + EM_H + '"></canvas>'
      + '</div>'
      + '</div>'
      + '</div></div></section>';
  }
  function drawEmAll() {
    var smp = currentSample();
    if (!smp.em) { return; }
    var cv = $('em-canvas'); if (cv) { drawEM(cv, 'raw', smp.em); }
    var hv = $('em-hist'); if (hv) { drawHist(hv, emGrains(smp.em)); }
  }
  /* 仿真任务卡（v3.10，黄总：档案须可复现——看结论更要知道当时咋算的）：
     六段式 = 结论 / 输入参数（带来源标注，不挂口径徽标）/ 运行脚本（v3.19 起独立专区：
     顶栏文件名+引擎+行数+复制、行号+语法高亮代码体、底部集群运行命令行，常显不折叠）/
     输出产物清单 / 任务信息（集群 · 版本 · 时间 · 留痕号）；task=null 时空态。 */
  /* 仿真脚本轻量高亮：逐行处理——先 esc，再按引擎拆注释（mx3 用 //、INCAR 用 #；
     v3.25 增 V-REP=Lua（-- 注释）/ Isaac=Python（# 注释）），
     代码段只高亮数字与引擎关键字，避免噪声；行号独立 span，CSS user-select:none 不挡复制。 */
  function hlSimCode(text, engine) {
    var KW = engine === 'mumax3'
      ? /\b(SetGridSize|SetCellSize|DefRegion|setgeom|saveas|save|snapshot|tablesave|TableAdd|relax|minimize|print|for|vector|cuboid|Uniform|transl|sub)\b/g
      : engine === 'vrep'
        ? /\b(sim|simIK|getObjectHandle|generatePath|checkCollision|loadScene|assert|print|local|function|end|return)\b/g
        : engine === 'isaac'
          ? /\b(from|import|World|DynamicCuboid|reset|step|get_world_pose|print|for|in|range)\b/g
          : /\b(SYSTEM|PREC|ENCUT|ISMEAR|SIGMA|IBRION|NSW|ISIF|KPOINTS|LREAL|LWAVE|LCHARG)\b/g;
    var commentMark = engine === 'vrep' ? '--' : (engine === 'mumax3' ? '//' : '#');
    return text.split('\n').map(function (line, i) {
      var l = esc(line);
      var ci = l.indexOf(commentMark);
      var code = ci >= 0 ? l.slice(0, ci) : l;
      var comment = ci >= 0 ? l.slice(ci) : '';
      code = code.replace(KW, '<span class="tk-f">$1</span>');
      code = code.replace(/(^|[^\w.])((?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/g, '$1<span class="tk-n">$2</span>');
      if (comment) { comment = '<span class="tk-c">' + comment + '</span>'; }
      return '<span class="ssp-ln">' + (i + 1) + '</span>' + code + comment;
    }).join('\n');
  }
  /* 仿真事件流投影（v3.27，黄总：对话里的仿真如何把确定信息同步进档案）：
     append-only 事件流 → 当前视图。纯函数，不改源数据。
       · 失败事件不入流（就当没有）；
       · 同 run_key = 同一次输入的重复执行 → 幂等合并，只留最新一条，记 dupCount；
       · parent 指向别的 run_id = 参数微调的新版本 → 串版本链，取最新为 current；
       · 输出 { current, versions, dupRuns, runs }，versions 按时间升序、current 为末条。
     LS 运行时事件（对话归档来的）叠加在 M.simEvents 之上。 */
  function allSimEvents() {
    return (M.simEvents || []).concat(lsJson(LS.simEvents) || []);
  }
  function projectSimEvents(sampleId, engine) {
    var evs = allSimEvents().filter(function (e) {
      return e.sample_id === sampleId && e.engine === engine && e.status === 'succeeded';
    });
    if (!evs.length) { return null; }
    /* 1) 幂等：同 run_key 合并，保留最新 ts 那条 */
    var byKey = {};
    evs.forEach(function (e) {
      var k = e.run_key;
      if (!byKey[k] || e.ts > byKey[k].ts) { byKey[k] = e; }
    });
    var uniq = Object.keys(byKey).map(function (k) { return byKey[k]; });
    var dupRuns = evs.length - uniq.length;
    /* 2) 版本链：parent 指向的 run_id 在同一组里 → 作为后继挂到那条链尾 */
    var chains = [];
    uniq.forEach(function (e) {
      var parent = e.parent ? chains.filter(function (c) { return c[c.length - 1].run_id === e.parent; })[0] : null;
      if (parent) { parent.push(e); } else { chains.push([e]); }
    });
    /* 3) 取最长（最新演进）链为当前视图；其余链按首条时间排作并列历史 */
    chains.sort(function (a, b) {
      if (b.length !== a.length) { return b.length - a.length; }
      return b[b.length - 1].ts.localeCompare(a[a.length - 1].ts);
    });
    var cur = chains[0];
    var versions = cur.slice().sort(function (a, b) { return a.ts.localeCompare(b.ts); });
    var proj = {
      current: versions[versions.length - 1].task,
      currentEvent: versions[versions.length - 1],
      versions: versions,
      dupRuns: dupRuns,
      runs: evs.length
    };
    /* 用户在运行历史里点选了历史版 → 覆盖 current 供查看（不改事件流本身） */
    var picked = UI.simView && UI.simView[engine];
    if (picked) {
      var hit = versions.filter(function (e) { return e.eid === picked; })[0];
      if (hit) { proj.current = hit.task; proj.currentEvent = hit; }
    }
    return proj;
  }
  function switchSimVersion(eid) {
    var smp = currentSample();
    ['VASP', 'mumax3'].forEach(function (eng) {
      var p = projectSimEvents(smp.sample_id, eng);
      if (p && p.versions.some(function (e) { return e.eid === eid; })) {
        UI.simView[eng] = eid;   /* select 选中即目标版，不做 toggle */
      }
    });
    if (q('tab', '') !== 'sim') { history.replaceState(null, '', url('sample.html', { sample_id: smp.sample_id, tab: 'sim' })); }
    initSample();
  }
  function simTaskCard(cfg) {
    var t = cfg.task;
    if (!t) {
      return '<section class="card sim-card"><div class="card-h"><h2>' + icon(cfg.icon, 14) + ' ' + cfg.title + '</h2>'
        + '</div><div class="card-b"><div class="small muted">' + esc(cfg.emptyNote) + '</div></div></section>';
    }
    /* 结论行只留 指标+值（v3.22 起撤逐行 simulated 徽标与重复来源行）。 */
    var resRows = (t.results || []).map(function (r) {
      return '<div class="result-row"><span class="rr-k">' + esc(r.key) + '</span>'
        + '<span class="rr-v mono">' + esc(r.value) + '</span></div>';
    }).join('');
    var inRows = (t.inputs || []).map(function (r) {
      return '<div class="result-row"><span class="rr-k">' + esc(r.key) + '</span>'
        + '<span class="rr-v mono">' + esc(r.value) + '</span>'
        + (r.src ? '<span class="rr-meta">' + esc(r.src) + '</span>' : '') + '</div>';
    }).join('');
    /* 结果图表区（v3.25）：任务带 chart 配置时渲染 canvas 曲线（退磁曲线等），
       canvas id 挂任务号，渲染入口 drawSimCharts()。 */
    var chartBlock = t.chart
      ? '<div class="sim-sec">结果图表</div>'
        + '<div class="sim-chart"><canvas id="simchart-' + esc(t.job ? t.job.id : cfg.title) + '"></canvas>'
        + '<div class="sc-legend"><span class="sc-lg"><i class="sc-l sim"></i>' + esc(t.chart.simLabel || '仿真') + '</span>'
        + '<span class="sc-lg"><i class="sc-l meas"></i>' + esc(t.chart.measLabel || '实测') + '</span></div>'
        + (t.chart.note ? '<div class="small muted sc-note">' + esc(t.chart.note) + '</div>' : '')
        + '</div>'
      : '';
    var scriptBlock = '';
    if (t.script) {
      UI.simScripts = UI.simScripts || {};
      UI.simScripts[t.script.name] = t.script.text;
      scriptBlock = '<div class="sim-sec">运行脚本</div>'
        + '<div class="ssp">'
        + '<div class="ssp-head"><span class="ssp-file">' + icon('file', 12) + ' ' + esc(t.script.name) + '</span>'
        + (t.script.engine ? tag('info', esc(t.script.engine)) : '')
        + '<span class="ssp-meta">' + t.script.text.split('\n').length + ' 行</span>'
        + '<button type="button" class="ssp-btn" data-action="copy-script" data-key="' + esc(t.script.name) + '">复制脚本</button>'
        + '</div>'
        + '<div class="ssp-body"><pre class="ssp-code">' + hlSimCode(t.script.text, t.script.engine) + '</pre></div>'
        + (t.script.run
          ? '<div class="ssp-run"><span class="ssp-run-k">提交运行</span><code>$ ' + esc(t.script.run) + '</code></div>'
          : '')
        + '</div>';
    }
    /* 输出产物 = 文件清单（v3.22，黄总：产物是文件不是纯文字，可点击下载）：
       content 存 UI.simFiles 注册表，整行点击触发 Blob 下载；大小按内容字节实时算。 */
    UI.simFiles = UI.simFiles || {};
    var outRows = (t.outputs || []).map(function (o) {
      if (o.content) { UI.simFiles[o.name] = o.content; }
      var size = o.content ? fmtSize(o.content) : '';
      return '<div class="sim-file' + (o.content ? '" data-action="sim-dl" data-key="' + esc(o.name) + '" title="点击下载 ' + esc(o.name) : ' is-static"') + '>'
        + icon('file', 13)
        + '<span class="sf-name mono">' + esc(o.name) + '</span>'
        + '<span class="sf-desc">' + esc(o.desc) + '</span>'
        + (size ? '<span class="sf-size mono">' + size + '</span>' : '')
        + (o.content ? '<span class="sf-dl">' + icon('dl', 13) + '</span>' : '')
        + '</div>';
    }).join('');
    /* 版本切换控件（v3.35，黄总：切换只是卡头的一个控件，不在内容区铺详情）：
       多版本时卡头放一个 select，列出各版本（run_id 尾号 + 参数标签），选中当前版；
       同输入幂等合并的数量收进 title，内容区不再渲染运行历史块。 */
    var proj = cfg.proj;
    var verSel = '';
    if (proj && proj.versions.length > 1) {
      var opts = proj.versions.map(function (e) {
        var label = e.run_key.split('|').pop();
        return '<option value="' + esc(e.eid) + '"' + (e === proj.currentEvent ? ' selected' : '') + '>'
          + esc(e.ts.slice(5) + ' · ' + label) + '</option>';
      }).join('');
      var tip = '共 ' + proj.runs + ' 次运行' + (proj.dupRuns ? '（' + proj.dupRuns + ' 次相同已合并）' : '');
      verSel = '<select class="sim-ver-sel" data-action="sim-ver-sel" title="' + esc(tip) + '">' + opts + '</select>';
    }
    /* 执行时间挪到卡头（v3.37，黄总：减少左侧内容区占用），紧凑显示 mm-dd hh:mm，完整值入 title */
    var timeTag = t.job ? '<span class="sim-time" title="' + esc(t.job.ts) + '">' + esc(t.job.ts.slice(5)) + '</span>' : '';
    return '<section class="card sim-card"><div class="card-h"><h2>' + icon(cfg.icon, 14) + ' ' + cfg.title + '</h2>'
      + (t.job ? tag('muted', '任务 ' + t.job.id) : '') + timeTag + verSel + '</div>'
      + '<div class="card-b"><div class="sim-cols">'
      + '<div class="sim-main">'
      + (resRows || '<div class="small muted">暂无记录</div>')
      + chartBlock
      + '<div class="sim-sec">输入参数</div>' + (inRows || '<div class="small muted">暂无记录</div>')
      + '<div class="sim-sec">输出产物</div>' + (outRows || '<div class="small muted">暂无记录</div>')
      + '</div>'
      + '<div class="sim-side">' + scriptBlock + '</div>'
      + '</div></div></section>';
  }
  /* 退磁曲线图（v3.25，黄总：mumax3 会抛出退磁曲线这类图表，档案里得画出来）：
     sim 曲线从 outputs[simFrom].content 解析（与下载文件同源，改文件图跟着变）；
     meas 来自 chart.meas（实测采样）。第二象限：x = B_ext(−7→0 T)，y = M/Ms；
     零线加粗，Hcj 过零点线性插值并标注。 */
  function parseTablePts(txt) {
    var pts = [];
    txt.split('\n').forEach(function (line) {
      var l = line.trim();
      if (!l || l.charAt(0) === '#') { return; }
      var tk = l.split(/\s+/);
      var b = parseFloat(tk[0]), mz = parseFloat(tk[4]);
      if (isFinite(b) && isFinite(mz)) { pts.push([b, mz]); }
    });
    return pts;
  }
  function drawDemagChart(cv, task) {
    var src = null;
    (task.outputs || []).forEach(function (o) { if (o.name === task.chart.simFrom) { src = o; } });
    var sim = src && src.content ? parseTablePts(src.content) : [];
    if (!sim.length || !cv.parentNode) { return; }
    var w = cv.parentNode.clientWidth;
    if (!w || w < 60) { return; }   /* 隐藏 tab 里宽度为 0，切 tab 时 drawSimCharts 会重绘 */
    var h = 250;
    var dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    var ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.font = '10px ui-monospace, Consolas, monospace';
    var L = 40, R = 14, T = 14, B = 30, iw = w - L - R, ih = h - T - B;
    var xMin = -7, xMax = 0.2, yMin = -1.15, yMax = 1.15;
    function X(v) { return L + (v - xMin) / (xMax - xMin) * iw; }
    function Y(v) { return T + (yMax - v) / (yMax - yMin) * ih; }
    /* 网格与刻度 */
    ctx.lineWidth = 1; ctx.strokeStyle = '#DBEAFE'; ctx.fillStyle = '#64748B'; ctx.textAlign = 'center';
    for (var gx = -7; gx <= 0; gx++) {
      ctx.beginPath(); ctx.moveTo(X(gx), T); ctx.lineTo(X(gx), T + ih); ctx.stroke();
      ctx.fillText(String(gx), X(gx), h - 17);
    }
    ctx.textAlign = 'right';
    [-1, -0.5, 0, 0.5, 1].forEach(function (gy) {
      ctx.beginPath(); ctx.moveTo(L, Y(gy)); ctx.lineTo(L + iw, Y(gy)); ctx.stroke();
      ctx.fillText(String(gy), L - 5, Y(gy) + 3);
    });
    ctx.strokeStyle = '#94A3B8';
    ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(L + iw, Y(0)); ctx.stroke();
    ctx.textAlign = 'right'; ctx.fillText('B_ext (T)', L + iw, h - 4);
    ctx.textAlign = 'left'; ctx.fillText('M/Ms', L, T - 5);
    /* 曲线：实测虚线 + 仿真实线带采样点 */
    function line(pts, color, dash, lw, dots) {
      ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.setLineDash(dash || []);
      ctx.beginPath();
      pts.forEach(function (p, i) { if (i === 0) { ctx.moveTo(X(p[0]), Y(p[1])); } else { ctx.lineTo(X(p[0]), Y(p[1])); } });
      ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
      if (dots) {
        ctx.fillStyle = color;
        pts.forEach(function (p) { ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 2.2, 0, Math.PI * 2); ctx.fill(); });
      }
    }
    line(task.chart.meas || [], '#0F766E', [5, 4], 1.8, false);
    line(sim, '#1E40AF', null, 2, true);
    /* Hcj 过零点标注 */
    function hcj(pts) {
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i];
        if (a[1] >= 0 && b[1] <= 0 && a[1] !== b[1]) { return a[0] - a[1] * (b[0] - a[0]) / (b[1] - a[1]); }
      }
      return null;
    }
    function mark(v, color, label, dy) {
      if (v === null) { return; }
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(X(v), Y(0), 3, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = 'left';
      ctx.fillText(label, X(v) + 6, Y(0) + dy);
    }
    var hs = hcj(sim), hm = hcj(task.chart.meas || []);
    mark(hs, '#1E40AF', 'Hcj ≈ ' + Math.abs(hs).toFixed(1) + ' T', 12);
    mark(hm, '#0F766E', 'Hcj ' + Math.abs(hm).toFixed(2) + ' T', -5);
  }
  function drawSimCharts(smp) {
    var projs = [projectSimEvents(smp.sample_id, 'VASP'), projectSimEvents(smp.sample_id, 'mumax3')];
    projs.forEach(function (p) {
      var t = p && p.current;
      if (!t || !t.chart) { return; }
      var cv = $('simchart-' + (t.job ? t.job.id : ''));
      if (cv) { drawDemagChart(cv, t); }
    });
  }
  function sampleDetailHTML(smp) {
    var evs = allEvidence().filter(function (e) { return e.sample_id === smp.sample_id; });
    var comps = smp.formula.comps.map(function (c) {
      return '<tr><td class="mono">' + esc(c[0]) + '</td><td class="mono">' + esc(c[1]) + (c[1] === 'bal.' ? '' : ' wt%') + '</td></tr>';
    }).join('');
    /* 制备流程（v3.32 黄总）：一行一步的小列表——序号 + 环节名 + 实测参数 + 轻量状态。
       撤「可同步字段」（教学式字段说明非真数据）与 hover 环节定义；10 步一屏看全。
       异常工序保留琥珀说明（质量拦截真值），进行中/异常才醒目，已完成仅细勾。 */
    var stageByN = {};
    (M.processStages || []).forEach(function (s) { stageByN[s.n] = s; });
    var PF_STATE = { done: '已完成', current: '进行中', pending: '待做', warn: '异常' };
    var proc = smp.process.map(function (p) {
      var stg = stageByN[p.n] || { name: p.step || ('工序 ' + p.n) };
      var st = p.state || 'done';
      var mark = st === 'done' ? icon('check', 12)
        : (st === 'warn' ? tag('amber', '异常') : (st === 'current' ? tag('run', '进行中') : ''));
      return '<li class="pf-node is-' + st + '">'
        + '<span class="pl-n">' + esc(p.n) + '</span>'
        + '<span class="pf-step">' + esc(stg.name) + '</span>'
        + '<span class="pf-param mono">' + esc(p.param) + '</span>'
        + '<span class="pf-mark">' + mark + '</span>'
        + (p.warn ? '<div class="pf-warn">' + icon('warn', 12) + ' ' + esc(p.warn) + '</div>' : '')
        + '</li>';
    }).join('');
    var evHtml = evs.length ? evs.map(function (e) {
      return '<li><div class="ev-ts">' + esc(e.ts) + '</div>'
        + '<div><b>' + esc(e.action) + '</b> ' + truthFlagHTML(e.truth_flag) + '</div>'
        + '<div class="small muted">' + esc(e.tool_call_id) + ' · ' + esc(e.source) + '</div></li>';
    }).join('') : '<li><div class="small muted">暂无留痕</div></li>';
    /* Tab 分区 v3.10（黄总 2026-11-13：仿真独立成区 + 任务卡可复现五段式）：
       v3.19（黄总 2026-11-16）：仿真脚本升级为「运行脚本」专区——常显面板（顶栏/高亮代码体/运行命令行），
       不再折叠在 details 里；mumax3 的 .mx3 与 VASP 的 INCAR 同一模板。
       样品数据 = 前置基本参数（配方 + 制备流程）；
       实验数据 = 后置实测产出（电镜分析 + 性能参数 + 本征参数），纯 measured；
       仿真数据 = 计算产物任务卡（VASP + mumax3：结论/输入参数/运行脚本/输出产物/任务信息），纯 simulated；
       留痕 = 证据时间轴。三个数据区一一对应输入记录 / 实测真值 / 仿真产物三种口径。
       旧深链 ?tab=intr|perf 归并入 exp。 */
    var curTab = q('tab', 'base');
    if (curTab === 'intr' || curTab === 'perf') { curTab = 'exp'; }
    if (curTab !== 'base' && curTab !== 'exp' && curTab !== 'sim' && curTab !== 'trace') { curTab = 'base'; }
    var TABS = [['base', '样品数据'], ['exp', '实验数据'], ['sim', '仿真数据'], ['trace', '留痕']];
    function pane(k, inner) {
      return '<div class="samp-pane" data-pane="' + k + '" role="tabpanel"' + (curTab === k ? '' : ' hidden') + '>' + inner + '</div>';
    }
    var tabbar = '<div class="tabbar" role="tablist" aria-label="样品数据分区">'
      + TABS.map(function (t) {
        return '<button type="button" class="tab' + (curTab === t[0] ? ' active' : '') + '" role="tab"'
          + ' aria-selected="' + (curTab === t[0]) + '" data-action="sample-tab" data-tab="' + t[0] + '">' + t[1] + '</button>';
      }).join('') + '</div>';
    /* v3.19（黄总）：样品数据区补回「基础信息」卡；v3.20 字段补齐：
       编号/名称/牌号 + 批次（炉批追溯）+ 制样日期 + 规格 + 目标性能（前置判定基准，
       与实验数据区实测值构成对照叙事，如 SMP-001 目标 14.5 实测 14.2 未达）。 */
    /* v3.48d：有异常工序时阶段标签改琥珀「异常拦截」（异常在执行状态显示，不缀文字） */
    var hasWarnP = smp.process.some(function (p) { return p.state === 'warn'; });
    var smpStageTag = hasWarnP ? 'amber' : (smp.stage.indexOf('完成') >= 0 ? 'pass'
      : (smp.stage.indexOf('执行中') >= 0 || smp.stage.indexOf('进行') >= 0 ? 'run' : 'muted'));
    var smpStageTxt = hasWarnP ? '异常拦截' : smp.stage;
    var basePane = '<div class="grid cols-2">'
      + '<section class="card"><div class="card-h"><h2>' + icon('box', 14) + ' 基础信息</h2>'
      + tag(smpStageTag, smpStageTxt) + '</div><div class="card-b">'
      + '<div class="result-row"><span class="rr-k">样品编号</span><span class="rr-v mono">' + esc(smp.sample_id) + '</span></div>'
      + '<div class="result-row"><span class="rr-k">名称</span><span class="rr-v">' + esc(smpTitle(smp)) + '</span></div>'
      + '<div class="result-row"><span class="rr-k">牌号</span><span class="rr-v">' + esc(smp.grade) + '</span></div>'
      + '<div class="result-row"><span class="rr-k">批次</span><span class="rr-v mono">' + esc(smp.batch || '—') + '</span></div>'
      + '<div class="result-row"><span class="rr-k">制样日期</span><span class="rr-v mono">' + esc(smp.made || '—') + '</span></div>'
      + '<div class="result-row"><span class="rr-k">规格</span><span class="rr-v">' + esc(smp.spec || '—') + '</span></div>'
      + '<div class="result-row"><span class="rr-k">目标性能</span><span class="rr-v">' + esc(smp.target || '—') + '</span></div>'
      + (smp.design_note
        ? '<div class="result-row"><span class="rr-k">设计意图</span><span class="rr-v">' + esc(smp.design_note) + '</span></div>'
        : '')
      + (smp.from_source
        ? '<div class="result-row"><span class="rr-k">来源会话</span><span class="rr-v mono">' + esc(smp.from_source) + '</span></div>'
        : '')
      + '</div></section>'
      + '<section class="card"><div class="card-h"><h2>' + icon('flask', 14) + ' 配方 · ' + esc(smp.formula.version)
      + '</h2>' + truthFlagHTML(smp.formula.source) + '</div><div class="card-b">'
      + '<table class="tbl"><tbody>' + comps + '</tbody></table>'
      + '<div class="small muted mt6">配方表 ' + esc(smp.form_id) + ' · 来源：配方优化 ML 模型（预测口径，须实测验证）' + (smp.formula.tool_call_id ? ' · ' + esc(smp.formula.tool_call_id) : '') + '</div>'
      + '</div></section>'
      + '</div>'
      + '<section class="card mt14"><div class="card-h"><h2>' + icon('settings', 14) + ' 制备流程</h2>' + tag('muted', smp.process.length + ' 步') + '</div>'
      + '<div class="card-b"><ol class="pflow">' + proc + '</ol></div></section>';
    var expPane = emHTML(smp)
      + '<div class="grid cols-2 mt14">'
      + '<section class="card"><div class="card-h"><h2>' + icon('check', 14) + ' 性能参数</h2>'
      + '<button type="button" class="ov-op" data-action="smp-upload-open" data-id="' + esc(smp.sample_id) + '"'
      + ' title="上传性能检测数据（人工测试后登记）">' + icon('upload', 13) + '</button></div>'
      + '<div class="card-b">' + kvRows(smp.performance) + '</div></section>'
      + '<section class="card"><div class="card-h"><h2>' + icon('cpu', 14) + ' 本征参数</h2>'
      + '<button type="button" class="ov-op" data-action="smp-upload-open" data-id="' + esc(smp.sample_id) + '"'
      + ' title="上传本征测试数据（人工测试后登记）">' + icon('upload', 13) + '</button></div>'
      + '<div class="card-b">' + kvRows(smp.intrinsic || []) + '</div></section>'
      + '</div>';
    /* 仿真数据 = 计算产物专区（任务卡五段式）：VASP（输入=配方成分，相稳定性/占位筛选）+
       mumax3（输入=结构数据+本征实测，融于 .mx3 脚本；机制解释辅助读性能）；均 simulated，不替代实测 */
    var vaspProj = projectSimEvents(smp.sample_id, 'VASP');
    var mxProj = projectSimEvents(smp.sample_id, 'mumax3');
    var simPane = simTaskCard({
      icon: 'cpu', title: '第一性原理计算', task: vaspProj ? vaspProj.current : null, proj: vaspProj,
      emptyNote: '暂无第一性原理计算：该样品配方未做相稳定性筛选。'
    }) + simTaskCard({
      icon: 'layers', title: '微磁学仿真', task: mxProj ? mxProj.current : null, proj: mxProj,
      emptyNote: '暂无微磁学仿真：结构数据与本征实测齐备后才能组装输入脚本。'
    });
    var tracePane = '<section class="card"><div class="card-h"><h2>' + icon('file', 14) + ' 证据时间轴</h2>' + tag('info', evs.length + ' 条') + '</div>'
      + '<div class="card-b"><ul class="ev-timeline">' + evHtml + '</ul></div></section>';
    /* v3.42（黄总）页头三入口：
       发起试验（主按钮，前往制备——在制/异常工序 → 直达对应环节；待制样 → 首个待做工序；
       已完工 → 实验中心首页发起新一轮）+ 发起对话（带样品上下文开对话页）
       + 上传数据（人工测试后登记实验数据）；重命名 = 标题旁 icon 钮（原地编辑）。 */
    var liveProc = null, firstPend = null;
    for (var lpi = 0; lpi < smp.process.length; lpi++) {
      var pst = smp.process[lpi].state;
      if ((pst === 'current' || pst === 'warn') && !liveProc) { liveProc = smp.process[lpi]; }
      if (pst === 'pending' && !firstPend) { firstPend = smp.process[lpi]; }
    }
    var labHref = liveProc
      ? url('lab.html', { stage: liveProc.n, sample_id: '' })
      : (firstPend ? url('lab.html', { stage: firstPend.n, sample_id: '' }) : url('lab.html', { sample_id: '' }));
    var labTip = liveProc
      ? '工序 ' + esc(liveProc.n) + ' 在制/拦截中，点击前往实验中心对应环节'
      : (firstPend ? '该样品尚未开始制备，点击前往实验中心从工序 ' + esc(firstPend.n) + ' 发起' : '制备工序已完成，点击前往实验中心发起新一轮试验');
    return '<div class="page-head">'
      + '<a class="ph-back" href="' + esc(url('sample.html', { sample_id: '' })) + '" title="返回样品总览" aria-label="返回样品总览">' + icon('back', 15) + '</a>'
      + '<div class="ph-title"><h1>' + esc(smp.sample_id) + ' · ' + esc(smpTitle(smp)) + '</h1>'
      + '<button type="button" class="ph-edit" data-action="smp-rename-detail" data-id="' + esc(smp.sample_id) + '" title="重命名">' + icon('edit', 13) + '</button></div>'
      + '<div class="ph-acts">'
      + '<a class="btn" href="' + esc(labHref) + '" title="' + labTip + '">'
      + icon('beaker', 13) + ' 发起试验</a>'
      + '<a class="btn btn-ghost" href="' + esc(url('index.html', { sample_id: smp.sample_id })) + '">' + icon('chat', 13) + ' 发起对话</a>'
      + '<button type="button" class="btn btn-ghost" data-action="smp-upload-open" data-id="' + esc(smp.sample_id) + '"'
      + ' title="人工测试后上传实验数据（电镜 / 性能 / 本征）">' + icon('upload', 13) + ' 上传数据</button>'
      + '</div></div>'
      + tabbar
      + pane('base', basePane) + pane('exp', expPane) + pane('sim', simPane) + pane('trace', tracePane);
  }
  function initSample() {
    /* v3.11：无 sample_id → 科研对象汇总预览页；
       v3.13：详情页单栏全宽（台账侧栏已删，换样回总览），头部带「← 科研对象」
       v3.45：方案并入样品，?obj=plan 路由已撤 */
    if (!q('sample_id', '')) {
      $('page-root').innerHTML = '<div class="wrap wrap-wide">' + sampleOverviewHTML() + '</div>';
      return;
    }
    var smp = currentSample();
    $('page-root').innerHTML = '<div class="sample-main">' + sampleDetailHTML(smp) + '</div>';
    drawEmAll();
    drawSimCharts(smp);
  }

  /* ==========================================================================
   * 8. 插件页（skills.html）：页内「技能 / 工具 / SCP」三 Tab，卡片化呈现（D-41 / D-46）
   *    三 Tab 共用同一卡片模板与网格（plCardHTML + .pl-grid）；Tab 无计数、仅页内
   *    切换窗口（不整页跳转），?tab=skill|tool|scp 支持深链。
   *    意图评测只作执行门禁，不上页面；数据闭环为产品内部机制，不展示。
   * ======================================================================== */
  /* 「添加 → 上传文件」模拟模板池（D-52）：按当前 tab 取对应类型，点击即加卡（静态演示，刷新恢复） */
  var PL_UPLOAD_POOL = {
    skill: { name: '自定义技能（上传）', stage: '自定义', desc: '用户上传的技能定义文件解析登记（静态演示为模拟导入）', tools: [] },
    tool: { name: '自定义工具（上传）', kind: 'custom', output: 'measured', numeric: false, desc: '用户上传的工具定义文件解析登记（静态演示为模拟导入）' },
    scp: { name: '自定义服务接入（上传）', proto: 'HTTP API', status: '已登记', desc: '用户上传的接入配置文件解析登记（静态演示为模拟导入）' }
  };

  /* 统一卡片模板（三 Tab 与后续同类登记页共用）：顶行（名称 + tag）→ 描述 → 底部 chips 行 */
  function plCardHTML(o) {
    return '<section class="card pl-card"><div class="card-b">'
      + '<div class="pl-top"><span class="pl-name">' + esc(o.name) + '</span>' + o.tag + '</div>'
      + '<div class="pl-desc">' + esc(o.desc) + '</div>'
      + '<div class="pl-tools">' + o.chips.map(function (c) {
          return '<span class="slot-chip"' + (c.title ? ' title="' + esc(c.title) + '"' : '') + '>' + esc(c.text) + '</span>';
        }).join('') + '</div>'
      + '</div></section>';
  }
  function skillCardsHTML() {
    return '<div class="pl-grid">'
      + M.skills.map(function (s) {
        return plCardHTML({ name: s.name, tag: tag('info', esc(s.stage)), desc: s.desc,
          chips: s.tools.map(function (tid) {
            var t = toolById(tid);
            return { text: tid, title: t ? t.name : tid };
          }) });
      }).join('') + '</div>';
  }
  function toolCardsHTML() {
    return '<div class="pl-grid">'
      + M.tools.map(function (t) {
        return plCardHTML({ name: t.name, tag: truthFlagHTML(t.output), desc: t.desc,
          chips: [{ text: t.tool_id }, { text: t.kind }] });
      }).join('') + '</div>';
  }
  function scpCardsHTML() {
    return '<div class="pl-grid">'
      + M.scps.map(function (p) {
        return plCardHTML({ name: p.name, tag: tag('muted', esc(p.status)), desc: p.desc,
          chips: [{ text: p.scp_id }, { text: p.proto }] });
      }).join('') + '</div>';
  }
  function skillsPageHTML(tab) {
    var cur = (tab === 'tool' || tab === 'scp') ? tab : 'skill';
    var TABS = [['skill', '技能'], ['tool', '工具'], ['scp', 'SCP']];
    function pane(k, inner) {
      return '<div class="pl-pane" data-pane="' + k + '" role="tabpanel"' + (cur === k ? '' : ' hidden') + '>' + inner + '</div>';
    }
    return '<div class="page-head"><div><h1>科学工具</h1></div></div>'
      + '<div class="tabbar" role="tablist" aria-label="科学工具分类">'
      + TABS.map(function (t) {
        return '<button type="button" class="tab' + (cur === t[0] ? ' active' : '') + '" role="tab"'
          + ' aria-selected="' + (cur === t[0]) + '" data-action="skills-tab" data-tab="' + t[0] + '">' + t[1] + '</button>';
      }).join('')
      /* D-51 / D-52：搜索 / 添加在 tab 行右侧；「添加」点击展开两个来源：
         上传文件（按当前 tab 模拟加卡）/ 从端砚平台导入（接口占位，后续对接） */
      + '<span class="tab-spacer"></span>'
      + '<span class="pl-head-ops">'
      + '<input type="text" class="pl-search" data-action="pl-search" placeholder="搜索工具…" aria-label="搜索科学工具">'
      + '<span class="pl-menu-wrap">'
      + '<button type="button" class="btn" data-action="pl-import" aria-haspopup="true">' + icon('plus', 13) + ' 添加</button>'
      + '<span class="pl-menu" id="pl-menu" hidden>'
      + '<button type="button" class="pl-mi" data-action="pl-import-upload">' + icon('upload', 13) + ' 上传文件</button>'
      + '<button type="button" class="pl-mi" data-action="pl-import-duanyan">' + icon('box', 13) + ' 从端砚平台导入</button>'
      + '</span></span></span></div>'
      + pane('skill', skillCardsHTML()) + pane('tool', toolCardsHTML()) + pane('scp', scpCardsHTML());
  }
  function initSkills() {
    $('page-root').innerHTML = '<div class="wrap wrap-wide">' + skillsPageHTML(q('tab', '')) + '</div>';
  }

  /* ==========================================================================
   * 8.5 知识库页（kb.html，D-42）：RAG 语料实体化
   *   分区一「平台数据集」：locked 只读，普通用户不可改；分区二「我的文档」：
   *   可上传（静态演示为模拟）/ 预览 / 删除；两区一并进入对话 RAG 检索范围；
   *   ?doc= 直达展开预览，?hit= 高亮命中段落（对话引用卡的回溯落点）。
   * ======================================================================== */
  /* 文档卡片（结构固化）：名称 + 右上类型 tag + 描述；底部一行 = 左（更新时间 · 大小）+ 右（预览 / 操作） */
  function kbDocCardHTML(d, locked) {
    return '<section class="card kb-doc" id="kbdoc-' + esc(d.doc_id) + '">'
      + '<div class="card-b kb-c">'
      + '<div class="kb-c-top"><span class="kb-title">' + esc(d.title) + '</span>'
      + tag(locked ? 'muted' : 'info', d.type) + '</div>'
      + '<div class="kb-c-desc">' + esc(d.desc || '') + '</div>'
      + '<div class="kb-c-foot">'
      + '<span class="kb-c-meta">' + esc(d.updated || '') + (d.size ? ' · ' + esc(d.size) : '') + '</span>'
      + (locked ? ''
        : '<span class="kb-ops">'
          + '<button type="button" class="btn btn-sm btn-ghost" data-action="kb-view" data-doc="' + esc(d.doc_id) + '">'
          + icon('search', 12) + ' 预览</button>'
          + '<button type="button" class="btn btn-sm btn-ghost" data-action="kb-del" data-doc="' + esc(d.doc_id) + '">'
          + icon('trash', 12) + ' 删除</button></span>')
      + '</div>'
      + '</div></section>';
  }

  /* 我的文档轻量卡（D-53）：轻量读取只拿到 文件名 / 文件格式 / 上传时间 / 文件大小 + 预览删除；
   * 不展示描述与类型标签；布局 = 左方形格式块（约两行高）+ 右侧三行（名称 / 大小 / 时间+操作）。 */
  function kbMineCardHTML(d) {
    var m = /\.([A-Za-z0-9]+)\s*$/.exec(d.title || '');
    var fmt = (m ? m[1] : 'FILE').toUpperCase();
    var name = (d.title || '').replace(/\.[A-Za-z0-9]+\s*$/, '');
    var fmtCls = /PDF/i.test(fmt) ? 'pdf' : (/DOC/i.test(fmt) ? 'doc' : 'other');
    return '<section class="kb-mf" id="kbdoc-' + esc(d.doc_id) + '">'
      + '<div class="kb-mf-top">'
      + '<span class="kb-mf-fmt fmt-' + fmtCls + '">' + esc(fmt) + '</span>'
      + '<div class="kb-mf-main">'
      + '<div class="kb-mf-name" title="' + esc(d.title) + '">' + esc(name) + '</div>'
      + '<div class="kb-mf-size">' + esc(d.size || '') + '</div>'
      + '</div></div>'
      + '<div class="kb-mf-foot">'
      + '<span class="kb-mf-meta">' + esc(d.updated || '') + '</span>'
      + '<span class="kb-ops">'
      + '<button type="button" class="kb-mf-act" data-action="kb-view" data-doc="' + esc(d.doc_id) + '" title="预览" aria-label="预览">'
      + icon('eye', 13) + '</button>'
      + '<button type="button" class="kb-mf-act kb-mf-del" data-action="kb-del" data-doc="' + esc(d.doc_id) + '" title="删除" aria-label="删除">'
      + icon('trash', 13) + '</button>'
      + '</span></div>'
      + '</section>';
  }

  /* 预览弹窗（D-44）：全文段落 + 类型/时间/大小；?hit= 命中段落高亮并滚动到位 */
  function kbModalHTML(d, hitSid) {
    var secs = d.sections.map(function (s) {
      return '<div class="kb-sec' + (hitSid === s.sid ? ' kb-hit' : '') + '" id="kbsec-' + esc(d.doc_id + '-' + s.sid) + '">'
        + '<span class="kb-sid mono">' + esc(d.doc_id + ' · ' + s.sid) + '</span>'
        + '<span class="kb-txt">' + esc(s.text) + '</span></div>';
    }).join('');
    return '<div class="kb-mask" data-action="kb-close">'
      + '<div class="kb-modal" role="dialog" aria-modal="true" aria-label="' + esc(d.title) + '">'
      + '<div class="kb-m-head">'
      + '<span class="kb-title">' + esc(d.title) + '</span>' + tag('info', d.type)
      + '<span class="kb-c-meta">' + esc(d.updated || '') + (d.size ? ' · ' + esc(d.size) : '') + '</span>'
      + '<button type="button" class="kb-m-close" data-action="kb-close" aria-label="关闭">' + icon('close', 14) + '</button>'
      + '</div>'
      + '<div class="kb-m-body">' + secs + '</div>'
      + '</div></div>';
  }
  function kbOpenModal(docId, hitSid) {
    var d = kbDocById(docId), ov = $('overlays');
    if (!d || !ov) { return; }
    kbCloseModal();
    var wrap = document.createElement('div');
    wrap.id = 'kb-modal-wrap';
    wrap.innerHTML = kbModalHTML(d, hitSid || '');
    ov.appendChild(wrap);
    if (hitSid) {
      var hit = $('kbsec-' + docId + '-' + hitSid);
      if (hit && hit.scrollIntoView) { hit.scrollIntoView({ block: 'center' }); }
    }
  }
  function kbCloseModal() {
    var w = $('kb-modal-wrap');
    if (w) { w.parentNode.removeChild(w); }
  }

  /* ==========================================================================
   * v3.42 手动上传实验数据（黄总：实验数据依赖人工测试后上传，详情页给入口）
   * 页头/实验数据区各卡头 → 弹窗选数据类型 → 一键模拟上传：
   *   电镜 = 替换现有；性能/本征 = 追加行；统一 measured 口径 + 写留痕。
   * 静态演示无真实文件解析，上传结果为内置示例模板（toast 明示）。
   * ======================================================================== */
  var SMP_UPLOAD_TPL = {
    em: {
      label: '电镜分析',
      desc: 'SEM 二次电子像 + 晶粒统计（dEA / 晶界相 / 主取向）；上传后替换现有数据',
      make: function (smp) {
        var seed = 0;
        for (var i = 0; i < smp.sample_id.length; i++) { seed = (seed * 31 + smp.sample_id.charCodeAt(i)) >>> 0; }
        var d8 = stampNow().slice(0, 10).replace(/-/g, '');
        return {
          sample_no: smp.batch || smp.sample_id, scope: 'CLARA', mag: '5,000×',
          px: '0.085 μm/px', view: '44 μm 视场 · 二次电子像',
          seed: seed, grainN: 46,
          gbFraction: '6.5 %', mainOri: '2.8°', triGb: '16 个', spread: '1.3 μm',
          morph: [['球形度', '0.81'], ['凸度', '0.90'], ['粗糙度（分形维数）', '1.19'], ['晶界宽度', '0.08 μm']],
          note: '晶界相连续分布，未见异常大晶粒',
          src: '人工上传 · SEM-' + d8 + '-01', tool_call_id: ''
        };
      }
    },
    perf: {
      label: '性能参数',
      desc: '磁性能检测报告（Br / Hcj / (BH)max / 方形度）；上传后追加登记',
      make: function () {
        var src = '人工上传 · 检测报告 RPT-' + stampNow().slice(0, 10).replace(/-/g, '');
        return [
          { key: 'Br', value: '14.1 kGs', flag: 'measured', src: src, tool_call_id: '' },
          { key: 'Hcj', value: '14.6 kOe', flag: 'measured', src: src, tool_call_id: '' },
          { key: '(BH)max', value: '49.8 MGOe', flag: 'measured', src: src, tool_call_id: '' },
          { key: 'Hk/Hcj 方形度', value: '95.8 %', flag: 'measured', src: src, tool_call_id: '' }
        ];
      }
    },
    intr: {
      label: '本征参数',
      desc: '居里温度 / 饱和磁极化强度 / 各向异性场（VSM、热磁测）；上传后追加登记',
      make: function () {
        var src = '人工上传 · 本征测试 RPT-' + stampNow().slice(0, 10).replace(/-/g, '');
        return [
          { key: '居里温度 Tc', value: '310 ℃', flag: 'measured', src: src, tool_call_id: '' },
          { key: '饱和磁极化强度 4πMs', value: '16.0 kGs', flag: 'measured', src: src, tool_call_id: '' },
          { key: '各向异性场 Ha', value: '71 kOe', flag: 'measured', src: src, tool_call_id: '' }
        ];
      }
    }
  };
  function smpUploadModalHTML(smp) {
    var rows = ['em', 'perf', 'intr'].map(function (k) {
      var t = SMP_UPLOAD_TPL[k];
      return '<button type="button" class="upl-row" data-action="smp-upload-submit" data-id="' + esc(smp.sample_id) + '" data-kind="' + k + '">'
        + '<span class="upl-name">' + esc(t.label) + '</span>'
        + '<span class="upl-desc">' + esc(t.desc) + '</span>'
        + '<span class="upl-go">' + icon('upload', 12) + ' 上传</span>'
        + '</button>';
    }).join('');
    return '<div class="kb-mask" data-action="smp-upload-close">'
      + '<div class="kb-modal upl-modal" role="dialog" aria-modal="true" aria-label="上传实验数据">'
      + '<div class="kb-m-head">'
      + '<span class="kb-title">上传实验数据 · ' + esc(smp.sample_id) + '</span>' + tag('pass', 'measured')
      + '<button type="button" class="kb-m-close" data-action="smp-upload-close" aria-label="关闭">' + icon('close', 14) + '</button>'
      + '</div>'
      + '<div class="kb-m-body">'
      + '<div class="small muted upl-tip">实验数据依赖人工测试后上传；选择数据类型即登记为 measured 口径并写入留痕。'
      + '静态演示无真实文件解析，上传结果为示例数据。</div>'
      + rows
      + '</div></div></div>';
  }
  function smpUploadOpen(sid) {
    var smp = null, ov = $('overlays');
    M.samples.forEach(function (s) { if (s.sample_id === sid) { smp = s; } });
    if (!smp || !ov) { return; }
    smpUploadClose();
    var wrap = document.createElement('div');
    wrap.id = 'smp-upload-wrap';
    wrap.innerHTML = smpUploadModalHTML(smp);
    ov.appendChild(wrap);
  }
  function smpUploadClose() {
    var w = $('smp-upload-wrap');
    if (w) { w.parentNode.removeChild(w); }
  }

  /* 页面结构：页头（title + 上传按钮）/ 平台数据集（卡片网格）/ 我的文档（卡片网格） */
  function kbPageHTML() {
    var ds = M.kb.builtin;
    var builtinCards = ds.docs.map(function (d) { return kbDocCardHTML(d, true); }).join('');
    var mine = kbMineDocs();
    var mineCards = mine.length ? mine.map(function (d) { return kbMineCardHTML(d); }).join('')
      : '<div class="kb-empty">还没有个人文档，上传试试。</div>';
    return '<div class="page-head"><div><h1>知识库</h1></div>'
      + '<div class="kb-head-ops">'
      + '<input type="text" class="kb-search" data-action="kb-search" placeholder="搜索文档…" aria-label="搜索知识库文档">'
      + '<button type="button" class="btn" data-action="kb-upload">' + icon('upload', 13) + ' 上传文档</button>'
      + '</div></div>'
      + '<div class="kb-sec-t">' + icon('lock', 13) + ' 平台数据集</div>'
      + '<div class="kb-grid">' + builtinCards + '</div>'
      + '<div class="kb-sec-t">' + icon('file', 13) + ' 我的文档</div>'
      + '<div class="kb-grid kb-mine-grid">' + mineCards + '</div>';
  }

  /* 卡片过滤（D-48：KB 与插件页共用同一套交互规范）：按卡片全文显隐，纯客户端 */
  function filterCards(sel, term) {
    var low = String(term || '').trim().toLowerCase();
    document.querySelectorAll(sel).forEach(function (card) {
      card.style.display = (!low || card.textContent.toLowerCase().indexOf(low) >= 0) ? '' : 'none';
    });
  }

  /* 页内搜索（D-45）：按标题 / 描述 / 类型 / 编号过滤卡片，纯客户端显隐 */
  function kbFilterDocs(term) { filterCards('.kb-doc, .kb-mf', term); }

  function initKb() {
    $('page-root').innerHTML = '<div class="wrap wrap-wide">' + kbPageHTML() + '</div>';
    /* 对话引用跳转（?doc=&hit=）：直接弹出该文档预览并高亮命中段落 */
    var openDoc = q('doc', '');
    if (openDoc) { kbOpenModal(openDoc, q('hit', '')); }
  }

  /* ==========================================================================
   * 8.6 实验中心（lab.html，v3.7-r3）：高通量制备产线 · 数字孪生
   *     布局（黄总 2026-11-13 r3）：左主区 = 选中环节详情（设备图示 / 运行信息 /
   *     工艺信息）；右栏 = 10 环节纵向列表（当前节点高亮，前后顺序自明）。
   *     只覆盖制备过程设备；磁测仪 / 电镜等独立检测环节不进本页。
   *     数字孪生红线：在制状态不存 mock，从样品 process 同源反推。
   *     ?stage=N 定位环节，默认选 warn > running 的环节，否则工序 1。
   * ======================================================================== */
  var EQ_ST = {
    running: ['pass', '运行中'], warn: ['amber', '异常拦截'], idle: ['muted', '空闲']
  };
  /* 工序粒度在制查询：该工序号是否有样品 state=current/warn */
  function stageLive(n) {
    for (var i = 0; i < M.samples.length; i++) {
      var s = M.samples[i];
      for (var j = 0; j < s.process.length; j++) {
        var p = s.process[j];
        if (p.n === n && (p.state === 'current' || p.state === 'warn')) {
          return { sample: s, proc: p };
        }
      }
    }
    return null;
  }
  function stageStatus(n) {
    var live = stageLive(n);
    if (!live) { return 'idle'; }
    return live.proc.state === 'warn' ? 'warn' : 'running';
  }
  function eqByStage(n) {
    var list = M.equipments || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].stages.indexOf(n) >= 0) { return list[i]; }
    }
    return null;
  }
  function currentStage() {
    var sn = parseInt(q('stage', ''), 10);
    var list = M.processStages || [];
    var i;
    for (i = 0; i < list.length; i++) { if (list[i].n === sn) { return list[i]; } }
    for (i = 0; i < list.length; i++) { if (stageStatus(list[i].n) === 'warn') { return list[i]; } }
    for (i = 0; i < list.length; i++) { if (stageStatus(list[i].n) === 'running') { return list[i]; } }
    return list[0];
  }

  /* 顶部页头（r11，黄总：复刻其他页面的 page-head，标题裸排无框） */
  function labTopbarHTML() {
    return '<div class="page-head lab-head"><div><h1>实验中心</h1></div>'
      + '<button type="button" class="btn" data-action="lab-new">'
      + icon('plus', 13) + ' 发起制备任务</button></div>';
  }
  /* KPI 总览卡（r10，黄总：工作台要有 dashboard 样子）：
     在制样品 / 异常待复核 / 设备运行（利用率）/ 累计完成——全部从样品与设备同源推导 */
  function labStatsHTML() {
    var lives = [];
    M.processStages.forEach(function (stg) {
      var live = stageLive(stg.n);
      if (live) { lives.push({ stg: stg, sample: live.sample, warn: live.proc.state === 'warn' }); }
    });
    var warns = lives.filter(function (x) { return x.warn; });
    var busyEq = 0;
    (M.equipments || []).forEach(function (eq) {
      for (var i = 0; i < lives.length; i++) {
        if (eq.stages.indexOf(lives[i].stg.n) >= 0) { busyEq++; break; }
      }
    });
    /* r24（黄总）：第 4 卡 累计完成 → 排队中样品（LS 队列同源，发起任务后实时增） */
    var queue = lsJson(LS.labQueue) || [];
    var util = M.equipments.length ? Math.round(busyEq / M.equipments.length * 100) : 0;
    function card(v, unit, k, sub, warn) {
      return '<div class="ls-card' + (warn ? ' is-warn' : '') + '">'
        + '<div class="ls-v">' + v + (unit ? '<span class="ls-unit">' + unit + '</span>' : '') + '</div>'
        + '<div class="ls-k">' + k + '</div>'
        + '<div class="ls-sub">' + sub + '</div></div>';
    }
    return '<div class="lab-stats">'
      + card(lives.length, '', '在制样品', lives.map(function (x) { return x.sample.sample_id; }).join(' · ') || '—')
      + card(warns.length, '', '异常待复核', warns.length ? warns.map(function (x) { return x.stg.name; }).join(' · ') : '无', warns.length > 0)
      + card(busyEq, '/' + M.equipments.length, '设备运行', '利用率 ' + util + '%')
      + card(queue.length, '', '排队中样品',
        queue.length ? queue.map(function (t) { return t.id === 'NEW' ? '新样品' : t.id; }).join(' · ') : '无排队')
      + '</div>';
  }
  function labNewModalHTML() {
    var opts = M.samples.map(function (s) {
      return '<option value="' + esc(s.sample_id) + '">'
        + esc(s.sample_id + ' · ' + s.title + ' · ' + s.formula.version) + '</option>';
    }).join('') + '<option value="NEW">新样品（登记后自动分配编号）</option>';
    return '<div class="kb-mask" data-action="lab-new-close">'
      + '<div class="kb-modal lab-new-modal" role="dialog" aria-modal="true" aria-label="发起制备任务">'
      + '<div class="kb-m-head"><b>发起制备任务</b>'
      + '<button type="button" class="kb-m-close" data-action="lab-new-close" aria-label="关闭">'
      + icon('close', 14) + '</button></div>'
      + '<div class="kb-m-body">'
      + '<label class="ln-field"><span>选择样品（配方来源）</span>'
      + '<select class="sel" id="lab-new-sample">' + opts + '</select></label>'
      + '<div class="small muted">确认后样品进入产线工序 1（配料与称重），各环节过程参数自动采集回科研对象。'
      + '静态演示：仅登记示意，不实际改数。</div>'
      + '<div class="ln-ops"><button type="button" class="btn" data-action="lab-new-submit">'
      + icon('check', 13) + ' 确认登记</button></div>'
      + '</div></div></div>';
  }
  function labOpenNew() {
    var ov = $('overlays');
    if (!ov) { return; }
    labCloseNew();
    var wrap = document.createElement('div');
    wrap.id = 'lab-new-wrap';
    wrap.innerHTML = labNewModalHTML();
    ov.appendChild(wrap);
  }
  function labCloseNew() {
    var w = $('lab-new-wrap');
    if (w) { w.parentNode.removeChild(w); }
  }


  /* 设备图示：7 类 SVG 线稿（stroke 风格，与全站内联图标同语言；示意非工程图） */
  function equipFigHTML(eq) {
    var S = '<svg class="eq-fig-svg" viewBox="0 0 240 150" fill="none" stroke="currentColor"'
      + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    var E = '</svg>';
    switch (eq ? eq.eq_id : '') {
      case 'EQ-001':   /* 配料与混料工作站：手套箱 + 观察窗 + 料斗 + 天平 */
        return S
          + '<rect x="30" y="48" width="118" height="66" rx="6"/>'
          + '<rect x="44" y="60" width="52" height="30" rx="4"/>'
          + '<circle cx="118" cy="78" r="8"/><circle cx="138" cy="78" r="8"/>'
          + '<path d="M58 48 L68 28 h28 L106 48"/>'
          + '<path d="M30 114 v14 M148 114 v14"/>'
          + '<line x1="188" y1="114" x2="188" y2="82"/><circle cx="188" cy="74" r="10"/>'
          + '<rect x="172" y="112" width="32" height="6" rx="2"/>'
          + E;
      case 'EQ-002':   /* 真空感应熔炼炉：立式炉体 + 感应线圈 + 坩埚 + 真空泵 */
        return S
          + '<rect x="78" y="24" width="82" height="96" rx="10"/>'
          + '<path d="M94 46 q26 12 50 0 M94 61 q26 12 50 0 M94 76 q26 12 50 0"/>'
          + '<path d="M106 92 v14 a13 10 0 0 0 26 0 v-14"/>'
          + '<path d="M160 44 h24 v-14"/><circle cx="192" cy="24" r="7"/>'
          + '<path d="M94 120 v14 M144 120 v14"/>'
          + E;
      case 'EQ-003':   /* 速凝甩带炉：中间包 + 浇嘴 + 旋转铜辊 + 甩出带材 */
        return S
          + '<path d="M52 26 h54 l-7 36 h-40 z"/>'
          + '<line x1="82" y1="62" x2="96" y2="84"/>'
          + '<circle cx="122" cy="104" r="28"/><circle cx="122" cy="104" r="17" stroke-dasharray="3 4"/>'
          + '<path d="M104 86 a26 24 0 0 1 22 -8"/><path d="M128 74 l4 8 -9 -1"/>'
          + '<path d="M149 96 q32 -6 48 10"/>'
          + '<path d="M122 132 v10"/>'
          + E;
      case 'EQ-004':   /* 氢破炉：卧式罐 + 罐门 + 加热套 + 氢气管路 */
        return S
          + '<rect x="46" y="56" width="112" height="50" rx="22"/>'
          + '<circle cx="68" cy="81" r="15"/>'
          + '<path d="M96 56 v50 M116 56 v50 M136 56 v50" stroke-dasharray="3 4"/>'
          + '<rect x="182" y="44" width="22" height="48" rx="6"/>'
          + '<path d="M193 44 v-8 M188 36 h10"/>'
          + '<path d="M158 72 h18 M182 82 h-18"/>'
          + '<path d="M68 106 v12 M136 106 v12"/>'
          + E;
      case 'EQ-005':   /* 流化床气流磨：塔式磨体 + 分级轮 + 旋风收集筒 + 对喷管 */
        return S
          + '<path d="M82 132 L94 62 h22 L128 132 z"/>'
          + '<circle cx="105" cy="48" r="14"/><path d="M105 37 v22 M94 48 h22"/>'
          + '<path d="M152 56 h24 l-5 56 h-14 z"/><path d="M152 78 h-16"/>'
          + '<rect x="56" y="66" width="18" height="12" rx="2"/><path d="M74 72 h20"/>'
          + '<path d="M82 120 h-24 M128 120 h24"/>'
          + '<path d="M164 112 v18"/>'
          + E;
      case 'EQ-006':   /* 磁场取向压机：四柱框架 + 上下压头 + 样坯 + 两侧励磁线圈 */
        return S
          + '<path d="M66 30 v102 M174 30 v102 M66 30 h108 M66 132 h108"/>'
          + '<rect x="96" y="46" width="48" height="15" rx="3"/>'
          + '<path d="M120 61 v14"/>'
          + '<rect x="102" y="86" width="36" height="18" rx="2"/>'
          + '<rect x="90" y="104" width="60" height="12" rx="3"/>'
          + '<path d="M80 72 a13 13 0 0 1 0 26 M160 72 a13 13 0 0 0 0 26"/>'
          + '<path d="M110 76 v8 M130 76 v8"/>'
          + E;
      case 'EQ-007':   /* 真空烧结炉：卧式炉体 + 炉门 + 整体加热区 + 真空泵 */
        return S
          + '<rect x="42" y="46" width="132" height="60" rx="8"/>'
          + '<circle cx="63" cy="76" r="17"/>'
          + '<rect x="94" y="59" width="62" height="34" rx="3" stroke-dasharray="4 3"/>'
          + '<line x1="94" y1="93" x2="156" y2="93"/>'
          + '<path d="M174 60 h20 v-18"/><circle cx="200" cy="35" r="7"/>'
          + '<path d="M63 106 v12 M156 106 v12"/>'
          + E;
      case 'EQ-008':   /* 真空热处理炉：卧式炉体 + 双温区（两级回火） */
        return S
          + '<rect x="42" y="46" width="132" height="60" rx="8"/>'
          + '<circle cx="63" cy="76" r="17"/>'
          + '<rect x="94" y="59" width="28" height="34" rx="3" stroke-dasharray="4 3"/>'
          + '<rect x="128" y="59" width="28" height="34" rx="3" stroke-dasharray="4 3"/>'
          + '<line x1="94" y1="93" x2="156" y2="93"/>'
          + '<path d="M174 60 h20 v-18"/><circle cx="200" cy="35" r="7"/>'
          + '<path d="M63 106 v12 M156 106 v12"/>'
          + E;
      default:
        return S + '<rect x="60" y="40" width="120" height="70" rx="8"/>' + E;
    }
  }

  /* 顶部横向流程条（r8）：10 环节卡片横排（可横滚），箭头衔接表达顺序；
     卡片 = icon + 编号环节名 + 设备名 + 状态 tag（短词）；在制/异常卡附摘要行。 */
  var EQ_ICON = {
    'EQ-001': 'eq-scale', 'EQ-002': 'eq-furnace-v', 'EQ-003': 'eq-roller', 'EQ-004': 'eq-tank',
    'EQ-005': 'eq-mill', 'EQ-006': 'eq-press', 'EQ-007': 'eq-furnace-h', 'EQ-008': 'eq-furnace-h2'
  };
  var EQ_ST_SHORT = { running: '运行中', warn: '异常', idle: '空闲' };
  function labStageListHTML(cur) {
    var items = M.processStages.map(function (stg) {
      var eq = eqByStage(stg.n);
      var st = stageStatus(stg.n);
      var live = stageLive(stg.n);
      var tg = EQ_ST[st];
      var active = stg.n === cur.n;
      /* r28：标准卡单行（icon + 标题 + 状态）；
         r30（黄总）：恢复卡片边框；标题行固定（icon 只跟标题行高，不被扩展区撑高）；
         在制扩展区 = 下方全宽两行（编号 · 牌号 / 配方换行）——「制备中」与在制 tag 重复已删 */
      return '<li class="stage-cell' + (live ? ' is-live' : '') + '">'
        + '<a class="stage-item is-' + st + (active ? ' is-active' : '') + '" href="'
        + esc(url('lab.html', { stage: stg.n })) + '"'
        + ' data-action="lab-stage" data-stage="' + stg.n + '"'
        + ' title="' + esc(stg.name + ' · ' + (eq ? eq.name : '—')) + '"'
        + (active ? ' aria-current="page"' : '') + '>'
        + '<span class="st-head">'
        + '<span class="st-icon">' + icon(EQ_ICON[eq ? eq.eq_id : ''] || 'box', 16) + '</span>'
        + '<span class="st-top"><span class="st-name">' + esc(stg.name) + '</span>'
        + '<span class="st-tag">' + tag(tg[0], EQ_ST_SHORT[st]) + '</span></span>'
        + '</span>'
        + (st === 'running' && live
          ? '<span class="st-extra">'
            + '<span class="st-live mono">' + esc(live.sample.sample_id) + ' · ' + esc(live.sample.grade) + '</span>'
            + '<span class="st-form mono">' + esc(live.sample.formula.version) + '</span>'
            + '</span>'
          : '')
        + '</a></li>';
    }).join('');
    return '<div class="lab-side" aria-label="产线环节">'
      + '<ol class="stage-list">' + items + '</ol></div>';
  }

  /* 设备信息 kv（黄总 r7-3 规范化）：名称 / ID / 型号 / 特性四行带标签；
     mock model 首段 = 型号，其余段 = 特性（原一行混杂串拆分归位） */
  function eqMetaHTML(eq) {
    /* r20（黄总）：删「设备特性」冗余描述行，保留 名称/ID/型号 */
    var model = (eq.model || '').split('·').map(function (x) { return x.trim(); }).filter(Boolean).shift() || '—';
    return '<div class="eq-meta">'
      + '<div class="result-row"><span class="rr-k">设备名称</span><span class="rr-v">' + esc(eq.name) + '</span></div>'
      + '<div class="result-row"><span class="rr-k">设备 ID</span><span class="rr-v mono">' + esc(eq.eq_id) + '</span></div>'
      + '<div class="result-row"><span class="rr-k">设备型号</span><span class="rr-v mono">' + esc(model) + '</span></div>'
      + '</div>';
  }

  /* 左主区详情（v3.7-r7 信息结构重构，黄总）：
     页头 = h1 环节名 + 工序序号 tag；介绍句紧随标题（起说明作用）；状态 tag 居右。
     单卡「设备与运行」：设备（图示/型号）与运行（在制样品/采集参数表/异常横幅）一体。
     采集参数表 = fields 为字段、在制时填真实 kv 值（measured，超标项琥珀），空闲值 "—"。 */
  function labDetailHTML(stg) {
    var eq = eqByStage(stg.n);
    var st = stageStatus(stg.n);
    var tg = EQ_ST[st];
    var live = stageLive(stg.n);
    var kvMap = {};
    if (live && live.proc.kv) {
      live.proc.kv.forEach(function (r) { kvMap[r[0]] = { v: r[1], warn: r[2] === 'warn' }; });
    }
    var fields = (stg.fields || '').split('·').map(function (s) { return s.trim(); }).filter(Boolean);
    var paramRows = fields.map(function (f) {
      var cell = kvMap[f];
      return '<div class="result-row"><span class="rr-k">' + esc(f) + '</span>'
        + '<span class="rr-v mono' + (cell && cell.warn ? ' rr-warn' : '') + '">'
        + esc(cell ? cell.v : '—') + '</span>'
        + (cell ? truthFlagHTML('measured') : '') + '</div>';
    }).join('');
    var runSide;
    if (live) {
      /* 运行进度（r9）：进行中工序显示 已运行/共时长 + 进度条 */
      var prog = live.proc.progress;
      var progHtml = prog
        ? '<div class="result-row"><span class="rr-k">运行进度</span><span class="rr-v mono">'
          + esc(prog.elapsed) + ' / ' + esc(prog.total) + '</span><span class="rr-meta">'
          + '<span class="lab-prog"><span style="width:' + esc(prog.pct) + '%"></span></span></span></div>'
        : '';
      /* 异常处置（r9，黄总：拦截后人控点闭环）：复核放行 / 驳回该样；
         静态演示为内存态——动作改 MOCK 并重渲染，刷新即还原 */
      var verdict = live.proc.warn
        ? '<div class="lab-verdict is-amber">' + icon('warn', 13) + '<span>' + esc(live.proc.warn) + '</span>'
          + '<span class="lab-verdict-ops">'
          + '<button type="button" class="btn btn-mini" data-action="lab-review-pass">复核放行</button>'
          + '<button type="button" class="btn btn-ghost btn-mini" data-action="lab-review-reject">驳回该样</button>'
          + '</span></div>'
        : '';
      /* r33（黄总）：信息层级规范——设备 / 运行 / 采集参数 三模块，模块间淡虚线分隔；
         「在制样品 + 运行进度」从游离行归入「运行」模块 */
      runSide = '<div class="lab-sect">设备</div>' + (eq ? eqMetaHTML(eq) : '')
        + '<div class="lab-sect">运行</div>'
        + '<div class="result-row"><span class="rr-k">在制样品</span><span class="rr-v mono">'
        + esc(live.sample.sample_id) + '</span><span class="rr-meta">'
        + esc(smpTitle(live.sample)) + ' · ' + esc(live.sample.grade) + '</span></div>'
        + progHtml
        + '<div class="lab-sect">采集参数</div><div class="lab-params">' + paramRows + '</div>'
        + verdict;
    } else {
      runSide = '<div class="lab-sect">设备</div>' + (eq ? eqMetaHTML(eq) : '')
        + '<div class="lab-sect">采集参数</div><div class="lab-params">' + paramRows + '</div>';
    }
    /* 「查看样品」= 环节 → 在制科研对象的重要跳转；空闲环节无跳转对象，不显示 */
    var headBtn = live
      ? '<a class="btn btn-mini" href="' + esc(url('sample.html', { sample_id: live.sample.sample_id, tab: 'base' })) + '">'
        + icon('arrow', 13) + ' 查看样品</a>'
      : '';
    /* r20（黄总）：去除独立 page-head，环节名/状态/跳转融入详情卡卡头 */
    return '<section class="card"><div class="card-h lab-detail-h"><h2>' + esc(stg.name) + '</h2>'
      + '<span class="lab-detail-ops">' + tag(tg[0], tg[1]) + headBtn + '</span></div>'
      + '<div class="card-b"><div class="grid cols-2">'
      /* r29（黄总）：设备 kv 挪右列运行区顶部；左列纯设备图，自然高度垂直居中（不硬撑留白） */
      + '<div class="eq-side"><div class="eq-fig">' + equipFigHTML(eq) + '</div></div>'
      + '<div>' + runSide + '</div>'
      + '</div></div></section>';
  }

  /* 操作日志（r13，黄总：什么时间 / 哪个设备 / 什么配置 / 做了什么事）：
     数据源 = 样品 process（state + param）+ 设备表（环节→设备映射）+ 登记队列（localStorage）；
     静态数据无真实时间戳 → 时间 = 样品开工日 09:00 + 工序偏移 ST_OFF + 样品错位 0.5h
     （同设备先后有序：SMP-002 气流磨 11-11 15:30 拦截，SMP-003 16:00 上机完成）；
     倒序最新在前；环节列沿用约定 x/x + 环节名。
     r18（黄总）：吞并「本次制备活动」表——筛选 chips 全部/当前/异常，
     「当前」= 在制 + 异常拦截 + 排队（原批次表全部职责），完成记录留全部页。 */
  function labOpsHTML(page, filter) {
    filter = filter || { res: '', sid: '', eq: '' };
    var ST_OFF = [0, 1.5, 4, 7.5, 26, 30, 33, 50, 55, 58]; /* 各工序相对开工的小时偏移 */
    function pad(x) { return (x < 10 ? '0' : '') + x; }
    function fmtT(d) { return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    function eqOf(n) {
      for (var i = 0; i < M.equipments.length; i++) {
        if (M.equipments[i].stages.indexOf(n) >= 0) { return M.equipments[i]; }
      }
      return null;
    }
    var rows = [];
    M.samples.forEach(function (s, si) {
      s.process.forEach(function (p) {
        if (p.state === 'pending') { return; }
        var stg = M.processStages.filter(function (x) { return x.n === p.n; })[0];
        var eq = eqOf(p.n);
        var d = new Date(s.made + 'T09:00:00');
        d.setMinutes(d.getMinutes() + Math.round((ST_OFF[p.n - 1] + si * 0.5) * 60));
        rows.push({
          t: d.getTime(), time: fmtT(d),
          eq: eq ? eq.name : '—', eqId: eq ? eq.eq_id : '',
          stage: stg ? stg.name : '',
          sid: s.sample_id, param: p.param,
          cur: p.state === 'current' || p.state === 'warn', warn: p.state === 'warn',
          res: p.state === 'warn' ? tag('amber', '异常拦截')
            : p.state === 'current' ? tag('run', '进行中')
            : tag('pass', '完成')
        });
      });
    });
    (lsJson(LS.labQueue) || []).forEach(function (t) {
      var d = t.ts ? new Date(String(t.ts).replace(' ', 'T')) : null;
      rows.push({
        t: d && !isNaN(d) ? d.getTime() : 0, time: d && !isNaN(d) ? fmtT(d) : esc(t.ts || '—'),
        eq: '—', eqId: '',
        stage: M.processStages[0].name + '（队列）',
        sid: t.id === 'NEW' ? '新样品' : t.id, param: '任务登记，等待设备空闲',
        cur: true, warn: false,
        res: tag('muted', '排队'), noLink: true
      });
    });
    rows.sort(function (a, b) { return b.t - a.t; });
    /* 三维筛选（r19，黄总）：结果（全部/当前/异常）× 样品 × 设备，AND 组合；
       选项数据驱动（样品=日志出现过的，设备=设备表全量） */
    var sidOpts = [];
    rows.forEach(function (r) { if (sidOpts.indexOf(r.sid) < 0) { sidOpts.push(r.sid); } });
    var fRows = rows.filter(function (r) {
      if (filter.res === 'cur' && !r.cur) { return false; }
      if (filter.res === 'warn' && !r.warn) { return false; }
      if (filter.sid && r.sid !== filter.sid) { return false; }
      if (filter.eq && r.eqId !== filter.eq) { return false; }
      return true;
    });
    /* r14（黄总）：表格列表样式——标题/筛选/分页同行（工具栏），取消独立卡头；
       每页 8 条内存分页，页码由按钮携带，局部替换不重渲整页 */
    var PER = 8;
    var pages = Math.max(1, Math.ceil(fRows.length / PER));
    page = Math.min(Math.max(1, page || 1), pages);
    /* r32（黄总）：列序 = 时间 | 样品 | 设备 | 环节 | 配置 | 结果（样品提前，环节无序号） */
    var body = fRows.slice((page - 1) * PER, page * PER).map(function (r) {
      return '<tr>'
        + '<td class="mono lab-ops-t">' + r.time + '</td>'
        + '<td>' + (r.noLink
          ? '<span class="mono">' + esc(r.sid) + '</span>'
          : '<a class="mono rowlink" href="' + esc(url('sample.html', { sample_id: r.sid })) + '">' + esc(r.sid) + '</a>') + '</td>'
        + '<td>' + esc(r.eq) + (r.eqId ? ' <span class="small muted">' + esc(r.eqId) + '</span>' : '') + '</td>'
        + '<td>' + esc(r.stage) + '</td>'
        + '<td>' + esc(r.param) + '</td>'
        + '<td>' + r.res + '</td>'
        + '</tr>';
    }).join('');
    var nums = '';
    for (var i = 1; i <= pages; i++) {
      nums += '<button type="button" class="lp-num' + (i === page ? ' is-on' : '') + '"'
        + ' data-action="lab-ops-page" data-page="' + i + '">' + i + '</button>';
    }
    function selOpts(kind, label, items) {
      return '<select class="ov-filter lp-sel" data-action="lab-ops-filter" data-kind="' + kind + '" aria-label="按' + label + '筛选">'
        + '<option value=""' + (!filter[kind] ? ' selected' : '') + '>' + label + '：全部</option>'
        + items.map(function (o) {
          var v = Array.isArray(o) ? o[0] : o, t = Array.isArray(o) ? o[1] : o;
          return '<option value="' + esc(v) + '"' + (filter[kind] === v ? ' selected' : '') + '>' + esc(t) + '</option>';
        }).join('') + '</select>';
    }
    var filters = selOpts('sid', '样品', sidOpts)
      + selOpts('res', '状态', [['cur', '当前（在制/排队/异常）'], ['warn', '异常拦截']])
      + selOpts('eq', '设备', M.equipments.map(function (e) { return [e.eq_id, e.name + ' ' + e.eq_id]; }));
    var bodyRows = body
      || '<tr><td colspan="6" class="lab-ops-empty">无匹配记录</td></tr>';
    return '<section class="card lab-ops"><div class="lab-ops-bar"><h2>' + icon('book', 14) + ' 操作日志</h2>'
      + '<div class="lab-ops-filters">' + filters + '</div></div>'
      + '<div class="card-b">'
      + '<table class="tbl"><thead><tr><th>时间</th><th>样品</th><th>设备</th><th>环节</th><th>配置</th><th>结果</th></tr></thead>'
      + '<tbody>' + bodyRows + '</tbody></table></div>'
      + '<div class="lab-ops-foot"><span class="lp-info">' + fRows.length + ' 条</span>'
      + '<div class="lab-pager">'
      + '<button type="button" class="lp-btn" data-action="lab-ops-page" data-page="' + (page - 1) + '"'
      + (page <= 1 ? ' disabled' : '') + '>‹</button>'
      + nums
      + '<button type="button" class="lp-btn" data-action="lab-ops-page" data-page="' + (page + 1) + '"'
      + (page >= pages ? ' disabled' : '') + '>›</button>'
      + '</div></div></section>';
  }
  /* 环节无刷新切换（r15，黄总：切换不该闪烁——原 a href 整页跳转白屏）：
     pushState 换 URL + 局部重渲（流程条 active 迁移 + 详情区两块替换）；
     KPI / 批次表 / 日志与当前环节无关，不动；浏览器后退经 popstate 回同步。 */
  function labGoStage(sn, skipPush) {
    var stg = M.processStages.filter(function (x) { return x.n === sn; })[0];
    if (!stg) { return; }
    if (!skipPush) { window.history.pushState({}, '', url('lab.html', { stage: stg.n })); }
    document.querySelectorAll('.stage-item').forEach(function (it) {
      var on = it.getAttribute('data-stage') === String(stg.n);
      it.classList.toggle('is-active', on);
      if (on) { it.setAttribute('aria-current', 'page'); } else { it.removeAttribute('aria-current'); }
    });
    var grid = document.querySelector('.lab-main');
    if (!grid) { return; }
    var tmp = document.createElement('div');
    tmp.innerHTML = labDetailHTML(stg);
    var nodes = [];
    for (var i = 0; i < tmp.childNodes.length; i++) {
      if (tmp.childNodes[i].nodeType === 1) { nodes.push(tmp.childNodes[i]); }
    }
    /* r20：labDetailHTML 单节点（详情卡，卡头已融入）；lab-main 直子级 = 详情卡 + 日志卡，
       section.card 首匹配即详情卡 */
    var card = grid.querySelector(':scope > section.card');
    if (card && nodes[0]) { grid.replaceChild(nodes[0], card); }
  }
  function initLab() {
    var cur = currentStage();
    if (!cur) {
      $('page-root').innerHTML = '<div class="page-head"><div><h1>实验中心</h1>'
        + '<div class="sub">暂无环节登记</div></div></div>';
      return;
    }
    /* r12-1：header → KPI → 流程条 → 详情区（设备运行卡 + 批次表左右排）
       r13：详情区下全宽操作日志
       r15：URL 无 stage 时 replaceState 补当前环节——历史栈首格规范化，后退一致
       r16（黄总）：页面分区——顶部信息区（页头 + KPI）→ 内容区左右分栏：
       左列 = 纵向环节列表（导航），右列 = 详情（内容展示）
       r25（黄总）：操作日志 = 页面第三行（全宽） */
    if (!q('stage', '')) { window.history.replaceState({}, '', url('lab.html', { stage: cur.n })); }
    $('page-root').innerHTML = '<div class="lab-shell">'
      + labTopbarHTML()
      + labStatsHTML()
      + '<div class="lab-body">'
      + labStageListHTML(cur)
      + '<div class="lab-main">'
      + labDetailHTML(cur) + '</div></div>'
      /* r25（黄总）：操作日志提升为页面第三行（全宽），不再并在右侧内容区 */
      + labOpsHTML() + '</div>';
  }

  /* ==========================================================================
   * 9. boot + 事件委托
   * ======================================================================== */
  var UI = {
    page: 'index',
    sessionId: '', msgs: [], evidence: [],
    panelTab: '', pendingConfirm: -1, toastTimer: null, labOpsF: { res: '', sid: '', eq: '' },
    sampleSel: '', skillSel: '',   /* 挂载上下文：科研对象 / 技能（驱动 currentSample / matchIntent） */
    mountTool: '', mountScp: '',   /* 挂载上下文：工具 / SCP（注入任务槽位，随留痕可回溯） */
    attachMenu: { open: false, level: 1, cat: '' },  /* 输入盒「+」挂载菜单状态 */
    attachHintAt: -1,              /* 输入框内触发挂载菜单的 @ / 位置（-1 = 无），选中后自动清除该字符 */
    simView: {},                   /* 仿真版本查看：{engine: eid}，用户在运行历史里点选的历史版 */
    renames: {},                   /* 样品重命名表（boot 时从 localStorage 读入） */
    panelW: 0,                     /* 工作台宽度（v3.28：用户拖拽后存 px，0 = 默认等宽） */
    fsOpen: false,                 /* 配方切换控件展开态（v3.70，会话内状态） */
    fsSel: '',                     /* 选中的配方组 key（v3.70，'' = 默认最新一组） */
    candSel: null,                 /* 候选显式选用 {formula: id, process: id}（v3.74，null = 默认 AI 推荐） */
    confirmCard: null,             /* v3.52 确定性确认卡：{kind:'formula'|'process', idx, done} */
    demoStep: 0,                   /* v3.38：空点发送逐轮吐预置脚本的进度（0..N；手动输入后置 -1 退出演示） */
    _init: false, _qSeeded: false, _scrollEnd: false, _planTimer: null, _streamTimer: null, _pendingSeed: '', _draft: ''
  };

  function boot(page) {
    UI.page = page;
    if (!UI._init) {
      UI.evidence = lsJson(LS.evidence) || [];
      /* v3.28：工作台拖拽宽度（无效值回落默认等宽；上下限在 applyPanelWidth 夹逼） */
      var _pw = lsJson(LS.panelW);
      UI.panelW = (typeof _pw === 'number' && isFinite(_pw) && _pw > 0) ? _pw : 0;
      /* v3.12：用户新建样品一次性并入 M.samples（findSample / 台账 / 总览 / 产线全同源）；
         v3.22：先剔除被软隐藏的内置样品 */
      var _tombs = lsJson(LS.tombs) || [];
      M.samples = M.samples.filter(function (s) { return _tombs.indexOf(s.sample_id) < 0; });
      M.samples = M.samples.concat(lsJson(LS.samples) || []);
      /* v3.42：手动上传的实验数据合并进样品（em 替换、性能/本征追加；measured 口径） */
      var _smpData = lsJson(LS.smpData) || {};
      M.samples.forEach(function (s) {
        var d = _smpData[s.sample_id];
        if (!d) { return; }
        if (d.em) { s.em = d.em; }
        if (d.performance && d.performance.length) { s.performance = (s.performance || []).concat(d.performance); }
        if (d.intrinsic && d.intrinsic.length) { s.intrinsic = (s.intrinsic || []).concat(d.intrinsic); }
      });
      /* v3.17：样品重命名表（smpTitle 统一读取，全站同名） */
      UI.renames = lsJson(LS.renames) || {};
      UI.sessionId = q('c', '') || lsJson(LS.cur) || '';
      var sess = UI.sessionId ? findSession(UI.sessionId) : null;
      if (sess) {
        UI.msgs = sess.msgs || [];
        /* v3.38：打开有内容的历史会话 → 退出演示；空会话仍可从第 0 步演示 */
        if (UI.msgs.length) { UI.demoStep = -1; }
      }
      if (!UI.sessionId) { newChat(); }
      /* 恢复会话：动画中途刷新的尾部 plan 立即补完（结果 + 留痕），避免悬挂 */
      settleTailPlan();
      /* v3.52：会话加载后按最后一条配方/工艺产物 seed 确认卡 */
      seedConfirmCard();
      /* ?q= 旧外链原句并入会话：留到 boot 完成后走标准提交流（含执行动画） */
      var qq = q('q', '');
      if (qq && !UI._qSeeded) {
        UI._qSeeded = true;
        UI._pendingSeed = qq;
      }
      UI._init = true;
    }
    renderChrome(page);
    /* toast 容器常驻（原由抽屉代为创建，抽屉移除后在 boot 里保证存在） */
    var ov = $('overlays');
    if (ov && !$('toast')) {
      var t = document.createElement('div');
      t.id = 'toast'; t.className = 'toast';
      t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite');
      ov.appendChild(t);
    }
    if (page === 'index') { initIndex(); }
    else if (page === 'sample') { initSample(); }
    else if (page === 'skills') { initSkills(); }
    else if (page === 'kb') { initKb(); }
    else if (page === 'lab') { initLab(); }
    if (UI._scrollEnd) { UI._scrollEnd = false; scrollFlowEnd(); }
    if (page === 'index' && UI._pendingSeed) {
      var s = UI._pendingSeed;
      UI._pendingSeed = '';
      submitTaskText(s);
    }
  }

  function onClick(e) {
    var el = closestEl(e.target, '[data-action]');
    /* D-52：点击「添加」菜单以外区域时收起下拉（命中菜单项时由各 case 自行关闭） */
    var plMenu = $('pl-menu');
    if (plMenu && !plMenu.hidden && !closestEl(e.target, '.pl-menu-wrap')) { plMenu.hidden = true; }
    /* v3.52：caret 卡片打开时，点击卡片外任何位置（含 textarea 内其他位置）都关闭 */
    if (UI.attachMenu.open && UI.attachHintAt >= 0 && !closestEl(e.target, '.attach-caret')) {
      closeAttachMenu();
    }
    if (!el) {
      /* 点击空白处关闭「+」挂载菜单（不重绘 composer，草稿无感） */
      if (UI.attachMenu.open && !closestEl(e.target, '.attach-menu') && !closestEl(e.target, '.attach-submenu')) { closeAttachMenu(); }
      return;
    }
    var a = el.getAttribute('data-action');
    switch (a) {
      case 'attach-open':
        e.preventDefault();
        if (UI.attachMenu.open) { closeAttachMenu(); }
        else { UI.attachMenu.open = true; UI.attachMenu.level = 1; UI.attachMenu.cat = ''; UI.attachHintAt = -1; renderAttachMenu(); }
        break;
      case 'attach-cat':
        e.preventDefault();
        UI.attachMenu.level = 2; UI.attachMenu.cat = el.getAttribute('data-cat');
        renderAttachMenu();
        break;
      case 'attach-back':
        e.preventDefault();
        UI.attachMenu.level = 1; UI.attachMenu.cat = '';
        renderAttachMenu();
        break;
      case 'attach-pick': {
        e.preventDefault();
        var cat = el.getAttribute('data-cat'), id = el.getAttribute('data-id');
        var label = '';
        if (cat === 'sample') { UI.sampleSel = id; var smp = findSample(id); label = smp ? smpTitle(smp) : id; }
        else if (cat === 'skill') { UI.skillSel = id; var sk = skillById(id); label = sk ? sk.name : id; }
        else if (cat === 'tool') { UI.mountTool = id; var tl = toolById(id); label = tl ? tl.name : id; }
        else if (cat === 'scp') { UI.mountScp = id; var sp = scpById(id); label = sp ? sp.name : id; }
        /* 先记下 @ / / 触发位置：closeAttachMenu 会复位 UI.attachHintAt */
        var trigAt = UI.attachHintAt;
        closeAttachMenu();
        /* v3.58：原子块文本 = 样品「SMP-xxx · 名称」（ID 驱动上下文，保留）；技能/工具/SCP = 仅名称
         * （黄总：技能卡片不需要编号）。句式不预填，正常输入文字保持独立。 */
        var ti = $('task-input');
        if (ti) {
          var blockText = (cat === 'sample') ? (id + ' · ' + label) : label;
          insertMentionBlock(ti, cat, id, blockText, trigAt);
          UI._draft = ti.innerHTML;
        }
        toast('已挂载' + (attachCat(cat) ? attachCat(cat).name : cat) + '：' + label);
        break;
      }
      case 'attach-remove': {
        e.preventDefault();
        var rcat = el.getAttribute('data-cat');
        if (rcat === 'sample') { UI.sampleSel = ''; }
        else if (rcat === 'skill') { UI.skillSel = ''; }
        else if (rcat === 'tool') { UI.mountTool = ''; }
        else if (rcat === 'scp') { UI.mountScp = ''; }
        /* v3.52：chip 已移除，此 case 兼容旧 DOM——同步删输入框里对应的原子块 */
        var tii = $('task-input');
        if (tii) {
          var blk = tii.querySelector('.mention-block[data-cat="' + rcat + '"]');
          if (blk) {
            var nb = blk.nextSibling;
            blk.parentNode.removeChild(blk);
            if (nb && nb.nodeType === 3 && nb.nodeValue === ' ') { nb.parentNode.removeChild(nb); }
            UI._draft = tii.innerHTML;
          }
        }
        toast('已移除挂载');
        break;
      }
      case 'go-home':
        /* v3.58：品牌点击 = 回对话主页空态。preventDefault 阻止整页导航恢复 localStorage 旧会话；
         * newChat 开新会话（LS.cur 更新），本页 boot 或跨页跳转后均为空态首页。 */
        e.preventDefault();
        newChat();
        if (UI.page !== 'index') { window.location.href = url('index.html', {}); }
        else { boot('index'); }
        break;
      case 'new-chat':
        e.preventDefault();
        newChat();
        if (UI.page !== 'index') { window.location.href = url('index.html', {}); }
        else { boot('index'); toast('已新建对话'); }
        break;
      case 'sample-tab': {
        /* 科研对象分区切换：纯 DOM 切 hidden，不重渲染；?tab= 支持深链 */
        e.preventDefault();
        var tabKey = el.getAttribute('data-tab');
        var bar = closestEl(el, '.tabbar');
        if (bar) {
          var tabs = bar.querySelectorAll('.tab');
          for (var ti = 0; ti < tabs.length; ti++) {
            tabs[ti].classList.toggle('active', tabs[ti] === el);
            tabs[ti].setAttribute('aria-selected', String(tabs[ti] === el));
          }
        }
        var main = closestEl(el, '.sample-main');
        if (main) {
          var panes = main.querySelectorAll('.samp-pane');
          for (var pi = 0; pi < panes.length; pi++) {
            panes[pi].hidden = panes[pi].getAttribute('data-pane') !== tabKey;
          }
        }
        /* v3.25：切到仿真 tab 时重绘曲线（隐藏状态下 canvas 宽度为 0，首次绘制会跳过） */
        if (tabKey === 'sim') { drawSimCharts(currentSample()); }
        break;
      }
      case 'copy-script': {
        /* 运行脚本专区（v3.19）：复制脚本全文，text 存在 UI.simScripts 注册表里 */
        e.preventDefault();
        var scriptKey = el.getAttribute('data-key');
        var scriptText = (UI.simScripts || {})[scriptKey] || '';
        if (!scriptText) { break; }
        var copied = function () { toast('脚本已复制：' + scriptKey); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(scriptText).then(copied, function () { legacyCopy(scriptText); copied(); });
        } else {
          legacyCopy(scriptText);
          copied();
        }
        break;
      }
      case 'sim-dl': {
        /* 输出产物文件下载（v3.22）：Blob + a.download；内容在 UI.simFiles 注册表 */
        e.preventDefault();
        var fkey = el.getAttribute('data-key');
        var fcontent = (UI.simFiles || {})[fkey];
        if (!fcontent) { break; }
        var blob = new Blob([fcontent], { type: 'application/octet-stream' });
        var aEl = document.createElement('a');
        aEl.href = URL.createObjectURL(blob);
        aEl.download = fkey;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
        window.setTimeout(function () { URL.revokeObjectURL(aEl.href); }, 1000);
        toast('已下载产物：' + fkey);
        break;
      }
      case 'cc-nav': {
        /* v3.52：确认卡左右切换候选（2-3 个循环） */
        e.preventDefault();
        var ccN = UI.confirmCard;
        if (!ccN) { break; }
        var listN = ccN.kind === 'formula' ? M.candidates : M.processPacks;
        ccN.idx = (ccN.idx + parseInt(el.getAttribute('data-dir'), 10) + listN.length) % listN.length;
        boot('index');
        break;
      }
      case 'cc-dismiss': {
        /* v3.52：忽略本批产物——卡片消失，本会话不再提示 */
        e.preventDefault();
        if (UI.confirmCard) { UI.confirmCard.done = true; }
        boot('index');
        break;
      }
      case 'cc-save-current': {
        /* v3.52：把当前候选挂到当前样品（已有卡片）——新增一条留痕事件 */
        e.preventDefault();
        var ccS = UI.confirmCard;
        if (!ccS) { break; }
        var cur = (ccS.kind === 'formula' ? M.candidates : M.processPacks)[ccS.idx];
        var sidS = currentSample().sample_id;
        var evS = {
          eid: 'EVS-CC-' + Date.now().toString(36), run_id: 'RUN-CC-' + UI.sessionId,
          run_key: sidS + '|save|' + cur.id + '|v1', parent: null, sample_id: sidS,
          engine: ccS.kind === 'formula' ? '配方确认' : '工艺确认', status: 'succeeded', ts: stampNow(),
          actor: UI.sessionId || 'SES-LOCAL', source: 'tool', tool_version: 'demo',
          task: { name: (ccS.kind === 'formula' ? '候选配方' : '工艺参数包') + '确认挂样：' + cur.id, note: '由确认卡存到当前样品' }
        };
        var storedS = lsJson(LS.simEvents) || [];
        storedS.push(evS);
        lsSet(LS.simEvents, storedS);
        ccS.done = true;
        boot('index');
        toast('已把 ' + cur.id + ' 存到样品 ' + sidS);
        break;
      }
      case 'cc-create': {
        /* v3.52：把当前候选创建为新科研对象——新增样品对象（待制样、数据待补）；
           v3.67：仅配方候选可创建（以配方为主 key）；工艺包是下游产物，防御性拦截 */
        e.preventDefault();
        var ccC = UI.confirmCard;
        if (!ccC || ccC.kind !== 'formula') { break; }
        var src = (ccC.kind === 'formula' ? M.candidates : M.processPacks)[ccC.idx];
        var nid = src.id;
        if (!findSample(nid)) {
          var newSmp = {
            sample_id: nid, title: (ccC.kind === 'formula' ? '配方 ' : '工艺包 ') + nid,
            grade: (ccC.kind === 'formula' && /N\d{2}/.test(nid) ? nid.match(/N\d{2}/)[0] : currentSample().grade),
            form_id: 'FORM-' + nid,
            stage: '待制样', batch: '—', made: '—', spec: '—',
            target: ccC.kind === 'formula' ? 'Hcj ≥ 15 kOe' : '工艺包验证',
            formula: ccC.kind === 'formula'
              ? { version: nid, source: 'predicted', tool_call_id: null,
                  comps: src.comps.map(function (r) { return [r[0], String(r[1])]; }) }
              : { version: '—', source: 'predicted', tool_call_id: null, comps: [] },
            process: ccC.kind === 'process'
              ? src.steps.map(function (s, i) { return { n: i + 1, state: 'pending', param: s[1] }; })
              : (M.processStages || []).map(function (st) { return { n: st.n, state: 'pending', param: '—' }; }),
            performance: ccC.kind === 'formula'
              ? [['Hcj', src.pred.Hcj + ' kOe'], ['Br', src.pred.Br + ' kGs'], ['(BH)max', src.pred.BHmax + ' MGOe']]
                  .map(function (r) { return { key: r[0], value: r[1], flag: 'predicted', src: '确认卡创建' }; })
              : [],
            structure: [], intrinsic: [],
            design_note: src.note || '', _user: true
          };
          M.samples.push(newSmp);
          var userSmps = lsJson(LS.samples) || [];
          userSmps.push(newSmp);
          lsSet(LS.samples, userSmps);
        }
        ccC.done = true;
        boot('index');
        toast('已创建科研对象 ' + nid + '（预测口径，待制样验证）');
        break;
      }
      case 'sim-archive': {
        /* 归档到样品（v3.27）：把工作台这次仿真 append 进 LS.simEvents（事件流），
           档案页从事件流投影——演示"对话不受控 → 确定信息同步进档案"。 */
        e.preventDefault();
        var ak = el.getAttribute('data-key');
        var ev = (UI.simArchive || {})[ak];
        if (!ev) { break; }
        var stored = lsJson(LS.simEvents) || [];
        /* 同一 run_key 已在流里 → 记一条重复执行（投影会幂等合并，dupRuns 计数） */
        stored.push(ev);
        lsSet(LS.simEvents, stored);
        toast('已归档到样品 ' + ev.sample_id + ' · 可在档案「仿真数据」查看运行历史');
        break;
      }
      case 'sim-version': {
        /* 兼容旧按钮触发（v3.27） */
        e.preventDefault();
        switchSimVersion(el.getAttribute('data-eid'));
        break;
      }
      case 'skills-tab': {
        /* 插件页分区切换（D-46）：纯 DOM 切 hidden，不重渲染、不跳页；?tab= 支持深链 */
        e.preventDefault();
        var plTab = el.getAttribute('data-tab');
        var plBar = closestEl(el, '.tabbar');
        if (plBar) {
          var plTabs = plBar.querySelectorAll('.tab');
          for (var pi2 = 0; pi2 < plTabs.length; pi2++) {
            plTabs[pi2].classList.toggle('active', plTabs[pi2] === el);
            plTabs[pi2].setAttribute('aria-selected', String(plTabs[pi2] === el));
          }
        }
        var plWrap = closestEl(el, '.wrap');
        if (plWrap) {
          var plPanes = plWrap.querySelectorAll('.pl-pane');
          for (var pp = 0; pp < plPanes.length; pp++) {
            plPanes[pp].hidden = plPanes[pp].getAttribute('data-pane') !== plTab;
          }
        }
        break;
      }
      case 'em-overlay': {
        /* 电镜图叠加层切换：原始 / 晶粒轮廓 / 晶界轮廓 / 图网络 */
        e.preventDefault();
        var cv = $('em-canvas');
        var smp2 = currentSample();
        if (cv && smp2.em) { drawEM(cv, el.getAttribute('data-ov') || 'raw', smp2.em); }
        var tools = closestEl(el, '.em-tools');
        if (tools) {
          var ovs = tools.querySelectorAll('.em-ov');
          for (var oi = 0; oi < ovs.length; oi++) { ovs[oi].classList.toggle('active', ovs[oi] === el); }
        }
        break;
      }
      case 'task-example':
        e.preventDefault();
        submitTaskText(el.getAttribute('data-text') || '');
        break;
      case 'task-generate':
        e.preventDefault();
        submitTaskText(inputText($('task-input')));
        break;
      /* v3.9：'task-clear' 入口移除——输入盒只留「发送」；复位 = 侧栏「新建对话」 */
      case 'panel-tab':
        /* v3.3 右栏 tab 切换：只局部重渲染面板，不动对话流与输入框 */
        e.preventDefault();
        UI.panelTab = el.getAttribute('data-tab') || 'status';
        UI.fsOpen = false;  /* v3.71：切 tab 收起配方下拉 */
        var wp = $('work-panel');
        if (wp) { wp.outerHTML = panelHTML(); }
        break;
      /* v3.70 配方切换控件：点击展开 / 收起配方列表（tab 条下方第二行）；
         选中某配方后产物 tab 只显示该组产物，当前 tab 不在组内时自动落回检索结果 */
      /* v3.71：fs-toggle 展开的是控件自身下拉菜单（.wp-fs-menu fixed 浮层）——
         wp-tabs 的 overflow-x:auto 会裁剪 absolute 子元素，fixed 不受裁剪，
         渲染后按按钮实际位置定位到其正下方 */
      case 'fs-toggle':
        e.preventDefault();
        UI.fsOpen = !UI.fsOpen;
        var wpT = $('work-panel');
        if (wpT) { wpT.outerHTML = panelHTML(); }
        if (UI.fsOpen) {
          var fsBtn = document.querySelector('.wp-fs-btn');
          var fsMenu = document.querySelector('.wp-fs-menu');
          if (fsBtn && fsMenu) {
            var fr = fsBtn.getBoundingClientRect();
            fsMenu.style.left = Math.round(fr.left) + 'px';
            fsMenu.style.top = Math.round(fr.bottom + 6) + 'px';
            fsMenu.style.width = Math.round(fr.width) + 'px';  /* v3.73：菜单与胶囊齐宽 */
          }
        }
        break;
      case 'fs-pick':
        e.preventDefault();
        UI.fsSel = el.getAttribute('data-key') || '';
        UI.fsOpen = false;
        var wpS = $('work-panel');
        if (wpS) { wpS.outerHTML = panelHTML(); }
        break;
      /* v3.74 候选卡「选用」：显式选定配方 / 工艺包（默认 AI 推荐），toast 反馈 */
      case 'cand-pick': {
        e.preventDefault();
        var cpKind = el.getAttribute('data-kind') || 'formula';
        var cpId = el.getAttribute('data-id') || '';
        UI.candSel = UI.candSel || {};
        UI.candSel[cpKind] = cpId;
        toast('已选用 ' + cpId + (cpKind === 'formula' ? ' · 后续仿真 / 工艺将基于该候选' : ' · 执行排产基于该工艺包'));
        var wpC = $('work-panel');
        if (wpC) { wpC.outerHTML = panelHTML(); }
        break;
      }
      /* ---- 科学工具（D-52）：「添加」展开来源菜单；上传文件 = 按当前 tab 模拟加卡；
         从端砚平台导入 = 接口占位（黄总后续对接平台工具库） ---- */
      case 'pl-import': {
        e.preventDefault();
        var pm = $('pl-menu');
        if (pm) { pm.hidden = !pm.hidden; }
        break;
      }
      case 'pl-import-upload': {
        e.preventDefault();
        var curTabEl = document.querySelector('.tabbar .tab.active');
        var ct = curTabEl ? curTabEl.getAttribute('data-tab') : 'skill';
        var tpl = PL_UPLOAD_POOL[ct] || PL_UPLOAD_POOL.skill;
        UI._plUpN = (UI._plUpN || 0) + 1;
        var uid = '-U' + UI._plUpN;
        if (ct === 'tool') {
          M.tools.push({ tool_id: 'T' + uid, name: tpl.name, kind: tpl.kind, output: tpl.output, numeric: tpl.numeric, desc: tpl.desc });
        } else if (ct === 'scp') {
          M.scps.push({ scp_id: 'SCP' + uid, name: tpl.name, proto: tpl.proto, status: tpl.status, desc: tpl.desc });
        } else {
          M.skills.push({ skill_id: 'SK' + uid, name: tpl.name, stage: tpl.stage, desc: tpl.desc, tools: tpl.tools });
        }
        /* 留在当前 tab 重渲染（initSkills 会回 ?tab= 默认页，故直调 skillsPageHTML） */
        $('page-root').innerHTML = '<div class="wrap wrap-wide">' + skillsPageHTML(ct) + '</div>';
        toast('已模拟上传到当前分类（刷新页面恢复演示初始数据）');
        break;
      }
      case 'pl-import-duanyan': {
        e.preventDefault();
        var pm2 = $('pl-menu');
        if (pm2) { pm2.hidden = true; }
        toast('端砚平台接口对接中（后续接入平台工具库，静态演示占位）');
        break;
      }
      /* ---- 实验中心（v3.7-r4 发起任务 / r9 异常处置） ---- */
      case 'lab-new':
        e.preventDefault();
        labOpenNew();
        break;
      case 'lab-new-close':
        e.preventDefault();
        if (el.classList.contains('kb-mask') && closestEl(e.target, '.kb-modal')) { break; }
        labCloseNew();
        break;
      case 'lab-new-submit': {
        e.preventDefault();
        var sel = $('lab-new-sample');
        var sv = sel ? sel.value : '';
        var queue = lsJson(LS.labQueue) || [];
        queue.push({ id: sv, ts: stampNow() });
        lsSet(LS.labQueue, queue);
        labCloseNew();
        toast('已登记：' + (sv === 'NEW' ? '新样品' : sv) + ' 制备任务进入工序 1 队列（见操作日志「当前」）');
        if (UI.page === 'lab') { initLab(); }
        break;
      }
      /* 异常处置（r9）：复核放行 = n6 done（去 warn）+ n7 在制并跳转工序 7；
         驳回 = 样品终止流转，产线清空。内存态：改 MOCK 重渲染，刷新即还原 */
      case 'lab-review-pass': {
        e.preventDefault();
        var smpP = null;
        M.samples.forEach(function (s) { if (s.sample_id === 'SMP-002') { smpP = s; } });
        if (smpP) {
          smpP.process.forEach(function (pr) {
            if (pr.n === 5) {
              pr.state = 'done'; delete pr.warn;
              pr.param = 'N₂ · 0.6 MPa · D50 = 4.2 μm · 氧 2980 ppm（复测）';
              if (pr.kv) { pr.kv = [['工作气体', 'N₂'], ['气体压力', '0.6 MPa'], ['粒径分布 D10/D50/D90', 'D50 = 4.2 μm'], ['氧含量', '2980 ppm']]; }
            }
            if (pr.n === 6) { pr.state = 'current'; pr.param = '3 批次称重复核一致（进行中）'; }
          });
          smpP.stage = '工艺执行中';
        }
        toast('已复核放行：SMP-002 进入工序 6（混料）——静态演示内存态，刷新还原');
        /* pushState 换 URL 不重载页面（保内存态），重渲染到工序 7 看样品继续流转 */
        window.history.pushState({}, '', url('lab.html', { stage: 6 }));
        initLab();
        break;
      }
      case 'lab-review-reject': {
        e.preventDefault();
        var smpR = null;
        M.samples.forEach(function (s) { if (s.sample_id === 'SMP-002') { smpR = s; } });
        if (smpR) {
          smpR.process.forEach(function (pr) {
            if (pr.n === 5) { pr.state = 'done'; delete pr.warn; }
          });
          smpR.stage = '异常驳回 · 已终止';
        }
        toast('已驳回：SMP-002 转入异常处置，不再流转（静态演示内存态，刷新还原）');
        initLab();
        break;
      }
      /* 日志分页（r14）：页码由按钮携带，仅替换日志卡不重渲整页（保视口位置） */
      case 'lab-ops-page': {
        e.preventDefault();
        if (el.disabled) { break; }
        var pg = parseInt(el.getAttribute('data-page'), 10);
        var opsCard = document.querySelector('.lab-ops');
        if (opsCard && pg >= 1) { opsCard.outerHTML = labOpsHTML(pg, UI.labOpsF); }
        break;
      }
      /* 环节切换（r15）：无刷新局部切换，防整页跳转闪烁 */
      case 'lab-stage': {
        e.preventDefault();
        labGoStage(parseInt(el.getAttribute('data-stage'), 10));
        break;
      }
      /* ---- 知识库（D-42）：预览开合 / 模拟上传 / 删除 ---- */
      case 'kb-view':
        e.preventDefault();
        kbOpenModal(el.getAttribute('data-doc'), '');
        break;
      case 'kb-close':
        e.preventDefault();
        /* 点 mask 空白才关；点击落在弹窗内部（closest 命中 mask）不关 */
        if (el.classList.contains('kb-mask') && closestEl(e.target, '.kb-modal')) { break; }
        kbCloseModal();
        break;
      case 'kb-upload':
        e.preventDefault();
        var up = lsJson(LS.kbMine) || [];
        var tpl = KB_UPLOAD_POOL[up.length % KB_UPLOAD_POOL.length];
        var nd = {
          doc_id: 'KB-U' + String(Date.now()).slice(-6),
          title: tpl.title, type: tpl.type, desc: tpl.desc,
          updated: stampNow().slice(0, 16), size: tpl.size, status: '已索引',
          sections: tpl.sections
        };
        up.push(nd); lsSet(LS.kbMine, up);
        toast('已上传并进入检索范围（静态演示为模拟上传）');
        initKb();
        break;
      case 'kb-del':
        e.preventDefault();
        var did = el.getAttribute('data-doc');
        var ups = lsJson(LS.kbMine) || [];
        var di = -1;
        ups.forEach(function (d, j) { if (d.doc_id === did) { di = j; } });
        if (di >= 0) {
          ups.splice(di, 1); lsSet(LS.kbMine, ups);
          toast('已删除上传文档 ' + did);
        } else {
          for (var dj = 0; dj < M.kb.mine.length; dj++) {
            if (M.kb.mine[dj].doc_id === did) { M.kb.mine.splice(dj, 1); break; }
          }
          toast('已删除文档 ' + did + '（刷新页面可恢复演示初始数据）');
        }
        initKb();
        break;
      /* ---- 样品总览（v3.12 新建/删除；v3.17 查看/重命名/带样品对话） ---- */
      case 'smp-open':
        e.preventDefault();
        window.location.href = url('sample.html', { sample_id: el.getAttribute('data-id') });
        break;
      case 'smp-chat':
        e.preventDefault();
        window.location.href = url('index.html', { sample_id: el.getAttribute('data-id') });
        break;
      case 'smp-rename': {
        /* 标题原地变输入框；Enter/blur 保存，Esc 取消 */
        e.preventDefault();
        var rnCard = closestEl(el, '.ov-card');
        var titleEl = rnCard ? rnCard.querySelector('.ov-title') : null;
        if (!titleEl) { break; }
        titleEl.innerHTML = '<input type="text" class="ov-rename" data-action="smp-rename-input" data-id="'
          + esc(el.getAttribute('data-id')) + '" value="' + esc(titleEl.textContent) + '" aria-label="重命名样品">';
        var inp = titleEl.querySelector('input');
        if (inp && inp.focus) { inp.focus(); if (inp.select) { inp.select(); } }
        break;
      }
      case 'smp-rename-detail': {
        /* 详情页标题原地编辑：仅名称部分可变输入框，编号前缀保留 */
        e.preventDefault();
        var pt = closestEl(el, '.ph-title');
        if (!pt) { break; }
        var smp3 = currentSample();
        pt.innerHTML = '<h1>' + esc(smp3.sample_id) + ' · <input type="text" class="ov-rename ph-rename"'
          + ' data-action="smp-rename-input" data-id="' + esc(smp3.sample_id) + '" value="' + esc(smpTitle(smp3)) + '"'
          + ' aria-label="重命名样品"></h1>';
        var pinp = pt.querySelector('input');
        if (pinp && pinp.focus) { pinp.focus(); if (pinp.select) { pinp.select(); } }
        break;
      }
      case 'smp-rename-input':
        e.preventDefault();   /* 吃掉输入框点击，防冒泡触发卡片 smp-open 跳页 */
        break;
      /* ---- v3.42 手动上传实验数据：弹窗开关 + 模拟上传登记 ---- */
      case 'smp-upload-open':
        e.preventDefault();
        smpUploadOpen(el.getAttribute('data-id'));
        break;
      case 'smp-upload-close':
        e.preventDefault();
        /* 点 mask 空白才关；点击落在弹窗内部（closest 命中 mask）不关 */
        if (el.classList.contains('kb-mask') && closestEl(e.target, '.kb-modal')) { break; }
        smpUploadClose();
        break;
      case 'smp-upload-submit': {
        e.preventDefault();
        var sidU = el.getAttribute('data-id');
        var kindU = el.getAttribute('data-kind');
        var smpU = null;
        M.samples.forEach(function (s) { if (s.sample_id === sidU) { smpU = s; } });
        if (!smpU || !SMP_UPLOAD_TPL[kindU]) { break; }
        var tplU = SMP_UPLOAD_TPL[kindU];
        var dataU = tplU.make(smpU);
        /* 本会话即时写入 M + LS 持久化（刷新后 boot 合并恢复） */
        var storeU = lsJson(LS.smpData) || {};
        var recU = storeU[sidU] = storeU[sidU] || {};
        if (kindU === 'em') {
          smpU.em = dataU; recU.em = dataU;
        } else if (kindU === 'perf') {
          smpU.performance = (smpU.performance || []).concat(dataU);
          recU.performance = (recU.performance || []).concat(dataU);
        } else {
          smpU.intrinsic = (smpU.intrinsic || []).concat(dataU);
          recU.intrinsic = (recU.intrinsic || []).concat(dataU);
        }
        lsSet(LS.smpData, storeU);
        /* 写留痕：measured 口径，来源人工上传 */
        UI.evidence.push({
          ev_id: 'EV-' + (100 + allEvidence().length + 1), ts: stampNow(), sample_id: sidU,
          skill_id: '', tool_call_id: '',
          action: '手动上传' + tplU.label + '数据',
          input: '人工测试后上传', output: tplU.label + '已登记为 measured 口径',
          source: '人工上传', truth_flag: 'measured', actor: '研究员'
        });
        lsSet(LS.evidence, UI.evidence);
        smpUploadClose();
        toast('已上传' + tplU.label + '数据（静态演示为模拟数据）');
        /* 重渲染后定位到实验数据 tab，让上传结果立即可见 */
        window.history.replaceState({}, '', url('sample.html', { sample_id: sidU, tab: 'exp' }));
        initSample();
        break;
      }
      case 'smp-del': {
        e.preventDefault();
        var did2 = el.getAttribute('data-id');
        /* 二次确认：首次点击进入确认态，2.5s 未确认自动恢复（保留原图标 innerHTML） */
        if (!el.classList.contains('is-arm')) {
          el.classList.add('is-arm');
          el.setAttribute('data-arm-html', el.innerHTML);
          el.textContent = '确认删除？';
          window.setTimeout(function () {
            el.classList.remove('is-arm');
            el.innerHTML = el.getAttribute('data-arm-html') || el.innerHTML;
          }, 2500);
          break;
        }
        var target2 = findSample(did2);
        if (target2 && target2._user) {
          /* 用户样品：真删——localStorage 层移除 + 留痕一并清除 */
          var mine2 = lsJson(LS.samples) || [];
          for (var si = 0; si < mine2.length; si++) { if (mine2[si].sample_id === did2) { mine2.splice(si, 1); break; } }
          lsSet(LS.samples, mine2);
          var evKeep = (lsJson(LS.evidence) || []).filter(function (x) { return x.sample_id !== did2; });
          lsSet(LS.evidence, evKeep);
          UI.evidence = evKeep;
          /* v3.42：该样品手动上传的实验数据一并清除 */
          var sdKeep = lsJson(LS.smpData) || {};
          if (sdKeep[did2]) { delete sdKeep[did2]; lsSet(LS.smpData, sdKeep); }
          toast('已删除样品 ' + did2 + '（其留痕一并清除）');
        } else {
          /* 内置示例：软隐藏——记入 tombstone，视图消失；清空浏览器数据后恢复 */
          var tombs = lsJson(LS.tombs) || [];
          tombs.push(did2); lsSet(LS.tombs, tombs);
          toast('已隐藏样品 ' + did2 + '（内置示例数据；清空浏览器数据后恢复）');
        }
        for (var sj = 0; sj < M.samples.length; sj++) { if (M.samples[sj].sample_id === did2) { M.samples.splice(sj, 1); break; } }
        initSample();
        break;
      }
    }
  }
  function onKeydown(e) {
    /* 重命名输入框：Enter 保存 / Esc 取消（优先于其他键位分支） */
    var rnInp = closestEl(e.target, '[data-action="smp-rename-input"]');
    if (rnInp) {
      if (e.key === 'Enter') { e.preventDefault(); saveRename(rnInp.getAttribute('data-id'), rnInp.value, rnInp); }
      if (e.key === 'Escape') { initSample(); }
      return;
    }
    /* 多行输入：Enter 发送，Shift+Enter 换行 */
    if (e.key === 'Enter' && !e.shiftKey && closestEl(e.target, '[data-action="task-input"]')) {
      e.preventDefault();
      submitTaskText(inputText(e.target));
    }
    if (e.key === 'Escape') {
      if (UI.attachMenu.open) { closeAttachMenu(); return; }
      kbCloseModal();
    }
  }

  /* 输入盒选择器（select change）：样品 = 会话样品上下文；技能 = 指定意图（空 = 自动识别）；
     v3.12 总览阶段筛选（ov-filter）也在此分支 */
  function onChange(e) {
    /* 重命名输入框失焦（change）即保存 */
    var rni = closestEl(e.target, '[data-action="smp-rename-input"]');
    if (rni) { saveRename(rni.getAttribute('data-id'), rni.value, rni); return; }
    var ovf = closestEl(e.target, '[data-action="ov-filter"]');
    if (ovf) { ovApplyFilter(); return; }
    /* r19：日志三维筛选（结果/样品/设备），切档回第 1 页 */
    var lof = closestEl(e.target, '[data-action="lab-ops-filter"]');
    if (lof) {
      UI.labOpsF[lof.getAttribute('data-kind')] = lof.value;
      var loCard = document.querySelector('.lab-ops');
      if (loCard) { loCard.outerHTML = labOpsHTML(1, UI.labOpsF); }
      return;
    }
    /* 仿真版本切换（v3.35）：卡头下拉选版本 → 重渲染该卡 */
    var vs = closestEl(e.target, '[data-action="sim-ver-sel"]');
    if (vs) { switchSimVersion(vs.value); }
  }

  function onInput(e) {
    if (closestEl(e.target, '[data-action="kb-search"]')) { kbFilterDocs(e.target.value); }
    if (closestEl(e.target, '[data-action="pl-search"]')) { filterCards('.pl-card', e.target.value); }
    if (closestEl(e.target, '[data-action="ov-search"]')) { ovApplyFilter(); }
    /* 输入框内键入 @ / /：唤起跟随光标的挂载卡片（@ 科研对象，/ 技能） */
    if (closestEl(e.target, '[data-action="task-input"]')) {
      var ta = e.target;
      var off = caretOffset(ta);
      var text = inputText(ta);
      /* caret 卡片开着时：触发符被删或光标移到触发符之前 → 关闭 */
      if (UI.attachHintAt >= 0) {
        var tc = text.charAt(UI.attachHintAt);
        if ((tc !== '@' && tc !== '/') || (off >= 0 && off <= UI.attachHintAt)) { closeAttachMenu(); }
      }
      if (off > 0) {
        var ch = text.charAt(off - 1);
        if ((ch === '@' || ch === '/') && UI.attachHintAt < 0) {
          UI.attachMenu.open = true; UI.attachMenu.level = 2;
          UI.attachMenu.cat = (ch === '@' ? 'sample' : 'skill');
          UI.attachHintAt = off - 1;
          renderAttachMenu();
        }
      }
      /* v3.52：块被整块删除时同步清挂载状态（块即上下文） */
      syncMountsFromBlocks(ta);
      /* 空内容清 <br> 残壳，保证 :empty placeholder 生效 */
      if (!inputText(ta).trim() && !ta.querySelector('.mention-block')) { ta.innerHTML = ''; }
      /* 草稿跟随（含原子块） */
      UI._draft = ta.innerHTML;
    }
  }

  /* v3.45：hover 一级类别项即展开对应二级（级联菜单手感）；仅 cat 变化时重绘 */
  function onMouseOver(e) {
    if (!UI.attachMenu.open) { return; }
    var it = closestEl(e.target, '.at-item[data-action="attach-cat"]');
    if (!it) { return; }
    var cat = it.getAttribute('data-cat');
    if (UI.attachMenu.level === 2 && UI.attachMenu.cat === cat) { return; }
    UI.attachMenu.level = 2; UI.attachMenu.cat = cat; UI.attachHintAt = -1;
    renderAttachMenu();
  }

  /* v3.52：contenteditable 粘贴一律转纯文本（不带入外部格式） */
  function onPaste(e) {
    var ta = closestEl(e.target, '[data-action="task-input"]');
    if (!ta) { return; }
    e.preventDefault();
    var t = (e.clipboardData || window.clipboardData).getData('text/plain');
    if (!t) { return; }
    if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, t);
    } else {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var r = sel.getRangeAt(0);
        r.deleteContents();
        r.insertNode(document.createTextNode(t));
        r.collapse(false);
      }
    }
    UI._draft = ta.innerHTML;
  }

  function start() {
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('paste', onPaste);
    /* v3.28：工作台宽度拖拽（pointer 事件，鼠标/触摸通用）+ 视口变化重新夹逼 */
    document.addEventListener('pointerdown', onSplitPointerDown);
    window.addEventListener('resize', function () { if (UI.page === 'index') { applyPanelWidth(); } });
    /* r15：lab 无刷新切换后，浏览器前进/后退经 popstate 回同步详情区 */
    window.addEventListener('popstate', function () {
      if (UI.page === 'lab') { var stg = currentStage(); if (stg) { labGoStage(stg.n, true); } }
    });
    var page = document.body.getAttribute('data-page') || 'index';
    boot(page);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }

  /* 冒烟测试出口（Node vm + DOM stub 使用） */
  window.App = {
    boot: boot, IntentProvider: IntentProvider, matchIntent: matchIntent,
    intentEvalReport: intentEvalReport, runToolsForTask: runToolsForTask,
    ctx: ctx, submitTaskText: submitTaskText, autoRunPlan: autoRunPlan,
    panelHTML: panelHTML, _ui: UI
  };
})();
