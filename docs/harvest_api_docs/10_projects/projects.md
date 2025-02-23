Projects

The project object⚭

Attribute	Type	Description
id	integer	Unique ID for the project.
client	object	An object containing the project’s client id, name, and currency.
name	string	Unique name for the project.
code	string	The code associated with the project.
is_active	boolean	Whether the project is active or archived.
is_billable	boolean	Whether the project is billable or not.
is_fixed_fee	boolean	Whether the project is a fixed-fee project or not.
bill_by	string	The method by which the project is invoiced.
hourly_rate	decimal	Rate for projects billed by Project Hourly Rate.
budget	decimal	The budget in hours for the project when budgeting by time.
budget_by	string	The method by which the project is budgeted.
budget_is_monthly	boolean	Option to have the budget reset every month.
notify_when_over_budget	boolean	Whether Project Managers should be notified when the project goes over budget.
over_budget_notification_percentage	decimal	Percentage value used to trigger over budget email alerts.
over_budget_notification_date	date	Date of last over budget notification. If none have been sent, this will be null.
show_budget_to_all	boolean	Option to show project budget to all employees. Does not apply to Total Project Fee projects.
cost_budget	decimal	The monetary budget for the project when budgeting by money.
cost_budget_include_expenses	boolean	Option for budget of Total Project Fees projects to include tracked expenses.
fee	decimal	The amount you plan to invoice for the project. Only used by fixed-fee projects.
notes	string	Project notes.
starts_on	date	Date the project was started.
ends_on	date	Date the project will end.
created_at	datetime	Date and time the project was created.
updated_at	datetime	Date and time the project was last updated.
Required permissions⚭

You must be an Administrator or Manager with managed projects in order to interact with the /v2/projects endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List all projects⚭

Returns a list of your projects. The projects are returned sorted by creation date, with the most recently created projects appearing first.

The response contains an object with a projects property that contains an array of up to per_page projects. Each entry in the array is a separate project object. If no more projects are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your projects.

GET /v2/projects
Parameter	Type	Description
is_active	boolean	Pass true to only return active projects and false to return inactive projects.
client_id	integer	Only return projects belonging to the client with the given ID.
updated_since	datetime	Only return projects that have been updated since the given date and time.
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example Request:

curl "https://api.harvestapp.com/v2/projects" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "projects":[
    {
      "id":14308069,
      "name":"Online Store - Phase 1",
      "code":"OS1",
      "is_active":true,
      "bill_by":"Project",
      "budget":200.0,
      "budget_by":"project",
      "budget_is_monthly":false,
      "notify_when_over_budget":true,
      "over_budget_notification_percentage":80.0,
      "over_budget_notification_date":null,
      "show_budget_to_all":false,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:54:06Z",
      "starts_on":"2017-06-01",
      "ends_on":null,
      "is_billable":true,
      "is_fixed_fee":false,
      "notes":"",
      "client":{
        "id":5735776,
        "name":"123 Industries",
        "currency":"EUR"
      },
      "cost_budget":null,
      "cost_budget_include_expenses":false,
      "hourly_rate":100.0,
      "fee":null
    },
    {
      "id":14307913,
      "name":"Marketing Website",
      "code":"MW",
      "is_active":true,
      "bill_by":"Project",
      "budget":50.0,
      "budget_by":"project",
      "budget_is_monthly":false,
      "notify_when_over_budget":true,
      "over_budget_notification_percentage":80.0,
      "over_budget_notification_date":null,
      "show_budget_to_all":false,
      "created_at":"2017-06-26T21:36:23Z",
      "updated_at":"2017-06-26T21:54:46Z",
      "starts_on":"2017-01-01",
      "ends_on":"2017-03-31",
      "is_billable":true,
      "is_fixed_fee":false,
      "notes":"",
      "client":{
        "id":5735774,
        "name":"ABC Corp",
        "currency":"USD"
      },
      "cost_budget":null,
      "cost_budget_include_expenses":false,
      "hourly_rate":100.0,
      "fee":null
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":2,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/projects?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/projects?page=1&per_page=2000"
  }
}
Retrieve a project⚭

Retrieves the project with the given ID. Returns a project object and a 200 OK response code if a valid identifier was provided.

GET /v2/projects/{PROJECT_ID}
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "id":14308069,
  "name":"Online Store - Phase 1",
  "code":"OS1",
  "is_active":true,
  "bill_by":"Project",
  "budget":200.0,
  "budget_by":"project",
  "budget_is_monthly":false,
  "notify_when_over_budget":true,
  "over_budget_notification_percentage":80.0,
  "over_budget_notification_date":null,
  "show_budget_to_all":false,
  "created_at":"2017-06-26T21:52:18Z",
  "updated_at":"2017-06-26T21:54:06Z",
  "starts_on":"2017-06-01",
  "ends_on":null,
  "is_billable":true,
  "is_fixed_fee":false,
  "notes":"",
  "client":{
    "id":5735776,
    "name":"123 Industries",
    "currency":"EUR"
  },
  "cost_budget":null,
  "cost_budget_include_expenses":false,
  "hourly_rate":100.0,
  "fee":null
}
Create a project⚭

Creates a new project object. Returns a project object and a 201 Created response code if the call succeeded.

