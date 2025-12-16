import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, CheckCircle, FlaskConical, Stethoscope, Users, Baby } from 'lucide-react';
import facultyNursing from '@/assets/faculty-nursing.jpg';
import facultyParamedical from '@/assets/faculty-paramedical.jpg';
import facultyAllied from '@/assets/faculty-allied.jpg';
import facultyPhysio from '@/assets/faculty-physio.jpg';

const tabs = [
  { id: 'faculties', label: 'Our Institutes' },
  { id: 'programs', label: 'Programs' },
  { id: 'calendar', label: 'Academic Calendar' },
];

const faculties = [
  {
    id: 'nursing',
    name: 'Janapriya Nursing College, Hassan',
    description: 'Our Nursing College is dedicated to producing competent nursing professionals through comprehensive theoretical knowledge and extensive clinical practice. With state-of-the-art simulation labs and partnerships with leading hospitals, students receive hands-on training in patient care, emergency response, and healthcare management.',
    image: facultyNursing,
    programs: ['B.Sc Nursing (4 Years + 6 Months Internship)'],
    eligibility: '10+2 (PCB) with 45% marks, KCET mandatory, Age 17+',
    affiliation: 'RGUHS, Approved by INC & KNC',
    contact: '+91 99007 47923',
    location: 'Hassan',
    hasDetails: true,
  },
  {
    id: 'paramedical',
    name: 'Janapriya Institute of Paramedical Health Sciences, Hassan',
    description: 'The Institute of Paramedical Sciences offers diploma programs in medical laboratory technology, imaging, dialysis, and operation theatre technology. Our advanced laboratories equipped with modern diagnostic equipment prepare students for careers in clinical laboratories and healthcare facilities.',
    image: facultyParamedical,
    programs: [
      'DMLT - Diploma in Medical Laboratory Technology (3 Years + 3 Months Internship)',
      'DMIT - Diploma in Medical Imaging Technology (3 Years + 3 Months Internship)',
      'DDT - Diploma in Dialysis Technology (3 Years + 3 Months Internship)',
      'DOT & AT - Diploma in Operation Theater & Anesthesia Technology (3 Years + 3 Months Internship)',
    ],
    eligibility: '10+2 (Science – PCB). Lateral entry to 2nd year available.',
    affiliation: 'Karnataka Paramedical Board, Bangalore (Registration: PMB593)',
    contact: '+91 99007 47923',
    location: 'Hassan',
    hasDetails: false,
  },
  {
    id: 'allied-hassan',
    name: 'Janapriya Institute of Allied Health Sciences, Hassan',
    description: 'Our Allied Health Sciences institute in Hassan offers B.Sc programs in various allied health fields. Students are trained on modern equipment and gain practical experience through clinical rotations at partner hospitals.',
    image: facultyAllied,
    programs: [
      'B.Sc Medical Laboratory Technology (MLT) (3 Years + 1 Year Internship)',
      'B.Sc Medical Imaging Technology (MIT) (3 Years + 1 Year Internship)',
      'B.Sc Anaesthesia & Operation Theatre Technology (AT & OT) (3 Years + 1 Year Internship)',
      'B.Sc Emergency & Trauma Care Technology (EMT) (3 Years + 1 Year Internship)',
    ],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS, Approved by Karnataka Allied Health Council',
    contact: '+91 99007 47923',
    location: 'Plot No. 503/A, KIADB Growth Center, H N Pura Road, Hassan',
    hasDetails: false,
  },
  {
    id: 'allied-mangalore',
    name: 'Janapriya Institute of Allied Health Sciences, Mangalore',
    description: 'Our Allied Health Sciences institute in Mangalore offers comprehensive B.Sc programs including Occupational Therapy and specialized courses. With modern lab facilities and clinical exposure, students develop expertise in their chosen field.',
    image: facultyAllied,
    programs: [
      'BOT - Bachelor of Occupational Therapy (3 Years + 1 Year Internship)',
      'B.Sc Medical Laboratory Technology (MLT) (3 Years + 1 Year Internship)',
      'B.Sc Medical Imaging Technology (MIT) (3 Years + 1 Year Internship)',
      'B.Sc Operation Theater & Anesthesia Technology (AT & OT) (3 Years + 1 Year Internship)',
      'B.Sc Emergency Medicine & Trauma Care (EMT) (3 Years + 1 Year Internship)',
      'B.Sc Renal Dialysis Technology (RDT) (3 Years + 1 Year Internship)',
    ],
    eligibility: '10+2 Science',
    affiliation: 'RGUHS, Approved by Karnataka Allied Health Council',
    contact: '+91 91482 47799',
    location: 'Padil, Mangaluru, Karnataka 575007',
    hasDetails: false,
  },
  {
    id: 'physiotherapy',
    name: 'Janapriya Institute of Physiotherapy, Mangalore',
    description: 'The Institute of Physiotherapy offers comprehensive training in physical rehabilitation and therapy. With modern rehabilitation equipment and extensive clinical exposure at partner hospitals, students develop expertise in musculoskeletal, neurological, and cardiopulmonary rehabilitation.',
    image: facultyPhysio,
    programs: ['BPT - Bachelor of Physiotherapy (4 Years + 6 Months Internship)'],
    eligibility: '10+2 Science, Age 17+',
    affiliation: 'RGUHS',
    contact: '+91 91482 47799',
    location: 'Mangalore',
    hasDetails: false,
  },
];

