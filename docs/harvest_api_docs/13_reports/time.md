Time Reports

Time reports show the hours and billable information for each client, project, task, or user, where tracked time is present for a given timeframe.

The response contains an object with a results property that contains an array of up to per_page results. Each entry in the array is a separate result object. If no more results are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your results.

Note: Each time report request requires both the from and to parameters to be supplied in the URL’s query string. The timeframe supplied cannot exceed 1 year (365 days).

The result object⚭

Attribute	Type	Description
client_id	integer	The ID of the client associated with the reported hours. Only returned in the Client and Project reports.
client_name	string	The name of the client associated with the reported hours. Only returned in the Client and Project reports.
project_id	integer	The ID of the project associated with the reported hours. Only returned in the Client and Project reports.
project_name	string	The name of the project associated with the reported hours. Only returned in the Client and Project reports.
task_id	integer	The ID of the task associated with the reported hours. Only returned in the Task report.
task_name	string	The name of the task associated with the reported hours. Only returned in the Task report.
user_id	integer	The ID of the user associated with the reported hours. Only returned in the Team report.
user_name	string	The name of the user associated with the reported hours. Only returned in the Team report.
weekly_capacity	integer	The number of hours per week this person is available to work in seconds, in half hour increments. For example, if a person’s capacity is 35 hours, the API will return 126000 seconds. Only returned in the Team report.
avatar_url	string	The URL to the user’s avatar image. Only returned in the Team report.
is_contractor	boolean	The contractor status of the user associated with the reported hours. Only returned in the Team report.
total_hours	decimal	The totaled hours for the given timeframe, subject (client, project, task, or user), and currency. If Time Rounding is turned on, the hours will be rounded according to your settings.
billable_hours	decimal	The totaled billable hours for the given timeframe, subject (client, project, task, or user), and currency. If Time Rounding is turned on, the hours will be rounded according to your settings.
currency	string	The currency code associated with the tracked hours for this result. Only visible to Administrators and Project Managers with the View billable rates and amounts permission.
billable_amount	decimal	The totaled billable amount for the billable hours above. Only visible to Administrators and Project Managers with the View billable rates and amounts permission.
Required permissions⚭

If you’re an Administrator, you’ll see all clients, projects, tasks, and users for the account. Managers will see their own tracked time, plus time tracked against any projects or teammates they manage. Members will only see their own tracked time.

Clients Report⚭

GET /v2/reports/time/clients
Parameter	Type	Required	Description
from	date	required	Only report on time entries with a spent_date on or after the given date.
to	date	required	Only report on time entries with a spent_date on or before the given date.
include_fixed_fee	string	optional	When true, billable amounts will be calculated and included for fixed fee projects.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/time/clients?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "client_id": 5735776,
      "client_name": "123 Industries",
      "total_hours": 4.5,
      "billable_hours": 3.5,
      "currency": "EUR",
      "billable_amount": 350
    },
    {
      "client_id": 5735774,
      "client_name": "ABC Corp",
      "total_hours": 2,
      "billable_hours": 2,
      "currency": "USD",
      "billable_amount": 200
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/time/clients?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/time/clients?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
Projects Report⚭

GET /v2/reports/time/projects
Parameter	Type	Required	Description
from	date	required	Only report on time entries with a spent_date on or after the given date.
to	date	required	Only report on time entries with a spent_date on or before the given date.
include_fixed_fee	string	optional	When true, billable amounts will be calculated and included for fixed fee projects.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/time/projects?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "project_id": 14307913,
      "project_name": "[MW] Marketing Website",
      "client_id": 5735774,
      "client_name": "ABC Corp",
      "total_hours": 2,
      "billable_hours": 2,
      "currency": "USD",
      "billable_amount": 200
    },
    {
      "project_id": 14308069,
      "project_name": "[OS1] Online Store - Phase 1",
      "client_id": 5735776,
      "client_name": "123 Industries",
      "total_hours": 4,
      "billable_hours": 3,
      "currency": "EUR",
      "billable_amount": 300
    },
    {
      "project_id": 14808188,
      "project_name": "[TF] Task Force",
      "client_id": 5735776,
      "client_name": "123 Industries",
      "total_hours": 0.5,
      "billable_hours": 0.5,
      "currency": "EUR",
      "billable_amount": 50
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 3,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/time/projects?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/time/projects?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
Tasks Report⚭

GET /v2/reports/time/tasks
Parameter	Type	Required	Description
from	date	required	Only report on time entries with a spent_date on or after the given date.
to	date	required	Only report on time entries with a spent_date on or before the given date.
include_fixed_fee	string	optional	When true, billable amounts will be calculated and included for fixed fee projects.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/time/tasks?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "task_id": 8083365,
      "task_name": "Graphic Design",
      "total_hours": 2,
      "billable_hours": 2,
      "currency": "USD",
      "billable_amount": 200
    },
    {
      "task_id": 8083366,
      "task_name": "Programming",
      "total_hours": 1.5,
      "billable_hours": 1.5,
      "currency": "EUR",
      "billable_amount": 150
    },
    {
      "task_id": 8083368,
      "task_name": "Project Management",
      "total_hours": 1.5,
      "billable_hours": 1.5,
      "currency": "EUR",
      "billable_amount": 150
    },
    {
      "task_id": 8083368,
      "task_name": "Project Management",
      "total_hours": 0.5,
      "billable_hours": 0.5,
      "currency": "USD",
      "billable_amount": 50
    },
    {
      "task_id": 8083369,
      "task_name": "Research",
      "total_hours": 1,
      "billable_hours": 0,
      "currency": "EUR",
      "billable_amount": 0
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 5,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/time/tasks?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/time/tasks?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
Team Report⚭

GET /v2/reports/time/team
Parameter	Type	Required	Description
from	date	required	Only report on time entries with a spent_date on or after the given date.
to	date	required	Only report on time entries with a spent_date on or before the given date.
include_fixed_fee	string	optional	When true, billable amounts will be calculated and included for fixed fee projects.
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl
"https://api.harvestapp.com/v2/reports/time/team?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "user_id": 1795925,
      "user_name": "Jane Smith",
      "is_contractor": false,
      "total_hours": 0.5,
      "billable_hours": 0.5,
      "currency": "EUR",
      "billable_amount": 50,
      "weekly_capacity": 126000,
      "avatar_url":"https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481"
    },
    {
      "user_id": 1782959,
      "user_name": "Kim Allen",
      "is_contractor": false,
      "total_hours": 4,
      "billable_hours": 3,
      "currency": "EUR",
      "billable_amount": 300,
      "weekly_capacity": 126000,
      "avatar_url":"https://cache.harvestapp.com/assets/profile_images/cornell_clock_tower.png?1498515345"
    },
    {
      "user_id": 1782959,
      "user_name": "Kim Allen",
      "is_contractor": false,
      "total_hours": 2,
      "billable_hours": 2,
      "currency": "USD",
      "billable_amount": 200,
      "weekly_capacity": 126000,
      "avatar_url":"https://cache.harvestapp.com/assets/profile_images/allen_bradley_clock_tower.png?1498509661"
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 3,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/time/team?from=20170101&page=1&per_page=2000&to=20171231",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/time/team?from=20170101&page=1&per_page=2000&to=20171231"
  }
}
