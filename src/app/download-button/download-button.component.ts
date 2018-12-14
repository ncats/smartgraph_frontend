import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Renderer2} from '@angular/core';
import {unescape} from 'querystring';
import {GraphDataService} from "../services/graph-data.service";
import {Link} from '../d3/models/link';
import {Node} from '../d3/models/node';

@Component({
  selector: 'download-button',
  template: `
<button mat-button [matMenuTriggerFor]="menu">
  Download graph <mat-icon>file_download</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item (click)=" downloadJSON()">
    <mat-icon>code</mat-icon>
    <span>Cytoscape JSON</span>
  </button>
    <button mat-menu-item (click)=" downloadEdges()">
    <mat-icon>list</mat-icon>
    <span>Edge List</span>
  </button>
  <button mat-menu-item (click)=" downloadCSV()" disabled>
    <mat-icon>border_all</mat-icon>
    <span>CSV</span>
  </button>
<!--  <button mat-menu-item (click)=" downloadGraph()" disabled>
    <mat-icon>photo</mat-icon>
    <span>PNG</span>
  </button>-->
</mat-menu>
`,
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent implements OnInit {
  @ViewChild('#svg') el: ElementRef;

  file: any;
  constructor(private rd: Renderer2,
  private graphDataService: GraphDataService) {
  }

  ngOnInit() {
/*    console.log(this.rd.data);
    console.log(this.el);*/
  }

  ngAfterViewInit() {
    //  var div = this.elRef.nativeElement.querySelector('#');
    //  console.log(div);
/*    console.log(this.rd);
    console.log(this.el);*/
  }

  //

downloadJSON(){
    let cyto = new CytoJSON();
    let graph = this.graphDataService.returnGraph();
  for (let node of graph.nodes) {
    cyto.elements.nodes.push(new CytoNode(node));
  }
  for (let link of graph.links) {
    cyto.elements.edges.push(new CytoEdge(link));
  }
this.file = new Blob([JSON.stringify(cyto)], { type: "type: 'text/json'"});
  this.downloadFile();
}

downloadCSV(){}


downloadEdges(){
  let graph = this.graphDataService.returnGraph();
  let edgeList ='edge,source,target \n';
  for (let link of graph.links) {
    let src = link.source.uuid;
    let tgt = link.target.uuid;
    let edge = link.uuid;
    edgeList = edgeList + edge + "," + src +"," +tgt +'\n';
  }
  this.file = new Blob([edgeList], { type: "type: 'text/csv'"});
  this.downloadFile();
}

  downloadPNG(data: any, options: any) {
    console.log('downloading');
    const svgString = this.getSVGString(data.node());
    this.svgString2Image( svgString, 2 * options.width, 2 * options.height, save ); //  passes Blob and filesize String to the callback

    function save( dataBlob ){
      console.log(dataBlob);
     //  saveAs( dataBlob, 'D3 vis exported to PNG.png' ); //  FileSaver.js function
    }
   /* let image = new Image();
    image.src = 'data:image/svg+xml;base64,' + window.btoa(encodeURIComponent(svgString));
    console.log(image);
    let blob = new Blob([image], {type: 'image/png;charset=utf-8'});
    console.log(blob);
    let url = window.URL.createObjectURL(blob);
    console.log(url);
    window.open(url);*/
  }

  //  Below are the functions that handle actual exporting:
  getSVGString(svgNode) {
    svgNode.setAttribute('xlink', 'http:// www.w3.org/1999/xlink');
    const cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); //  Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); //  Safari NS namespace fix

    return svgString;

    function getCSSStyles(parentElement) {
      const selectorTextArr = [];

      //  Add Parent element Id and Classes to the list
      selectorTextArr.push('#' + parentElement.id);
      for (const classType of parentElement.classList) {
        if (!contains('.' + classType, selectorTextArr)) {
          selectorTextArr.push('.' + classType);
        }
      }
      //  Add Children element Ids and Classes to the list
      const nodes = parentElement.getElementsByTagName('*');
      for (const node of nodes) {
        const id = node.uuid;
        if (!contains('#' + id, selectorTextArr)) {
          selectorTextArr.push('#' + id);
        }
        const classes = node.classList;
        for (const nodeClass of classes) {
          if (!contains('.' + nodeClass, selectorTextArr)) {
            selectorTextArr.push('.' + nodeClass);
          }
        }
      }

      //  Extract CSS Rules
      let extractedCSSText = '';
      for (let r = 0; r < document.styleSheets.length; r++) {
        const css = document.styleSheets[r];
        try {
          if (!(css instanceof CSSStyleSheet)) continue;
        } catch (e) {
          if (e.name !== 'SecurityError') throw e; //  for Firefox
          continue;
        }
        //  Now TypeScript knows that your sheet is CSS sheet
        if (css) {
          const rules = css.cssRules ? css.cssRules : css.rules;
          if (rules) {
            for (let i = 0; i < rules.length; i++) {
              const rule = rules[i];
              if (!( rule instanceof CSSStyleRule )) continue;
              if (contains(rule.selectorText.split('[')[0], selectorTextArr))
                extractedCSSText += rule.cssText;
            }
          }
        }
      }

      return extractedCSSText;

      function contains(str, arr) {
        return arr.indexOf(str) !== -1;
      }

    }

    function appendCSS(cssText, element) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      styleElement.innerHTML = cssText;
      const refNode = element.hasChildNodes() ? element.children[0] : null;
      element.insertBefore(styleElement, refNode);
    }
  }

     svgString2Image(svgString, width, height, callback) {
      const imgsrc = 'data:image/svg+xml;base64,' + btoa(svgString); //  Convert SVG string to data URL

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      const image = new Image();
       image.src = imgsrc;
       image.onload = function () {
         context.clearRect(0, 0, width, height);


        context.drawImage(image, 0, 0, width, height);
console.log(context);

      //     console.log(blob);
      //   });
      };

       const blob = new Blob([image], {type: 'image/png;charset=utf-8'});
      console.log(canvas);
      console.log(blob);
      console.log(image);
    }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

    downloadFile():void{
  console.log(this.file);
      let url = window.URL.createObjectURL(this.file);
      window.open(url);
    }

}

export class CytoJSON{
  format_version ="1.0";
  "generated_by" = "cytoscape-3.6.0";
  target_cytoscapejs_version = "~2.1";
  data: Object = {
    shared_name: "smrtgraph.csv",
    name : "smrtgraph.csv",
    SUID : 64,
    __Annotations: [],
    selected: false
  };
elements = {
  edges:  [],
  nodes: []
};

constructor(){}
}

export class CytoNode{
  data={id:"", node:{}};
  position = {
    x : 0,
    y : 0
  };
  selected : boolean;

  constructor(node: Node){
    this.data.id = node.uuid;
    this.data.node = node;
    this.position.x= node['x'] || 0;
    this.position.y= node['y'] || 0;
    this.selected = false;
  }

}
export class CytoEdge{
  data = {
    id : '',
    source : '',
    target : '',
    properties: {}
  };
  selected : boolean;

  constructor(link:Link){
    this.data.id = link.uuid;
    this.data.properties = link;
    this.data.source = link.source['uuid'] || link.source;
    this.data.target = link.target['uuid'] || link.target;
    this.selected = false;
  }
}
