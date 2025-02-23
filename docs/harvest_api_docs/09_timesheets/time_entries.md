Time Entries

The time entry object⚭

Attribute Type  Description
id  bigint  Unique ID for the time entry.
spent_date  date  Date of the time entry.
user  object  An object containing the id and name of the associated user.
user_assignment object  A user assignment object of the associated user.
client  object  An object containing the id and name of the associated client.
project object  An object containing the id and name of the associated project.
task  object  An object containing the id and name of the associated task.
task_assignment object  A task assignment object of the associated task.
external_reference  object  An object containing the id, group_id, account_id, permalink, service, and service_icon_url of the associated external reference.
invoice object  Once the time entry has been invoiced, this field will include the associated invoice’s id and number.
hours decimal Number of (decimal time) hours tracked in this time entry.
hours_without_timer decimal Number of (decimal time) hours already tracked in this time entry, before the timer was last started.
rounded_hours decimal Number of (decimal time) hours tracked in this time entry used in summary reports and invoices. This value is rounded according to the Time Rounding setting in your Preferences.
notes string  Notes attached to the time entry.
is_locked boolean Whether or not the time entry has been locked.
locked_reason string  Why the time entry has been locked.
is_closed boolean Whether or not the time entry has been approved via Timesheet Approval.
is_billed boolean Whether or not the time entry has been marked as invoiced.
timer_started_at  datetime  Date and time the running timer was started (if tracking by duration). Use the ISO 8601 Format. Returns null for stopped timers.
started_time  time  Time the time entry was started (if tracking by start/end times).
ended_time  time  Time the time entry was ended (if tracking by start/end times).
is_running  boolean Whether or not the time entry is currently running.
billable  boolean Whether or not the time entry is billable.
budgeted  boolean Whether or not the time entry counts towards the project budget.
billable_rate decimal The billable rate for the time entry.
cost_rate decimal The cost rate for the time entry.
created_at  datetime  Date and time the time entry was created. Use the ISO 8601 Format.
updated_at  datetime  Date and time the time entry was last updated. Use the ISO 8601 Format.
Required permissions⚭

Administrators can see all time entries for the account.

Managers can see time entries for themselves, assigned teammates, and time tracked to projects they manage. Additionally, Managers with permission to edit assigned teammates’ time entries can create, edit, and destroy time entries on their behalf.

Members can only see their own tracked time.

List all time entries⚭

Returns a list of time entries. The time entries are returned sorted by spent_date date. At this time, the sort option can’t be customized.

The response contains an object with a time_entries property that contains an array of up to per_page time entries. Each entry in the array is a separate time entry object. If no more time entries are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your time entries.

GET /v2/time_entries
Parameter Type  Description
user_id integer Only return time entries belonging to the user with the given ID.
client_id integer Only return time entries belonging to the client with the given ID.
project_id  integer Only return time entries belonging to the project with the given ID.
task_id integer Only return time entries belonging to the task with the given ID.
external_reference_id string  Only return time entries with the given external_reference ID.
is_billed boolean Pass true to only return time entries that have been invoiced and false to return time entries that have not been invoiced.
is_running  boolean Pass true to only return running time entries and false to return non-running time entries.
updated_since datetime  Only return time entries that have been updated since the given date and time. Use the ISO 8601 Format.
from  date  Only return time entries with a spent_date on or after the given date.
to  date  Only return time entries with a spent_date on or before the given date.
page  integer The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page  integer The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)"
Example Response:

