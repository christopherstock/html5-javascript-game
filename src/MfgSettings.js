
    /*****************************************************************************
    *   Specifies all adjustments and balancing for the application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgSettings = new Object();
    {
        /** @type {number} The delay in ms between each thread tick. */
        MfgSettings.THREAD_DELAY                                    = 25;
    
        /** @type {number} Determines the app's operation mode. */
        MfgSettings.MODE                                            = MfgDebug.MODE_DEBUG;
        
        /** @type {string} The current program version. */
        MfgSettings.VERSION                                         = "1.0";
        /** @type {string} The application's internal name. */
        MfgSettings.TITLE                                           = "HTML5 Javascript MfgGame, (c) 2014 Mayflower GmbH";

        /** @type {number} The desired canvas width. */
        MfgSettings.CANVAS_WIDTH                                    = 1000;
        /** @type {number} The desired canvas height. */
        MfgSettings.CANVAS_HEIGHT                                   = 600;

        /** @type {number} The horizontal camera centering ratio. */
        MfgSettings.RATIO_CENTERING_X                               = 2;
        /** @type {number} The vertical camera centering ratio. */
        MfgSettings.RATIO_CENTERING_Y                               = 2;

        /** @type {number} The player's speed in pixels per tick. */
        MfgSettings.PLAYER_SPEED_WALKING_X                          = 15;

        /** @type {number} The alpha value for the background. */
        MfgSettings.BG_BLENDING                                     = 0.75;
        
        /** @type {string} The relative path where all images the app makes use of reside. */
        MfgSettings.PATH_IMAGE                                      = "images/desktop/";

        /** @type {boolean} Specifies if a debug rect shall be drawn over the player */
        MfgSettings.DRAW_DEBUG_RECTS                                = true;
    }
