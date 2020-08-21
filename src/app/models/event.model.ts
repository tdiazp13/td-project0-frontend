export interface IEventDef {
  id: string;
  event_name: string;
  event_category: number;
  event_place: string;
  event_address: string;
  event_initial_date: string;
  event_final_date: string;
  event_type: number;
}

export interface IEventTypeDef {
  id: number;
  description: string;
}

export interface IEventCategoryDef {
  id: number;
  description: string;
}
