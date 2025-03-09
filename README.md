# github latest release notify

Github repository latest release 알림

# Features
> 현재 브랜치에는 매일 09시에 실행되도록 설정

매일 하루전의 데이터를 비교하며 09시에 메일 및 슬랙으로 전송하므로

매일마다 동작해야 주말의 데이터도 비교할 수 있음.

전송시간은 github actions로 수정 가능

# How to use
- 개발할 경우 root 경로에 _env 파일을 .env로 수정 후 아래 환경변수 세팅
- Github Actions로 사용시 repository secrets 설정
- CronJob 일 경우 DockerBuild 하여 사용

| Option | Description | Required |
|:-|:-|:-|
| MAIL_ENABLED | 메일 전송 활성화/비활성화 | true/false |
| SMTP_SERVER | SMTP 서버 | smtp.test.com |
| SMTP_PORT | STMP 포트 | 123 |
| SMTP_TLS | SMTP TLS 설정 | false |
| SMTP_USER | STMP 사용자 및 송신자 | test_user |
| SMTP_PASSWORD | SMTP 비밀번호 | 1234 |
| RECEIVER | 수신자 | test1@test.com |
| SLACK_ENABLED | 슬랙 전송 활성화/비활성화 | true/false |
| SLACK_WEBHOOK_URL | 슬랙 URL | test.com |
```
# GIT_URL은 반드시 release로 끝나는 url이여야 함. 여러Repo 입력시 아래와 같이 입력.
GIT_URL="https://github.com/wonkwangyeon/git-release-notify/releases
https://github.com/wonkwangyeon/Run-Multiple-Program/releases"
MAIL_ENABLED=true
SMTP_SERVER="smtp.test.com"
SMTP_PORT=123
SMTP_TLS=false
SMTP_USER="test@test.com"
SMTP_PASSWORD=""
# Receiver가 한명일 경우 test@test.com 하나만 입력. 여러명일 경우 ','로 구분해서 나열
RECEIVER="test@test.com,testuser2@test.com"
SLACK_ENABLED=false
SLACK_WEBHOOK_URL=""
```
