
    /*****************************************************************************
    *   Represents a level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var     MfgLevel                           = new Object();
    {
        /** @type {MfgLevel} */
        MfgLevel.current                       = null;

        /** @type {MfgPlayer} */
        MfgLevel.player                        = null;
        
        MfgLevel.constructor = function()
        {
            this.walls                      = null;
            this.player                     = null;

            this.levelBoundX                = 2000;
            this.levelBoundY                = 2500;

            this.drawLevelBg                = MfgLevel.drawLevelBg;
            this.drawLevelFg                = MfgLevel.drawLevelFg;
            this.checkLevelCollisions       = MfgLevel.checkLevelCollisions;
            this.getNearestYBelowRect       = MfgLevel.getNearestYBelowRect;
            this.getNearestYAboveRect       = MfgLevel.getNearestYAboveRect;
            this.bringRectOnStartup         = MfgLevel.bringRectOnStartup;
        };

        MfgLevel.initLevel = function()
        {
            //create pristine level instance
            MfgLevel.current = new MfgLevel.constructor();

            //assign blocks and the player
            MfgLevel.current.walls = 
            [
            ];

            MfgLevel.current.player                                 = new MfgPlayer.constructor();
        };

        /*****************************************************************************
        *   Draws the bg using parallax scrolling.
        *
        *   @param  {MfgCamera} camera
        *****************************************************************************/
        MfgLevel.drawLevelBg = function( camera )
        {
            //draw bg image
            var imgWidth  = MfgImage.getImage( MfgImage.GAME_BG_HILL ).width;
            var imgHeight = MfgImage.getImage( MfgImage.GAME_BG_HILL ).height;

            MfgDrawing.drawImage
            (
                MfgCanvas.CONTEXT,
                MfgImage.getImage( MfgImage.GAME_BG_HILL ),
                0 - ( imgWidth  - MfgCanvas.WIDTH  ) * camera.iOffsetX / ( this.levelBoundX - MfgCanvas.WIDTH  ),
                0 - ( imgHeight - MfgCanvas.HEIGHT ) * camera.iOffsetY / ( this.levelBoundY - MfgCanvas.HEIGHT ),
                0.25
            );

            //draw a blended overlay over the background
            //MfgDrawing.fillRect( MfgCanvas.CONTEXT, 0, 0, MfgCanvas.WIDTH, MfgCanvas.HEIGHT, "rgba( 255, 255, 255, " + MfgSettings.BG_BLENDING + " )" );

            //draw middle layer
            var imageDivisor = 3;

            var imgWidth     =     MfgImage.getImage( MfgImage.GAME_BG_TREES ).width;
            var imgHeight    =     MfgImage.getImage( MfgImage.GAME_BG_TREES ).height;

            var offsetX      =     0;
            var offsetY      =     ( imageDivisor - 1 ) * imgHeight;

            var targetWidth  =                imgWidth;
            var targetHeight = imageDivisor * imgHeight;

            MfgDrawing.drawImage
            (
                MfgCanvas.CONTEXT,
                MfgImage.getImage( MfgImage.GAME_BG_TREES ),
                0 - ( targetWidth  - MfgCanvas.WIDTH      ) * camera.iOffsetX / ( this.levelBoundX - MfgCanvas.WIDTH  ) + offsetX,
                0 - ( targetHeight - MfgCanvas.HEIGHT     ) * camera.iOffsetY / ( this.levelBoundY - MfgCanvas.HEIGHT ) + offsetY,
                1.0
            );
        };

        MfgLevel.drawLevelFg = function( camera )
        {
            //draw blocks in foreground
            for ( var i = 0; i < this.walls.length; ++i )
            {
                //draw block with isometric offset
                this.walls[ i ].block.drawBlock( camera );
            }
        };

        MfgLevel.checkLevelCollisions = function( rect )
        {
            //check collisions on player
            if ( this.player.block.checkBlockCollision( rect ) )
            {
                return true;
            }

            //check collision on blocks
            for ( var i = 0; i < this.walls.length; ++i )
            {
                if ( this.walls[ i ].block.checkBlockCollision( rect ) )
                {
                    return true;
                }
            }

            return false;
        };

        MfgLevel.getNearestYBelowRect = function( rect )
        {
            var nearestY      = this.levelBoundY;
            var nearestPlayer = null;
            var nearestBlock  = null;

            //consider player
            if ( this.player != null )
            {
                var blockY = this.player.block.iRect.getYonCollisionXrect( rect );
                if ( blockY !=-1 )
                {
                    if ( blockY < nearestY && blockY >= rect.iTop )
                    {
                        nearestY      = blockY;
                        nearestPlayer = this.player;
                        nearestBlock  = this.player.block;
                    }
                }
            }

            //consider blocks
            if ( this.walls != null )
            {
                for ( var i = 0; i < this.walls.length; ++i )
                {
                    //check elevation below player
                    var blockY = this.walls[ i ].block.iRect.getYonCollisionXrect( rect, this.walls[ i ].block.elevation );
                    if ( blockY != -1 )
                    {
                        if ( blockY < nearestY && blockY >= rect.iTop )
                        {
                            nearestY      = blockY;
                            nearestPlayer = null;
                            nearestBlock  = this.walls[ i ].block;
                        }
                    }
                }
            }

            var ret = 
            [
                nearestY,
                nearestPlayer,
                nearestBlock
            ];
            return ret;
        };

        MfgLevel.getNearestYAboveRect = function( rect )
        {
            var nearestY = 0;

            //consider player
            if ( this.player != null )
            {
                var blockY = this.player.block.iRect.getYonCollisionXrect( rect );
                if ( blockY != -1 )
                {
                    blockY += this.player.block.iRect.iHeight;
                    if ( blockY > nearestY && blockY <= rect.iTop ) nearestY = blockY;
                }
            }

            //consider blocks
            if ( this.walls != null )
            {
                for ( var i = 0; i < this.walls.length; ++i )
                {
                    //ignore elevated ramps above
                    if ( this.walls[ i ].block.elevation == MfgRect2D.ELEVATION_NONE )
                    {
                        var blockY = this.walls[ i ].block.iRect.getYonCollisionXrect( rect );
                        if ( blockY != -1 )
                        {
                            blockY += this.walls[ i ].block.iRect.iHeight;
                            if ( blockY > nearestY && blockY <= rect.iTop ) nearestY = blockY;
                        }
                    }
                }
            }

            return nearestY;
        };

        MfgLevel.bringRectOnStartup = function( rect )
        {
            rect.iLeft  = ( MfgCanvas.WIDTH - rect.iWidth ) / 2;
            rect.iTop   = this.levelBoundY - rect.iHeight;
        };
    }
