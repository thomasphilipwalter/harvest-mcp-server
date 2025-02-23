# Estimates

## The Estimate Object

### Attributes:
- id (integer): Unique ID for the estimate
- client (object): Client ID and name
- line_items (array): Array of estimate line items
- creator (object): Creator's ID and name
- client_key (string): Used for public web invoice URL
- number (string): Estimate number
- purchase_order (string): PO number
- amount (decimal): Total amount including taxes/discounts
- tax (decimal): Tax percentage
- tax_amount (decimal): Calculated tax amount
- tax2 (decimal): Second tax percentage
- tax2_amount (decimal): Calculated second tax amount
- discount (decimal): Discount percentage
- discount_amount (decimal): Calculated discount amount
- subject (string): Estimate subject
- notes (string): Additional notes
- currency (string): Currency code
- state (string): Status (draft, sent, accepted, declined)
- issue_date (date): Date issued
- sent_at (datetime): When sent
- accepted_at (datetime): When accepted
- declined_at (datetime): When declined
- created_at (datetime): Creation timestamp
- updated_at (datetime): Last update timestamp

### Line Item Object
- id (integer): Unique ID for line item
- kind (string): Item category name
- description (string): Line item description
- quantity (integer): Unit quantity
- unit_price (decimal): Price per unit
- amount (decimal): Line total (quantity * unit_price)
- taxed (boolean): Whether tax applies
- taxed2 (boolean): Whether second tax applies

## Required Permissions

Administrator or Manager with estimate permissions required.

## Available Endpoints

### List All Estimates
```
GET /v2/estimates
```

Parameters:
- client_id (integer): Filter by client
- updated_since (datetime): Filter by update date
- from (date): Filter by issue date start
- to (date): Filter by issue date end
- state (string): Filter by state
- per_page (integer): Records per page (1-2000)

### Retrieve an Estimate
```
GET /v2/estimates/{ESTIMATE_ID}
```

### Create an Estimate
```
POST /v2/estimates
```

Required Parameters:
- client_id (integer)

Optional Parameters:
- number (string)
- purchase_order (string)
- tax (decimal)
- tax2 (decimal)
- discount (decimal)
- subject (string)
- notes (string)
- currency (string)
- issue_date (date)
- line_items (array)

### Update an Estimate
```
PATCH /v2/estimates/{ESTIMATE_ID}
```
Accepts all create parameters

### Delete an Estimate
```
DELETE /v2/estimates/{ESTIMATE_ID}
```

### Line Items Management

#### Create Line Item
```
PATCH /v2/estimates/{ESTIMATE_ID}
```
With line_items array containing new items

#### Update Line Item
```
PATCH /v2/estimates/{ESTIMATE_ID}
```
With line_items array containing item ID and updates

#### Delete Line Item
```
PATCH /v2/estimates/{ESTIMATE_ID}
```
With line_items array containing item ID and _destroy:true