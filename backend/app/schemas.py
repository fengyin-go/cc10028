"""接口出入参模型：列表分页、动作结果与各模块的明细结构。"""
from __future__ import annotations

from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class PageResult(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int = 1
    size: int = 20


class ActionResult(BaseModel):
    ok: bool
    message: str
    entry: dict[str, Any] | None = None


class EntryPayload(BaseModel):
    """登记或修改一条业务记录时提交的字段集合。"""

    values: dict[str, Any] = Field(default_factory=dict)
    remark: str | None = None


class ActionPayload(BaseModel):
    """状态动作使用独立契约，避免与登记的 values 载荷混用。"""

    action: str
    remark: str | None = None



class DatasourceEntry(BaseModel):
    """数据源明细结构。"""

    field_0: str | None = None  # 源端编号
    field_1: str | None = None  # 连接类型
    field_2: str | None = None  # 接入地址
    field_3: str | None = None  # 数据库名
    field_4: str | None = None  # 字符编码
    field_5: str | None = None  # 连接超时
    field_6: str | None = None  # 重试上限
    field_7: str | None = None  # 负责人

class DatasetEntry(BaseModel):
    """数据集明细结构。"""

    field_0: str | None = None  # 数据集编号
    field_1: str | None = None  # 数据集名称
    field_2: str | None = None  # 所属数据源
    field_3: str | None = None  # 表名或查询
    field_4: str | None = None  # 行数估算
    field_5: str | None = None  # 列数
    field_6: str | None = None  # 刷新周期
    field_7: str | None = None  # 创建时间

class DimensionEntry(BaseModel):
    """维度明细结构。"""

    field_0: str | None = None  # 维度编号
    field_1: str | None = None  # 维度名称
    field_2: str | None = None  # 对应字段
    field_3: str | None = None  # 维度类型
    field_4: str | None = None  # 层级深度
    field_5: str | None = None  # 默认排序
    field_6: str | None = None  # 筛选器类型
    field_7: str | None = None  # 是否启用

class MeasureEntry(BaseModel):
    """度量明细结构。"""

    field_0: str | None = None  # 度量编号
    field_1: str | None = None  # 度量名称
    field_2: str | None = None  # 聚合函数
    field_3: str | None = None  # 目标字段
    field_4: str | None = None  # 精度位数
    field_5: str | None = None  # 格式化模板
    field_6: str | None = None  # 是否派生
    field_7: str | None = None  # 上级度量

class IndicatorEntry(BaseModel):
    """指标明细结构。"""

    field_0: str | None = None  # 指标编号
    field_1: str | None = None  # 指标名称
    field_2: str | None = None  # 计算公式
    field_3: str | None = None  # 关联度量
    field_4: str | None = None  # 统计粒度
    field_5: str | None = None  # 时间范围
    field_6: str | None = None  # 口径版本
    field_7: str | None = None  # 业务归属

class QuerybuilderEntry(BaseModel):
    """查询模板明细结构。"""

    field_0: str | None = None  # 模板编号
    field_1: str | None = None  # 模板名称
    field_2: str | None = None  # 查询数据集
    field_3: str | None = None  # 维度列表
    field_4: str | None = None  # 度量列表
    field_5: str | None = None  # 筛选条件
    field_6: str | None = None  # 排序规则
    field_7: str | None = None  # 结果上限

class ExperimentEntry(BaseModel):
    """实验方案明细结构。"""

    field_0: str | None = None  # 方案编号
    field_1: str | None = None  # 实验名称
    field_2: str | None = None  # 分析数据集
    field_3: str | None = None  # 对照组
    field_4: str | None = None  # 实验组
    field_5: str | None = None  # 核心指标
    field_6: str | None = None  # 显著阈值
    field_7: str | None = None  # 实验周期

class ReportEntry(BaseModel):
    """报表明细结构。"""

    field_0: str | None = None  # 报表编号
    field_1: str | None = None  # 报表名称
    field_2: str | None = None  # 数据来源
    field_3: str | None = None  # 展示类型
    field_4: str | None = None  # 时间维度
    field_5: str | None = None  # 对比期间
    field_6: str | None = None  # 刷新频率
    field_7: str | None = None  # 订阅列表

class DashboardEntry(BaseModel):
    """看板明细结构。"""

    field_0: str | None = None  # 看板编号
    field_1: str | None = None  # 看板名称
    field_2: str | None = None  # 关联报表
    field_3: str | None = None  # 布局配置
    field_4: str | None = None  # 默认周期
    field_5: str | None = None  # 自动刷新
    field_6: str | None = None  # 分享链接
    field_7: str | None = None  # 负责人

class CohortEntry(BaseModel):
    """同期群明细结构。"""

    field_0: str | None = None  # 群组编号
    field_1: str | None = None  # 群组名称
    field_2: str | None = None  # 划分维度
    field_3: str | None = None  # 起始事件
    field_4: str | None = None  # 回访事件
    field_5: str | None = None  # 观察天数
    field_6: str | None = None  # 最小样本
    field_7: str | None = None  # 保留阈值

class FunnelEntry(BaseModel):
    """漏斗明细结构。"""

    field_0: str | None = None  # 漏斗编号
    field_1: str | None = None  # 漏斗名称
    field_2: str | None = None  # 步骤序列
    field_3: str | None = None  # 步骤事件
    field_4: str | None = None  # 转化窗口
    field_5: str | None = None  # 关联维度
    field_6: str | None = None  # 默认排序
    field_7: str | None = None  # 最小基数

class AlertEntry(BaseModel):
    """预警规则明细结构。"""

    field_0: str | None = None  # 规则编号
    field_1: str | None = None  # 监控指标
    field_2: str | None = None  # 触发条件
    field_3: str | None = None  # 阈值上界
    field_4: str | None = None  # 阈值下界
    field_5: str | None = None  # 通知渠道
    field_6: str | None = None  # 沉默窗口
    field_7: str | None = None  # 生效时段

class ForecastEntry(BaseModel):
    """预测模型明细结构。"""

    field_0: str | None = None  # 模型编号
    field_1: str | None = None  # 目标指标
    field_2: str | None = None  # 算法类型
    field_3: str | None = None  # 训练窗口
    field_4: str | None = None  # 预测步长
    field_5: str | None = None  # 特征字段
    field_6: str | None = None  # 评估误差
    field_7: str | None = None  # 模型版本

class SegmentationEntry(BaseModel):
    """分群规则明细结构。"""

    field_0: str | None = None  # 分群编号
    field_1: str | None = None  # 分群名称
    field_2: str | None = None  # 筛选条件
    field_3: str | None = None  # 人群规模
    field_4: str | None = None  # 更新周期
    field_5: str | None = None  # 关联标签
    field_6: str | None = None  # 计算优先级
    field_7: str | None = None  # 是否固化

class DataserviceEntry(BaseModel):
    """数据服务明细结构。"""

    field_0: str | None = None  # 服务编号
    field_1: str | None = None  # 输出数据集
    field_2: str | None = None  # 查询参数
    field_3: str | None = None  # 响应字段
    field_4: str | None = None  # 缓存秒数
    field_5: str | None = None  # 分页上限
    field_6: str | None = None  # 发布版本
    field_7: str | None = None  # 消费应用

class DataproductEntry(BaseModel):
    """数据产品明细结构。"""

    field_0: str | None = None  # 产品编号
    field_1: str | None = None  # 产品名称
    field_2: str | None = None  # 数据来源
    field_3: str | None = None  # 交付格式
    field_4: str | None = None  # 更新频率
    field_5: str | None = None  # 质量SLA
    field_6: str | None = None  # 版本记录
    field_7: str | None = None  # 产品负责人

class SharelinkEntry(BaseModel):
    """分享链接明细结构。"""

    field_0: str | None = None  # 链接编号
    field_1: str | None = None  # 分享内容
    field_2: str | None = None  # 访问密码
    field_3: str | None = None  # 有效天数
    field_4: str | None = None  # 查看次数
    field_5: str | None = None  # 创建时间
    field_6: str | None = None  # 创建人
    field_7: str | None = None  # 是否禁用

class AccesslogEntry(BaseModel):
    """访问日志明细结构。"""

    field_0: str | None = None  # 日志编号
    field_1: str | None = None  # 查询用户
    field_2: str | None = None  # 查询时间
    field_3: str | None = None  # 查询语句
    field_4: str | None = None  # 返回行数
    field_5: str | None = None  # 耗时毫秒
    field_6: str | None = None  # 是否命中缓存
    field_7: str | None = None  # 查询状态
