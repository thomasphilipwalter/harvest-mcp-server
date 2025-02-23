# Clients

## The Client Object

### Attributes:
- id (integer): Unique ID for the client
- name (string): Client description
- is_active (boolean): Active or archived status
- address (string): Physical address
- statement_key (string): Used for invoice dashboard URL
- currency (string): Associated currency code
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

## Required Permissions

Administrator or Manager with client creation/editing permissions required.

## Endpoints

### List All Clients
```
GET /v2/clients
```

Parameters:
- is_active (boolean): Filter active/inactive clients
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Retrieve a Client
```
GET /v2/clients/{CLIENT_ID}
```

### Create a Client
```
POST /v2/clients
```

Required Parameters:
- name (string)

Optional Parameters:
- is_active (boolean)
- address (string)
- currency (string)

### Update a Client
```
PATCH /v2/clients/{CLIENT_ID}
```

Updateable Parameters:
- name
- is_active
- address
- currency

### Delete a Client
```
DELETE /v2/clients/{CLIENT_ID}
```
Only possible if client has no associated projects, invoices, or estimates.

## Example Response

```json
{
  "id": 5735776,
  "name": "123 Industries",
  "is_active": true,
  "address": "123 Main St.\r\nAnytown, LA 71223",
  "statement_key": "0a39d3e33c8058cf7c3f8097d854c64e",
  "created_at": "2017-06-26T21:02:12Z",
  "updated_at": "2017-06-26T21:34:11Z",
  "currency": "EUR"
}