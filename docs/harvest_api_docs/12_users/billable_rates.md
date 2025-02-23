User Billable Rates

The billable rate object⚭

Attribute	Type	Description
id	integer	Unique ID for the billable rate.
amount	decimal	The amount of the billable rate.
start_date	date	The date the billable rate is effective.
end_date	date	The date the billable rate is no longer effective. This date is calculated by Harvest.
created_at	datetime	Date and time the billable rate was created.
updated_at	datetime	Date and time the billable rate was last updated.
Required permissions⚭

You must be an Administrator or Manager with permission to edit billable rates in order to interact with the /v2/users/{USER_ID}/billable_rates endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List all billable rates for a specific user⚭

Returns a list of billable rates for the user identified by USER_ID. The billable rates are returned sorted by start_date, with the oldest starting billable rates appearing first.

The response contains an object with a billable_rates property that contains an array of up to per_page billable rates. Each entry in the array is a separate billable rate object. If no more billable rates are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your billable rates.

GET /v2/users/{USER_ID}/billable_rates
Parameter	Type	Description
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125/billable_rates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
  "billable_rates": [
    {
      "id": 1836493,
      "amount": 8.25,
      "start_date": "2019-01-01",
      "end_date": "2019-05-31",
      "created_at": "2020-05-01T13:17:42Z",
      "updated_at": "2020-05-01T13:17:50Z"
    },
    {
      "id": 1836494,
      "amount": 9.5,
      "start_date": "2019-06-01",
      "end_date": "2019-12-31",
      "created_at": "2020-05-01T13:17:50Z",
      "updated_at": "2020-05-01T13:18:02Z"
    },
    {
      "id": 1836495,
      "amount": 9.5,
      "start_date": "2020-01-01",
      "end_date": "2020-04-30",
      "created_at": "2020-05-01T13:18:02Z",
      "updated_at": "2020-05-01T13:18:10Z"
    },
    {
      "id": 1836496,
      "amount": 15.0,
      "start_date": "2020-05-01",
      "end_date": null,
      "created_at": "2020-05-01T13:18:10Z",
      "updated_at": "2020-05-01T13:18:10Z"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 4,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/users/3226125/billable_rates?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/users/3226125/billable_rates?page=1&per_page=2000"
  }
}
Retrieve a billable rate⚭

Retrieves the billable rate with the given ID. Returns a billable rate object and a 200 OK response code if a valid identifier was provided.

GET /v2/users/{USER_ID}/billable_rates/{billable_RATE_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125/billable_rates/1836493" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
  "id": 1836493,
  "amount": 8.25,
  "start_date": "2019-01-01",
  "end_date": "2019-05-31",
  "created_at": "2020-05-01T13:17:42Z",
  "updated_at": "2020-05-01T13:17:50Z"
}
Create a billable rate⚭

Creates a new billable rate object. Returns a billable rate object and a 201 Created response code if the call succeeded.

Creating a billable rate with no start_date will replace a user’s existing rate(s).
Creating a billable rate with a start_date that is before a user’s existing rate(s) will replace those billable rates with the new one.
POST /v2/users/{USER_ID}/billable_rates
Parameter	Type	Required	Description
amount	decimal	required	The amount of the billable rate.
start_date	date	optional	The date the billable rate is effective. Cannot be a date in the future.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125/billable_rates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount":5.0,"start_date":"2020-05-05"}'


Copy to Clipboard
Example response:⚭

{
  "id": 1836555,
  "amount": 5.0,
  "start_date": 2020-05-01,
  "end_date": null,
  "created_at": "2020-05-01T15:04:20Z",
  "updated_at": "2020-05-01T15:04:20Z"
}
