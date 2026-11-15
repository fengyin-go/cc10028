import { useCallback, useEffect, useMemo, useState } from 'react'

import { request } from '@/api/client'

const ENDPOINT = '/api/forecast'
const columns = [
  "模型编号",
  "目标指标",
  "算法类型",
  "训练窗口",
  "预测步长",
  "特征字段",
  "评估误差",
  "模型版本"
]
const actions = [
  "提交校验",
  "启用配置",
  "停用配置"
]
const statuses = [
  "草稿",
  "待校验",
  "已启用",
  "已停用"
]
const metricNames = [
  "预测模型总数",
  "待校验预测模型",
  "已启用预测模型"
]

type Row = Record<string, string | number | null>

export default function ForecastView() {
  const [rows, setRows] = useState<Row[]>([])
  const [total, setTotal] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const filterFields = useMemo(() => columns.slice(0, 3), [])
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createValues, setCreateValues] = useState<Record<string, string>>({})
  const stats = useMemo(() => [
    { label: metricNames[0], value: total },
    { label: metricNames[1], value: rows.filter((row) => row.status === statuses[1]).length },
    { label: metricNames[2], value: rows.filter((row) => row.status === statuses[statuses.length - 1]).length },
  ], [rows, total])

  const reload = useCallback(async () => {
    setErrorMessage('')
    const query = new URLSearchParams(filters).toString()
    try {
      const response = await request(`${ENDPOINT}?${query}`)
      if (!response.ok) {
        throw new Error('预测模型列表读取失败')
      }
      const payload = await response.json()
      setRows(payload.items ?? [])
      setTotal(payload.total ?? 0)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '趋势预测列表读取失败')
    }
  }, [filters])

  useEffect(() => {
    void reload()
  }, [reload])

  function openCreate() {
    setCreateValues(Object.fromEntries(columns.map((field) => [field, ''])))
    setErrorMessage('')
    setShowCreate(true)
  }

  async function exportRows() {
    setErrorMessage('')
    const query = new URLSearchParams(filters).toString()
    try {
      const response = await request(`${ENDPOINT}/export?${query}`)
      if (!response.ok) throw new Error('导出失败，请稍后重试')
      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = 'forecast.csv'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '导出失败')
    }
  }

  async function submitCreate(event: React.FormEvent) {
    event.preventDefault()
    setCreating(true)
    setErrorMessage('')
    try {
      const response = await request(ENDPOINT, {
        method: 'POST', body: JSON.stringify(createValues),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) throw new Error(payload.message || '登记失败')
      setShowCreate(false)
      await reload()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '登记失败')
    } finally {
      setCreating(false)
    }
  }

  async function runAction(action: string, row: Row) {
    setErrorMessage('')
    try {
      const response = await request(`${ENDPOINT}/${row.id}/actions`, {
        method: 'POST',
        body: JSON.stringify({ action }),
      })
      const payload = await response.json()
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || '趋势预测动作未生效，请稍后重试')
      }
      await reload()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '趋势预测操作失败')
    }
  }

  return (
    <section className="page" data-module="forecast">
      <header className="page-head">
        <div>
          <h2>趋势预测管理</h2>
          <p className="page-desc">管理趋势预测模型的算法、训练窗口和评估指标。</p>
        </div>
        <div className="page-actions">
          <button className="btn primary" data-testid="open-create" type="button" onClick={openCreate}>
            登记预测模型
          </button>
          <button className="btn" data-testid="export" type="button" onClick={() => void exportRows()}>
            导出趋势预测清单
          </button>
        </div>
      </header>

      <div className="stat-row">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <span className="stat-label">{item.label}</span>
            <strong className="stat-value">{item.value}</strong>
          </article>
        ))}
      </div>

      <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); void reload() }}>
        {filterFields.map((field) => (
          <label key={field} className="filter-item">
            <span>{field}</span>
            <input
              value={filters[field] ?? ''}
              data-testid={`filter-${field}`}
              placeholder={`按${field}检索`}
              onChange={(event) => setFilters((prev) => ({ ...prev, [field]: event.target.value }))}
            />
          </label>
        ))}
        <button className="btn" data-testid="query" type="submit">查询</button>
        <button className="btn ghost" data-testid="reset" type="button" onClick={() => setFilters({})}>重置条件</button>
      </form>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
            <th>可执行动作</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row.id)} data-testid={`row-${row.id}`} data-status={String(row.status)}>
              {columns.map((column) => <td key={column}>{row[column] ?? '—'}</td>)}
              <td className="row-actions">
                {actions.map((action) => (
                  <button key={action} data-testid={`action-${row.id}-${action}`} className="link" type="button" onClick={() => void runAction(action, row)}>
                    {action}
                  </button>
                ))}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="empty-state" colSpan={columns.length + 1}>暂无趋势预测数据，可先登记预测模型</td>
            </tr>
          )}
        </tbody>
      </table>

      {showCreate && (
        <div className="modal-backdrop" data-testid="create-modal">
          <form className="modal" onSubmit={submitCreate}>
            <h3>登记预测模型</h3>
            {columns.map((field) => (
              <label key={field} className="create-field">
                <span>{field}</span>
                <input
                  value={createValues[field] ?? ''}
                  data-testid={`create-${field}`}
                  required
                  onChange={(event) => setCreateValues((prev) => ({ ...prev, [field]: event.target.value }))}
                />
              </label>
            ))}
            <div className="page-actions">
              <button className="btn" type="button" onClick={() => setShowCreate(false)}>取消</button>
              <button className="btn primary" data-testid="submit-create" type="submit" disabled={creating}>
                {creating ? '提交中…' : '确认登记'}
              </button>
            </div>
          </form>
        </div>
      )}

      <footer className="page-foot">
        <span>共 {total} 条趋势预测记录</span>
        {errorMessage && <span className="error-text">{errorMessage}</span>}
      </footer>
    </section>
  )
}
