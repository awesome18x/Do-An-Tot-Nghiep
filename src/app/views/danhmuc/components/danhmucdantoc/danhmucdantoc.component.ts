import { Component, OnInit } from '@angular/core';
import { DantocService } from '../../services/dantoc.service';
import { DanToc } from '../../../../models/dantoc';

@Component({
  selector: 'app-danhmucdantoc',
  templateUrl: './danhmucdantoc.component.html',
  styleUrls: ['./danhmucdantoc.component.css']
})
export class DanhmucdantocComponent implements OnInit {
  Dantocs: DanToc;
  constructor(
    private dantocService: DantocService
  ) { }

  ngOnInit(): void {
    this.dantocService.getAllDanToc().subscribe(data => {
      console.log(data);
    });
  }

}
