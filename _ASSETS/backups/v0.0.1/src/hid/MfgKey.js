
    /*****************************************************************************
    *   Represents and manages pressed keys.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgKey = new Object();
    {
        /** @type {number} The key object that represents the 'ENTER' key. */
        MfgKey.KEY_ENTER                       = new MfgKey( 13 );
        /** @type {number} The key object that represents the 'ESCAPE' key. */
        MfgKey.KEY_ESCAPE                      = new MfgKey( 27 );
        /** @type {number} The key object that represents the 'SPACE' key. */
        MfgKey.KEY_SPACE                       = new MfgKey( 32 );
        /** @type {number} The key object that represents the 'ARROW LEFT' key. */
        MfgKey.KEY_LEFT                        = new MfgKey( 37 );
        /** @type {number} The key object that represents the 'ARROW UP' key. */
        MfgKey.KEY_UP                          = new MfgKey( 38 );
        /** @type {number} The key object that represents the 'ARROW RIGHT' key. */
        MfgKey.KEY_RIGHT                       = new MfgKey( 39 );
        /** @type {number} The key object that represents the 'ARROW DOWN' key. */
        MfgKey.KEY_DOWN                        = new MfgKey( 40 );

        /** @type {MfgKey[]} The collection of all possible keys. */
        MfgKey.KEYS =
        [
            MfgKey.KEY_ENTER,
            MfgKey.KEY_ESCAPE,
            MfgKey.KEY_SPACE,
            MfgKey.KEY_LEFT,
            MfgKey.KEY_UP,
            MfgKey.KEY_RIGHT,
            MfgKey.KEY_DOWN
        ];

        /** @type {number} This key's internal keycode. */
        MfgKey.keyCode                                                              = 0;

        /** @type {boolean} Flags if this key is currently pressed. */
        MfgKey.hold                                                                 = 0;

        /*****************************************************************************
        *   Creates a new key object.
        *
        *   @param {number} keyCode     The internal keycode being 
        *                               associated with this key.
        *****************************************************************************/
        function MfgKey( keyCode )
        {
            this.keyCode                = keyCode;
            this.hold                   = false;
        }

        /*****************************************************************************
        *   Inits the key system by setting all according key event listener.
        *****************************************************************************/
        MfgKey.init = function()
        {
            //set event listener for keyboard devices - all but IE
            window.addEventListener( "keydown",     MfgKey.handleKeyDown, false );
            window.addEventListener( "keyup",       MfgKey.handleKeyUp,   false );

            //set event listener for keyboard devices - IE
            window.addEventListener( "onkeydown",   MfgKey.handleKeyDown, false );
            window.addEventListener( "onkeyup",     MfgKey.handleKeyUp,   false );
        };

        /*****************************************************************************
        *   This method is always invoked by the system if a key is pressed.
        *   
        *   @param {KeyboardEvent} evt  The system's propagated key event.
        *****************************************************************************/
        MfgKey.handleKeyDown = function( evt )
        {
            var keyCode = evt.which;
            MfgDebug.key.log( "key down ["  + keyCode + "]" );

            //browse all keys
            for ( var i = 0; i < MfgKey.KEYS.length; ++i )
            {
                //check if keycode matches this key
                if ( keyCode == MfgKey.KEYS[ i ].keyCode )
                {
                    //flag this key as pressed
                    MfgKey.KEYS[ i ].hold = true;
                }
            }
        };

        /*****************************************************************************
        *   This method is always invoked by the system if a key is released.
        *   
        *   @param {KeyboardEvent} evt  The system's propagated key event.
        *****************************************************************************/
        MfgKey.handleKeyUp = function( evt )
        {
            var keyCode = evt.which;
            MfgDebug.key.log( "key up ["  + keyCode + "]" );

            //browse all keys
            for ( var i = 0; i < MfgKey.KEYS.length; ++i )
            {
                //check if keycode matches this key
                if ( keyCode == MfgKey.KEYS[ i ].keyCode )
                {
                    //flag this key as released
                    MfgKey.KEYS[ i ].hold = false;
                }
            }
        };
    }
