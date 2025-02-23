# Estimate Messages

## The Estimate Message Object

### Attributes:
- id (integer): Unique ID for the message
- sent_by (string): Name of the user that created the message
- sent_by_email (string): Email of the user that created the message
- sent_from (string): Name of the user that the message was sent from
- sent_from_email (string): Email of the user that message was sent from
- recipients (array): Array of message recipients
- subject (string): The message subject
- body (string): The message body
- send_me_a_copy (boolean): Whether to email copy to current user
- event_type (string): Type of estimate event (send, accept, decline, re-open, view, invoice)
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

### Message Recipient Object
- name (string): Name of the message recipient
- email (string): Email of the message recipient

## Required Permissions

Administrator or Manager with estimate permissions required.

## Available Endpoints

### List Messages for an Estimate
```
GET /v2/estimates/{ESTIMATE_ID}/messages
```

Parameters:
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Create a Message
```
POST /v2/estimates/{ESTIMATE_ID}/messages
```

Required Parameters:
- recipients (array): Array of recipient objects

Optional Parameters:
- subject (string): Message subject
- body (string): Message body
- send_me_a_copy (boolean): Send copy to current user
- event_type (string): Estimate event type

### Delete a Message
```
DELETE /v2/estimates/{ESTIMATE_ID}/messages/{MESSAGE_ID}
```

### Mark Draft as Sent
```
POST /v2/estimates/{ESTIMATE_ID}/messages
```
With event_type: "send"

### Mark as Accepted
```
POST /v2/estimates/{ESTIMATE_ID}/messages
```
With event_type: "accept"

### Mark as Declined
```
POST /v2/estimates/{ESTIMATE_ID}/messages
```
With event_type: "decline"

### Re-open Closed Estimate
```
POST /v2/estimates/{ESTIMATE_ID}/messages
```
With event_type: "re-open"

## Example Response

```json
{
  "id": 2666240,
  "sent_by": "Bob Powell",
  "sent_by_email": "bob@example.com",
  "sent_from": "Bob Powell",
  "sent_from_email": "bob@example.com",
  "send_me_a_copy": true,
  "created_at": "2017-08-25T21:27:52Z",
  "updated_at": "2017-08-25T21:27:52Z",
  "recipients": [
    {
      "name": "Richard Roe",
      "email": "richard@example.com"
    },
    {
      "name": "Bob Powell",
      "email": "bob@example.com"
    }
  ],
  "event_type": null,
  "subject": "Estimate #1001",
  "body": "Here is our estimate."
}