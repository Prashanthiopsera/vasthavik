# Pre-Commit Security Scan — vasthavik

**Date:** 2026-04-09 | **Branch:** main | **Verdict:** ⚠️ High Risk — Review before committing

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 0 |
| 🟠 High | 2 |
| 🟡 Medium | 15 |
| 🟢 Low | 6 |
| **Total** | **23** |

**Risk Score: 59/100 (High Risk)**

**Tools:** gitleaks ✅ | semgrep ✅ | checkov ✅ | hadolint ✅ | grype ⏭️ skipped

---

## 🆕 New Issues (from uncommitted changes)

### 🟠 High

| # | Rule | File | Remediation |
|---|------|------|-------------|
| 1 | CKV_DOCKER_2 — No HEALTHCHECK in Dockerfile | `backend/dockerfile` | Add `HEALTHCHECK CMD curl -f http://localhost:5001/health \|\| exit 1` |
| 2 | CKV_DOCKER_2 — No HEALTHCHECK in Dockerfile | `frontend/dockerfile` | Add `HEALTHCHECK CMD curl -f http://localhost:3000/ \|\| exit 1` |

### 🟡 Medium

| # | Rule | File | Remediation |
|---|------|------|-------------|
| 1 | CKV_DOCKER_3 — No USER created in Dockerfile | `backend/dockerfile` | Add `RUN useradd -m appuser && USER appuser` |
| 2 | CKV_DOCKER_3 — No USER created in Dockerfile | `frontend/dockerfile` | Add `RUN useradd -m appuser && USER appuser` |
| 3 | CKV_K8S_14 — Image tag is `latest` | `k8s/base/backend/deployment.yaml` | Pin image tag to SHA digest via kustomization |
| 4 | CKV_K8S_14 — Image tag is `latest` | `k8s/base/frontend/deployment.yaml` | Pin image tag to SHA digest via kustomization |
| 5 | CKV_K8S_35 — Secrets exposed as env vars | `k8s/base/backend/deployment.yaml` | Mount secrets as files via `volumeMounts` instead |
| 6 | CKV_K8S_22 — Writable root filesystem | `k8s/base/backend/deployment.yaml` | Set `readOnlyRootFilesystem: true` |
| 7 | CKV_K8S_22 — Writable root filesystem | `k8s/base/frontend/deployment.yaml` | Set `readOnlyRootFilesystem: true` |
| 8 | CKV_K8S_31 — No seccomp profile | `k8s/base/backend/deployment.yaml` | Add `seccompProfile: {type: RuntimeDefault}` |
| 9 | CKV_K8S_31 — No seccomp profile | `k8s/base/frontend/deployment.yaml` | Add `seccompProfile: {type: RuntimeDefault}` |
| 10 | CKV_K8S_40 — Low UID (1000) for container | `k8s/base/backend/deployment.yaml` | Use `runAsUser: 10000` or higher |
| 11 | CKV_K8S_40 — Low UID (1000) for container | `k8s/base/frontend/deployment.yaml` | Use `runAsUser: 10000` or higher |
| 12 | CKV_K8S_38 — Service account token mounted | `k8s/base/backend/deployment.yaml` | Add `automountServiceAccountToken: false` |
| 13 | CKV_K8S_38 — Service account token mounted | `k8s/base/frontend/deployment.yaml` | Add `automountServiceAccountToken: false` |
| 14 | CKV_K8S_43 — Image not pinned to digest | `k8s/base/backend/deployment.yaml` | Use image digest instead of tag |
| 15 | CKV_K8S_43 — Image not pinned to digest | `k8s/base/frontend/deployment.yaml` | Use image digest instead of tag |

### 🟢 Low

| # | Rule | File | Remediation |
|---|------|------|-------------|
| 1 | CKV_K8S_21 — Default namespace used | `k8s/base/backend/deployment.yaml` | Use dedicated namespace `vasthavik-dev` |
| 2 | CKV_K8S_21 — Default namespace used | `k8s/base/backend/service.yaml` | Use dedicated namespace `vasthavik-dev` |
| 3 | CKV_K8S_21 — Default namespace used | `k8s/base/frontend/deployment.yaml` | Use dedicated namespace `vasthavik-dev` |
| 4 | CKV_K8S_21 — Default namespace used | `k8s/base/frontend/service.yaml` | Use dedicated namespace `vasthavik-dev` |
| 5 | semgrep — Flask app running on 0.0.0.0 | `backend/app.py:337` | Expected in container context; acceptable |
| 6 | gitleaks — SECRET_KEY in `.env` | `.env:3` | File is gitignored; rotate key if repo ever exposed |

---

## ✅ No Critical findings. Recommend fixing High/Medium before production deploy.
