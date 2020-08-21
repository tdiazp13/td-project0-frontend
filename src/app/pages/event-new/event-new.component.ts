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
  eventInitialTime: string;
  eventFinalDate: string;
  eventFinalTime: string;
  eventType: number;

  showModal: boolean;
  loading = false;

  constructor(private events: EventService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const types = await this.events.types();
      const categories = await this.events.categories();
      this.types = types;
      this.categories = categories;
    } catch (error) {
      this.showModal = true;
    }
  }

  onSubmit = async (form: NgForm): Promise<void> => {
    try {
      this.loading = true;
      const f = form.value;
      f.event_final_date = `${f.event_final_date}T${f.event_final_time}`;
      f.event_initial_date = `${f.event_initial_date}T${f.event_initial_time}`;
      delete f.event_final_time;
      delete f.event_initial_time;
      await this.events.create(form.value);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.showModal = true;
    } finally {
      this.loading = false;
    }
  }

}
