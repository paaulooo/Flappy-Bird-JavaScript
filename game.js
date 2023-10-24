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

const backgroud = {
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
            backgroud.SpriteX, backgroud.SpriteY, 
            backgroud.Width, backgroud.Height, 
            backgroud.X, backgroud.Y, 
            backgroud.Width, backgroud.Height    
       );
       context.drawImage(
        sprites,
        backgroud.SpriteX, backgroud.SpriteY, 
        backgroud.Width, backgroud.Height, 
        (backgroud.X + backgroud.Width), backgroud.Y, 
        backgroud.Width, backgroud.Height    
   );

    }
}

function loop(){
    backgroud.Draw();
    ground.Draw();
    flappy.Draw()
    requestAnimationFrame(loop)

    flappy.Y = flappy.Y + 1;

}

loop();