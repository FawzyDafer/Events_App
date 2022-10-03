import { Injectable } from '@angular/core';
import { catchError, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  organizers:any =[] ;
  token:any;
  constructor() { }


  getAllOrganizer():Observable<any> {
    var Nuxeo = require('nuxeo')
    var nuxeo = new Nuxeo({
      baseURL: 'http://35.153.66.52/nuxeo',
     auth:
     {
        method: 'basic', username: 'Administrator',
        password: 'Administrator'
      },
      headers: {
        properties: '*',
      },

    });
    return nuxeo.request('/search/pp/PP_Organizar/execute')
       .get()
       .then((res: any) => {
       of(res).subscribe(re => {
          if (re.entries.length) {
            //console.log(this.token)
          console.log(re);
          this.organizers = [];
           re.entries.map((item: any) => {
           
             this.organizers.push({
               id: item.uid,
            
               title: item.title,
               emails:item.properties['organizer:emails'],
               addresses:item.properties['organizer:addresses'],
               organizer:item.properties['organizer:organizationActivity'],
                phones:item.properties['organizer:phones'],
                name:item.properties['organizer:name'],    
              })
          })
         }
       })
        console.log(this.organizers);
      })
       .catch((error: any) => {
         throw new Error(error);
       });
  
  }

  deleteOrganizer(uid: any): Observable<any> {
    var Nuxeo = require('nuxeo')
    var nuxeo = new Nuxeo({
      baseURL: 'http://35.153.66.52/nuxeo',
      auth: {
        method: 'bearerToken',
       token: localStorage.getItem("token")
      },
     headers: {
       properties: '*',
      }
    });
   return from(
    
     nuxeo.operation('/AC_UA_Organizer_Delete').input(uid).execute()
    ).pipe(
      catchError((err:any) => {
        throw err;
      })
   );
  }

  addOrganizer(submitOrganizerForm:any){

    const organizer = this.mapData(submitOrganizerForm);
   var Nuxeo = require('nuxeo')
      var nuxeo = new Nuxeo({
         baseURL: 'http://35.153.66.52/nuxeo',
         auth: {
           method: 'bearerToken',
           token: localStorage.getItem("token")
         },
         headers: {
          properties: '*',
         }
       });
     return  nuxeo.operation('/AC_UA_Activity_Create')
         .context({

          organizer
        //   "organizer:name": "Fawzy Dafer",
        //   "organizer:emails": [
        //     {
        //          "label": "label1",
        //          "emailAddress": "org@gmail.com"
        //       }
        //    ],
        //  "organizer:addresses": [
        //      {
        //           "label": "label1",
        //           "address": "test"
        //       }
        //    ],
        //  "organizer:organizationActivity": "test",
        //  "organizer:phones": [
        //       {
        //           "label": "فوزي ",
        //           "phoneNumber": "01060214298"
        //      },
        //      {
        //          "label": "labs",
        //           "phoneNumber": "9a9999999"
        //       },
        //     {
        //           "label": "label1",
        //           "phoneNumber": "9999a9999"
        //       }
        //  ],
        //  "organizer:website": "Fawzy"          
               }).input("/").param().execute()
       .then((docs: any) => {
         // work with docs
       })
       .catch((error: any) => {
         // something went wrong
         throw error;
       });

    
   } 

   updateOrganizer(){
    var Nuxeo = require('nuxeo')
    var nuxeo = new Nuxeo({
       baseURL: 'http://35.153.66.52/nuxeo',
       auth: {
         method: 'bearerToken',
         token: localStorage.getItem("token")
       },
       headers: {
        properties: '*',
       }
     });

   return  nuxeo.operation('/AC_UA_Organizer_Update')
       .context({
        "organizer:name": "alhan",
        "organizer:emails": [
          {
               "label": "label1",
               "emailAddress": "org@gmail.com"
            }
         ],
       "organizer:addresses": [
           {
                "label": "label1",
                "address": "test"
            }
         ],
       "organizer:organizationActivity": "test",
       "organizer:phones": [
            {
                "label": "فوزي ",
                "phoneNumber": "01060214298"
           },
           {
               "label": "labs",
                "phoneNumber": "9a9999999"
            },
          {
                "label": "label1",
                "phoneNumber": "9999a9999"
            }
       ],
       "organizer:website": ""          
             }).input("2251212b-1010-4a52-b1ad-58ff218bea83").execute()
     .then((docs: any) => {
       // work with docs
     })
     .catch((error: any) => {
       // something went wrong
       throw error;
     });
   }


   mapData(obj: any) {
    return {

      "organizer:name": obj.title,
      "organizer:emails": [
        {
             "label": obj.label1,
             "emailAddress": obj.emailAddress
          }
       ],
     "organizer:addresses": [
         {
              "label": obj.label2,
              "address": obj.address
          }
       ],
     "organizer:organizationActivity": obj.activity,
     "organizer:phones": [
          {
              "label": obj.label3,
              "phoneNumber": obj.phoneNumber
         },
         {
             "label": "labs",
              "phoneNumber": "9a9999999"
          },
        {
              "label": "label1",
              "phoneNumber": "9999a9999"
          }
     ],
     "organizer:website": obj.website  
      
      // "dc:title": obj.title,
      // "dc:description": obj.description,
      // "activity:categorization": obj.categorization,
      // "activity:organizers": "f37da589-e20a-4c19-a64f-e371e3e76fc3",
      // "activity:locations": {
      //   "city": obj.locations,
      //   "geographicLocation": ""
      // },
      // "activity:startDate": obj.startDate,
      // "activity:endDate": obj.endDate,
      // "activity:timeFrom": obj.timeFrom,
      // "activity:timeTo": obj.timeTo,
      // "activity:coverPicture": {
      //   "upload-batch": "batchId-4c5c1f81-bdde-4eb1-9dde-18724386dc3f",
      //   "upload-fileId": "0"
      // }
    }
  }

}
