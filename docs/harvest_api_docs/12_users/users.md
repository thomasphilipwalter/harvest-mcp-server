Users

The user object⚭

Attribute	Type	Description
id	integer	Unique ID for the user.
first_name	string	The first name of the user.
last_name	string	The last name of the user.
email	string	The email address of the user.
telephone	string	The user’s telephone number.
timezone	string	The user’s timezone.
has_access_to_all_future_projects	boolean	Whether the user should be automatically added to future projects.
is_contractor	boolean	Whether the user is a contractor or an employee.
is_active	boolean	Whether the user is active or archived.
weekly_capacity	integer	The number of hours per week this person is available to work in seconds, in half hour increments. For example, if a person’s capacity is 35 hours, the API will return 126000 seconds.
default_hourly_rate	decimal	The billable rate to use for this user when they are added to a project.
cost_rate	decimal	The cost rate to use for this user when calculating a project’s costs vs billable amount.
roles	array of strings	Descriptive names of the business roles assigned to this person. They can be used for filtering reports, and have no effect in their permissions in Harvest.
access_roles	array of strings	Access role(s) that determine the user’s permissions in Harvest. Possible values: administrator, manager or member. Users with the manager role can additionally be granted one or more of these roles: project_creator, billable_rates_manager, managed_projects_invoice_drafter, managed_projects_invoice_manager, client_and_task_manager, time_and_expenses_manager, estimates_manager.
avatar_url	string	The URL to the user’s avatar image.
created_at	datetime	Date and time the user was created.
updated_at	datetime	Date and time the user was last updated.
Required permissions⚭

You must be an Administrator or Manager with assigned teammates in order to interact with the /v2/users endpoint, except when retrieving the currently authenticated user. Managers cannot edit emails, roles, or permissions, nor can they archive, restore, or delete assigned temmates. Managers with permission to see billable rates will have access to their teammates’ default hourly rates. Insufficient permissions will result in a 403 Forbidden status code.

List all users⚭

Returns a list of your users. The users are returned sorted by creation date, with the most recently created users appearing first.

The response contains an object with a users property that contains an array of up to per_page users. Each entry in the array is a separate user object. If no more users are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your users.

GET /v2/users
Parameter	Type	Description
is_active	boolean	Pass true to only return active users and false to return inactive users.
updated_since	datetime	Only return users that have been updated since the given date and time.
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:

{
  "users":[
    {
      "id":3230547,
      "first_name":"Jim",
      "last_name":"Allen",
      "email":"jimallen@example.com",
      "telephone":"",
      "timezone":"Mountain Time (US & Canada)",
      "has_access_to_all_future_projects":false,
      "is_contractor":false,
      "is_active":true,
      "created_at":"2020-05-01T22:34:41Z",
      "updated_at":"2020-05-01T22:34:52Z",
      "weekly_capacity":126000,
      "default_hourly_rate":100.0,
      "cost_rate":50.0,
      "roles":["Developer"],
      "access_roles": ["member"],
      "avatar_url":"https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481"
    },
    {
      "id":1782959,
      "first_name":"Kim",
      "last_name":"Allen",
      "email":"kimallen@example.com",
      "telephone":"",
      "timezone":"Eastern Time (US & Canada)",
      "has_access_to_all_future_projects":true,
      "is_contractor":false,
      "is_active":true,
      "created_at":"2020-05-01T22:15:45Z",
      "updated_at":"2020-05-01T22:32:52Z",
      "weekly_capacity":126000,
      "default_hourly_rate":100.0,
      "cost_rate":50.0,
      "roles":["Designer"],
      "access_roles": ["member"],
      "avatar_url":"https://cache.harvestapp.com/assets/profile_images/cornell_clock_tower.png?1498515345"
    },
    {
      "id":1782884,
      "first_name":"Bob",
      "last_name":"Powell",
      "email":"bobpowell@example.com",
      "telephone":"",
      "timezone":"Mountain Time (US & Canada)",
      "has_access_to_all_future_projects":false,
      "is_contractor":false,
      "is_active":true,
      "created_at":"2020-05-01T20:41:00Z",
      "updated_at":"2020-05-01T20:42:25Z",
      "weekly_capacity":126000,
      "default_hourly_rate":100.0,
      "cost_rate":75.0,
      "roles":["Founder", "CEO"],
      "access_roles": ["administrator"],
      "avatar_url":"https://cache.harvestapp.com/assets/profile_images/allen_bradley_clock_tower.png?1498509661"
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":3,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/users?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/users?page=1&per_page=2000"
  }
}
Retrieve the currently authenticated user⚭

Retrieves the currently authenticated user. Returns a user object and a 200 OK response code.

GET /v2/users/me
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
  "id":1782884,
  "first_name":"Bob",
  "last_name":"Powell",
  "email":"bobpowell@example.com",
  "telephone":"",
  "timezone":"Mountain Time (US & Canada)",
  "has_access_to_all_future_projects":false,
  "is_contractor":false,
  "is_active":true,
  "created_at":"2020-05-01T20:41:00Z",
  "updated_at":"2020-05-01T20:42:25Z",
  "weekly_capacity":126000,
  "default_hourly_rate":100.0,
  "cost_rate":75.0,
  "roles":["Founder", "CEO"],
  "access_roles": ["administrator"],
  "avatar_url":"https://cache.harvestapp.com/assets/profile_images/allen_bradley_clock_tower.png?1498509661"
}
Retrieve a user⚭

