import { Scene } from "phaser";
interface IButtonConfig {
	textureName: string;
    emptyFrames: number;
    frameRate: number;
    background: {
        width: number;
        height: number;
        radius: number;
    };
}
const buttonsConfig: IButtonConfig[] = [
	{
		textureName: "btn_hit",
		emptyFrames: 4,
		frameRate: 60,
		background: {
			width: 150,
			height: 150,
			radius: 10
		}
	},
	{
		textureName: "btn_double",
		emptyFrames: 4,
		frameRate: 60,
		background: {
			width: 150,
			height: 150,
			radius: 10
		}
	}
];
export class Game extends Scene {
	constructor() {
		super({ key: "GameScene" });
	}

	public create(): void {
		buttonsConfig.forEach(this.createButton);
	}

	private readonly createButton = (buttonConfig: IButtonConfig, btnIndex: number) => {
		const { textureName, frameRate, background, emptyFrames } = buttonConfig;
		const container = this.add.container(background.width * btnIndex + btnIndex * 10, 30);

		const texture = this.textures.get(textureName);
		const frames = texture.getFrameNames();
		frames.splice(frames.length - emptyFrames, emptyFrames);
		const animation = this.anims.create({
			key: textureName + 'anim',
			frames: frames.map((frameName, index) => {
				return {
					key: textureName,
					frame: index,
					visible: true
				};
			}),
			frameRate,
			repeat: 0
		});

		container.add(
			this.add
				.graphics()
				.fillStyle(0x131b65, 0.6)
				.fillRoundedRect(0, 0, background.width, background.height, background.radius)
		);

		if (animation !== false) {
			const sprite = this.add.sprite(background.width*.5, background.height*.5, texture);
			//sprite.setPosition(-background.width*.5, -background.height*.5);
			container.add(sprite);

			const firstFrame = animation.frames[0];

			sprite.setInteractive({
				hitAreaCallback: Phaser.Geom.Circle.Contains,
				useHandCursor: true
			});
			sprite.on("pointerover", () => {
				sprite.play(animation);
			});
			sprite.on("pointerout", () => {
				sprite.stopOnFrame(firstFrame);
			});
		}
	}
}
