import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/Member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  member! : Member | null
  constructor(private memberService : MemberService , private route : ActivatedRoute) { }

  ngOnInit(): void {    
    this.loadmember()

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide , 
        preview:false
      }
    ]
  }
  getImages(): NgxGalleryImage[] {
    const ImageUrl = []
    if (this.member?.photos)
    {
      for(const photo of this.member.photos)
      {
        ImageUrl.push({
          small : photo.url ,
          medium : photo.url,
          big : photo.url 
        })
      }
    }
    return ImageUrl
  }


  loadmember()
  {
    const memberUsername = this.route.snapshot.paramMap.get('username');
    if (memberUsername)
    {
      this.memberService.getMember(memberUsername).subscribe(member => {this.member = member})
    }
    this.galleryImages = this.getImages() 
  }
}
