
    /*****************************************************************************
    *   Represents a rectangular in 2D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgRect2D = new Object();
    {
        /** @type {number} Left coordinate. */
        MfgRect2D.iLeft                                                 = 0;

        /** @type {number} Top coordinate. */
        MfgRect2D.iTop                                                  = 0;

        /** @type {number} Width of the rect body. */
        MfgRect2D.iWidth                                                = 0;

        /** @type {number} Height of the rect body. */
        MfgRect2D.iHeight                                               = 0;
        
        /*****************************************************************************
        *   Constructs a new rectangular.
        *
        *   @param  {number} aLeft      Left coordinate for this rect.
        *   @param  {number} aTop       Top coordinate for this rect.
        *   @param  {number} aWidth     Width for the new rect.
        *   @param  {number} aHeight    Height for the new rect.
        *****************************************************************************/
        function MfgRect2D( aLeft, aTop, aWidth, aHeight )
        {
            this.iLeft   = aLeft;
            this.iTop    = aTop;
            this.iWidth  = aWidth;
            this.iHeight = aHeight;
        }

        /*****************************************************************************
        *   Checks if the given rect contains the given point.
        *
        *   @param  {number} x  The X coordinate of the point to check.
        *   @param  {number} y  The Y coordinate of the point to check.
        *   @return {boolean}   <code>true</code> if the point lies in the rectangle.
        *                       Otherwise <code>false</code>.
        *****************************************************************************/
        MfgRect2D.prototype.containsPoint = function( x, y )
        {
            var ret =
            (
                    x  >= this.iLeft
                &&  x  <  this.iLeft    + this.iWidth
                &&  y  >= this.iTop
                &&  y  <  this.iTop     + this.iHeight
            );
            return ret;
        };

        /*****************************************************************************
        *   Checks if the given rect intersects this rect.
        *
        *   @param  {MfgRect2D} rect    The rect to check for intersection.
        *   @return {boolean}           <code>true</code> if the rects collide.
        *                               Otherwise <code>false</code>.
        *****************************************************************************/
        MfgRect2D.prototype.rectsCollide = function( rect )
        {
            var ret =
            (
                    !this.equalsWithRect( rect )
                &&  this.iLeft + this.iWidth    > rect.iLeft
                &&  this.iLeft                  < rect.iLeft + rect.iWidth
                &&  this.iTop  + this.iHeight   > rect.iTop
                &&  this.iTop                   < rect.iTop + rect.iHeight
            );
            return ret;
        };

        /*****************************************************************************
        *   Checks if the given rect equals with this rect.
        *
        *   @param  {MfgRect2D} rect    The rect to check for equality.
        *   @return {boolean}           <code>true</code> if the rects equal.
        *                               Otherwise <code>false</code>.
        *****************************************************************************/
        MfgRect2D.prototype.equalsWithRect = function( rect )
        {
            var ret = (
            
                    this.iLeft      ==  rect.iLeft
                &&  this.iWidth     ==  rect.iWidth
                &&  this.iTop       ==  rect.iTop
                &&  this.iHeight    ==  rect.iHeight
            );
            return ret;
        };
    }
