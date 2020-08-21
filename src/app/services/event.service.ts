import { Injectable } from '@angular/core';
import { IEventDef, IEventTypeDef, IEventCategoryDef } from '../models/event.model';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  cachedTypes: IEventTypeDef[];
  cachedCategories: IEventCategoryDef[];

  constructor( private auth: AuthService ) { }

  private generateTokenHeader = () => ({ headers: { Authorization: `Token ${this.auth.token}`}});

  getAll = async (): Promise<IEventDef[]> =>
    (await fetch('http://localhost:8097/api/events/', this.generateTokenHeader())).json();

  getById = async (uuid: string): Promise<IEventDef> =>
    (await fetch(`http://localhost:8097/api/events/${uuid}`, this.generateTokenHeader())).json();

  create = async (event: IEventDef): Promise<IEventDef> =>
    (await fetch('http://localhost:8097/api/events/',
      {
        method: 'post',
        body: new URLSearchParams(JSON.parse(JSON.stringify(event))),
        ...this.generateTokenHeader()
      })).json();

  update = async (event: IEventDef): Promise<void> =>
    (await fetch(`http://localhost:8097/api/events/${event.id}`,
      {
        method: 'put',
        body: new URLSearchParams(JSON.parse(JSON.stringify(event))),
        ...this.generateTokenHeader()
      })).json();

  erase = async (uuid: string): Promise<void> =>
    (await fetch(`http://localhost:8097/api/events/${uuid}`, { method: 'delete', ...this.generateTokenHeader() })).json();

  types = async (): Promise<IEventTypeDef[]> => {
    if (this.cachedTypes) {
      return this.cachedTypes;
    }
    this.cachedTypes = await (await fetch('http://localhost:8097/api/event/types', this.generateTokenHeader())).json()
    return this.cachedTypes;
  }

  categories = async (): Promise<IEventCategoryDef[]> =>{
    if(this.cachedCategories){
      return this.cachedCategories;
    }
    this.cachedCategories = await (await fetch('http://localhost:8097/api/event/categories', this.generateTokenHeader())).json();
    return this.cachedCategories;
  }

}
