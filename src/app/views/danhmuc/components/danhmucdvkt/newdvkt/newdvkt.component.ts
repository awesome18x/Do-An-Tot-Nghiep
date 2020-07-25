import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newdvkt',
  templateUrl: './newdvkt.component.html',
  styleUrls: ['./newdvkt.component.css']
})
export class NewdvktComponent implements OnInit {
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createForm = this.fb.group({
      type: ['1', Validators.required],
      madv: [''],
      name: [''],
      donvi: ['Lần', Validators.required],
      giabh: [''],
      giadv: [''],
      buongthuchien: [''],
      khoathuchien: [''],
      active: [true]
    });
  }

  onSubmit() {}

}
