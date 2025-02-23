Expenses

The expense object⚭

Attribute Type  Description
id  integer Unique ID for the expense.
client  object  An object containing the expense’s client id, name, and currency.
project object  An object containing the expense’s project id, name, and code.
expense_category  object  An object containing the expense’s expense category id, name, unit_price, and unit_name.
user  object  An object containing the id and name of the user that recorded the expense.
user_assignment object  A user assignment object of the user that recorded the expense.
receipt object  An object containing the expense’s receipt URL and file name.
invoice object  Once the expense has been invoiced, this field will include the associated invoice’s id and number.
notes string  Textual notes used to describe the expense.
units integer The quantity of units used to calculate the total_cost of the expense.
total_cost  decimal The total amount of the expense.
billable  boolean Whether the expense is billable or not.
is_closed boolean Whether the expense has been approved or not.
is_locked boolean Whether the expense has been been invoiced, approved, or the project or person related to the expense is archived.
is_billed boolean Whether or not the expense has been marked as invoiced.
locked_reason string  An explanation of why the expense has been locked.
spent_date  date  Date the expense occurred.
created_at  datetime  Date and time the expense was created.
updated_at  datetime  Date and time the expense was last updated.
List all expenses⚭

Returns a list of your expenses. If accessing this endpoint as an Administrator, all expenses in the account will be returned. If accessing this endpoint as a Manager, all expenses for assigned teammates and managed projects will be returned. The expenses are returned sorted by the spent_at date, with the most recent expenses appearing first.

The response contains an object with a expenses property that contains an array of up to per_page expenses. Each entry in the array is a separate expense object. If no more expenses are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your expenses.

GET /v2/expenses
Parameter Type  Description
user_id integer Only return expenses belonging to the user with the given ID.
client_id integer Only return expenses belonging to the client with the given ID.
project_id  integer Only return expenses belonging to the project with the given ID.
is_billed boolean Pass true to only return expenses that have been invoiced and false to return expenses that have not been invoiced.
updated_since datetime  Only return expenses that have been updated since the given date and time.
from  date  Only return expenses with a spent_date on or after the given date.
to  date  Only return expenses with a spent_date on or before the given date.
page  integer The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page  integer The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
Example Request:

