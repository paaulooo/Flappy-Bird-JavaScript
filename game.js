console.log('Flappy Bird!');

let frames = 0;
var pt = 0;
const hitSound = new Audio();
hitSound.src = './SFX/hit.wav';

const jumpSound = new Audio();
jumpSound.src = './SFX/jump.wav';


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
        jumpforce: 4.3,
        jump(){
            console.log('jump')
            jumpSound.play()
            flappy.vel = - flappy.jumpforce
        },
        Update(){
            if(docollision(flappy, global.ground)){
                console.log('COLLISION')
    
                hitSound.play();

                screenChanger(screens.Over)
    
                return
            }
            flappy.vel = flappy.vel + flappy. gravity
            flappy.Y = flappy.Y + flappy.vel;
            
            
        },
        animFrames: [
            { SpriteX: 0, SpriteY: 0, },
            { SpriteX: 0, SpriteY: 26, },
            { SpriteX: 0, SpriteY: 52, },
            { SpriteX: 0, SpriteY: 26, },
        ],
        frame: 0,
        updateFrame(){
            const frameInterval = 10;
            const passInterval = frames % frameInterval === 0;

            if(passInterval){
                const base = 1;
                const increment = base + flappy.frame;
                const baserepeat = flappy.animFrames.length;
                flappy.frame = increment % baserepeat;

            }

        },
        Draw() {
            flappy.updateFrame()
            const { SpriteX, SpriteY } = flappy.animFrames[flappy.frame];
            context.drawImage(
                sprites,
                SpriteX, SpriteY, 
                flappy.Width, flappy.Height, 
                flappy.X, flappy.Y, 
                flappy.Width, flappy.Height    
           );
    
        }
    }
    return flappy
}

function createGround(){
    const ground = {
        SpriteX: 0,
        SpriteY: 610,
        Width: 224,
        Height: 112,
        X: 0,
        Y: canvas.height - 112,
        Update(){
            const repeatGround = ground.Width / 2;
            
            if (ground.X <=- repeatGround){
                return ground.X = 0;
            }
            ground.X = ground.X - 1;

        },
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
    return ground;
}

function createTubes(){
    const tubes = {
        Width: 52,
        Height: 400,
        ground: {
            SpriteX: 0,
            SpriteY: 169,
        },
        sky: {
            SpriteX: 52,
            SpriteY: 169,
        },
        space: 80,
        Draw(){
            tubes.doubles.forEach(function(double) {

                const yRandom = double.Y;
                const spaceBetween = 90;

                const skyTubeX = double.X;
                const skyTubeY = yRandom;
    
                context.drawImage(
    
                    sprites,
                    tubes.sky.SpriteX, tubes.sky.SpriteY, 
                    tubes.Width, tubes.Height, 
                    skyTubeX, skyTubeY, 
                    tubes.Width, tubes.Height 
    
                )
    
                const groundTubeX = double.X;
                const groundTubeY = tubes.Height + spaceBetween + yRandom;
                context.drawImage(
                    sprites,
                    tubes.ground.SpriteX, tubes.ground.SpriteY, 
                    tubes.Width, tubes.Height, 
                    groundTubeX, groundTubeY, 
                    tubes.Width, tubes.Height,
                )
                double.skyTube = {
                    X: skyTubeX,
                    Y: tubes.Height + skyTubeY
                }
                double.groundTube = {
                    X: groundTubeX,
                    Y: groundTubeY
                };
            })

        },

        hasCollision(double){
            const hFlappy = global.flappy.Y;
            const pFlappy = global.flappy.Y + global.flappy.Height;
            
            if((global.flappy.X + global.flappy.Width) >= double.X) {

                console.log('bateu' + pt)
                if(hFlappy <= double.skyTube.Y){
                    console.log('a')
                    return true;
                }

                if(pFlappy >= double.groundTube.Y){
                    console.log('b')
                    return true;
                }
            }
            
            return false
            
            
        },
        
        

        
        doubles: [],
        Update(){

            const pass100Frames = frames % 100 === 0;
            if(pass100Frames) { 
                tubes.doubles.push({
                    X: canvas.width,
                    Y: -150 * (Math.random() + 1),
                })
            }
            
            tubes.doubles.forEach(function(double){
                double.X = double.X - 2;

                if(tubes.hasCollision(double)){
                    
                    hitSound.play();
                    screenChanger(screens.Over)
                }

                if(double.X + tubes.Width <= 0) { 
                    tubes.doubles.shift();
                }
            });
        }
    }

    return tubes;
}

function createScore(){
    const score = {
        pts: 0,
        Draw() {
            context.font = '30px "Press Start 2P"'
            context.textAlign = 'right'
            context.fillStyle = '#1e8000'
            context.fillText(`${score.pts}`, canvas.width - 20, 45 )
            
        },
        Update() {
            const frameInterval = 22;
            const passInterval = frames % frameInterval === 0;
            if(passInterval){
                score.pts = score.pts + 1
            }
        }
    }
    return score
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

const overScreen = {
    SpriteX: 134,
    SpriteY: 153,
    Width: 226,
    Height: 200,
    X: (canvas.width / 2) - 226 / 2,
    Y: 50,
    Draw() {
        context.drawImage(
            sprites,
            overScreen.SpriteX, overScreen.SpriteY, 
            overScreen.Width, overScreen.Height, 
            overScreen.X, overScreen.Y, 
            overScreen.Width, overScreen.Height    
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
            global.ground = createGround();
            global.tubes = createTubes();
        },
        Draw(){
            background.Draw();
            global.tubes.Draw();
            global.ground.Draw();
            global.flappy.Draw();
            startScreen.Draw();
        },
        click(){
            screenChanger(screens.game)
        },
        Update(){
            global.ground.Update()
        }
    }
};
screens.game = {
    starting(){
        global.score = createScore()
    },
    Draw(){
        background.Draw();
        global.tubes.Draw();
        global.ground.Draw();
        global.flappy.Draw();
        global.score.Draw();
    },
    click(){
        global.flappy.jump()
    },
    Update(){
        global.tubes.Update();
        global.ground.Update();
        global.flappy.Update();
        global.score.Update()
    }
}

screens.Over = {
    Draw(){
        overScreen.Draw()
    },
    Update(){

    },
    click(){
        screenChanger(screens.start)
    }
}

function loop(){
    
    activeScreen.Draw()
    activeScreen.Update()
    
    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if (activeScreen.click){
        activeScreen.click();
    }
})

screenChanger(screens.start)
loop();