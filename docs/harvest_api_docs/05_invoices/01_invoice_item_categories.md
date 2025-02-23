# Invoice Item Categories

Admin or Project Manager permissions required.

## The Invoice Item Category Object

### Attributes:
- id (integer): Unique ID for the invoice item category
- name (string): The name of the invoice item category
- use_as_service (boolean): Whether used for billable hours when generating an invoice
- use_as_expense (boolean): Whether used for expenses when generating an invoice
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

## Available Endpoints

### List All Invoice Item Categories
```
GET /v2/invoice_item_categories
```

Parameters:
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Retrieve an Invoice Item Category
```
GET /v2/invoice_item_categories/{INVOICE_ITEM_CATEGORY_ID}
```

### Create an Invoice Item Category
```
POST /v2/invoice_item_categories
```

Required Parameters:
- name (string): Category name

### Update an Invoice Item Category
```
PATCH /v2/invoice_item_categories/{INVOICE_ITEM_CATEGORY_ID}
```

Updateable Parameters:
- name (string): Category name

### Delete an Invoice Item Category
```
DELETE /v2/invoice_item_categories/{INVOICE_ITEM_CATEGORY_ID}
```
Only possible if both `use_as_service` and `use_as_expense` are false.

## Example Response

```json
{
  "id": 1466293,
  "name": "Product",
  "use_as_service": false,
  "use_as_expense": true,
  "created_at": "2017-06-26T20:41:00Z",
  "updated_at": "2017-06-26T20:41:00Z"
}