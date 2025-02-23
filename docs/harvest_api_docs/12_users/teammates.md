User Teammates

The teammate object⚭

Attribute Type  Description
id  int Unique ID for the teammate
first_name  string  The first name of the teammate
last_name string  The last name of the teammate
email string  The email of the teammate
Required permissions⚭

You must be an Administrator in order to interact with the /v2/users/{USER_ID}/teammates endpoint. Insufficient permissions will result in a 403 Forbidden status code.

List all assigned teammates for a specific user⚭

Returns a list of assigned teammates for the user identified by USER_ID. The USER_ID must belong to a user that is a Manager, if not, a 422 Unprocessable Entity status code will be returned.

The response contains an object with a teammates property that contains an array of up to per_page teammates. Each entry in the array is a separate teammate object. If no more teammates are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your teammates.

GET /v2/users/{USER_ID}/teammates
Parameter Type  Description
page  integer DEPRECATED The page number to use in pagination. For instance, if you make a list request and receive 100 records, your subsequent call can include page=2 to retrieve the next page of the list. (Default: 1)
per_page  integer The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
This endpoint supports cursor-based pagination and therefore deprecates the page parameter. For more information, visit the pagination guide.
Example Request:

curl "https://api.harvestapp.com/v2/users/1782959/teammates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
Example Response:

{
  "teammates":[
    {
      "id":3230547,
      "first_name":"Jim",
      "last_name":"Allen",
      "email":"jimallen@example.com"
    },
    {
      "id":1782884,
      "first_name":"Bob",
      "last_name":"Powell",
      "email":"bobpowell@example.com"
    }
  ],
  "per_page":100,
  "total_pages":1,
  "total_entries":2,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/users/1782959/teammates?page=1&per_page=100",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/users/1782959/teammates?page=1&per_page=100"
  }
}
Update a user’s assigned teammates⚭

Updates the the assigned teammates for a specific user. Returns list of assigned teammates and a 200 OK response code if the call succeeded. The USER_ID must belong to a user that is a Manager, if not, a 422 Unprocessable Entity status code will be returned.

Adding teammates for the first time will add the people_manager access role to the Manager. Any IDs not included in the teammate_ids that are currently assigned will be unassigned from the Manager. Use an empty array to unassign all users. This will also remove the people_manager access role from the Manager.

PATCH /v2/users/{USER_ID}/teammates
Parameter Type  Required  Description
teammate_ids  array of user ids required  Full list of user IDs to be assigned to the Manager.
Example Request:

curl "https://api.harvestapp.com/v2/users/1782959/teammates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"teammate_ids":[3230547, 3230575]}'
Example Response

{
  "teammates":[
    {
      "id":3230547,
      "first_name":"Jim",
      "last_name":"Allen",
      "email":"jimallen@example.com"
    },
    {
      "id":3230575,
      "first_name": "Gary",
      "last_name": "Brookes",
      "email": "gary@example.com"
    }
  ]
}
