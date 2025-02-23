# Overview

The Harvest V2 API is a REST API that allows you to interact with your Harvest account programmatically. You can track time, log expenses, create projects, and more.

## API Requests

Harvest requires applications to authenticate all requests with OAuth2 or Personal Access Tokens. The following HTTP methods are supported:

- GET
- POST
- PATCH
- DELETE

### Request Headers Required

- Authorization: Bearer $ACCESS_TOKEN
- Harvest-Account-Id: $ACCOUNT_ID
- User-Agent: MyApp (<email@example.com>)

### Parameters

- GET requests: Include in URL query string
- POST/PATCH requests: Include in request body (JSON or form data)
- For JSON, use Content-Type: application/json header

## API Responses

Responses are formatted in JSON. HTTP status codes indicate success or failure:

- 200: Success
- 201: New object created
- 403: Unauthorized
- 404: Not found
- 422: Processing errors
- 429: Request throttled
- 500: Server error

## Rate Limiting

- General API requests: 100 requests per 15 seconds
- Reports API requests: 100 requests per 15 minutes
- HTTP 429 status sent when limit exceeded
- Retry-After header indicates seconds until throttle lifted

## Data Types

- boolean: true/false
- string: "foo"
- integer: 42
- decimal: 6.8
- date: "2017-12-31"
- datetime: "2017-12-31T14:59:22Z"
- time: "14:59" or "2:59pm"
- array: [1, 2, 3]
- object: { name: "value" }
