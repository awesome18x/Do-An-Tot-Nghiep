import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DmbenhanService } from '../../../../../shared/services/dmbenhan.service';

@Component({
  selector: 'app-create-ba',
  templateUrl: './create-ba.component.html',
  styleUrls: ['./create-ba.component.css']
})
export class CreateBaComponent implements OnInit {
  idBenhAn: string;
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dmbenhanService: DmbenhanService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.has('id')) {
        this.idBenhAn = param.get('id');
      }
    })
  }

  initForm() {
    this.createForm = this.fb.group({
      ma: ['', Validators.required],
      name: ['', Validators.required],
      // thuocKhoa: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.createForm.value);
    this.dmbenhanService.createBenhAn(this.createForm.value).subscribe((data: any) => {
      this.toastrService.success('Tạo bệnh án mới thành công');
      this.router.navigate(['/danhmuc/benh-an/list']);
    }, (error) => {
      this.toastrService.success('Có lỗi xảy ra');
      console.log(error);
    });
    // return;
  }

  returnPage() {
    this.router.navigate(['/danhmuc/benh-an/list']);
  }

}
