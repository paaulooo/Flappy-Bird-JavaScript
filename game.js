console.log('Flappy Bird!');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const flappy = {
    SpriteX: 0,
    SpriteY: 0,
    Width: 33,
    Height: 24,
    X: 10,
    Y: 50,
    vel: 0,
    gravity: 0.2,
    Update(){
        flappy.vel = flappy.vel + flappy. gravity
        flappy.Y = flappy.Y + flappy.vel;
    },
    Draw() {
        context.drawImage(
            sprites,
            flappy.SpriteX, flappy.SpriteY, 
            flappy.Width, flappy.Height, 
            flappy.X, flappy.Y, 
            flappy.Width, flappy.Height    
       );

    }
}
const ground = {
    SpriteX: 0,
    SpriteY: 610,
    Width: 224,
    Height: 112,
    X: 0,
    Y: canvas.height - 112,
    Draw() {
        context.drawImage(
            sprites,
            ground.SpriteX, ground.SpriteY, 
            ground.Width, ground.Height, 
            ground.X, ground.Y, 
            ground.Width, ground.Height    
       );
       context.drawImage(
        sprites,
        ground.SpriteX, ground.SpriteY, 
        ground.Width, ground.Height, 
        (ground.X + ground.Width), ground.Y, 
        ground.Width, ground.Height    
   );

    }
}

const background = {
    SpriteX: 390,
    SpriteY: 0,
    Width: 275,
    Height: 204,
    X: 0,
    Y: canvas.height - 204,
    Draw() {
        context.fillStyle = '#9efff7'
        context.fillRect(0,0, canvas.width, canvas.height)

        context.drawImage(
            sprites,
            background.SpriteX, background.SpriteY, 
            background.Width, background.Height, 
            background.X, background.Y, 
            background.Width, background.Height    
       );
       context.drawImage(
        sprites,
        background.SpriteX, background.SpriteY, 
        background.Width, background.Height, 
        (background.X + background.Width), background.Y, 
        background.Width, background.Height    
   );

    }
}

function loop(){
    background.Draw();
    ground.Draw();
    flappy.Draw();
    requestAnimationFrame(loop);
    flappy.Update();
    

}

loop();