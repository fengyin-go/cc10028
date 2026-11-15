import { useEffect, useState } from 'react'

import { fetchJson } from '@/api/client'

type Overview = {
  cards: { label: string; value: number }[]
  modules: { name: string; created: number; pending: number; abnormal: number }[]
}

const fallbackCards = [{"label": "业务模块", "value": 0}, {"label": "今日新增", "value": 0}]
const fallbackModules = [{"name": "数据源管理", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据集注册", "created": 0, "pending": 0, "abnormal": 0}, {"name": "维度定义", "created": 0, "pending": 0, "abnormal": 0}, {"name": "度量定义", "created": 0, "pending": 0, "abnormal": 0}, {"name": "指标口径", "created": 0, "pending": 0, "abnormal": 0}, {"name": "聚合查询", "created": 0, "pending": 0, "abnormal": 0}, {"name": "分析实验", "created": 0, "pending": 0, "abnormal": 0}, {"name": "报表配置", "created": 0, "pending": 0, "abnormal": 0}, {"name": "看板编排", "created": 0, "pending": 0, "abnormal": 0}, {"name": "同期群分析", "created": 0, "pending": 0, "abnormal": 0}, {"name": "漏斗分析", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据预警", "created": 0, "pending": 0, "abnormal": 0}, {"name": "趋势预测", "created": 0, "pending": 0, "abnormal": 0}, {"name": "用户分群", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据服务发布", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据产品交付", "created": 0, "pending": 0, "abnormal": 0}, {"name": "分析分享", "created": 0, "pending": 0, "abnormal": 0}, {"name": "查询审计", "created": 0, "pending": 0, "abnormal": 0}]

export default function Overview() {
  const [cards, setCards] = useState<Overview['cards']>(fallbackCards)
  const [moduleRows, setModuleRows] = useState<Overview['modules']>(fallbackModules)

  useEffect(() => {
    fetchJson<Overview>('/api/overview')
      .then((payload) => {
        setCards(payload.cards)
        setModuleRows(payload.modules)
      })
      .catch(() => undefined)
  }, [])

  return (
    <section className="page">
      <header className="page-head">
        <div>
          <h2>运营概览</h2>
          <p className="page-desc">汇总各业务模块的关键指标，先看总量再看异常。</p>
        </div>
      </header>
      <div className="stat-row">
        {cards.map((card) => (
          <article key={card.label} className="stat-card">
            <span className="stat-label">{card.label}</span>
            <strong className="stat-value">{card.value}</strong>
          </article>
        ))}
      </div>
      <table className="data-table">
        <thead>
          <tr><th>业务模块</th><th>今日新增</th><th>待处理</th><th>异常量</th></tr>
        </thead>
        <tbody>
          {moduleRows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.created}</td>
              <td>{row.pending}</td>
              <td>{row.abnormal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
