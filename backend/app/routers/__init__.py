"""业务模块路由汇总。

这里统一按别名导入再暴露 ROUTERS：模块名有可能和内置名撞车（某个业务模块就叫 dict、list
这种名字时），按名字直接 import 会把内置类型覆盖掉，函数注解在运行时求值就会报
'module' object is not subscriptable。
"""
from __future__ import annotations

from app.routers import datasource as router_datasource
from app.routers import dataset as router_dataset
from app.routers import dimension as router_dimension
from app.routers import measure as router_measure
from app.routers import indicator as router_indicator
from app.routers import querybuilder as router_querybuilder
from app.routers import experiment as router_experiment
from app.routers import report as router_report
from app.routers import dashboard as router_dashboard
from app.routers import cohort as router_cohort
from app.routers import funnel as router_funnel
from app.routers import alert as router_alert
from app.routers import forecast as router_forecast
from app.routers import segmentation as router_segmentation
from app.routers import dataservice as router_dataservice
from app.routers import dataproduct as router_dataproduct
from app.routers import sharelink as router_sharelink
from app.routers import accesslog as router_accesslog

ROUTERS = [router_datasource, router_dataset, router_dimension, router_measure, router_indicator, router_querybuilder, router_experiment, router_report, router_dashboard, router_cohort, router_funnel, router_alert, router_forecast, router_segmentation, router_dataservice, router_dataproduct, router_sharelink, router_accesslog]
