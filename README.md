# api-shortener
URL shortener like goo.gl, https://www.shorturl.at/ or https://bitly.com/ for publishing promotions over Twitter

# Architectural decisions

| Component  | Product/Software | Alternatives | Decicision|
| ------------- | ------------- | ------------- | ------------- |
| Cloud provider  | AWS  | CGP, IBM Cloud, Azure, Heroku| Plenty of services. Several pricing plans. Large amount of documentation. Large technical community |

## Cloud provider

### Selected: AWS

Pros:
- Plenty of services
- Several Pricing plans availables
- Large amount of documentation and training resources
- Large developers/architects community

Cons:
- Vendor lock-in: Despite having the serverless function services available in other cloud providers, It requires custom configuration tied to AWS services in case of migrating to other cloud provider
- 

| Content Cell  | Content Cell  |

### Well-Architected Framework

- Operational Excellence
- Security
- Reliability
- Performance Efficiency
- Cost Optimization
- Sustainability

https://aws.amazon.com/architecture/well-architected/
https://www.wellarchitectedlabs.com/

## Runtime

The runtime selected is AWS Lambda

Pros:
- Lambda charges is based on usage. In this case, the services will run for mili-seconds.
- Serverless: no need to maintain the infra
- Auto-scalable
- Easy to integrate to other services owned by AWS, such as API Gateway, Application Load Balancer
- Fast way to deploy our app/service

Cons:
- Cost: The bill might grow during peak times and become expensive if cache is not implemented
- Cold start latency


### Alternatives

| Contain  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |


# Reference Architectures

- https://aws.amazon.com/blogs/compute/build-a-serverless-private-url-shortener/
- 

## Programming Language

Node.js (Javascript) was selected 

## Storage

The storage selected is the NoSQL database DynamoDB due to simple key/value data modeling requirement.

Pros:
- SLA 99,999%
- Simple
- Fast
- Cost effective
- Amazon DynamoDB Accelerator (DAX) if more cache required
- Serverless

Cons:
- Vendor lock-in
- 

## Services

### CDN

Pros:
- Offers SLA > 99.9%
- Cache
- TTL - Time To Live
- Globally distribuited locations
- 

Cons:
- Manual delete of cached URLs shortener
- 

### API Gateway

Pros:
- Distribute traffic across several locations
- Scale horizontally
- Cache responses
- API Version control
- Reduce DoS attacts

Cons:
- Increase complexity
- Single point of failure
- Vendor lock-in
- 

## Executing locally

### Software requirements

- Visual Studio Code
- Git --> https://git-scm.com/book/en/v2/Getting-Started-The-Command-Line
- Node.js >= v18.x --> https://nodejs.org/en/download/package-manager
- Docker compose / podman compose --> https://podman-desktop.io/
- AWS Cli --> https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- AWS sam clie --> https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
- 

### Installation
- aws configure
- https://github.com/sebaeze/url-shortener.git
- cd backend
- npm i claudia -g
- npm install
- npm start
-