curl "https://api.harvestapp.com/v2/expenses" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "expenses":[
    {
      "id":15296442,
      "notes":"Lunch with client",
      "total_cost":33.35,
      "units":1.0,
      "is_closed":false,
      "is_locked":true,
      "is_billed":true,
      "locked_reason":"Expense is invoiced.",
      "spent_date":"2017-03-03",
      "created_at":"2017-06-27T15:09:54Z",
      "updated_at":"2017-06-27T16:47:14Z",
      "billable":true,
      "receipt":{
        "url":"https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/expenses/15296442/receipt",
        "file_name":"lunch_receipt.gif",
        "file_size":39410,
        "content_type":"image/gif"
      },
      "user":{
        "id":1782959,
        "name":"Kim Allen"
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
      "project":{
        "id":14307913,
        "name":"Marketing Website",
        "code":"MW"
      },
      "expense_category":{
        "id":4195926,
        "name":"Meals",
        "unit_price":null,
        "unit_name":null
      },
      "client":{
        "id":5735774,
        "name":"ABC Corp",
        "currency":"USD"
      },
      "invoice":{
        "id":13150403,
        "number":"1001"
      }
    },
    {
      "id":15296423,
      "notes":"Hotel stay for meeting",
      "total_cost":100.0,
      "units":1.0,
      "is_closed":true,
      "is_locked":true,
      "is_billed":false,
      "locked_reason":"The project is locked for this time period.",
      "spent_date":"2017-03-01",
      "created_at":"2017-06-27T15:09:17Z",
      "updated_at":"2017-06-27T16:47:14Z",
      "billable":true,
      "receipt":null,
      "user":{
        "id":1782959,
        "name":"Kim Allen"
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
      "project":{
        "id":14308069,
        "name":"Online Store - Phase 1",
        "code":"OS1"
      },
      "expense_category":{
        "id":4197501,
        "name":"Lodging",
        "unit_price":null,
        "unit_name":null
      },
      "client":{
        "id":5735776,
        "name":"123 Industries",
        "currency":"EUR"
      },
      "invoice":null
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":2,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/expenses?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/expenses?page=1&per_page=2000"
  }
}
Retrieve an expense⚭

Retrieves the expense with the given ID. Returns an expense object and a 200 OK response code if a valid identifier was provided.

GET /v2/expenses/{EXPENSE_ID}
Example Request:

curl "https://api.harvestapp.com/v2/expenses/15296442" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "id":15296442,
  "notes":"Lunch with client",
  "total_cost":33.35,
  "units":1.0,
  "is_closed":false,
  "is_locked":true,
  "is_billed":true,
  "locked_reason":"Expense is invoiced.",
  "spent_date":"2017-03-03",
  "created_at":"2017-06-27T15:09:54Z",
  "updated_at":"2017-06-27T16:47:14Z",
  "billable":true,
  "receipt":{
    "url":"https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/expenses/15296442/receipt",
    "file_name":"lunch_receipt.gif",
    "file_size":39410,
    "content_type":"image/gif"
  },
  "user":{
    "id":1782959,
    "name":"Kim Allen"
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
  "project":{
    "id":14307913,
    "name":"Marketing Website",
    "code":"MW"
  },
  "expense_category":{
    "id":4195926,
    "name":"Meals",
    "unit_price":null,
    "unit_name":null
  },
  "client":{
    "id":5735774,
    "name":"ABC Corp",
    "currency":"USD"
  },
  "invoice":{
    "id":13150403,
    "number":"1001"
  }
}
Create an expense⚭

Creates a new expense object. Returns an expense object and a 201 Created response code if the call succeeded.

POST /v2/expenses
Parameter Type  Required  Description
user_id integer optional  The ID of the user associated with this expense. Defaults to the ID of the currently authenticated user.
project_id  integer required  The ID of the project associated with this expense.
expense_category_id integer required  The ID of the expense category this expense is being tracked against.
spent_date  date  required  Date the expense occurred.
units integer *optional The quantity of units to use in calculating the total_cost of the expense.
total_cost  decimal *optional The total amount of the expense.
notes string  optional  Textual notes used to describe the expense.
billable  boolean optional  Whether this expense is billable or not. Defaults to true.
receipt file  optional  A receipt file to attach to the expense. If including a receipt, you must submit a multipart/form-data request.
* Either units or total_cost is required. units is required if using a unit-based expense category. total_cost is required if not using a unit-based expense category.

Example Request:

curl "https://api.harvestapp.com/v2/expenses" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782959,"project_id":14308069,"expense_category_id":4195926,"spent_date":"2017-03-01","total_cost":13.59}'
Example Response:

{
  "id":15297032,
  "notes":null,
  "total_cost":13.59,
  "units":1.0,
  "is_closed":false,
  "is_locked":false,
  "is_billed":false,
  "locked_reason":null,
  "spent_date":"2017-03-01",
  "created_at":"2017-06-27T15:42:27Z",
  "updated_at":"2017-06-27T15:42:27Z",
  "billable":true,
  "receipt":null,
  "user":{
    "id":1782959,
    "name":"Kim Allen"
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
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "expense_category":{
    "id":4195926,
    "name":"Meals",
    "unit_price":null,
    "unit_name":null
  },
  "client":{
    "id":5735776,
    "name":"123 Industries",
    "currency":"EUR"
  },
  "invoice":null
}
Update an expense⚭

Updates the specific expense by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns an expense object and a 200 OK response code if the call succeeded.

PATCH /v2/expenses/{EXPENSE_ID}
Parameter Type  Description
project_id  integer The ID of the project associated with this expense.
expense_category_id integer The ID of the expense category this expense is being tracked against.
spent_date  date  Date the expense occurred.
units integer The quantity of units to use in calculating the total_cost of the expense.
total_cost  decimal The total amount of the expense.
notes string  Textual notes used to describe the expense.
billable  boolean Whether this expense is billable or not. Defaults to true.
receipt file  A receipt file to attach to the expense. If including a receipt, you must submit a multipart/form-data request.
delete_receipt  boolean Whether an attached expense receipt should be deleted. Pass true to delete the expense receipt.
Example Request:

curl "https://api.harvestapp.com/v2/expenses/15297032" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -F notes="Dinner" \
  -F receipt=@dinner-receipt.gif
Example Response:

{
  "id":15297032,
  "notes":"Dinner",
  "total_cost":13.59,
  "units":1.0,
  "is_closed":false,
  "is_locked":false,
  "is_billed":false,
  "locked_reason":null,
  "spent_date":"2017-03-01",
  "created_at":"2017-06-27T15:42:27Z",
  "updated_at":"2017-06-27T15:45:51Z",
  "billable":true,
  "receipt":{
    "url":"https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/expenses/15297032/receipt",
    "file_name":"dinner_receipt.gif",
    "file_size":39410,
    "content_type":"image/gif"
  },
  "user":{
    "id":1782959,
    "name":"Kim Allen"
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
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "expense_category":{
    "id":4195926,
    "name":"Meals",
    "unit_price":null,
    "unit_name":null
  },
  "client":{
    "id":5735776,
    "name":"123 Industries",
    "currency":"EUR"
  },
  "invoice":null
}
Delete an expense⚭

Delete an expense. Returns a 200 OK response code if the call succeeded.

DELETE /v2/expenses/{EXPENSE_ID}
Example Request:

curl "https://api.harvestapp.com/v2/expenses/15297032" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE