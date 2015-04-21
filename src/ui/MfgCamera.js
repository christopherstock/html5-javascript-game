
    /*****************************************************************************
    *   Manages the camera that handles the scrolling part.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgCamera = new Object();
    {
        /** @type {number} The camera's x offset. */
        MfgCamera.iOffsetX                                              = 0;
        
        /** @type {number} The camera's y offset. */
        MfgCamera.iOffsetY                                              = 0;
        
        /*****************************************************************************
        *   Constructs a new camera.
        *****************************************************************************/
        function MfgCamera()
        {
            this.iOffsetX = 0;
            this.iOffsetY = 0;
        }

        /*****************************************************************************
        *   Updates the singleton instance of the camera by reassigning
        *   it's horizontal and vertical offset.
        *
        *   @return {MfgCamera} The singleton instance of the camera
        *                       with updated scroll offsets.
        *****************************************************************************/
        MfgCamera.updateCamera = function()
        {
            //calculate scroll-x-offset so camera is centered to player
            MfgCamera.current.iOffsetX = MfgLevel.current.player.block.iRect.iLeft - MfgCanvas.WIDTH / MfgSettings.RATIO_CENTERING_X + MfgLevel.current.player.block.iRect.iWidth / 2;
            //clip camera-x to level bounds
            if ( MfgCamera.current.iOffsetX < 0                                                ) MfgCamera.current.iOffsetX = 0;
            if ( MfgCamera.current.iOffsetX > MfgLevel.current.levelBoundX - MfgCanvas.WIDTH   ) MfgCamera.current.iOffsetX = MfgLevel.current.levelBoundX - MfgCanvas.WIDTH;
            
            //calculate scroll-y-offset so camera is centered to player
            MfgCamera.current.iOffsetY = MfgLevel.current.player.block.iRect.iTop - MfgCanvas.HEIGHT / MfgSettings.RATIO_CENTERING_Y + MfgLevel.current.player.block.iRect.iHeight / 2;
            //clip camera-y to level bounds
            if ( MfgCamera.current.iOffsetY < 0                                                ) MfgCamera.current.iOffsetY = 0;
            if ( MfgCamera.current.iOffsetY > MfgLevel.current.levelBoundY - MfgCanvas.HEIGHT  ) MfgCamera.current.iOffsetY = MfgLevel.current.levelBoundY - MfgCanvas.HEIGHT;

            return MfgCamera.current;
        };

        /** {MfgCamera} Holds the singleton instance of the camera. */
        MfgCamera.current                                               = new MfgCamera();
    }
