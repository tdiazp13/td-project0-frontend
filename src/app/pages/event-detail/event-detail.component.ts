import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { IEventDef, IEventTypeDef, IEventCategoryDef } from 'src/app/models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  currentEvent: IEventDef;
  types: IEventTypeDef[];
  categories: IEventCategoryDef[];
  showModal: boolean;
  loading = false;

  constructor(
    private events: EventService,
    private aRoute: ActivatedRoute,
    private route: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const uuid = this.aRoute.snapshot.paramMap.get('uuid');
      const event = await this.events.getById(uuid);
      const types = await this.events.types();
      const categories = await this.events.categories();
      (event as any).event_initial_time = event.event_initial_date.split('T')[1].slice(0, 5);
      (event as any).event_initial_date = event.event_initial_date.split('T')[0];
      (event as any).event_final_time = event.event_final_date.split('T')[1].slice(0, 5);
      (event as any).event_final_date = event.event_final_date.split('T')[0];
      this.currentEvent = event;
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
      await this.events.update({ id: this.currentEvent.id, ...f });
      await this.route.navigate(['/dashboard']);
    } catch (error) {
      this.showModal = true;
    } finally {
      this.loading = false;
    }
  }

  erase = async (uuid: string): Promise<void> => {
    try {
      await this.events.erase(uuid);
      await this.route.navigate(['/dashboard']);
    } catch (error) {
      this.showModal = true;
    } finally {
      this.loading = false;
    }
  }

}
