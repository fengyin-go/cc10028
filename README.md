# 数据分析工作台

面向指标口径定义、聚合查询、分析实验、数据服务发布与数据产品交付的数据分析与应用工作台。

这是一个前后端分离的管理平台：前端 React + Vite + TypeScript，后端 FastAPI（Python）。
两边各自独立启动，前端 dev server 已关掉自动打开页面，启动后按终端打印的地址手工打开。

## 目录结构

```text
.
├── frontend/                 React + Vite + TypeScript 前端
│   ├── src/views/            每个业务模块一个页面
│   ├── src/api/              统一请求封装
│   ├── src/stores/           会话与筛选状态
│   └── vite.config.ts        dev server 配置（open: false）
├── backend/                  FastAPI（Python） 后端
│   ├── app/routers/          每个业务模块一组接口
│   ├── app/services/         业务规则与状态流转
│   └── app/store.py          内存数据仓库与示例数据
├── .gitignore
└── docker-compose.yml
```

## 启动

### 后端

```bash
cd backend
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
./run.sh
```

健康检查：`curl http://127.0.0.1:8000/api/health`

### 前端

```bash
cd frontend
npm ci
npm run dev
```

前端默认监听 `http://127.0.0.1:5173/`，dev server 不会自动打开浏览器，
需要自己访问。`/api` 由 vite 代理到后端 `http://127.0.0.1:8000`。

## 业务模块

| 模块 | 目录 | 业务对象 | 主要字段 |
| --- | --- | --- | --- |
| 数据源管理 | `datasource` | 数据源 | 源端编号、连接类型、接入地址 |
| 数据集注册 | `dataset` | 数据集 | 数据集编号、数据集名称、所属数据源 |
| 维度定义 | `dimension` | 维度 | 维度编号、维度名称、对应字段 |
| 度量定义 | `measure` | 度量 | 度量编号、度量名称、聚合函数 |
| 指标口径 | `indicator` | 指标 | 指标编号、指标名称、计算公式 |
| 聚合查询 | `querybuilder` | 查询模板 | 模板编号、模板名称、查询数据集 |
| 分析实验 | `experiment` | 实验方案 | 方案编号、实验名称、分析数据集 |
| 报表配置 | `report` | 报表 | 报表编号、报表名称、数据来源 |
| 看板编排 | `dashboard` | 看板 | 看板编号、看板名称、关联报表 |
| 同期群分析 | `cohort` | 同期群 | 群组编号、群组名称、划分维度 |
| 漏斗分析 | `funnel` | 漏斗 | 漏斗编号、漏斗名称、步骤序列 |
| 数据预警 | `alert` | 预警规则 | 规则编号、监控指标、触发条件 |
| 趋势预测 | `forecast` | 预测模型 | 模型编号、目标指标、算法类型 |
| 用户分群 | `segmentation` | 分群规则 | 分群编号、分群名称、筛选条件 |
| 数据服务发布 | `dataservice` | 数据服务 | 服务编号、输出数据集、查询参数 |
| 数据产品交付 | `dataproduct` | 数据产品 | 产品编号、产品名称、数据来源 |
| 分析分享 | `sharelink` | 分享链接 | 链接编号、分享内容、访问密码 |
| 查询审计 | `accesslog` | 访问日志 | 日志编号、查询用户、查询时间 |

## 约定

- 每个模块的前端页面在 `frontend/src/views/<模块>/index.vue`，后端接口在
  `backend/app/routers/<模块>.py`，业务规则在 `backend/app/services/<模块>.py`。
- 列表接口统一返回 `{ items, total, page, size }`，动作接口统一返回 `{ ok, message }`。
- 状态流转只允许在 `app/services` 里改，路由层不做业务判断。

领域：数据工程
子方向：数据分析与数据应用
