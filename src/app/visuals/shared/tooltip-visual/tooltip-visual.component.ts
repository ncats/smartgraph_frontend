import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: '[app-tooltip-visual]',
  //templateUrl: './tooltip-visual.component.html',
  template:`
<svg:g
  class="tooltip node-name">
  <image *ngIf ="node.hovered" attr.href="{{imageUrl}}" height="200px" width="200px" >
  </image>
  <svg:text [attr.font-size]="node.fontSize">
  {{node.pref_name}}
  {{node.id}}
  yo
  </svg:text>

</svg:g>
`,

  styleUrls: ['./tooltip-visual.component.css']
})
export class TooltipVisualComponent implements OnInit {
  @Input('app-tooltip-visual') node: Node;

  imageUrl:string;
  constructor() { }

  ngOnInit() {
    this.getSmiles(this.node);
  }

  //getSmiles(node : Pattern| Lychi ): void{
  getSmiles(node : any): void{
    if(node.properties && node.properties.smiles) {
      this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.smiles) +'&standardize=true&format=svg';
    }
    if(node.properties && node.properties.canonical_smiles){
      this.imageUrl = 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ this.parseSmiles(node.properties.canonical_smiles) +'&standardize=true&format=svg';

    }

  }

  parseSmiles(smiles: string): string {
    let parsed = smiles
      .replace(/[;]/g,'%3B')
      .replace(/[#]/g,'%23')
      .replace(/[+]/g,'%2B')
      .replace(/[\\]/g,'%5C')
      .replace(/[|]/g,'%7C');
    return parsed;
  }
}
