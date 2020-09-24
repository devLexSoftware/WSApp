import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-obra-info',
  templateUrl: './obra-info.page.html',
  styleUrls: ['./obra-info.page.scss'],
})
export class ObraInfoPage implements OnInit {

  obra: any = { };
  constructor(private activatedroute: ActivatedRoute) { 
        this.activatedroute.params.subscribe(data => {
          console.log(data);
          this.obra = data;
        })    
  }

  ngOnInit() {
  }

}
