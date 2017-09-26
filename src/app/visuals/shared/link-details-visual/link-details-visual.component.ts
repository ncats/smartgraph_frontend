import {Component, OnInit, Input} from '@angular/core';
import {Link} from "../../../d3/models/link";

@Component({
  selector: 'link-details-visual',
  templateUrl: 'link-details-visual.component.html',
  styleUrls: ['link-details-visual.component.css']
})
export class LinkDetailsVisualComponent implements OnInit {
    @Input() link: Link;
    @Input() node: Node;

  constructor() { }

  ngOnInit() {
    console.log(this.link);
  }

  getSmiles(node : any): string{
    if(node.properties && node.properties.smiles) {
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ LinkDetailsVisualComponent.parseSmiles(node.properties.smiles) +'&standardize=true&format=svg';
    }else if(node.properties && node.properties.canonical_smiles){
      return 'https://tripod.nih.gov/servlet/renderServletv12/?structure='+ LinkDetailsVisualComponent.parseSmiles(node.properties.canonical_smiles) +'&standardize=true&format=svg';
    }else{
      return null;
    }

  }

  private static parseSmiles(smiles: string): string {
    return smiles
      .replace(/[;]/g,'%3B')
      .replace(/[#]/g,'%23')
      .replace(/[+]/g,'%2B')
      .replace(/[\\]/g,'%5C')
      .replace(/[|]/g,'%7C');
  }


}
