import React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import './calendar.css'; // Importez le fichier CSS avec les styles

function Calendar() {
  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Calendrier</h2>
      </div>
      <ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
}

export default Calendar;
