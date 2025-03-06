# github latest release notify

Github repository latest release 알림

# Features
> 현재 브랜치에는 매일 09시에 실행되도록 설정

매일 09시에 메일 및 슬랙으로 전송

전송시간은 github actions로 수정 가능

# How to use
## Develop
> root 경로에 _env 파일을 .env로 수정 후 아래 환경변수 세팅

**GIT_URL은 반드시 release로 끝나는 url이여야 함. 여러Repo 입력시 아래와 같이 입력.**

GIT_URL="https://github.com/wonkwangyeon/git-release-notify/releases

https://github.com/wonkwangyeon/Run-Multiple-Program/releases"

SMTP_SERVER="smtp.test.com"

SMTP_PORT=123

SMTP_TLS=false

SMTP_USER="test@test.com"

SMTP_PASSWORD=""

RECEIVER="test@test.com"

## Production
> Github actions repository secrets 설정

**GIT_URL은 반드시 release로 끝나는 url이여야 함. 여러Repo 입력시 아래와 같이 입력.**

GIT_URL="https://github.com/wonkwangyeon/git-release-notify/releases

https://github.com/wonkwangyeon/Run-Multiple-Program/releases"

MAIL_ENABLED=true

SMTP_SERVER="smtp.test.com"

SMTP_PORT=123

SMTP_TLS=false

SMTP_USER="tes@test.com"

SMTP_PASSWORD=""

RECEIVER="test@test.com,testuser2@test.com"

SLACK_ENABLED=true

SLACK_WEBHOOK_URL=""