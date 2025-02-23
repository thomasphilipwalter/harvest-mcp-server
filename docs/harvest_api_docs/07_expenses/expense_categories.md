# Expense Categories

Admin permissions required.

## The expense category object

Attribute | Type | Description
--------- | ---- | -----------
`id` | integer | Unique ID for the expense category.
`name` | string | The name of the expense category.
`unit_name` | string | The unit name of the expense category.
`unit_price` | decimal | The unit price of the expense category.
`is_active` | boolean | Whether the expense category is active or archived.
`created_at` | datetime | Date and time the expense category was created.
`updated_at` | datetime | Date and time the expense category was last updated.

## List all expense categories

Returns a list of your expense categories. The expense categories are returned sorted by creation date, with the most recently created expense categories appearing first.

The response contains an object with a `expense_categories` property that contains an array of up to `per_page` expense categories. Each entry in the array is a separate expense category object. If no more expense categories are available, the resulting array will be empty. Several additional pagination properties are included in the response to simplify paginating your expense categories.

```
GET /v2/expense_categories
```

Parameter | Type | Description
--------- | ---- | -----------
`is_active` | boolean | Pass `true` to only return active expense categories and `false` to return inactive expense categories.
`updated_since` | datetime | Only return expense categories that have been updated since the given date and time.
`page` | integer | **DEPRECATED** The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include `page=2` to retrieve the next page of the list. (Default: 1)
`per_page` | integer | The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

This endpoint supports cursor-based pagination and therefore deprecates the `page` parameter. For more information, visit the [pagination guide](/api-v2/introduction/overview/pagination/).

### Example Request
```bash
curl "https://api.harvestapp.com/v2/expense_categories" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (contact@email.com)"
```

### Example Response
```json
{
  "expense_categories":[
    {
      "id":4197501,
      "name":"Lodging",
      "unit_name":null,
      "unit_price":null,
      "is_active":true,
      "created_at":"2017-06-27T15:01:32Z",
      "updated_at":"2017-06-27T15:01:32Z"
    },
    {
      "id":4195930,
      "name":"Mileage",
      "unit_name":"mile",
      "unit_price":0.535,
      "is_active":true,
      "created_at":"2017-06-26T20:41:00Z",
      "updated_at":"2017-06-26T20:41:00Z"
    },
    {
      "id":4195928,
      "name":"Transportation",
      "unit_name":null,
      "unit_price":null,
      "is_active":true,
      "created_at":"2017-06-26T20:41:00Z",
      "updated_at":"2017-06-26T20:41:00Z"
    },
    {
      "id":4195926,
      "name":"Meals",
      "unit_name":null,
      "unit_price":null,
      "is_active":true,
      "created_at":"2017-06-26T20:41:00Z",
      "updated_at":"2017-06-26T20:41:00Z"
    }
  ],
  "per_page":2000,
  "total_pages":1,
  "total_entries":4,
  "next_page":null,
  "previous_page":null,
  "page":1,
  "links":{
    "first":"https://api.harvestapp.com/v2/expense_categories?page=1&per_page=2000",
    "next":null,
    "previous":null,
    "last":"https://api.harvestapp.com/v2/expense_categories?page=1&per_page=2000"
  }
}
```

## Retrieve an expense category

Retrieves the expense category with the given ID. Returns an expense category object and a `200 OK` response code if a valid identifier was provided.

```
GET /v2/expense_categories/{EXPENSE_CATEGORY_ID}
```

### Example Request
```bash
curl "https://api.harvestapp.com/v2/expense_categories/4197501" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (contact@email.com)"
```

### Example Response
```json
{
  "id":4197501,
  "name":"Lodging",
  "unit_name":null,
  "unit_price":null,
  "is_active":true,
  "created_at":"2017-06-27T15:01:32Z",
  "updated_at":"2017-06-27T15:01:32Z"
}
```

## Create an expense category

Creates a new expense category object. Returns an expense category object and a `201 Created` response code if the call succeeded.

```
POST /v2/expense_categories
```

Parameter | Type | Required | Description
--------- | ---- | -------- | -----------
`name` | string | required | The name of the expense category.
`unit_name` | string | optional | The unit name of the expense category.
`unit_price` | decimal | optional | The unit price of the expense category.
`is_active` | boolean | optional | Whether the expense category is active or archived. Defaults to `true`.

### Example Request
```bash
curl "https://api.harvestapp.com/v2/expense_categories" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (contact@email.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Other"}'
```

### Example Response
```json
{
  "id":4197514,
  "name":"Other",
  "unit_name":null,
  "unit_price":null,
  "is_active":true,
  "created_at":"2017-06-27T15:04:23Z",
  "updated_at":"2017-06-27T15:04:23Z"
}
```

## Update an expense category

Updates the specific expense category by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns an expense category object and a `200 OK` response code if the call succeeded.

```
PATCH /v2/expense_categories/{EXPENSE_CATEGORY_ID}
```

Parameter | Type | Description
--------- | ---- | -----------
`name` | string | The name of the expense category.
`unit_name` | string | The unit name of the expense category.
`unit_price` | decimal | The unit price of the expense category.
`is_active` | boolean | Whether the expense category is active or archived.

### Example Request
```bash
curl "https://api.harvestapp.com/v2/expense_categories/4197514" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (contact@email.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"is_active":false}'
```

### Example Response
```json
{
  "id":4197514,
  "name":"Other",
  "unit_name":null,
  "unit_price":null,
  "is_active":false,
  "created_at":"2017-06-27T15:04:23Z",
  "updated_at":"2017-06-27T15:04:58Z"
}
```

## Delete an expense category

Delete an expense category. Returns a `200 OK` response code if the call succeeded.

```
DELETE /v2/expense_categories/{EXPENSE_CATEGORY_ID}
```

### Example Request
```bash
curl "https://api.harvestapp.com/v2/expense_categories/4197514" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (contact@email.com)" \
  -X DELETE
```