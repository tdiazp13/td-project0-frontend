import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {

  @Output() closeEvent = new EventEmitter<any>();

  constructor() { }

  close = () => this.closeEvent.emit();

}
