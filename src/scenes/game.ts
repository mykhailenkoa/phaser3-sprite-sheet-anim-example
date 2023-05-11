import { Scene } from 'phaser';

export class Game extends Scene {
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  public create(): void {
    const texture = this.textures.get('btn_hit');
    const emptyFrames = 4
    const frames = texture.getFrameNames();
    frames.splice(frames.length - emptyFrames, emptyFrames)
    const animation = this.anims.create({
      key: 'btnHitAnim',
      frames: frames.map((frameName, index)=>{
        return {
          key: 'btn_hit',
          frame: index,
          visible: true
        }
      }),
      frameRate: 30,
      repeat: 1
    });
    this.add.graphics()
      .fillStyle(0x131b65, 0.6)
      .fillRoundedRect( 0, 0, 150, 150, 10);
    if(animation !== false){

      const sprite = this.add.sprite(0, 0, texture);
      const lastFrame = animation.frames[animation.frames.length-1];

      sprite.play(animation);

      sprite.setInteractive();
      sprite.on('pointerover', ()=>{
        sprite.play(animation);
      });
      sprite.on('pointerout', ()=>{
        sprite.stopOnFrame(lastFrame);
      });
    }
  }

}
