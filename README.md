# github latest release notify

Github repository latest release 알림

개인의 경우 Github의 Watch 기능을 이용하면 알림을 받을 수 있지만, 

해당기능은 개인만 받는것이 아닌 다수가 메일 또는 슬랙으로 받을 수 있으며,

알림 받기를 원하는 저장소들을 통합해서 관리할 수 있음.

# Features
> 현재 브랜치에는 매일 09시에 실행되도록 설정

매일 하루전의 데이터를 비교하며 09시에 메일 및 슬랙으로 전송하므로

매일마다 동작해야 주말의 데이터도 비교할 수 있음.

전송시간은 github actions로 수정 가능

# How to use
- 개발할 경우 root 경로에 _env 파일을 .env로 수정 후 아래 환경변수 세팅
- Github Actions로 사용시 repository secrets 및 env 설정
- k8s CronJob 일 경우 DockerBuild 하여 yaml 생성 후 사용 

| Option | Description | Required |
|:-|:-|:-|
| GIT_URL | 알림받을 GIT_URL | https://github.com/~~~/release |
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


# k8s CronJob
Using container build
```
docker build -t git-release-notify:latest .
```

CronJob yaml
```
apiVersion: batch/v1
kind: CronJob
metadata:
  name: git-release-notify
spec:
  schedule: "0 9 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: git-release-notify
            image: git-release-notify:latest
            imagePullPolicy: IfNotPresent
            env:
            - name: GIT_URL
              value: ""
            - name: MAIL_ENABLED
              value: ""
            - name: SMTP_SERVER
              value: ""
            - name: SMTP_PORT
              value: ""
            - name: SMTP_TLS
              value: ""
            - name: SMTP_USER
              value: ""
            - name: SMTP_PASSWORD
              value: ""
            - name: RECEIVER
              value: ""
            - name: SLACK_ENABLED
              value: ""
            - name: SLACK_WEBHOOK_URL
              value: ""
          restartPolicy: OnFailure
```
