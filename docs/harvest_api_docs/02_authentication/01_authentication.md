# Authentication

The V2 API supports two authentication methods:

## Personal Access Tokens

- Quickest way to start using the API
- Created in the Developers section of Harvest ID
- Provides token and account IDs
- Best for personal scripts and automation
- Has full 'all' scope access by default

### Using Personal Access Token:

1. Header Authentication:
```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Harvest-Account-Id: $ACCOUNT_ID" \
     -H "User-Agent: MyApp (email@example.com)" \
     https://api.harvestapp.com/v2/users/me
```

2. Query String Authentication:
```bash
curl -H "User-Agent: MyApp (email@example.com)" \
     "https://api.harvestapp.com/v2/users/me?access_token=$ACCESS_TOKEN&account_id=$ACCOUNT_ID"
```

## OAuth2 Authentication

For building integrations that other users can use. Requires registering an OAuth2 Application with:
- Name
- Redirect URL
- Multi Account setting
- Product scope (Harvest, Forecast, or both)

### OAuth2 Authorization Flows:

1. Server-side Applications (Authorization Code flow):
- Redirect user to: https://id.getharvest.com/oauth2/authorize?client_id={CLIENT_ID}&response_type=code
- Exchange authorization code for tokens
- Use refresh token to get new access token when needed

2. Client-side Applications (Implicit Grant flow):
- Redirect user to: https://id.getharvest.com/oauth2/authorize?client_id={CLIENT_ID}&response_type=token
- Receives access token directly
- No refresh token provided

## Scopes

Available scopes:
- harvest:{ACCOUNT_ID} - access to specific Harvest account
- forecast:{ACCOUNT_ID} - access to specific Forecast account
- harvest:all - access to all Harvest accounts
- forecast:all - access to all Forecast accounts
- all - access to all accounts

## Account Access

Check accessible accounts using:
```bash
GET https://id.getharvest.com/api/v2/accounts
```

Returns user info and list of accessible accounts with their IDs and products.