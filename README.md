# api-shortener
URL shortener like goo.gl, https://www.shorturl.at/ or https://bitly.com/ for publishing promotions over Twitter

# Architectural decisions

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

### Alternatives

| CGP  | Azure | IBM Cloud | Heroku | 
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

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