
    /*****************************************************************************
    *   The debug system, specifying switchable debug groups
    *   that generate output to the screen console.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgDebug = new Object();
    {
        /** @type {number} The debug constant that represents the 'RELEASE'-mode. */
        MfgDebug.MODE_RELEASE                               = 0;
        /** @type {number} The debug constant that represents the 'DEBUG'-mode. */
        MfgDebug.MODE_DEBUG                                 = 1;

        /** @type {MfgDebug} The debug group for acclaiming messages. */
        MfgDebug.acclaim                                    = new MfgDebug( true    );
        /** @type {MfgDebug} The debug group for the image system. */
        MfgDebug.image                                      = new MfgDebug( true    );
        /** @type {MfgDebug} The debug group for the key system. */
        MfgDebug.key                                        = new MfgDebug( true    );
        /** @type {MfgDebug} The debug group for the canvas system. */
        MfgDebug.canvas                                     = new MfgDebug( true    );

        /** @type {boolean} The flag that enables or disables logging for this debug group. */
        MfgDebug.iDebugEnabled                              = false;

        /*****************************************************************************
        *   Constructs a new debug group.
        *   
        *   @param {boolean} aDebugEnabled  Flags if this debug group should log messages. 
        *****************************************************************************/
        function MfgDebug( aDebugEnabled )
        {
            this.iDebugEnabled = aDebugEnabled;
        }

        /*****************************************************************************
        *   Logs a line of output to the default console.
        *   This will only generate output if the debug for this debug group 
        *   AND global debug switch is enabled.   
        *
        *   @param {string} msg The message to log to the default console.
        *****************************************************************************/
        MfgDebug.prototype.log = function( msg )
        {
            if ( MfgSettings.MODE == MfgDebug.MODE_DEBUG && this.iDebugEnabled )
            {
                console.log( msg );
            }
        };
    }
