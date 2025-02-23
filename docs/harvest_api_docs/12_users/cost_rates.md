User Cost Rates

The cost rate object⚭

Attribute	Type	Description
id	integer	Unique ID for the cost rate.
amount	decimal	The amount of the cost rate.
start_date	date	The date the cost rate is effective.
end_date	date	The date the cost rate is no longer effective. This date is calculated by Harvest.
created_at	datetime	Date and time the cost rate was created.
updated_at	datetime	Date and time the cost rate was last updated.
Required permissions⚭

You must be an Administrator in order to interact with the /v2/users/{USER_ID}/cost_rates endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List all cost rates for a specific user⚭

Returns a list of cost rates for the user identified by USER_ID. The cost rates are returned sorted by start_date, with the oldest starting cost rates appearing first.

The response contains an object with a cost_rates property that contains an array of up to per_page cost rates. Each entry in the array is a separate cost rate object. If no more cost rates are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your cost rates.

GET /v2/users/{USER_ID}/cost_rates
Parameter	Type	Description
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125/cost_rates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
  "cost_rates": [
    {
      "id": 825301,
      "amount": 9.25,
      "start_date": "2019-01-01",
      "end_date": "2019-05-31",
      "created_at": "2020-05-01T13:19:09Z",
      "updated_at": "2020-05-01T13:19:17Z"
    },
    {
      "id": 825302,
      "amount": 11.0,
      "start_date": "2019-06-01",
      "end_date": "2019-12-31",
      "created_at": "2020-05-01T13:19:17Z",
      "updated_at": "2020-05-01T13:19:24Z"
    },
    {
      "id": 825303,
      "amount": 12.5,
      "start_date": "2020-01-01",
      "end_date": "2020-04-30",
      "created_at": "2020-05-01T13:19:24Z",
      "updated_at": "2020-05-01T13:19:31Z"
    },
    {
      "id": 825304,
      "amount": 15.25,
      "start_date": "2020-05-01",
      "end_date": null,
      "created_at": "2020-05-01T13:19:31Z",
      "updated_at": "2020-05-01T13:19:31Z"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 4,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/users/3226125/cost_rates?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/users/3226125/cost_rates?page=1&per_page=2000"
  }
}
Retrieve a cost rate⚭

Retrieves the cost rate with the given ID. Returns a cost rate object and a 200 OK response code if a valid identifier was provided.

GET /v2/users/{USER_ID}/cost_rates/{COST_RATE_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125/cost_rates/125068554" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
  "id": 825301,
  "amount": 9.25,
  "start_date": "2019-01-01",
  "end_date": "2019-05-31",
  "created_at": "2020-05-01T13:19:09Z",
  "updated_at": "2020-05-01T13:19:17Z"
}
Create a cost rate⚭

Creates a new cost rate object. Returns a cost rate object and a 201 Created response code if the call succeeded.

Creating a cost rate with no start_date will replace a user’s existing rate(s).
Creating a cost rate with a start_date that is before a user’s existing rate(s) will replace those cost rates with the new one.
POST /v2/users/{USER_ID}/cost_rates
Parameter	Type	Required	Description
amount	decimal	required	The amount of the cost rate.
start_date	date	optional	The date the cost rate is effective. Cannot be a date in the future.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125/cost_rates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount":13.0,"start_date":"2020-04-05"}'


Copy to Clipboard
Example response:⚭

{
  "id": 825305,
  "amount": 13.0,
  "start_date": "2020-04-05",
  "end_date": null,
  "created_at": "2020-05-01T13:23:27Z",
  "updated_at": "2020-05-01T13:23:27Z"
}
