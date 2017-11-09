import {Injectable} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { startWith, map, merge } from 'rxjs/operators';
import {Link} from "../../../d3/models/link";

/** An example database that the data source uses to retrieve data for the table. */
@Injectable()
export class LinkDatabase {
  link: Link;
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>([]);
  get data(): Link[] { return this.dataChange.value; }

  constructor() {
    //TODO: if necessary call linkservice/watcher
  }
  /** Adds a new link to the database. */
  addSite(link:Link) {
    const copiedData = this.data.slice();
    copiedData.push(link);
    this.dataChange.next(copiedData);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, LinkDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
@Injectable()
export class LinkDataSource extends DataSource<any> {

  constructor(private _linkDatabase: LinkDatabase, private _sort: MatSort) {
    super();
    console.log("asdasdaweaweqeqw");

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Link[]> {
    console.log("sdfsdfsdsdf");
    const displayDataChanges = [
      this._linkDatabase.dataChange,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Link[] {
    const data = this._linkDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
       /* case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
        case 'friendly_name': [propertyA, propertyB] = [a.friendly_name, b.friendly_name]; break;
        case 'average_response_time': [propertyA, propertyB] = [a.average_response_time, b.average_response_time]; break;
        case 'hour': [propertyA, propertyB] = [a.hour, b.hour]; break;*/
        case 'edgeType': [propertyA, propertyB] = [a.edgeType, b.edgeType]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}

