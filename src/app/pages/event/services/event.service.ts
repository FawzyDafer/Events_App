import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  dataAvailable = false;
  events: any = [];
  EventDetails: any;
  token: any;
  id: any;
  constructor() { }

  getAllEvents(): Observable<any> {

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
    return nuxeo.request('/search/pp/PP_Activity/execute')
      .get().then((res: any) => {
        of(res).subscribe(re => {
          if (re.entries.length) {
            this.dataAvailable = true;
            this.events = [];
            re.entries.map((item: any) => {
           
              this.events.push({
                title: item.title,
                category: item.properties['activity:categorization'] ? item.properties['activity:categorization'] : 'No Category',
                startDate: moment(item.properties['activity:startDate'] ? item.properties['activity:startDate'] : '2022-06-05T16:27:48.775Z').format('DD MMMM Y'),
                endDate: moment(item.properties['activity:endDate'] ? item.properties['activity:endDate'] : '2022-06-05T16:27:48.775Z').format('DD MMMM Y'),
                cover: item.properties['activity:coverPicture'] ? item.properties['activity:coverPicture'].data : 'assets/images/demo1.jpeg',
                eventId: item.uid
              })
            })
          }
        }) 

      }).catch(function (error: any) { throw new Error(error); });

  }

  deleteEvent(event: any) {
    console.log("dd", event.eventId)
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
    nuxeo.operation('/AC_UA_Activity_Delete')
      .input(event.eventId)
      .execute()
      .then((docs: any) => {
        // work with docs
        this.getAllEvents();
      })
      .catch((error: any) => {
        // something went wrong
        throw error;
      });   
  }

  AddEvent(submitactiveForm:any) {

    const activity = this.mapData(submitactiveForm);

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
    nuxeo.operation('/AC_UA_Activity_Create')
      .context({
       // activity: {
        activity
        //}
      
    })    
      .execute()
      .then((docs: any) => {
        // work with docs
        this.getAllEvents();
      })
      .catch((error: any) => {
        // something went wrong
        throw error;
      });
  }

  getActivityById(eventid: any) {
    this.id = eventid
    //this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    if (this.id != null) {
      var Nuxeo = require('nuxeo')
      var nuxeo = new Nuxeo({
        baseURL: 'http://35.153.66.52/nuxeo',
        auth: {
          method: 'bearerToken',
          token: this.token?.__zone_symbol__value
        },
        headers: {
          properties: '*',
        },
      });
      nuxeo.request(`/id/${this.id}​​​`)
        .get()
        .then((res: any) => {
          console.log(this.id);

          console.log(res)
          // res.uid !== null
          // res.type === 'Domain'
          // const data = res.entries;
          // for (let i = 0; i < data.length; i++) {​​​
          //   this.activities.push({​​​
          //     id: data[i].uid,
          //     title: data[i].title,
          //     startDate: data[i].properties['activity:startDate'],
          //     endDate: data[i].properties['activity:endDate'],
          //     category: data[i].properties['activity:categorization'],
          //     cover: data[i].properties['activity:coverPicture']?.data,
          //   }​​​);
          // }​​​

        })
        .catch((error: any) => {
          throw new Error(error);
        });
    }
  }
  
  mapData(obj: any) {
    return {
      
      "dc:title": obj.title,
      "dc:description": obj.description,
      "activity:categorization": obj.categorization,
      "activity:organizers": "f37da589-e20a-4c19-a64f-e371e3e76fc3",
      "activity:locations": {
        "city": obj.locations,
        "geographicLocation": ""
      },
      "activity:startDate": obj.startDate,
      "activity:endDate": obj.endDate,
      "activity:timeFrom": obj.timeFrom,
      "activity:timeTo": obj.timeTo,
      "activity:coverPicture": {
        "upload-batch": "batchId-4c5c1f81-bdde-4eb1-9dde-18724386dc3f",
        "upload-fileId": "0"
      }
    }
  }


}


