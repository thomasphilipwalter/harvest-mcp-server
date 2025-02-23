# Invoices

## The Invoice Object

### Attributes:
- id (integer): Unique ID for the invoice
- client (object): Client ID and name
- line_items (array): Array of invoice line items
- estimate (object): Associated estimate ID
- retainer (object): Associated retainer ID
- creator (object): Creator's ID and name
- client_key (string): Used for public invoice URL
- number (string): Invoice number
- purchase_order (string): PO number
- amount (decimal): Total amount including taxes/discounts
- due_amount (decimal): Amount currently due
- tax (decimal): Tax percentage
- tax_amount (decimal): Calculated tax amount
- tax2 (decimal): Second tax percentage
- tax2_amount (decimal): Calculated second tax amount
- discount (decimal): Discount percentage
- discount_amount (decimal): Calculated discount amount
- subject (string): Invoice subject
- notes (string): Additional notes
- currency (string): Currency code
- state (string): Status (draft, open, paid, closed)
- period_start (date): Start of billing period
- period_end (date): End of billing period
- issue_date (date): Date issued
- due_date (date): Date due
- payment_term (string): Payment terms 
- payment_options (array): Payment methods enabled
- sent_at (datetime): When sent
- paid_at (datetime): When paid
- paid_date (date): Date paid
- closed_at (datetime): When closed
- recurring_invoice_id (integer): Associated recurring invoice ID
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

### Line Item Object
- id (integer): Unique ID for line item
- project (object): Associated project details
- kind (string): Item category name
- description (string): Line item description
- quantity (decimal): Unit quantity
- unit_price (decimal): Price per unit
- amount (decimal): Line total (quantity * unit_price)
- taxed (boolean): Whether tax applies
- taxed2 (boolean): Whether second tax applies

## Required Permissions

Administrator or Manager with invoice permissions required.

## Available Endpoints

### List All Invoices
```
GET /v2/invoices
```

Parameters:
- client_id (integer): Filter by client
- project_id (integer): Filter by project
- updated_since (datetime): Filter by update date
- from (date): Filter by issue date start
- to (date): Filter by issue date end
- state (string): Filter by state
- per_page (integer): Records per page (1-2000)

### Retrieve an Invoice
```
GET /v2/invoices/{INVOICE_ID}
```

### Create a Free-form Invoice
```
POST /v2/invoices
```

Required Parameters:
- client_id (integer)

Optional Parameters:
- retainer_id (integer)
- estimate_id (integer)
- number (string)
- purchase_order (string)
- tax (decimal)
- tax2 (decimal)
- discount (decimal)
- subject (string)
- notes (string)
- currency (string)
- issue_date (date)
- due_date (date)
- payment_term (string)
- payment_options (array)
- line_items (array)

### Create an Invoice from Time/Expenses
```
POST /v2/invoices
```

Additional Parameters for Import:
- line_items_import (object):
  - project_ids (array)
  - time (object):
    - summary_type (string)
    - from/to (date)
  - expenses (object):
    - summary_type (string)
    - from/to (date)
    - attach_receipts (boolean)

### Update an Invoice
```
PATCH /v2/invoices/{INVOICE_ID}
```
Accepts all create parameters

### Delete an Invoice
```
DELETE /v2/invoices/{INVOICE_ID}
```

### Line Items Management

#### Create Line Item
```
PATCH /v2/invoices/{INVOICE_ID}
```
With line_items array containing new items

#### Update Line Item 
```
PATCH /v2/invoices/{INVOICE_ID}
```
With line_items array containing item ID and updates

#### Delete Line Item
```
PATCH /v2/invoices/{INVOICE_ID}
```
With line_items array containing item ID and _destroy:true