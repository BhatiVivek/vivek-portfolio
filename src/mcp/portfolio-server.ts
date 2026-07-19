
// NOTE: This file is not being used anywhere, it is kept here for future use


import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { portfolioData } from './portfolio-data';

/**
 * Creates and configures the Portfolio MCP Server.
 *
 * An MCP Server exposes two things:
 *   - Resources: read-only data (like database rows or files)
 *   - Tools:     callable functions with typed inputs
 *
 * Claude sees both and decides which to use based on what the user asked.
 */
export function createPortfolioMcpServer(): McpServer {
  const server = new McpServer({
    name: 'vivek-portfolio-server',
    version: '1.0.0',
  });

  // ─────────────────────────────────────────────────────────────
  // RESOURCES
  // Resources are read-only snapshots of data.
  // Claude can "read" them like reading a file.
  // URI scheme: portfolio://<section>
  // ─────────────────────────────────────────────────────────────

  // Resource 1: Profile — name, title, summary, location, availability
  server.resource(
    'profile',
    'portfolio://profile',
    async () => ({
      contents: [
        {
          uri: 'portfolio://profile',
          text: JSON.stringify(portfolioData.profile, null, 2),
          mimeType: 'application/json',
        },
      ],
    })
  );

  // Resource 2: Skills — all skill categories and items
  server.resource(
    'skills',
    'portfolio://skills',
    async () => ({
      contents: [
        {
          uri: 'portfolio://skills',
          text: JSON.stringify(
            { topSkills: portfolioData.topSkills, allSkills: portfolioData.skills },
            null,
            2
          ),
          mimeType: 'application/json',
        },
      ],
    })
  );

  // Resource 3: Experience — full work history across all companies
  server.resource(
    'experience',
    'portfolio://experience',
    async () => ({
      contents: [
        {
          uri: 'portfolio://experience',
          text: JSON.stringify(portfolioData.experience, null, 2),
          mimeType: 'application/json',
        },
      ],
    })
  );

  // Resource 4: Education — degrees, institutions, fields of study
  server.resource(
    'education',
    'portfolio://education',
    async () => ({
      contents: [
        {
          uri: 'portfolio://education',
          text: JSON.stringify(
            { education: portfolioData.education, certifications: portfolioData.certifications },
            null,
            2
          ),
          mimeType: 'application/json',
        },
      ],
    })
  );

  // ─────────────────────────────────────────────────────────────
  // TOOLS
  // Tools are functions Claude can call with typed arguments.
  // The z.object() defines what inputs are valid.
  // Claude reads the description to decide WHEN to call each tool.
  // ─────────────────────────────────────────────────────────────

  // Tool 1: get_full_profile — returns everything at once
  // Claude uses this for broad questions like "tell me about Vivek"
  server.tool(
    'get_full_profile',
    'Returns the complete profile including skills, experience, education, certifications, and awards.',
    {},
    async () => ({
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(portfolioData, null, 2),
        },
      ],
    })
  );

  // Tool 2: search_by_skill — finds experience entries that used a given skill
  // Claude uses this for questions like "has Vivek worked with Cypress?"
  server.tool(
    'search_by_skill',
    'Searches work experience for roles that used a specific skill or technology.',
    { skill: z.string().describe('The skill or technology to search for, e.g. "React", "TypeScript", "Cypress"') },
    async ({ skill }) => {
      const lowerSkill = skill.toLowerCase();

      const matches = portfolioData.experience.flatMap((company) =>
        company.positions
          .filter((pos) =>
            pos.skills.some((s) => s.toLowerCase().includes(lowerSkill))
          )
          .map((pos) => ({
            company: company.company,
            title: pos.title,
            period: pos.period,
            skills: pos.skills,
          }))
      );

      const result =
        matches.length > 0
          ? { skill, matchingRoles: matches }
          : { skill, matchingRoles: [], message: `No roles found that specifically list "${skill}".` };

      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  // Tool 3: get_experience_by_company — deep dive on a single company
  // Claude uses this for "what did Vivek do at LTIMindtree?"
  server.tool(
    'get_experience_by_company',
    'Returns detailed experience at a specific company.',
    { company: z.string().describe('Company name, e.g. "LTIMindtree", "emids", "HealthAsyst", "SLK Software"') },
    async ({ company }) => {
      const match = portfolioData.experience.find((exp) =>
        exp.company.toLowerCase().includes(company.toLowerCase())
      );

      const result = match
        ? match
        : { message: `No experience found for company "${company}". Known companies: ${portfolioData.experience.map((e) => e.company).join(', ')}` };

      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  // Tool 4: get_contact_info — returns contact and social links
  // Claude uses this when asked "how do I reach Vivek?" or "what's his email?"
  server.tool(
    'get_contact_info',
    'Returns contact details including email, phone, LinkedIn, and GitHub.',
    {},
    async () => {
      const { email, phone, github, linkedin, medium, location } = portfolioData.profile;
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ email, phone, github, linkedin, medium, location }, null, 2),
          },
        ],
      };
    }
  );

  return server;
}
