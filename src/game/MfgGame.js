
    /*****************************************************************************
    *   Manages the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgGame = new Object();
    {
        /*****************************************************************************
        *   Resets the game setup.
        *****************************************************************************/
        MfgGame.initNewGame = function()
        {
            MfgLevel.initLevel();
        };

        /*****************************************************************************
        *   Calculates the game logic for one tick.
        *****************************************************************************/
        MfgGame.tick = function()
        {
        };

        /*****************************************************************************
        *   Handles the keys for the game logic.
        *****************************************************************************/
        MfgGame.handleKeys = function()
        {
            //handle player's keys
            MfgLevel.current.player.handlePlayerKeys();
        };

        /*****************************************************************************
        *   Draws the current game frame.
        *****************************************************************************/
        MfgGame.draw = function()
        {
            //update camera
            var camera = MfgCamera.updateCamera();

            //clear screen
            MfgDrawing.fillRect( MfgCanvas.CONTEXT, 0, 0, MfgCanvas.WIDTH, MfgCanvas.HEIGHT, "rgb( 255, 255, 255 )" );

            //draw bg
            MfgLevel.current.drawLevelBg( camera );

            //draw level
            MfgLevel.current.drawLevelFg( camera );

            //draw player
            MfgLevel.current.player.block.drawBlock( camera );
        };
    }
