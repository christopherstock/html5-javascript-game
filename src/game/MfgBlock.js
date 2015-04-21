
    /*****************************************************************************
    *   Represents one block element the game consists of.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgBlock = new Object();
    {
        /** @type Image */
        MfgBlock.iImage                             = null;

        /** @type MfgRect2D */
        MfgBlock.iRect                              = null;

        /** @type boolean */
        MfgBlock.iCollision                         = false;

        /*****************************************************************************
        *   Constructs a new block.
        *
        *   @param  {number} aX         Left coordinate for this rect.
        *   @param  {number} aY         Top coordinate for this rect.
        *   @param  {Image}  aImage     Width for the new rect.
        *****************************************************************************/
        function MfgBlock( aX, aY, aImage )
        {
            this.iImage  = aImage;
            this.iRect   = new MfgRect2D( aX, aY, this.iImage.width, this.iImage.height );
        }

        /*****************************************************************************
        *   Draws the block at the specified camera position.
        *
        *   @param  {MfgCamera} camera  The camera position to draw this block for.
        *****************************************************************************/
        MfgBlock.prototype.drawBlock = function( camera )
        {
            MfgDrawing.drawImage
            (
                MfgCanvas.CONTEXT,
                this.iImage,
                this.iRect.iLeft - camera.iOffsetX,
                this.iRect.iTop - camera.iOffsetY,
                1.0
            );
            
            //draw debug rect
            if ( MfgSettings.DRAW_DEBUG_RECTS ) this.drawDebugRect( camera );
        };

        /*****************************************************************************
        *   Checks if this block collides with the specified rectangle.
        *
        *   @param  {MfgRect2D} rect    The rectangle to check for collision with this block.
        *   @return {boolean}           <code>true</code> if the rect collides with this block.
        *                               Otherwise <code>false</code>.
        *****************************************************************************/
        MfgBlock.prototype.checkBlockCollision = function( rect )
        {
            var ret = rect.rectsCollide( this.iRect );
            return ret;
        };

        /*****************************************************************************
        *   Move this block left by the specified speed.
        *
        *   @param  {number} speed      The speed in pixels to move this block left.
        *****************************************************************************/
        MfgBlock.prototype.moveLeft = function( speed )
        {
            this.iRect.iLeft -= speed;
            if ( MfgLevel.current.checkLevelCollisions( this.iRect ) )
            {
                this.iRect.iLeft += speed;
                this.iCollision = true;
            }
            else
            {
                this.iCollision = false;
            }

            //clip left level bound
            if ( this.iRect.iLeft < 0 ) this.iRect.iLeft = 0;
        };

        /*****************************************************************************
        *   Move this block right by the specified speed.
        *
        *   @param  {number} speed      The speed in pixels to move this block right.
        *****************************************************************************/
        MfgBlock.prototype.moveRight = function( speed )
        {
            this.iRect.iLeft += speed;
            if ( MfgLevel.current.checkLevelCollisions( this.iRect ) )
            {
                this.iRect.iLeft -= speed;
                this.iCollision = true;
            }
            else
            {
                this.iCollision = false;
            }

            //clip right level bound
            if ( this.iRect.iLeft > MfgLevel.current.levelBoundX - this.iRect.iWidth ) this.iRect.iLeft = MfgLevel.current.levelBoundX - this.iRect.iWidth;
        };

        /*****************************************************************************
        *   Draws a debug rectangle over this block.
        *
        *   @param  {MfgCamera} camera  The camera position to draw this block for.
        *****************************************************************************/
        MfgBlock.prototype.drawDebugRect = function( camera )
        {
            //draw big debug rect over player indicating collisions
            MfgDrawing.fillRect( MfgCanvas.CONTEXT, this.iRect.iLeft - camera.iOffsetX,     this.iRect.iTop - camera.iOffsetY,     this.iRect.iWidth,     this.iRect.iHeight,     "rgba( 255, 255, 0,   1.0 )" );
            MfgDrawing.fillRect( MfgCanvas.CONTEXT, this.iRect.iLeft - camera.iOffsetX + 1, this.iRect.iTop - camera.iOffsetY + 1, this.iRect.iWidth - 2, this.iRect.iHeight - 2, "rgba( 100, 100, 100, 1.0 )" );
        };

        /*****************************************************************************
        *   Assigns a new image for this block.
        *
        *   @param  {Image} newImage    The new image to use for this block.
        *****************************************************************************/
        MfgBlock.prototype.setNewImage = function( newImage )
        {
            this.iImage = newImage;
        };
    }
