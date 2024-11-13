import React, { useEffect, useState } from "react";
import Phaser from "phaser";

const Game = () => {
  const [score, setScore] = useState(0)
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "phaser-game",
      physics: {
        default: "arcade",
      },
      scene:{
        preload: preload,
        create: create,
        update: update,
      }
    }

    const game = new Phaser.Game(config);

    let scoreText;

    function preload(){
      this.load.image('apple', './apple.png')
      this.load.image('bucket', './bucket.png')
      this.load.image('sky', './sky.avif')


    }

    function create(){
      const bg = this.add.image(400, 300, "sky")
      bg.setDisplaySize(800, 600);
      this.bucket = this.physics.add.sprite(400, 550, 'bucket')
      this.bucket.setCollideWorldBounds(true)
      this.cursors = this.input.keyboard.createCursorKeys()

      this.apples = this.physics.add.group()

      this.time.addEvent({
        delay: 1000,
        callback: () => {
          const appleX = Phaser.Math.Between(50, 750)
          const apple = this.apples.create(appleX, 0, 'apple')
          apple.setVelocityY(100)
        },
        loop: true,
      })

      scoreText = this.add.text(16, 16, `Score: 0`, {
        fontSize: "32px",
        fill: "#fff",
      })

      this.physics.add.overlap(this.bucket, this.apples, collectApple, null, this)

    }

    function update(){
      if(this.cursors.left.isDown){
        this.bucket.setVelocityX(-300)
      }
      else if(this.cursors.right.isDown){
        this.bucket.setVelocityX(300)
      }
      else{
        this.bucket.setVelocityX(0)
      }

      this.apples.children.iterate((apple) => {
        if(apple.y > 600){
          apple.destroy()
        }
      })

      

      


    }

    function collectApple(bucket, apple){
      apple.destroy()

      setScore((prevScore) => {
        const newScore = prevScore + 1
        scoreText.setText(`Score: ${newScore}`)
        return newScore
      })
    }

    return () => {
      game.destroy(true)
    }


  },[]);
 return <div  id="phaser-game" style={{ width: "800px", height: "600px"}}>
 </div>
};

export default Game;
