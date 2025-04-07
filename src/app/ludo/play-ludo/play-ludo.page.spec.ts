import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayLudoPage } from './play-ludo.page';

describe('PlayLudoPage', () => {
  let component: PlayLudoPage;
  let fixture: ComponentFixture<PlayLudoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayLudoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
