import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

import courses from '@/data/courses.json';
import { CourseAccordion } from '@/components/layout/CourseAccordion';

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
      'Our Nursing College is dedicated to producing competent nursing professionals through comprehensive theoretical knowledge and extensive clinical practice.',
    image: facultyNursing,
    programs: ['B.Sc Nursing (4 Years + 6 Months Internship)'],
    eligibility: '10+2 (PCB) with 45% marks, KCET mandatory, Age 17+',
    affiliation: 'RGUHS, Approved by INC & KNC',
    contact: '+91 99007 47923',
    location: 'Hassan',
  },
  {
    id: 'paramedical',
    name: 'Janapriya Institute of Paramedical Health Sciences, Hassan',
    description:
      'The Institute of Paramedical Sciences offers diploma programs in medical laboratory technology, imaging, dialysis, and operation theatre technology.',
    image: facultyParamedical,
    programs: [
      'DMLT - Diploma in Medical Laboratory Technology',
      'DMIT - Diploma in Medical Imaging Technology',
      'DDT - Diploma in Dialysis Technology',
      'DOT & AT - Diploma in Operation Theater & Anesthesia Technology',
    ],
    eligibility: '10+2 (Science – PCB)',
    affiliation: 'Karnataka Paramedical Board, Bangalore',
    contact: '+91 99007 47923',
    location: 'Hassan',
  },
  {
    id: 'allied-hassan',
    name: 'Janapriya Institute of Allied Health Sciences, Hassan',
    description:
      'Offers B.Sc programs in allied health fields with strong clinical exposure.',
    image: facultyAllied,
    programs: [
      'B.Sc MLT',
      'B.Sc MIT',
      'B.Sc AT & OT',
      'B.Sc EMT',
    ],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS',
    contact: '+91 99007 47923',
    location: 'Hassan',
  },
  {
    id: 'allied-mangalore',
    name: 'Janapriya Institute of Allied Health Sciences, Mangalore',
    description:
      'Comprehensive allied health programs including Occupational Therapy.',
    image: facultyAllied,
    programs: [
      'BOT',
      'B.Sc MLT',
      'B.Sc MIT',
      'B.Sc AT & OT',
      'B.Sc EMT',
      'B.Sc RDT',
    ],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS',
    contact: '+91 91482 47799',
    location: 'Mangalore',
  },
  {
    id: 'physiotherapy',
    name: 'Janapriya Institute of Physiotherapy, Mangalore',
    description:
      'Comprehensive training in physical rehabilitation and therapy.',
    image: facultyPhysio,
    programs: ['BPT - Bachelor of Physiotherapy'],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS',
    contact: '+91 91482 47799',
    location: 'Mangalore',
  },
];

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

/* --------------------------- COMPONENT --------------------------- */

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

  const ugCourses = Object.values(courses);
   const allCourses = Object.values(courses);
  const featuredCourses = allCourses.filter(
    (course: any) =>
      course.id === 'bsc-nursing' ||
      course.id === 'bot' ||
      course.id === 'bpt'
  );

  return (
    <Layout>
      <PageHero
        title="Academics"
        subtitle="Shaping Future Healthcare Leaders"
      />

      <section className="section-padding bg-background">
        <div className="section-container">

          {/* ----------------------------- TABS ----------------------------- */}
          <div className="flex flex-wrap gap-2 mb-10 p-2 bg-secondary rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-premium'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* --------------------------- FACULTIES --------------------------- */}
          {activeTab === 'faculties' && (
            <div className="space-y-12">
              {faculties.map((faculty, index) => (
                <div
                  key={faculty.id}
                  className={`grid lg:grid-cols-2 gap-8 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="rounded-xl h-72 w-full object-cover shadow-premium"
                  />

                  <div>
                    <h2 className="text-2xl font-bold mb-3">
                      {faculty.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {faculty.description}
                    </p>

                    <div className="bg-secondary rounded-lg p-4 text-sm space-y-1 mb-4">
                      <p><strong>Eligibility:</strong> {faculty.eligibility}</p>
                      <p><strong>Affiliation:</strong> {faculty.affiliation}</p>
                      <p><strong>Contact:</strong> {faculty.contact}</p>
                      <p><strong>Location:</strong> {faculty.location}</p>
                    </div>

                    <Link to="/apply">
                      <Button>Apply Now</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

   {/* --------------------------- PROGRAMS --------------------------- */}
          {activeTab === 'programs' && (
            <div className="space-y-16">

              {/* ========== TOP 3 FEATURED COURSES (VERTICAL ACCORDION) ========== */}
              <div>
                

                <div className="space-y-4">
                  {featuredCourses.map((course: any, index) => {
                    const isOpen = openProgram === course.id;

                    return (
                      <div
                        key={course.id}
                        className="bg-secondary rounded-xl overflow-hidden"
                      >
                        <button
                          className="w-full px-5 py-4 flex items-center justify-between text-left"
                          onClick={() =>
                            setOpenProgram(isOpen ? null : course.id)
                          }
                        >
                          <div>
                            <h3 className="font-semibold text-lg">
                              {course.title.replace(' – Detailed Information', '')}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {course.sections.overview.duration} •{' '}
                              {course.sections.overview.location || '-'}
                            </p>
                          </div>

                          {isOpen ? (
                            <ChevronUp className="shrink-0" />
                          ) : (
                            <ChevronDown className="shrink-0" />
                          )}
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

              {/* ========== ALL UG COURSES (SIMPLE TABLE) ========== */}
              <div>
              <h2 className="text-2xl font-bold mb-6">
                  Undergraduate Programs (B.Sc)
                </h2>

                <div className="overflow-x-auto">
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
                      {allCourses.map((course: any, index) => (
                        <tr
                          key={course.id}
                          className={index % 2 === 0 ? 'bg-secondary' : 'bg-background'}
                        >
                          <td className="px-4 py-3 font-medium">
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
                              <Button size="sm" variant="outline">
                                Apply
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ========== DIPLOMA PROGRAMS (STATIC) ========== */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Diploma Programs
                </h2>

                <div className="overflow-x-auto">
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
                      {diplomaPrograms.map((program, index) => (
                        <tr
                          key={program.name}
                          className={index % 2 === 0 ? 'bg-secondary' : 'bg-background'}
                        >
                          <td className="px-4 py-3 font-medium">
                            {program.name}
                          </td>
                          <td className="px-4 py-3">
                            {program.duration}
                          </td>
                          <td className="px-4 py-3">
                            {program.location}
                          </td>
                          <td className="px-4 py-3">
                            <Link to="/apply">
                              <Button size="sm" variant="outline">
                                Apply
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}


          {/* --------------------------- CALENDAR --------------------------- */}
          {activeTab === 'calendar' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">
                Academic Calendar
              </h2>

              <div className="space-y-3">
                {calendar.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-secondary p-4 rounded-lg"
                  >
                    <span className="font-medium">{item.event}</span>
                    <span>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default Academics;
