import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})


export class BlogDetailComponent implements OnInit,PipeTransform {
 
  id: any;
  blog: any;
  blogs: any;
  navUrl: any;
  url: any;
  safeURL: any;
  shareURL: any;
  reversedBlog: any;
  constructor(private api:ApiService,private route: ActivatedRoute,private router: Router,private _sanitizer:DomSanitizer) {}
  ngOnInit(): void {
    window.scroll(0,0);
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); 
  });
    this.listBlogDetail() ;
    this.listBlogDetails();
    this.shareURL = window.location.href;
  }
  transform(value) {
    return value.slice().reverse();
  }
  listBlogDetails() {
    this.api.GetBlogs().subscribe(res=>{
      this.blogs= res['response'];
      this.reversedBlog = this.blogs.reverse()
    })
  }
  listBlogDetail() {
    this.api.GetBlog(this.id).subscribe(res=>{
      let temp = res['response'];
      this.blog = temp[0];
      this.url = this.blog.video;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
    })
  }
  reload(){
    window.location.reload();
  }
}


@Pipe({ name: 'reverse' })

export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}