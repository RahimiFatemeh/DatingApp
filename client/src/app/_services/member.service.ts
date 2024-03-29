import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';


@Injectable({
  providedIn: 'root'
})

export class MemberService {

  baseUrl = environment.apiUrl 
  members : Member[] = []

  constructor(private http : HttpClient) { }

  getMembers(userParams : UserParams) 
  {
    let params = this.getPaginationHeader(userParams.pageNumber , userParams.pageSize)

    params = params.append('minAge' , userParams.minAge.toString())
    params = params.append('maxAge' , userParams.maxAge.toString())
    params = params.append('gender' , userParams.gender)

    return this.getpaginatedResult<Member[]>(this.baseUrl+'users' , params)
  }

  private getpaginatedResult<T>(url:string , params:any) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>()
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {

        paginatedResult.result = response.body!;

        if (response.headers.get('Pagination')) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeader(pageNumber: number , pageSize:number)
  {
    let params = new HttpParams()

    params = params.append('pageNumber' , pageNumber?.toString())
    params = params.append('pageSize' , pageSize?.toString())

    return params
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
