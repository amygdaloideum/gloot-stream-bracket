# G-loot stream bracket

Showing tournament brackets on stream

## Get started
* open a terminal in the root of this project.
* install dependencies (only needed once): `npm i`
* start hosting server: `npm run dev`
* open a new terminal and start the socket server: `node socket-server`

## Usage
There are three routes on the webpage:
* `localhost:5001`: shows the bracket
* `localhost:5001/admin`: the admin interface
* `localhost:5001/contenders`: show the name plates when prompted

### Show name plates
* Show `localhost:5001/contenders` on the stream with custom css `html { background: none}`.
* In a separate browser `localhost:5001/admin` and type in the names that should show.
* The plates will now show on the stream.

### Edit bracket
* Show `localhost:5001` on the stream with custom css `html { background: none}`.
* In an editor of your choice, edit the js-object in `src/containers/bracket/bracket.js`
* When you save the changes the bracket will update automatically.