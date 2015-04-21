
    /*****************************************************************************
    *   Represents one game character.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    var     MfgPlayer                          = new Object();
    {
        /*****************************************************************************
        *   Initialize and reset human player.
        *****************************************************************************/
        function MfgPlayer()
        {
            this.speedX             = MfgSettings.PLAYER_SPEED_WALKING_X;

            this.block              = new MfgBlock
            (
                0, 
                0, 
                MfgImage.getImage( MfgImage.GAME_PLAYER_STAND )
            );

            this.handlePlayerKeys   = MfgPlayer.handlePlayerKeys;
            this.moveLeft           = MfgPlayer.moveLeft;
            this.moveRight          = MfgPlayer.moveRight;
            this.standStill         = MfgPlayer.standStill;

            //set player startup position
            MfgLevel.current.bringRectOnStartup( this.block.iRect );
        }

        /*****************************************************************************
        *   Handle the keys the user has pressed.
        *****************************************************************************/
        MfgPlayer.handlePlayerKeys = function()
        {
            //alter player position
            if ( MfgKey.KEY_LEFT.hold )
            {
                this.moveLeft();
            }
            if ( MfgKey.KEY_RIGHT.hold )
            {
                this.moveRight();
            }
            if ( !MfgKey.KEY_LEFT.hold && !MfgKey.KEY_RIGHT.hold )
            {
                this.standStill();
            }
        };

        MfgPlayer.standStill = function()
        {
            this.block.iCollision = false;
        };

        MfgPlayer.moveLeft = function()
        {
            //translate block left
            this.block.moveLeft( this.speedX );
        };

        MfgPlayer.moveRight = function()
        {
            //translate block right
            this.block.moveRight( this.speedX );
        };
    }
