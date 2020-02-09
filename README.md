# Memory Game Project

## Table of Contents

* [Structure](#structure)
* [Usage](#usage)

## Structure

The files were created from scratch without the Udacity starter kit. The project is structured into the files "javascript.js", "index.html" and "style.less" plus additional ressources such as images and icons. Functionality is found within "javascript.js" where code is structured into objects at the top and actions at the bottoms where the objects are used.

CSS was written using the preprocessor LESS which allows to use functionalities such as  variables and mixins.

## Usage

When the user opens the page, the available eight memory card pairs are shuffled and randomly displayed on the screen (upside down). The aim for the user is to find the matching pairs. In order to do so, he needs to start the memory game and turn around the first card and second card. If the two cards match, they stay open, otherwise they turn around again and the user continues by opening two new cards. Once all cards are found and open, a modal will open which will tell the user that the game is finished and gives him the possibility to start another game.

In the moment when the user turns around the first card, the timer starts and will record the time the user needs to complete the game. Along with the timer, each move (= turned around pairs) is counted and shown to the user in the top right corner. When the game begins, it is rated with five stars. The more moves the user needs to complete the game, the fewer stars will be left. After each eight move a star is removed. The modal which is shown once the game is finished contains the star rating and time of completion.
