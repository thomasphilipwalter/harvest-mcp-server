Roles

The role object⚭

Attribute	Type	Description
id	integer	Unique ID for the role.
name	string	The name of the role.
user_ids	array of integers	The IDs of the users assigned to this role.
created_at	datetime	Date and time the role was created.
updated_at	datetime	Date and time the role was last updated.
Required permissions⚭

You must be an Administrator in order to interact with the /v2/roles endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List all roles⚭

Returns a list of roles in the account. The roles are returned sorted by creation date, with the most recently created roles appearing first.

The response contains an object with a roles property that contains an array of up to per_page roles. Each entry in the array is a separate role object. If no more roles are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your roles.

GET /v2/roles
Parameter	Type	Description
page	integer	DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page	integer	The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
    "roles": [
        {
            "id": 618100,
            "name": "Designer",
            "created_at": "2020-04-17T10:09:41Z",
            "updated_at": "2020-04-17T10:09:41Z",
            "user_ids": []
        },
        {
            "id": 618099,
            "name": "Developer",
            "created_at": "2020-04-17T10:08:43Z",
            "updated_at": "2020-04-17T10:08:43Z",
            "user_ids": []
        },
        {
          "id": 617630,
          "name": "Sales",
          "created_at": "2020-04-16T16:59:59Z",
          "updated_at": "2020-04-16T16:59:59Z",
          "user_ids": [
              2084359,
              3122373,
              3122374
          ]
        }
    ],
    "per_page": 2000,
    "total_pages": 1,
    "total_entries": 2,
    "next_page": null,
    "previous_page": null,
    "page": 1,
    "links": {
        "first": "https://api.harvestapp.com/v2/roles?page=1&per_page=2000",
        "next": null,
        "previous": null,
        "last": "https://api.harvestapp.com/v2/roles?page=1&per_page=2000"
    }
}
Retrieve a role⚭

Retrieves the role with the given ID. Returns a role object and a 200 OK response code if a valid identifier was provided.

GET /v2/roles/{ROLE_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/roles/617630" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"


Copy to Clipboard
Example response:⚭

{
    "id": 617630,
    "name": "Sales",
    "created_at": "2020-04-16T16:59:59Z",
    "updated_at": "2020-04-16T16:59:59Z",
    "user_ids": [
        2084359,
        3122373,
        3122374
    ]
}
Create a role⚭

Creates a new role object. Returns a role object and a 201 Created response code if the call succeeded.

POST /v2/roles
Parameter	Type	Required	Description
name	string	required	The name of the role.
user_ids	array of integers	optional	The IDs of the users assigned to this role.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Marketing","user_ids":[3122374,3122373,2084359]}'


Copy to Clipboard
Example response:⚭

{
    "id": 617670,
    "name": "Marketing",
    "created_at": "2020-04-16T18:18:30Z",
    "updated_at": "2020-04-16T18:18:30Z",
    "user_ids": [
        3122374,
        3122373,
        2084359
    ]
}
Update a role⚭

Updates the specific role by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a role object and a 200 OK response code if the call succeeded.

PATCH /v2/roles/{ROLE_ID}
Parameter	Type	Required	Description
name	string	optional	The name of the role.
user_ids	array of integers	optional	The IDs of the users assigned to this role.
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/roles/618099" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"name":"HR","user_ids":[2084359,3122373,3122374]}'


Copy to Clipboard
Example response:⚭

{
    "id": 618099,
    "name": "HR",
    "created_at": "2020-04-16T17:00:38Z",
    "updated_at": "2020-04-16T17:00:57Z",
    "user_ids": [
        2084359
    ]
}
Delete a role⚭

Delete a role. Deleting a role will unlink it from any users it was assigned to. Returns a 200 OK response code if the call succeeded.

DELETE /v2/roles/{ROLE_ID}
Example requests:⚭

Curl
Postman
 
curl "https://api.harvestapp.com/v2/roles/617631" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE


Copy to Clipboard
