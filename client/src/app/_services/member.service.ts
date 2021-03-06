import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';


@Injectable({
  providedIn: 'root'
})

export class MemberService {

  baseUrl = environment.apiUrl 
  members : Member[] = []

  constructor(private http : HttpClient) { }

  getMembers() 
  {
    if (this.members.length > 0 ) return of(this.members)
    return this.http.get<Member[]>(this.baseUrl + "users").pipe(
      map(member =>{ 
        this.members = member
        return member
      })
    )
  }

  getMember(username : string) 
  {
    const member = this.members.find(x => x.username === username)
    if (member !== undefined) return of(member)
    return this.http.get<Member>(this.baseUrl + "users/" + username)
  }

  updateMember(member : Member)
  {
    return this.http.put(this.baseUrl + 'users' , member).pipe(
      map(()=> {
        const Index = this.members.indexOf(member)
        this.members[Index] = member
      })
    )
  }


}
