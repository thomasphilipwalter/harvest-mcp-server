Expense Reports

Expense reports show expense totals for each client, project, expense category, or user, where expenses are present for a given timeframe.

The response contains an object with a results property that contains an array of up to per_page results. Each entry in the array is a separate result object. If no more results are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your results.

Note: Each expense report request requires both the from and to parameters to be supplied in the URL’s query string. The timeframe supplied cannot exceed 1 year (365 days).

The result object⚭

Attribute	Type	Description
client_id	integer	The ID of the client associated with the reported expenses. Only returned in the Client and Project reports.
client_name	string	The name of the client associated with the reported expenses. Only returned in the Client and Project reports.
project_id	integer	The ID of the project associated with the reported expenses. Only returned in the Client and Project reports.
project_name	string	The name of the project associated with the reported expenses. Only returned in the Client and Project reports.
expense_category_id	integer	The ID of the expense category associated with the reported expenses. Only returned in the Expense Category report.
expense_category_name	string	The name of the expense category associated with the reported expenses. Only returned in the Expense Category report.
user_id	integer	The ID of the user associated with the reported expenses. Only returned in the Team report.
user_name	string	The name of the user associated with the reported expenses. Only returned in the Team report.
is_contractor	boolean	The contractor status of the user associated with the reported expenses. Only returned in the Team report.
total_amount	decimal	The totaled cost for all expenses for the given timeframe, subject (client, project, expense category, or user), and currency.
billable_amount	decimal	The totaled cost for billable expenses for the given timeframe, subject (client, project, expense category, or user), and currency.
currency	string	The currency code associated with the expenses for this result.
Required permissions⚭

If you’re an Administrator, you’ll see all clients, projects, expense categories, and users for the account. Managers will see their own expenses, plus those for any projects or teammates they manage. Members will only see their own expenses.

Clients Report⚭

GET /v2/reports/expenses/clients
Parameter	Type	Required	Description
from	date	required	Only report on expenses with a spent_date on or after the given date.
to	date	required	Only report on expenses with a spent_date on or before the given date.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/expenses/clients?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "client_id": 5735776,
      "client_name": "123 Industries",
      "total_amount": 100,
      "billable_amount": 100,
      "currency": "EUR"
    },
    {
      "client_id": 5735774,
      "client_name": "ABC Corp",
      "total_amount": 133.35,
      "billable_amount": 133.35,
      "currency": "USD"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/expenses/clients?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/expenses/clients?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
Projects Report⚭

GET /v2/reports/expenses/projects
Parameter	Type	Required	Description
from	date	required	Only report on expenses with a spent_date on or after the given date.
to	date	required	Only report on expenses with a spent_date on or before the given date.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "client_id": 5735774,
      "client_name": "ABC Corp",
      "project_id": 14307913,
      "project_name": "[MW] Marketing Website",
      "total_amount": 133.35,
      "billable_amount": 133.35,
      "currency": "USD"
    },
    {
      "client_id": 5735776,
      "client_name": "123 Industries",
      "project_id": 14308069,
      "project_name": "[OS1] Online Store - Phase 1",
      "total_amount": 100,
      "billable_amount": 100,
      "currency": "EUR"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
Expense Categories Report⚭

GET /v2/reports/expenses/categories
Parameter	Type	Required	Description
from	date	required	Only report on expenses with a spent_date on or after the given date.
to	date	required	Only report on expenses with a spent_date on or before the given date.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "expense_category_id": 4197501,
      "expense_category_name": "Lodging",
      "total_amount": 100,
      "billable_amount": 100,
      "currency": "EUR"
    },
    {
      "expense_category_id": 4195926,
      "expense_category_name": "Meals",
      "total_amount": 100,
      "billable_amount": 100,
      "currency": "EUR"
    },
    {
      "expense_category_id": 4195926,
      "expense_category_name": "Meals",
      "total_amount": 33.35,
      "billable_amount": 33.35,
      "currency": "USD"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 3,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
Team Report⚭

GET /v2/reports/expenses/team
Parameter	Type	Required	Description
from	date	required	Only report on expenses with a spent_date on or after the given date.
to	date	required	Only report on expenses with a spent_date on or before the given date.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/expenses/team?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "user_id": 1782884,
      "user_name": "Bob Powell",
      "is_contractor": false,
      "total_amount": 100,
      "billable_amount": 100,
      "currency": "USD"
    },
    {
      "user_id": 1782959,
      "user_name": "Kim Allen",
      "is_contractor": false,
      "total_amount": 100,
      "billable_amount": 100,
      "currency": "EUR"
    },
    {
      "user_id": 1782959,
      "user_name": "Kim Allen",
      "is_contractor": false,
      "total_amount": 33.35,
      "billable_amount": 33.35,
      "currency": "USD"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 3,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/expenses/team?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/expenses/team?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
