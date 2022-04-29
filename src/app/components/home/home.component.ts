import { AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as AOS from 'aos';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit,AfterViewInit{
  ////////////////owl carousel////////////
////banner///
 bannerOptions: OwlOptions = {
  items: 1,
  nav: false,
  loop: true,
  margin: 30,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplaySpeed: 1500,
  autoplayHoverPause: true,
  dots:false,
  autoWidth:true,
  
  responsive:{
  0:{
  items:1
  },
  600:{
  items:1
  },
  1000:{
  items:1
  }
  }
  };
////blog////
blogOptions: OwlOptions = {
  autoWidth: true,
  items: 1,
  slideBy:'page',
  margin: 10,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplaySpeed: 1500,
  autoplayHoverPause: true,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 200,
  navText: ['', ''],
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    740: {
      items: 3,
    },
    940: {
      items: 4,
    },
  },
};
////brand////
brandOptions: OwlOptions = {
  autoWidth: true,
  items: 1,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplaySpeed: 1500,
  autoplayHoverPause: true,
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 100,
  navText: ['', ''],
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    740: {
      items: 3,
    },
    940: {
      items: 5,
    },
  },
};
////////////////owl carousel end////////////////
  blog: any;
  blogs: any;
  partners: any;
  banners: any;
  tile: any;
  vendorForm: FormGroup;
  vendorResponse: boolean;
  sellerForm: FormGroup;
  sellerResponse: boolean;
  submitted = false;
  submitted2 = false;
  card2: any;
  card3: any;
  card1: any;
  mobileSubmitted = false;
  otpfield = false;
  otpResponse: any;
  applyButton: boolean;
  mobileSubmitted2 = false;
  otpfield2 = false;
  otpResponse2: any;
  applyButton2: boolean;
  constructor(private api:ApiService,private fb:FormBuilder,private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document){
      this.vendorForm = this.fb.group({
        vendorName: ['', Validators.required],
        vendorPhone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
        otp: [null],
        vendorEmail: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        vendorAddress: ['', Validators.required],
        vendorMessage: ['']
       }); 
      this.sellerForm = this.fb.group({
        sellerName: ['', Validators.required],
        sellerPhone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
        otp: [null],
        sellerEmail: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        sellerAddress: ['', Validators.required],
        sellerMessage: ['']
       }); 
    }
  ngAfterViewInit(){ }
  ngOnInit(): void {
    AOS.init({
      duration: 1200,
    })
    this.api.notifyObservable$.subscribe(res => {
            if(res.refresh){
                window.location.reload()
            }   
      })
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://apps.elfsight.com/p/platform.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);
    this.listBanner();
    this.listBlogs();
    this.listPartners();
    this.listTile();
    this.listCards();
  }
  listCards() {
    this.api.GetCard1().subscribe(res=>{
      this.card1=res['response'];
    })
    this.api.GetCard2().subscribe(res=>{
      this.card2=res['response'];
    })
    this.api.GetCard3().subscribe(res=>{
      this.card3=res['response'];
    })
  }
  listTile() {
    this.api.GetTile().subscribe(res=>{
      this.tile=res['response']
    })
  }
  listBanner() {
    this.api.GetBanners().subscribe(res=>{
      this.banners=res['response']
    })
  }
  listBlogs() {
    this.api.GetBlogs().subscribe(res=>{
      this.blogs=res['response'];
    })
  }
  listPartners(){
    this.api.GetPartner().subscribe(res=>{
      this.partners=res['response'];
    })
  }
  sendOTPVendor(){
    this.mobileSubmitted = true;
    if (this.vendorForm.controls.vendorPhone?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.vendorForm.get('vendorPhone')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse=res['otp']
    }
  })
    this.otpfield = true;
  }
  verifyVendor(){
    if(this.vendorForm.value.otp==this.otpResponse && this.vendorForm.value.otp!=null){
      this.applyButton = true;
      this.otpfield = false;
    }
  }
    // convenience getter for easy access to form fields
    get f(): { [key: string]: AbstractControl } { 
      return this.vendorForm.controls; 
    }
  onVendorSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.vendorForm.invalid) {
      return;
  }
  const fd = new FormData();
    fd.append('name',this.vendorForm.get('vendorName')?.value);
    fd.append('email',this.vendorForm.get('vendorEmail')?.value);
    fd.append('number',this.vendorForm.get('vendorPhone')?.value);
    fd.append('cmpny_address',this.vendorForm.get('vendorAddress')?.value);
    fd.append('message',this.vendorForm.get('vendorMessage')?.value);
    this.api.SendVendorMail(fd).subscribe(res=>{
      if(res!='Success'){
        this.vendorResponse=false;
      }
      else{
        this.vendorResponse = true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.vendorResponse = false;
          this.vendorForm.reset();
          this.submitted = false;
      }, 3000);
      }
    })
  }
  sendOTPSeller(){
    this.mobileSubmitted2 = true;
    if (this.sellerForm.controls.sellerPhone?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.sellerForm.get('sellerPhone')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse2=res['otp']
    }
  })
    this.otpfield2 = true;
  }
  verifySeller(){
    if(this.sellerForm.value.otp==this.otpResponse2 && this.sellerForm.value.otp!=null){
      this.applyButton2 = true;
      this.otpfield2 = false;
    }
  }
  // convenience getter for easy access to form fields
  get s(): { [key: string]: AbstractControl } {
     return this.sellerForm.controls; 
    }
  onSellerSubmit(){
    this.submitted2 = true;
    // stop here if form is invalid
    if (this.sellerForm.invalid) {
      return;
  }
    const fds = new FormData();
    fds.append('name',this.sellerForm.get('sellerName')?.value);
    fds.append('email',this.sellerForm.get('sellerEmail')?.value);
    fds.append('number',this.sellerForm.get('sellerPhone')?.value);
    fds.append('cmpny_address',this.sellerForm.get('sellerAddress')?.value);
    fds.append('message',this.sellerForm.get('sellerMessage')?.value);
    this.api.SendDealerMail(fds).subscribe(res=>{
      if(res!='Success'){
        this.sellerResponse=false;
      }
      else{
        this.sellerResponse=true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.sellerResponse = false;
          this.sellerForm.reset();
          this.submitted2 = false;
      }, 3000);
      }
    })
  }
  onClose(){
    this.vendorForm.reset();
    this.sellerForm.reset();
    this.submitted = false;
    this.submitted2 = false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  refresh(){
    this.api.notifyOther({refresh: true});
}
}
