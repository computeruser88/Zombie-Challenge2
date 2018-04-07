var inquirer = require("inquirer");

var weapon;
var weaponDamage;
var hasKey;
var playerHealth;
var killCount;

function main() {
    console.log("Zombie Challenge 2: The Inhabitants");
    console.log("-----------------------------------\n");
    weapon = "fists";
    weaponDamage = 1;
    hasKey = false;
    playerHealth = 300;
    killCount = 0;
    room0();
}
function room0() {
    console.log("You are at the northwest corner of the house.");
    var pickUpWeapon = {
        type: "confirm",
        name: "pickUpWeapon",
        message: "There is a rock in this room. You can use it as a weapon. Pick it up Y/N?"
    }
    var direction = {
        type: "list",
        name: "direction",
        choices: ["south", "east"],
        message: "You can move south or east:"
    }
    if (Math.floor(Math.random() * 5) === 1) {
        fight("A zombie", 10);
    }
    if (playerHealth > 0) {
        inquirer.prompt(pickUpWeapon).then(answer => {
            if (answer.pickUpWeapon) {
                if (weapon !== "fists"){
                    console.log("You discarded your " + weapon + ".");
                }
                weapon = "rock";
                weaponDamage = 5;
                console.log("You picked up the rock.");
            }
            inquirer.prompt(direction).then(answer => {
                if (answer.direction === "south") {
                    room3();
                } else {
                    room1();
                }
            });
        });
    }
}

function room1() {
    console.log("In this room there is a portrait of a family hanging on the north wall. Blood stains are streaked across it.");
    var pickUpWeapon = {
        type: "confirm",
        name: "pickUpWeapon",
        message: "There is a large stick in this room. You can use it as your weapon. Pick it up Y/N?"
    }
    var direction = {
        type: "list",
        name: "direction",
        choices: ["east", "west"],
        message: "You can go east or west from here."
    }
    if (Math.floor(Math.random() * 4) + 1 === 1) {
        fight("A zombie", 10);
    }
    if (playerHealth > 0) {
        inquirer.prompt(pickUpWeapon).then(answer => {
            if (answer.pickUpWeapon) {
                if (weapon !== "fists") {
                    console.log("You discarded the " + weapon + ".");
                }
                weapon = "large stick";
                weaponDamage = 12;
                console.log("You picked up the large stick. It has a good heft to it.");
            }
            inquirer.prompt(direction).then(answer => {
                if (answer.direction === "east") {
                    room2();
                } else {
                    room0();
                }
            });
        });

    }
}

function room2() {
    console.log("You have entered what appears to have been a bedroom.");
    var openTreasureChest = {
        type: "confirm",
        name: "openTreasureChest",
        message: "Open treasure chest Y/N?"
    }
    var direction = {
        type: "confirm",
        name: "goEast",
        message: "The only door goes west. Are you ready to proceed Y/N?"
    }
    console.log("You have found a locked treasure chest!");
    if (hasKey === false) {
        console.log("You cannot open it.");
        inquirer.prompt(direction).then(answer => {
            if (answer.goEast === true) {
                room1();
            } else {
                console.log("You shouldn't be resting here.");
                fight("A zombie", 20);
                if (playerHealth > 0) {
                    room2();
                }
            }
        });
    } else {
        inquirer.prompt(openTreasureChest).then(answer => {
            if (answer.openTreasureChest) {
                console.log("You have found a chainsaw! You discarded your " + weapon + " and picked it up.");
                weapon = "chainsaw";
                weaponDamage = 100;
                console.log("Your key broke.");
                hasKey = false;
            } else {
                console.log("You left the treasure chest locked.");
            }
            inquirer.prompt(direction).then(answer => {
                if (answer.goEast) {
                    room1();
                } else {
                    console.log("You shouldn't be resting here.");
                    fight("A zombie", 10);
                    if (playerHealth > 0) {
                        room2();
                    }
                }
            });
        });
    }

}

