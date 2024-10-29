#
#
#
#claudia create --region us-east-1 --name url-shortener --handler  main.handler --role arn:aws:iam::487527001877:role/url-shortener-executor --runtime nodejs16.x
#
claudia create --region us-east-1 --name url-shortener --api-module main --role arn:aws:iam::487527001877:role/url-shortener-executor --runtime nodejs16.x
#