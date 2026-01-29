import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import courses from '@/data/courses.json';
import { CourseAccordion } from '@/components/layout/CourseAccordion';

import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

import facultyNursing from '@/assets/faculty-nursing.jpg';
import facultyParamedical from '@/assets/faculty-paramedical.jpg';
import facultyAllied from '@/assets/faculty-allied.jpg';
import facultyPhysio from '@/assets/faculty-physio.jpg';

/* ----------------------------- TABS ----------------------------- */

const tabs = [
  { id: 'faculties', label: 'Our Institutes' },
  { id: 'programs', label: 'Programs' },
  { id: 'calendar', label: 'Academic Calendar' },
];

/* --------------------------- FACULTIES --------------------------- */

const faculties = [
  {
    id: 'nursing',
    name: 'Janapriya Nursing College, Hassan',
    description:
      'Dedicated to producing competent nursing professionals through comprehensive theoretical knowledge and extensive clinical practice.',
    image: facultyNursing,
    programs: ['B.Sc Nursing'],
    eligibility: '10+2 (PCB) with 45% marks',
    affiliation: 'RGUHS, INC & KNC',
    contact: '+91 99007 47923',
    location: 'Hassan',
  },
  {
    id: 'paramedical',
    name: 'Janapriya Institute of Paramedical Health Sciences, Hassan',
    description:
      'Offers diploma programs in laboratory, imaging, dialysis and OT technology.',
    image: facultyParamedical,
    programs: ['DMLT', 'DMIT', 'DDT', 'DOT & AT'],
    eligibility: '10+2 (Science – PCB)',
    affiliation: 'Karnataka Paramedical Board',
    contact: '+91 99007 47923',
    location: 'Hassan',
  },
  {
    id: 'allied',
    name: 'Janapriya Institute of Allied Health Sciences',
    description:
      'B.Sc allied health programs with strong hospital-based clinical exposure.',
    image: facultyAllied,
    programs: ['B.Sc MLT', 'B.Sc MIT', 'B.Sc EMT', 'BOT'],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS',
    contact: '+91 91482 47799',
    location: 'Hassan & Mangalore',
  },
  {
    id: 'physio',
    name: 'Janapriya Institute of Physiotherapy, Mangalore',
    description:
      'Comprehensive training in physical rehabilitation and physiotherapy.',
    image: facultyPhysio,
    programs: ['BPT'],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS',
    contact: '+91 91482 47799',
    location: 'Mangalore',
  },
];

/* ---------------------- DIPLOMA PROGRAMS ----------------------- */

const diplomaPrograms = [
  {
    name: 'DMLT - Diploma in Medical Laboratory Technology',
    duration: '3 Years + 3 Months Internship',
    location: 'Hassan',
  },
  {
    name: 'DMIT - Diploma in Medical Imaging Technology',
    duration: '3 Years + 3 Months Internship',
    location: 'Hassan',
  },
  {
    name: 'DDT - Diploma in Dialysis Technology',
    duration: '3 Years + 3 Months Internship',
    location: 'Hassan',
  },
  {
    name: 'DOT & AT - Diploma in Operation Theater & Anesthesia Technology',
    duration: '3 Years + 3 Months Internship',
    location: 'Hassan',
  },
];

/* --------------------------- CALENDAR ---------------------------- */

const calendar = [
  { event: 'Academic Year Begins', date: 'To be announced' },
  { event: 'Internal Assessments', date: 'To be announced' },
  { event: 'University Examinations', date: 'To be announced' },
];

/* =========================== COMPONENT ========================== */

const Academics = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('faculties');
  const [openProgram, setOpenProgram] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const allCourses = Object.values(courses);

  const featuredCourses = allCourses.filter(
    (course: any) =>
      course.id === 'bsc-nursing' ||
      course.id === 'bot' ||
      course.id === 'bpt'
  );

  return (
    <Layout>
      <PageHero title="Academics" subtitle="Shaping Future Healthcare Leaders" />

      <section className="section-padding bg-background">
        <div className="section-container">

          {/* ----------------------------- TABS ----------------------------- */}
          <div className="flex flex-wrap gap-2 mb-10 p-2 bg-secondary rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* =========================== FACULTIES =========================== */}
          {activeTab === 'faculties' && (
            <div className="space-y-12">
              {faculties.map(f => (
                <div key={f.id} className="grid lg:grid-cols-2 gap-8">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="rounded-xl h-72 w-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-3">{f.name}</h2>
                    <p className="text-muted-foreground mb-4">{f.description}</p>
                    <div className="bg-secondary p-4 rounded-lg text-sm space-y-1">
                      <p><strong>Eligibility:</strong> {f.eligibility}</p>
                      <p><strong>Affiliation:</strong> {f.affiliation}</p>
                      <p><strong>Contact:</strong> {f.contact}</p>
                      <p><strong>Location:</strong> {f.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =========================== PROGRAMS =========================== */}
          {activeTab === 'programs' && (
            <div className="space-y-16">

              {/* -------- TOP 3 VERTICAL ACCORDION COURSES -------- */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Undergraduate Programs (B.Sc)
                </h2>

                <div className="space-y-4">
                  {featuredCourses.map((course: any) => {
                    const isOpen = openProgram === course.id;

                    return (
                      <div key={course.id} className="bg-secondary rounded-xl">
                        <button
                          className="w-full px-5 py-4 flex justify-between items-center"
                          onClick={() =>
                            setOpenProgram(isOpen ? null : course.id)
                          }
                        >
                          <div>
                            <h3 className="font-semibold text-lg">
                              {course.title.replace(' – Detailed Information', '')}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {course.sections.overview.duration}
                            </p>
                          </div>
                          {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-6">
                            <CourseAccordion course={course} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* -------- ALL UG COURSES TABLE -------- */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  All Undergraduate Programs
                </h3>

                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="px-4 py-3 text-left">Program</th>
                      <th className="px-4 py-3 text-left">Duration</th>
                      <th className="px-4 py-3 text-left">Location</th>
                      <th className="px-4 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCourses.map((course: any, i) => (
                      <tr key={course.id} className={i % 2 ? 'bg-background' : 'bg-secondary'}>
                        <td className="px-4 py-3">
                          {course.title.replace(' – Detailed Information', '')}
                        </td>
                        <td className="px-4 py-3">
                          {course.sections.overview.duration || '-'}
                        </td>
                        <td className="px-4 py-3">
                          {course.sections.overview.location || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <Link to="/apply">
                            <Button size="sm" variant="outline">Apply</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* -------- DIPLOMA -------- */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Diploma Programs</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="px-4 py-3">Program</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diplomaPrograms.map((d, i) => (
                      <tr key={d.name} className={i % 2 ? 'bg-background' : 'bg-secondary'}>
                        <td className="px-4 py-3">{d.name}</td>
                        <td className="px-4 py-3">{d.duration}</td>
                        <td className="px-4 py-3">{d.location}</td>
                        <td className="px-4 py-3">
                          <Link to="/apply">
                            <Button size="sm" variant="outline">Apply</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* =========================== CALENDAR =========================== */}
          {activeTab === 'calendar' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">Academic Calendar</h2>
              {calendar.map((c, i) => (
                <div key={i} className="flex justify-between bg-secondary p-4 rounded-lg mb-2">
                  <span>{c.event}</span>
                  <span>{c.date}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default Academics;
