var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

 let game = new Phaser.Game(config);
// set UI size

function preload()
{
    this.load.image('ocean', 'assets/Ocean.png');
    this.load.image('axolotl', 'assets/axo.png');
    this.load.image('bubble', 'assets/bubbleplats.png');
    this.load.image('bomb', 'assets/spikes.png');
    this.load.spritesheet('friend', 
    'assets/octo.png',
    { frameWidth: 32, frameHeight: 48 }
    
);
}


var player;

function create()
{
    //background
    this.add.image(400,300, 'ocean');

     //platforms   
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'bubble').setScale(2).refreshBody();

    platforms.create(600, 400, 'bubble');
    platforms.create(50, 250, 'bubble');
    platforms.create(750, 220, 'bubble');

    //player
    player = this.physics.add.sprite(100, 450, 'friend');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('friend', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'friend', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('friend', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });   
    
    cursors = this.input.keyboard.createCursorKeys();

    axo = this.physics.add.group({
        key: 'axolotl',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    axo.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    
    bombs=this.physics.add.group();

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(axo, platforms);
    

 



}



function update()
{
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}

}



