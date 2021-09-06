import React, { useEffect, useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import months from "../../db/months.json";
import Month from "../month/month.jsx";
import "./calendar.css";

function Calendar() {
  const dateInUrl = useLocation().pathname.slice(1).split("-");
  const [year, setYear] = useState(
    dateInUrl[0] !== "" ? dateInUrl[0] : new Date().getFullYear()
  );
  const [month, setMonth] = useState(
    dateInUrl[1]
      ? months.find((month) => month.title === dateInUrl[1]).id
      : new Date().getMonth()
  );
  useEffect(() => {
    setYear(dateInUrl[0] !== "" ? dateInUrl[0] : new Date().getFullYear());
    setMonth(
      dateInUrl[1]
        ? months.find((month) => month.title === dateInUrl[1]).id
        : new Date().getMonth()
    );
  });
  return (
    <>
      <div className="title">
        <span>{months[month].rus}</span>
        <span>{year}</span>
      </div>

      <div className="switch-years">
        <Link to={`/${+year - 1}-${months[month].title}`}>Предыдущий год</Link>
        <Link to={`/${+year + 1}-${months[month].title}`}>Следующий год</Link>
      </div>
      <div className="switch-months">
        <Link to={`/${year}-${months[month === 0 ? 11 : month - 1].title}`}>
          Предыдущий месяц
        </Link>
        <Link to={`/${year}-${months[month === 11 ? 0 : month + 1].title}`}>
          Следующий месяц
        </Link>
      </div>

      <Switch>
        <Route path="/:date">
          <Month />
        </Route>
      </Switch>
    </>
  );
}

export default Calendar;
