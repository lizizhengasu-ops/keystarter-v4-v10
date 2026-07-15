# ChatBot Architecture — Version Index

| 版本 | 文件名 | 日期 | 内容 |
|------|--------|------|------|
| V1 | CHATBOT-V1-ARCHITECTURE.html | 7/11 | 初始架构：3 门户 + 物理隔离 + 计费方案 |
| V2 | CHATBOT-V2-ARCHITECTURE.html | 7/11 | 修正：续费横幅移到 tenant portal，续费隐藏 |
| V2-data | CHATBOT-V2-DATAFLOW.html | 7/11 | 数据流向图：客户VPS→浏览器→你的VPS |
| V2-flow | CHATBOT-V2-FULLFLOW.html | 7/11 | 完整工作流：5 阶段动画 |
| V3 | CHATBOT-V3-FULLFLOW.html | 7/11 | 修正理解：你建站+预埋+客户后台付费 |
| V4 | CHATBOT-V4-COMPLETE-PLAN.html | 7/11 | 全量方案：GitHub调研+双路径(插件+预埋)+竞品分析+财务模型 |
| PV1 | CHATBOT-PREVIEW-V1.html | 7/11 | ChatWidget 前端预览（终端用户看到的浮窗） |

## 命名规则（以后遵守）
- 每次修改创建新文件，不覆盖旧文件
- 版本号递增：V5, V6, ...
- 预览图独立编号：PREVIEW-V2, PREVIEW-V3, ...
- 版本号体现在文件名中
- 本索引同步更新

## 下一步
当前最新：V4（CHATBOT-V4-COMPLETE-PLAN.html）
待处理：2-3 个真实客户验证 → 得到反馈后出 V5
| V8.2 | CHATBOT-V82-KB-DRIVEN.html | 7/11 | 修复硬编码问题：兼容性检查改为纯 KB 驱动，不写死任何产品特定规则 |
| V8.3 | CHATBOT-V83-IRRELEVANT-HANDLING.html | 7/11 | 无关信息处理规则（承认→解释→拉回） |
| V8.4 | CHATBOT-V84-CONVERSATION-LEARNING.html | 7/11 | 对话学习与自我进化：日志→分析→建议→确认 |
| V9 | CHATBOT-V9-FINAL-FRAMEWORK.html | 7/11 | 全量框架最终版：整合V1-V8.4全部内容+修复+风险+agent-skills |
