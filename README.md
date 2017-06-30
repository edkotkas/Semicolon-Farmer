# Semicolon-Farmer
Collect all your wild semicolons neatly in a farm!

## Usage:
// TODO: Add this.

This will automatically scan all the files in the current directory and remove the semicolons from the project (as appropriately as it can).

It will remove any semicolon that matches this regex:
```regex
/;+(?!.)/g
```