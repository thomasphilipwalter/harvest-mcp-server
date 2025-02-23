Project User Assignments

The user assignment object⚭

Attribute	Type	Description
id	integer	Unique ID for the user assignment.
project	object	An object containing the id, name, and code of the associated project.
user	object	An object containing the id and name of the associated user.
is_active	boolean	Whether the user assignment is active or archived.
is_project_manager	boolean	Determines if the user has Project Manager permissions for the project.
use_default_rates	boolean	Determines which billable rate(s) will be used on the project for this user when bill_by is People. When true, the project will use the user’s default billable rates. When false, the project will use the custom rate defined on this user assignment.
hourly_rate	decimal	Custom rate used when the project’s bill_by is People and use_default_rates is false.
budget	decimal	Budget used when the project’s budget_by is person.
created_at	datetime	Date and time the user assignment was created.
updated_at	datetime	Date and time the user assignment was last updated.
Required permissions⚭

You must be an Administrator or Manager with assigned teammates or managed projects in order to interact with the /v2/user_assignments endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List all user assignments⚭

Returns a list of your projects user assignments, active and archived. The user assignments are returned sorted by creation date, with the most recently created user assignments appearing first.

The response contains an object with a user_assignments property that contains an array of up to per_page user assignments. Each entry in the array is a separate user assignment object. If no more user assignments are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your user assignments.

GET /v2/user_assignments
Parameter	Type	Description
user_id	integer	Only return user assignments belonging to the user with the given ID.
is_active	boolean	Pass true to only return active user assignments and false to return inactive user assignments.
updated_since	datetime	Only return user assignments that have been updated since the given date and time.
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example Request:

curl "https://api.harvestapp.com/v2/user_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "user_assignments":[
    {
      "id":130403297,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":false,
      "budget":null,
      "created_at":"2017-08-22T17:36:54Z",
      "updated_at":"2017-08-22T17:36:54Z",
      "hourly_rate":100.0,
      "project":{
        "id":14808188,
        "name":"Task Force",
        "code":"TF"
      },
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      }
    },
    {
      "id":130403296,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":true,
      "budget":null,
      "created_at":"2017-08-22T17:36:54Z",
      "updated_at":"2017-08-22T17:36:54Z",
      "hourly_rate":100.0,
      "project":{
        "id":14808188,
        "name":"Task Force",
        "code":"TF"
      },
      "user":{
        "id":1795925,
        "name":"Jason Dew"
      }
    },
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
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      }
    },
    {
      "id":125068553,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":true,
      "budget":null,
      "created_at":"2017-06-26T22:32:52Z",
      "updated_at":"2017-06-26T22:32:52Z",
      "hourly_rate":100.0,
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      }
    },
    {
      "id":125066109,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":false,
      "budget":null,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:52:18Z",
      "hourly_rate":100.0,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "user":{
        "id":1782884,
        "name":"Jeremy Israelsen"
      }
    },
    {
      "id":125063975,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":true,
      "budget":null,
      "created_at":"2017-06-26T21:36:23Z",
      "updated_at":"2017-06-26T21:36:23Z",
      "hourly_rate":100.0,
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "user":{
        "id":1782884,
        "name":"Jeremy Israelsen"
      }
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":6,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/user_assignments?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/user_assignments?page=1&per_page=2000"
  }
}
List all user assignments for a specific project⚭

Returns a list of user assignments for the project identified by PROJECT_ID. The user assignments are returned sorted by creation date, with the most recently created user assignments appearing first.

The response contains an object with a user_assignments property that contains an array of up to per_page user assignments. Each entry in the array is a separate user assignment object. If no more user assignments are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your user assignments.

GET /v2/projects/{PROJECT_ID}/user_assignments
Parameter	Type	Description
user_id	integer	Only return user assignments belonging to the user with the given ID.
is_active	boolean	Pass true to only return active user assignments and false to return inactive user assignments.
updated_since	datetime	Only return user assignments that have been updated since the given date and time.
page	integer	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "user_assignments":[
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
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      }
    },
    {
      "id":125066109,
      "is_project_manager":true,
      "is_active":true,
      "use_default_rates":false,
      "budget":null,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:52:18Z",
      "hourly_rate":100.0,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "user":{
        "id":1782884,
        "name":"Jeremy Israelsen"
      }
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":2,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/projects/14308069/user_assignments?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/projects/14308069/user_assignments?page=1&per_page=2000"
  }
}
Retrieve a user assignment⚭

Retrieves the user assignment with the given ID. Returns a user assignment object and a 200 OK response code if a valid identifier was provided.

GET /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments/125068554" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

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
  "user":{
    "id":1782959,
    "name":"Kim Allen"
  }
}
Create a user assignment⚭

Creates a new user assignment object. Returns a user assignment object and a 201 Created response code if the call succeeded.

POST /v2/projects/{PROJECT_ID}/user_assignments
Parameter	Type	Required	Description
user_id	integer	required	The ID of the user to associate with the project.
is_active	boolean	optional	Whether the user assignment is active or archived. Defaults to true.
is_project_manager	boolean	optional	Determines if the user has Project Manager permissions for the project. Defaults to false for users with Regular User permissions and true for those with Project Managers or Administrator permissions.
use_default_rates	boolean	optional	Determines which billable rate(s) will be used on the project for this user when bill_by is People. When true, the project will use the user’s default billable rates. When false, the project will use the custom rate defined on this user assignment. Defaults to true.
hourly_rate	decimal	optional	Custom rate used when the project’s bill_by is People and use_default_rates is false. Defaults to 0.
budget	decimal	optional	Budget used when the project’s budget_by is person.
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782974,"use_default_rates":false,"hourly_rate":75.50}'
Example Response:

{
  "id":125068758,
  "is_project_manager":false,
  "is_active":true,
  "use_default_rates":false,
  "budget":null,
  "created_at":"2017-06-26T22:36:01Z",
  "updated_at":"2017-06-26T22:36:01Z",
  "hourly_rate":75.5,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "user":{
    "id":1782974,
    "name":"Jim Allen"
  }
}
Update a user assignment⚭

Updates the specific user assignment by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a user assignment object and a 200 OK response code if the call succeeded.

PATCH /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}
Parameter	Type	Description
is_active	boolean	Whether the user assignment is active or archived.
is_project_manager	boolean	Determines if the user has Project Manager permissions for the project.
use_default_rates	boolean	Determines which billable rate(s) will be used on the project for this user when bill_by is People. When true, the project will use the user’s default billable rates. When false, the project will use the custom rate defined on this user assignment.
hourly_rate	decimal	Custom rate used when the project’s bill_by is People and use_default_rates is false.
budget	decimal	Budget used when the project’s budget_by is person.
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments/125068758" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"budget":120}'
Example Response:

{
  "id":125068758,
  "is_project_manager":false,
  "is_active":true,
  "use_default_rates":false,
  "budget":120.0,
  "created_at":"2017-06-26T22:36:01Z",
  "updated_at":"2017-06-26T22:36:35Z",
  "hourly_rate":75.5,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "user":{
    "id":1782974,
    "name":"Jim Allen"
  }
}
Delete a user assignment⚭

Delete a user assignment. Deleting a user assignment is only possible if it has no time entries or expenses associated with it. Returns a 200 OK response code if the call succeeded.

DELETE /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments/125068758" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