{
  "time_entries":[
    {
      "id":636709355,
      "spent_date":"2017-03-02",
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      },
      "client":{
        "id":5735774,
        "name":"ABC Corp"
      },
      "project":{
        "id":14307913,
        "name":"Marketing Website"
      },
      "task":{
        "id":8083365,
        "name":"Graphic Design"
      },
      "user_assignment":{
        "id":125068553,
        "is_project_manager":true,
        "is_active":true,
        "budget":null,
        "created_at":"2017-06-26T22:32:52Z",
        "updated_at":"2017-06-26T22:32:52Z",
        "hourly_rate":100.0
      },
      "task_assignment":{
        "id":155502709,
        "billable":true,
        "is_active":true,
        "created_at":"2017-06-26T21:36:23Z",
        "updated_at":"2017-06-26T21:36:23Z",
        "hourly_rate":100.0,
        "budget":null
      },
      "hours":2.11,
      "hours_without_timer":2.11,
      "rounded_hours": 2.25,
      "notes":"Adding CSS styling",
      "created_at":"2017-06-27T15:50:15Z",
      "updated_at":"2017-06-27T16:47:14Z",
      "is_locked":true,
      "locked_reason":"Item Approved and Locked for this Time Period",
      "is_closed":true,
      "is_billed":false,
      "timer_started_at":null,
      "started_time":"3:00pm",
      "ended_time":"5:00pm",
      "is_running":false,
      "invoice":null,
      "external_reference":null,
      "billable":true,
      "budgeted":true,
      "billable_rate":100.0,
      "cost_rate":50.0
    },
    {
      "id":636708723,
      "spent_date":"2017-03-01",
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      },
      "client":{
        "id":5735776,
        "name":"123 Industries"
      },
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1"
      },
      "task":{
        "id":8083366,
        "name":"Programming"
      },
      "user_assignment":{
        "id":125068554,
        "is_project_manager":true,
        "is_active":true,
        "budget":null,
        "created_at":"2017-06-26T22:32:52Z",
        "updated_at":"2017-06-26T22:32:52Z",
        "hourly_rate":100.0
      },
      "task_assignment":{
        "id":155505014,
        "billable":true,
        "is_active":true,
        "created_at":"2017-06-26T21:52:18Z",
        "updated_at":"2017-06-26T21:52:18Z",
        "hourly_rate":100.0,
        "budget":null
      },
      "hours":1.35,
      "hours_without_timer":1.35,
      "rounded_hours":1.5,
      "notes":"Importing products",
      "created_at":"2017-06-27T15:49:28Z",
      "updated_at":"2017-06-27T16:47:14Z",
      "is_locked":true,
      "locked_reason":"Item Invoiced and Approved and Locked for this Time Period",
      "is_closed":true,
      "is_billed":true,
      "timer_started_at":null,
      "started_time":"1:00pm",
      "ended_time":"2:00pm",
      "is_running":false,
      "invoice":{
        "id":13150403,
        "number":"1001"
      },
      "external_reference":null,
      "billable":true,
      "budgeted":true,
      "billable_rate":100.0,
      "cost_rate":50.0
    },
    {
      "id":636708574,
      "spent_date":"2017-03-01",
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      },
      "client":{
        "id":5735776,
        "name":"123 Industries"
      },
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1"
      },
      "task":{
        "id":8083369,
        "name":"Research"
      },
      "user_assignment":{
        "id":125068554,
        "is_project_manager":true,
        "is_active":true,
        "budget":null,
        "created_at":"2017-06-26T22:32:52Z",
        "updated_at":"2017-06-26T22:32:52Z",
        "hourly_rate":100.0
      },
      "task_assignment":{
        "id":155505016,
        "billable":false,
        "is_active":true,
        "created_at":"2017-06-26T21:52:18Z",
        "updated_at":"2017-06-26T21:54:06Z",
        "hourly_rate":100.0,
        "budget":null
      },
      "hours":1.0,
      "hours_without_timer":1.0,
      "rounded_hours":1.0,
      "notes":"Evaluating 3rd party libraries",
      "created_at":"2017-06-27T15:49:17Z",
      "updated_at":"2017-06-27T16:47:14Z",
      "is_locked":true,
      "locked_reason":"Item Approved and Locked for this Time Period",
      "is_closed":true,
      "is_billed":false,
      "timer_started_at":null,
      "started_time":"11:00am",
      "ended_time":"12:00pm",
      "is_running":false,
      "invoice":null,
      "external_reference":null,
      "billable":false,
      "budgeted":true,
      "billable_rate":null,
      "cost_rate":50.0
    },
    {
      "id":636707831,
      "spent_date":"2017-03-01",
      "user":{
        "id":1782959,
        "name":"Kim Allen"
      },
      "client":{
        "id":5735776,
        "name":"123 Industries"
      },
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1"
      },
      "task":{
        "id":8083368,
        "name":"Project Management"
      },
      "user_assignment":{
        "id":125068554,
        "is_project_manager":true,
        "is_active":true,
        "budget":null,
        "created_at":"2017-06-26T22:32:52Z",
        "updated_at":"2017-06-26T22:32:52Z",
        "hourly_rate":100.0
      },
      "task_assignment":{
        "id":155505015,
        "billable":true,
        "is_active":true,
        "created_at":"2017-06-26T21:52:18Z",
        "updated_at":"2017-06-26T21:52:18Z",
        "hourly_rate":100.0,
        "budget":null
      },
      "hours":2.0,
      "hours_without_timer":2.0,
      "rounded_hours":2.0,
      "notes":"Planning meetings",
      "created_at":"2017-06-27T15:48:24Z",
      "updated_at":"2017-06-27T16:47:14Z",
      "is_locked":true,
      "locked_reason":"Item Invoiced and Approved and Locked for this Time Period",
      "is_closed":true,
      "is_billed":true,
      "timer_started_at":null,
      "started_time":"9:00am",
      "ended_time":"11:00am",
      "is_running":false,
      "invoice":{
        "id":13150403,
        "number":"1001"
      },
      "external_reference":null,
      "billable":true,
      "budgeted":true,
      "billable_rate":100.0,
      "cost_rate":50.0
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":4,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"<https://api.harvestapp.com/v2/time_entries?page=1&per_page=2000>",
    "next":null,
    "previous":null,
    "last":"<https://api.harvestapp.com/v2/time_entries?page=1&per_page=2000>"
  }
}
Retrieve a time entry⚭

