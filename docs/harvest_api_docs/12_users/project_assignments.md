User Project Assignments

The project assignment object⚭

Attribute	Type	Description
id	integer	Unique ID for the project assignment.
is_active	boolean	Whether the project assignment is active or archived.
is_project_manager	boolean	Determines if the user has Project Manager permissions for the project.
use_default_rates	boolean	Determines which billable rate(s) will be used on the project for this user when bill_by is People. When true, the project will use the user’s default billable rates. When false, the project will use the custom rate defined on this user assignment.
hourly_rate	decimal	Custom rate used when the project’s bill_by is People and use_default_rates is false.
budget	decimal	Budget used when the project’s budget_by is person.
created_at	datetime	Date and time the project assignment was created.
updated_at	datetime	Date and time the project assignment was last updated.
project	object	An object containing the assigned project id, name, and code.
client	object	An object containing the project’s client id and name.
task_assignments	array	Array of task assignment objects associated with the project.
Required permissions⚭

Anyone may access their own project assignments. The currently authenticated user, including Members, can use the /v2/users/{USER_ID}/project_assignments endpoint to view their own project assignments.

To access other people’s project assignments, you must be an Administrator, or Manager with assigned teammates, in order to interact with the /v2/users/{USER_ID}/project_assignments endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List active project assignments⚭

Returns a list of active project assignments for the user identified by USER_ID. The project assignments are returned sorted by creation date, with the most recently created project assignments appearing first.

The response contains an object with a project_assignments property that contains an array of up to per_page project assignments. Each entry in the array is a separate project assignment object. If no more project assignments are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your project assignments.

GET /v2/users/{USER_ID}/project_assignments
Parameter	Type	Description
updated_since	datetime	Only return project assignments that have been updated since the given date and time.
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example Request:

curl "https://api.harvestapp.com/v2/users/1782959/project_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "project_assignments":[
    {
      "id":125068554,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":true,
      "budget":null,
      "created_at":"2017-06-26T22:32:52Z",
      "updated_at":"2017-06-26T22:32:52Z",
      "hourly_rate":100.0,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "client":{
        "id":5735776,
        "name":"123 Industries"
      },
      "task_assignments":[
        {
          "id":155505013,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:52:18Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083365,
            "name":"Graphic Design"
          }
        },
        {
          "id":155505014,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:52:18Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083366,
            "name":"Programming"
          }
        },
        {
          "id":155505015,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:52:18Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083368,
            "name":"Project Management"
          }
        },
        {
          "id":155505016,
          "billable":false,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:54:06Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083369,
            "name":"Research"
          }
        }
      ]
    },
    {
      "id":125068553,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":false,
      "budget":null,
      "created_at":"2017-06-26T22:32:52Z",
      "updated_at":"2017-06-26T22:32:52Z",
      "hourly_rate":100.0,
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "client":{
        "id":5735774,
        "name":"ABC Corp"
      },
      "task_assignments":[
        {
          "id":155502709,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:36:23Z",
          "updated_at":"2017-06-26T21:36:23Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083365,
            "name":"Graphic Design"
          }
        },
        {
          "id":155502710,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:36:23Z",
          "updated_at":"2017-06-26T21:36:23Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083366,
            "name":"Programming"
          }
        },
        {
          "id":155502711,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:36:23Z",
          "updated_at":"2017-06-26T21:36:23Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083368,
            "name":"Project Management"
          }
        },
        {
          "id":155505153,
          "billable":false,
          "is_active":true,
          "created_at":"2017-06-26T21:53:20Z",
          "updated_at":"2017-06-26T21:54:31Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083369,
            "name":"Research"
          }
        }
      ]
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":2,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
  "first":"https://api.harvestapp.com/v2/users/1782959/project_assignments?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/users/1782959/project_assignments?page=1&per_page=2000"
  }
}
List active project assignments for the currently authenticated user⚭

Returns a list of your active project assignments for the currently authenticated user. The project assignments are returned sorted by creation date, with the most recently created project assignments appearing first.

The response contains an object with a project_assignments property that contains an array of up to per_page project assignments. Each entry in the array is a separate project assignment object. If no more project assignments are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your project assignments.

GET /v2/users/me/project_assignments
Parameter	Type	Description
page	integer	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl "https://api.harvestapp.com/v2/users/me/project_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "project_assignments":[
    {
      "id":125066109,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":true,
      "budget":null,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:52:18Z",
      "hourly_rate":100.0,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "client":{
        "id":5735776,
        "name":"123 Industries"
      },
      "task_assignments":[
        {
          "id":155505013,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:52:18Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083365,
            "name":"Graphic Design"
          }
        },
        {
          "id":155505014,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:52:18Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083366,
            "name":"Programming"
          }
        },
        {
          "id":155505015,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:52:18Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083368,
            "name":"Project Management"
          }
        },
        {
          "id":155505016,
          "billable":false,
          "is_active":true,
          "created_at":"2017-06-26T21:52:18Z",
          "updated_at":"2017-06-26T21:54:06Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083369,
            "name":"Research"
          }
        }
      ]
    },
    {
      "id":125063975,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":false,
      "budget":null,
      "created_at":"2017-06-26T21:36:23Z",
      "updated_at":"2017-06-26T21:36:23Z",
      "hourly_rate":100.0,
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "client":{
        "id":5735774,
        "name":"ABC Corp"
      },
      "task_assignments":[
        {
          "id":155502709,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:36:23Z",
          "updated_at":"2017-06-26T21:36:23Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083365,
            "name":"Graphic Design"
          }
        },
        {
          "id":155502710,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:36:23Z",
          "updated_at":"2017-06-26T21:36:23Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083366,
            "name":"Programming"
          }
        },
        {
          "id":155502711,
          "billable":true,
          "is_active":true,
          "created_at":"2017-06-26T21:36:23Z",
          "updated_at":"2017-06-26T21:36:23Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083368,
            "name":"Project Management"
          }
        },
        {
          "id":155505153,
          "billable":false,
          "is_active":true,
          "created_at":"2017-06-26T21:53:20Z",
          "updated_at":"2017-06-26T21:54:31Z",
          "hourly_rate":100.0,
          "budget":null,
          "task":{
            "id":8083369,
            "name":"Research"
          }
        }
      ]
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":2,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/users/1782884/project_assignments?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/users/1782884/project_assignments?page=1&per_page=2000"
  }
}
