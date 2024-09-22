import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';
import { tw } from 'twind';

const CalendarSection = () => {
  const [value, setValue] = useState<Value>(new Date());

  const onChange = (newDate: Value) => {
    setValue(newDate);
  };

  return (
    <div className={tw(`flex flex-col items-center justify-center`)}>
      <h2 className={tw(`text-xl font-bold mb-4`)}>Sign-up for Events!</h2>
      <Calendar
        onChange={onChange}
        value={value}
        className={tw(`bg-white p-4 rounded-lg shadow-lg`)}
      />
      <p className={tw(`mt-4 text-gray-700`)}>
        Selected Date:{' '}
        {Array.isArray(value)
          ? `${value[0]?.toDateString()} - ${value[1]?.toDateString()}`
          : value?.toDateString()}
      </p>
    </div>
  );
};

export default CalendarSection;