Retrieves the time entry with the given ID. Returns a time entry object and a 200 OK response code if a valid identifier was provided.

GET /v2/time_entries/{TIME_ENTRY_ID}
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries/636708723>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)"
Example Response:

{
  "id":636708723,
  "spent_date":"2017-03-01",
  "user":{
    "id":1782959,
    "name":"Kim Allen"
  },
  "client":{
    "id":5735776,
    "name":"123 Industries"
  },
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1"
  },
  "task":{
    "id":8083366,
    "name":"Programming"
  },
  "user_assignment":{
    "id":125068554,
    "is_project_manager":true,
    "is_active":true,
    "budget":null,
    "created_at":"2017-06-26T22:32:52Z",
    "updated_at":"2017-06-26T22:32:52Z",
    "hourly_rate":100.0
  },
  "task_assignment":{
    "id":155505014,
    "billable":true,
    "is_active":true,
    "created_at":"2017-06-26T21:52:18Z",
    "updated_at":"2017-06-26T21:52:18Z",
    "hourly_rate":100.0,
    "budget":null
  },
  "hours":1.0,
  "hours_without_timer":1.0,
  "rounded_hours":1.0,
  "notes":"Importing products",
  "created_at":"2017-06-27T15:49:28Z",
  "updated_at":"2017-06-27T16:47:14Z",
  "is_locked":true,
  "locked_reason":"Item Invoiced and Approved and Locked for this Time Period",
  "is_closed":true,
  "is_billed":true,
  "timer_started_at":null,
  "started_time":"1:00pm",
  "ended_time":"2:00pm",
  "is_running":false,
  "invoice":{
    "id":13150403,
    "number":"1001"
  },
  "external_reference":null,
  "billable":true,
  "budgeted":true,
  "billable_rate":100.0,
  "cost_rate":50.0
}
Create a time entry via duration⚭

Creates a new time entry object. Returns a time entry object and a 201 Created response code if the call succeeded.