function room3() {
    console.log("This room is bare except for a skeleton on the west side.");
    var direction = {
        type: "list",
        name: "direction",
        choices: ["north", "east", "south"],
        message: "You can go north, east, or south from here."
    }
    if (Math.floor(Math.random() * 4) + 1 === 3) {
        fight("A zombie", 10);
    }
    if (playerHealth > 0) {
        inquirer.prompt(direction).then(answer => {
            if (answer.direction === "north") {
                room0();
            } else if (answer.direction === "east") {
                room4();
            } else {
                room6();
            }
        });
    }
}
function room4() {
    console.log("This room is bare and empty. You wonder how long the house's previous inhabitants have been dead.");
    var pickUpKey = {
        type: "confirm",
        name: "pickUpKey",
        message: "You have found a key! Pick it up Y/N?"
    }
    var direction = {
        type: "confirm",
        name: "goEast",
        message: "To the south is a barricaded door you cannot pass. You can only go east. Are you ready to proceed Y/N?"
    }
    inquirer.prompt(pickUpKey).then(answer => {
        if (answer.pickUpKey) {
            hasKey = true;
            console.log("You picked up the key, but it is a little flimsy. It will break after you use it once.");
        } else if (hasKey = false) {
            console.log("You leave the key here.");
        }
        inquirer.prompt(direction).then(answer => {
            if (answer.goEast) {
                room3();
            } else {
                console.log("You shouldn't be resting here.");
                fight("A zombie", 20);
                if (playerHealth > 0) {
                    room4();
                }
            }
        });
    });

}
function room5() {
    console.log("The door to your south slammed shut. There is no escape!");
    fight("The Alpha Zombie", 400);
    var playAgain = {
        type: "confirm",
        name: "playAgain",
        message: "Play again Y/N?"
    }
    if (playerHealth > 0) {
        console.log("You have survived the Zombie Challenge. Congratulations, you're still alive!");
        console.log("You killed " + killCount + " zombies.");
        inquirer.prompt(playAgain).then(answer => {
            if (answer.playAgain) {
                main();
            } else {
                console.log("Thanks for playing!");
                return true;
            }
        });
    }
}
function room6() {
    console.log("You have entered what appears to have been a bedroom.");
    var openTreasureChest = {
        type: "confirm",
        name: "openTreasureChest",
        message: "Open treasure chest Y/N?"
    }
    var direction = {
        type: "list",
        name: "direction",
        choices: ["north", "east"],
        message: "You can go north or east from here."
    }
    console.log("You have found a locked treasure chest!");
    if (hasKey === false) {
        console.log("You cannot open it.");
        inquirer.prompt(direction).then(answer => {
            if (answer.direction === "north") {
                room3();
            } else {
                room7();
            }
        });
    } else {
        inquirer.prompt(openTreasureChest).then(answer => {
            if (answer.openTreasureChest) {
                console.log("You have found a sword! You discarded your " + weapon + " and picked it up.");
                weapon = "sword";
                weaponDamage = 50;
                console.log("Your key broke.");
                hasKey = false;
            } else {
                console.log("You left the treasure chest locked.");
            }
            inquirer.prompt(direction).then(answer => {
                if (answer.direction === "north") {
                    room3();
                } else {
                    room7();
                }
            });
        });
    }

}
function room7() {
    console.log("You have entered the dining room. There is something eerie about this place...");
    console.log("Oh no!");
    fight("A zombie mutant", 150);
    var direction = {
        type: "list",
        name: "direction",
        choices: ["west", "east"],
        message: "You can go west or east from here."
    }
    if (playerHealth > 0) {
        inquirer.prompt(direction).then(answer => {
            if (answer.direction === "east") {
                room8();
            } else {
                room6();
            }
        })
    }
}
function room8() {
    console.log("You have entered the kitchen. You can hear teeth loudly gnashing. Your destiny awaits you to the north!");
    var pickUpKnife = {
        type: "confirm",
        name: "pickUpKnife",
        message: "There is a kitchen knife in this room! Pick it up Y/N?"
    }
    var direction = {
        type: "list",
        name: "direction",
        choices: ["west", "north"],
        message: "You can go west or north from here."
    }
    if (Math.floor(Math.random() * 3) + 1 === 1) {
        fight("A zombie", 10);
    }
    if (playerHealth > 0) {
        inquirer.prompt(pickUpKnife).then(answer => {
            if (answer.pickUpKnife) {
                if (weapon !== "fists") {
                    console.log("You discarded your " + weapon + ".");
                }
                weapon = "kitchen knife";
                weaponDamage = 20;
                console.log("You picked up the " + weapon + ".");
                inquirer.prompt(direction).then(answer => {
                    if (answer.direction === "north") {
                        room5();
                    } else {
                        room7();
                    }
                });
            } else {
                inquirer.prompt(direction).then(answer => {
                    if (answer.direction === "north") {
                        room5();
                    } else {
                        room7();
                    }
                });
            }
        });
    }
}

function fight(zombieType, zombieHealth) {
    console.log(zombieType + " is trying to kill you!");
    if ((Math.floor(Math.random() * 20) + 1) !== 8) {
        zombieHealth -= weaponDamage;
        console.log("You attacked the zombie with your " + weapon + " and dealt " + weaponDamage + " damage.\n");
    } else {
        console.log("You attacked and missed!");
    }
    if (zombieHealth > 0) {
        var zombieAttackNumber = Math.floor(Math.random() * (zombieHealth / 2)) + 1;
        console.log("Oh no! The zombie slashed you with " + zombieAttackNumber + " damage.\n");
        playerHealth -= zombieAttackNumber;
        console.log("You have " + playerHealth + " health left. The zombie has " + zombieHealth + " health left.\n");
        if (playerHealth <= 0) {
            console.log("Game over. You are dead.\n");
            console.log("You managed to kill " + killCount + " zombie(s).\n");
            var playAgain = {
                type: "confirm",
                name: "playAgain",
                message: "Play again Y/N?"
            }
            inquirer.prompt(playAgain).then(answer => {
                if (answer.playAgain) {
                    main();
                } else {
                    console.log("Thanks for playing!");
                    return true;
                }
            });
        } else {
            fight(zombieType, zombieHealth);
        }
    } else {
        console.log("You killed the zombie! Congrats!\n");
        console.log("You have " + playerHealth + " health left.\n");
        killCount++;
    }
}
main();