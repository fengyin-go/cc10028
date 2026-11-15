import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Overview from './views/Overview'
import DatasourceView from './views/datasource'
import DatasetView from './views/dataset'
import DimensionView from './views/dimension'
import MeasureView from './views/measure'
import IndicatorView from './views/indicator'
import QuerybuilderView from './views/querybuilder'
import ExperimentView from './views/experiment'
import ReportView from './views/report'
import DashboardView from './views/dashboard'
import CohortView from './views/cohort'
import FunnelView from './views/funnel'
import AlertView from './views/alert'
import ForecastView from './views/forecast'
import SegmentationView from './views/segmentation'
import DataserviceView from './views/dataservice'
import DataproductView from './views/dataproduct'
import SharelinkView from './views/sharelink'
import AccesslogView from './views/accesslog'

const navItems = [{ label: "运营概览", path: "/" }, { label: "数据源管理", path: "/datasource" }, { label: "数据集注册", path: "/dataset" }, { label: "维度定义", path: "/dimension" }, { label: "度量定义", path: "/measure" }, { label: "指标口径", path: "/indicator" }, { label: "聚合查询", path: "/querybuilder" }, { label: "分析实验", path: "/experiment" }, { label: "报表配置", path: "/report" }, { label: "看板编排", path: "/dashboard" }, { label: "同期群分析", path: "/cohort" }, { label: "漏斗分析", path: "/funnel" }, { label: "数据预警", path: "/alert" }, { label: "趋势预测", path: "/forecast" }, { label: "用户分群", path: "/segmentation" }, { label: "数据服务发布", path: "/dataservice" }, { label: "数据产品交付", path: "/dataproduct" }, { label: "分析分享", path: "/sharelink" }, { label: "查询审计", path: "/accesslog" }]

export default function App() {
  const [operator] = useState('值班管理员')

  return (
    <div className="app-shell">
      <aside className="app-side">
        <h1 className="app-title">数据分析工作台</h1>
        <nav className="nav-list">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-item">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <header className="app-head">
          <span className="head-desc">面向指标口径定义、聚合查询、分析实验、数据服务发布与数据产品交付的数据分析与应用工作台。</span>
          <span className="head-user">当前值班：{operator}</span>
        </header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/datasource" element={<DatasourceView />} />
          <Route path="/dataset" element={<DatasetView />} />
          <Route path="/dimension" element={<DimensionView />} />
          <Route path="/measure" element={<MeasureView />} />
          <Route path="/indicator" element={<IndicatorView />} />
          <Route path="/querybuilder" element={<QuerybuilderView />} />
          <Route path="/experiment" element={<ExperimentView />} />
          <Route path="/report" element={<ReportView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/cohort" element={<CohortView />} />
          <Route path="/funnel" element={<FunnelView />} />
          <Route path="/alert" element={<AlertView />} />
          <Route path="/forecast" element={<ForecastView />} />
          <Route path="/segmentation" element={<SegmentationView />} />
          <Route path="/dataservice" element={<DataserviceView />} />
          <Route path="/dataproduct" element={<DataproductView />} />
          <Route path="/sharelink" element={<SharelinkView />} />
          <Route path="/accesslog" element={<AccesslogView />} />
        </Routes>
      </main>
    </div>
  )
}
