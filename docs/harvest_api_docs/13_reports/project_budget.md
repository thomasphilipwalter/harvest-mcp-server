Project Budget Report

The Project Budget Report highlights budget information for projects that have been assigned a budget.

Who can see what in the Project Budget Report?

Administrators can see all projects in the Project Budget Report.
Project Managers can see projects they manage and assigned projects they do not manage that have been set to Show project report to everyone on the project.
Regular Users can only see assigned projects that have been set to Show project report to everyone on the project.
The result object⚭

Attribute	Type	Description
client_id	integer	The ID of the client associated with this project.
client_name	string	The name of the client associated with this project.
project_id	integer	The ID of the project.
project_name	string	The name of the project.
budget_is_monthly	boolean	Whether the budget is reset every month.
budget_by	string	The method by which the project is budgeted. Options: project (Hours Per Project), project_cost (Total Project Fees), task (Hours Per Task), task_fees (Fees Per Task), person (Hours Per Person), none (No Budget).
is_active	boolean	Whether the project is active or archived.
budget	decimal	The budget in hours or money for the project when budgeting by time. If the project is budgeted by money, this value will only be visible to Administrators and Project Managers with the View billable rates and amounts permission.
budget_spent	decimal	The total hours or money spent against the project’s budget. If Time Rounding is turned on, the hours will be rounded according to your settings. If the project is budgeted by money, this value will only be visible to Administrators and Project Managers with the View billable rates and amounts permission.
budget_remaining	decimal	The total hours or money remaining in the project’s budget. If Time Rounding is turned on, the hours will be rounded according to your settings. If the project is budgeted by money, this value will only be visible to Administrators and Project Managers with the View billable rates and amounts permission.
Project Budget Report⚭

The response contains an object with a results property that contains an array of up to per_page results. Each entry in the array is a separate result object. If no more results are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your results.

GET /v2/reports/project_budget
Parameter	Type	Required	Description
page	integer	optional	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	optional	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
is_active	boolean	optional	Pass true to only return active projects and false to return inactive projects.
Example Request:

curl
"https://api.harvestapp.com/v2/reports/project_budget" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "results": [
    {
      "project_id": 14308069,
      "project_name": "Online Store - Phase 1",
      "client_id": 5735776,
      "client_name": "123 Industries",
      "budget_is_monthly": false,
      "budget_by": "project",
      "is_active": true,
      "budget": 200,
      "budget_spent": 4,
      "budget_remaining": 196
    },
    {
      "project_id": 14307913,
      "project_name": "Marketing Website",
      "client_id": 5735774,
      "client_name": "ABC Corp",
      "budget_is_monthly": false,
      "budget_by": "project",
      "is_active": true,
      "budget": 50,
      "budget_spent": 2,
      "budget_remaining": 48
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/reports/project_budget?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/reports/project_budget?page=1&per_page=2000"
  }
}
