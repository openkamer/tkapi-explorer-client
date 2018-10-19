import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-entities',
  templateUrl: 'entities.component.html',
})
export class EntitiesComponent implements OnInit {
  @Input() entityCollection: EntityCollection;

  constructor() {}

  ngOnInit(): void { }
}
