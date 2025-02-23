# Client Contacts

## The Contact Object

### Attributes:
- id (integer): Unique ID for the contact
- client (object): Object containing client id and name
- title (string): Contact's title
- first_name (string): Contact's first name
- last_name (string): Contact's last name 
- email (string): Email address
- phone_office (string): Office phone number
- phone_mobile (string): Mobile phone number
- fax (string): Fax number
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

## Required Permissions

Administrator or Manager with permission to create and edit clients.

## Endpoints

### List All Contacts
```
GET /v2/contacts
```

Parameters:
- client_id (integer): Filter by client
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Retrieve a Contact
```
GET /v2/contacts/{CONTACT_ID}
```

### Create a Contact
```
POST /v2/contacts
```

Required Parameters:
- client_id (integer)
- first_name (string)

Optional Parameters:
- title (string)
- last_name (string)
- email (string)
- phone_office (string)
- phone_mobile (string)
- fax (string)

### Update a Contact
```
PATCH /v2/contacts/{CONTACT_ID}
```

Updateable Parameters:
- All create parameters

### Delete a Contact 
```
DELETE /v2/contacts/{CONTACT_ID}
```

## Example Response

```json
{
  "id": 4706479,
  "title": "Owner",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "phone_office": "(203) 697-8885",
  "phone_mobile": "(203) 697-8886",
  "fax": "(203) 697-8887",
  "created_at": "2017-06-26T21:20:07Z",
  "updated_at": "2017-06-26T21:27:07Z",
  "client": {
    "id": 5735774,
    "name": "ABC Corp"
  }
}