const programs = {
  undergraduate: [
    { name: 'B.Sc Nursing', duration: '4 Years + 6 Months Internship', location: 'Hassan' },
    { name: 'Bachelor of Physiotherapy (BPT)', duration: '4 Years + 6 Months Internship', location: 'Mangalore' },
    { name: 'B.Sc Medical Laboratory Technology (MLT)', duration: '3 Years + 1 Year Internship', location: 'Hassan & Mangalore' },
    { name: 'B.Sc Medical Imaging Technology (MIT)', duration: '3 Years + 1 Year Internship', location: 'Hassan & Mangalore' },
    { name: 'B.Sc Anaesthesia & Operation Theatre Technology (AT & OT)', duration: '3 Years + 1 Year Internship', location: 'Hassan & Mangalore' },
    { name: 'B.Sc Emergency & Trauma Care Technology (EMT)', duration: '3 Years + 1 Year Internship', location: 'Hassan & Mangalore' },
    { name: 'B.Sc Renal Dialysis Technology (RDT)', duration: '3 Years + 1 Year Internship', location: 'Mangalore' },
    { name: 'Bachelor of Occupational Therapy (BOT)', duration: '3 Years + 1 Year Internship', location: 'Mangalore' },
  ],
  diploma: [
    { name: 'DMLT - Diploma in Medical Laboratory Technology', duration: '3 Years + 3 Months Internship', location: 'Hassan' },
    { name: 'DMIT - Diploma in Medical Imaging Technology', duration: '3 Years + 3 Months Internship', location: 'Hassan' },
    { name: 'DDT - Diploma in Dialysis Technology', duration: '3 Years + 3 Months Internship', location: 'Hassan' },
    { name: 'DOT & AT - Diploma in Operation Theater & Anesthesia Technology', duration: '3 Years + 3 Months Internship', location: 'Hassan' },
  ],
};

const calendar = [
  { event: 'Academic Year Begins', date: 'To be announced' },
  { event: 'First Internal Assessment', date: 'To be announced' },
  { event: 'Diwali Vacation', date: 'To be announced' },
  { event: 'Second Internal Assessment', date: 'To be announced' },
  { event: 'Winter Break', date: 'To be announced' },
  { event: 'Third Internal Assessment', date: 'To be announced' },
  { event: 'Practical Examinations', date: 'To be announced' },
  { event: 'University Examinations', date: 'To be announced' },
  { event: 'Summer Vacation', date: 'To be announced' },
];

