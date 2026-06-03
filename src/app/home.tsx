'use client';

import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import TopSkills from '../components/home/TopSkills';
import SummarySection from '../components/home/SummarySection';
import SkillsGrid from '../components/home/SkillsGrid';
import ExperienceSection from '../components/home/ExperienceSection';
import EducationSection from '../components/home/EducationSection';
import CertificationsSection from '../components/home/CertificationsSection';
import AwardsSection from '../components/home/AwardsSection';
import ContentSection from '../components/home/ContentSection';
import NavIsland from '../components/home/NavIsland';
import ContactSection from '../components/home/ContactSection';

// Skills organized by category
const skillsData: Record<string, string[]> = {
  'Languages': ['JavaScript', 'TypeScript', 'C#'],
  'JavaScript Libraries': ['React JS', 'Node.js', 'Express'],
  'UI Frameworks & Design': ['Material UI', 'Bootstrap', 'HTML5', 'CSS3', 'SASS', 'Tailwind CSS', 'Figma'],
  'Back-End Development': ['ASP.NET MVC', 'AEM'],
  'Databases': ['SQL Server', 'MySQL'],
  'Testing Frameworks': ['Jest', 'React Testing Library', 'Cucumber JS', 'Mocha', 'Chai', 'Cypress'],
  'CI/CD Tools': ['Jenkins', 'Travis'],
  'Analytics': ['Adobe Analytics'],
  'Cloud Platforms': ['Google Cloud Platform', 'AWS'],
  'Version Control': ['Git', 'Jira', 'Storybook']
};

const experienceData = [
  {
    company: 'LTIMindtree',
    positions: [
      {
        title: 'Specialist Software Engineering',
        period: 'July 2025 - Present',
        location: 'Jersey City, New Jersey, United States',
        skills: ['React Js', 'Typescript', 'Redux', 'AEM', 'Adobe Analytics']
      },
      {
        title: 'Specialist Software Engineering',
        period: 'October 2024 - June 2025',
        location: 'Bangalore Urban, Karnataka, India',
        skills: ['React', 'Typescript']
      },
      {
        title: 'Senior Software Engineer',
        period: 'May 2021 - October 2024',
        location: 'Bengaluru, Karnataka, India',
        skills: ['React JS']
      }
    ]
  },
  {
    company: 'emids',
    duration: '2 years 11 months',
    positions: [
      {
        title: 'Senior Software Engineer',
        period: 'July 2019 - May 2021',
        location: 'Bangalore Urban, Karnataka, India',
        description: 'Front End Developer, work on React and Redux with TDD and BDD process by using Cucumber JS, Mocha, Chai, Wiremocks, Cypress.',
        skills: ['React', 'Redux', 'Node.js', 'TDD', 'BDD', 'Cucumber JS', 'Mocha', 'Chai', 'Cypress']
      },
      {
        title: 'Software Engineer',
        period: 'July 2018 - July 2019',
        location: 'Bangalore',
        description: 'Front End Developer, work on React and Redux with TDD and BDD process.',
        skills: ['React', 'Redux', 'Node.js', 'TDD', 'BDD']
      }
    ]
  },
  {
    company: 'HealthAsyst',
    positions: [
      {
        title: 'Software Developer',
        period: 'January 2017 - July 2018',
        location: 'Bangalore',
        skills: ['Development']
      }
    ]
  },
  {
    company: 'SLK Software',
    positions: [
      {
        title: 'Software Engineer',
        period: 'September 2014 - January 2017',
        location: 'Bengaluru Area, India',
        skills: ['Software Development']
      }
    ]
  }
];

const educationData = [
  {
    institution: 'BITS Pilani Work Integrated Learning Programmes',
    degree: 'Master of Technology - MTech',
    field: 'Data Science',
    period: 'October 2020 - September 2022'
  },
  {
    institution: 'Rajasthan Technical University',
    degree: "Bachelor's Degree",
    field: 'Computer Science',
    period: '2009 - 2013'
  }
];

const certificationsData = [
  'Associate Cloud Engineer Certification',
  'Microsoft Certified: Azure Fundamentals'
];

const awardsData = [
  'Star Team Award',
  'Employee of the Month Award',
];

const topSkills = [
  'ReactJS',
  'Next JS',
  'TypeScript',
  'Node.js',
  'AEM Basics',
];

export default function Home() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Vivek_Bhati_Lead_Software_Engineer.pdf';
    link.download = 'Vivek_Bhati_Lead_Software_Engineer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Fade-up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

    // Spotlight card mouse effect
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.spotlight-card') as NodeListOf<HTMLElement>;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Floating Nav Island */}
      <NavIsland />

      {/* Hero */}
      <HeroSection handleDownloadResume={handleDownloadResume} />

      {/* Top Skills Badges */}
      <TopSkills topSkills={topSkills} />

      {/* About / Professional Summary */}
      <SummarySection />

      {/* Technical Arsenal - Skills Grid */}
      <SkillsGrid skillsData={skillsData} />

      {/* My Content - Blog & Videos */}
      <ContentSection />

      {/* Experience Timeline */}
      <ExperienceSection experienceData={experienceData} />

      {/* Education */}
      <EducationSection educationData={educationData} />

      {/* Certifications */}
      <CertificationsSection certificationsData={certificationsData} />

      {/* Awards */}
      <AwardsSection awardsData={awardsData} />

      {/* Contact */}
      <ContactSection />
    </>
  );
}

