import { Component, OnInit } from '@angular/core';
import { BackendService, Ticket } from '../backend.service';

@Component({
  selector: 'nrwl-test-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tickets = this.backend.tickets();

  constructor(private backend: BackendService) {}

  ngOnInit() {}
}
