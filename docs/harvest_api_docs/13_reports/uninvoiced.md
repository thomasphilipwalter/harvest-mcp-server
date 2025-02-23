Uninvoiced Report

The Uninvoiced Report highlights the uninvoiced hours and expenses for all billable projects in a given timeframe.

The result object⚭

Attribute	Type	Description
client_id	integer	The ID of the client associated with the reported hours and expenses.
client_name	string	The name of the client associated with the reported hours and expenses.
project_id	integer	The ID of the project associated with the reported hours and expenses.
project_name	string	The name of the project associated with the reported hours and expenses.
currency	string	The currency code associated with the tracked hours for this result.
total_hours	decimal	The total hours for the given timeframe and project. If Time Rounding is turned on, the hours will be rounded according to your settings.
uninvoiced_hours	decimal	The total hours for the given timeframe and project that have not been invoiced. If Time Rounding is turned on, the hours will be rounded according to your settings.
uninvoiced_expenses	decimal	The total amount for billable expenses for the timeframe and project that have not been invoiced.
uninvoiced_amount	decimal	The total amount (time and expenses) for the timeframe and project that have not been invoiced.
Required permissions⚭

Administrators can see all projects in the Uninvoiced Report. Managers with permission to create invoices can only see projects they manage.

Uninvoiced Report⚭

The response contains an object with a results property that contains an array of up to per_page results. Each entry in the array is a separate result object. If no more results are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your results.

Note: Each request requires both the from and to parameters to be supplied in the URL’s query string. The timeframe supplied cannot exceed 1 year (365 days).

GET /v2/reports/uninvoiced
Parameter	Type	Required	Description
from	date	required	Only report on time entries and expenses with a spent_date on or after the given date.
to	date	required	Only report on time entries and expenses with a spent_date on or before the given date.
include_fixed_fee	boolean	optional	Whether or not to include fixed-fee projects in the response. (Default: true)
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/uninvoiced?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "client_id": 5735776,
      "client_name": "123 Industries",
      "project_id": 14308069,
      "project_name": "Online Store - Phase 1",
      "currency": "EUR",
      "total_hours": 4,
      "uninvoiced_hours": 0,
      "uninvoiced_expenses": 100,
      "uninvoiced_amount": 100
    },
    {
      "client_id": 5735776,
      "client_name": "123 Industries",
      "project_id": 14808188,
      "project_name": "Task Force",
      "currency": "EUR",
      "total_hours": 0.5,
      "uninvoiced_hours": 0.5,
      "uninvoiced_expenses": 0,
      "uninvoiced_amount": 50
    },
    {
      "client_id": 5735774,
      "client_name": "ABC Corp",
      "project_id": 14307913,
      "project_name": "Marketing Website",
      "currency": "USD",
      "total_hours": 2,
      "uninvoiced_hours": 0,
      "uninvoiced_expenses": 0,
      "uninvoiced_amount": 0
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 3,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/uninvoiced?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/uninvoiced?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