Retrieves the user with the given ID. Returns a user object and a 200 OK response code if a valid identifier was provided.

GET /v2/users/{USER_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3230547" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
  "id":3230547,
  "first_name":"Jim",
  "last_name":"Allen",
  "email":"jimallen@example.com",
  "telephone":"",
  "timezone":"Mountain Time (US & Canada)",
  "has_access_to_all_future_projects":false,
  "is_contractor":false,
  "is_active":true,
  "created_at":"2020-05-01T22:34:41Z",
  "updated_at":"2020-05-01T22:34:52Z",
  "weekly_capacity":126000,
  "default_hourly_rate":100.0,
  "cost_rate":50.0,
  "roles":["Developer"],
  "access_roles": ["member"],
  "avatar_url":"https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481"
}
Create a user⚭

Creates a new user object and sends an invitation email to the address specified in the email parameter. Returns a user object and a 201 Created response code if the call succeeded.

POST /v2/users
Parameter	Type	Required	Description
first_name	string	required	The first name of the user.
last_name	string	required	The last name of the user.
email	string	required	The email address of the user.
timezone	string	optional	The user’s timezone. Defaults to the company’s timezone. See a list of supported time zones.
has_access_to_all_future_projects	boolean	optional	Whether the user should be automatically added to future projects. Defaults to false.
is_contractor	boolean	optional	Whether the user is a contractor or an employee. Defaults to false.
is_active	boolean	optional	Whether the user is active or archived. Defaults to true.
weekly_capacity	integer	optional	The number of hours per week this person is available to work in seconds. Defaults to 126000 seconds (35 hours).
default_hourly_rate	decimal	optional	The billable rate to use for this user when they are added to a project. Defaults to 0.
cost_rate	decimal	optional	The cost rate to use for this user when calculating a project’s costs vs billable amount. Defaults to 0.
roles	array of strings	optional	Descriptive names of the business roles assigned to this person. They can be used for filtering reports, and have no effect in their permissions in Harvest.
access_roles	array of strings	optional	Access role(s) that determine the user’s permissions in Harvest. Possible values: administrator, manager or member. Users with the manager role can additionally be granted one or more of these roles: project_creator, billable_rates_manager, managed_projects_invoice_drafter, managed_projects_invoice_manager, client_and_task_manager, time_and_expenses_manager, estimates_manager.
Access Roles⚭

To set permissions for a user, use the access_roles parameter. A user must be one of the following: member, manager, or administrator.

If no access_role parameter is sent, a user defaults to ‘member’.
If a user is a manager they can have other access roles set for more specific permissions in Harvest.
The role of people_manager is determined by whether the user has teammates assigned to them, which can be added through the teammates api. If you downgrade a People Manager’s access role to Member, they will no longer be a People Manager and their assigned teammates will be removed.
Access Role Name	Description
administrator	For users who need the most control to manage your account. Administrators can see and do everything.
manager	For users who need more access to people and project reports. Managers can track time and expenses, and edit, approve, and run reports for all time and expenses tracked to selected projects and people.
member	For users who just need to track time and expenses.
Additional Manager Access Role Names	Description
project_creator	User can create projects, and edit projects that they manage.
billable_rates_manager	User can see billable rates and amounts for projects and people they manage.
managed_projects_invoice_drafter	User can create and edit draft invoices for projects they manage.
managed_projects_invoice_manager	User can send and fully manage all invoices for projects they manage (record payments, edit non-drafts, send reminders and thank-yous, delete, etc).
client_and_task_manager	User can create and edit all clients and tasks on the account.
time_and_expenses_manager	User can create and edit time and expenses for people and projects they manage.
estimates_manager	User can create and edit all estimates on the account.
Learn more about team permissions

Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"george@example.com","first_name":"George","last_name":"Frank","access_roles":["manager","project_creator","time_and_expenses_manager"]}'


