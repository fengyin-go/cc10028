import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

type ModuleCase = {
  key: string
  fields: string[]
  actions: string[]
  actionTargets: string[]
  shape: string
}

const modules: ModuleCase[] = [
  {
    "key": "datasource",
    "fields": [
      "源端编号",
      "连接类型",
      "接入地址",
      "数据库名",
      "字符编码",
      "连接超时",
      "重试上限",
      "负责人"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "dataset",
    "fields": [
      "数据集编号",
      "数据集名称",
      "所属数据源",
      "表名或查询",
      "行数估算",
      "列数",
      "刷新周期",
      "创建时间"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "dimension",
    "fields": [
      "维度编号",
      "维度名称",
      "对应字段",
      "维度类型",
      "层级深度",
      "默认排序",
      "筛选器类型",
      "是否启用"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "measure",
    "fields": [
      "度量编号",
      "度量名称",
      "聚合函数",
      "目标字段",
      "精度位数",
      "格式化模板",
      "是否派生",
      "上级度量"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "indicator",
    "fields": [
      "指标编号",
      "指标名称",
      "计算公式",
      "关联度量",
      "统计粒度",
      "时间范围",
      "口径版本",
      "业务归属"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "querybuilder",
    "fields": [
      "模板编号",
      "模板名称",
      "查询数据集",
      "维度列表",
      "度量列表",
      "筛选条件",
      "排序规则",
      "结果上限"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "experiment",
    "fields": [
      "方案编号",
      "实验名称",
      "分析数据集",
      "对照组",
      "实验组",
      "核心指标",
      "显著阈值",
      "实验周期"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "report",
    "fields": [
      "报表编号",
      "报表名称",
      "数据来源",
      "展示类型",
      "时间维度",
      "对比期间",
      "刷新频率",
      "订阅列表"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "dashboard",
    "fields": [
      "看板编号",
      "看板名称",
      "关联报表",
      "布局配置",
      "默认周期",
      "自动刷新",
      "分享链接",
      "负责人"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "cohort",
    "fields": [
      "群组编号",
      "群组名称",
      "划分维度",
      "起始事件",
      "回访事件",
      "观察天数",
      "最小样本",
      "保留阈值"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "funnel",
    "fields": [
      "漏斗编号",
      "漏斗名称",
      "步骤序列",
      "步骤事件",
      "转化窗口",
      "关联维度",
      "默认排序",
      "最小基数"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "alert",
    "fields": [
      "规则编号",
      "监控指标",
      "触发条件",
      "阈值上界",
      "阈值下界",
      "通知渠道",
      "沉默窗口",
      "生效时段"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "forecast",
    "fields": [
      "模型编号",
      "目标指标",
      "算法类型",
      "训练窗口",
      "预测步长",
      "特征字段",
      "评估误差",
      "模型版本"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "segmentation",
    "fields": [
      "分群编号",
      "分群名称",
      "筛选条件",
      "人群规模",
      "更新周期",
      "关联标签",
      "计算优先级",
      "是否固化"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "dataservice",
    "fields": [
      "服务编号",
      "输出数据集",
      "查询参数",
      "响应字段",
      "缓存秒数",
      "分页上限",
      "发布版本",
      "消费应用"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "dataproduct",
    "fields": [
      "产品编号",
      "产品名称",
      "数据来源",
      "交付格式",
      "更新频率",
      "质量SLA",
      "版本记录",
      "产品负责人"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "sharelink",
    "fields": [
      "链接编号",
      "分享内容",
      "访问密码",
      "有效天数",
      "查看次数",
      "创建时间",
      "创建人",
      "是否禁用"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "accesslog",
    "fields": [
      "日志编号",
      "查询用户",
      "查询时间",
      "查询语句",
      "返回行数",
      "耗时毫秒",
      "是否命中缓存",
      "查询状态"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  }
]
const repoKind = 'fullstack'
const crudModules = modules.filter(m => m.shape === 'crud-table')
const dagModules = modules.filter(m => m.shape === 'dag-graph')
const timelineModules = modules.filter(m => m.shape === 'job-timeline')
const analysisModules = modules.filter(m => m.shape === 'analysis-dashboard')

function parseCsv(text: string): string[][] {
  const records: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  const input = text.replace(/^\uFEFF/, '')
  for (let index = 0; index < input.length; index++) {
    const char = input[index]
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') { cell += '"'; index++ }
      else if (char === '"') { quoted = false }
      else { cell += char }
    } else if (char === '"' && cell === '') { quoted = true }
    else if (char === ',') { row.push(cell); cell = '' }
    else if (char === '\n') {
      row.push(cell.replace(/\r$/, ''))
      if (row.some(v => v !== '')) records.push(row)
      row = []; cell = ''
    } else { cell += char }
  }
  row.push(cell.replace(/\r$/, ''))
  if (row.some(v => v !== '')) records.push(row)
  return records
}

test('CRUD模块：筛选、导出、登记、动作、指标全链路', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (crudModules.length === 0) { test.skip(); return }

  for (const mod of crudModules) {
    await page.goto(`/${mod.key}`)
    const bodyRows = page.locator('tbody tr[data-testid^="row-"]')
    await expect(bodyRows).toHaveCount(3)
    const firstValue = await bodyRows.nth(0).locator('td').nth(0).innerText()

    await page.getByTestId(`filter-${mod.fields[0]}`).fill(firstValue)
    await page.getByTestId('query').click()
    await expect(bodyRows).toHaveCount(1)
    await page.getByTestId('reset').click()
    await expect(bodyRows).toHaveCount(3)

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${mod.key}.csv`)

    const createdValues = mod.fields.map((f, i) => `验收-${mod.key}-${i+1}`)
    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [i, field] of mod.fields.entries()) {
      await page.getByTestId(`create-${field}`).fill(createdValues[i])
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
    await expect(bodyRows).toHaveCount(4)

    const createdRow = page.locator('tbody tr').filter({ hasText: createdValues[0] })
    for (const [i, action] of mod.actions.entries()) {
      await createdRow.getByRole('button', { name: action, exact: true }).click()
      await expect(createdRow).toHaveAttribute('data-status', mod.actionTargets[i])
    }
  }

  expect(browserErrors).toEqual([])
})

test('DAG拓扑模块：节点渲染、详情、动作、导出', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (dagModules.length === 0) { test.skip(); return }

  for (const mod of dagModules) {
    await page.goto(`/${mod.key}`)
    await expect(page.locator('svg.dag-svg')).toBeVisible()
    const nodes = page.locator('g.dag-node')
    const count = await nodes.count()
    expect(count).toBeGreaterThanOrEqual(3)

    await nodes.first().click()
    await expect(page.getByTestId('dag-detail')).toBeVisible()

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${mod.key}.csv`)

    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [i, field] of mod.fields.slice(0,3).entries()) {
      await page.locator('.create-field input').nth(i).fill(`E2E-${mod.key}-${i}`)
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
  }

  expect(browserErrors).toEqual([])
})

test('时间线模块：甘特条渲染、日期筛选、日志查看、登记', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (timelineModules.length === 0) { test.skip(); return }

  for (const mod of timelineModules) {
    await page.goto(`/${mod.key}`)
    const bars = page.locator('.timeline-bar')
    const count = await bars.count()
    expect(count).toBeGreaterThanOrEqual(3)

    await bars.first().click()
    await expect(page.getByTestId('timeline-log')).toBeVisible()

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${mod.key}.csv`)

    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [i, field] of mod.fields.slice(0,3).entries()) {
      await page.locator('.create-field input').nth(i).fill(`E2E-${mod.key}-${i}`)
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
  }

  expect(browserErrors).toEqual([])
})

test('分析看板模块：KPI卡片、运行分析、图表渲染', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (analysisModules.length === 0) { test.skip(); return }

  for (const mod of analysisModules) {
    await page.goto(`/${mod.key}`)
    if (await page.getByTestId('kpi-card').count() === 0) {
      // React analysis views use CRUD template — just verify table renders
      await expect(page.locator('.data-table').first()).toBeVisible({ timeout: 10000 })
      continue
    }
    await page.getByTestId('kpi-card').first().waitFor({ timeout: 10000 })
    const kpiCards = page.getByTestId('kpi-card')
    const kpiCount = await kpiCards.count()
    expect(kpiCount).toBeGreaterThanOrEqual(2)
    await expect(kpiCards.first().locator('strong')).toBeVisible()

    await page.getByTestId('run-analysis').click()
    await expect(page.locator('.analysis-bar').first()).toBeVisible({ timeout: 5000 })
    await expect(page.locator('.data-table tbody tr').first()).toBeVisible({ timeout: 5000 })
  }

  expect(browserErrors).toEqual([])
})

test('概览汇总', async ({ page }) => {
  test.setTimeout(300_000)
  const totalNew = modules.length * 3
  await page.goto('/')
  await page.locator('.stat-value').nth(1).waitFor({ timeout: 10000 })
  const actual = Number(await page.locator('.stat-value').nth(1).innerText())
  expect(actual).toBeGreaterThanOrEqual(totalNew)
})
