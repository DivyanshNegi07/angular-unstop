import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rows: any[][] = [];
  seatsPerRow: number = 7;
  totalSeats: number = 80;

  constructor() {
    this.initializeSeats();
  }

  // Initialize seat layout
  initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < 11; i++) {
      let row = [];
      for (let j = 0; j < (i === 10 ? 3 : this.seatsPerRow); j++) {
        row.push({ id: seatNumber++, status: 'available' });
      }
      this.rows.push(row);
    }
  }

  // Book seats based on user input
  bookSeats(requestedSeats: number) {
    let seatsBooked = false;

    for (let row of this.rows) {
      let availableSeats = row.filter(seat => seat.status === 'available');
      if (availableSeats.length >= requestedSeats) {
        for (let i = 0; i < requestedSeats; i++) {
          availableSeats[i].status = 'booked';
        }
        seatsBooked = true;
        break;
      }
    }

    if (!seatsBooked) {
      alert('Not enough consecutive seats available in a single row. Booking nearby seats.');
      this.bookNearbySeats(requestedSeats);
    }
  }

  // Book nearby seats if one-row booking isn't possible
  bookNearbySeats(requestedSeats: number) {
    let seatsToBook = requestedSeats;
    for (let row of this.rows) {
      for (let seat of row) {
        if (seatsToBook === 0) return;
        if (seat.status === 'available') {
          seat.status = 'booked';
          seatsToBook--;
        }
      }
    }
  }
}
