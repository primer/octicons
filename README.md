# Octicons

## Adding/Updating an icon

Open up the [octicons-master.sketch file](). Edit the slice you want to update, or add a new one. Save the file. If you've added a new icon, you'll need to add a new entry and keywords for it in the `data.json` file. Run `npm run build`. This will export the octicons from the sketch file, minify them, and output into `lib/*/build/svg` directories.
