import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehicle-insurance',
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.css']
})
export class VehicleInsuranceComponent implements OnInit {
  newPolicyForm: FormGroup;
  otherRenewalForm: FormGroup;
  newResponse: boolean;
  renewalResponse: boolean;
  vehicleList: any;
  submitted = false;
  submitted2 = false;
  mobileSubmitted = false;
  otpfield = false;
  otpResponse: any;
  applyButton: boolean;
  mobileSubmitted2 = false;
  otpfield2 = false;
  otpResponse2: any;
  applyButton2: boolean;

  constructor(private api:ApiService, private fb:FormBuilder) {
    // New Vehicle Policy Form
    this.newPolicyForm = this.fb.group({
      mobileNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
      otp: [null],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      regState: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      fuelType: ['', Validators.required],
      makeYear: ['', Validators.required],
      rtoName: ['', Validators.required],
      makeMonth: ['', Validators.required],
      date: ['', Validators.required],
      vehicleClass: ['', Validators.required]
     });
    //  Other Insurer Renewal Form
    this.otherRenewalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
      otp: [null],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      vehicleRegNo: ['', Validators.required],
      chassisNo: ['', Validators.required],
      vehicleClassOther: ['', Validators.required]
     });
   }
  ngOnInit(): void {
    window.scroll(0,0);
    this.listVehicleClass();
  }
  listVehicleClass() {
    this.api.GetVehicle().subscribe(res=>{
      this.vehicleList=res['response'];
    })
  }
  sendOTPNew(){
    this.mobileSubmitted = true;
    if (this.newPolicyForm.controls.mobileNumber?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.newPolicyForm.get('mobileNumber')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse=res['otp']
    }
  })
    this.otpfield = true;
  }
  verifyNew(){
    if(this.newPolicyForm.value.otp==this.otpResponse && this.newPolicyForm.value.otp!=null){
      this.applyButton = true;
      this.otpfield = false;
    }
  }
  get f(): { [key: string]: AbstractControl } { 
    return this.newPolicyForm.controls; 
  }
  onSubmitNew(){
    this.submitted = true;
      if (this.newPolicyForm.invalid) {
        return;
    }
    const fdr = new FormData();
    fdr.append('phone',this.newPolicyForm.get('mobileNumber')?.value);
    fdr.append('email',this.newPolicyForm.get('email')?.value);
    fdr.append('state',this.newPolicyForm.get('regState')?.value);
    fdr.append('manufacturer',this.newPolicyForm.get('manufacturer')?.value);
    fdr.append('model',this.newPolicyForm.get('model')?.value);
    fdr.append('fuel_type',this.newPolicyForm.get('fuelType')?.value);
    fdr.append('make_year',this.newPolicyForm.get('makeYear')?.value);
    fdr.append('rto_name',this.newPolicyForm.get('rtoName')?.value);
    fdr.append('make_month',this.newPolicyForm.get('makeMonth')?.value);
    fdr.append('date',this.newPolicyForm.get('date')?.value);
    fdr.append('id',this.newPolicyForm.get('vehicleClass')?.value);
    this.api.SendInsuranceMail(fdr).subscribe(res=>{
      if(res!='Success'){
      this.newResponse=false;}
      else{
        this.newResponse = true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.newResponse = false;
          this.newPolicyForm.reset();
          this.mobileSubmitted = false;
          this.submitted = false;
          this.applyButton = false;
      }, 3000);
      }
    })
  }
  sendOTPRenew(){
    this.mobileSubmitted2 = true;
    if (this.otherRenewalForm.controls.mobileNumber?.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('phone',this.otherRenewalForm.get('mobileNumber')?.value);
  this.api.SendOTP(fd).subscribe(res=>{
    if(res['message']=='Success'){
      this.otpResponse2=res['otp']
    }
  })
    this.otpfield2 = true;
  }
  verifyRenew(){
    if(this.otherRenewalForm.value.otp==this.otpResponse2 && this.otherRenewalForm.value.otp!=null){
      this.applyButton2 = true;
      this.otpfield2 = false;
    }
  }
  get s(): { [key: string]: AbstractControl } { 
    return this.otherRenewalForm.controls; 
  }
  onSubmitRenew(){
    this.submitted2 = true;
    if (this.otherRenewalForm.invalid) {
      return;
  }
    const fdr = new FormData();
    fdr.append('firstname',this.otherRenewalForm.get('firstName')?.value);
    fdr.append('lastname',this.otherRenewalForm.get('lastName')?.value);
    fdr.append('mobile',this.otherRenewalForm.get('mobileNumber')?.value);
    fdr.append('email',this.otherRenewalForm.get('email')?.value);
    fdr.append('vehicle_registration_number',this.otherRenewalForm.get('vehicleRegNo')?.value);
    fdr.append('Chaise_number',this.otherRenewalForm.get('chassisNo')?.value);
    fdr.append('id',this.otherRenewalForm.get('vehicleClassOther')?.value);
    this.api.SendInsuranceRenewalMail(fdr).subscribe(res=>{
      if(res!='Success'){
        this.renewalResponse=false;}
      else{
        this.renewalResponse = true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.renewalResponse = false;
          this.otherRenewalForm.reset();
          this.submitted2 = false;
          this.mobileSubmitted2 = false;
          this.applyButton2 = false;
      }, 3000);
      }
    })
  }
  onCancel(){
    this.newPolicyForm.reset();
    this.otherRenewalForm.reset();
    this.submitted = false;
    this.submitted2 = false;
    this.mobileSubmitted = false;
    this.mobileSubmitted2 = false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