You should only use this method to create time entries when your account is configured to track time via duration. You can verify this by visiting the Settings page in your Harvest account or by checking if wants_timestamp_timers is false in the Company API.

POST /v2/time_entries
Parameter Type  Required  Description
user_id integer optional  The ID of the user to associate with the time entry. Defaults to the currently authenticated user’s ID.
project_id  integer required  The ID of the project to associate with the time entry.
task_id integer required  The ID of the task to associate with the time entry.
spent_date  date  required  The ISO 8601 formatted date the time entry was spent.
hours decimal optional  The current amount of time tracked. If provided, the time entry will be created with the specified hours and is_running will be set to false. If not provided, hours will be set to 0.0 and is_running will be set to true.
notes string  optional  Any notes to be associated with the time entry.
external_reference  object  optional  An object containing the id, group_id, account_id, and permalink of the external reference.
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782959,"project_id":14307913,"task_id":8083365,"spent_date":"2017-03-21","hours":1.0}'
Example Response:

{
  "id":636718192,
  "spent_date":"2017-03-21",
  "user":{
    "id":1782959,
    "name":"Kim Allen"
  },
  "client":{
    "id":5735774,
    "name":"ABC Corp"
  },
  "project":{
    "id":14307913,
    "name":"Marketing Website"
  },
  "task":{
    "id":8083365,
    "name":"Graphic Design"
  },
  "user_assignment":{
    "id":125068553,
    "is_project_manager":true,
    "is_active":true,
    "budget":null,
    "created_at":"2017-06-26T22:32:52Z",
    "updated_at":"2017-06-26T22:32:52Z",
    "hourly_rate":100.0
  },
  "task_assignment":{
    "id":155502709,
    "billable":true,
    "is_active":true,
    "created_at":"2017-06-26T21:36:23Z",
    "updated_at":"2017-06-26T21:36:23Z",
    "hourly_rate":100.0,
    "budget":null
  },
  "hours":1.0,
  "rounded_hours":1.0,
  "notes":null,
  "created_at":"2017-06-27T16:01:23Z",
  "updated_at":"2017-06-27T16:01:23Z",
  "is_locked":false,
  "locked_reason":null,
  "is_closed":false,
  "is_billed":false,
  "timer_started_at":null,
  "started_time":null,
  "ended_time":null,
  "is_running":false,
  "invoice":null,
  "external_reference": null,
  "billable":true,
  "budgeted":true,
  "billable_rate":100.0,
  "cost_rate":50.0
}
Create a time entry via start and end time⚭

Creates a new time entry object. Returns a time entry object and a 201 Created response code if the call succeeded.

You should only use this method to create time entries when your account is configured to track time via start and end time. You can verify this by visiting the Settings page in your Harvest account or by checking if wants_timestamp_timers is true in the Company API.

POST /v2/time_entries
Parameter Type  Required  Description
user_id integer optional  The ID of the user to associate with the time entry. Defaults to the currently authenticated user’s ID.
project_id  integer required  The ID of the project to associate with the time entry.
task_id integer required  The ID of the task to associate with the time entry.
spent_date  date  required  The ISO 8601 formatted date the time entry was spent.
started_time  time  optional  The time the entry started. Defaults to the current time. Example: “8:00am”.
ended_time  time  optional  The time the entry ended. If provided, is_running will be set to false. If not provided, is_running will be set to true.
notes string  optional  Any notes to be associated with the time entry.
external_reference  object  optional  An object containing the id, group_id, account_id, and permalink of the external reference.
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782959,"project_id":14307913,"task_id":8083365,"spent_date":"2017-03-21","started_time":"8:00am","ended_time":"9:00am"}'
Example Response:

