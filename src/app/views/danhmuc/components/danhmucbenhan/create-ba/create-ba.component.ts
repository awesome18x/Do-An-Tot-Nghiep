import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DmbenhanService } from '../../../../../shared/services/dmbenhan.service';

@Component({
  selector: 'app-create-ba',
  templateUrl: './create-ba.component.html',
  styleUrls: ['./create-ba.component.css']
})
export class CreateBaComponent implements OnInit {
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dmbenhanService: DmbenhanService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createForm = this.fb.group({
      ma: ['', Validators.required],
      name: ['', Validators.required],
      thuocKhoa: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.createForm.value);
    this.dmbenhanService.createBenhAn(this.createForm.value).subscribe(data => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    return;
  }

  returnPage() {}

}
