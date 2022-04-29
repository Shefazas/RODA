import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any;
  constructor(private api:ApiService) { }
  ngOnInit(): void {
    window.scroll(0,0);
    this.listBlogs();
  }
  listBlogs() {
    this.api.GetBlogs().subscribe(res=>{
      this.blogs=res['response'] 
    })
  }
}
