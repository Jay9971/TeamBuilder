JS File Functions

server_functions: defines all the get and post functions, which are used to communicate with the server. Also initializes all the variables that will be used for server communication. Highly dependent on: player_interactions, game_grid.

game_grid: populates bank with all the images assigned to the player. Has a funcition that adds event listeners and styles each square according to what is on it. Has a function that runs whenever screen is resized to update the grid. The function that updates each individual square is called in server_functions in the game status loop.

player_interactions: has function for updating listbox based on playerList. Also has a function that is called when clear grid button is pressed, and clears the grid of player images. Resets to the image bank. Finally, has a function for the mic mute/unmute button with no actual functionality.

image_bank: has functions to create the image bank on the left. When called later in updateGame, it deletes and remakes the bank. Also has a function to update the font size of the image bank title, the button text, and the player list. Will eventually also update the text inside the player list.

adaptive_background: has a function that creates squares in the background and assigns them a random color. Independent of all other JS files.

adaptive_columns: functionality for splitting the screen into two columns if the screen is horizontal, and two rows if it is vertical. Also ensures that both containers are always squares. Independent.

foreground: creates rectangles in the foreground used for the intro/outro animation (intro animation has been disabled, and outro animation needs to be made). Independent.

