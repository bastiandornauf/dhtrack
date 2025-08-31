export interface Resource {
  id: string;
  name: string;
  current: number;
  max: number;
  color: string;
}

export interface Character {
  id: string;
  name: string;
  resources: Resource[];
}
