import {Component, Input, OnInit} from '@angular/core';

import { EntityCollection } from '../core/entities';


@Component({
  selector: 'app-entities-card',
  templateUrl: 'entities-card.component.html',
})
export class EntitiesCardComponent implements OnInit {
  @Input() entityCollection: EntityCollection;

  constructor() {}

  ngOnInit(): void { }
}
