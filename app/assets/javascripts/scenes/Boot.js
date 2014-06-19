var Scene = {};
Scene.Boot = function (game) {
  //
};
Scene.Boot.prototype = {
  preload: function () {
    this.game.load.spritesheet('egg', '/images/egg_break.png', 118, 130, 6)
  },
  create: function () {
    this.game.state.start('Preloader');
    if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = SAFE_ZONE_WIDTH;
            this.scale.minHeight = SAFE_ZONE_HEIGHT;
            this.scale.maxWidth = 1536;
            this.scale.maxHeight = 2048;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = SAFE_ZONE_WIDTH;
            this.scale.minHeight = SAFE_ZONE_HEIGHT;
            this.scale.maxWidth = 640;
            this.scale.maxHeight = 1120;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.forceOrientation(false, true);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
  }
};