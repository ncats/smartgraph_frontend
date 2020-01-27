import { Injectable } from '@angular/core';

@Injectable()
export class NodeExpandService {
  private  expandMap: Map<string, Expand> = new Map();

  fetchExpand(node: string): Expand {
    return this.expandMap.get(node) || new Expand();
  }
/*
  let ex = this.expandMap.get(node);
  if(ex){
    return ex;
}else{
  return new Expand();
}*/

  setExpand(node: string, expand: Expand): void {
    this.expandMap.set(node, expand);
  }

  clearNodes() {
    this.expandMap.clear();
  }

  constructor() { }

}

export class Expand {
  all = false;
  compound = false;
  pattern = false;
  predictions = false;
  target = false;

  constructor() {}
}
