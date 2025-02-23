# Estimate Item Categories

Admin permissions required.

## The Estimate Item Category Object

### Attributes:
- id (integer): Unique ID for the category
- name (string): Category name
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

## Available Endpoints

### List All Categories
```
GET /v2/estimate_item_categories
```

Parameters:
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Retrieve a Category
```
GET /v2/estimate_item_categories/{ESTIMATE_ITEM_CATEGORY_ID}
```

### Create a Category
```
POST /v2/estimate_item_categories
```

Required Parameters:
- name (string): Category name

### Update a Category
```
PATCH /v2/estimate_item_categories/{ESTIMATE_ITEM_CATEGORY_ID}
```

Updateable Parameters:
- name (string): Category name

### Delete a Category
```
DELETE /v2/estimate_item_categories/{ESTIMATE_ITEM_CATEGORY_ID}
```

## Example Response

```json
{
  "id": 1378704,
  "name": "Product",
  "created_at": "2017-06-26T20:41:00Z",
  "updated_at": "2017-06-26T20:41:00Z"
}