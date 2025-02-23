# Postman Collection

## Introduction

We've created a collection in Postman that allows you to easily try out and experiment with various API requests. To get started, all you have to do is import the collection into your Postman workspace and set up the authorization variables.

## Importing the Collection

Importing the collection is easy; simply click the **Run in Postman** button in the Harvest documentation and the collection will be imported into your active workspace.

**Note:** You only need to import the collection once.

## Authorization

The Postman collection uses environment variables for authorization. That allows you to enter your account ID and access token in one location, rather than having to do it for each request.

To set up your authorization variables:

1. Click the ellipsis (...) next to the collection's name
2. Select "Edit" from the dropdown
3. From the "Variables" tab, replace the values for:
   - HARVEST_ACCOUNT_ID
   - Bearer ACCESS_TOKEN
4. Click "Update" at the bottom

## Running a Request

1. Some requests require additional parameters:
   - Required parameters show a checked box
   - Optional parameters are grayed out
2. Fill in necessary parameters
3. Click "Send" to execute the request

The response will be displayed in JSON format in the response pane.