Copy to Clipboard
Example response:⚭

{
  "id": 3,
  "first_name": "George",
  "last_name": "Frank",
  "email": "george@example.com",
  "telephone": "",
  "timezone": "Eastern Time (US & Canada)",
  "has_access_to_all_future_projects": false,
  "is_contractor": false,
  "is_active": true,
  "weekly_capacity":126000,
  "default_hourly_rate": 0,
  "cost_rate": 0,
  "roles": [],
  "access_roles": [
    "manager",
    "project_creator",
    "time_and_expenses_manager"
  ],
  "avatar_url": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/assets/profile_images/big_ben.png?1485372046",
  "created_at": "2020-01-25T19:20:46Z",
  "updated_at": "2020-01-25T19:20:57Z"
}
Update a user⚭

Updates the specific user by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a user object and a 200 OK response code if the call succeeded.

PATCH /v2/users/{USER_ID}
Parameter	Type	Description
first_name	string	The first name of the user. Can’t be updated if the user is inactive.
last_name	string	The last name of the user. Can’t be updated if the user is inactive.
email	string	The email address of the user. Can’t be updated if the user is inactive.
timezone	string	The user’s timezone. Defaults to the company’s timezone. See a list of supported time zones.
has_access_to_all_future_projects	boolean	Whether the user should be automatically added to future projects.
is_contractor	boolean	Whether the user is a contractor or an employee.
is_active	boolean	Whether the user is active or archived.
weekly_capacity	integer	The number of hours per week this person is available to work in seconds.
roles	array of strings	Descriptive names of the business roles assigned to this person. They can be used for filtering reports, and have no effect in their permissions in Harvest.
access_roles	array of strings	Access role(s) that determine the user’s permissions in Harvest. Possible values: administrator, manager or member. Users with the manager role can additionally be granted one or more of these roles: project_creator, billable_rates_manager, managed_projects_invoice_drafter, managed_projects_invoice_manager, client_and_task_manager, time_and_expenses_manager, estimates_manager.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3237198" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"roles":["Product Team"], "access_roles":["manager", "time_and_expenses_manager", "billable_rates_manager"]}'


Copy to Clipboard
Example response:⚭

{
  "id": 3237198,
  "first_name": "Gary",
  "last_name": "Brookes",
  "email": "gary@example.com",
  "telephone": "",
  "timezone": "Eastern Time (US & Canada)",
  "has_access_to_all_future_projects": true,
  "is_contractor": false,
  "is_active": true,
  "weekly_capacity":126000,
  "default_hourly_rate": 120,
  "cost_rate": 50,
  "roles": ["Product Team"],
  "access_roles": [
    "manager",
    "time_and_expenses_manager",
    "billable_rates_manager"
  ],
  "avatar_url": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/assets/profile_images/big_ben.png?1485372046",
  "created_at": "2018-01-01T19:20:46Z",
  "updated_at": "2019-01-25T19:20:57Z"
}
Archive a user⚭

Archives a specific user by setting the value of is_active to false. To make a user active again, simply set is_active to true again. Returns the updated user object and a 200 OK response code if the call succeeded.

PATCH /v2/users/{USER_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3226125" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"is_active":false}'


Copy to Clipboard
Example response:⚭

{
  "id": 3226125,
  "first_name": "Rachel",
  "last_name": "Halliday",
  "email": "rachel@example.com",
  "telephone": "",
  "timezone": "Eastern Time (US & Canada)",
  "has_access_to_all_future_projects": true,
  "is_contractor": false,
  "is_active": false,
  "weekly_capacity":126000,
  "default_hourly_rate": 120,
  "cost_rate": 50,
  "roles": ["Developer"],
  "access_roles": ["member"],
  "avatar_url": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/assets/profile_images/big_ben.png?1485372046",
  "created_at": "2018-01-01T19:20:46Z",
  "updated_at": "2019-01-25T19:20:57Z"
}
Delete a user⚭

Delete a user. Deleting a user is only possible if they have no time entries or expenses associated with them. Returns a 200 OK response code if the call succeeded.

DELETE /v2/users/{USER_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/users/3237198" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE


Copy to Clipboard
