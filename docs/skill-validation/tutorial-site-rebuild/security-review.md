# 【安全】允许安装/更新

## 关键依据

- 全部6个文本已读取，行为限定指定参考站取证、目标项目内生成与验证，发布与权限动作不由技能自动授权。
- 快照、编辑和生成物分离；启动来源脚本前审阅，正文示例不执行，保持TLS校验。
- 不含可执行资产、自动安装或更新链；审查期间变更的入口已重新补读并冻结后再安装。

## 覆盖摘要

已审文本6/6，可运行或不透明资产0/0，关键未审0。独立审查者未执行目标包或外部链接，也未修改文件。

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
    textRead: "6/6"
    assetsReviewed: "0/0"
    missingCritical: []
  inventory:
    totalFiles: 6
    activeOrConditionalFiles: 6
    runnableOrOpaqueAssets: 0
  riskGroups: []
  keyEvidence:
    - rule: null
      path: "SKILL.md"
      summary: "最终7316字节完整补读；动作限于当前授权，局部修复仅检查受影响范围。"
      sha256: "1629CD4F50025CF0FA6DE4D31F1161BD76FF2DEBF926D4ED5AB97622A9126587"
    - rule: null
      path: "references/content-pipeline.md"
      summary: "固定来源和许可依据，分离快照、编辑与生成物；正文代码不执行，导入不覆盖人工编辑。"
      sha256: "864743EE661F2165042BE1ED9852B395CD965A3B0D1E17B7CCE08EA78957B28B"
    - rule: null
      path: "agents/openai.yaml"
      summary: "只含显示信息与默认提示，无安装、更新、权限或外传配置。"
      sha256: "481192870E78F4A4CBB5E55C3F1573EA2306E7899AE71C26B3EF8D836E57D787"
  triggeredChecks: []
```

AGENT_SKILL_SECURITY_GATE_V7_END
