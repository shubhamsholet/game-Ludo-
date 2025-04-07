import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonButton, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-ludo',
  templateUrl: './ludo.component.html',
  styleUrls: ['./ludo.component.scss'],
  imports: [IonTitle, IonHeader, IonToolbar, IonContent, IonButton]
})
export class LudoComponent implements OnInit {


  constructor(private route: Router) { }
  ngOnInit() { }

  playGame() {
    this.route.navigate(['/play-ludo'])
  }
}
