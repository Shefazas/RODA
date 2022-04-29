import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  services: any;
  response: boolean;
  submitted = false;
  constructor(private api:ApiService, private fb:FormBuilder) { 
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(15)]],
      email: ['', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      serviceType: ['', [Validators.required, Validators.min(1)]],
      message: ['', Validators.required]
     }); 
  }
  ngOnInit(): void {
    window.scroll(0,0);
    this.listService();
  }
  listService() {
    this.api.GetService().subscribe(res=>{
      this.services=res['response'];
    })
  } 
  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } { 
    return this.contactForm.controls; 
  }
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
  }
    const fd = new FormData();
    fd.append('name',this.contactForm.get('name')?.value);
    fd.append('email',this.contactForm.get('email')?.value);
    fd.append('mobile',this.contactForm.get('phone')?.value);
    fd.append('message',this.contactForm.get('message')?.value);
    fd.append('id',this.contactForm.get('serviceType')?.value);
    this.api.SendContactUs(fd).subscribe(res=>{
      if(res!='Success'){
        this.response=false;
      }
      else{
        this.response = true;
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.response = false;
          this.contactForm.reset();
          this.submitted = false;
      }, 3000);
      }
      
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
