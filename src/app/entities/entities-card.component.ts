import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';


@Component({
  selector: 'app-entities-card',
  templateUrl: 'entities-card.component.html',
})
export class EntitiesCardComponent implements OnInit {
  @Input() entityCollection: EntityCollection;

  constructor(private tkapiService: TKApiService) {}

  ngOnInit(): void { }
}
