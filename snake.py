# Snake initialization
alive = True
snake = [[2,3], [2,2], [2,1]]
speed = [0,1]
food = [randint(0, 4), randint(0, 4)]
score = 0

# Buttons initialization
releasedA = True
releasedB = True

# Images
wrong = "Image"
basic.show_leds("50005:05050:00500:05050:50005")
numbers = ["05550:00050:05550:00050:05550",
           "05550:00050:05550:05000:05550",
           "00500:05500:00500:00500:05550"]

# Get ready: 3...2...1

for number in numbers:
    basic.show_leds(number)
    pause(300)
    basic.clear_screen()
    pause(500)

time = 0.0

while alive:

    # Check user input
    if input.button_is_pressed(Button.A):
        if releasedA:
            speed = [-speed[1], speed[0]]
            releasedA = False
    else:
        releasedA = True

    if input.button_is_pressed(Button.B):
        if releasedB:
            speed = [speed[1], -speed[0]]
            releasedB = False
    else:
        releasedB = True

    # Update position
    if time > 1.0:
        snake.pop()
        snake.insert(0, [snake[0][0] + speed[0], snake[0][1] + speed[1]])
        time = 0.0

    # Keep the snake inside the screen
    for point in snake:
        if point[0] < 0 or point[0] > 4:
            point[0] = point[0] - speed[0] * 5

        if point[1] < 0 or point[1] > 4:
            point[1] = point[1] - speed[1] * 5

    # Check collisions
    if snake[0] in snake[1:]:
        alive = False

    # Check if food has been eaten and spawn more
    if snake[0] == food:
        score += 1
        snake.append(snake[-1])
        food = [randint(0,4), randint(0,4)]

    # Render
    frame = [[0 for i in range(5)] for j in range(5)]

    frame[snake[0][0]][snake[0][1]] = 7

    for point in snake[1:]:
        frame[point[0]][point[1]] = 5

    frame[food[0]][food[1]] = 7

    for i in range(5):
        for j in range(5):
            led.toggle(j, i )

    time += 0.1

for i in range(10):
    basic.show_string("Wrong")
    pause(50)
    basic.clear_screen()
    pause(50)

basic.show_string("Score: " + str(score))
control.reset()