POST /v2/projects
Parameter	Type	Required	Description
client_id	integer	required	The ID of the client to associate this project with.
name	string	required	The name of the project.
code	string	optional	The code associated with the project.
is_active	boolean	optional	Whether the project is active or archived. Defaults to true.
is_billable	boolean	required	Whether the project is billable or not.
is_fixed_fee	boolean	optional	Whether the project is a fixed-fee project or not.
bill_by	string	required	The method by which the project is invoiced. Options: Project, Tasks, People, or none.
hourly_rate	decimal	optional	Rate for projects billed by Project Hourly Rate.
budget	decimal	optional	The budget in hours for the project when budgeting by time.
budget_by	string	required	The method by which the project is budgeted. Options: project (Hours Per Project), project_cost (Total Project Fees), task (Hours Per Task), task_fees (Fees Per Task), person (Hours Per Person), none (No Budget).
budget_is_monthly	boolean	optional	Option to have the budget reset every month. Defaults to false.
notify_when_over_budget	boolean	optional	Whether Project Managers should be notified when the project goes over budget. Defaults to false.
over_budget_notification_percentage	decimal	optional	Percentage value used to trigger over budget email alerts. Example: use 10.0 for 10.0%.
show_budget_to_all	boolean	optional	Option to show project budget to all employees. Does not apply to Total Project Fee projects. Defaults to false.
cost_budget	decimal	optional	The monetary budget for the project when budgeting by money.
cost_budget_include_expenses	boolean	optional	Option for budget of Total Project Fees projects to include tracked expenses. Defaults to false.
fee	decimal	optional	The amount you plan to invoice for the project. Only used by fixed-fee projects.
notes	string	optional	Project notes.
starts_on	date	optional	Date the project was started.
ends_on	date	optional	Date the project will end.
Example Request:

curl "https://api.harvestapp.com/v2/projects" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735776,"name":"Your New Project","is_billable":true,"bill_by":"Project","hourly_rate":100.0,"budget_by":"project","budget":10000}'
Example Response:

{
  "id":14308112,
  "name":"Your New Project",
  "code":null,
  "is_active":true,
  "bill_by":"Project",
  "budget":10000.0,
  "budget_by":"project",
  "budget_is_monthly":false,
  "notify_when_over_budget":false,
  "over_budget_notification_percentage":80.0,
  "over_budget_notification_date":null,
  "show_budget_to_all":false,
  "created_at":"2017-06-26T21:56:52Z",
  "updated_at":"2017-06-26T21:56:52Z",
  "starts_on":null,
  "ends_on":null,
  "is_billable":true,
  "is_fixed_fee":false,
  "notes":"",
  "client":{
    "id":5735776,
    "name":"123 Industries",
    "currency":"EUR"
  },
  "cost_budget":null,
  "cost_budget_include_expenses":false,
  "hourly_rate":100.0,
  "fee":null
}
Update a project⚭

Updates the specific project by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a project object and a 200 OK response code if the call succeeded.

PATCH /v2/projects/{PROJECT_ID}
Parameter	Type	Description
client_id	integer	The ID of the client to associate this project with.
name	string	The name of the project.
code	string	The code associated with the project.
is_active	boolean	Whether the project is active or archived. Defaults to true.
is_billable	boolean	Whether the project is billable or not.
is_fixed_fee	boolean	Whether the project is a fixed-fee project or not.
bill_by	string	The method by which the project is invoiced. Options: Project, Tasks, People, or none.
hourly_rate	decimal	Rate for projects billed by Project Hourly Rate.
budget	decimal	The budget in hours for the project when budgeting by time.
budget_by	string	The method by which the project is budgeted. Options: project (Hours Per Project), project_cost (Total Project Fees), task (Hours Per Task), task_fees (Fees Per Task), person (Hours Per Person), none (No Budget).
budget_is_monthly	boolean	Option to have the budget reset every month. Defaults to false.
notify_when_over_budget	boolean	Whether Project Managers should be notified when the project goes over budget. Defaults to false.
over_budget_notification_percentage	decimal	Percentage value used to trigger over budget email alerts. Example: use 10.0 for 10.0%.
show_budget_to_all	boolean	Option to show project budget to all employees. Does not apply to Total Project Fee projects. Defaults to false.
cost_budget	decimal	The monetary budget for the project when budgeting by money.
cost_budget_include_expenses	boolean	Option for budget of Total Project Fees projects to include tracked expenses. Defaults to false.
fee	decimal	The amount you plan to invoice for the project. Only used by fixed-fee projects.
notes	string	Project notes.
starts_on	date	Date the project was started.
ends_on	date	Date the project will end.
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308112" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"name":"New project name"}'
Example Response:

{
  "id":14308112,
  "name":"New project name",
  "code":null,
  "is_active":true,
  "bill_by":"Project",
  "budget":10000.0,
  "budget_by":"project",
  "budget_is_monthly":false,
  "notify_when_over_budget":false,
  "over_budget_notification_percentage":80.0,
  "over_budget_notification_date":null,
  "show_budget_to_all":false,
  "created_at":"2017-06-26T21:56:52Z",
  "updated_at":"2017-06-26T21:57:20Z",
  "starts_on":null,
  "ends_on":null,
  "is_billable":true,
  "is_fixed_fee":false,
  "notes":"",
  "client":{
    "id":5735776,
    "name":"123 Industries",
    "currency":"EUR"
  },
  "cost_budget":null,
  "cost_budget_include_expenses":false,
  "hourly_rate":100.0,
  "fee":null
}
Delete a project⚭

Deletes a project and any time entries or expenses tracked to it. However, invoices associated with the project will not be deleted. If you don’t want the project’s time entries and expenses to be deleted, you should archive the project instead.

DELETE /v2/projects/{PROJECT_ID}
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308112" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
