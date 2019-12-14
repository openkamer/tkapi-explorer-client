import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { Entity } from '../core/entities';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TKApiService} from '../core/tkapi.service';


@Component({
  selector: 'app-entity-card',
  templateUrl: 'entity-card.component.html',
})
export class EntityCardComponent implements OnInit {
  @Input() entity: Entity;
  modalRef: BsModalRef;

  constructor(private tkapiService: TKApiService, private modalService: BsModalService) {}

  ngOnInit(): void {
    for (const relation of this.entity.relations) {
      const entityUrl = this.entity.getAttribute('@odata.id').value;
      this.tkapiService.getEntityLinks(entityUrl, relation.type).subscribe(links => {
        relation.size = links.length;
        relation.sizeKnown = true;
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
