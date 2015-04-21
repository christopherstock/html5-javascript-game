
    /*****************************************************************************
    *   Represents the 2d drawing surface.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgCanvas = new Object();
    {
        /** @type {HTMLCanvasElement} The referenced HTML canvas element. */
        MfgCanvas.OBJECT                       = 0;
        /** @type {CanvasRenderingContext2D} The canvas rendering context. */
        MfgCanvas.CONTEXT                      = 0;

        /** @type {number} The actual width of the canvas object. */
        MfgCanvas.WIDTH                        = 0;
        /** @type {number} The actual height of the canvas object. */
        MfgCanvas.HEIGHT                       = 0;

        /*****************************************************************************
        *   Inits the canvas.
        *
        *   @return {boolean}   <code>true</code> if the canvas has been detected and
        *                       initialized successfully. Otherwise <code>false</code>.
        *****************************************************************************/
        MfgCanvas.init = function()
        {
            MfgCanvas.OBJECT = document.getElementById( 'canvas' );
            if ( MfgCanvas.OBJECT.getContext )
            {
                //assign dimensions
                MfgCanvas.OBJECT.width  = MfgSettings.CANVAS_WIDTH;
                MfgCanvas.OBJECT.height = MfgSettings.CANVAS_HEIGHT;

                //show new dimensions
                MfgDebug.canvas.log( "Assigned canvas dimensions [" + MfgCanvas.OBJECT.width + "][" + MfgCanvas.OBJECT.height + "]" );

                //assign paramounts
                MfgCanvas.CONTEXT  = MfgCanvas.OBJECT.getContext( '2d' );
                MfgCanvas.WIDTH    = MfgCanvas.OBJECT.width;
                MfgCanvas.HEIGHT   = MfgCanvas.OBJECT.height;

                return true;
            }

            return false;
        }
    }
