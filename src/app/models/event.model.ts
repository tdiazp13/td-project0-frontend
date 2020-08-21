export interface IEventDef {
  id: string;
  event_name: string;
  event_category: string;
  event_place: string;
  event_address: string;
  event_initial_date: Date;
  event_final_date: Date;
  event_type: string;
}

export interface IEventTypeDef {
  id: number;
  description: string;
}

export interface IEventCategoryDef {
  id: number;
  description: string;
}
