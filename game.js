console.log('Flappy Bird!');

const hitSound = new Audio();
hitSound.src = './SFX/hit.wav';

const jumpSound = new Audio();
jumpSound.src = './SFX/jump.wav';

const fallSound = new Audio();
fallSound.src = '.SFX/falling.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function docollision(flappy, ground){
    const flappyY = flappy.Y + flappy.Height;
    const groundY = ground.Y;

    if(flappyY >= groundY){
        return true;
    }

    return false;
}

function createFlappy(){
    const flappy = {
        SpriteX: 0,
        SpriteY: 0,
        Width: 33,
        Height: 24,
        X: 10,
        Y: 50,
        vel: 0,
        gravity: 0.2,
        jumpforce: 5.3,
        jump(){
            console.log('jump')
            jumpSound.play()
            flappy.vel = - flappy.jumpforce
        },
        Update(){
            if(docollision(flappy, ground)){
                console.log('COLLISION')
    
                hitSound.play();
                setTimeout(() => {
                    
                    screenChanger(screens.start)
                }, 340)
    
                return
            }
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
    return flappy
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

const startScreen = {
    SpriteX: 134,
    SpriteY: 0,
    Width: 174,
    Height: 152,
    X: (canvas.width / 2) - 174 / 2,
    Y: 50,
    Draw() {
        context.drawImage(
            sprites,
            startScreen.SpriteX, startScreen.SpriteY, 
            startScreen.Width, startScreen.Height, 
            startScreen.X, startScreen.Y, 
            startScreen.Width, startScreen.Height    
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
const global = {};
let activeScreen = {};
function screenChanger(newScreen){
    activeScreen = newScreen;

    if (activeScreen.starting){
        activeScreen.starting();
    }
}
const screens = {
    start: {
        starting(){
            global.flappy = createFlappy();
        },
        Draw(){
            background.Draw();
            ground.Draw();
            global.flappy.Draw();
            startScreen.Draw();
        },
        click(){
            screenChanger(screens.game)
        },
        Update(){

        }
    }
};
screens.game = {
    Draw(){
        background.Draw();
        ground.Draw();
        global.flappy.Draw();
    },
    click(){
        global.flappy.jump()
    },
    Update(){
        global.flappy.Update();
    }
}

function loop(){
    
    activeScreen.Draw()
    activeScreen.Update()
    
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if (activeScreen.click){
        activeScreen.click();
    }
})

screenChanger(screens.start)
loop();