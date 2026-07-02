import type { IconType } from 'react-icons';
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiSvelte, SiAngular, SiTypescript,
  SiJavascript, SiHtml5, SiTailwindcss, SiSass, SiRedux,
  SiNodedotjs, SiExpress, SiPython, SiDjango, SiFastapi, SiGo, SiRust,
  SiPhp, SiLaravel, SiRuby, SiSpring, SiGraphql,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiRedis, SiSupabase,
  SiPrisma, SiFirebase,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiGitlab, SiLinux,
  SiNginx, SiGooglecloud, SiVercel, SiNetlify,
  SiVite, SiWebpack, SiBabel, SiEslint, SiPrettier,
  SiFigma, SiPostman, SiInsomnia, SiJira,
  SiCplusplus, SiC, SiKotlin, SiSwift, SiDart, SiFlutter,
  SiAndroid, SiElectron,
  SiTensorflow, SiPytorch, SiPandas, SiNumpy,
} from 'react-icons/si';
import React from 'react';

// Map of lowercase skill name keywords → icon component + brand color
const SKILL_MAP: Record<string, { icon: IconType; color: string }> = {
  // Frontend
  react:        { icon: SiReact,        color: '#61DAFB' },
  nextjs:       { icon: SiNextdotjs,    color: '#E2E8F0' },
  'next.js':    { icon: SiNextdotjs,    color: '#E2E8F0' },
  next:         { icon: SiNextdotjs,    color: '#E2E8F0' },
  vue:          { icon: SiVuedotjs,     color: '#42B883' },
  svelte:       { icon: SiSvelte,       color: '#FF3E00' },
  angular:      { icon: SiAngular,      color: '#DD0031' },
  typescript:   { icon: SiTypescript,   color: '#3178C6' },
  javascript:   { icon: SiJavascript,   color: '#F7DF1E' },
  html:         { icon: SiHtml5,        color: '#E34F26' },
  css:          { icon: SiTailwindcss,  color: '#1572B6' },
  tailwind:     { icon: SiTailwindcss,  color: '#38BDF8' },
  tailwindcss:  { icon: SiTailwindcss,  color: '#38BDF8' },
  sass:         { icon: SiSass,         color: '#CC6699' },
  scss:         { icon: SiSass,         color: '#CC6699' },
  redux:        { icon: SiRedux,        color: '#764ABC' },

  // Backend
  node:         { icon: SiNodedotjs,    color: '#539E43' },
  nodejs:       { icon: SiNodedotjs,    color: '#539E43' },
  'node.js':    { icon: SiNodedotjs,    color: '#539E43' },
  express:      { icon: SiExpress,      color: '#E2E8F0' },
  python:       { icon: SiPython,       color: '#3776AB' },
  django:       { icon: SiDjango,       color: '#092E20' },
  fastapi:      { icon: SiFastapi,      color: '#009688' },
  go:           { icon: SiGo,           color: '#00ADD8' },
  golang:       { icon: SiGo,           color: '#00ADD8' },
  rust:         { icon: SiRust,         color: '#CE422B' },
  php:          { icon: SiPhp,          color: '#777BB4' },
  laravel:      { icon: SiLaravel,      color: '#FF2D20' },
  ruby:         { icon: SiRuby,         color: '#CC342D' },
  spring:       { icon: SiSpring,       color: '#6DB33F' },
  graphql:      { icon: SiGraphql,      color: '#E10098' },

  // Databases
  postgresql:   { icon: SiPostgresql,   color: '#336791' },
  postgres:     { icon: SiPostgresql,   color: '#336791' },
  mysql:        { icon: SiMysql,        color: '#4479A1' },
  mongodb:      { icon: SiMongodb,      color: '#47A248' },
  mongoose:     { icon: SiMongodb,      color: '#880000' },
  sqlite:       { icon: SiSqlite,       color: '#003B57' },
  redis:        { icon: SiRedis,        color: '#DC382D' },
  supabase:     { icon: SiSupabase,     color: '#3ECF8E' },
  prisma:       { icon: SiPrisma,       color: '#E2E8F0' },
  firebase:     { icon: SiFirebase,     color: '#FFCA28' },

  // DevOps / Tools
  docker:       { icon: SiDocker,       color: '#2496ED' },
  kubernetes:   { icon: SiKubernetes,   color: '#326CE5' },
  git:          { icon: SiGit,          color: '#F05032' },
  github:       { icon: SiGithub,       color: '#E2E8F0' },
  gitlab:       { icon: SiGitlab,       color: '#FC6D26' },
  linux:        { icon: SiLinux,        color: '#FCC624' },
  nginx:        { icon: SiNginx,        color: '#009639' },
  aws:          { icon: SiGooglecloud,  color: '#FF9900' },
  gcp:          { icon: SiGooglecloud,  color: '#4285F4' },
  vercel:       { icon: SiVercel,       color: '#E2E8F0' },
  netlify:      { icon: SiNetlify,      color: '#00C7B7' },
  vite:         { icon: SiVite,         color: '#646CFF' },
  webpack:      { icon: SiWebpack,      color: '#8DD6F9' },
  babel:        { icon: SiBabel,        color: '#F9DC3E' },
  eslint:       { icon: SiEslint,       color: '#4B32C3' },
  prettier:     { icon: SiPrettier,     color: '#F7B93E' },
  figma:        { icon: SiFigma,        color: '#F24E1E' },
  postman:      { icon: SiPostman,      color: '#FF6C37' },
  insomnia:     { icon: SiInsomnia,     color: '#4000BF' },
  jira:         { icon: SiJira,         color: '#0052CC' },

  // Languages
  'c++':        { icon: SiCplusplus,    color: '#00599C' },
  cpp:          { icon: SiCplusplus,    color: '#00599C' },
  c:            { icon: SiC,            color: '#A8B9CC' },
  kotlin:       { icon: SiKotlin,       color: '#7F52FF' },
  swift:        { icon: SiSwift,        color: '#FA7343' },
  dart:         { icon: SiDart,         color: '#0175C2' },
  flutter:      { icon: SiFlutter,      color: '#02569B' },
  android:      { icon: SiAndroid,      color: '#3DDC84' },
  electron:     { icon: SiElectron,     color: '#47848F' },

  // AI / Data
  tensorflow:   { icon: SiTensorflow,  color: '#FF6F00' },
  pytorch:      { icon: SiPytorch,     color: '#EE4C2C' },
  pandas:       { icon: SiPandas,      color: '#150458' },
  numpy:        { icon: SiNumpy,       color: '#013243' },
};

/** Returns an icon element + brand color for a given skill name, or null if not found */
export function getSkillIcon(name: string): { icon: React.ReactElement; color: string } | null {
  const key = name.toLowerCase().trim();

  // Exact match first
  if (SKILL_MAP[key]) {
    const { icon: Icon, color } = SKILL_MAP[key];
    return { icon: React.createElement(Icon, { style: { color } }), color };
  }

  // Partial match — find first key that the skill name contains
  for (const [k, v] of Object.entries(SKILL_MAP)) {
    if (key.includes(k) || k.includes(key)) {
      const { icon: Icon, color } = v;
      return { icon: React.createElement(Icon, { style: { color } }), color };
    }
  }

  return null;
}
