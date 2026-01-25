// Skill system models

export interface Skill {
  id: string;
  name: string;
  category: 'reflex' | 'logic' | 'memory' | 'speed' | 'creativity';
  level: number;
  experience: number;
  proficiency: number;
}

export interface SkillStat {
  skillId: string;
  skillName: string;
  currentLevel: number;
  nextLevelXP: number;
  currentXP: number;
  mastery: number;
}

export interface PlayerSkills {
  userId: string;
  skills: Skill[];
  totalMastery: number;
  strongestSkill: Skill;
  weakestSkill: Skill;
  lastUpdated: Date;
}