{
  "id":636718192,
  "spent_date":"2017-03-21",
  "user":{
    "id":1782959,
    "name":"Kim Allen"
  },
  "client":{
    "id":5735774,
    "name":"ABC Corp"
  },
  "project":{
    "id":14307913,
    "name":"Marketing Website"
  },
  "task":{
    "id":8083365,
    "name":"Graphic Design"
  },
  "user_assignment":{
    "id":125068553,
    "is_project_manager":true,
    "is_active":true,
    "budget":null,
    "created_at":"2017-06-26T22:32:52Z",
    "updated_at":"2017-06-26T22:32:52Z",
    "hourly_rate":100.0
  },
  "task_assignment":{
    "id":155502709,
    "billable":true,
    "is_active":true,
    "created_at":"2017-06-26T21:36:23Z",
    "updated_at":"2017-06-26T21:36:23Z",
    "hourly_rate":100.0,
    "budget":null
  },
  "hours":1.0,
  "hours_without_timer":1.0,
  "rounded_hours":1.0,
  "notes":null,
  "created_at":"2017-06-27T16:01:23Z",
  "updated_at":"2017-06-27T16:01:23Z",
  "is_locked":false,
  "locked_reason":null,
  "is_closed":false,
  "is_billed":false,
  "timer_started_at":null,
  "started_time": "8:00am",
  "ended_time": "9:00am",
  "is_running":false,
  "invoice":null,
  "external_reference": null,
  "billable":true,
  "budgeted":true,
  "billable_rate":100.0,
  "cost_rate":50.0
}
Update a time entry⚭

Updates the specific time entry by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a time entry object and a 200 OK response code if the call succeeded.

PATCH /v2/time_entries/{TIME_ENTRY_ID}
Parameter Type  Description
project_id  integer The ID of the project to associate with the time entry.
task_id integer The ID of the task to associate with the time entry.
spent_date  date  The ISO 8601 formatted date the time entry was spent.
started_time  time  The time the entry started. Defaults to the current time. Example: “8:00am”.
ended_time  time  The time the entry ended.
hours decimal The current amount of time tracked.
notes string  Any notes to be associated with the time entry.
external_reference  object  An object containing the id, group_id, account_id, and permalink of the external reference.
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries/636718192>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"notes":"Updated notes"}'
Example Response:

{
  "id":636718192,
  "spent_date":"2017-03-21",
  "user":{
    "id":1782959,
    "name":"Kim Allen"
  },
  "client":{
    "id":5735774,
    "name":"ABC Corp"
  },
  "project":{
    "id":14307913,
    "name":"Marketing Website"
  },
  "task":{
    "id":8083365,
    "name":"Graphic Design"
  },
  "user_assignment":{
    "id":125068553,
    "is_project_manager":true,
    "is_active":true,
    "budget":null,
    "created_at":"2017-06-26T22:32:52Z",
    "updated_at":"2017-06-26T22:32:52Z",
    "hourly_rate":100.0
  },
  "task_assignment":{
    "id":155502709,
    "billable":true,
    "is_active":true,
    "created_at":"2017-06-26T21:36:23Z",
    "updated_at":"2017-06-26T21:36:23Z",
    "hourly_rate":100.0,
    "budget":null
  },
  "hours":1.0,
  "hours_without_timer":1.0,
  "rounded_hours":1.0,
  "notes":"Updated notes",
  "created_at":"2017-06-27T16:01:23Z",
  "updated_at":"2017-06-27T16:02:40Z",
  "is_locked":false,
  "locked_reason":null,
  "is_closed":false,
  "is_billed":false,
  "timer_started_at":null,
  "started_time":null,
  "ended_time":null,
  "is_running":false,
  "invoice":null,
  "external_reference": null,
  "billable":true,
  "budgeted":true,
  "billable_rate":100.0,
  "cost_rate":50.0
}
Delete a time entry’s external reference⚭

Delete a time entry’s external reference. Returns a 200 OK response code if the call succeeded.

DELETE /v2/time_entries/{TIME_ENTRY_ID}/external_reference
Example Request:

curl
"<https://api.harvestapp.com/v2/time_entries/636718192/external_reference>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X DELETE
Delete a time entry⚭

