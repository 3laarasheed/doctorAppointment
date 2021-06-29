import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './../shared/appointment.service';
import { Appointment } from '../shared/modals/appointment';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Bookings = [];

  constructor(
    private aptService: AppointmentService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  // goToEdit(appointmentID){
  //   this.navCtrl.navigateForward(`/edit-appointment/${appointmentID}`)
  // }

  deleteBooking(id) {
    console.log(id) // edit it with action sheet
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }
  }

}