import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-health-insurance',
  templateUrl: './health-insurance.component.html',
  styleUrls: ['./health-insurance.component.css']
})
export class HealthInsuranceComponent implements OnInit {
  healthForm: FormGroup;
  response: boolean;
  submitted = false;
  mobileSubmitted = false;
  otpfield = false;
  otpResponse: any;
  applyButton: boolean;

  constructor(private api:ApiService, private fb:FormBuilder) {
    this.healthForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      otp: [null]
     });
   }
  ngOnInit(): void {
    window.scroll(0,0);
  }

  sendOTP(){
    this.mobileSubmitted = true;
    if (this.healthForm.controls.mobileNumber?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.healthForm.get('mobileNumber')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse=res['otp']
    }
  })
    this.otpfield = true;
  }
  Verify(){
    if(this.healthForm.value.otp==this.otpResponse && this.healthForm.value.otp!=null){
    this.applyButton = true;
    this.otpfield = false;
  }
  }
  get f(): { [key: string]: AbstractControl } { 
    return this.healthForm.controls; 
  }
  onSubmit(){
    this.mobileSubmitted = true;
    this.submitted = true;
    if (this.healthForm.invalid) {
      return;
  }
    const fdh = new FormData();
    fdh.append('firstname',this.healthForm.get('firstName')?.value);
    fdh.append('lastname',this.healthForm.get('lastName')?.value);
    fdh.append('mobile',this.healthForm.get('mobileNumber')?.value);
    fdh.append('email',this.healthForm.get('email')?.value);
    this.api.SendHealthInsuranceMail(fdh).subscribe(res=>{
      if(res!='success'){
        this.response = false;
      }
      else{
        this.response = true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.response = false;
          this.healthForm.reset();
          this.submitted = false;
      }, 3000);
      }
    })
  }
  onCancel(){
    this.healthForm.reset();
    this.submitted = false;
    this.mobileSubmitted = false;
  }
}