Delete a time entry. Deleting a time entry is only possible if it’s not closed and the associated project and task haven’t been archived. However, Admins can delete closed entries. Returns a 200 OK response code if the call succeeded.

DELETE /v2/time_entries/{TIME_ENTRY_ID}
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries/636718192>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X DELETE
Restart a stopped time entry⚭

Restarting a time entry is only possible if it isn’t currently running. Returns a 200 OK response code if the call succeeded.

PATCH /v2/time_entries/{TIME_ENTRY_ID}/restart
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries/662202797/restart>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X PATCH
Example Response:

{
  "id": 662204379,
  "spent_date": "2017-03-21",
  "user": {
      "id": 1795925,
      "name": "Jane Smith"
  },
  "client": {
      "id": 5735776,
      "name": "123 Industries"
  },
  "project": {
      "id": 14808188,
      "name": "Task Force"
  },
  "task": {
      "id": 8083366,
      "name": "Programming"
  },
  "user_assignment": {
      "id": 130403296,
      "is_project_manager": true,
      "is_active": true,
      "budget": null,
      "created_at": "2017-08-22T17:36:54Z",
      "updated_at": "2017-08-22T17:36:54Z",
      "hourly_rate": 100
  },
  "task_assignment": {
      "id": 160726645,
      "billable": true,
      "is_active": true,
      "created_at": "2017-08-22T17:36:54Z",
      "updated_at": "2017-08-22T17:36:54Z",
      "hourly_rate": 100,
      "budget": null
  },
  "hours": 0,
  "hours_without_timer": 0,
  "rounded_hours":0,
  "notes": null,
  "created_at": "2017-08-22T17:40:24Z",
  "updated_at": "2017-08-22T17:40:24Z",
  "is_locked": false,
  "locked_reason": null,
  "is_closed": false,
  "is_billed": false,
  "timer_started_at": "2017-08-22T17:40:24Z",
  "started_time": "11:40am",
  "ended_time": null,
  "is_running": true,
  "invoice": null,
  "external_reference": null,
  "billable": true,
  "budgeted": false,
  "billable_rate": 100,
  "cost_rate": 75
}
Stop a running time entry⚭

Stopping a time entry is only possible if it’s currently running. Returns a 200 OK response code if the call succeeded.

PATCH /v2/time_entries/{TIME_ENTRY_ID}/stop
Example Request:

curl "<https://api.harvestapp.com/v2/time_entries/662202797/stop>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)" \
  -X PATCH
Example Response:

{
  "id": 662202797,
  "spent_date": "2017-03-21",
  "user": {
      "id": 1795925,
      "name": "Jane Smith"
  },
  "client": {
      "id": 5735776,
      "name": "123 Industries"
  },
  "project": {
      "id": 14808188,
      "name": "Task Force"
  },
  "task": {
      "id": 8083366,
      "name": "Programming"
  },
  "user_assignment": {
      "id": 130403296,
      "is_project_manager": true,
      "is_active": true,
      "budget": null,
      "created_at": "2017-08-22T17:36:54Z",
      "updated_at": "2017-08-22T17:36:54Z",
      "hourly_rate": 100
  },
  "task_assignment": {
      "id": 160726645,
      "billable": true,
      "is_active": true,
      "created_at": "2017-08-22T17:36:54Z",
      "updated_at": "2017-08-22T17:36:54Z",
      "hourly_rate": 100,
      "budget": null
  },
  "hours": 0.02,
  "hours_without_timer": 0.02,
  "rounded_hours":0.25,
  "notes": null,
  "created_at": "2017-08-22T17:37:13Z",
  "updated_at": "2017-08-22T17:38:31Z",
  "is_locked": false,
  "locked_reason": null,
  "is_closed": false,
  "is_billed": false,
  "timer_started_at": null,
  "started_time": "11:37am",
  "ended_time": "11:38am",
  "is_running": false,
  "invoice": null,
  "external_reference": null,
  "billable": true,
  "budgeted": false,
  "billable_rate": 100,
  "cost_rate": 75
}
