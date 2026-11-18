/* =============================================================================
 * 稀土材料科学平台 · 静态 Demo · 唯一数据源 window.MOCK（v3.0）
 * -----------------------------------------------------------------------------
 * v3.0（D-38，黄总 2026-11-12 新方向）：定位改为「AI 辅助的科学发现科研平台」。
 * 科研主链路（口述流程图对齐）：
 *   自然语言 → 意图识别 → 配方优化 ML 模型 + 第一性原理计算 → 更优配方
 *   → 配方工艺优化 ML 模型 → 一组工艺参数
 *   → 现实世界：样品送检测仪器 + 电镜 → 数据 / 图片 → 分析 → 结论
 *   → 以样品为单位管理（详情：过程数据 / 性能参数 / 结构数据 / 配方）
 *   → 数据闭环回流，优化垂类模型
 * Agent 形式编排 Skill；关键仿真工具：VASP 第一性原理计算 / mumax3 微磁学仿真。
 * 全部数据虚构；红线：无 fetch / 无真 LLM；simulated 产物不作为真值。
 * v3.7（黄总 2026-11-13）：新增 M.equipments——「实验中心」= 高通量制备
 *   产线数字孪生（只含制备设备；在制状态从样品 process 同源反推）。
 * ========================================================================== */
(function () {
  'use strict';

  var M = window.MOCK = {};

  M.version = 'v3.0-research-demo';

  /* ---------- 制备工序模板（真实钕铁硼流程 10 环节，固化；序号即工序号） ---------- */
  M.processStages = [
    { n: 1, name: '配料与称重', desc: '根据目标配方，称取各类金属及合金原料',
      fields: '配方 · 各原料实际称重 · 总重量' },
    { n: 2, name: '混料', desc: '将称量后的原料按比例配合，为熔炼做准备',
      fields: '1/2/3 号原始配方称重' },
    { n: 3, name: '真空熔炼', desc: '在真空或保护气氛下加热熔化原料，形成合金熔体',
      fields: '熔炼温度 · 保温时间 · 真空度 · 保护气体 · 压力' },
    { n: 4, name: '甩带', desc: '将合金熔体浇到旋转冷却辊上，快速冷却形成合金薄片',
      fields: '浇注温度 · 冷却辊转速 · 冷却水温度及流量 · 合金片厚度' },
    { n: 5, name: '氢破碎', desc: '利用合金吸氢后的膨胀开裂，使合金片破碎，并进行脱氢处理',
      fields: '吸氢温度 · 氢气压力 · 吸氢时间 · 脱氢温度及时间 · 脱氢真空度' },
    { n: 6, name: '气流磨', desc: '利用高速气流将粗粉进一步磨细，得到用于成型的磁粉',
      fields: '工作气体 · 气体压力 · 进料速度 · 分级轮转速 · 粒径分布 D10/D50/D90 · 氧含量' },
    { n: 7, name: '磁场取向和压制', desc: '通过磁场使磁粉的易磁化方向尽量一致，再压制成坯体',
      fields: '微升距离 · 成型尺寸 · 充磁电流 · 退磁电流 · 机械手混料次数' },
    { n: 8, name: '真空烧结', desc: '在高温下使粉末颗粒结合、坯体致密化，形成磁体毛坯',
      fields: '烧结温度 · 烧结时间' },
    { n: 9, name: '一级热处理', desc: '对烧结后的磁体进行较高温度的热处理，调整组织和晶界状态',
      fields: '一级热处理温度 · 一级热处理时间' },
    { n: 10, name: '二级热处理', desc: '进一步进行较低温度的热处理，调整晶界状态，改善磁性能',
      fields: '二级热处理温度 · 二级热处理时间' }
  ];

  /* ---------- 样品主实体：科研对象唯一锚点 ---------- */
  M.samples = [
    {
      sample_id: 'SMP-001', title: 'N52 装炉位置验证样', grade: 'N52',
      form_id: 'FORM-N52-v3',
      stage: '检测完成 · 待归档',
      batch: 'B-20261108-02', made: '2026-11-08', spec: 'Φ40×25 mm 圆柱坯',
      target: 'N52 达标（Hcj ≥ 14.5 kOe）',
      formula: {
        version: 'F-N52-v3', source: 'predicted', tool_call_id: 'TC-001',
        comps: [
          ['Nd', '28.5'], ['Pr', '1.2'], ['Dy', '1.8'], ['B', '0.98'],
          ['Co', '1.5'], ['Cu', '0.15'], ['Al', '0.6'], ['Fe', 'bal.']
        ]
      },
      process: [
        { n: 1, state: 'done', param: '总重 10.20 kg · 称重偏差 < ±0.05%' },
        { n: 2, state: 'done', param: '3 批次称重复核一致' },
        { n: 3, state: 'done', param: '1460℃ · 保温 25 min · 真空度 3×10⁻² Pa · Ar 保护' },
        { n: 4, state: 'done', param: '浇注 1450℃ · 辊速 2.2 m/s · 片厚 0.28 mm' },
        { n: 5, state: 'done', param: '吸氢 2.0 MPa × 2 h · 脱氢 550℃ × 3 h' },
        { n: 6, state: 'done', param: 'N₂ · 0.6 MPa · D50 = 4.2 μm · 氧 1800 ppm' },
        { n: 7, state: 'done', param: '取向 1.8 T · 成型 Φ40×25 mm · 充磁 2800 A' },
        { n: 8, state: 'done', param: '1060℃ × 4 h' },
        { n: 9, state: 'done', param: '520℃ × 2 h' },
        { n: 10, state: 'done', param: '480℃ × 3 h' }
      ],
      performance: [
        { key: 'Br', value: '14.2 kGs', flag: 'measured', src: '检测报告 RPT-20261110-01', tool_call_id: 'TC-004' },
        { key: 'Hcj', value: '14.2 kOe', flag: 'measured', src: '检测报告 RPT-20261110-01', tool_call_id: 'TC-004' },
        { key: '(BH)max', value: '50.1 MGOe', flag: 'measured', src: '检测报告 RPT-20261110-01', tool_call_id: 'TC-004' },
        { key: 'Hk/Hcj 方形度', value: '96.5 %', flag: 'measured', src: '检测报告 RPT-20261110-01', tool_call_id: 'TC-004' },
        { key: '可逆温度系数 α(Br)', value: '−0.11 %/℃', flag: 'measured', src: '检测报告 RPT-20261110-01', tool_call_id: 'TC-004' }
      ],
      /* 电镜分析（6.4 输出）：实验参数 + 定量分析；晶粒几何由 app.js 按种子程序化生成，
         图片叠加层（晶粒轮廓/晶界轮廓/图网络）与统计数据同源自洽 */
      em: {
        sample_no: 'A1', scope: 'CLARA', mag: '5,000×', px: '0.085 μm/px', view: '44 μm 视场 · 二次电子像',
        seed: 20261111, grainN: 48,
        gbFraction: '6.8 %', mainOri: '2.4°', triGb: '18 个', spread: '1.2 μm',
        morph: [['球形度', '0.82'], ['凸度', '0.91'], ['粗糙度（分形维数）', '1.18'], ['晶界宽度', '0.08 μm']],
        note: '富 Nd 相沿晶界连续分布；孔洞 < 0.3%，无异常大晶粒',
        src: '电镜 SEM-20261111-02', tool_call_id: 'TC-005'
      },
      structure: [
        { key: '平均晶粒尺寸', value: '5.6 μm', flag: 'measured', src: '电镜 SEM-20261111-02', tool_call_id: 'TC-005' },
        { key: '富 Nd 相分布', value: '沿晶界连续分布', flag: 'measured', src: '电镜 SEM-20261111-02', tool_call_id: 'TC-005' },
        { key: '缺陷', value: '孔洞 < 0.3%，无异常大晶粒', flag: 'measured', src: '电镜 SEM-20261111-02', tool_call_id: 'TC-005' }
      ],
      intrinsic: [
        { key: '居里温度 Tc', value: '312 ℃', flag: 'measured', src: '热磁检测 RPT-20261110-02', tool_call_id: 'TC-006' },
        { key: '饱和磁极化强度 4πMs', value: '16.1 kGs', flag: 'measured', src: 'VSM 检测 RPT-20261110-02', tool_call_id: 'TC-006' },
        { key: '各向异性场 Ha', value: '73 kOe', flag: 'measured', src: 'VSM 检测 RPT-20261110-02', tool_call_id: 'TC-006' }
      ],
      /* v3.10 仿真任务对象（黄总：档案须可复现——看结论更要知道当时咋算的）：
         五件套 = results 结论 / inputs 输入参数(带来源) / script 输入脚本全文 /
         outputs 输出产物清单 / job 任务信息(集群·版本·时间·留痕号)。
         VASP：输入=配方成分；mumax3：输入=结构+本征实测，全部融在 .mx3 脚本里。 */
      vasp: {
        results: [
          { key: '主相形成焓（Nd₂Fe₁₄B）', value: '−0.42 eV/atom', flag: 'simulated', src: 'VASP 第一性原理计算', tool_call_id: 'TC-002' },
          { key: '晶界相占位倾向', value: 'Dy 优先占位晶界相，重稀土利用率更优', flag: 'simulated', src: 'VASP 第一性原理计算', tool_call_id: 'TC-002' }
        ],
        inputs: [
          { key: '成分', value: 'F-N52-v3（Nd 28.5 · Pr 1.2 · Dy 1.8 wt% 等）', src: '样品数据 · 配方' },
          { key: '计算体系', value: 'Nd₂Fe₁₄B 主相 + Dy 晶界占位构型', src: '' },
          { key: '泛函', value: 'GGA-PBE', src: '' },
          { key: '截断能 / k 点', value: '520 eV · 3×3×2 Γ 中心', src: '' }
        ],
        script: { name: 'INCAR', engine: 'VASP', run: 'mpirun -np 32 vasp_std', text:
`SYSTEM  = Nd2Fe14B + Dy 晶界占位构型
PREC    = Accurate
ENCUT   = 520        # 截断能 eV
ISMEAR  = 0
SIGMA   = 0.05
IBRION  = 2          # 共轭梯度弛豫
NSW     = 99
ISIF    = 3
KPOINTS = 3x3x2 Gamma
LREAL   = Auto
LWAVE   = .FALSE.
LCHARG  = .FALSE.` },
        outputs: [
          { name: 'OUTCAR', desc: '能量收敛摘要：形成焓 −0.42 eV/atom', content:
`vasp.6.4.2  executed on SCP-04 (32 cores)  2026-11-09 16:40
----------------------------------------
 FREE ENERGIE OF THE ION-ELECTRON SYSTEM (eV)
 ---------------------------------------------------
 free  energy   TOTEN  =      -842.1374 eV
 energy  without entropy =    -842.1352  energy(sigma->0) = -842.1363
 enthalpy  is  TOTEN   =      -842.1374 eV   P V =      -0.0012
 ----------------------------------------
 ---- demo 截取：收敛摘要 ----
 formation enthalpy Nd2Fe14B (vs elemental refs) = -0.42 eV/atom
 Dy occupancy: 晶界相优先占位 (ΔE = -0.18 eV/f.u. vs 主相占位)
 reaching required accuracy - stopping structural relaxation` },
          { name: 'CONTCAR', desc: '弛豫后构型：Dy 落位晶界相', content:
`Nd2Fe14B + Dy GB occupancy, relaxed (ISIF=3)
1.00000000000000
   8.8560000000000002   0.0000000000000000   0.0000000000000000
   0.0000000000000000   8.8560000000000002   0.0000000000000000
   0.0000000000000000   0.0000000000000000  12.1979999999999996
  Nd   Fe   B   Dy
  14   80   6   2
Direct
 0.26830000 0.26830000 0.00000000
 0.73170000 0.73170000 0.00000000
 0.00000000 0.50000000 0.25000000
 ...（共 102 原子，demo 截取前 3 行坐标）...` },
          { name: 'vasprun.xml', desc: '完整计算记录（逐电子步可追溯）', content:
`<?xml version="1.0" encoding="ISO-8859-1"?>
<modeling>
 <generator><i name="program">vasp</i><i name="version">6.4.2</i></generator>
 <incar>
  <i name="PREC">Accurate</i>
  <i name="ENCUT">  520.00000000</i>
  <i name="ISMEAR">0</i><i name="SIGMA">  0.05000000</i>
  <i name="IBRION">2</i><i name="NSW">99</i><i name="ISIF">3</i>
 </incar>
 <kpoints><i name="divisions">3x3x2 Gamma</i></kpoints>
 <!-- demo 截取：中间电子步略 -->
 <calculation>
  <energy><i name="e_fr_energy">  -842.13740000</i></energy>
 </calculation>
</modeling>` }
        ],
        job: { id: 'SIM-20261109-002', sw: 'VASP 6.4.2', cluster: '仿真集群（SCP-04 · SSH/批处理）', ts: '2026-11-09 16:40', ev_id: 'EV-003' }
      },
      micromag: {
        results: [
          { key: '矫顽力主导机制', value: '晶界畴壁钉扎为主，缺陷处反磁化形核为辅', flag: 'simulated', src: 'mumax3 微磁学仿真（离线只读产物）', tool_call_id: 'TC-009' },
          { key: '畴结构特征', value: '晶界相连续处畴壁位移受阻；孔洞周围见反磁化畴形核', flag: 'simulated', src: 'mumax3 微磁学仿真（离线只读产物）', tool_call_id: 'TC-009' },
          { key: '与实测对照', value: '退磁曲线趋势与 RPT-20261110-01 一致，不替代实测', flag: 'simulated', src: 'mumax3 微磁学仿真（离线只读产物）', tool_call_id: 'TC-009' }
        ],
        inputs: [
          { key: '几何模型', value: '单晶粒 64 nm 立方 · Dy 富集壳层 5 nm · 表面缺陷 8 nm', src: '介观机制模型（微磁学须在交换长度尺度）' },
          { key: 'Msat（芯部）', value: '1.28e6 A/m ≈ Js 1.61 T', src: '实测换算：4πMs 16.1 kGs · RPT-20261110-02' },
          { key: '壳层成分', value: '(Nd₀.₇Dy₀.₃)₂Fe₁₄B · Msat 1.07e6 A/m', src: '对应配方 Dy 晶界占位 · TC-002' },
          { key: 'Ku1 / Aex', value: '4.5e6 J/m³ · 12.5e-12 J/m', src: 'N52 文献值 · KB-001' },
          { key: '网格', value: '64³ 晶胞 · 1 nm（< 交换长度 3.5 nm）', src: '' },
          { key: '磁场扫描', value: '0 → −7 T · 步长 0.05 T · 141 点', src: '' }
        ],
        script: { name: 'ndfeb_core_shell.mx3', engine: 'mumax3', run: 'mumax3 ndfeb_core_shell.mx3', text:
`// ============================================================
// NdFeB core-shell grain: quasistatic demagnetization with MuMax3
// Single grain, 64 nm cube, 1 nm cells, Dy-rich shell, surface defect
// Run:  mumax3 ndfeb_core_shell.mx3
// Out:  ndfeb_core_shell.out/table.txt, *.ovf
// ============================================================

// ---- 1. Grid: cell must be smaller than lex (~3.5 nm) and lw (~5 nm) ----
N := 64
c := 1e-9
SetGridSize(N, N, N)          // 64^3 = 262144 cells, power of two for FFT
SetCellSize(c, c, c)

// ---- 2. Geometry ----
side   := 64e-9
tshell := 5e-9                // <-- sweep this: 2, 5, 10, 15, 20, 25 nm
grain  := cuboid(side, side, side)
setgeom(grain)                // zeros Msat outside the shape; preferred over Msat=0

// ---- 3. Regions ----
// region 0 = core (default), 1 = Dy-rich shell, 2 = surface defect
DefRegion(1, grain.sub(cuboid(side-2*tshell, side-2*tshell, side-2*tshell)))
DefRegion(2, cuboid(8e-9, 8e-9, 8e-9).transl(-28e-9, -28e-9, 28e-9))
save(regions)                 // always inspect the region map first

// ---- 4. Material: Nd2Fe14B, room temperature (SI units) ----
Msat  = 1.28e6                // A/m   (Js ~ 1.61 T)
Aex   = 12.5e-12              // J/m
Ku1   = 4.5e6                 // J/m3
anisU = vector(0, 0, 1)       // easy axis = c axis, along z
alpha = 0.5                   // high damping only affects relax(); equilibrium unchanged

// ---- 5. Shell: (Nd0.7Dy0.3)2Fe14B ----
// K1 and A kept at Nd2Fe14B values; Js interpolated -> Msat ~ 1.07e6
Msat.SetRegion(1, 1.07e6)
Ku1.SetRegion(1, 4.5e6)
Aex.SetRegion(1, 12.5e-12)

// ---- 6. Defect: surface grain with K1 knocked down to 10% ----
// real magnets nucleate reversal at surface flaws, not in the perfect bulk
Ku1.SetRegion(2, 0.45e6)
save(Ku1)
save(Msat)

// ---- 7. Initial state ----
m = Uniform(0.01, 0, 1)       // slight tilt breaks perfect symmetry
relax()                        // robust for the high-energy initial state

// ---- 8. Quasistatic field sweep (descending branch) ----
// minimize() = conjugate-gradient ground state, much faster than run()+relax()
Bmax  := 7.0                  // T, beyond mu0*HA ~ 7 T
Bstep := 0.05                 // T, 140 steps; use 0.01 near the switching field
MinimizerStop = 1e-6
TableAdd(B_ext)
TableAdd(E_total)

for B := 0.0; B >= -Bmax; B -= Bstep {
    B_ext = vector(0.01*B, 0, B)   // 1% cant: pure easy-axis field gives zero torque
    minimize()
    tablesave()
}

// Uncomment for the full loop (ascending branch back to +Bmax):
// for B := -Bmax; B <= Bmax; B += Bstep {
//     B_ext = vector(0.01*B, 0, B)
//     minimize()
//     tablesave()
// }

saveas(m, "m_final")
// snapshot(m) inside the loop if you want domain evolution per field step` },
        outputs: [
          { name: 'table.txt', desc: '退磁扫描 141 点（B_ext · E_total · 平均磁化）', content:
`# mumax3 v3.10 · ndfeb_core_shell.mx3 · SIM-20261112-009
# demo 截取：141 点退磁扫描中的 20 行（拐点附近加密）
# B_ext(T)     E_total(J)     mx         my         mz
  0.0000e+00  -3.4121e-15   9.9e-3     0.0e+0     9.9995e-1
 -5.0000e-02  -3.4190e-15   1.0e-2    -1.1e-4     9.9994e-1
 -1.0000e-01  -3.4298e-15   1.1e-2    -2.3e-4     9.9991e-1
 -5.0000e-01  -3.5142e-15   2.6e-2    -1.2e-3     9.9962e-1
 -1.0000e+00  -3.6211e-15   4.4e-2    -2.4e-3     9.9895e-1
 -1.5000e+00  -3.7345e-15   6.3e-2    -3.6e-3     9.9798e-1
 -2.0000e+00  -3.8562e-15   8.5e-2    -4.7e-3     9.9631e-1
 -2.5000e+00  -3.9890e-15   1.1e-1    -5.5e-3     9.9371e-1
 -3.0000e+00  -4.1377e-15   1.4e-1    -5.8e-3     9.8982e-1
 -3.5000e+00  -4.3090e-15   1.8e-1    -5.4e-3     9.8361e-1
 -4.0000e+00  -4.5144e-15   2.3e-1    -4.1e-3     9.7321e-1
 -4.1500e+00  -4.5521e-15   2.5e-1    -3.3e-3     9.5830e-1   # 缺陷处反磁化畴形核
 -4.2500e+00  -4.6133e-15   3.1e-1    -1.8e-3     8.2012e-1
 -4.3500e+00  -4.7202e-15   4.2e-1     4.2e-4     4.0715e-1   # 雪崩式反转开始
 -4.5000e+00  -4.8955e-15   3.4e-1     2.1e-3    -1.9298e-1
 -5.0000e+00  -5.3117e-15   1.2e-1     3.3e-3    -9.2448e-1
 -5.5000e+00  -5.7092e-15   5.5e-2     2.6e-3    -9.8569e-1
 -6.0000e+00  -6.0980e-15   3.2e-2     1.2e-3    -9.9520e-1
 -6.5000e+00  -6.4415e-15   1.8e-2     3.1e-4    -9.9781e-1
 -7.0000e+00  -6.7203e-15   9.6e-3     5.2e-5    -9.9876e-1` },
          { name: 'm_final.ovf', desc: '最终磁化分布（畴结构快照，可回溯渲染）', content:
`# OOMMF OVF 1.0
# Segment count: 1
# Begin: Segment
# Begin: Header
# Title: m_final  (ndfeb_core_shell.mx3, B_ext = -7.0 T)
# meshtype: rectangular
# meshunit: m
# xnodes: 64
# ynodes: 64
# znodes: 64
# xstepsize: 1e-09
# ystepsize: 1e-09
# zstepsize: 1e-09
# End: Header
# Begin: Data Text
# 262144 个磁化矢量，demo 截取前 6 行
0.01 0.00 0.99995
0.01 0.00 0.99994
0.02 0.00 0.99993
0.01 0.01 0.99992
0.02 0.01 0.99990
0.03 0.01 0.99988
# End: Data Text
# End: Segment` },
          { name: 'regions.ovf', desc: '区域映射：0=芯部 1=Dy 壳层 2=表面缺陷（输入复核用）', content:
`# OOMMF OVF 1.0
# Title: regions — 0=core Nd2Fe14B · 1=Dy-rich shell 5nm · 2=surface defect 8nm
# meshtype: rectangular · meshunit: m · 64^3 cells @ 1nm
# Begin: Data Text
# 区域 id 标量场，demo 截取 2 行
0 0 0 0 0 0 0 0
0 0 0 1 1 0 0 0
# End: Data Text` },
          { name: 'Ku1.ovf', desc: '各向异性参数场（壳层 4.5e6 · 缺陷 0.45e6 J/m³，输入复核用）', content:
`# OOMMF OVF 1.0
# Title: Ku1 field (J/m^3) — core 4.5e6 · shell 4.5e6 · defect 0.45e6
# meshtype: rectangular · meshunit: m · 64^3 cells @ 1nm
# Begin: Data Text
# Ku1 标量场，demo 截取 2 行
4.5e6 4.5e6 4.5e6 4.5e6 4.5e6 4.5e6 4.5e6 4.5e6
4.5e6 4.5e6 4.5e6 0.45e6 0.45e6 4.5e6 4.5e6 4.5e6
# End: Data Text` },
          { name: 'Msat.ovf', desc: '饱和磁化强度场（芯部 1.28e6 · 壳层 1.07e6 A/m，输入复核用）', content:
`# OOMMF OVF 1.0
# Title: Msat field (A/m) — core 1.28e6 · shell 1.07e6 · defect 1.28e6
# meshtype: rectangular · meshunit: m · 64^3 cells @ 1nm
# Begin: Data Text
# Msat 标量场，demo 截取 2 行
1.28e6 1.28e6 1.28e6 1.28e6 1.28e6 1.28e6 1.28e6 1.28e6
1.28e6 1.28e6 1.28e6 1.07e6 1.07e6 1.28e6 1.28e6 1.28e6
# End: Data Text` }
        ],
        job: { id: 'SIM-20261112-009', sw: 'mumax3 v3.10', cluster: '仿真集群（SCP-04 · SSH/批处理）', ts: '2026-11-12 15:20', ev_id: 'EV-005' },
        /* v3.25 退磁曲线图（黄总：mumax3 会抛出退磁曲线这类图表）：sim 曲线渲染时从
           outputs.table.txt 内容解析（与下载文件同源，改了文件图跟着变）；
           meas = 实测 RPT-20261110-01 采样（kOe 已换算 T；Br 14.2 kGs→M/Ms 0.882，Hcj 14.2 kOe→1.42 T）。 */
        chart: {
          simFrom: 'table.txt',
          simLabel: '仿真 mumax3（与 table.txt 同源）',
          measLabel: '实测 RPT-20261110-01',
          note: '仿真 Hcj ≈ 4.5 T 高于实测 1.42 T——理想单晶粒模型无热涨落与多晶耦合，趋势一致、数值以实测为准。',
          meas: [[0, 0.882], [-0.2, 0.881], [-0.5, 0.876], [-0.8, 0.866], [-1.0, 0.852], [-1.15, 0.824], [-1.28, 0.772], [-1.38, 0.631], [-1.42, 0], [-1.47, -0.52], [-1.55, -0.79], [-1.7, -0.852], [-2.0, -0.874], [-2.5, -0.880], [-3.5, -0.882], [-7, -0.882]]
        }
      }
    },
    {
      sample_id: 'SMP-002', title: 'N48 氧含量对照样', grade: 'N48',
      form_id: 'FORM-N48-v1',
      stage: '工艺执行中',
      batch: 'B-20261110-01', made: '2026-11-10', spec: 'Φ40×25 mm 圆柱坯',
      target: '气流磨氧含量 ≤ 3000 ppm',
      formula: {
        version: 'F-N48-v1', source: 'predicted', tool_call_id: null,
        comps: [['Nd', '30.0'], ['B', '1.0'], ['Fe', 'bal.'], ['Al', '0.5'], ['Cu', '0.1']]
      },
      process: [
        { n: 1, state: 'done', param: '总重 8.50 kg · 称重偏差 < ±0.05%' },
        { n: 2, state: 'done', param: '3 批次称重复核一致' },
        { n: 3, state: 'done', param: '1480℃ · 保温 20 min · 真空度 5×10⁻² Pa · Ar 保护' },
        { n: 4, state: 'done', param: '浇注 1465℃ · 辊速 2.0 m/s · 片厚 0.30 mm' },
        { n: 5, state: 'done', param: '吸氢 2.0 MPa × 2 h · 脱氢 540℃ × 3 h' },
        { n: 6, state: 'warn', param: 'N₂ · 0.6 MPa · D50 = 4.8 μm · 氧 3200 ppm',
          kv: [['工作气体', 'N₂'], ['气体压力', '0.6 MPa'], ['粒径分布 D10/D50/D90', 'D50 = 4.8 μm'], ['氧含量', '3200 ppm', 'warn']],
          warn: '氧含量 3200 ppm，超阈值 3000 ppm——已拦截，待人工复核后才允许进入下一工序' },
        { n: 7, state: 'pending', param: '—' },
        { n: 8, state: 'pending', param: '—' },
        { n: 9, state: 'pending', param: '—' },
        { n: 10, state: 'pending', param: '—' }
      ],
      performance: [],
      structure: [],
      intrinsic: []
    },
    {
      sample_id: 'SMP-003', title: 'N52 回火工艺复核样', grade: 'N52',
      form_id: 'FORM-N52-v4',
      stage: '待检测',
      batch: 'B-20261110-03', made: '2026-11-10', spec: 'Φ40×25 mm 圆柱坯',
      target: '回火变体 Hcj 不劣于基线 14.2 kOe',
      formula: {
        version: 'F-N52-v4', source: 'predicted', tool_call_id: null,
        comps: [['Nd', '28.5'], ['Pr', '1.2'], ['Dy', '1.6'], ['B', '0.98'], ['Co', '1.5'], ['Fe', 'bal.']]
      },
      process: [
        { n: 1, state: 'done', param: '总重 10.05 kg · 称重偏差 < ±0.05%' },
        { n: 2, state: 'done', param: '3 批次称重复核一致' },
        { n: 3, state: 'done', param: '1460℃ · 保温 25 min · 真空度 3×10⁻² Pa · Ar 保护' },
        { n: 4, state: 'done', param: '浇注 1452℃ · 辊速 2.2 m/s · 片厚 0.28 mm' },
        { n: 5, state: 'done', param: '吸氢 2.0 MPa × 2 h · 脱氢 550℃ × 3 h' },
        { n: 6, state: 'done', param: 'N₂ · 0.6 MPa · D50 = 4.3 μm · 氧 1950 ppm' },
        { n: 7, state: 'done', param: '取向 1.8 T · 成型 Φ40×25 mm · 充磁 2800 A' },
        { n: 8, state: 'done', param: '1060℃ × 4 h' },
        { n: 9, state: 'done', param: '500℃ × 2 h（变体复核）' },
        { n: 10, state: 'current', param: '480℃ × 3 h（进行中）',
          progress: { elapsed: '1.8 h', total: '3 h', pct: 60 },
          kv: [['二级热处理温度', '480℃'], ['二级热处理时间', '3 h']] }
      ],
      performance: [],
      structure: [],
      intrinsic: [],
      /* SMP-003：只有 VASP 配方筛选计算（Dy 1.6 wt% 变体）；样品在制，微磁学尚无输入 */
      vasp: {
        results: [
          { key: '主相形成焓（Nd₂Fe₁₄B）', value: '−0.41 eV/atom（Dy 1.6 wt% 变体）', flag: 'simulated', src: 'VASP 第一性原理计算', tool_call_id: null },
          { key: '晶界热稳定性', value: 'Dy 1.6 wt% 下相当，可尝试降重稀土 0.2 wt%', flag: 'simulated', src: 'VASP 第一性原理计算', tool_call_id: null }
        ],
        inputs: [
          { key: '成分', value: 'F-N52-v4（Dy 1.6 wt% 变体）', src: '样品数据 · 配方' },
          { key: '计算体系', value: 'Nd₂Fe₁₄B 主相 + Dy 晶界占位构型', src: '' },
          { key: '泛函 / 截断能 / k 点', value: 'GGA-PBE · 520 eV · 3×3×2', src: '' }
        ],
        script: { name: 'INCAR', engine: 'VASP', run: 'mpirun -np 32 vasp_std', text:
`SYSTEM  = Nd2Fe14B + Dy 晶界占位（Dy 1.6 wt% 变体）
PREC    = Accurate
ENCUT   = 520
IBRION  = 2
NSW     = 99
ISIF    = 3
KPOINTS = 3x3x2 Gamma` },
        outputs: [
          { name: 'OUTCAR', desc: '能量收敛摘要：形成焓 −0.41 eV/atom', content:
`vasp.6.4.2  executed on SCP-04 (32 cores)  2026-11-08 11:30
----------------------------------------
 FREE ENERGIE OF THE ION-ELECTRON SYSTEM (eV)
 ---------------------------------------------------
 free  energy   TOTEN  =      -841.9821 eV
 enthalpy  is  TOTEN   =      -841.9821 eV   P V =      -0.0011
 ----------------------------------------
 ---- demo 截取：收敛摘要 ----
 formation enthalpy Nd2Fe14B (Dy 1.6 wt% 变体) = -0.41 eV/atom
 reaching required accuracy - stopping structural relaxation` },
          { name: 'vasprun.xml', desc: '完整计算记录（逐电子步可追溯）', content:
`<?xml version="1.0" encoding="ISO-8859-1"?>
<modeling>
 <generator><i name="program">vasp</i><i name="version">6.4.2</i></generator>
 <incar>
  <i name="PREC">Accurate</i>
  <i name="ENCUT">  520.00000000</i>
  <i name="IBRION">2</i><i name="NSW">99</i><i name="ISIF">3</i>
 </incar>
 <kpoints><i name="divisions">3x3x2 Gamma</i></kpoints>
 <!-- demo 截取：中间电子步略 -->
 <calculation>
  <energy><i name="e_fr_energy">  -841.98210000</i></energy>
 </calculation>
</modeling>` }
        ],
        job: { id: 'SIM-20261108-011', sw: 'VASP 6.4.2', cluster: '仿真集群（SCP-04 · SSH/批处理）', ts: '2026-11-08 11:30', ev_id: '' }
      }
    }
  ];

  /* ---------- Skill 注册表（产品资产；Agent 编排单元，LLM 只选和填槽） ---------- */
  M.skills = [
    { skill_id: 'SK-01', name: '配方生成与筛选', stage: '配方',
      desc: '配方优化 ML 模型生成候选配方，第一性原理计算做相稳定性筛选，综合给出更优配方',
      tools: ['T-01', 'T-02'] },
    { skill_id: 'SK-02', name: '工艺参数优化', stage: '工艺',
      desc: '工艺优化 ML 模型按目标性能与配方给出一组工艺参数', tools: ['T-03'] },
    { skill_id: 'SK-03', name: '性能检测分析', stage: '检测',
      desc: '检测仪器数据结构化出 Br / Hcj / (BH)max 并判读', tools: ['T-04'] },
    { skill_id: 'SK-04', name: '电镜图像分析', stage: '表征',
      desc: 'SEM / TEM 图像分析晶粒尺寸、晶界相与缺陷', tools: ['T-05'] },
    { skill_id: 'SK-05', name: 'VASP 第一性原理计算', stage: '仿真校验',
      desc: '以配方成分为输入做 DFT 相稳定性 / 形成焓计算（不作为真值）', tools: ['T-02'] },
    { skill_id: 'SK-08', name: 'mumax3 微磁学仿真', stage: '仿真校验',
      desc: 'mumax3 微磁学仿真：畴结构 / 矫顽力机制分析，辅助解释磁性能（不作为真值）', tools: ['T-09'] },
    { skill_id: 'SK-07', name: '样品归档', stage: '沉淀',
      desc: '结论与留痕挂到样品，形成训练样本回流垂类模型', tools: ['T-08'] },
    { skill_id: 'SK-09', name: '知识检索问答', stage: '知识库',
      desc: '按问题检索平台数据集与用户文档，答案附原文引用、可回溯到段落', tools: ['T-10'] }
  ];

  /* ---------- Tool 注册表（工程资产；只读登记，数值必带 truth_flag） ---------- */
  M.tools = [
    { tool_id: 'T-01', name: '配方优化 ML 模型', kind: 'ml', output: 'predicted', numeric: true,
      desc: '垂类配方模型；输出为预测，须实测验证' },
    { tool_id: 'T-02', name: 'VASP 第一性原理计算（DFT）', kind: 'simulation', output: 'simulated', numeric: true,
      desc: 'DFT / 相稳定性 / 形成焓；仿真产物，不作为真值' },
    { tool_id: 'T-03', name: '工艺优化 ML 模型', kind: 'ml', output: 'predicted', numeric: true,
      desc: '垂类工艺模型；输出为预测，须实测验证' },
    { tool_id: 'T-04', name: '检测数据结构化', kind: 'instrument', output: 'measured', numeric: true,
      desc: '检测仪器报告 → 结构化性能参数（真值唯一来源）' },
    { tool_id: 'T-05', name: '电镜图像分析', kind: 'vision', output: 'measured', numeric: true,
      desc: 'SEM / TEM 图像 → 结构数据' },
    { tool_id: 'T-09', name: 'mumax3 微磁学仿真', kind: 'simulation', output: 'simulated', numeric: true,
      desc: '微磁学仿真：畴结构 / 矫顽力机制；仿真产物，不作为真值' },
    { tool_id: 'T-08', name: '证据留痕登记', kind: 'registry', output: 'measured', numeric: false,
      desc: '把结论 / 留痕挂到科研对象' },
    { tool_id: 'T-10', name: 'RAG 检索', kind: 'retrieval', output: 'measured', numeric: false,
      desc: '检索平台数据集与用户文档，返回命中段落与出处（引用事实，非生成）' }
  ];

  /* ---------- SCP 注册表（D-46：协议 / 服务接入登记；只读登记，静态演示不建立任何真实连接） ---------- */
  M.scps = [
    { scp_id: 'SCP-01', name: '检测设备数据回传服务', proto: 'LIMS / HTTPS', status: '已登记',
      desc: '检测机构系统对接登记：检测报告经结构化后回传并挂入科研对象；真值唯一来源仍为检测报告' },
    { scp_id: 'SCP-02', name: '设备数采协议接入', proto: 'OPC UA', status: '已登记',
      desc: '烧结 / 氢破等设备过程参数采集协议登记；过程快照经此入档，不落实时控制' },
    { scp_id: 'SCP-03', name: '文献与专利检索服务', proto: 'HTTP API', status: '已登记',
      desc: '外部文献库 / 专利库检索服务登记；命中段落回流知识库引用区，附出处可回溯' },
    { scp_id: 'SCP-04', name: '仿真集群任务提交', proto: 'SSH / 批处理', status: '离线异步',
      desc: '离线仿真任务提交与产物回收登记；任务离线异步，本期不运行、不展示仿真数值' }
  ];

  /* ---------- 意图识别评测集（IntentProvider 回归门槛；误执行率必须为 0） ---------- */
  M.intentEval = [
    { case_id: 'IE-01', text: '帮我优化一个 N52 配方，目标 Hcj ≥ 15 kOe', expect: 'formula_gen' },
    { case_id: 'IE-02', text: '给这个样品出一组工艺参数', expect: 'process_opt' },
    { case_id: 'IE-03', text: '分析一下这个样品的检测数据', expect: 'perf_analysis' },
    { case_id: 'IE-04', text: '看一下这张电镜图的晶粒和晶界', expect: 'image_analysis' },
    { case_id: 'IE-05', text: '用 VASP 算一下这个配方的相稳定性', expect: 'sim_vasp' },
    { case_id: 'IE-06', text: '做一次第一性原理计算看形成焓', expect: 'sim_vasp' },
    { case_id: 'IE-07', text: '这个样品的详情', expect: 'sample_query' },
    { case_id: 'IE-08', text: '把这次结论归档到样品', expect: 'archive' },
    { case_id: 'IE-09', text: '为什么这个样品 Hcj 偏低', expect: 'perf_analysis' },
    { case_id: 'IE-10', text: '随便聊两句', expect: 'unknown' },
    { case_id: 'IE-11', text: '用 mumax3 看一下这个样品的畴结构', expect: 'sim_mumax' },
    { case_id: 'IE-12', text: 'N52 的 Hcj 温度系数是多少', expect: 'kb_query' },
    { case_id: 'IE-13', text: '氢破工艺的标准压力范围是什么', expect: 'kb_query' }
  ];

  /* ---------- 空态案例卡（v3.5：案例 = 标题 + 简述 + 类别 tag + 演示问句；
     点击卡片 = 把 text 作为一条用户消息发出；其余意图靠自然语言输入，评测集 IE-01~13 兜底回归） ---------- */
  M.examples = [
    { tag: '配方', title: 'N52 高矫顽力配方优化',
      desc: 'ML 模型生成候选配方，第一性原理计算筛选相稳定性，产出候选组与逐项对比。',
      text: '帮我优化一个 N52 配方，目标 Hcj ≥ 15 kOe' },
    { tag: '工艺', title: '烧结回火参数寻优',
      desc: '按当前配方与目标性能给出一组工艺参数包，附温度曲线与装炉敏感性提示。',
      text: '给这个样品出一组工艺参数' },
    { tag: '检测', title: '磁性能检测报告判读',
      desc: '检测数据结构化出 Br / Hcj / (BH)max，对照目标值定位性能缺口并给出复核建议。',
      text: '分析一下这个样品的检测数据' },
    { tag: '问答', title: '材料知识检索问答',
      desc: '检索平台数据集与我的文档，答案附原文引用，可回溯到具体段落。',
      text: 'N52 的 Hcj 温度系数是多少' }
  ];

  /* ---------- 既有留痕（静态示例；运行时留痕在 localStorage 叠加） ---------- */
  M.evidence = [
    { ev_id: 'EV-001', ts: '2026-11-10 10:22', sample_id: 'SMP-001', skill_id: 'SK-07', tool_call_id: 'TC-004',
      action: '性能检测结构化（只读登记）', input: 'report_id=RPT-20261110-01', output: 'Br / Hcj / (BH)max',
      source: '检测报告 RPT-20261110-01', truth_flag: 'measured', actor: '研究员' },
    { ev_id: 'EV-002', ts: '2026-11-10 10:35', sample_id: 'SMP-001', skill_id: 'SK-04', tool_call_id: 'TC-005',
      action: '电镜图像分析（只读登记）', input: 'img=SEM-20261111-02', output: '晶粒尺寸 / 晶界相 / 缺陷',
      source: '电镜 SEM-20261111-02', truth_flag: 'measured', actor: '研究员' },
    { ev_id: 'EV-003', ts: '2026-11-09 16:40', sample_id: 'SMP-001', skill_id: 'SK-01', tool_call_id: 'TC-002',
      action: 'VASP 第一性原理计算（只读登记）', input: 'formula=F-N52-v3', output: '相形成焓 / Dy 占位',
      source: 'VASP DFT 计算（离线只读产物）', truth_flag: 'simulated', actor: '研究员' },
    { ev_id: 'EV-004', ts: '2026-11-09 15:02', sample_id: 'SMP-001', skill_id: 'SK-02', tool_call_id: 'TC-003',
      action: '工艺参数优化（只读登记）', input: 'formula=F-N52-v3 · target=Hcj≥15', output: '烧结窗口建议',
      source: '工艺优化 ML 模型（model-v0.1 · 示例）', truth_flag: 'predicted', actor: '研究员' },
    { ev_id: 'EV-005', ts: '2026-11-12 15:20', sample_id: 'SMP-001', skill_id: 'SK-08', tool_call_id: 'TC-009',
      action: 'mumax3 微磁学仿真（只读登记）', input: 'structure=SEM-20261111-02 · intrinsic=RPT-20261110-02', output: '畴结构 / 矫顽力机制',
      source: 'mumax3 微磁学仿真（离线只读产物）', truth_flag: 'simulated', actor: '研究员' }
  ];

  /* ---------- 实验中心（v3.7 重做：高通量制备产线 · 数字孪生）----------
   * 定位（黄总 2026-11-13）：现实中一套完整自动化制备实验设备的线上全景；
   *   只覆盖「制备过程」设备（10 工序对应的产线仪器），检测类独立环节
   *   （磁测仪 / 电镜 / VSM 等）不属于本页，其数据归宿在科研对象。
   * 数字孪生红线：设备在制状态不单独造数——渲染时从 M.samples.process
   *   反推（state=current/warn 的工序 → 所属设备），与科研对象天然同源。
   * stages = 该设备承接的工序号（对齐 M.processStages.n）。 */
  M.equipments = [
    { eq_id: 'EQ-001', name: '配料与混料工作站', stages: [1, 2],
      model: 'PM-100 自动称量配料线 · 精度 ±0.01 g · 惰性气氛手套箱' },
    { eq_id: 'EQ-002', name: '真空感应熔炼炉', stages: [3],
      model: 'ZG-50 中频感应 · 50 kg 炉容 · 极限真空 5×10⁻³ Pa' },
    { eq_id: 'EQ-003', name: '速凝甩带炉', stages: [4],
      model: 'SC-200 单辊速凝 · 铜辊 Φ600 mm · 辊速 0.5–3 m/s' },
    { eq_id: 'EQ-004', name: '氢破炉', stages: [5],
      model: 'HD-100 · 吸氢 ≤ 3 MPa · 脱氢 400–600 ℃' },
    { eq_id: 'EQ-005', name: '流化床气流磨', stages: [6],
      model: 'JM-300 · N₂ 闭环研磨 · 在线氧含量监测' },
    { eq_id: 'EQ-006', name: '磁场取向压机', stages: [7],
      model: 'DC-160 · 取向磁场 1.5–2.0 T · 双向压制' },
    { eq_id: 'EQ-007', name: '真空烧结炉', stages: [8],
      model: 'VS-400 · 最高 1200 ℃ · 多温区均热' },
    { eq_id: 'EQ-008', name: '真空热处理炉', stages: [9, 10],
      model: 'HT-300 · 两级回火 · 程序控温 ±1 ℃' }
  ];

  /* ---------- 知识库（D-42：RAG 语料实体化） ----------
   * builtin：平台预制专业数据集，locked 只读（普通用户不可改）；
   * mine：用户上传的个人文档（演示初始 2 篇），与内置一起进入 RAG 检索范围；
   * sections 为检索与引用的最小单位（段落级），答案引用可回溯到 doc_id + sid。 */
  M.kb = {
    builtin: {
      ds_id: 'DS-NDFEB', name: '钕铁硼材料科学库', locked: true,
      desc: '平台预制专业数据集：文献 / 专利 / 领域信息；由平台方维护，普通用户只读。',
      docs: [
        { doc_id: 'KB-001', title: '钕铁硼永磁材料研究综述', type: '文献',
          desc: '磁体成分设计、工艺-性能关系与热稳定性的研究进展', updated: '2026-10-20',
          sections: [
            { sid: 'S1', text: 'N52 牌号磁体（20℃）：Br ≥ 14.1 kGs，Hcj ≥ 14.5 kOe，(BH)max ≥ 50 MGOe；实测低于下限须复测并排查工艺。' },
            { sid: 'S2', text: 'Hcj 温度系数约 −0.55 %/℃（20–80℃ 区间）；高温工况须按工作温度折算 Hcj 裕量。' },
            { sid: 'S3', text: '磁性能检测报告须含：牌号、批次、Br / Hcj / (BH)max、测试温度与仪器编号。' }
          ] },
        { doc_id: 'KB-002', title: '一种高性能钕铁硼磁体及其制备方法', type: '专利',
          desc: '覆盖熔炼、制粉、成型到烧结全流程的磁体制备方案', updated: '2026-09-30',
          sections: [
            { sid: 'S1', text: '氢破（HD）标准窗口：吸氢压力 1.8–2.2 MPa，保压 2 h；气流磨粒度 D50 目标 4.0–4.5 μm。' },
            { sid: 'S2', text: '氧含量控制：全流程 ≤ 3000 ppm；气流磨后氧含量超标将直接拉低 Hcj，须拦截复核。' }
          ] },
        { doc_id: 'KB-003', title: '稀土永磁材料领域动态', type: '领域信息',
          desc: '重稀土减量化、晶界工程等方向的年度观察与产业动态', updated: '2026-08-15',
          sections: [
            { sid: 'S1', text: 'Dy 优先占位晶界相可提升矫顽力，重稀土利用率优于主相合金化；晶界扩散工艺可降 Dy 用量 0.2–0.4 wt%。' }
          ] }
      ]
    },
    mine: [
      { doc_id: 'KB-U01', title: 'N52 装炉位置试验记录-202611.docx', type: '试验记录',
        desc: '装炉位置对 Hcj 影响的分组对比记录', updated: '2026-11-10 14:32', size: '86 KB', status: '已索引',
        sections: [
          { sid: 'S1', text: '炉位 A（中层）样品 Hcj 均值 14.2 kOe；炉位 C（边角）均值 13.1 kOe，偏差显著。' },
          { sid: 'S2', text: '初步结论：装炉位置对 Hcj 的影响大于回火温度波动（±10℃）；后续按炉位分组送检。' }
        ] },
      { doc_id: 'KB-U02', title: '个人论文-晶界相调控对 Hcj 的影响.pdf', type: '论文',
        desc: '晶界相连续性、厚度与 Hcj 关系的个人研究', updated: '2026-11-06 09:18', size: '1.2 MB', status: '已索引',
        sections: [
          { sid: 'S1', text: '晶界相连续且薄（<10 nm）时 Hcj 最优；富 Nd 相团聚会诱发局部退磁，须控制冷却速率。' }
        ] }
    ]
  };

  /* ---------- 右栏工作台「检索结果」（v3.8 合并检索与依据）：检索命中 + 引用出处，按 intent 分组 ----------
   * hits：模拟「搜索的返回内容」（知识库 / 档案检索命中，带相关度）；
   * refs：结论引用的参考文献 / 出处条目（带 truth_flag 口径）。
   * v3.8 渲染层合一：命中条 title 覆盖引用 id 时口径 chip 直挂命中条，未覆盖引用追加在后。
   * 全部虚构示例，供右栏「检索结果」tab 渲染。 */
  var SIM_REFS = [
    { id: 'SIM-CHK', flag: 'simulated', text: '仿真校验只读登记：场景按用户输入组装，输出仅作辅助校验', src: '仿真工具（离线只读产物）' },
    { id: 'RPT-20261110-01', flag: 'measured', text: 'SMP-001 检测报告：Br 14.2 kGs · Hcj 14.2 kOe · (BH)max 50.1 MGOe', src: '检测报告' }
  ];
  M.panelRefs = {
    _default: {
      hits: [
        { title: '平台使用说明与数据口径约定', snippet: '…measured 为真值唯一来源；simulated 不作真值；predicted 须实测验证…', score: 0.78, src: '知识库 · 平台规范', ico: 'book' },
        { title: '样品台账总览（3 个在研样品）', snippet: '…SMP-001 检测完成待归档；SMP-002 工艺执行中；SMP-003 待检测…', score: 0.71, src: '科研对象', ico: 'layers', to: ['sample', 'SMP-001'] }
      ],
      refs: [
        { id: 'SPEC-001', flag: 'measured', text: '数据口径约定：实测 / 仿真 / 预测三分列，全程可回溯', src: '平台规范' }
      ]
    },
    formula_gen: {
      hits: [
        { title: 'N52 牌号高 Hcj 成分设计区间研究', snippet: '…Nd 28–29.5 wt% 区间，Dy 1.5–2.0 wt% 时晶界相连续性与成本平衡最优…', score: 0.92, src: '知识库 · 配方研究', ico: 'book', to: ['kb', 'KB-001', 'S1'] },
        { title: '重稀土减量化晶界工程综述', snippet: '…Dy 优先占位晶界相可提高重稀土利用率，形成焓更优，可尝试降 Dy 0.2 wt%…', score: 0.87, src: '知识库 · 文献', ico: 'book', to: ['kb', 'KB-003', 'S1'] },
        { title: '历史样品 SMP-001 实测档案（RPT-20261110-01）', snippet: '…Br 14.2 kGs / Hcj 14.2 kOe / (BH)max 50.1 MGOe；晶界相连续、孔洞 < 0.3%…', score: 0.84, src: '科研对象', ico: 'layers', to: ['sample', 'SMP-001'] }
      ],
      refs: [
        { id: 'AT-F01', flag: 'predicted', text: '配方优化 ML 模型 model-v0.1：候选 F-N52-v4 综合评分 0.86，预测 Hcj 15.3 kOe', src: '配方优化 ML 模型' },
        { id: 'SIM-001', flag: 'simulated', text: 'VASP DFT：Nd₂Fe₁₄B 主相形成焓 −0.42 eV/atom；Dy 优先占位晶界相', src: '第一性原理计算（离线只读产物）' },
        { id: 'RPT-20261110-01', flag: 'measured', text: 'SMP-001 检测报告：Br 14.2 kGs · Hcj 14.2 kOe · (BH)max 50.1 MGOe', src: '检测报告' }
      ]
    },
    process_opt: {
      hits: [
        { title: 'N52 烧结窗口与 Hcj 敏感性分析', snippet: '…建议烧结窗口 1055–1070℃；装炉位置对 Hcj 贡献最高（Top1 因子）…', score: 0.90, src: '知识库 · 工艺研究', ico: 'book', to: ['kb', 'KB-001', 'S2'] },
        { title: '两级回火对矫顽力的影响', snippet: '…一级 500–520℃ × 2h / 二级 480℃ × 3h 区间晶界相分布最优…', score: 0.83, src: '知识库 · 文献', ico: 'book', to: ['kb', 'KB-001', 'S1'] }
      ],
      refs: [
        { id: 'AT-001', flag: 'predicted', text: '工艺优化 ML 模型：烧结 1060℃ × 4h；回火 520℃ / 480℃ 两级', src: '工艺优化 ML 模型（model-v0.1 · 示例）' },
        { id: 'EV-004', flag: 'predicted', text: '历史留痕：F-N52-v3 同窗口建议已登记挂样（SMP-001）', src: '证据留痕登记' }
      ]
    },
    perf_analysis: {
      hits: [
        { title: '检测报告 RPT-20261110-01 全文', snippet: '…Br 14.2 kGs；Hcj 14.2 kOe；(BH)max 50.1 MGOe；测试条件 20℃…', score: 0.95, src: '检测报告', ico: 'check', to: ['sample', 'SMP-001'] },
        { title: 'Hcj 偏低常见归因清单', snippet: '…氧含量超标 / 晶界相不连续 / 回火不足 / 装炉位置温差…', score: 0.82, src: '知识库 · 检测分析', ico: 'book', to: ['kb', 'KB-001', 'S1'] }
      ],
      refs: [
        { id: 'RPT-20261110-01', flag: 'measured', text: 'SMP-001 检测报告：Br 14.2 kGs · Hcj 14.2 kOe · (BH)max 50.1 MGOe', src: '检测报告（真值唯一来源）' },
        { id: 'SEM-20261111-02', flag: 'measured', text: 'SMP-001 电镜：晶粒 5.6 μm，富 Nd 相沿晶界连续分布，孔洞 < 0.3%', src: '电镜' }
      ]
    },
    image_analysis: {
      hits: [
        { title: '电镜 SEM-20261111-02 图像记录', snippet: '…平均晶粒尺寸 5.6 μm；富 Nd 相沿晶界连续分布；孔洞 < 0.3%…', score: 0.94, src: '电镜', ico: 'image', to: ['sample', 'SMP-001'] },
        { title: '晶界相连续性与 Hcj 相关性研究', snippet: '…晶界相连续且薄（~2 nm）时 Hcj 表现最优…', score: 0.80, src: '知识库 · 表征研究', ico: 'book', to: ['kb', 'KB-U02', 'S1'] }
      ],
      refs: [
        { id: 'SEM-20261111-02', flag: 'measured', text: 'SMP-001 电镜：晶粒 5.6 μm，富 Nd 相沿晶界连续分布，孔洞 < 0.3%', src: '电镜（真值来源）' }
      ]
    },
    sim_vasp: { hits: [
        { title: '第一性原理相稳定性计算方法', snippet: '…形成焓与元素占位倾向可辅助判断配方稳定性…', score: 0.81, src: '知识库 · 仿真方法', ico: 'book', to: ['kb', 'KB-003', 'S1'] }
      ], refs: SIM_REFS },
    sim_mumax: { hits: [
        { title: '畴结构与矫顽力机制分析方法', snippet: '…mumax3 微磁学仿真可辅助解释畴壁钉扎与反磁化形核…', score: 0.79, src: '知识库 · 仿真方法', ico: 'book', to: ['kb', 'KB-003', 'S1'] }
      ], refs: SIM_REFS },
    archive: {
      hits: [],
      refs: [
        { id: 'EV-ARCH', flag: 'measured', text: '归档 = 结论与留痕挂到科研对象，形成训练样本回流垂类模型', src: '证据留痕登记' }
      ]
    },
    sample_query: {
      hits: [
        { title: '样品台账总览（3 个在研样品）', snippet: '…SMP-001 检测完成待归档；SMP-002 工艺执行中；SMP-003 待检测…', score: 0.88, src: '科研对象', ico: 'layers', to: ['sample', 'SMP-001'] }
      ],
      refs: [
        { id: 'SPEC-001', flag: 'measured', text: '科研对象：样品数据（配方 / 工艺过程）· 实验数据（结构 / 性能 / 本征实测）· 仿真数据（VASP / 微磁学）· 留痕，四分区分列', src: '平台规范' }
      ]
    }
  };

  /* ---------- 候选配方 mock（v3.1 结果卡可视化与配方对比抽屉共用） ----------
   * 候选 = F-N52-v4（next，预测口径）；基线 = F-N52-v3（SMP-001 当前版本，实测口径） */
  M.candidate = {
    id: 'F-N52-v4a', base: 'F-N52-v3', grade: 'N52',
    comps: [['Nd', 28.5], ['Pr', 1.2], ['Dy', 1.6], ['B', 0.98], ['Co', 1.5], ['Cu', 0.12], ['Al', 0.5]],
    base_comps: [['Nd', 28.5], ['Pr', 1.2], ['Dy', 1.8], ['B', 0.98], ['Co', 1.5], ['Cu', 0.15], ['Al', 0.6]],
    pred: { Hcj: 15.3, Br: 14.4, BHmax: 51.2 },   /* 预测口径 */
    base_meas: { Hcj: 14.2, Br: 14.2, BHmax: 50.1 }, /* SMP-001 实测口径 */
    target: { Hcj: 15.0 },
    score: 0.86,
    dft_note: 'Dy 优先占位晶界相，形成焓更优（−0.42 eV/atom）；可降重稀土 0.2 wt%'
  };

  /* ---------- 候选配方组（v3.4：工作台「配方」tab 承载，对话流产出物） ---------- */
  M.candidates = [
    /* v3.12（黄总 2026-11-14）：成本取代评分进入配方卡（score 保留不渲染）；
     * note 解读不再上卡（对话流已承载）。成本为静态虚构估算（原料口径，¥/kg） */
    { id: 'F-N52-v4a', pick: true, score: 0.86, cost: '¥486/kg',
      comps: [['Nd', 28.5], ['Pr', 1.2], ['Dy', 1.6], ['B', 0.98], ['Co', 1.5], ['Cu', 0.12], ['Al', 0.5]],
      pred: { Hcj: 15.3, Br: 14.4, BHmax: 51.2 },
      note: 'Dy 优先占位晶界相，形成焓 −0.42 eV/atom 最优；较当前版本降重稀土 0.2 wt%' },
    { id: 'F-N52-v4b', pick: false, score: 0.81, cost: '¥527/kg',
      comps: [['Nd', 28.8], ['Pr', 1.0], ['Dy', 1.7], ['B', 0.98], ['Co', 1.2], ['Cu', 0.12], ['Al', 0.5]],
      pred: { Hcj: 15.0, Br: 14.3, BHmax: 50.8 },
      note: 'Dy 略增求稳，Hcj 达标余量小；重稀土成本偏高' },
    { id: 'F-N52-v4c', pick: false, score: 0.77, cost: '¥492/kg',
      comps: [['Nd', 28.2], ['Pr', 1.2], ['Dy', 1.6], ['B', 1.02], ['Co', 1.5], ['Cu', 0.10], ['Al', 0.6]],
      pred: { Hcj: 14.8, Br: 14.5, BHmax: 51.5 },
      note: 'Br 取向更优，但 Hcj 14.8 kOe 未达目标' }
  ];

  /* ---------- 工艺包组（v3.4：工作台「工艺」tab 承载） ----------
   * v3.53（黄总 2026-11-17 晚）：工艺 tab 收敛为纯三组工艺卡（无图），内容对齐
   * 「2.3 混料智能体」产物口径——目标：基于配方寻找合适的混料工艺；情况：已有工艺
   * 配方库，一一对应适配的配方（P-N52-A/B/C ↔ F-N52-v4a/b/c）。
   * 参数体系（11 项）：总重 / 各仓重量 / 成型尺寸 / 微升距离 / 充磁·退磁电流 /
   * 混料次数 / 烧结温度·时间 / 退火温度·时间；30 kg 批次、五仓配料（1# Nd-Pr ·
   * 2# Dy-Fe · 3# B-Fe · 4# 小料 Co/Cu/Al · 5# 纯 Fe），各仓重量按候选成分折算。 */
  M.processPacks = [
    { id: 'P-N52-A', pick: true, score: 0.84,
      steps: [['总重', '30 kg'], ['各仓重量', '1# 8.91 · 2# 0.60 · 3# 1.47 · 4# 0.64 · 5# 18.38 kg'], ['混料次数', '3 次'],
        ['成型尺寸', '50 × 40 × 30 mm'], ['微升距离', '12 mm'], ['充磁电流', '1800 A'], ['退磁电流', '620 A'],
        ['烧结温度', '1060℃'], ['烧结时间', '4h'], ['退火温度', '520℃'], ['退火时间', '2h']],
      note: '适配 F-N52-v4a；Hcj 取向最优；装炉位置敏感，须配合位置验证' },
    { id: 'P-N52-B', pick: false, score: 0.78,
      steps: [['总重', '30 kg'], ['各仓重量', '1# 8.94 · 2# 0.64 · 3# 1.47 · 4# 0.55 · 5# 18.41 kg'], ['混料次数', '4 次'],
        ['成型尺寸', '50 × 40 × 30 mm'], ['微升距离', '14 mm'], ['充磁电流', '1750 A'], ['退磁电流', '600 A'],
        ['烧结温度', '1055℃'], ['烧结时间', '4.5h'], ['退火温度', '500℃'], ['退火时间', '2.5h']],
      note: '适配 F-N52-v4b；温度窗口更保守，氧含量波动容忍度高；Hcj 上限略低' },
    { id: 'P-N52-C', pick: false, score: 0.72,
      steps: [['总重', '30 kg'], ['各仓重量', '1# 8.82 · 2# 0.60 · 3# 1.53 · 4# 0.66 · 5# 18.39 kg'], ['混料次数', '3 次'],
        ['成型尺寸', '50 × 40 × 30 mm'], ['微升距离', '10 mm'], ['充磁电流', '1850 A'], ['退磁电流', '650 A'],
        ['烧结温度', '1065℃'], ['烧结时间', '3.5h'], ['退火温度', '480℃'], ['退火时间', '3h']],
      note: '适配 F-N52-v4c；Br 取向更优配组，烧结温度上移，晶粒长大风险需复核' }
  ];

  /* ---------- 原「方案」并入样品（v3.41 黄总：方案 = 少了一些数据的成品样品，一回事）----------
   * 不再有独立「配方方案」对象/板块。原 4 条方案按「待制样样品」并入 M.samples：
   * 编号沿用原 ID，配方为 predicted 口径，10 道工序全 pending，实测/电镜/仿真全空；
   * 原预测指标作为 predicted 口径的性能记录（显式标注，与实测分列），来源会话保留可溯源。 */
  (function () {
    var legacy = [
      { id: 'F-N52-v4a', name: 'N52 高矫顽力候选配方', grade: 'N52', source: 'CDEMO-A · N52 高矫顽力配方全流程',
        detail: 'Dy 1.6 wt% 优先占位晶界相，形成焓最优；较基线降重稀土 0.2 wt%',
        metrics: [['预测 Hcj', '15.3 kOe'], ['预测 Br', '14.4 kGs'], ['(BH)max', '51.2 MGOe']], target: 'Hcj ≥ 15 kOe',
        comps: [['Nd', '28.5'], ['Pr', '1.2'], ['Dy', '1.6'], ['B', '0.98'], ['Co', '1.5'], ['Cu', '0.12'], ['Al', '0.5']] },
      { id: 'F-N52-v4b', name: 'N52 高矫顽力备选配方', grade: 'N52', source: 'CDEMO-A · N52 高矫顽力配方全流程',
        detail: 'Dy 略增求稳，Hcj 达标余量小；重稀土成本偏高',
        metrics: [['预测 Hcj', '15.0 kOe'], ['预测 Br', '14.3 kGs'], ['(BH)max', '50.8 MGOe']], target: 'Hcj ≥ 15 kOe',
        comps: [['Nd', '28.8'], ['Pr', '1.0'], ['Dy', '1.7'], ['B', '0.98'], ['Co', '1.2'], ['Cu', '0.12'], ['Al', '0.5']] },
      { id: 'F-N52-v4c', name: 'N52 未达标候选配方', grade: 'N52', source: 'CDEMO-A · N52 高矫顽力配方全流程',
        detail: 'Br 取向更优，但 Hcj 未达目标，保留作对照',
        metrics: [['预测 Hcj', '14.8 kOe'], ['预测 Br', '14.5 kGs'], ['(BH)max', '51.5 MGOe']], target: 'Hcj ≥ 15 kOe',
        comps: [['Nd', '28.2'], ['Pr', '1.2'], ['Dy', '1.6'], ['B', '1.02'], ['Co', '1.5'], ['Cu', '0.10'], ['Al', '0.6']] },
      { id: 'PRE-N48-01', name: 'N48 低氧配方预研', grade: 'N48', source: 'CDEMO-C · N48 低氧配方仿真预研',
        detail: '无 Dy 添加、Nd 30.2 wt%，氧敏感窗口收窄；纯预研，未制备实体样品',
        metrics: [['预测 Hcj', '12.4 kOe'], ['氧敏感窗口', '≤ 2600 ppm'], ['口径', 'VASP 第一性原理辅助']], target: 'Hcj ≥ 12 kOe',
        comps: [['Nd', '30.2'], ['B', '1.0'], ['Al', '0.5'], ['Cu', '0.10'], ['Fe', 'bal.']] }
    ];
    legacy.forEach(function (p) {
      M.samples.push({
        sample_id: p.id, title: p.name, grade: p.grade, form_id: 'FORM-' + p.id,
        stage: '待制样', batch: '—', made: '—', spec: '—', target: p.target,
        formula: { version: p.id, source: 'predicted', tool_call_id: null, comps: p.comps },
        process: (M.processStages || []).map(function (s) { return { n: s.n, state: 'pending', param: '—' }; }),
        performance: (p.metrics || []).map(function (m) { return { key: m[0], value: m[1], flag: 'predicted', src: p.source }; }),
        structure: [], intrinsic: [], from_source: p.source, design_note: p.detail, _planish: true
      });
    });
  })();

  /* ---------- 新建样品模板池（v3.12：总览页「新建样品」模拟创建源） ----------
   * 创建 = 取模板深拷贝 + 分配新编号；新样品 stage=待制样、10 工序全 pending、
   * 无任何检测/仿真数据（详情页四分区全空态兜底）；_user 标记可删。 */
  M.samplePool = [
    { title: 'N45SH 高温牌号验证样', grade: 'N45SH', spec: 'Φ40×25 mm 圆柱坯', target: 'N45SH 达标（Hcj ≥ 20 kOe）',
      formula: { version: 'F-N45SH-v1', source: 'predicted', tool_call_id: null,
        comps: [['Nd', '29.5'], ['Dy', '2.5'], ['B', '0.96'], ['Co', '2.0'], ['Cu', '0.15'], ['Fe', 'bal.']] } },
    { title: 'N52 晶界扩散工艺样', grade: 'N52', spec: 'Φ40×25 mm 圆柱坯', target: '晶界扩散后 Hcj ≥ 15 kOe',
      formula: { version: 'F-N52-v5', source: 'predicted', tool_call_id: null,
        comps: [['Nd', '28.0'], ['Pr', '1.5'], ['B', '0.98'], ['Co', '1.2'], ['Fe', 'bal.']] } }
  ];

  /* ---------- 固化历史会话（v3.20，黄总 2026-11-16）：侧边栏演示资产 ----------
   * 三条脚本化会话，覆盖平台三种典型用法：
   *   A 全流程完整版（配方→工艺→VASP+mumax3 两路计算→归档，含检索）；
   *   B 纯 RAG 领域知识咨询（温度系数 / 氢破窗口）；
   *   C 无实体样品的预研（RAG + 出配方 + VASP 计算）。
   * 结构 = 运行时会话同构（user / plan(完成态) / answer(_streamed)），
   * plan/answer 文案与 INTENTS 模板对齐（会话 C 按 N48 口径微调）。留痕不重放。
   * v3.27：下方规范化把「后续轮次 plan」折叠为 answer 数据载体、剔除产物卡消息——
   * 只有会话首轮展示过程卡，对话流不放产物跳转卡（详情去工作台各 tab / 档案页）。
   * app.js loadSessions() 将其并入历史会话（localStorage 同 id 版本优先，可覆盖演进）。 */
  function doneTask(o) {
    o.stepStates = o.plan.map(function () { return 'done'; });
    o.phase = 'done'; o.executed = true; o.chipDone = 0;
    o.needs_confirm = !!o.needs_confirm; o.evidence_refs = []; o.auto_execute = false;
    return o;
  }
  M.demoSessions = [
    { id: 'CDEMO-A', title: 'N52 高矫顽力配方全流程', ts: '2026-11-17 13:20',
      /* v3.37（黄总 2026-11-17）：AI 自主编排版——3 句泛化需求触发全流程；
       * 首轮 plan 保留过程卡（节点含工具调用二级节点），后续轮次追问折叠为 answer。
       * 用户不再点名工具：RAG / 配方智能体 / DFT / 三类仿真均由 AI 自主编排。 */
      msgs: [
        /* 轮 1：一句泛化需求 → AI 自主编排 检索 + 配方 + DFT，输出解读 / 配方 / 建议 */
        { role: 'user', text: '我这款 N52 实测 Hcj 卡在 14.2，想冲到 15 以上，帮我出个方案' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'formula_gen', name: '配方生成与筛选', intent: 'formula_gen',
          skill_id: 'SK-01', tools: ['T-10', 'T-01', 'T-02'], needs_confirm: true,
          raw: '我这款 N52 实测 Hcj 卡在 14.2，想冲到 15 以上，帮我出个方案',
          slots: { sample_id: 'SMP-001', grade: 'N52', target: 'Hcj≥15 kOe' },
          plan: [
            { title: '理解目标与当前瓶颈', summary: '已解析：N52 · 目标 Hcj ≥ 15 kOe · 当前实测 14.2 kOe', chips: [] },
            { title: '检索知识库与历史样品', summary: '命中 3 条：重稀土减量化 / 晶界相调控 / SMP-001 实测', chips: [{ label: 'RAG 检索 · 知识库 + 历史样品', icon: 'search', tool: 'T-10', flag: '引用' }] },
            { title: '配方智能体生成候选', summary: 'SK-01 调度 T-01，输出 3 个候选 F-N52-v4a / v4b / v4c', chips: [{ label: '配方智能体 · SK-01', icon: 'cpu', tool: 'SK-01', flag: '编排' }, { label: '配方优化 ML · T-01', icon: 'cpu', tool: 'T-01', flag: '预测' }] },
            { title: '第一性原理 DFT 筛选', summary: 'T-02 对比形成焓，v4a 最稳，Dy 优先占位晶界相', chips: [{ label: 'VASP 第一性原理 · T-02', icon: 'flask', tool: 'T-02', flag: '仿真' }] },
            { title: '汇总解读与建议', summary: '已综合检索 / 预测 / 仿真三源证据', chips: [] }
          ],
          answer: '先给结论：**F-N52-v4a** 最值得往下推——预测 Hcj **15.3 kOe**（目标 ≥ 15，当前实测 14.2），综合评分 0.86。\n依据来自三条证据：知识库里「重稀土减量 + 晶界相连续性」的调控方向（见右栏「检索结果」）、配方智能体生成的 3 个候选（见右栏「配方」），以及第一性原理算出的形成焓——v4a 最优，Dy 降到 1.6 wt% 且优先占晶界相。\n建议先小批试制验证，预测口径不能当真值。\n\n要不要我基于这个方向，出一组配套的工艺参数？' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },

        /* 轮 2：用户确认 → AI 出工艺参数，并向用户确认是否执行 */
        { role: 'user', text: '可以，按这个方向出一组工艺参数' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'process_opt', name: '工艺参数优化', intent: 'process_opt',
          skill_id: 'SK-02', tools: ['T-03'], needs_confirm: true,
          raw: '可以，按这个方向出一组工艺参数',
          slots: { sample_id: 'SMP-001' },
          plan: [
            { title: '读取候选配方与目标性能', summary: '已读取 F-N52-v4a · 目标 Hcj ≥ 15 kOe', chips: [] },
            { title: '混料智能体生成参数包', summary: 'SK-02 调度 T-03，输出 P-N52-A / B / C 三组', chips: [{ label: '混料智能体 · SK-02', icon: 'cpu', tool: 'SK-02', flag: '编排' }, { label: '工艺优化 ML · T-03', icon: 'cpu', tool: 'T-03', flag: '预测' }] },
            { title: '标注预测口径与待验证项', summary: 'A 包 Hcj 取向最优；B 包温度窗口更保守；C 包适配 Br 取向', chips: [] }
          ],
          answer: '基于配方在工艺配方库里匹配到三组工艺，都还是**预测口径**：\n- **P-N52-A**（适配 v4a）：烧结 1060℃ × 4h + 520℃ 退火，评分 0.84，我更推荐这组；\n- **P-N52-B**（适配 v4b）：温度窗口更保守、氧含量容忍度高，适合先跑通；\n- **P-N52-C**（适配 v4c）：Br 取向配组，烧结温度上移，需复核晶粒长大风险。\n总重、各仓重量、成型尺寸、微升距离、充磁/退磁电流、混料次数、烧结与退火参数明细都在右栏「工艺」。\n\n这组参数要不要**执行**？你确认后我才会把它作为候选往下推，不会自动改任何工艺设定。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },

        /* 轮 3：一句泛化「验证一下」→ AI 自主编排 VASP + mumax3 两路真实计算 */
        { role: 'user', text: '验证一下，看有没有更好的方案' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'sim_vasp', name: '多路径仿真校验', intent: 'sim_vasp',
          keepTaskPlan: true,
          skill_id: 'SK-05', tools: ['T-02', 'T-09'], needs_confirm: false,
          raw: '验证一下，看有没有更好的方案',
          slots: { sample_id: 'SMP-001' },
          plan: [
            { title: '判定需要的校验路径', summary: '自主选择：第一性原理相稳定性 + 微磁学机制', chips: [] },
            { title: 'VASP 第一性原理', summary: 'v4a 形成焓 −0.42 eV/atom 最优，Dy 优先占位晶界相', chips: [{ label: 'VASP DFT · T-02', icon: 'flask', tool: 'T-02', flag: '仿真' }] },
            { title: 'mumax3 微磁学机制', summary: '畴壁钉扎与反磁化形核，可解释矫顽力来源', chips: [{ label: 'mumax3 微磁学 · T-09', icon: 'flask', tool: 'T-09', flag: '仿真' }] },
            { title: '综合解读与建议', summary: '两路计算与实测趋势一致，无矛盾项', chips: [] }
          ],
          answer: '两路计算均完成，综合解读见下。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: { key: 'sim_vasp', name: '多路径仿真校验', intent: 'sim_vasp', tools: ['T-02', 'T-09'], slots: { sample_id: 'SMP-001' }, answer: '你没指定用哪个工具，我按「验证 + 找更好方案」自己拆了两条路，都跑完了（仿真口径）：\n- **VASP**：v4a 形成焓 −0.42 eV/atom 最优，Dy 优先占位晶界相，支持重稀土减量；\n- **mumax3**：畴壁钉扎与反磁化形核机制，能解释 v4a 的矫顽力来源。\n两路都不构成「更好方案」的证据——现有方向仍是最优候选，仿真只做方向判断、不作为真值。\n\n要不要把这次的结论和留痕**存到样品 SMP-001**？点右栏底部按钮，或直接跟我说一句就行。' } },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: { key: 'sim_mumax', name: 'mumax3 微磁学仿真', intent: 'sim_mumax', skill_id: 'SK-08', tools: ['T-09'], slots: { sample_id: 'SMP-001' }, answer: '补充一条：mumax3 显示 v4a 的畴壁钉扎更强，这是预测 Hcj 能上到 15.3 的机制侧解释（仿真口径，不作真值）。' } }
      ] },
    { id: 'CDEMO-B', title: 'Hcj 温度系数与氢破工艺咨询', ts: '2026-11-12 11:08',
      msgs: [
        { role: 'user', text: 'N52 的 Hcj 温度系数是多少' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'kb_query', name: '知识检索问答', intent: 'kb_query',
          skill_id: 'SK-09', tools: ['T-10'],
          raw: 'N52 的 Hcj 温度系数是多少',
          slots: { sample_id: 'SMP-001' },
          plan: [
            { title: '解析问题关键词', summary: '关键词已解析', chips: [] },
            { title: 'RAG 检索知识库', summary: '平台数据集 + 我的文档，命中 3 条', chips: [{ label: 'RAG 检索 · 命中 3 条', icon: 'search' }] },
            { title: '整理答案并附原文引用', summary: '答案已附引用，可回溯到段落', chips: [] }
          ],
          answer: '已在知识库检索到相关内容（示例口径）：N52 牌号 Hcj 温度系数约 **−0.55 %/℃**（20–80℃ 区间），高温工况须按工作温度折算 Hcj 裕量。\n命中与引用出处统一见右侧「检索结果」，可回溯到原文段落。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },
        { role: 'ai', kind: 'artifact', items: [
          { icon: 'search', title: '检索命中 · 3 条', sub: '平台数据集 + 我的文档', tab: 'search' }
        ] },
        { role: 'user', text: '氢破工艺的标准压力范围是什么' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'kb_query', name: '知识检索问答', intent: 'kb_query',
          skill_id: 'SK-09', tools: ['T-10'],
          raw: '氢破工艺的标准压力范围是什么',
          slots: { sample_id: 'SMP-001' },
          plan: [
            { title: '解析问题关键词', summary: '关键词已解析', chips: [] },
            { title: 'RAG 检索知识库', summary: '平台数据集 + 我的文档，命中 3 条', chips: [{ label: 'RAG 检索 · 命中 3 条', icon: 'search' }] },
            { title: '整理答案并附原文引用', summary: '答案已附引用，可回溯到段落', chips: [] }
          ],
          answer: '已在知识库检索到相关内容（示例口径）：氢破（HD）标准窗口为吸氢压力 **1.8–2.2 MPa**、保压 **2 h**；气流磨粒度 D50 目标 4.0–4.5 μm，全流程氧含量 ≤ 3000 ppm。\n命中与引用出处统一见右侧「检索结果」，可回溯到原文段落。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },
        { role: 'ai', kind: 'artifact', items: [
          { icon: 'search', title: '检索命中 · 3 条', sub: '平台数据集 + 我的文档', tab: 'search' }
        ] }
      ] },
    { id: 'CDEMO-C', title: 'N48 低氧配方仿真预研', ts: '2026-11-11 15:26',
      msgs: [
        { role: 'user', text: '氧含量超标会怎么影响 Hcj？有什么低氧工艺方向' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'kb_query', name: '知识检索问答', intent: 'kb_query',
          skill_id: 'SK-09', tools: ['T-10'],
          raw: '氧含量超标会怎么影响 Hcj？有什么低氧工艺方向',
          slots: {},
          plan: [
            { title: '解析问题关键词', summary: '关键词已解析', chips: [] },
            { title: 'RAG 检索知识库', summary: '平台数据集 + 我的文档，命中 3 条', chips: [{ label: 'RAG 检索 · 命中 3 条', icon: 'search' }] },
            { title: '整理答案并附原文引用', summary: '答案已附引用，可回溯到段落', chips: [] }
          ],
          answer: '已在知识库检索到相关内容（示例口径）：气流磨后氧含量超标将直接拉低 Hcj，须拦截复核；低氧方向 = 氢破-气流磨全程控氧（≤ 3000 ppm）+ 晶界相连续性调控。\n命中与引用出处统一见右侧「检索结果」，可回溯到原文段落。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },
        { role: 'ai', kind: 'artifact', items: [
          { icon: 'search', title: '检索命中 · 3 条', sub: '平台数据集 + 我的文档', tab: 'search' }
        ] },
        { role: 'user', text: '帮我优化一个 N48 低氧配方，目标 Hcj ≥ 12 kOe' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'formula_gen', name: '配方生成与筛选', intent: 'formula_gen',
          skill_id: 'SK-01', tools: ['T-01', 'T-02'], needs_confirm: true,
          raw: '帮我优化一个 N48 低氧配方，目标 Hcj ≥ 12 kOe',
          slots: { grade: 'N48', target: 'Hcj≥12 kOe' },
          plan: [
            { title: '解析目标性能与约束', summary: '已解析：牌号 N48 · 目标 Hcj ≥ 12 kOe · 低氧约束', chips: [] },
            { title: '检索知识库与历史样品', summary: '命中 3 条：成分区间 / 低氧控制 / SMP-002 拦截记录', chips: [{ label: '知识库检索 · 命中 3 条', icon: 'search' }] },
            { title: '配方优化 ML 模型生成候选', summary: '已生成 3 个候选：F-N48-v1a / v1b / v1c', chips: [{ label: '配方优化 ML 模型 · 输出 3 候选（预测）', icon: 'cpu' }] },
            { title: '第一性原理相稳定性筛选', summary: 'v1a 无 Dy 方案形成焓最优，氧敏感窗口收窄', chips: [{ label: 'VASP DFT · 形成焓对比（仿真）', icon: 'flask' }] }
          ],
          answer: '已完成 N48 低氧方向候选筛选（预研口径）：**F-N48-v1a** 居首——无 Dy 添加、Nd 30.2 wt%，氧敏感窗口收窄至 ≤ 2600 ppm；预测 Hcj **12.4 kOe**（目标 ≥ 12）。\n候选对比为示例演示数据；以上为预测口径，须实测验证。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },
        { role: 'ai', kind: 'artifact', items: [
          { icon: 'flask', title: '候选配方组 · 3 个候选', sub: 'F-N48-v1a 居首 · 预测口径', tab: 'formula' },
          { icon: 'search', title: '检索命中 · 3 条', sub: '成分区间 / 低氧控制 / SMP-002 拦截记录', tab: 'search' }
        ] },
        { role: 'user', text: '用 VASP 算一下这个低氧思路' },
        { role: 'ai', kind: 'plan', task: doneTask({ key: 'sim_vasp', name: 'VASP 第一性原理计算', intent: 'sim_vasp',
          skill_id: 'SK-05', tools: ['T-02'], needs_confirm: true,
          raw: '用 VASP 算一下这个低氧思路',
          slots: {},
          plan: [
            { title: '读取候选配方成分', summary: '已读取 F-N48-v1a 无 Dy 方案', chips: [] },
            { title: 'VASP 第一性原理计算（只读登记）', summary: '计算完成：无 Dy 方案形成焓最优，氧敏感窗口收窄', chips: [{ label: 'VASP DFT · 相稳定性分析', icon: 'flask' }] },
            { title: '输出辅助判断说明', summary: '计算说明已登记留痕', chips: [] }
          ],
          answer: 'VASP 第一性原理计算完成（仿真口径）：低氧方向无 Dy 方案形成焓最优，氧敏感窗口收窄至 ≤ 2600 ppm，未发现矛盾项。\n仿真仅作辅助判断，不作为真值；数值结论仍以实测为准。本轮为纯预研，不涉及实体样品制备。' }) },
        { role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: null },
        { role: 'ai', kind: 'artifact', items: [
          { icon: 'flask', title: '第一性原理计算结果 · VASP', sub: '结论已登记 · 仿真口径（不作真值）', tab: 'sim_vasp' },
          { icon: 'smp', title: '科研对象 · SMP-002', sub: '样品数据（配方/工艺） · 实验数据（结构/性能/本征） · 仿真数据（VASP/微磁学） · 留痕', href: 'sample.html?sample_id=SMP-002' }
        ] }
      ] }
  ];

  /* v3.37（黄总 2026-11-17）：规范化规则调整——
   * ① 产物跳转卡消息全部剔除——详情在工作台各 tab / 科研对象看，对话流不再放跳转卡；
   * ② 仅会话首轮保留 plan 过程卡；后续轮次的 plan 折叠成 answer 数据载体——
   *    **例外**：task.keepTaskPlan=true 的多工具编排卡（如会话 A 轮 3 的 VASP+mumax3 两路计算）保留过程卡，
   *    以体现"AI 自主编排工具/仿真"的展开节点；
   * ③ 首轮 answer 的 task 回填为本轮 plan 的 task（answerHTML 从 task.answer 取文案）。 */
  M.demoSessions.forEach(function (s) {
    var seenPlan = false, lastTask = null, skipAnswer = false, out = [];
    s.msgs.forEach(function (m) {
      if (m.kind === 'artifact') { return; }
      if (m.kind === 'plan' && m.task) {
        if (seenPlan && !m.task.keepTaskPlan) {
          out.push({ role: 'ai', kind: 'answer', _streamed: true, _traces: [], task: m.task });
          lastTask = m.task;
          skipAnswer = true;
          return;
        }
        seenPlan = true;
        lastTask = m.task;
        out.push(m);
        return;
      }
      if (m.kind === 'answer' && !m.task) {
        if (skipAnswer) { skipAnswer = false; return; }
        m.task = lastTask;
      }
      out.push(m);
    });
    s.msgs = out;
  });

  /* ---------- 工作台仿真产物（v3.34）：右栏仿真 tab 内容源 ----------
   * 只允许 VASP + mumax3 两路真实计算产物——均直接引用 SMP-001 档案同源数据
   * （唯一真相源不复制）；原 V-REP / Isaac 为凭空编的场景校验，无档案数据源，已移除。 */
  /* ---------- 仿真事件流（v3.27，黄总：对话里的仿真如何把确定信息同步进档案）----------
     事件溯源：append-only，每条 = 一次真实工具执行；档案不存"扁平任务"，只从事件流投影出
     当前视图。失败不入库（就当没有）。字段：
       eid / run_id(全局锚点) / run_key(幂等键=样品+引擎+规范化脚本+工具版本) /
       parent(版本链指向) / sample_id / engine / status / ts / actor(会话) / task(载荷)。
     payload 直接引用样品现有对象（同一引用，不复制，避免两份真相）。
     演示场景：VASP = 两条完全相同事件（run_key 同 → 投影幂等合并成一条）；
     mumax3 = 两条参数微调（Ku1 4.5→4.7，run_key 不同，第二条 parent 指第一条 → 版本链）。 */
  (function () {
    var s = M.samples[0];
    /* mumax3 微调版：浅拷贝 + 覆盖会变的字段；产物与图表结构复用（参数微调试算）。 */
    var mx2 = Object.assign({}, s.micromag);
    mx2.results = [
      { key: '矫顽力主导机制', value: '晶界畴壁钉扎为主，缺陷处反磁化形核为辅（Ku1 提高后钉扎增强）', flag: 'simulated', src: 'mumax3 微磁学仿真', tool_call_id: 'TC-011' },
      { key: '畴结构特征', value: 'Ku1 4.7e6 下畴壁更窄，晶界连续处位移受阻更显著', flag: 'simulated', src: 'mumax3 微磁学仿真', tool_call_id: 'TC-011' },
      { key: '与实测对照', value: '退磁曲线趋势仍与 RPT-20261110-01 一致，不替代实测', flag: 'simulated', src: 'mumax3 微磁学仿真', tool_call_id: 'TC-011' }
    ];
    mx2.inputs = s.micromag.inputs.map(function (r) {
      if (r.key === 'Ku1 / Aex') {
        return { key: r.key, value: '4.7e6 J/m³ · 12.5e-12 J/m', src: r.src };
      }
      return r;
    });
    mx2.script = Object.assign({}, s.micromag.script, {
      text: s.micromag.script.text.replace('4.5e6', '4.7e6')
    });
    mx2.chart = Object.assign({}, s.micromag.chart, {
      note: 'Ku1 微调至 4.7e6 复算：仿真 Hcj ≈ 4.7 T，仍高于实测 1.42 T（理想单晶粒模型）。'
    });
    mx2.job = { id: 'SIM-20261116-011', sw: 'mumax3 v3.10', cluster: '仿真集群（SCP-04 · SSH/批处理）', ts: '2026-11-16 10:05', ev_id: 'EV-007' };
    M.simEvents = [
      { eid: 'EVS-001', run_id: 'RUN-VASP-0902', run_key: 'SMP-001|VASP|INCAR|v6.4.2|520eV-3x3x2', parent: null,
        sample_id: 'SMP-001', engine: 'VASP', status: 'succeeded', ts: '2026-11-09 16:40', actor: 'SES-A3F1', source: 'tool', tool_version: '6.4.2', task: s.vasp },
      { eid: 'EVS-002', run_id: 'RUN-VASP-0902', run_key: 'SMP-001|VASP|INCAR|v6.4.2|520eV-3x3x2', parent: null,
        sample_id: 'SMP-001', engine: 'VASP', status: 'succeeded', ts: '2026-11-09 16:41', actor: 'SES-A3F1', source: 'tool', tool_version: '6.4.2', task: s.vasp },
      { eid: 'EVS-003', run_id: 'RUN-MX3-1109', run_key: 'SMP-001|mumax3|ndfeb_core_shell.mx3|v3.10|Ku1=4.5e6', parent: null,
        sample_id: 'SMP-001', engine: 'mumax3', status: 'succeeded', ts: '2026-11-12 15:20', actor: 'SES-B72C', source: 'tool', tool_version: '3.10', task: s.micromag },
      { eid: 'EVS-004', run_id: 'RUN-MX3-1116', run_key: 'SMP-001|mumax3|ndfeb_core_shell.mx3|v3.10|Ku1=4.7e6', parent: 'RUN-MX3-1109',
        sample_id: 'SMP-001', engine: 'mumax3', status: 'succeeded', ts: '2026-11-16 10:05', actor: 'SES-B72C', source: 'tool', tool_version: '3.10', task: mx2 }
    ];
    /* 微磁学基准任务指向事件流当前版；连接器仍需单份引用（工作台 M.simRuns）。 */
    M.micromagCurrent = mx2;
  })();

  M.simRuns = {
    VASP: M.samples[0].vasp,
    mumax3: M.micromagCurrent || M.samples[0].micromag
  };

  /* ---------- 账户（静态演示身份） ---------- */
  M.account = { name: '研究员', initial: '研' };
})();
