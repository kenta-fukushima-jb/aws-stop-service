# EC2停止
## Lambda
- ランタイム：Nodejs 10.x
- ファイル名：index.js
- 環境変数
    - REGION : XXXXXX(リージョン)
    - STOP_INSTANCES_NAME : XXXXXX(インスタンス名)、XXXXXX(インスタンス名)....
## CloudWatch
- cron式：00 14 * * ? *　（毎日23時（日本時間））
## IAM ポリシー
```
{
    "Version": "2012-10-17",
    "Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "ec2:StartInstances",
            "ec2:StopInstances",
            "ec2:DescribeInstances"
        ],
        "Resource": "*"
    }
    ]
}
```
# RDS停止
