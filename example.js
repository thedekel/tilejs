/* create a new tile.js instance */

var mytile = new Tilejs();

/* setup screens */

mytile.setScreens([{width:1920, height:1080, name:'screen1'}, 
                   {width:1920, height:1080, name:'screen2'}]);

/* set up workspaces number and their label */
mytile.setWorkspaces(["internet", "development", "2", "3", "4", 
                      "5", "6", "7", "email", "music"]);

/* set required functions */
mytile.setFunctions({
  setSize:function(win, newdim){
    /* this function receives a window object and a dimension object as
     * {w:Nnteger, h:Nnteger}. the function needs to call the appropriate
     * code to find and change the size of the window
     */
    getWindow(win).setSize(newdim); //
    console.log("window object: " + win + ", size changed to: " +
      newdim.w + "x" + newdim.h);
  },
  setPosition:function(win, newpos){
    /* this function receives a window object and a position object as
     * {x:Number, y:Number}. the function needs to call the appropriate
     * code to find and change the top-left position of the window
     */
    getWindow(win).setPosition(newpos); //
    console.log("window object: " + win + ", position changed to: (" +
      newpos.x + ", " + newpos.y+")");
  },
  focusWindow:function(win){
    /* this function receives a window object. the function needs to make
     * that window the currently focused window if relevant
     */
    getWindow(win).focusWindow();
    console.log("window object: " + win + " is now focused!");
  },
  closeWindow: function(win){
    /* this function recieves a window object. The function will need to 
     * close the window. Note, that this function doesn't internally tell
     * tile.js that the window is removed, you will need to call 
     * mytile.windowClosed(win.id)
     */
    getWindow(win).destroy();
    console.log("window object: " + win + " has been closed");
  }});
});

/* set event handler */
/* note, `base` is not a real thing, I'm just using it as an example event
 * emitter. In order for tile.js to work correctly, the proper event handlers
 * need to be set for whenever a new `window` is created so that the module
 * knows how to modify the abstract display so you will need to modify these
 * functions to work with whatever platform you're on.
 */
base.onNewWindow = function(e){
  /* whatever you're using tile.js with will hopefully provide some api for
   * triggering an event when a new `window` is created. You should use the
   * event information (or some dirty polling and comparisons) to create a
   * new window element which will be passed into the functions used with
   * mytile.setFunctions(). The window object only needs to have a unique `id`
   * but all information passed here will be passed into the functions defined 
   * by `mytile.setFunctions()`.
   */
  var newWin = {
    id: e.window.id, //make sure this is unique! and comparable, preferably a 
                     //Number or a string
    /* Functions can be passed as values of a window. In this case, the function
     * will be invoked with `this` as the window object
     */
    title: function(){
      return getWindow(this).getTitle();
    },
    program: getProcessById(e.window.processid).title
  };
  /* the next line is the important part, you need to call 
   * mytile.createNewWindow() with the object you created. Note again that
   * tile.js doesn't actually use the data you placed in the newWin except from
   * id, it justs passes it as it is (after invoking functions if any)
   * to the methods defined in mytile.setFunctions()
   */
  mytile.createNewWindow(newWin);
};

base.onWindowClose = function(e){
  /* this function demonstrates how to let tile.js know that a window has been
   * closed. Note that in many implementation this function will be called even
   * when tile.js is the cause a window has been closed. It's still required since
   * tile.js wouldn't adjust the other windows until it is notified that the window
   * is closed through this function.
   */
  mytil.windowClosed(e.window.id);
};
