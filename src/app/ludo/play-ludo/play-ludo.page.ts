import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-play-ludo',
  templateUrl: './play-ludo.page.html',
  styleUrls: ['./play-ludo.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class PlayLudoPage implements OnInit {

  redDiceNumber: number = 1;
  BlueDiceNumber: number = 1;
  greenDiceNumber: number = 1;
  yellowDiceNumber: number = 1;

  @ViewChild('yellowDotArea') yellowDotArea!: ElementRef;
  @ViewChild('redDotArea') redDotArea!: ElementRef;
  @ViewChild('blueDotArea') blueDotArea!: ElementRef;
  @ViewChild('greenDotArea') greenDotArea!: ElementRef;

  @ViewChildren('pathElements') pathElements!: QueryList<ElementRef>;
  @ViewChildren('innerpathElements') innerpathElements!: QueryList<ElementRef>;
  sortedPositions: { number: number; position: string }[] = [];
  innersortedPositions: { number: number; position: string }[] = [];
  greenPlayerDies: any;
  redPlayerDies: any;
  bluePlayerDies: any;
  yellowPlayerDies: any;
  stepsOfAllDie: any = [];
  constructor(private commonservice: CommonService, private renderer: Renderer2) { }

  ngOnInit() { }
  ngAfterViewInit() {
    // Ensure the elements exist before calling the function
    if (this.pathElements) {
      this.getElementPositions();
    } else {
      console.error('pathElements not found');
    }
    // Ensure the elements exist before calling the function
    if (this.innerpathElements) {
      this.getInnerElementPositions();
    } else {
      console.error('innerpathElements not found');
    }
    this.greenPlayerDies = this.commonservice.fetchAllDie(this.greenDotArea, 'greendie')
    this.redPlayerDies = this.commonservice.fetchAllDie(this.redDotArea, 'reddie')
    this.bluePlayerDies = this.commonservice.fetchAllDie(this.blueDotArea, 'bluedie')
    this.yellowPlayerDies = this.commonservice.fetchAllDie(this.yellowDotArea, 'yellowdie')
  }

  getElementPositions() {
    // Ensure elements exist before accessing them
    if (!this.pathElements || this.pathElements.length === 0) {
      console.error('No elements found!');
      return;
    }

    const positions = this.pathElements.toArray().map((element) => {
      const rect = element.nativeElement.getBoundingClientRect();
      return {
        number: parseInt(element.nativeElement.innerText, 10), // Extract number from inner text
        position: `Top: ${Math.round(rect.top)}, Left: ${Math.round(rect.left)}`
      };
    });

    // Sort elements by their number
    this.sortedPositions = positions.sort((a, b) => a.number - b.number);

    console.log('sortedPositions', this.sortedPositions);
  }
  getInnerElementPositions() {
    // Ensure elements exist before accessing them
    if (!this.innerpathElements || this.innerpathElements.length === 0) {
      console.error('No elements found!');
      return;
    }

    const positions = this.innerpathElements.toArray().map((element) => {
      const rect = element.nativeElement.getBoundingClientRect();
      return {
        number: parseInt(element.nativeElement.innerText, 10), // Extract number from inner text
        position: `Top: ${Math.round(rect.top)}, Left: ${Math.round(rect.left)}`
      };
    });

    // Sort elements by their number
    this.innersortedPositions = positions.sort((a, b) => a.number - b.number);

    console.log('this.innersortedPositions', this.innersortedPositions);
  }

  moveDieToPosition(die: HTMLElement, diceNumber: number, dieColor: any) {
    console.log("dieColor === ", dieColor);
    // Check if the die has an ID and if it includes 'elementpath'
    const dieId = die.getAttribute('id');
    if (dieId && (dieId.includes('elementpath') || dieId.includes('innerelementpath'))) {
      // Extract the current position number from the ID
      // const currentPosition = parseInt(dieId.replace('elementpath', ''), 10);
      const currentPosition = parseInt(dieId.replace(/^(elementpath|innerelementpath)/, ''), 10);
      console.log("currentPosition === ", currentPosition);
      if (!isNaN(currentPosition)) {
        // Calculate the new position by adding the dice number to the current position
        let newPosition: any;
        if (dieColor == 'green') {
          console.log("currentPosition === ", currentPosition);
          console.log("diceNumber === ", diceNumber);
          if (currentPosition >= 41 && currentPosition <= 46) {
            newPosition = this.MoveOnInnerElementPath(die, currentPosition, 41, diceNumber, 68);
            console.log("newPosition === ", newPosition);
            if (newPosition >= 68) {
              this.setIDforInnerPathElement(die, newPosition, dieColor);
            } else {
              this.setIDforPathElement(die, newPosition, dieColor);
            }
          } else if (currentPosition >= 68) {
            newPosition = currentPosition + diceNumber;
            this.setIDforInnerPathElement(die, newPosition, dieColor);
          } else {
            newPosition = this.checkConditionToMoveOnElementPath(currentPosition, 47, diceNumber, 1);
            this.setIDforPathElement(die, newPosition, dieColor);
          }
        } else if (dieColor == 'red') {
          console.log("currentPosition === ", currentPosition);
          console.log("diceNumber === ", diceNumber);
          if (currentPosition >= 28 && currentPosition <= 33) {
            newPosition = this.MoveOnInnerElementPath(die, currentPosition, 28, diceNumber, 63);
            console.log("newPosition === ", newPosition);
            if (newPosition >= 63) {
              this.setIDforInnerPathElement(die, newPosition, dieColor);
            } else {
              this.setIDforPathElement(die, newPosition, dieColor);
            }
          } else if (currentPosition >= 63) {
            newPosition = currentPosition + diceNumber;
            this.setIDforInnerPathElement(die, newPosition, dieColor);
          } else {
            newPosition = this.checkConditionToMoveOnElementPath(currentPosition, 47, diceNumber, 1);
            this.setIDforPathElement(die, newPosition, dieColor);
          }
        } else if (dieColor == 'blue') {
          console.log("currentPosition === ", currentPosition);
          console.log("diceNumber === ", diceNumber);
          if (currentPosition >= 15 && currentPosition <= 20) {
            newPosition = this.MoveOnInnerElementPath(die, currentPosition, 15, diceNumber, 58);
            console.log("newPosition === ", newPosition);
            if (newPosition >= 58) {
              this.setIDforInnerPathElement(die, newPosition, dieColor);
            } else {
              this.setIDforPathElement(die, newPosition, dieColor);
            }
          } else if (currentPosition >= 58) {
            newPosition = currentPosition + diceNumber;
            this.setIDforInnerPathElement(die, newPosition, dieColor);
          } else {
            newPosition = this.checkConditionToMoveOnElementPath(currentPosition, 47, diceNumber, 1);
            this.setIDforPathElement(die, newPosition, dieColor);
          }
        } else if (dieColor == 'yellow') {
          console.log("currentPosition === ", currentPosition);
          console.log("diceNumber === ", diceNumber);
          if (currentPosition >= 2 && currentPosition <= 7) {
            newPosition = this.MoveOnInnerElementPath(die, currentPosition, 2, diceNumber, 53);
            console.log("newPosition === ", newPosition);
            if (newPosition >= 53) {
              this.setIDforInnerPathElement(die, newPosition, dieColor);
            } else {
              this.setIDforPathElement(die, newPosition, dieColor);
            }
          } else if (currentPosition >= 53) {
            newPosition = currentPosition + diceNumber;
            this.setIDforInnerPathElement(die, newPosition, dieColor);
          } else {
            newPosition = this.checkConditionToMoveOnElementPath(currentPosition, 47, diceNumber, 1);
            this.setIDforPathElement(die, newPosition, dieColor);
          }
        }

        this.handleDieCollision(die, dieColor, currentPosition);
      } else {
        console.error('Invalid current position extracted from die ID');
      }
    } else {
      console.error('Die does not have a valid ID including "elementpath"');
    }
  }

  setIDforPathElement(die: HTMLElement, newPosition: number, dieColor: any) {
    console.log("setIDforPathElement caaled=== ",);
    console.log("newPosition === ", newPosition);
    const targetPosition = this.sortedPositions.find(pos => pos.number === newPosition);
    console.log("targetPosition === ", targetPosition);
    let previousDie = {
      die: die,
      color: dieColor,
      position: newPosition
    }
    this.stepsOfAllDie.push(previousDie);
    if (targetPosition) {
      const targetElement = this.pathElements.toArray().find(el => {
        const text = el.nativeElement.innerText.trim();
        return text.includes(newPosition.toString());
      });
      console.log("targetElement === ", targetElement);

      if (targetElement) {
        this.renderer.appendChild(targetElement.nativeElement, die);

        // Update the die's ID to reflect the new position
        const newDieId = `elementpath${newPosition}`;
        this.renderer.setAttribute(die, 'id', newDieId);

        console.log(`Die moved to position ${newPosition} and ID updated to ${newDieId}`);
        console.log("stepsOfAllDie === ", this.stepsOfAllDie);
        this.handleDieCollision(die, dieColor, newPosition);

      } else {
        console.error(`Target element with number ${newPosition} not found in pathElements`);
      }
    } else {
      console.error(`Position with number ${newPosition} not found in sortedPositions`);
    }

  }

  setIDforInnerPathElement(die: HTMLElement, newPosition: number, dieColor: any) {
    console.log("setIDforInnerPathElement === called");
    console.log("newPosition === ", newPosition);
    const newDieId = `insideWinnerHome`;
    if (dieColor == 'green' && newPosition > 72) {
      console.log(" const newDieId =", dieColor, newPosition);
      this.renderer.setAttribute(die, 'id', newDieId);
    } else if (dieColor == 'red' && newPosition > 67) {
      console.log(" const newDieId =", dieColor, newPosition);
      this.renderer.setAttribute(die, 'id', newDieId);
    } else if (dieColor == 'blue' && newPosition > 62) {
      console.log(" const newDieId =", dieColor, newPosition);
      this.renderer.setAttribute(die, 'id', newDieId);
    } else if (dieColor == 'yellow' && newPosition > 57) {
      console.log(" const newDieId =", dieColor, newPosition);
      this.renderer.setAttribute(die, 'id', newDieId);
    } else {
      const targetPosition = this.innersortedPositions.find(pos => pos.number === newPosition);
      console.log("targetPosition === ", targetPosition);
      if (targetPosition) {
        // Find the corresponding element in pathElements
        const targetElement = this.innerpathElements.toArray().find(el => {
          const text = el.nativeElement.innerText.trim();
          // return text === newPosition.toString();
          return text.includes(newPosition.toString());
        });


        if (targetElement) {
          // Move the die to the new position
          this.renderer.appendChild(targetElement.nativeElement, die);

          // Update the die's ID to reflect the new position
          const newDieId = `innerelementpath${newPosition}`;
          this.renderer.setAttribute(die, 'id', newDieId);

          console.log(`Die moved to position ${newPosition} and ID updated to ${newDieId}`);
        } else {
          console.error(`Target element with number ${newPosition} not found in pathElements`);
        }
      } else {
        console.error(`Position with number ${newPosition} not found in sortedPositions`);
      }
    }
  }
  checkConditionToMoveOnElementPath(currentPosition: any, checkCurrentPosition: any, diceNumber: any, numberToMove: any) {
    let newPosition: any;
    if (currentPosition == checkCurrentPosition && diceNumber == 6) {
      return newPosition = numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 1) && diceNumber >= 5) {
      return newPosition = diceNumber == 6 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 2) && diceNumber >= 4) {
      return newPosition = diceNumber == 6 ? (numberToMove + 2) : diceNumber == 5 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 3) && diceNumber >= 3) {
      return newPosition = diceNumber == 6 ? (numberToMove + 3) : diceNumber == 5 ? (numberToMove + 2) : diceNumber == 4 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 4) && diceNumber >= 2) {
      return newPosition = diceNumber == 6 ? (numberToMove + 4) : diceNumber == 5 ? (numberToMove + 3) : diceNumber == 4 ? (numberToMove + 2) : diceNumber == 3 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 5) && diceNumber >= 1) {
      return newPosition = diceNumber == 6 ? (numberToMove + 5) : diceNumber == 5 ? (numberToMove + 4) : diceNumber == 4 ? (numberToMove + 3) : diceNumber == 3 ? (numberToMove + 2) : diceNumber == 2 ? (numberToMove + 1) : numberToMove;
    } else {
      return newPosition = currentPosition + diceNumber;
    }
  }
  MoveOnInnerElementPath(die: HTMLElement, currentPosition: any, checkCurrentPosition: any, diceNumber: any, numberToMove: any) {
    let newPosition: any;
    if (currentPosition == checkCurrentPosition && diceNumber == 6) {
      console.log("checkCurrentPosition === ", checkCurrentPosition);
      return newPosition = numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 1) && diceNumber >= 5) {
      console.log("checkCurrentPosition + 1 === ", checkCurrentPosition + 1);
      return newPosition = diceNumber == 6 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 2) && diceNumber >= 4) {
      console.log("checkCurrentPosition + 2 === ", checkCurrentPosition + 2);
      return newPosition = diceNumber == 6 ? (numberToMove + 2) : diceNumber == 5 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 3) && diceNumber >= 3) {
      console.log("checkCurrentPosition + 3 === ", checkCurrentPosition + 3);
      return newPosition = diceNumber == 6 ? (numberToMove + 3) : diceNumber == 5 ? (numberToMove + 2) : diceNumber == 4 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 4) && diceNumber >= 2) {
      console.log("checkCurrentPosition + 4 === ", checkCurrentPosition + 4);
      return newPosition = diceNumber == 6 ? (numberToMove + 4) : diceNumber == 5 ? (numberToMove + 3) : diceNumber == 4 ? (numberToMove + 2) : diceNumber == 3 ? (numberToMove + 1) : numberToMove;
    } else if (currentPosition == (checkCurrentPosition + 5) && diceNumber >= 1) {
      console.log("checkCurrentPosition + 5 === ", checkCurrentPosition + 5);
      return newPosition = diceNumber == 6 ? (numberToMove + 5) : diceNumber == 5 ? (numberToMove + 4) : diceNumber == 4 ? (numberToMove + 3) : diceNumber == 3 ? (numberToMove + 2) : diceNumber == 2 ? (numberToMove + 1) : numberToMove;
    } else {
      return newPosition = currentPosition + diceNumber;
    }
  }


  eventPlayerGet6(playerDies: any, rollingplayer: any, dieColor: any) {
    // Store event listeners
    console.log("playerDies === ", playerDies);
    let eventListeners: (() => void)[] = [];
    for (let die of Object.values(playerDies)) {
      if (die) {
        this.renderer.addClass(die, 'dieHover');
        console.log("die === ", die);

        // Add event listener and store the remover function
        const listener = this.renderer.listen(die, 'click', () => {
          console.log('Die clicked:', die);

          // Remove 'dieHover' class from all dice
          for (let d of Object.values(playerDies)) {
            this.renderer.removeClass(d, 'dieHover');
          }
          // Remove all stored event listeners
          eventListeners.forEach(removeListener => removeListener());
          eventListeners = []; // Clear the array 
          // Hide the clicked die
          const dieElement = die as HTMLElement;
          const dieId = dieElement.getAttribute('id');
          if (dieId && (dieId.includes('elementpath') || dieId.includes('innerelementpath'))) {
            console.log("dieId.includes('elementpath') === ",);
            this.moveDieToPosition(dieElement, 6, dieColor);
          } else {
            this.renderer.addClass(die, 'hideDie');

            this.renderer.addClass(die, 'hideDie');
            // Determine the target number based on the playerDies
            let targetNumber: number;
            let bgcolor: any;
            if (rollingplayer === 'GreenPlayer') {
              targetNumber = 48;
              bgcolor = 'green';
            } else if (rollingplayer === 'YellowPlayer') {
              targetNumber = 9;
              bgcolor = 'yellow';
            } else if (rollingplayer === 'BluePlayer') {
              targetNumber = 22;
              bgcolor = 'blue';
            } else if (rollingplayer === 'RedPlayer') {
              targetNumber = 35;
              bgcolor = 'red';
            } else {
              console.error('Unknown rollingplayer');
              return;
            }

            // Fetch the object from sortedPositions with the target number
            const targetPosition = this.sortedPositions.find(pos => pos.number === targetNumber);
            if (targetPosition) {
              console.log('Target position:', targetPosition);

              // Find the corresponding element in pathElements and move the die
              console.log("this.pathElements === ", this.pathElements);
              console.log("targetNumber === ", targetNumber);
              // const targetElement = this.pathElements.toArray().find(el => {
              //   const text = el.nativeElement.innerText.trim();
              //   return text === targetNumber.toString();
              // });

              const targetElement = this.pathElements.toArray().find(el => {
                const nativeEl = el.nativeElement;
                const text = nativeEl.innerText.trim();
                const html = nativeEl.innerHTML.trim();
                const numStr = targetNumber.toString();
                return text.includes(numStr) || html.includes(numStr);
              });

              console.log("targetElement === ", targetElement);
              if (targetElement) {
                // Append the die to the target element
                this.renderer.appendChild(targetElement.nativeElement, die);
                this.renderer.removeClass(die, 'hideDie'); // Make the die visible again

                // Set the background color of the target element to red
                this.renderer.setStyle(targetElement.nativeElement, 'background-color', `${bgcolor}`);
                console.log(`Die moved to path number ${targetNumber} and background color set to ${bgcolor}`);

                // Add an ID to the die span
                const dieId = `elementpath${targetNumber}`;
                this.renderer.setAttribute(die, 'id', dieId);
                console.log(`ID set for die: ${dieId}`);
              } else {
                console.error(`Target path element with number ${targetNumber} not found`);
              }
            } else {
              console.error(`Position with number ${targetNumber} not found in sortedPositions`);
            }
          }

        });

        // Store the function to remove the event listener
        eventListeners.push(listener);
      }
    }
  }



  greenRolldice() {
    this.greenDiceNumber = this.commonservice.getDiceNumber();
    console.log("this.diceNumber === ", this.greenDiceNumber);
    console.log("this.greenPlayerDies === ", this.greenPlayerDies);

    if (this.greenDiceNumber === 6 && this.greenPlayerDies) {
      this.eventPlayerGet6(this.greenPlayerDies, 'GreenPlayer', 'green');
    }
    else {
      console.log('this.greenPlayerDies or dieParent is undefined:',);
      this.checkDieIdToMove(this.greenPlayerDies, this.greenDiceNumber, 'green');
    }
  }
  redRolldice() {
    this.redDiceNumber = this.commonservice.getDiceNumber()
    console.log("this.redPlayerDies === ", this.redPlayerDies);
    if (this.redDiceNumber === 6 && this.redPlayerDies) {
      this.eventPlayerGet6(this.redPlayerDies, 'RedPlayer', 'red');
    } else {
      console.log('this.redPlayerDies or dieParent is undefined:',);
      this.checkDieIdToMove(this.redPlayerDies, this.redDiceNumber, 'red');
    }
  }
  blueRolldice() {
    this.BlueDiceNumber = this.commonservice.getDiceNumber()
    console.log("this.diceNumber === ", this.BlueDiceNumber);
    console.log("this.bluePlayerDies === ", this.bluePlayerDies);
    if (this.BlueDiceNumber === 6 && this.bluePlayerDies) {
      this.eventPlayerGet6(this.bluePlayerDies, 'BluePlayer', 'blue');
    } else {
      console.log('bluePlayerDies or dieParent is undefined:',);
      this.checkDieIdToMove(this.bluePlayerDies, this.BlueDiceNumber, 'blue');
    }
  }

  yelloRolldice() {
    this.yellowDiceNumber = this.commonservice.getDiceNumber()
    console.log("this.diceNumber === ", this.yellowDiceNumber);

    console.log("this.yellowPlayerDies === ", this.yellowPlayerDies);
    if (this.yellowDiceNumber === 6 && this.yellowPlayerDies) {
      this.eventPlayerGet6(this.yellowPlayerDies, 'YellowPlayer', 'yellow');
    } else {
      console.log('this.yellowPlayerDies or dieParent is undefined:',);
      this.checkDieIdToMove(this.yellowPlayerDies, this.yellowDiceNumber, 'yellow');
    }
  }
  checkDieIdToMove(playerIS: any, playerDieNumber: any, dieColor: any) {
    const eventListeners: (() => void)[] = [];

    Object.values(playerIS)
      .filter(die => die instanceof HTMLElement) // Filter out invalid elements
      .forEach(die => {
        const dieId = die.getAttribute('id');
        if (dieId) {
          // Attach a click event to the die
          const listener = this.renderer.listen(die, 'click', () => {
            console.log('Die clicked:', die);
            this.moveDieToPosition(die, playerDieNumber, dieColor);

            // Remove all stored event listeners after the click
            eventListeners.forEach(removeListener => removeListener());
          });

          // Store the function to remove the event listener
          eventListeners.push(listener);
        } else {
          console.error('Die does not have a valid ID:', die);
        }
      });
  }


  // handleDieCollision(CurrentDie: HTMLElement, currentDieColor: string, currentPosition: any) {
  //   for (let i = 0; i < this.stepsOfAllDie.length; i++) {
  //     const step = this.stepsOfAllDie[i];
  //     if (step.die !== CurrentDie && step.color !== currentDieColor && step.position === currentPosition) {
  //       console.log('Collision occurred between', step.color, 'and', currentDieColor, 'at position', currentPosition);

  //       // Move the collided die back to its starting position  
  //       const collidedDie = step.die;
  //       const collidedDieId = collidedDie.getAttribute('id');
  //       let startingArea: ElementRef | undefined;
  //       if (collidedDieId && collidedDieId.includes('elementpath')) {
  //         if (step.color == 'green') {
  //           collidedDie.id = 'greendie' + i;
  //           startingArea = this.greenDotArea;
  //         } else if (step.color == 'red') {
  //           collidedDie.id = 'reddie' + i;
  //           startingArea = this.redDotArea;
  //         } else if (step.color == 'blue') {
  //           collidedDie.id = 'bluedie' + i;
  //           startingArea = this.blueDotArea;
  //         } else if (step.color == 'yellow') {
  //           collidedDie.id = 'yellowdie' + i;
  //           startingArea = this.yellowDotArea;
  //         }
  //       }


  //       if (startingArea) {
  //         // Append the collided die to its starting area
  //         this.renderer.appendChild(startingArea.nativeElement, collidedDie);
  //         console.log(`Collided die of color ${step.color} moved back to starting area with ID "cutted"`);
  //       } else {
  //         console.error(`Starting area for color ${step.color} not found`);
  //       }
  //       // Remove the collided die from the stepsOfAllDie array
  //       this.stepsOfAllDie.splice(i, 1);
  //       i--; // Adjust the index after removing an element

  //     }
  //   }
  // }


  handleDieCollision(CurrentDie: HTMLElement, currentDieColor: string, currentPosition: any) {
    for (let i = 0; i < this.stepsOfAllDie.length; i++) {
      const step = this.stepsOfAllDie[i];

      if (step.die !== CurrentDie && step.color !== currentDieColor && step.position === currentPosition) {
        console.log('Collision occurred between', step.color, 'and', currentDieColor, 'at position', currentPosition);

        const collidedDie = step.die;
        const collidedDieId = collidedDie.getAttribute('id');
        let startingArea: ElementRef | undefined;

        if (collidedDieId && collidedDieId.includes('elementpath')) {
          if (step.color === 'green') {
            collidedDie.id = 'greendie' + i;
            startingArea = this.greenDotArea;
          } else if (step.color === 'red') {
            collidedDie.id = 'reddie' + i;
            startingArea = this.redDotArea;
          } else if (step.color === 'blue') {
            collidedDie.id = 'bluedie' + i;
            startingArea = this.blueDotArea;
          } else if (step.color === 'yellow') {
            collidedDie.id = 'yellowdie' + i;
            startingArea = this.yellowDotArea;
          }
        }

        if (startingArea) {
          const corners = startingArea.nativeElement.querySelectorAll('.corner');
          let appended = false;

          for (let corner of corners) {
            // Check if corner already has a die (excluding static <span>)
            const hasDie = Array.from(corner.children).some(child => (child as HTMLElement).tagName !== 'SPAN');
            if (!hasDie) {
              this.renderer.appendChild(corner, collidedDie);
              appended = true;
              break;
            }
          }

          if (!appended) {
            console.warn('No available corner found, appending to the starting area by default');
            this.renderer.appendChild(startingArea.nativeElement, collidedDie);
          }

          console.log(`Collided die of color ${step.color} moved back to starting area`);
        } else {
          console.error(`Starting area for color ${step.color} not found`);
        }

        this.stepsOfAllDie.splice(i, 1);
        i--;
      }
    }
  }


}