const nursingSyllabus = {
  sem1: ['Communicative English', 'Applied Anatomy', 'Applied Physiology', 'Applied Sociology', 'Applied Psychology', 'Nursing Foundations I'],
  sem2: ['Applied Biochemistry', 'Applied Nutrition & Dietetics', 'Nursing Foundations II', 'Health/Nursing Informatics and Technology'],
  sem3: ['Applied Microbiology & Infection Control including Safety', 'Pharmacology I', 'Pathology I', 'Adult Health (Medical Surgical) Nursing I with integrated pathophysiology'],
  sem4: ['Pharmacology II', 'Pathology II & Genetics', 'Adult Health Nursing II with integrated pathophysiology including Geriatric Nursing', 'Professionalism, Professional Values & Ethics including Bioethics'],
  sem5: ['Child Health Nursing I', 'Mental Health Nursing I', 'Community Health Nursing I (including Environmental Science and Epidemiology)', 'Educational Technology/Nursing Education', 'Introduction to Forensic Nursing and Indian Laws'],
  sem6: ['Child Health Nursing II', 'Mental Health Nursing II', 'Nursing Management and Leadership', 'Midwifery/Obstetrics & Gynaecology (OBG) Nursing I'],
  sem7: ['Community Health Nursing II', 'Nursing Research and Statistics', 'Midwifery/Obstetrics & Gynaecology (OBG) Nursing II'],
  sem8: ['Internship (Intensive practicum/Residency posting)'],
  mandatory: {
    sem1: 'First Aid as part of Nursing Foundation I',
    sem2: 'Health Assessment as part of Nursing Foundation II',
    sem3: 'BCLS as part of Adult Health Nursing I',
    sem4: 'Fundamentals of Prescribing under Pharmacology II, Palliative care module under Adult Health Nursing II',
    sem5: 'Essential Newborn Care (ENBC), Facility Based Newborn Care (FBNBC), IMNCI and PLS as part of Child Health Nursing',
    sem6: 'SBA Module under OBG Nursing I/II',
    sem7: 'Safe delivery app under OBG Nursing I/II',
  }
};

const laboratories = [
  { name: 'Anatomy Lab', icon: FlaskConical },
  { name: 'Nursing Foundation Lab', icon: Stethoscope },
  { name: 'Community Health Nursing Lab', icon: Users },
  { name: 'OBG & CHN Lab', icon: Baby },
  { name: 'Audio-Visual Lab', icon: FlaskConical },
  { name: 'Nutrition Lab', icon: FlaskConical },
  { name: 'Computer Lab', icon: FlaskConical },
  { name: 'Pre-Clinical Science Lab', icon: FlaskConical },
];

const departments = [
  {
    name: 'Nursing Foundation Lab',
    description: 'This Department functions in training nursing students on basic nursing procedures that will help them to render basic care to clients in the hospital. The basic skill of the students is developed in the labs by using mannequins, dummies in simulated situations before they are posted to real hospital situations. The students are exposed to practicing the nursing procedure so that they can develop with reasonable skill and perform procedures efficiently in the actual scenario.',
  },
  {
    name: 'Community Health Nursing Department',
    description: 'The Community Health Nursing Department trains students to effectively detect and solve community health challenges. The department enables complete community health advancement through research-based education and service-centered actions. The educational curriculum emphasizes primary prevention. Students learn to assess families and communities, deliver health education and refer patients appropriately. Students are trained intensively in the field which includes rural practice as well as urban experiences.',
    aims: [
      'Enhance community health outcomes by implementing specialized intervention programs',
      'Facilitate students to serve as nursing and health leaders',
      'Work with health organizations worldwide to resolve global healthcare challenges',
    ],
    achievements: [
      'Conducted numerous health camps including relief efforts for floods, COVID-19 vaccination, and Pulse Polio Immunization Programs',
      'Actively drives health programs for Maternal and Child Health, Tuberculosis, Malaria, and HIV/AIDS on a national scale',
      'Recognized by government and non-governmental institutions for its exceptional community work',
    ],
  },
  {
    name: 'Child Health Lab',
    description: 'The department provides specialized training in pediatric nursing to cater to the healthcare needs of children across all age groups, from birth to adolescence. Students benefit from quality teaching and learning experiences through expert instructors and hands-on clinical practice. The department aims to prepare students to function effectively as educators, managers, and researchers in the field of child health nursing.',
  },
];

