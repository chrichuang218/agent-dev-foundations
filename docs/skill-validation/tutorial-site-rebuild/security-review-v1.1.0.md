# 【安全】允许安装/更新

## 关键依据

- 7 个文件均为可读的技能说明、UI 元数据、参考和模板；无脚本、二进制、安装钩子或自动更新器。
- 新增内容限定于教程站的已授权修改、预览及发布，明确保留本地 review、拒绝后的停止处理与验证边界。
- 调用名保持 tutorial-site-rebuild，英文显示名与内容一致；既有 website-rebuild 仅作为参考依赖，未修改或扩展其权限。

## 覆盖摘要

已审文本 7/7，可运行或不透明资产 0/0，关键未审 0。复核日期：2026-10-15。审查范围为项目内 v1.1.0 文本包，先审查再同步安装副本。

AGENT_SKILL_SECURITY_GATE_V7_BEGIN

```yaml
skillInstallGate:
  schemaVersion: 7
  verdict: safe
  decisionLabel: 安全
  action: allow
  blocked: false
  requireUserConfirm: false
  ruleHits: []
  coverage:
    complete: true
    textRead: "7/7"
    assetsReviewed: "0/0"
    missingCritical: []
  inventory:
    totalFiles: 7
    activeOrConditionalFiles: 7
    runnableOrOpaqueAssets: 0
  riskGroups: []
  keyEvidence:
    - rule: bounded_authorization
      path: references/delivery.md
      summary: 仅在已授权教程站任务中处理预览、目录与发布，拒绝后不绕过清理限制
    - rule: purpose_consistency
      path: references/reading-ui.md
      summary: 以参考结构和用户修正为依据，不把案例数值与偏好推广为通用规则
  triggeredChecks: []
```

AGENT_SKILL_SECURITY_GATE_V7_END
