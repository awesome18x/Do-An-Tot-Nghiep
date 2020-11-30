import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DanhmucicdService } from '../../../services/danhmucicd.service';
import { ICD } from '../../../../../models/icd';
@Component({
  selector: 'app-create-icd',
  templateUrl: './create-icd.component.html',
  styleUrls: ['./create-icd.component.css']
})
export class CreateIcdComponent implements OnInit {
  icdCurrent: ICD;
  private mode: string = 'create';
  id_icd: string;
  createForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dmicd: DanhmucicdService,
    private toastService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.has('id')) {
        this.id_icd = param.get('id');
        this.mode = 'update';
        this.dmicd.getICDById(this.id_icd).subscribe((data: any) => {
          this.icdCurrent = data.data;
          this.createForm.patchValue({
            ma: this.icdCurrent.ma,
            name: this.icdCurrent.name,
            nhom: this.icdCurrent.nhom,
            chuong: this.icdCurrent.chuong,
            active: this.icdCurrent.active
          });
        }, (error) => {
          console.log(error);
        });
      } else {
        this.mode = 'create';
        this.id_icd = null;
      }
    })
  }

  initForm() {
    this.createForm = this.fb.group({
      ma: ['', Validators.required],
      name: ['', Validators.required],
      nhom: ['', Validators.required],
      chuong: ['', Validators.required],
      active: [true]
    });
  }

  onSubmit() {
    // if (this.createForm.invalid) {
    //   return;
    // }
    if (this.mode === 'update') {
      this.dmicd.updateICD(this.id_icd, this.createForm.value).subscribe(data => {
        this.toastService.success('Cập nhật ICD thành công');
        this.router.navigate(['/danhmuc/icd/list']);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.dmicd.createICD(this.createForm.value).subscribe(data => {
        console.log(data);
        this.toastService.success('Tạo mới ICD thành công');
        this.router.navigate(['/danhmuc/icd/list']);
      }, (error) => {
        this.toastService.success('Có lỗi xảy ra, vui lòng kiểm tra lại');
        console.log(error);
      });
    }

  }

  returnPage() {
    this.router.navigate(['/danhmuc/icd/list']);
  }

}
