let point: number[];
let frame: any;
let i: number;
//  Snake initialization
let alive = true
let snake = [[2, 3], [2, 2], [2, 1]]
let speed = [0, 1]
let food = [randint(0, 4), randint(0, 4)]
let score = 0
//  Buttons initialization
let releasedA = true
let releasedB = true
//  Images
let wrong = "Image"
basic.showLeds("50005:05050:00500:05050:50005")
let numbers = ["05550:00050:05550:00050:05550", "05550:00050:05550:05000:05550", "00500:05500:00500:00500:05550"]
//  Get ready: 3...2...1
for (let number of numbers) {
    basic.showLeds(number)
    pause(300)
    basic.clearScreen()
    pause(500)
}
let time = 0.0
while (alive) {
    //  Check user input
    if (input.buttonIsPressed(Button.A)) {
        if (releasedA) {
            speed = [-speed[1], speed[0]]
            releasedA = false
        }
        
    } else {
        releasedA = true
    }
    
    if (input.buttonIsPressed(Button.B)) {
        if (releasedB) {
            speed = [speed[1], -speed[0]]
            releasedB = false
        }
        
    } else {
        releasedB = true
    }
    
    //  Update position
    if (time > 1.0) {
        _py.py_array_pop(snake)
        snake.insertAt(0, [snake[0][0] + speed[0], snake[0][1] + speed[1]])
        time = 0.0
    }
    
    //  Keep the snake inside the screen
    for (point of snake) {
        if (point[0] < 0 || point[0] > 4) {
            point[0] = point[0] - speed[0] * 5
        }
        
        if (point[1] < 0 || point[1] > 4) {
            point[1] = point[1] - speed[1] * 5
        }
        
    }
    //  Check collisions
    if (snake.slice(1).indexOf(snake[0]) >= 0) {
        alive = false
    }
    
    //  Check if food has been eaten and spawn more
    if (snake[0] == food) {
        score += 1
        snake.push(snake[-1])
        food = [randint(0, 4), randint(0, 4)]
    }
    
    //  Render
    frame =  {TODO: ListComp} 
    frame[snake[0][0]][snake[0][1]] = 7
    for (point of snake.slice(1)) {
        frame[point[0]][point[1]] = 5
    }
    frame[food[0]][food[1]] = 7
    for (i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            led.toggle(j, i)
        }
    }
    time += 0.1
}
for (i = 0; i < 10; i++) {
    basic.showString("Wrong")
    pause(50)
    basic.clearScreen()
    pause(50)
}
basic.showString("Score: " + ("" + score))
control.reset()