const coreCompetencies = [
  { title: 'Patient Centered Care', desc: 'Provide holistic care recognizing individual patient\'s preferences, values and needs, that is compassionate, coordinated, age and culturally appropriate safe and effective care.' },
  { title: 'Professionalism', desc: 'Demonstrate accountability for the delivery of standard-based nursing care as per the Council standards that is consistent with moral, altruistic, legal, ethical, regulatory and humanistic principles.' },
  { title: 'Teaching & Leadership', desc: 'Influence the behavior of individuals and groups within their environment and facilitate establishment of shared goals through teaching and leadership.' },
  { title: 'System-based Practice', desc: 'Demonstrate awareness and responsiveness to the context of healthcare system and ability to manage resources essential to provide optimal quality of care.' },
  { title: 'Health Informatics & Technology', desc: 'Use technology and synthesize information and collaborate to make critical decisions that optimize patient outcomes.' },
  { title: 'Communication', desc: 'Interact effectively with patients, families and colleagues fostering mutual respect and shared decision making to enhance patient satisfaction and health outcomes.' },
  { title: 'Teamwork & Collaboration', desc: 'Function effectively within nursing and interdisciplinary teams, fostering open communication, mutual respect, shared decision making, team learning and development.' },
  { title: 'Safety', desc: 'Minimize risk of harm to patients and providers through both system effectiveness and individual performance.' },
  { title: 'Quality Improvement', desc: 'Use data to monitor the outcomes of care processes and utilize improvement methods to design and test changes to continuously improve the quality and safety of healthcare system.' },
  { title: 'Evidence Based Practice', desc: 'Identify, evaluate and use the best current evidence coupled with clinical expertise and consideration of patient\'s preferences, experience and values to make practical decisions.' },
];

