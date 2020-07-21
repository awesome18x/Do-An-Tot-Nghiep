import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DantocService } from '../../../services/dantoc.service';
import { DanToc } from '../../../../../models/dantoc';

@Component({
  selector: 'app-newdt',
  templateUrl: './newdt.component.html',
  styleUrls: ['./newdt.component.css']
})
export class NewdtComponent implements OnInit {
  private dantocID: string;
  dantoc: DanToc;
  createForm: FormGroup;
  mode: string;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dantocService: DantocService,
    private toastService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.get('id')) {
        this.mode = 'update';
        this.dantocID = param.get('id');
        this.dantocService.getDanTocById(this.dantocID).subscribe((data: any) => {
          this.dantoc = {
            _id: data.dantoc._id,
            name: data.dantoc.name,
            ma: data.dantoc.ma,
            STT: data.dantoc.STT
          };
          this.createForm.setValue({
            ma: this.dantoc.ma,
            name: this.dantoc.name,
            STT: this.dantoc.STT ? this.dantoc.STT : ''
          });
        }, (error) => {
          console.log(error);
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  initForm() {
    this.createForm = this.fb.group({
      ma: ['', Validators.required],
      name: ['', Validators.required],
      STT: ['']
    });
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }
    if (this.mode === 'update') {
      this.dantocService.updateDantoc(this.dantoc._id, this.createForm.value).subscribe(data => {
        this.toastService.success('Cập nhật dân tộc thành công', 'Thành công');
        this.router.navigate(['danhmuc/dan-toc']);
      }, (error) => {
        this.toastService.warning(error, 'Có lỗi xảy ra');
        console.log(error);
      });
    } else {
        // const dt = new DanToc();
        // dt.name = this.createForm.value.name;
        // dt.ma = this.createForm.value.name;
        // dt.STT = this.createForm.value.STT;
        this.dantocService.createDanToc(this.createForm.value).subscribe((data) => {
        this.toastService.success('Tạo mới dân tộc thành công', 'Thành công');
        this.router.navigate(['danhmuc/dan-toc/list']);
        // console.log(data);
      }, (error) => {
        console.log(error);
      });
    }
  }

  returnPage() {
    this.router.navigate(['danhmuc/dan-toc/list']);
  }

}
