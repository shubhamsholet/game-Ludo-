import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor() { }


  getDiceNumber() {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    return diceNumber
  }

  fetchAllDie(player: any, playerColor: string) {
    const spans = player.nativeElement.querySelectorAll('span');
    console.log("spans === ", spans);

    spans.forEach((span: HTMLElement, index: number) => {
      span.id = `${playerColor}${index}`;
    });

    const firstDie = spans[0];
    const secondDie = spans[1];
    const thirdDie = spans[2];
    const fourthDie = spans[3];

    const playerAllDeis = {
      firstDie: firstDie,
      secondDie: secondDie,
      thirdDie: thirdDie,
      fourthDie: fourthDie
    };

    return playerAllDeis;
  }

}
