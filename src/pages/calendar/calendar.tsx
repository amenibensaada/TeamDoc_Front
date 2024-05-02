import React from 'react';

import './calendar.css';
import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';
class calendar extends React.Component {

  private localData: EventSettingsModel = {
    dataSource: [{
      EndTime: new Date(2019, 0, 11, 6, 30),
      StartTime: new Date(2019, 0, 11, 4, 0)
    }]
  };
  private remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData', 
    adaptor: new WebApiAdaptor, 
    crossDomain: true 
  });
 
  
  render() {
    return (
      <ScheduleComponent currentView='Month'
      eventSettings={{ dataSource: this.remoteData }} selectedDate={new Date(2017, 5, 5)} > 
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>  
      
    );
  }
}
   
function registerLicense(arg0: string) {
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cWWFCe0x1RHxbf1x0ZFNMYl9bQX5PIiBoS35RckVmWX5feHFSRWhaU01z');
}
export default calendar;