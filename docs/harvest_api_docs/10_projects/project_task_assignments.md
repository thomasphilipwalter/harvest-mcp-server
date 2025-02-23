Project Task Assignments

Admin or Project Manager permissions required.

The task assignment object⚭

Attribute	Type	Description
id	integer	Unique ID for the task assignment.
project	object	An object containing the id, name, and code of the associated project.
task	object	An object containing the id and name of the associated task.
is_active	boolean	Whether the task assignment is active or archived.
billable	boolean	Whether the task assignment is billable or not. For example: if set to true, all time tracked on this project for the associated task will be marked as billable.
hourly_rate	decimal	Rate used when the project’s bill_by is Tasks.
budget	decimal	Budget used when the project’s budget_by is task or task_fees.
created_at	datetime	Date and time the task assignment was created.
updated_at	datetime	Date and time the task assignment was last updated.
List all task assignments⚭

Returns a list of your task assignments. The task assignments are returned sorted by creation date, with the most recently created task assignments appearing first.

The response contains an object with a task_assignments property that contains an array of up to per_page task assignments. Each entry in the array is a separate task assignment object. If no more task assignments are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your task assignments.

GET /v2/task_assignments
Parameter	Type	Description
is_active	boolean	Pass true to only return active task assignments and false to return inactive task assignments.
updated_since	datetime	Only return task assignments that have been updated since the given date and time.
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example Request:

curl "https://api.harvestapp.com/v2/task_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "task_assignments":[
    {
      "id":160726647,
      "billable":false,
      "is_active":true,
      "created_at":"2017-08-22T17:36:54Z",
      "updated_at":"2017-08-22T17:36:54Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14808188,
        "name":"Task Force",
        "code":"TF"
      },
      "task":{
        "id":8083369,
        "name":"Research"
      }
    },
    {
      "id":160726646,
      "billable":true,
      "is_active":true,
      "created_at":"2017-08-22T17:36:54Z",
      "updated_at":"2017-08-22T17:36:54Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14808188,
        "name":"Task Force",
        "code":"TF"
      },
      "task":{
        "id":8083368,
        "name":"Project Management"
      }
    },
    {
      "id":160726645,
      "billable":true,
      "is_active":true,
      "created_at":"2017-08-22T17:36:54Z",
      "updated_at":"2017-08-22T17:36:54Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14808188,
        "name":"Task Force",
        "code":"TF"
      },
      "task":{
        "id":8083366,
        "name":"Programming"
      }
    },
    {
      "id":160726644,
      "billable":true,
      "is_active":true,
      "created_at":"2017-08-22T17:36:54Z",
      "updated_at":"2017-08-22T17:36:54Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14808188,
        "name":"Task Force",
        "code":"TF"
      },
      "task":{
        "id":8083365,
        "name":"Graphic Design"
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
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "task":{
        "id":8083369,
        "name":"Research"
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
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083369,
        "name":"Research"
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
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083368,
        "name":"Project Management"
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
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083366,
        "name":"Programming"
      }
    },
    {
      "id":155505013,
      "billable":true,
      "is_active":true,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:52:18Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083365,
        "name":"Graphic Design"
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
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "task":{
        "id":8083368,
        "name":"Project Management"
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
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "task":{
        "id":8083366,
        "name":"Programming"
      }
    },
    {
      "id":155502709,
      "billable":true,
      "is_active":true,
      "created_at":"2017-06-26T21:36:23Z",
      "updated_at":"2017-06-26T21:36:23Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "task":{
        "id":8083365,
        "name":"Graphic Design"
      }
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":12,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/task_assignments?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/task_assignments?page=1&per_page=2000"
  }
}
List all task assignments for a specific project⚭

Returns a list of your task assignments for the project identified by PROJECT_ID. The task assignments are returned sorted by creation date, with the most recently created task assignments appearing first.

The response contains an object with a task_assignments property that contains an array of up to per_page task assignments. Each entry in the array is a separate task assignment object. If no more task assignments are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your task assignments.

