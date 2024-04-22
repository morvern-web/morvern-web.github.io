# morvern

This is a simple, static website with no database, CPanel, etc.

Our version of a database is the [content folder](https://github.com/morvern-web/test/tree/main/src/content).


## Contributing

If you do not have a github account, create one.

Find the file you wish to update in the content folder, and click the edit button in the top-right corner.
![Edit button](./docs-1.png)

Make your edits to that file in the browser. You can copy/paste an existing entry if you wish to.


### Formatting entries

For 'news' entries - The 'date' field represents the date that the news will go live on the site.

For 'live' entries - The 'date' field represents the date of the event. The 'announced' field represents the date that the entry will go live on the site.

For each of these, you can set a specific time if you wish, e.g. setting "2024-10-17 09:00:00" will make that entry go live at 9am GMT on that date.

If it is set to be a date without a time, e.g. "2024-10-17", the entry will go live at midnight GMT on that date.


### Committing changes

Once you're finished, click the 'Commit changes' button.
![Commit changes](./docs-2.png)

In the following popup, select 'Create a new branch for this commit'.
![Create a new branch](./docs-3.png)

Feel free to edit the message and description fields, though this is not necessary.

Click the 'Propose changes' button at the bottom of the popup.
![Propose changes](./docs-4.png)

Finally, on the follwing screen click the 'Create pull request' button.
![Create pull request](./docs-5.png)

That's it!
I will then review the changes and merge them into the main branch ready to be published.