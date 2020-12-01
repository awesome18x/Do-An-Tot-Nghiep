import { LoaikhamService } from './../../../../dontiepngoaitru/services/loaikham.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-loaikham',
  templateUrl: './create-loaikham.component.html',
  styleUrls: ['./create-loaikham.component.css']
})
export class CreateLoaikhamComponent implements OnInit {
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private loaikhamService: LoaikhamService
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      STT: '',
      name: '',
      status: true
    });
  }

  onSubmit() {
    console.log(this.createForm.value);
    if (this.createForm.invalid) {
      return;
    }
    this.loaikhamService.createLoaiKham(this.createForm.value).subscribe(data => {
      this.toastrService.success('Tạo mới loại khám thành công');
      this.router.navigate(['/danhmuc/loai-kham/list']);
    }, (error) => {
      console.log(error);
    });
  }

  returnPage() {
    this.router.navigate(['/danhmuc/loai-kham/list']);
  }

}
