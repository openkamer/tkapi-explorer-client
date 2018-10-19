import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { Entity } from '../core/entities';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-entity-card',
  templateUrl: 'entity-card.component.html',
})
export class EntityCardComponent implements OnInit {
  @Input() entity: Entity;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
