import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();
  baseUrl: any;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  GetBanners(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listbanner/');
  }
  GetBlogs(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listnewsandblog/');
  }
  GetBlog(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listnewsandblogbyid/' + id + '/');
  }
  GetPartner(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listpartnerlogo/');
  }
  GetTile(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listtile/');
  }
  GetAccessory(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listaccessory/');
  }
  GetCard1(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listcard1/');
  }
  GetCard2(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listcard2/');
  }
  GetCard3(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listcard3/');
  }
  GetCareers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listcareers/');
  }
  GetCareer(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listcareerbyid/' + id + '/');
  }
  GetVehicle(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listvehicle/');
  }
  GetService(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listservice/');
  }
  GetTeam(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/listTeamimages/');
  }

  SendCareer(data: any){
    return this.http.post(this.baseUrl + 'api/addcareerform/',data);
  }
  SendCareerMail(data: any){
    return this.http.post(this.baseUrl + 'api/addcareermail/',data);
  }
  SendVendorMail(data: any){
    return this.http.post(this.baseUrl + 'api/sendvendoremail/',data);
  }
  SendDealerMail(data: any){
    return this.http.post(this.baseUrl + 'api/senddealeremail/',data);
  }
  SendContactUs(data: any){
    return this.http.post(this.baseUrl + 'api/contactus/',data);
  }
  SendInsuranceMail(data: any){
    return this.http.post(this.baseUrl + 'api/vehicleinsurenceemail/',data);
  }
  SendInsuranceRenewalMail(data: any){
    return this.http.post(this.baseUrl + 'api/vehicleinsurencerenewalemail/',data);
  }
  SendHealthInsuranceMail(data: any){
    return this.http.post(this.baseUrl + 'api/healthinsurencemail/',data);
  }
  SendPlanMail(data: any){
    return this.http.post(this.baseUrl + 'api/planmail/',data);
  }
  public SendOTP(data: any){
    return this.http.post(this.baseUrl+'api/otpmobile/',data)
  }
  
  public notifyOther(data: any) {
    if (data) {
        this.notify.next(data);
    }
  }
}
