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

  constructor(
    private events: EventService,
    private aRoute: ActivatedRoute,
    private route: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const uuid = this.aRoute.snapshot.paramMap.get('uuid');
      const [event, types, categories] = await Promise.all([
        this.events.getById(uuid),
        this.events.types(),
        this.events.categories()
      ]);
      this.currentEvent = event;
      this.types = types;
      this.categories = categories;
    } catch (error) {
      this.showModal = true;
    }
  }

  onSubmit = async (form: NgForm): Promise<void> => {
    try {
      await this.events.update({ id: this.currentEvent.id, ...form.value });
      await this.route.navigate(['/dashboard']);
    } catch (error) {
      this.showModal = true;
    }
  }

  erase = async (uuid: string): Promise<void> => {
    try {
      await this.events.erase(uuid);
      await this.route.navigate(['/dashboard']);
    } catch (error) {
      this.showModal = true;
    }
  }

}
