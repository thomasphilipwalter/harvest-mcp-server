# Tasks

## The task object

Attribute | Type | Description
--------- | ---- | -----------
`id` | integer | Unique ID for the task.
`name` | string | The name of the task.
`billable_by_default` | boolean | Used in determining whether default tasks should be marked billable when creating a new project.
`default_hourly_rate` | decimal | The hourly rate to use for this task when it is added to a project.
`is_default` | boolean | Whether this task should be automatically added to future projects.
`is_active` | boolean | Whether this task is active or archived.
`created_at` | datetime | Date and time the task was created.
`updated_at` | datetime | Date and time the task was last updated.

## Required permissions

You must be an Administrator or Manager with permission to create and edit tasks in order to interact with the