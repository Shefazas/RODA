import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.css']
})
export class CareerDetailComponent implements OnInit {
  id: any;
  job: any;
  jobList :any;
  userForm: FormGroup;
  response: boolean;
  File: File
  resumeFileName: any;
  mailSent: boolean;
  submitted = false;
  mobileSubmitted = false;
  otpfield = false;
  otpResponse: any;
  applyButton = false;
  constructor(private api:ApiService,private route: ActivatedRoute, private fb:FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      name: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
      otp: [null],
      career_category: ['', [Validators.required, Validators.min(1)]],
      file: []
     }); 
   }
  ngOnInit(): void {
    window.scroll(0,0);
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); 
      this.listJobs();
  }); 

  this.listCareerDetail()
  }
  listCareerDetail() {
    this.api.GetCareer(this.id).subscribe(res=>{
      let temp=res['response'];
      this.job=temp[0];
      
    })
  }
  onFileChanged(event: any) {
    if (event.target.files && event.target.files.length) {
    const file = event.target.files[0];
    this.File = file;
    this.resumeFileName = file.name;
    }
  }
  sendOTP(){
    this.mobileSubmitted = true;
    if (this.userForm.controls.mobile?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.userForm.get('mobile')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse=res['otp']
    }
  })
    this.otpfield = true;
  }
  Verify(){
    if(this.userForm.value.otp==this.otpResponse && this.userForm.value.otp!=null){
    this.applyButton = true;
    this.otpfield = false;
  }
  }
  get f(): { [key: string]: AbstractControl } { 
    return this.userForm.controls; 
  }
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('file',this.File,this.resumeFileName);
    fd.append('name',this.userForm.get('name')?.value);
    fd.append('email',this.userForm.get('email')?.value);
    fd.append('mobile',this.userForm.get('mobile')?.value);
    fd.append('career_category',this.userForm.get('career_category')?.value);
    this.api.SendCareer(fd).subscribe(res=>{})
    const fdmail = new FormData();
    fdmail.append('file',this.File,this.resumeFileName);
    fdmail.append('name',this.userForm.get('name')?.value);
    fdmail.append('mail',this.userForm.get('email')?.value);
    fdmail.append('phone',this.userForm.get('mobile')?.value);
    fdmail.append('id',this.userForm.get('career_category')?.value);
    this.api.SendCareerMail(fdmail).subscribe((res)=>{
      this.mailSent=true
      if(res!='Success'){
        this.response=false;
      }
      else{
        this.response = true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.response = false;
          this.userForm.reset();
          this.submitted = false;
      }, 3000);
      }
    })
  }
  listJobs() {
    this.api.GetCareers().subscribe(res => {
      this.jobList=res['response']
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
