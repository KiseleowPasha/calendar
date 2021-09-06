import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import months from "../../db/months.json";
import "./month.css";

function Month() {
  const dateInUrl = useParams().date.split("-");
  const yearInUrl = dateInUrl[0];
  const monthInUrl = months.find((month) => month.title === dateInUrl[1]).id;
  const datesArray = [];

  const [year, setYear] = useState(yearInUrl);
  const [month, setMonth] = useState(monthInUrl);
  const [day, setDay] = useState();

  const dates = (function () {
    const weeks = [];
    for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
      datesArray.push({
        day:
          new Date(year, month, i).getDay() === 0
            ? 7
            : new Date(year, month, i).getDay(),
        date: new Date(year, month, i).getDate(),
        choosed: false,
      });
    }

    datesArray.forEach((el, index) => {
      if (el.day === 1) weeks.push([el]);
      else if (index === 0) {
        weeks.push([el]);
        for (let i = 1; i < el.day; i++) {
          weeks[0].unshift(null);
        }
      } else weeks[weeks.length - 1].push(el);
    });

    if (weeks[weeks.length - 1].length < 7) {
      let space = 7 - weeks[weeks.length - 1].length;
      for (let i = 0; i < space; i++) {
        weeks[weeks.length - 1].push(null);
      }
    }
    return weeks;
  })();

  const chooseDate = (day) => {
    setDay(day);
  };

  useEffect(() => {
    setYear(yearInUrl);
    setMonth(monthInUrl);
  });

  return (
    <>
      {day ? (
        <div>
          <span>Год:{year},</span>
          <span>Месяц:{months[month].rus},</span>
          <span>Число:{day}</span>
        </div>
      ) : (
        <span>Дата не выбрана</span>
      )}
      <table>
        <tbody>
          {dates.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <td
                  className={day ? "active" : "passive"}
                  key={index}
                  onClick={() => (day ? chooseDate(day.date) : null)}
                >
                  {day === null ? "" : day.date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Month;
