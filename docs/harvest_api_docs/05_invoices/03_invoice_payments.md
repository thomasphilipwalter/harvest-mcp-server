# Invoice Payments

## The Invoice Payment Object

### Attributes:
- id (integer): Unique ID for the payment
- amount (decimal): The amount of the payment
- paid_at (datetime): Date and time the payment was made
- paid_date (date): Date the payment was made
- recorded_by (string): Name of person who recorded payment
- recorded_by_email (string): Email of person who recorded payment
- notes (string): Any notes associated with the payment
- transaction_id (string): Card authorization or PayPal transaction ID
- payment_gateway (object): Payment gateway ID and name
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

## Required Permissions

Administrator or Manager with invoice permissions required.

## Available Endpoints

### List Payments for an Invoice
```
GET /v2/invoices/{INVOICE_ID}/payments
```

Parameters:
- updated_since (datetime): Filter by update date
- per_page (integer): Records per page (1-2000)

### Create a Payment
```
POST /v2/invoices/{INVOICE_ID}/payments
```

Required Parameters:
- amount (decimal): Payment amount

Optional Parameters:
- paid_at (datetime): Payment timestamp (use either paid_at or paid_date)
- paid_date (date): Payment date (use either paid_at or paid_date)
- notes (string): Payment notes
- send_thank_you (boolean): Send thank you email if invoice will be fully paid

### Delete a Payment
```
DELETE /v2/invoices/{INVOICE_ID}/payments/{PAYMENT_ID}
```

## Example Response

```json
{
  "id": 10336386,
  "amount": 1575.86,
  "paid_at": "2017-07-24T13:32:18Z",
  "paid_date": "2017-07-24",
  "recorded_by": "Jane Bar",
  "recorded_by_email": "jane@example.com",
  "notes": "Paid by phone",
  "transaction_id": null,
  "created_at": "2017-07-28T14:42:44Z",
  "updated_at": "2017-07-28T14:42:44Z",
  "payment_gateway": {
    "id": null,
    "name": null
  }
}