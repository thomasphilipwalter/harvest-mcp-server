# Invoice Messages

## The Invoice Message Object

### Attributes:
- id (integer): Unique ID for the message
- sent_by (string): Name of the user that created the message
- sent_by_email (string): Email of the user that created the message
- sent_from (string): Name of the user that the message was sent from
- sent_from_email (string): Email of the user that message was sent from
- recipients (array): Array of message recipients
- subject (string): The message subject
- body (string): The message body
- include_link_to_client_invoice (boolean): DEPRECATED - True when payment_options assigned
- attach_pdf (boolean): Whether to attach invoice PDF to email
- send_me_a_copy (boolean): Whether to email copy to current user
- thank_you (boolean): Whether this is a thank you message
- event_type (string): Type of invoice event (close, draft, re-open, send)
- reminder (boolean): Whether this is a reminder message
- send_reminder_on (date): Date reminder email will be sent
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

### Message Recipient Object
- name (string): Name of the message recipient
- email (string): Email of the message recipient

## Required Permissions

Administrator or Manager with invoice permissions required.

## Available Endpoints

### List Messages for an Invoice
```
GET /v2/invoices/{INVOICE_ID}/messages
```

Parameters:
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Create and Send Message
```
POST /v2/invoices/{INVOICE_ID}/messages
```

Parameters:
- recipients (array): Array of recipient objects
- subject (string): Message subject
- body (string): Message body
- attach_pdf (boolean): Attach PDF to email
- send_me_copy (boolean): Send copy to current user
- thank_you (boolean): Is thank you message
- event_type (string): Invoice event type

### Get Message Template
```
GET /v2/invoices/{INVOICE_ID}/messages/new
```

Parameters:
- thank_you (boolean): Get thank you message template
- reminder (boolean): Get reminder message template

### Delete Message
```
DELETE /v2/invoices/{INVOICE_ID}/messages/{MESSAGE_ID}
```

### Mark Draft as Sent
```
POST /v2/invoices/{INVOICE_ID}/messages
```
With event_type: "send"

### Mark as Closed
```
POST /v2/invoices/{INVOICE_ID}/messages
```
With event_type: "close"

### Re-open Closed Invoice
```
POST /v2/invoices/{INVOICE_ID}/messages
```
With event_type: "re-open"

### Mark as Draft
```
POST /v2/invoices/{INVOICE_ID}/messages
```
With event_type: "draft"

## Example Response

```json
{
  "id": 27835324,
  "sent_by": "Bob Powell",
  "sent_by_email": "bob@example.com",
  "sent_from": "Bob Powell",
  "sent_from_email": "bob@example.com",
  "include_link_to_client_invoice": false,
  "send_me_a_copy": true,
  "thank_you": false,
  "reminder": false,
  "send_reminder_on": null,
  "created_at": "2017-08-23T22:25:59Z",
  "updated_at": "2017-08-23T22:25:59Z",
  "attach_pdf": true,
  "event_type": null,
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
  "subject": "Invoice #1001",
  "body": "The invoice is attached below."
}