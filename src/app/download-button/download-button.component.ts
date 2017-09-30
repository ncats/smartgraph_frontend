import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Renderer2} from '@angular/core';
import {unescape} from "querystring";

@Component({
  selector: 'download-button',
  template: `
      <button md-button>Download current graph <i class="material-icons">file_download</i></button>

`,
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent implements OnInit {
  @ViewChild('#svg') el:ElementRef;

  constructor(private rd: Renderer2) { }

  ngOnInit() {
    console.log(this.rd.data);
  console.log(this.el);
  }

  ngAfterViewInit() {
   // var div = this.elRef.nativeElement.querySelector('#');
   // console.log(div);
    console.log(this.rd);
    console.log(this.el);
  }

  //




  downloadFile(data: any){
    console.log("downloading");
    console.log(data);
    var blob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  // Set-up the export button
/*  d3.select('#saveButton').on('click', function(){
  var svgString = getSVGString(svg.node());
  svgString2Image( svgString, 2*width, 2*height, 'png', save ); // passes Blob and filesize String to the callback

  function save( dataBlob, filesize ){
    saveAs( dataBlob, 'D3 vis exported to PNG.png' ); // FileSaver.js function
  }
});*/

// Below are the functions that handle actual exporting:
   getSVGString( svgNode ) {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  var cssStyleText = getCSSStyles( svgNode );
  appendCSS( cssStyleText, svgNode );

  var serializer = new XMLSerializer();
  var svgString = serializer.serializeToString(svgNode);
  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

  return svgString;

  function getCSSStyles( parentElement ) {
    var selectorTextArr = [];

    // Add Parent element Id and Classes to the list
    selectorTextArr.push( '#'+parentElement.id );
    for (var c = 0; c < parentElement.classList.length; c++)
      if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
        selectorTextArr.push( '.'+parentElement.classList[c] );

    // Add Children element Ids and Classes to the list
    var nodes = parentElement.getElementsByTagName("*");
    for (var i = 0; i < nodes.length; i++) {
      var id = nodes[i].id;
      if ( !contains('#'+id, selectorTextArr) )
        selectorTextArr.push( '#'+id );

      var classes = nodes[i].classList;
      for (var c = 0; c < classes.length; c++)
        if ( !contains('.'+classes[c], selectorTextArr) )
          selectorTextArr.push( '.'+classes[c] );
    }

    // Extract CSS Rules
    var extractedCSSText = "";
    for (var i = 0; i < document.styleSheets.length; i++) {
      var s = document.styleSheets[i];
/*      try {
        if(!s.cssRules) continue;
      } catch( e ) {
        if(e.name !== 'SecurityError') throw e; // for Firefox
        continue;
      }

      var cssRules = s.cssRules;
      for (var r = 0; r < cssRules.length; r++) {
        if ( contains( cssRules[r].selectorText, selectorTextArr ) )
          extractedCSSText += cssRules[r].cssText;
      }*/
    }


    return extractedCSSText;

    function contains(str,arr) {
      return arr.indexOf( str ) === -1 ? false : true;
    }

  }

  function appendCSS( cssText, element ) {
    var styleElement = document.createElement("style");
    styleElement.setAttribute("type","text/css");
    styleElement.innerHTML = cssText;
    var refNode = element.hasChildNodes() ? element.children[0] : null;
    element.insertBefore( styleElement, refNode );
  }
}


  svgString2Image( svgString, width, height, format, callback ) {
  var format = format ? format : 'png';

  var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  var image = new Image();
  image.onload = function() {
    context.clearRect ( 0, 0, width, height );
    context.drawImage(image, 0, 0, width, height);

    canvas.toBlob( function(blob) {
      var filesize = Math.round( blob.size/1024 ) + ' KB';
      if ( callback ) callback( blob, filesize );
    });


  };

  image.src = imgsrc;
}

}
