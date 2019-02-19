// Very simple sprite animation

// phaser game settings
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 }
    }
},
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

// New game instance based on config
let game = new Phaser.Game(config);

//let player;


// Preload assets
function preload ()
{
  // load player spritesheet (crated in paint dot net)
  this.load.spritesheet('player', 'assets/player.png', { frameWidth: 96, frameHeight: 96 });
}

// Build the game - add assets, etc.
function create ()
{
  //  animation with key 'left'
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { frames: [4, 5]}),
    frameRate: 10,
    repeat: -1
  });

  // animation with key 'right'
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { frames: [1, 2] }),
    frameRate: 10,
    repeat: -1
  });
  // animation with key 'up'
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('player', { frames: [10, 11]}),
    frameRate: 10,
    repeat: -1
  });

  // animation with key 'down'
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', { frames: [ 7, 8] }),
    frameRate: 10,
    repeat: -1
  });        

  // animation when player not moving
  this.anims.create({
    key: 'stop',
    frames: this.anims.generateFrameNumbers('player', { frames: [0] }),
    frameRate: 0,
    repeat: -1
  });    

  // our player sprite created through the physics system
  this.player = this.physics.add.sprite(50, 100, 'player', 0);

  // don't go out of the map
  this.physics.world.bounds.width = config.width;
  this.physics.world.bounds.height = config.height;
  this.player.setCollideWorldBounds(true);
  
  this.physics.add.collider(this.player);

  // user input
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {

    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown)
    {
        this.player.body.setVelocityX(-80);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown)
    {
        this.player.body.setVelocityY(-80);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.body.setVelocityY(80);
    }        

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown)
    {
        this.player.anims.play('left', true);
        //this.player.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.anims.play('right', true);
        //this.player.flipX = false;
    }
    else if (this.cursors.up.isDown)
    {
        this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.anims.play('down', true);
    }
    else
    {
        this.player.anims.play('stop', true);
        //this.player.anims.stop();
    }


}