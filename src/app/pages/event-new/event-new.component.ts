import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { IEventTypeDef, IEventCategoryDef, IEventDef } from 'src/app/models/event.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {

  types: IEventTypeDef[];
  categories: IEventCategoryDef[];
  newEvent: IEventDef;

  eventName: string;
  eventCategory: number;
  eventPlace: string;
  eventAddress: string;
  eventInitialDate: string;
  eventFinalDate: string;
  eventType: number;

  showModal: boolean;

  constructor(private events: EventService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const [types, categories] = await Promise.all([
        this.events.types(),
        this.events.categories()
      ]);
      this.types = types;
      this.categories = categories;
    } catch (error) {
      this.showModal = true;
    }
  }

  onSubmit = async (form: NgForm): Promise<void> => {
    try {
      const e = await this.events.create(form.value);
      await this.router.navigate(['/event', e.id]);
    } catch (error) {
      this.showModal = true;
    }
  }

}
