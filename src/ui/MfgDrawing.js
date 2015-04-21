
    /*****************************************************************************
    *   Offers independent drawing functionality for the canvas.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgDrawing = new Object();
    {
        /*****************************************************************************
        *   Fills a rect with the specified dimensions and color.
        *
        *   @param  {CanvasRenderingContext2D}  ctx     The rendering context.
        *   @param  {number}                    x       The left  coordinate.
        *   @param  {number}                    y       The right coordinate.
        *   @param  {number}                    width   The desired width.
        *   @param  {number}                    height  The desired height.
        *   @param  {string}                    col     A fill color.
        *****************************************************************************/
        MfgDrawing.fillRect = function( ctx, x, y, width, height, col )
        {
            ctx.fillStyle = col;
            ctx.fillRect( x, y, width, height );
        };

        /*****************************************************************************
        *   Draws an image at the specified location with a specified anchor.
        *
        *   @param  {CanvasRenderingContext2D}  ctx         The rendering context
        *   @param  {Image}                     img         The image to draw.
        *   @param  {number}                    x           MfgDrawing position x.
        *   @param  {number}                    y           MfgDrawing position y.
        *   @param  {number}                    alpha       The desired alpha value to draw the image.
        *                                                   This value has a range of 0.0 to 1.0.
        *****************************************************************************/
        MfgDrawing.drawImage = function( ctx, img, x, y, alpha )
        {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.drawImage( img, 0, 0, img.width, img.height, x, y, img.width, img.height );
            ctx.restore();
        };
    }
