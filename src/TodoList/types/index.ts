export enum FilterMode {
  All = "All",
  Done = "Done",
  NotDone = "NotDone",
}

export interface TodoItem {
  checked: boolean;
  name: string;
  id: string;
}

export interface FilterInterface {
  keyword: string;
  mode: FilterMode;
}
