import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { Entity } from '../core/entities';


@Component({
  selector: 'app-entity-card',
  templateUrl: 'entity-card.component.html',
})
export class EntityCardComponent implements OnInit {
  @Input() entity: Entity;

  constructor(private tkapiService: TKApiService) {}

  ngOnInit(): void { }
}
