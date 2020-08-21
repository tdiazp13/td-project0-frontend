import { Injectable } from '@angular/core';
import { IEventDef, IEventTypeDef, IEventCategoryDef } from '../models/event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private auth: AuthService) { }

  private generateTokenHeader = () => ({ headers: { Authorization: `Token ${this.auth.token}` } });

  getAll = async (): Promise<IEventDef[]> =>
    (await fetch('http://172.24.98.88:8097/api/events/', this.generateTokenHeader())).json()

  getById = async (uuid: string): Promise<IEventDef> =>
    (await fetch(`http://172.24.98.88:8097/api/events/${uuid}`, this.generateTokenHeader())).json()

  create = async (event: IEventDef): Promise<IEventDef> =>
    (await fetch('http://172.24.98.88:8097/api/events/',
      {
        method: 'post',
        body: new URLSearchParams(JSON.parse(JSON.stringify(event))),
        ...this.generateTokenHeader()
      })).json()

  update = async (event: IEventDef): Promise<void> =>
    (await fetch(`http://172.24.98.88:8097/api/events/${event.id}`,
      {
        method: 'put',
        body: new URLSearchParams(JSON.parse(JSON.stringify(event))),
        ...this.generateTokenHeader()
      })).json()

  erase = async (uuid: string): Promise<void> =>
    (await fetch(`http://172.24.98.88:8097/api/events/${uuid}`, { method: 'delete', ...this.generateTokenHeader() })).json()

  types = async (): Promise<IEventTypeDef[]> => {
    if (localStorage.getItem('types')) {
      return JSON.parse(localStorage.getItem('types'));
    }
    const t = await (await fetch('http://172.24.98.88:8097/api/event/types', this.generateTokenHeader())).json();
    localStorage.setItem('types', JSON.stringify(t));
    return t;
  }

  categories = async (): Promise<IEventCategoryDef[]> => {
    if (localStorage.getItem('categories')) {
      return JSON.parse(localStorage.getItem('categories'));
    }
    const c = await (await fetch('http://172.24.98.88:8097/api/event/categories', this.generateTokenHeader())).json();
    localStorage.setItem('categories', JSON.stringify(c));
    return c;
  }

}
