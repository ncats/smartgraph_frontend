
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'tooltip-visual',
  //templateUrl: './tooltip-visual.component.html',
  template:`
<img [src] = imageUrl>
`,

  styleUrls: ['./tooltip-visual.component.css']
})
export class TooltipVisualComponent implements OnInit {
  @Input() node: Node;

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
