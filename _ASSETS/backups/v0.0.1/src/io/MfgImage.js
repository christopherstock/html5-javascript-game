
    /*****************************************************************************
    *   Represents the image system that handles all images being used by the app.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var MfgImage = new Object();
    {
        /** @type {number} Counts the number of successful loaded images. */
        MfgImage.loadedCount                                            = 0;

        /** @type {string} The filename of the image 'player stand'. */
        MfgImage.GAME_PLAYER_STAND                                      = MfgSettings.PATH_IMAGE + "player/stand.png";
        /** @type {string} The filename of the image 'background hills'. */
        MfgImage.GAME_BG_HILL                                           = MfgSettings.PATH_IMAGE + "bg/hill.jpg";
        /** @type {string} The filename of the image 'background trees'. */
        MfgImage.GAME_BG_TREES                                          = MfgSettings.PATH_IMAGE + "bg/trees.png";

        /** @type {string[]} This array contains all filenames of all images that shall be loaded. */
        MfgImage.FILE_NAMES                                             =
        [
            MfgImage.GAME_PLAYER_STAND,
            MfgImage.GAME_BG_HILL,
            MfgImage.GAME_BG_TREES
        ];

        /** @type {Image[]} This array contains all loaded {@link Image} objects, indexed by filename. */
        MfgImage.allImages                                              = [];

        /*****************************************************************************
        *   Delivers the image with the specified filename.
        *   
        *   @param  {string} id  The filename of the image to return.
        *   @return {Image}      The image object with the specified filename.   
        *****************************************************************************/
        MfgImage.getImage = function( id )
        {
            return MfgImage.allImages[ id ];
        };

        /*****************************************************************************
        *   Orders all images being contained in the {@link MfgImage.FILE_NAMES} array.
        *****************************************************************************/
        MfgImage.loadAllImages = function()
        {
            //browse all filenames
            for ( var i = 0; i < MfgImage.FILE_NAMES.length; ++i )
            {
                MfgImage.allImages[ MfgImage.FILE_NAMES[ i ] ] = MfgImage.loadImage( MfgImage.FILE_NAMES[ i ] );
            }
        };

        /*****************************************************************************
        *   Loads one single image with the specified filename.
        *   
        *   @param  {string} filename   The filename of this image to load.
        *   @return {Image}             The unloaded image object. 
        *****************************************************************************/
        MfgImage.loadImage = function( filename )
        {
            var img     = new Image();
            img.src     = filename;
            img.onload  = function() { MfgImage.onImageLoaded(); };

            return img;
        };

        /*****************************************************************************
        *   This function is invoked each time <b>one</b> image has been fully loaded.
        *****************************************************************************/
        MfgImage.onImageLoaded = function()
        {
            ++MfgImage.loadedCount;

            MfgDebug.image.log( "imgage #[" + MfgImage.loadedCount + "] loaded" );
            
            if (MfgImage.loadedCount == MfgImage.FILE_NAMES.length ) 
            {
                MfgDebug.image.log( "All images loaded!" );
                
                //return to initialization
                Mfg.initWhenImagesAreComplete();
            }
        };
    }
