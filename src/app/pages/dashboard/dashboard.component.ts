import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { IEventDef, IEventCategoryDef, IEventTypeDef } from 'src/app/models/event.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showingEvents: IEventDef[];
  showModal: boolean;
  loading = true;

  constructor(private events: EventService, private router: Router, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    try {
      const allEvents = await this.events.getAll();
      const types = await this.events.types();
      const categories = await this.events.categories();
      this.associateFields(allEvents, 'event_type', types);
      this.associateFields(allEvents, 'event_category', categories);
      this.showingEvents = allEvents;
    } catch (error) {
      this.showModal = true;
    } finally {
      this.loading = false;
    }
  }

  goTo = async (uuid: string): Promise<void> => {
    await this.router.navigate(['/event', uuid]);
  }

  goToNew = async (): Promise<void> => {
    await this.router.navigate(['/new']);
  }

  removeEvent = async (uuid: string): Promise<void> => {
    try {
      await this.events.erase(uuid);
      window.location.reload();
    } catch (error) {
      this.showModal = true;
    }
  }

  logout = (): void => {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  associateFields = (events: IEventDef[], field: string, values: IEventCategoryDef[] | IEventTypeDef[]) =>
    events.forEach(e => { e[field] = values.find(v => v.id === e[field]).description; })

}