GET /v2/projects/{PROJECT_ID}/task_assignments
Parameter	Type	Description
is_active	boolean	Pass true to only return active task assignments and false to return inactive task assignments.
updated_since	datetime	Only return task assignments that have been updated since the given date and time.
page	integer	The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "task_assignments":[
    {
      "id":155505016,
      "billable":false,
      "is_active":true,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:54:06Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083369,
        "name":"Research"
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
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083368,
        "name":"Project Management"
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
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083366,
        "name":"Programming"
      }
    },
    {
      "id":155505013,
      "billable":true,
      "is_active":true,
      "created_at":"2017-06-26T21:52:18Z",
      "updated_at":"2017-06-26T21:52:18Z",
      "hourly_rate":100.0,
      "budget":null,
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "task":{
        "id":8083365,
        "name":"Graphic Design"
      }
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":4,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/projects/14308069/task_assignments?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/projects/14308069/task_assignments?page=1&per_page=2000"
  }
}
Retrieve a task assignment⚭

Retrieves the task assignment with the given ID. Returns a task assignment object and a 200 OK response code if a valid identifier was provided.

GET /v2/projects/{PROJECT_ID}/task_assignments/{TASK_ASSIGNMENT_ID}
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments/155505016" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "id":155505016,
  "billable":false,
  "is_active":true,
  "created_at":"2017-06-26T21:52:18Z",
  "updated_at":"2017-06-26T21:54:06Z",
  "hourly_rate":100.0,
  "budget":null,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "task":{
    "id":8083369,
    "name":"Research"
  }
}
Create a task assignment⚭

Creates a new task assignment object. Returns a task assignment object and a 201 Created response code if the call succeeded.

POST /v2/projects/{PROJECT_ID}/task_assignments
Parameter	Type	Required	Description
task_id	integer	required	The ID of the task to associate with the project.
is_active	boolean	optional	Whether the task assignment is active or archived. Defaults to true.
billable	boolean	optional	Whether the task assignment is billable or not. Defaults to false.
hourly_rate	decimal	optional	Rate used when the project’s bill_by is Tasks. Defaults to null when billing by task hourly rate, otherwise 0.
budget	decimal	optional	Budget used when the project’s budget_by is task or task_fees.
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"task_id":8083800,"is_active":true,"billable":true,"hourly_rate":75.50}'
Example Response:

{
  "id":155506339,
  "billable":true,
  "is_active":true,
  "created_at":"2017-06-26T22:10:43Z",
  "updated_at":"2017-06-26T22:10:43Z",
  "hourly_rate":75.5,
  "budget":null,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "task":{
    "id":8083800,
    "name":"Business Development"
  }
}
Update a task assignment⚭

Updates the specific task assignment by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a task assignment object and a 200 OK response code if the call succeeded.

PATCH /v2/projects/{PROJECT_ID}/task_assignments/{TASK_ASSIGNMENT_ID}
Parameter	Type	Description
is_active	boolean	Whether the task assignment is active or archived.
billable	boolean	Whether the task assignment is billable or not.
hourly_rate	decimal	Rate used when the project’s bill_by is Tasks.
budget	decimal	Budget used when the project’s budget_by is task or task_fees.
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments/155506339" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"budget":120}'
Example Response:

{
  "id":155506339,
  "billable":true,
  "is_active":true,
  "created_at":"2017-06-26T22:10:43Z",
  "updated_at":"2017-06-26T22:11:27Z",
  "hourly_rate":75.5,
  "budget":120.0,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "task":{
    "id":8083800,
    "name":"Business Development"
  }
}
Delete a task assignment⚭

Delete a task assignment. Deleting a task assignment is only possible if it has no time entries associated with it. Returns a 200 OK response code if the call succeeded.

DELETE /v2/projects/{PROJECT_ID}/task_assignments/{TASK_ASSIGNMENT_ID}
Example Request:

curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments/155506339" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
