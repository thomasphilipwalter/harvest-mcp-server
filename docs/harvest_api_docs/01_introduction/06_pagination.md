# Pagination

Most requests that return multiple records are paginated. The response includes:
- A `links` section with URLs to retrieve the `first`, `next`, `previous`, and `last` pages
- Metadata values for `page`, `total_pages`, `total_entries`, `next_page`, and `previous_page`

For cursor-based pagination, `page`, `next_page`, and `previous_page` will be `null` except for first and last pages.

**Note:** Always use the pagination URLs provided in the `links` section instead of constructing pagination links manually.

## Pagination Parameters

Paginated endpoints support these optional parameters:

### per_page
- Controls number of records per page
- Default and maximum: 2000
- If not specified, returns maximum records
- Values larger than maximum return 422 error

### page or cursor
- Indicates which page of records to return
- Mutually exclusive - don't use together
- `cursor` takes precedence if both provided
- Avoid using directly - use `links` URLs instead

## Example Paginated Response

First page request:
```
GET /v2/clients
```

Response:
```json
{
  "clients": [
    "{2000 client objects}"
  ],
  "page": 1,
  "total_pages": 3,
  "total_entries": 257,
  "next_page": 2,
  "previous_page": null,
  "links": {
    "first": "https://api.harvestapp.com/v2/clients?page=1&per_page=2000&ref=first",
    "next": "https://api.harvestapp.com/v2/clients?cursor=eyJhZnRlciI6eyJpZCI6MzAwN319&per_page=2000&ref=next_cursor",
    "previous": null,
    "last": "https://api.harvestapp.com/v2/clients?page=3&per_page=2000&ref=last"
  }
}
```

Second page request (using `next` URL from links):
```
GET /v2/clients?cursor=eyJhZnRlciI6eyJpZCI6MzAwN319&per_page=2000&ref=next_cursor
```

Last page response:
```json
{
  "clients": [
    "{57 client objects}"
  ],
  "page": 3,
  "total_pages": 3, 
  "total_entries": 257,
  "next_page": null,
  "previous_page": 2,
  "links": {
    "first": "https://api.harvestapp.com/v2/clients?page=1&per_page=2000&ref=first",
    "next": null,
    "previous": "https://api.harvestapp.com/v2/clients?page=4&per_page=2000&ref=previous",
    "last": "https://api.harvestapp.com/v2/clients?page=3&per_page=2000&ref=last"
  }
}