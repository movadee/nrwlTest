import { Component, OnInit } from '@angular/core';
import { BackendService, Ticket } from '../backend.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TicketsFacade } from '../+state/tickets.facade';

@Component({
  selector: 'nrwl-test-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  tickets$: Observable<any>;

  constructor(private ticketsFacade: TicketsFacade) {}

  ngOnInit() {
    this.tickets$ = this.ticketsFacade.allTickets$;
    this.form = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      assigneeId: new FormControl(''),
      completed: new FormControl('')
    });
  }

  onSubmit() {
    const { ticket } = this.form.value;
    if (ticket) {
      this.ticketsFacade.addTicket(ticket);
      this.form.reset();
    }
  }
}
