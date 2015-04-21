
    /*****************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO ASAP   Refactor MfgLevel!
    *   TODO ASAP   Refactor MfgPlayer!
    *   TODO ASAP   Outsource all RGB color values!
    *   TODO HIGH   Documentation AND typing for all variables and methods!
    *   TODO INIT   Prune contents of THIS class?
    *   TODO LOW    Complete PHPStorm - documentation for ALL variables and methods! {} !
    *   TODO WEAK   Solve code inspection.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var Mfg = new Object();
    {
        /** @type {boolean} Flags if the app has been terminated. */
        Mfg.destroyed                                   = false;

        /*****************************************************************************
        *   This method is invoked when the application starts. 
        *****************************************************************************/
        Mfg.start = function()
        {
            //acclaim
            MfgDebug.acclaim.log( MfgSettings.TITLE );

            //init canvas
            var success = MfgCanvas.init();
            if ( success )
            {
                //order preloader pics
                MfgImage.loadAllImages();
            }
        };

        /*****************************************************************************
        *   This method is invoked when all images are loaded
        *   and will initialize the remaining stuff. 
        *****************************************************************************/
        Mfg.initWhenImagesAreComplete = function()
        {
            //attach listeners for keys and pointer
            MfgKey.init();
            
            //init new game
            MfgGame.initNewGame();
    
            //start main thread
            window.setTimeout( Mfg.tick, MfgSettings.THREAD_DELAY );
        };

        /*****************************************************************************
        *   This method is invoked when the application ends. 
        *****************************************************************************/
        Mfg.terminate = function()
        {
            Mfg.destroyed = true;
        };

        /*****************************************************************************
        *   The method for the main thread.
        *****************************************************************************/
        Mfg.tick = function()
        {
            //handle keys
            MfgGame.handleKeys();

            //ticker state
            MfgGame.tick();

            //paint state
            MfgGame.draw();
            
            //restart this tick if the app has not been destroyed
            if ( !Mfg.destroyed )
            {
                window.setTimeout( Mfg.tick, MfgSettings.THREAD_DELAY );
            }
        };
    }

    /*****************************************************************************
    *   This is the application's point of entry.
    *****************************************************************************/
    window.onload   = Mfg.start;

    /*****************************************************************************
    *   This is the application's point of termination.
    *****************************************************************************/
    window.onunload = Mfg.terminate;
