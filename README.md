# Semicolon-Farmer
Collect all your wild semicolons neatly in a farm!

## Usage:

Store the app.js (rename it if you want) file in your project and run it.
```cli
node app.js 
```
This will automatically scan all the files in the current directory and remove the semicolons from the project (as appropriately as it can).

It will remove any semicolon that matches this regex:
```regex
/;+(?!.)/g
```