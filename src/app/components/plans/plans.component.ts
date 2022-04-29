import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  planForm: any;
  submitted = false;
  response: boolean;
  mobileSubmitted = false;
  otpfield = false;
  otpResponse: any;
  applyButton: boolean;

  constructor(private api:ApiService, private route:ActivatedRoute, private fb:FormBuilder) {
    this.planForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone : ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
      otp: [null],
      vehicleBrand : ['', Validators.required],
      model : ['', Validators.required],
      year : ['', Validators.required],
      chassisNumber : ['', Validators.required],
    })
   }
  ngOnInit(): void {
    window.scroll(0,0);
  }
  sendOTP(){
    this.mobileSubmitted = true;
    if (this.planForm.controls.phone?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.planForm.get('phone')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse=res['otp']
    }
  })
    this.otpfield = true;
  }
  Verify(){
    if(this.planForm.value.otp==this.otpResponse && this.planForm.value.otp!=null){
    this.applyButton = true;
    this.otpfield = false;
  }
  }
  get f(): { [key: string]: AbstractControl } { 
    return this.planForm.controls; 
  }
  onSubmit(id:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.planForm.invalid) {
      return;
  }
  const fd = new FormData();
  fd.append('name',this.planForm.get('name')?.value);
  fd.append('email',this.planForm.get('email')?.value);
  fd.append('number',this.planForm.get('phone')?.value);
  fd.append('vehicle_brand',this.planForm.get('vehicleBrand')?.value);
  fd.append('model',this.planForm.get('model')?.value);
  fd.append('year',this.planForm.get('year')?.value);
  fd.append('chassis_number',this.planForm.get('chassisNumber')?.value);
  if(id==0){
  fd.append('plan',"Four Wheeler's Plan");
  }
  else if(id==1){
  fd.append('plan',"Two Wheeler's Plan");
  }
  // fd.append('plan',);
  this.api.SendPlanMail(fd).subscribe(res=>{
    if(res!='Success'){
      this.response=false;
    }
    else{
      this.response = true;
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.response = false;
        this.planForm.reset();
        this.submitted = false;
        this.applyButton = false;
    }, 3000);
    }
  })
}

close(){
  this.planForm.reset();
  this.submitted = false;
}

}
