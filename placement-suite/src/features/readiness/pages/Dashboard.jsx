import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

const SKILL_DATA = [
  { subject: 'DSA', value: 75, fullMark: 100 },
  { subject: 'System Design', value: 60, fullMark: 100 },
  { subject: 'Communication', value: 80, fullMark: 100 },
  { subject: 'Resume', value: 85, fullMark: 100 },
  { subject: 'Aptitude', value: 70, fullMark: 100 },
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ACTIVE_DAYS = [0, 1, 2, 4, 5]; // Mon, Tue, Wed, Fri, Sat have activity

const ASSESSMENTS = [
  { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
  { title: 'System Design Review', time: 'Wed, 2:00 PM' },
  { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function PreparationCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isToday = (d) => today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
  const hasActivity = (d) => [3, 5, 7, 12, 15, 18, 22, 25].includes(d);

  const prevMonth = () => setViewDate(new Date(year, month - 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{MONTH_NAMES[month]} {year}</span>
        <div className="flex gap-1">
          <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAY_NAMES.map((d) => (
          <span key={d} className="text-xs text-gray-500 font-medium">{d.slice(0, 1)}</span>
        ))}
        {days.map((d, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
              !d ? 'invisible' :
              isToday(d) ? 'bg-primary text-white font-semibold' :
              hasActivity(d) ? 'bg-primary-light text-primary font-medium' :
              'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {d || ''}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">Blue = today · Light = planned</p>
    </div>
  );
}

function CircularProgress({ value, max = 100, size = 160 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4F46E5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500">Readiness Score</span>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress value={72} max={100} />
          </CardContent>
        </Card>

        {/* Skill Breakdown - Radar + Progress Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={SKILL_DATA}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 pt-2 border-t border-gray-100">
              {SKILL_DATA.map(({ subject, value }) => (
                <div key={subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{subject}</span>
                    <span className="font-medium text-gray-900">{value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900 font-medium mb-2">Dynamic Programming</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '30%' }}
                />
              </div>
              <span className="text-sm text-gray-500">3/10 completed</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              to="/readiness/dashboard/practice"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </Link>
          </CardFooter>
        </Card>

        {/* Preparation Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Preparation Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PreparationCalendar />
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Problems Solved</span>
                <span className="font-medium text-gray-900">12/20 this week</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {WEEK_DAYS.map((day, i) => (
                <div
                  key={day}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      ACTIVE_DAYS.includes(i)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {day.slice(0, 1)}
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assessments - spans full width on 2-col grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {ASSESSMENTS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