const NursingDetails = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="mt-8 space-y-4">
      {/* Course Overview */}
      <div className="bg-muted rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <h3 className="font-semibold text-foreground">Course Overview</h3>
          {expandedSection === 'overview' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSection === 'overview' && (
          <div className="px-4 pb-4 space-y-4">
            <div className="bg-background rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2">Bachelor of Science in Nursing – 8 Semester Course</h4>
              <p className="text-muted-foreground text-sm mb-4">
                The B.Sc. Nursing degree program is a four-year fulltime program comprising eight semesters, which prepares a student to become a registered nurse qualified to practice in a variety of settings in either public/government or private healthcare settings. A degree in Nursing imparts the knowledge and skill necessarily required for preparing the nurses by giving them clinical decision making abilities based on theory & research.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-secondary rounded-lg p-3">
                  <span className="font-medium text-foreground">Duration:</span>
                  <p className="text-muted-foreground">4 Years (8 Semesters) + 6 Months Internship</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <span className="font-medium text-foreground">System:</span>
                  <p className="text-muted-foreground">Choice Based Credit System (CBCS) & Semester System, Competency Based Curriculum</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Eligibility Criteria</h4>
              <p className="text-muted-foreground text-sm">
                Candidate with Science who has passed the 12th Standard examination (10+2) from recognised board under AISSCE/CBSE/ICSE/SSCE/HSCE or other equivalent Board and must have obtained a minimum of 45% marks in the core/academic subjects taken together and passed English individually.
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Academic Activities</h4>
              <p className="text-muted-foreground text-sm">
                Seminars, Workshops, Conferences, Guest Lectures, Projects, Written Tests and Examinations, Hospital Visits, Field Visits, Clinical Presentations, Health Education.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Syllabus */}
      <div className="bg-muted rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('syllabus')}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <h3 className="font-semibold text-foreground">Course Syllabus (8 Semesters)</h3>
          {expandedSection === 'syllabus' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSection === 'syllabus' && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-3 py-2 text-left">Semester I</th>
                    <th className="px-3 py-2 text-left">Semester II</th>
                  </tr>
                </thead>
                <tbody>
                  {nursingSyllabus.sem1.map((subject, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-secondary'}>
                      <td className="px-3 py-2 text-muted-foreground">{subject}</td>
                      <td className="px-3 py-2 text-muted-foreground">{nursingSyllabus.sem2[i] || ''}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/10">
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem1}</td>
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem2}</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-3 py-2 text-left">Semester III</th>
                    <th className="px-3 py-2 text-left">Semester IV</th>
                  </tr>
                </thead>
                <tbody>
                  {nursingSyllabus.sem3.map((subject, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-secondary'}>
                      <td className="px-3 py-2 text-muted-foreground">{subject}</td>
                      <td className="px-3 py-2 text-muted-foreground">{nursingSyllabus.sem4[i] || ''}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/10">
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem3}</td>
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem4}</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-3 py-2 text-left">Semester V</th>
                    <th className="px-3 py-2 text-left">Semester VI</th>
                  </tr>
                </thead>
                <tbody>
                  {nursingSyllabus.sem5.map((subject, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-secondary'}>
                      <td className="px-3 py-2 text-muted-foreground">{subject}</td>
                      <td className="px-3 py-2 text-muted-foreground">{nursingSyllabus.sem6[i] || ''}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/10">
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem5}</td>
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem6}</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-3 py-2 text-left">Semester VII</th>
                    <th className="px-3 py-2 text-left">Semester VIII</th>
                  </tr>
                </thead>
                <tbody>
                  {nursingSyllabus.sem7.map((subject, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-secondary'}>
                      <td className="px-3 py-2 text-muted-foreground">{subject}</td>
                      <td className="px-3 py-2 text-muted-foreground">{nursingSyllabus.sem8[i] || ''}</td>
                    </tr>
                  ))}
                  <tr className="bg-accent/10">
                    <td className="px-3 py-2 text-xs text-accent-dark"><strong>Mandatory:</strong> {nursingSyllabus.mandatory.sem7}</td>
                    <td className="px-3 py-2 text-xs text-accent-dark"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Laboratories */}
      <div className="bg-muted rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('labs')}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <h3 className="font-semibold text-foreground">Laboratory Facilities</h3>
          {expandedSection === 'labs' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSection === 'labs' && (
          <div className="px-4 pb-4">
            <p className="text-muted-foreground text-sm mb-4">
              The college boasts a team of well-qualified and experienced teaching faculty, who work diligently to impart quality nursing education and provide personal attention to each student. The college also has well-equipped and spacious classrooms and laboratories.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {laboratories.map((lab) => (
                <div key={lab.name} className="bg-background rounded-lg p-3 text-center">
                  <lab.icon className="h-6 w-6 mx-auto mb-2 text-accent-dark" />
                  <span className="text-xs font-medium text-foreground">{lab.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Departments */}
      <div className="bg-muted rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('departments')}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <h3 className="font-semibold text-foreground">Department Overview</h3>
          {expandedSection === 'departments' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSection === 'departments' && (
          <div className="px-4 pb-4 space-y-4">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-background rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">{dept.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{dept.description}</p>
                {dept.aims && (
                  <div className="mb-3">
                    <h5 className="font-medium text-foreground text-sm mb-2">Department Aims:</h5>
                    <ul className="space-y-1">
                      {dept.aims.map((aim, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-accent-dark mt-0.5 flex-shrink-0" />
                          {aim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dept.achievements && (
                  <div>
                    <h5 className="font-medium text-foreground text-sm mb-2">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {dept.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-accent-dark mt-0.5 flex-shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Core Competencies */}
      <div className="bg-muted rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('competencies')}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <h3 className="font-semibold text-foreground">Core Competencies for B.Sc Nursing Graduates</h3>
          {expandedSection === 'competencies' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {expandedSection === 'competencies' && (
          <div className="px-4 pb-4">
            <div className="grid md:grid-cols-2 gap-3">
              {coreCompetencies.map((comp, i) => (
                <div key={i} className="bg-background rounded-lg p-3">
                  <h4 className="font-medium text-primary text-sm mb-1">{i + 1}. {comp.title}</h4>
                  <p className="text-xs text-muted-foreground">{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Academics = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('faculties');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <Layout>
      <PageHero title="Academics" subtitle="Shaping Future Healthcare Leaders" />
      
      <section className="section-padding bg-background">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 p-2 bg-secondary rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-premium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Faculties */}
          {activeTab === 'faculties' && (
            <div className="space-y-12">
              {faculties.map((faculty, index) => (
                <div 
                  key={faculty.id}
                  id={faculty.id}
                  className={`grid lg:grid-cols-2 gap-8 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="rounded-xl overflow-hidden shadow-premium">
                      <img src={faculty.image} alt={faculty.name} className="w-full h-72 object-cover" />
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{faculty.name}</h2>
                    <p className="text-muted-foreground mb-4">{faculty.description}</p>
                    
                    <div className="bg-secondary rounded-lg p-4 mb-4 space-y-2 text-sm">
                      <p><strong className="text-foreground">Eligibility:</strong> <span className="text-muted-foreground">{faculty.eligibility}</span></p>
                      <p><strong className="text-foreground">Affiliation:</strong> <span className="text-muted-foreground">{faculty.affiliation}</span></p>
                      <p><strong className="text-foreground">Contact:</strong> <span className="text-muted-foreground">{faculty.contact}</span></p>
                      <p><strong className="text-foreground">Location:</strong> <span className="text-muted-foreground">{faculty.location}</span></p>
                    </div>
                    
                    <h4 className="font-semibold text-foreground mb-3">Programs Offered:</h4>
                    <ul className="space-y-2 mb-6">
                      {faculty.programs.map((program) => (
                        <li key={program} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {program}
                        </li>
                      ))}
                    </ul>
                    
                    <Link to="/apply">
                      <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              {/* Nursing Details Section */}
              <div className="border-t border-border pt-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">B.Sc Nursing - Detailed Information</h2>
                <p className="text-muted-foreground mb-4">Expand the sections below to learn more about our flagship nursing program.</p>
                <NursingDetails />
              </div>
            </div>
          )}

          {/* Programs */}
          {activeTab === 'programs' && (
            <div className="space-y-10">
              {/* Undergraduate */}
              <div id="undergraduate">
                <h2 className="text-2xl font-bold text-foreground mb-6">Undergraduate Programs (B.Sc)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="px-4 py-3 text-left font-semibold">Program</th>
                        <th className="px-4 py-3 text-left font-semibold">Duration</th>
                        <th className="px-4 py-3 text-left font-semibold">Location</th>
                        <th className="px-4 py-3 text-left font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programs.undergraduate.map((program, index) => (
                        <tr key={program.name} className={index % 2 === 0 ? 'bg-secondary' : 'bg-background'}>
                          <td className="px-4 py-3 font-medium text-foreground">{program.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{program.duration}</td>
                          <td className="px-4 py-3 text-muted-foreground">{program.location}</td>
                          <td className="px-4 py-3">
                            <Link to="/apply">
                              <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5">
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

              {/* Diploma */}
              <div id="diploma">
                <h2 className="text-2xl font-bold text-foreground mb-6">Diploma Programs</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="px-4 py-3 text-left font-semibold">Program</th>
                        <th className="px-4 py-3 text-left font-semibold">Duration</th>
                        <th className="px-4 py-3 text-left font-semibold">Location</th>
                        <th className="px-4 py-3 text-left font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programs.diploma.map((program, index) => (
                        <tr key={program.name} className={index % 2 === 0 ? 'bg-secondary' : 'bg-background'}>
                          <td className="px-4 py-3 font-medium text-foreground">{program.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{program.duration}</td>
                          <td className="px-4 py-3 text-muted-foreground">{program.location}</td>
                          <td className="px-4 py-3">
                            <Link to="/apply">
                              <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5">
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

          {/* Calendar */}
          {activeTab === 'calendar' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Academic Calendar 2025-26</h2>
              <p className="text-muted-foreground mb-6">Dates will be updated by the institution. Please check back later for the latest academic calendar.</p>
              <div className="space-y-3">
                {calendar.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                  >
                    <span className="font-medium text-foreground">{item.event}</span>
                    <span className="text-accent-dark text-sm">{item.date}</span>
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