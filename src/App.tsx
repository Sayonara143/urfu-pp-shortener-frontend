import Router from './router/Router';
import './App.scss';

import {
  addLocale,
} from 'primereact/api';

import Toast from './components/toast/Toast';

addLocale('ru', {
  firstDayOfWeek: 1,
  dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  dayNamesShort: ['вос', 'пон', 'втор', 'сред', 'чет', 'пят', 'суб'],
  dayNamesMin: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
  monthNames: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
  monthNamesShort: [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ],
  today: 'Сегодня',
  clear: 'Очистить',
});

function App() {

  return (
    <>
      <Toast />
      <Router />
    </>
  );
}

export default App;
