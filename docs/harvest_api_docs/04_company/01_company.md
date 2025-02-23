# Company

Admin permissions required for all company endpoints.

## The Company Object

### Attributes:
- base_uri (string): The Harvest URL for the company
- full_domain (string): The Harvest domain
- name (string): Company name
- is_active (boolean): Active/archived status
- week_start_day (string): Start of week (Saturday/Sunday/Monday)
- wants_timestamp_timers (boolean): Time tracking method
- time_format (string): decimal or hours_minutes
- date_format (string): Date display format
- plan_type (string): trial, free, or plan name
- clock (string): 12h or 24h
- currency_code_display (string): Currency code display setting
- currency_symbol_display (string): Currency symbol display setting
- decimal_symbol (string): Decimal formatting symbol
- thousands_separator (string): Number formatting separator
- color_scheme (string): Web client color scheme
- weekly_capacity (integer): Weekly capacity in seconds
- expense_feature (boolean): Expense module status
- invoice_feature (boolean): Invoice module status
- estimate_feature (boolean): Estimate module status
- approval_feature (boolean): Approval module status
- team_feature (boolean): Team module status

## Available Endpoints

### Retrieve Company Info
```
GET /v2/company
```

Returns company object for authenticated user.

### Update Company Settings
```
PATCH /v2/company
```

#### Updateable Parameters:
- wants_timestamp_timers (boolean)
- weekly_capacity (integer)

## Example Response

```json
{
  "base_uri": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com",
  "full_domain": "{ACCOUNT_SUBDOMAIN}.harvestapp.com",
  "name": "API Examples",
  "is_active": true,
  "week_start_day": "Monday",
  "wants_timestamp_timers": true,
  "time_format": "hours_minutes",
  "date_format": "%Y-%m-%d",
  "plan_type": "sponsored",
  "expense_feature": true,
  "invoice_feature": true,
  "estimate_feature": true,
  "approval_feature": true,
  "clock": "12h",
  "currency_code_display": "iso_code_none",
  "currency_symbol_display": "symbol_before",
  "decimal_symbol": ".",
  "thousands_separator": ",",
  "color_scheme": "orange",
  "weekly_capacity": 126000
}